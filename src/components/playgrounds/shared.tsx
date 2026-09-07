/**
 * Общие детали тренажёров.
 *
 * Всё рассчитано на палец: кнопки не меньше 44 пикселей, ничего не требует
 * наведения мышью, ничего не срабатывает случайно.
 */

const BLUE = '#2f5ecb'
const BLUE_SOFT = '#c7d6f7'

export function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  const button =
    'flex size-11 items-center justify-center rounded-xl border border-slate-300 text-xl font-semibold transition hover:border-accent disabled:opacity-30'
  return (
    <div className="flex items-center gap-2">
      <span className="ru-text w-28 text-sm">{label}</span>
      <button
        type="button"
        className={button}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`${label}: меньше`}
      >
        −
      </button>
      <span className="w-10 text-center text-xl font-bold tabular-nums">{value}</span>
      <button
        type="button"
        className={button}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`${label}: больше`}
      >
        +
      </button>
    </div>
  )
}

export function Lamp({ label, on }: { label: string; on: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
        on ? 'border-emerald-400 bg-emerald-50 font-semibold' : 'border-slate-200 text-ink-soft'
      }`}
    >
      <span
        className={`size-3 rounded-full ${on ? 'bg-emerald-500' : 'bg-slate-300'}`}
        aria-hidden
      />
      {label}
      <span className="ml-1">{on ? 'да' : 'нет'}</span>
    </div>
  )
}

/** Кнопка-переключатель для выбора одного из вариантов. */
export function Choice({
  options,
  value,
  onChange,
  label,
}: {
  options: string[]
  value: number
  onChange: (index: number) => void
  label?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="ru-text text-sm">{label}</span>}
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(index)}
          className={`rounded-xl border px-4 py-2.5 font-semibold transition ${
            value === index
              ? 'border-accent bg-accent text-white'
              : 'border-slate-300 hover:border-slate-400'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

/** Полоска, разделённая на части: сколько-то из них закрашено. */
export function Bar({
  parts,
  shaded,
  width = 320,
  color = BLUE,
  soft = BLUE_SOFT,
}: {
  parts: number
  shaded: number
  width?: number
  color?: string
  soft?: string
}) {
  const height = 44
  const step = width / parts
  return (
    <svg
      viewBox={`0 0 ${width + 2} ${height + 2}`}
      width={width + 2}
      height={height + 2}
      className="max-w-full"
    >
      {Array.from({ length: parts }, (_, index) => (
        <rect
          key={index}
          x={1 + index * step}
          y={1}
          width={step}
          height={height}
          fill={index < shaded ? soft : '#ffffff'}
          stroke={color}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

/** Дробь столбиком — так она выглядит в тетради. */
export function FractionText({
  numerator,
  denominator,
  className = '',
}: {
  numerator: number
  denominator: number
  className?: string
}) {
  return (
    <span className={`inline-flex flex-col items-center align-middle leading-none ${className}`}>
      <span className="border-b-2 border-current px-2 pb-0.5 font-bold tabular-nums">
        {numerator}
      </span>
      <span className="px-2 pt-0.5 font-bold tabular-nums">{denominator}</span>
    </span>
  )
}

/** Сетка чисел от 1 до max с подсветкой выбранных. */
export function NumberGrid({
  max,
  cols = 10,
  highlight,
}: {
  max: number
  cols?: number
  /** Для каждого числа — цвет фона или null. */
  highlight: (value: number) => string | null
}) {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: max }, (_, index) => index + 1).map((value) => {
        const color = highlight(value)
        return (
          <div
            key={value}
            className="flex aspect-square items-center justify-center rounded-md border border-slate-200 text-sm tabular-nums transition"
            style={color ? { background: color, borderColor: color, color: '#ffffff' } : undefined}
          >
            {value}
          </div>
        )
      })}
    </div>
  )
}
