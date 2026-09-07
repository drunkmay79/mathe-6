import { useState } from 'react'
import type { Bilingual } from '@/content/schema'
import { useProgress } from '@/lib/progress'

type BilingualTextProps = {
  value: Bilingual
  className?: string
  /** Немецкий текст крупнее — для заголовков и условий заданий. */
  emphasis?: boolean
}

/**
 * Немецкий текст с русским переводом по кнопке.
 *
 * Перевод спрятан не из вредности: если он висит рядом, глаз читает только
 * его, и немецкий не запоминается. Одно нажатие — и он появляется, так что
 * застрять на непонятой формулировке всё равно нельзя.
 *
 * В настройках можно включить показ перевода сразу — на трудных темах
 * или когда мало времени.
 */
export function BilingualText({ value, className, emphasis = false }: BilingualTextProps) {
  const { preferences } = useProgress()
  const [revealed, setRevealed] = useState(false)
  const showRussian = preferences.showTranslation || revealed

  return (
    <div className={className}>
      <p lang="de" className={emphasis ? 'text-lg font-medium' : undefined}>
        {value.de}
      </p>

      {showRussian ? (
        <p lang="ru" className="ru-text mt-1 text-[0.95em]">
          {value.ru}
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mt-1 text-sm text-accent underline underline-offset-2 hover:no-underline"
        >
          Перевод
        </button>
      )}
    </div>
  )
}
