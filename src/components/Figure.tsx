import type { Figure } from '@/content/schema'

/**
 * Фигуры из учебника: сетка, круг и числовая прямая.
 *
 * Одни и те же формы нужны и просто как картинка к условию, и как поле ответа —
 * когда долю надо закрасить самой или ткнуть в нужный штрих. Поэтому у каждой
 * есть необязательный обработчик нажатия: без него это картинка, с ним — ответ.
 */

const BLUE = '#2f5ecb'
const BLUE_SOFT = '#c7d6f7'
const LINE = '#94a3b8'
const INK = '#334155'

/* ------------------------------------------------------------------ сетка */

type ShapeProps = {
  total: number
  /** Индексы закрашенных частей. */
  filled: Set<number>
  /** Есть обработчик — значит по фигуре можно нажимать. */
  onToggle?: (index: number) => void
}

export function GridShape({ total, cols, filled, onToggle }: ShapeProps & { cols: number }) {
  const cell = 34
  const rows = Math.ceil(total / cols)
  const width = cols * cell
  const height = rows * cell
  const interactive = Boolean(onToggle)

  return (
    <svg
      viewBox={`0 0 ${width + 2} ${height + 2}`}
      width={width + 2}
      height={height + 2}
      className="max-w-full"
      role="img"
      aria-label={`Фигура из ${total} частей, закрашено ${filled.size}`}
    >
      {Array.from({ length: total }, (_, index) => (
        <rect
          key={index}
          x={1 + (index % cols) * cell}
          y={1 + Math.floor(index / cols) * cell}
          width={cell}
          height={cell}
          fill={filled.has(index) ? BLUE_SOFT : '#ffffff'}
          stroke={filled.has(index) ? BLUE : LINE}
          strokeWidth="1.5"
          onClick={onToggle ? () => onToggle(index) : undefined}
          className={interactive ? 'cursor-pointer' : undefined}
        />
      ))}
    </svg>
  )
}

/* -------------------------------------------------------------------- круг */

export function CircleShape({ total, filled, onToggle }: ShapeProps) {
  const size = 150
  const center = size / 2
  const radius = center - 4
  const step = (2 * Math.PI) / total
  const interactive = Boolean(onToggle)

  const sector = (index: number) => {
    const start = -Math.PI / 2 + index * step
    const end = start + step
    const x1 = center + radius * Math.cos(start)
    const y1 = center + radius * Math.sin(start)
    const x2 = center + radius * Math.cos(end)
    const y2 = center + radius * Math.sin(end)
    const largeArc = step > Math.PI ? 1 : 0
    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="max-w-full"
      role="img"
      aria-label={`Круг из ${total} частей, закрашено ${filled.size}`}
    >
      {total === 1 ? (
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill={filled.has(0) ? BLUE_SOFT : '#ffffff'}
          stroke={BLUE}
          strokeWidth="1.5"
          onClick={onToggle ? () => onToggle(0) : undefined}
          className={interactive ? 'cursor-pointer' : undefined}
        />
      ) : (
        Array.from({ length: total }, (_, index) => (
          <path
            key={index}
            d={sector(index)}
            fill={filled.has(index) ? BLUE_SOFT : '#ffffff'}
            stroke={filled.has(index) ? BLUE : LINE}
            strokeWidth="1.5"
            onClick={onToggle ? () => onToggle(index) : undefined}
            className={interactive ? 'cursor-pointer' : undefined}
          />
        ))
      )}
    </svg>
  )
}

/* -------------------------------------------------------- числовая прямая */

type NumberLineProps = {
  from: number
  to: number
  /** На сколько долей поделён каждый отрезок между целыми. */
  parts: number
  /** Штрихи со стрелками — то, что уже отмечено на картинке. */
  marks?: number[]
  /** Штрих, выбранный ученицей. */
  picked?: number | null
  onPick?: (tick: number) => void
}

export function NumberLineShape({ from, to, parts, marks = [], picked, onPick }: NumberLineProps) {
  const ticks = (to - from) * parts
  // Держим общую ширину около 560: на планшете это влезает без прокрутки,
  // а штрихи остаются достаточно крупными, чтобы попасть пальцем.
  const spacing = Math.min(46, Math.max(16, 560 / ticks))
  const left = 26
  const width = left * 2 + ticks * spacing
  const baseline = 74
  const x = (tick: number) => left + tick * spacing
  const interactive = Boolean(onPick)

  return (
    <svg
      viewBox={`0 0 ${width} 108`}
      width={width}
      height={108}
      className="max-w-full"
      role="img"
      aria-label={`Числовая прямая от ${from} до ${to}`}
    >
      <line x1={x(0)} y1={baseline} x2={x(ticks) + 18} y2={baseline} stroke={INK} strokeWidth="2" />
      <path d={`M ${x(ticks) + 18} ${baseline} l -9 -5 v 10 z`} fill={INK} />

      {Array.from({ length: ticks + 1 }, (_, tick) => {
        const whole = tick % parts === 0
        const chosen = picked === tick
        return (
          <g key={tick}>
            <line
              x1={x(tick)}
              y1={baseline - (whole ? 10 : 6)}
              x2={x(tick)}
              y2={baseline + (whole ? 10 : 6)}
              stroke={chosen ? BLUE : whole ? INK : LINE}
              strokeWidth={chosen ? 3 : whole ? 2 : 1.2}
            />
            {whole && (
              <text
                x={x(tick)}
                y={baseline + 30}
                textAnchor="middle"
                fontSize="15"
                fontWeight="600"
                fill={INK}
              >
                {from + tick / parts}
              </text>
            )}
            {chosen && <circle cx={x(tick)} cy={baseline} r="7" fill={BLUE} />}
            {onPick && (
              // Прозрачная область побольше самого штриха — чтобы попадать пальцем.
              <rect
                x={x(tick) - spacing / 2}
                y={baseline - 26}
                width={spacing}
                height={52}
                fill="transparent"
                onClick={() => onPick(tick)}
                className={interactive ? 'cursor-pointer' : undefined}
              />
            )}
          </g>
        )
      })}

      {marks.map((tick) => (
        <path key={tick} d={`M ${x(tick)} ${baseline - 16} l -6 -14 h 12 z`} fill={BLUE} />
      ))}
    </svg>
  )
}

/* ------------------------------------------------- картинка к условию */

/** Только для показа: то, что в учебнике нарисовано рядом с задачей. */
export function FigureView({ figure }: { figure: Figure }) {
  if (figure.shape === 'numberline') {
    return (
      <div className="my-4 overflow-x-auto">
        <NumberLineShape
          from={figure.from}
          to={figure.to}
          parts={figure.parts}
          marks={figure.marks}
        />
      </div>
    )
  }

  const filled = new Set(Array.from({ length: figure.shaded }, (_, index) => index))

  return (
    <div className="my-4">
      {figure.shape === 'grid' ? (
        <GridShape total={figure.total} cols={figure.cols} filled={filled} />
      ) : (
        <CircleShape total={figure.total} filled={filled} />
      )}
    </div>
  )
}
