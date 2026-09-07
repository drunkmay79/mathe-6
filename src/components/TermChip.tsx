import { useState } from 'react'
import { getTerm } from '@/content/glossary'

type TermChipProps = {
  /** id из glossary.ts */
  id: string
}

/**
 * Немецкий термин, который раскрывается в перевод по нажатию.
 *
 * Именно нажатием, а не наведением мыши: тетрадью пользуются с планшета,
 * где никакого наведения нет.
 */
export function TermChip({ id }: TermChipProps) {
  const term = getTerm(id)
  const [open, setOpen] = useState(false)

  // Термина нет в словаре — молча ничего не показываем.
  // Такую ссылку ловит тест в content.test.ts, до экрана она дойти не должна.
  if (!term) return null

  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      aria-expanded={open}
      className="inline-flex flex-col items-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-left transition hover:border-accent"
    >
      <span lang="de" className="font-medium">
        {term.article ? `${term.article} ` : ''}
        {term.de}
      </span>
      {open && (
        <span lang="ru" className="ru-text text-sm">
          {term.ru}
        </span>
      )}
    </button>
  )
}
