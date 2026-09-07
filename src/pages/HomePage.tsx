import { Link } from 'react-router-dom'
import { ProgressBar } from '@/components/ProgressBar'
import { ALL_LESSONS, CHAPTERS, TOTAL_EXERCISES, lessonPath } from '@/content'
import { exerciseKey, resetAll, setShowTranslation, useProgress } from '@/lib/progress'

/** Оглавление: главы, уроки, общий прогресс и пара настроек. */
export function HomePage() {
  const progress = useProgress()

  const solvedTotal = ALL_LESSONS.reduce(
    (sum, { lesson }) =>
      sum +
      lesson.exercises.filter(
        (exercise) => progress.exercises[exerciseKey(lesson.id, exercise.id)]?.status === 'solved',
      ).length,
    0,
  )

  function handleReset() {
    if (confirm('Сбросить весь прогресс? Отменить это будет нельзя.')) resetAll()
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Mathe 6</h1>
        <p className="ru-text mt-1">
          Рабочая тетрадь по немецкому учебнику математики. Задание — по-немецки, объяснение —
          по-русски.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <ProgressBar solved={solvedTotal} total={TOTAL_EXERCISES} label="Решено заданий всего" />
      </div>

      {CHAPTERS.map((chapter) => (
        <section key={chapter.id}>
          <h2 className="mb-3 text-xl font-semibold">
            {chapter.number}. {chapter.title.de}
            <span className="ru-text ml-2 text-base font-normal">{chapter.title.ru}</span>
          </h2>

          <ul className="space-y-3">
            {chapter.lessons.map((lesson) => {
              const solved = lesson.exercises.filter(
                (exercise) =>
                  progress.exercises[exerciseKey(lesson.id, exercise.id)]?.status === 'solved',
              ).length

              return (
                <li key={lesson.id}>
                  <Link
                    to={lessonPath(lesson.id)}
                    className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-accent"
                  >
                    <p lang="de" className="text-lg font-medium">
                      {lesson.title.de}
                    </p>
                    <p lang="ru" className="ru-text">
                      {lesson.title.ru}
                    </p>
                    <p className="ru-text mt-2 text-sm">{lesson.summary}</p>
                    <div className="mt-3 max-w-xs">
                      <ProgressBar solved={solved} total={lesson.exercises.length} />
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-lg font-semibold">Настройки</h2>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={progress.preferences.showTranslation}
            onChange={(event) => setShowTranslation(event.target.checked)}
            className="size-4"
          />
          <span className="text-sm">
            Всегда показывать русский перевод
            <span className="ru-text block">
              Обычно перевод скрыт и открывается кнопкой — так немецкий запоминается лучше.
            </span>
          </span>
        </label>

        <button
          type="button"
          onClick={handleReset}
          className="mt-5 text-sm text-ink-soft underline underline-offset-2 hover:no-underline"
        >
          Сбросить весь прогресс
        </button>
      </section>
    </div>
  )
}
