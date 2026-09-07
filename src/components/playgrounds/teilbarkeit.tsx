import { useState } from 'react'
import { Lamp, NumberGrid, Stepper } from './shared'

/** Тренажёры к темам про признаки делимости. */

/* ------------------------------------- 1. лампочки по последней цифре */

export function EndzifferLampen() {
  const [digit, setDigit] = useState(4)
  const number = 240 + digit

  return (
    <div className="space-y-4">
      <p className="text-center text-4xl font-bold tabular-nums">
        24<span className="text-accent">{digit}</span>
      </p>
      <div>
        <p className="ru-text mb-2 text-sm">Меняй последнюю цифру:</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }, (_, value) => (
            <button
              key={value}
              type="button"
              onClick={() => setDigit(value)}
              className={`size-12 rounded-xl border text-lg font-semibold transition ${
                digit === value
                  ? 'border-accent bg-accent text-white'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Lamp label="делится на 2" on={number % 2 === 0} />
        <Lamp label="делится на 5" on={number % 5 === 0} />
        <Lamp label="делится на 10" on={number % 10 === 0} />
      </div>
    </div>
  )
}

/* ------------------------------------------------- 2. сито из чисел */

const FILTERS = [2, 5, 10]

export function ZahlenSieb() {
  const [active, setActive] = useState<number[]>([2])

  const toggle = (value: number) =>
    setActive((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => toggle(filter)}
            aria-pressed={active.includes(filter)}
            className={`rounded-xl border px-4 py-2.5 font-semibold transition ${
              active.includes(filter)
                ? 'border-accent bg-accent text-white'
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            делится на {filter}
          </button>
        ))}
      </div>

      <NumberGrid
        max={60}
        highlight={(value) =>
          active.length > 0 && active.every((filter) => value % filter === 0) ? '#2f5ecb' : null
        }
      />

      <p className="ru-text text-sm">
        {active.length === 0
          ? 'Включи хотя бы одну кнопку.'
          : active.length === 1
            ? `Подсвечены числа, которые делятся на ${active[0]}. Видишь, как они идут ровным шагом?`
            : `Подсвечены числа, которые делятся сразу на ${active.join(' и на ')}.`}
      </p>
    </div>
  )
}

/* --------------------------------------------- 3. чётность через пары */

export function GeradePaare() {
  const [count, setCount] = useState(7)
  const pairs = Math.floor(count / 2)
  const odd = count % 2 === 1
  const radius = 13
  const gap = 34

  return (
    <div className="space-y-3">
      <Stepper label="Точек" value={count} min={1} max={14} onChange={setCount} />

      <svg
        viewBox={`0 0 ${gap * 8} 90`}
        width={gap * 8}
        height={90}
        className="max-w-full"
        role="img"
        aria-label={`${count} точек, разбитых на пары`}
      >
        {Array.from({ length: pairs }, (_, index) => (
          <g key={index}>
            <rect
              x={index * gap * 1.15 + 4}
              y={8}
              width={gap}
              height={2 * gap}
              rx="10"
              fill="#eef2ff"
              stroke="#2f5ecb"
              strokeWidth="1.5"
            />
            <circle cx={index * gap * 1.15 + 4 + gap / 2} cy={30} r={radius} fill="#2f5ecb" />
            <circle cx={index * gap * 1.15 + 4 + gap / 2} cy={30 + gap} r={radius} fill="#2f5ecb" />
          </g>
        ))}
        {odd && <circle cx={pairs * gap * 1.15 + 4 + gap / 2} cy={30} r={radius} fill="#c2761a" />}
      </svg>

      <div className="flex flex-wrap gap-2">
        <Lamp label="разбилось на пары без остатка" on={!odd} />
      </div>
      <p className="text-lg">
        {odd
          ? `${count} — ungerade (нечётное): одна точка осталась без пары.`
          : `${count} — gerade (чётное): пар получилось ровно ${pairs}.`}
      </p>
    </div>
  )
}

/* ---------------------------------------- 4. машина для суммы цифр */

export function QuersummeMaschine() {
  const [digits, setDigits] = useState([4, 3, 6])
  const number = digits[0] * 100 + digits[1] * 10 + digits[2]
  const sum = digits[0] + digits[1] + digits[2]

  const setDigit = (index: number, value: number) =>
    setDigits((current) => current.map((digit, position) => (position === index ? value : digit)))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-4">
        {digits.map((digit, index) => (
          <Stepper
            key={index}
            label={['сотни', 'десятки', 'единицы'][index]}
            value={digit}
            min={index === 0 ? 1 : 0}
            max={9}
            onChange={(value) => setDigit(index, value)}
          />
        ))}
      </div>
      <p className="text-center text-3xl font-bold tabular-nums">{number}</p>
      <p className="text-center text-xl">
        {digits[0]} + {digits[1]} + {digits[2]} = <strong className="text-accent">{sum}</strong>
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Lamp label="сумма цифр делится на 3" on={sum % 3 === 0} />
        <Lamp label="и само число на 3" on={number % 3 === 0} />
        <Lamp label="сумма цифр делится на 9" on={sum % 9 === 0} />
        <Lamp label="и само число на 9" on={number % 9 === 0} />
      </div>
      <p className="ru-text text-center text-sm">
        Верхние и нижние лампочки всегда загораются вместе. В этом и весь смысл правила.
      </p>
    </div>
  )
}

/* ------------------------------------------ 5. перемешиватель цифр */

const START = [1, 4, 7, 2]

export function ZiffernMischer() {
  const [digits, setDigits] = useState(START)
  const number = Number(digits.join(''))
  const sum = digits.reduce((total, digit) => total + digit, 0)

  const shuffle = () =>
    setDigits((current) => {
      const next = [...current]
      for (let index = next.length - 1; index > 0; index--) {
        const other = Math.floor(Math.random() * (index + 1))
        ;[next[index], next[other]] = [next[other], next[index]]
      }
      return next
    })

  return (
    <div className="space-y-4">
      <p className="text-center text-4xl font-bold tabular-nums">{number}</p>
      <p className="text-center text-lg">
        Сумма цифр: {digits.join(' + ')} = <strong className="text-accent">{sum}</strong>
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={shuffle}
          className="rounded-xl bg-accent px-5 py-2.5 font-medium text-white transition hover:opacity-90"
        >
          Перемешать цифры
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Lamp label="делится на 3" on={number % 3 === 0} />
        <Lamp label="делится на 9" on={number % 9 === 0} />
      </div>
      <p className="ru-text text-center text-sm">
        Число меняется каждый раз, а сумма цифр — нет. Поэтому и ответ про делимость на 3 не
        меняется: правило смотрит только на сумму.
      </p>
    </div>
  )
}

/* -------------------------------------------- 6. лесенка сумм цифр */

function digitSum(value: number): number {
  return String(value)
    .split('')
    .reduce((total, digit) => total + Number(digit), 0)
}

export function QuersummeTreppe() {
  const [value, setValue] = useState(7986)

  const chain: number[] = [value]
  while (chain[chain.length - 1] > 9) chain.push(digitSum(chain[chain.length - 1]))
  const last = chain[chain.length - 1]

  return (
    <div className="space-y-4">
      <Stepper label="Число" value={value} min={100} max={9999} onChange={setValue} />
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setValue(Math.floor(1000 + Math.random() * 8999))}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition hover:border-slate-400"
        >
          Взять случайное число
        </button>
      </div>
      <p className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold tabular-nums">
        {chain.map((step, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-ink-soft">→</span>}
            <span className={index === chain.length - 1 ? 'text-accent' : undefined}>{step}</span>
          </span>
        ))}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Lamp label="число делится на 3" on={value % 3 === 0} />
        <Lamp label="последняя цифра лесенки — 3, 6 или 9" on={[3, 6, 9].includes(last)} />
      </div>
      <p className="ru-text text-center text-sm">
        Складывай цифры, пока не останется одна. Если в конце получились 3, 6 или 9 — исходное число
        делится на 3. Работает с любым числом, даже очень большим.
      </p>
    </div>
  )
}
