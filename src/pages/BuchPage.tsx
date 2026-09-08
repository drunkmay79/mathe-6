import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOK_TITLES, SOURCE_PAGES, exercisePath, lessonPath, type SourcePage } from '@/content'
import { exerciseKey, useProgress } from '@/lib/progress'

/** Короткое начало условия — подпись для задания без номера в книге. */
function shorten(text: string): string {
  return text.length > 28 ? `${text.slice(0, 28).trimEnd()}…` : text
}

/**
 * Указатель по книгам: страница → задания в приложении.
 *
 * Домашнее задание в школе называют номером страницы и номерами упражнений.
 * Эта страница — единственный способ попасть из «Arbeitsheft S. 9, Aufg. 1–3»
 * прямо в нужные карточки, не листая темы наугад.
 */
export function BuchPage() {
  const [query, setQuery] = useState('')
  const progress = useProgress()

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (needle === '') return SOURCE_PAGES

    // Понимаем и «9», и «ah 9», и «тетрадь 9», и «S. 9».
    const number = needle.match(/\d+/)?.[0]
    const wantsAh = /ah|тетрад|arbeits/.test(needle)
    const wantsLb = /lb|учебник|lehr|schüler|schuler/.test(needle)

    return SOURCE_PAGES.filter((page) => {
      if (number && String(page.page) !== number) return false
      if (wantsAh && page.book !== 'ah') return false
      if (wantsLb && page.book !== 'lb') return false
      return Boolean(number) || wantsAh || wantsLb
    })
  }, [query])

  const books: SourcePage['book'][] = ['lb', 'ah']

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">По учебнику</h1>
        <p className="ru-text mt-1">
          Задали, например, «Arbeitsheft S. 9, Aufgaben 1–3»? Найди страницу здесь и нажми на нужный
          номер — откроется ровно это задание.
        </p>
      </header>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Номер страницы: 9, или «тетрадь 9»"
        inputMode="text"
        className="w-full max-w-md rounded-xl border border-slate-300 px-4 py-2.5"
      />

      {matches.length === 0 && (
        <p className="ru-text">
          Такой страницы в приложении пока нет. Сейчас сделана только первая глава: учебник S. 8–15,
          тетрадь S. 2–19.
        </p>
      )}

      {books.map((book) => {
        const pages = matches.filter((page) => page.book === book)
        if (pages.length === 0) return null

        return (
          <section key={book}>
            <h2 className="mb-3 text-xl font-semibold">{BOOK_TITLES[book]}</h2>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li
                  key={`${page.book}-${page.page}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-lg font-bold">S. {page.page}</span>
                    {page.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        to={lessonPath(lesson.id)}
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {lesson.title.de}
                      </Link>
                    ))}
                  </div>

                  {page.entries.length === 0 ? (
                    <p className="ru-text text-sm">
                      Это страница с объяснением — заданий с неё в приложении нет.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {page.entries.map(({ lesson, exercise, source }) => {
                        const solved =
                          progress.exercises[exerciseKey(lesson.id, exercise.id)]?.status ===
                          'solved'
                        return (
                          <Link
                            key={`${lesson.id}-${exercise.id}`}
                            to={exercisePath(lesson.id, exercise.id)}
                            className={`rounded-xl border px-3 py-2 text-sm transition ${
                              solved
                                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                : 'border-slate-300 hover:border-accent'
                            }`}
                          >
                            {source.task
                              ? `Aufg. ${source.task}`
                              : // Номера в книге нет — показываем начало условия,
                                // иначе на странице получается ряд одинаковых кнопок.
                                shorten(exercise.prompt.de)}
                            {solved && ' ✓'}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
