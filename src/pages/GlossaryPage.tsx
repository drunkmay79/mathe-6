import { useMemo, useState } from 'react'
import { GLOSSARY, GLOSSARY_CATEGORIES } from '@/content/glossary'
import { normalizeText } from '@/lib/check-answer'

/**
 * Словарь целиком, с поиском.
 *
 * Искать можно и по-немецки, и по-русски: ученица одинаково часто не помнит
 * и слово, и его перевод. Немецкая часть ищется через ту же нормализацию,
 * что и проверка ответов, — набранное «flaecheninhalt» находит «Flächeninhalt».
 */
export function GlossaryPage() {
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    const needle = query.trim()
    if (needle === '') return GLOSSARY

    const germanNeedle = normalizeText(needle)
    const russianNeedle = needle.toLowerCase()

    return GLOSSARY.filter(
      (entry) =>
        normalizeText(entry.de).includes(germanNeedle) ||
        entry.ru.toLowerCase().includes(russianNeedle),
    )
  }, [query])

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Wörterbuch</h1>
        <p className="ru-text">Словарь: немецкие слова из заданий и их перевод</p>
      </header>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Искать по-немецки или по-русски"
        className="w-full max-w-md rounded-xl border border-slate-300 px-4 py-2.5"
      />

      {matches.length === 0 && <p className="ru-text">Ничего не нашлось.</p>}

      {GLOSSARY_CATEGORIES.map((category) => {
        const entries = matches.filter((entry) => entry.category === category.id)
        if (entries.length === 0) return null

        return (
          <section key={category.id}>
            <h2 className="mb-3 text-lg font-semibold">{category.ru}</h2>
            <dl className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {entries.map((entry) => (
                <div key={entry.id} className="grid gap-1 p-4 sm:grid-cols-2 sm:gap-4">
                  <dt lang="de" className="font-medium">
                    {entry.article && <span className="text-ink-soft">{entry.article} </span>}
                    {entry.de}
                    {entry.plural && (
                      <span className="ml-2 text-sm font-normal text-ink-soft">
                        Pl.: {entry.plural}
                      </span>
                    )}
                  </dt>
                  <dd>
                    <span lang="ru">{entry.ru}</span>
                    {entry.example && (
                      <p lang="de" className="mt-1 text-sm text-ink-soft italic">
                        {entry.example}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )
      })}
    </div>
  )
}
