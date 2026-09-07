import katex from 'katex'
import { useMemo } from 'react'

type MathExprProps = {
  /** Строка KaTeX, например "\\frac{3}{4}". */
  expr: string
  /** Формула отдельной строкой по центру, а не внутри текста. */
  block?: boolean
  className?: string
}

/**
 * Формула. Рендерится KaTeX в HTML один раз на выражение.
 *
 * throwOnError: false — опечатка в формуле показывается красным прямо в тексте,
 * но не роняет страницу. Во время занятия сломанный урок хуже кривой формулы.
 */
export function MathExpr({ expr, block = false, className }: MathExprProps) {
  const html = useMemo(
    () =>
      katex.renderToString(expr, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      }),
    [expr, block],
  )

  if (block) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  }
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
