import { useId, useState, type FormEvent } from 'react'
import { AnswerInput } from './AnswerInput'
import { BilingualText } from './BilingualText'
import { FigureView } from './Figure'
import { MathExpr } from './MathExpr'
import { isAutoChecked, LEVELS, type Exercise } from '@/content/schema'
import { checkAnswer, formatExpectedAnswer, type CheckResult } from '@/lib/check-answer'
import {
  recordAttempt,
  recordHintUsed,
  recordRevealed,
  recordSolved,
  useExerciseState,
} from '@/lib/progress'

type ExerciseCardProps = {
  lessonId: string
  exercise: Exercise
  /** Номер задания в списке, для заголовка. */
  number: number
}

function feedbackText(result: CheckResult): string {
  if (result.ok) return 'Richtig! Правильно.'
  switch (result.reason) {
    case 'empty':
      return 'Сначала впиши ответ.'
    case 'unparsable':
      return result.note ?? 'Не получилось прочитать ответ.'
    case 'not-reduced':
      return result.note ?? 'Почти: дробь ещё можно сократить.'
    case 'incomplete':
      return result.note ?? 'Верно, но это ещё не всё.'
    case 'extra':
      return result.note ?? 'Здесь есть лишнее.'
    case 'wrong':
      return result.note ?? 'Пока не то. Попробуй ещё раз или открой подсказку.'
  }
}

/** Недобор — это верный ход мысли, а не ошибка. Красить его в цвет ошибки нечестно. */
function feedbackClass(result: CheckResult): string {
  if (result.ok) return 'font-medium text-emerald-700'
  return result.reason === 'incomplete' ? 'text-sky-700' : 'text-amber-700'
}

const BOOK_LABEL = { lb: 'Lehrbuch', ah: 'Arbeitsheft' } as const

/**
 * Одно задание: условие, поле ответа, проверка, подсказки, разбор.
 *
 * Проверка не заканчивается словом «неверно». У каждого задания есть либо
 * подсказки, которые открываются по одной, либо разбор — это гарантирует
 * тест в content.test.ts. Смысл в том, чтобы ученица не застревала одна.
 */
export function ExerciseCard({ lessonId, exercise, number }: ExerciseCardProps) {
  const inputId = useId()
  const state = useExerciseState(lessonId, exercise.id)
  const [value, setValue] = useState('')
  const [result, setResult] = useState<CheckResult | null>(null)
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  const solved = state.status === 'solved'
  const level = LEVELS.find((item) => item.id === exercise.level)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (solved || !isAutoChecked(exercise)) return

    const checked = checkAnswer(exercise, value)
    setResult(checked)

    if (checked.ok) {
      recordSolved(lessonId, exercise.id)
    } else if (checked.reason !== 'empty') {
      // Пустая отправка — не попытка: ученица просто промахнулась по кнопке.
      recordAttempt(lessonId, exercise.id)
    }
  }

  function openNextHint() {
    const next = hintsShown + 1
    setHintsShown(next)
    recordHintUsed(lessonId, exercise.id, next - 1)
  }

  function revealSolution() {
    setShowSolution(true)
    recordRevealed(lessonId, exercise.id)
  }

  return (
    <section
      className={`rounded-2xl border p-5 transition ${
        solved ? 'border-emerald-300 bg-emerald-50/60' : 'border-slate-200 bg-white'
      }`}
      aria-labelledby={`${inputId}-title`}
    >
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 id={`${inputId}-title`} className="text-sm font-semibold tracking-wide text-ink-soft">
          Aufgabe {number}
          {level && (
            <span className="ml-2 font-normal" title={level.ru}>
              {level.sign}
            </span>
          )}
          {solved && <span className="ml-2 text-emerald-600">✓ gelöst</span>}
        </h3>
        {exercise.source && (
          <span className="text-xs text-ink-soft">
            {BOOK_LABEL[exercise.source.book]} S. {exercise.source.page}
            {exercise.source.task ? `, Aufg. ${exercise.source.task}` : ''}
          </span>
        )}
      </header>

      <BilingualText value={exercise.prompt} emphasis />

      {exercise.expr && <MathExpr expr={exercise.expr} block className="my-4" />}

      {exercise.figure && <FigureView figure={exercise.figure} />}

      {exercise.kind === 'open' ? (
        <OpenAnswer
          lessonId={lessonId}
          exerciseId={exercise.id}
          inputId={inputId}
          reference={exercise.reference}
          referenceDe={exercise.referenceDe}
          solved={solved}
        />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-4">
            <AnswerInput
              exercise={exercise}
              value={value}
              onChange={setValue}
              disabled={solved}
              inputId={inputId}
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={solved}
                className="rounded-xl bg-accent px-5 py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-40"
              >
                Проверить
              </button>

              {!solved && hintsShown < exercise.hints.length && (
                <button
                  type="button"
                  onClick={openNextHint}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition hover:border-slate-400"
                >
                  {hintsShown === 0 ? 'Подсказка' : 'Ещё подсказка'}
                </button>
              )}

              {!solved && !showSolution && (
                <button
                  type="button"
                  onClick={revealSolution}
                  className="text-sm text-ink-soft underline underline-offset-2 hover:no-underline"
                >
                  Показать решение
                </button>
              )}
            </div>
          </form>

          <p
            aria-live="polite"
            className={`mt-3 min-h-6 text-sm ${result ? feedbackClass(result) : ''}`}
          >
            {result ? feedbackText(result) : ''}
          </p>
        </>
      )}

      {hintsShown > 0 && (
        <ul className="mt-3 space-y-2 border-l-2 border-amber-300 pl-4">
          {exercise.hints.slice(0, hintsShown).map((hint, index) => (
            <li key={index} lang="ru" className="text-sm">
              {hint}
            </li>
          ))}
        </ul>
      )}

      {(showSolution || solved) && exercise.solution && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="mb-1 text-sm font-semibold">Разбор</p>
          <p lang="ru" className="text-sm">
            {exercise.solution}
          </p>
        </div>
      )}

      {showSolution && !solved && exercise.kind !== 'open' && (
        <p className="mt-2 text-sm">
          Правильный ответ: <strong>{formatExpectedAnswer(exercise)}</strong>
        </p>
      )}

      {exercise.kind === 'truefalse' && (showSolution || solved) && (
        <ul className="mt-3 space-y-1 text-sm">
          {exercise.statements.map((statement, index) => (
            <li key={index}>
              <strong>{statement.correct ? 'wahr' : 'falsch'}</strong>
              {statement.why ? ` — ${statement.why}` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

type OpenAnswerProps = {
  lessonId: string
  exerciseId: string
  inputId: string
  reference: string
  referenceDe?: string
  solved: boolean
}

/**
 * Свободный ответ: Begründe, Erkläre, Beschreibe dein Vorgehen.
 *
 * Проверить такое автоматически нельзя, поэтому ученица пишет своими словами,
 * потом открывает образец и сама решает, сошлось ли. Выбрасывать эти задания
 * нельзя: именно на них тренируется язык объяснения, который спросят на уроке.
 */
function OpenAnswer({
  lessonId,
  exerciseId,
  inputId,
  reference,
  referenceDe,
  solved,
}: OpenAnswerProps) {
  const [text, setText] = useState('')
  const [shown, setShown] = useState(false)

  return (
    <div className="mt-4">
      <label htmlFor={inputId} className="ru-text block text-sm">
        Напиши своими словами
      </label>
      <textarea
        id={inputId}
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={4}
        className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 disabled:bg-slate-100"
      />

      {!shown ? (
        <button
          type="button"
          onClick={() => setShown(true)}
          className="mt-3 rounded-xl bg-accent px-5 py-2.5 font-medium text-white transition hover:opacity-90"
        >
          Сравнить с образцом
        </button>
      ) : (
        <>
          <div className="mt-3 rounded-xl bg-slate-50 p-4">
            <p className="mb-1 text-sm font-semibold">Образец ответа</p>
            <p lang="ru" className="text-sm">
              {reference}
            </p>
            {referenceDe && (
              <p lang="de" className="mt-2 text-sm italic text-ink-soft">
                {referenceDe}
              </p>
            )}
          </div>

          {!solved && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="ru-text text-sm">Сошлось по смыслу?</span>
              <button
                type="button"
                onClick={() => recordSolved(lessonId, exerciseId)}
                className="rounded-xl border border-emerald-300 px-4 py-2 text-sm transition hover:bg-emerald-50"
              >
                Да, сошлось
              </button>
              <button
                type="button"
                onClick={() => recordAttempt(lessonId, exerciseId)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:border-slate-400"
              >
                Нет, перечитаю
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
