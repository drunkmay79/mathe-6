import { BilingualText } from './BilingualText'
import { MathExpr } from './MathExpr'
import type { TheoryBlock } from '@/content/schema'

/** Один блок теории. Вид зависит от типа: обычный текст, формула, правило, разбор. */
export function TheoryBlockView({ block }: { block: TheoryBlock }) {
  switch (block.type) {
    case 'text':
      return <BilingualText value={block.body} className="my-4" />

    case 'math':
      return (
        <figure className="my-5">
          <MathExpr expr={block.expr} block />
          {block.caption && (
            <figcaption className="mt-2 text-center">
              <BilingualText value={block.caption} className="inline-block text-sm" />
            </figcaption>
          )}
        </figure>
      )

    case 'rule':
      // Правило в рамке — то, что нужно выучить наизусть.
      return (
        <div className="my-5 rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-5">
          <p lang="de" className="mb-2 font-semibold">
            {block.title.de}
            <span lang="ru" className="ru-text ml-2 font-normal">
              {block.title.ru}
            </span>
          </p>
          <BilingualText value={block.body} />
          {block.expr && <MathExpr expr={block.expr} block className="mt-3" />}
        </div>
      )

    case 'example':
      return (
        <div className="my-5 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="mb-2 text-sm font-semibold tracking-wide text-ink-soft">
            Beispiel <span className="ru-text font-normal">— разобранный пример</span>
          </p>
          <BilingualText value={block.prompt} />
          <ol className="mt-4 space-y-3">
            {block.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm tabular-nums">
                  {index + 1}
                </span>
                <div>
                  {step.expr && <MathExpr expr={step.expr} block className="mb-1" />}
                  <p lang="ru" className="text-sm">
                    {step.explain}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )
  }
}
