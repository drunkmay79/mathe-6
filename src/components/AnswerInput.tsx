import { useState } from 'react'
import { CircleShape, GridShape, NumberLineShape } from './Figure'
import { MathExpr } from './MathExpr'
import type { AutoCheckedExercise } from '@/content/schema'
import { decodeFlags, decodePairs, encodeFlags, encodePairs } from '@/lib/check-answer'

type AnswerInputProps = {
  exercise: AutoCheckedExercise
  value: string
  onChange: (value: string) => void
  disabled: boolean
  /** id поля ввода — связывает подпись с полем и группирует радиокнопки. */
  inputId: string
}

const PLACEHOLDER: Record<AutoCheckedExercise['kind'], string> = {
  number: 'например 12,5',
  fraction: 'например 3/4',
  set: 'например 1; 2; 4; 8',
  text: 'ответ по-немецки',
  choice: '',
  truefalse: '',
  match: '',
  shade: '',
  numberline: '',
  pick: '',
}

const textFieldClass =
  'mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-lg disabled:bg-slate-100'

/** Поле ответа. Вид зависит от типа задания, но наружу всё выглядит как строка. */
export function AnswerInput({ exercise, value, onChange, disabled, inputId }: AnswerInputProps) {
  switch (exercise.kind) {
    case 'choice':
      return (
        <fieldset className="space-y-2">
          <legend className="sr-only">Варианты ответа</legend>
          {exercise.options.map((option, index) => (
            <label
              key={index}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                value === String(index)
                  ? 'border-accent bg-slate-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name={inputId}
                value={index}
                checked={value === String(index)}
                onChange={(event) => onChange(event.target.value)}
                disabled={disabled}
                className="mt-1.5"
              />
              <span>
                <span lang="de" className="block">
                  {option.de}
                </span>
                {option.ru !== option.de && (
                  <span lang="ru" className="ru-text block text-sm">
                    {option.ru}
                  </span>
                )}
              </span>
            </label>
          ))}
        </fieldset>
      )

    case 'truefalse': {
      const flags = decodeFlags(value)
      const setFlag = (index: number, flag: boolean) => {
        const next = exercise.statements.map((_, position) =>
          position === index ? flag : (flags[position] ?? null),
        )
        onChange(encodeFlags(next))
      }

      return (
        <fieldset className="overflow-hidden rounded-xl border border-slate-200">
          <legend className="sr-only">Отметь каждое утверждение</legend>
          {exercise.statements.map((statement, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-3 last:border-b-0"
            >
              <span className="mr-auto">
                <span lang="de" className="block">
                  {statement.de}
                </span>
                <span lang="ru" className="ru-text block text-sm">
                  {statement.ru}
                </span>
              </span>
              {[true, false].map((flag) => (
                <label
                  key={String(flag)}
                  className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition ${
                    flags[index] === flag
                      ? 'border-accent bg-slate-100 font-medium'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`${inputId}-${index}`}
                    checked={flags[index] === flag}
                    onChange={() => setFlag(index, flag)}
                    disabled={disabled}
                    className="sr-only"
                  />
                  {flag ? 'wahr' : 'falsch'}
                </label>
              ))}
            </div>
          ))}
        </fieldset>
      )
    }

    case 'match': {
      const selected = new Set(decodePairs(value).map(([left, right]) => `${left}:${right}`))
      const toggle = (leftId: string, rightId: string) => {
        const key = `${leftId}:${rightId}`
        const next = new Set(selected)
        if (next.has(key)) next.delete(key)
        else next.add(key)
        onChange(encodePairs([...next].map((pair) => pair.split(':') as [string, string])))
      }

      return (
        <div className="space-y-3">
          {exercise.left.map((leftItem) => (
            <div key={leftItem.id} className="flex flex-wrap items-center gap-2">
              <span className="w-12 shrink-0 text-lg font-medium tabular-nums">
                {leftItem.label}
              </span>
              {exercise.right.map((rightItem) => {
                const active = selected.has(`${leftItem.id}:${rightItem.id}`)
                return (
                  <button
                    key={rightItem.id}
                    type="button"
                    onClick={() => toggle(leftItem.id, rightItem.id)}
                    disabled={disabled}
                    aria-pressed={active}
                    className={`rounded-lg border px-3 py-1.5 tabular-nums transition disabled:opacity-60 ${
                      active
                        ? 'border-accent bg-accent text-white'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {rightItem.label}
                  </button>
                )
              })}
            </div>
          ))}
          <p className="ru-text text-sm">Нажимай на числа, которые подходят. Можно несколько.</p>
        </div>
      )
    }

    case 'pick': {
      const chosen = new Set(
        value
          .split(',')
          .filter((part) => part !== '')
          .map(Number),
      )
      const toggle = (index: number) => {
        const next = new Set(chosen)
        if (next.has(index)) next.delete(index)
        else next.add(index)
        onChange([...next].sort((a, b) => a - b).join(','))
      }
      return (
        <div>
          <p className="ru-text mb-2 text-sm">Отметь все подходящие. Можно несколько.</p>
          <div className="flex flex-wrap gap-2">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggle(index)}
                disabled={disabled}
                aria-pressed={chosen.has(index)}
                className={`min-w-14 rounded-xl border px-3 py-2.5 text-lg tabular-nums transition disabled:opacity-60 ${
                  chosen.has(index)
                    ? 'border-accent bg-accent text-white'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )
    }

    case 'shade':
      return (
        <ShadeInput
          shape={exercise.shape}
          total={exercise.total}
          cols={exercise.cols ?? exercise.total}
          disabled={disabled}
          onChange={onChange}
        />
      )

    case 'numberline':
      return (
        <NumberLinePicker
          from={exercise.from}
          to={exercise.to}
          parts={exercise.parts}
          label={exercise.label}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      )

    default:
      // number, fraction, set, text — всё это одно текстовое поле.
      return (
        <div>
          <label htmlFor={inputId} className="ru-text block text-sm">
            Твой ответ
          </label>
          <div className="mt-1 flex items-baseline gap-2">
            {exercise.kind === 'set' && exercise.label && (
              <MathExpr expr={exercise.label} className="text-lg" />
            )}
            <input
              id={inputId}
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              autoComplete="off"
              inputMode={exercise.kind === 'number' ? 'decimal' : 'text'}
              placeholder={PLACEHOLDER[exercise.kind]}
              className={`${textFieldClass} ${exercise.kind === 'set' ? 'max-w-md' : 'max-w-xs'}`}
            />
            {exercise.kind === 'number' && exercise.unit && (
              <span className="text-ink-soft">{exercise.unit.de}</span>
            )}
          </div>
        </div>
      )
  }
}

type ShadeInputProps = {
  shape: 'grid' | 'circle'
  total: number
  cols: number
  disabled: boolean
  onChange: (value: string) => void
}

/**
 * Закрашивание долей. Наружу отдаём только количество закрашенных частей:
 * в заданиях вида «Male 3 von 8 Teilen bunt» неважно, какие именно закрасили.
 */
function ShadeInput({ shape, total, cols, disabled, onChange }: ShadeInputProps) {
  const [filled, setFilled] = useState<Set<number>>(new Set())

  const toggle = (index: number) => {
    if (disabled) return
    const next = new Set(filled)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    setFilled(next)
    onChange(String(next.size))
  }

  return (
    <div>
      <p className="ru-text mb-2 text-sm">Нажимай на части, чтобы закрасить их.</p>
      {shape === 'grid' ? (
        <GridShape total={total} cols={cols} filled={filled} onToggle={toggle} />
      ) : (
        <CircleShape total={total} filled={filled} onToggle={toggle} />
      )}
      <p className="mt-2 text-sm">
        Закрашено: <strong className="tabular-nums">{filled.size}</strong> из {total}
      </p>
    </div>
  )
}

type NumberLinePickerProps = {
  from: number
  to: number
  parts: number
  label: string
  value: string
  disabled: boolean
  onChange: (value: string) => void
}

/** Выбор штриха на числовой прямой: ответом становится его номер от начала. */
function NumberLinePicker({
  from,
  to,
  parts,
  label,
  value,
  disabled,
  onChange,
}: NumberLinePickerProps) {
  const picked = value === '' ? null : Number(value)

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-sm">
        <span className="ru-text">Отметь на прямой:</span>
        <MathExpr expr={label} className="text-lg" />
      </p>
      <div className="overflow-x-auto">
        <NumberLineShape
          from={from}
          to={to}
          parts={parts}
          picked={picked}
          onPick={disabled ? undefined : (tick) => onChange(String(tick))}
        />
      </div>
    </div>
  )
}
