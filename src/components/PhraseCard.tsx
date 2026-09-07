import { useState } from 'react'
import type { Phrase } from '@/content/schema'

/**
 * Фраза из формулировки задания: по-немецки видно сразу, перевод — по нажатию.
 *
 * Смысл именно в паузе перед переводом: сначала попробовать понять,
 * потом проверить себя. Если перевод виден сразу, глаз читает только его.
 */
export function PhraseCard({ phrase }: { phrase: Phrase }) {
  const [open, setOpen] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      aria-expanded={open}
      className={`w-full rounded-xl border p-3 text-left transition ${
        open ? 'border-slate-300 bg-white' : 'border-slate-200 bg-white hover:border-accent'
      }`}
    >
      <span lang="de" className="block font-medium">
        {phrase.de}
      </span>
      {open ? (
        <>
          <span lang="ru" className="ru-text mt-1 block text-sm">
            {phrase.ru}
          </span>
          {phrase.note && <span className="mt-1 block text-sm text-ink-soft">{phrase.note}</span>}
        </>
      ) : (
        <span className="mt-1 block text-sm text-accent">Перевод</span>
      )}
    </button>
  )
}
