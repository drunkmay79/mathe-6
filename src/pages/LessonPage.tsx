import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ExerciseCard } from '@/components/ExerciseCard'
import { LevelSwitch } from '@/components/LevelSwitch'
import { PhraseCard } from '@/components/PhraseCard'
import { ProgressBar } from '@/components/ProgressBar'
import { TermChip } from '@/components/TermChip'
import { TheoryBlockView } from '@/components/TheoryBlockView'
import {
  findLesson,
  formatPages,
  lessonPages,
  lessonPath,
  neighbourLessons,
  splitExercises,
} from '@/content'
import { LEVELS, type ExerciseLevel, type Lesson } from '@/content/schema'
import { resetLesson, setLevel, useLessonProgress, useProgress } from '@/lib/progress'

/** Страница урока: язык задания, слова темы, теория, задания по уровням. */
export function LessonPage() {
  const { lessonId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const found = findLesson(lessonId)

  if (!found) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p>Такого урока нет.</p>
        <Link to="/" className="text-accent underline underline-offset-2">
          Вернуться к оглавлению
        </Link>
      </div>
    )
  }

  const { chapter, lesson } = found
  const { prev, next } = neighbourLessons(lessonId)

  return (
    <LessonBody
      chapter={chapter.title.de}
      lesson={lesson}
      prev={prev}
      next={next}
      focusId={searchParams.get('ex')}
    />
  )
}

type LessonRef = NonNullable<ReturnType<typeof findLesson>>

type LessonBodyProps = {
  chapter: string
  lesson: Lesson
  prev?: LessonRef
  next?: LessonRef
  /** Задание, на которое пришли по ссылке из указателя «По учебнику». */
  focusId: string | null
}

/**
 * Вынесено отдельным компонентом, чтобы хуки вызывались всегда,
 * а не после проверки «урок найден» — иначе порядок хуков поедет.
 */
function LessonBody({ chapter, lesson, prev, next, focusId }: LessonBodyProps) {
  const { preferences } = useProgress()
  const { sprache, mathe } = splitExercises(lesson)
  const pages = lessonPages(lesson)

  const counts = Object.fromEntries(
    LEVELS.map((level) => [
      level.id,
      mathe.filter((exercise) => exercise.level === level.id).length,
    ]),
  ) as Record<ExerciseLevel, number>

  // Пришли по ссылке на конкретное задание — показываем его уровень,
  // иначе сохранённый. Если на сохранённом заданий нет, берём первый непустой:
  // пустой экран выглядит как поломка, а не как выбор.
  const targeted = focusId ? mathe.find((exercise) => exercise.id === focusId) : undefined
  const level =
    targeted?.level ??
    (counts[preferences.level] > 0
      ? preferences.level
      : (LEVELS.find((item) => counts[item.id] > 0)?.id ?? preferences.level))

  const visible = mathe.filter((exercise) => exercise.level === level)
  const { solved, total } = useLessonProgress(
    lesson.id,
    visible.map((exercise) => exercise.id),
  )

  useEffect(() => {
    if (!focusId) return
    const scroll = () => document.getElementById(`ex-${focusId}`)?.scrollIntoView({ block: 'start' })
    // Дважды: сразу и ещё раз, когда дорисуются формулы и картинки выше.
    // Иначе карточка успевает уехать за верхний край экрана.
    const first = window.setTimeout(scroll, 60)
    const second = window.setTimeout(scroll, 400)
    return () => {
      window.clearTimeout(first)
      window.clearTimeout(second)
    }
  }, [focusId, lesson.id])

  return (
    <article className="space-y-8">
      <header>
        <p className="ru-text text-sm">{chapter}</p>
        <h1 lang="de" className="text-3xl font-bold">
          {lesson.title.de}
        </h1>
        <p lang="ru" className="ru-text text-lg">
          {lesson.title.ru}
        </p>
        <p className="mt-3">{lesson.summary}</p>

        {(pages.lb.length > 0 || pages.ah.length > 0) && (
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {pages.lb.length > 0 && (
              <span>
                <span className="ru-text">Учебник:</span>{' '}
                <strong>S. {formatPages(pages.lb)}</strong>
              </span>
            )}
            {pages.ah.length > 0 && (
              <span>
                <span className="ru-text">Тетрадь:</span>{' '}
                <strong>S. {formatPages(pages.ah)}</strong>
              </span>
            )}
          </p>
        )}
      </header>

      {(lesson.phrases.length > 0 || sprache.length > 0) && (
        <section>
          <h2 className="text-xl font-semibold">
            Sprache <span className="ru-text text-base font-normal">— язык задания</span>
          </h2>
          <p className="ru-text mt-1 text-sm">
            Сначала фразы, которыми написаны задания этой темы. На них спотыкаются чаще, чем на
            самой математике.
          </p>

          {lesson.phrases.length > 0 && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {lesson.phrases.map((phrase) => (
                <PhraseCard key={phrase.de} phrase={phrase} />
              ))}
            </div>
          )}

          {sprache.length > 0 && (
            <div className="mt-4 space-y-4">
              {sprache.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  lessonId={lesson.id}
                  exercise={exercise}
                  number={index + 1}
                  highlighted={exercise.id === focusId}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {lesson.terms.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold tracking-wide text-ink-soft">
            Слова урока <span className="ru-text font-normal">— нажми, чтобы увидеть перевод</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {lesson.terms.map((term) => (
              <TermChip key={term} id={term} />
            ))}
          </div>
        </section>
      )}

      {lesson.theory.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">
            Erklärung <span className="ru-text text-base font-normal">— объяснение</span>
          </h2>
          {lesson.theory.map((block, index) => (
            <TheoryBlockView key={index} block={block} />
          ))}
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">
          Aufgaben <span className="ru-text text-base font-normal">— задания</span>
        </h2>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <LevelSwitch value={level} onChange={setLevel} counts={counts} />
          <div className="w-48">
            <ProgressBar solved={solved} total={total} />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {visible.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              lessonId={lesson.id}
              exercise={exercise}
              number={index + 1}
              highlighted={exercise.id === focusId}
            />
          ))}
        </div>

        {solved > 0 && (
          <button
            type="button"
            onClick={() => resetLesson(lesson.id)}
            className="mt-4 text-sm text-ink-soft underline underline-offset-2 hover:no-underline"
          >
            Прорешать урок заново
          </button>
        )}
      </section>

      <nav className="flex justify-between gap-4 border-t border-slate-200 pt-5">
        {prev ? (
          <Link
            to={lessonPath(prev.lesson.id)}
            className="text-accent underline-offset-2 hover:underline"
          >
            ← {prev.lesson.title.de}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={lessonPath(next.lesson.id)}
            className="text-right text-accent underline-offset-2 hover:underline"
          >
            {next.lesson.title.de} →
          </Link>
        )}
      </nav>
    </article>
  )
}
