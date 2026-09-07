import { useState } from 'react'
import { NumberLineShape } from '../Figure'
import { Stepper } from './shared'

/** Тренажёры к теме «Teiler und Vielfache». */

/* --------------------------------------- 1. прыгун по числовой прямой */

export function VielfacheHuepfer() {
  const [step, setStep] = useState(3)
  const [hops, setHops] = useState(1)
  const maxHops = Math.floor(24 / step)
  const landings = Array.from({ length: hops }, (_, index) => (index + 1) * step)

  return (
    <div className="space-y-3">
      <Stepper
        label="Шаг прыжка"
        value={step}
        min={2}
        max={9}
        onChange={(next) => {
          setStep(next)
          setHops(1)
        }}
      />
      <div className="overflow-x-auto">
        <NumberLineShape from={0} to={24} parts={1} marks={landings} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setHops((value) => Math.min(maxHops, value + 1))}
          disabled={hops >= maxHops}
          className="rounded-xl bg-accent px-5 py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-40"
        >
          Прыгнуть
        </button>
        <button
          type="button"
          onClick={() => setHops(1)}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition hover:border-slate-400"
        >
          Сначала
        </button>
      </div>
      <p className="text-lg">
        V<sub>{step}</sub> = {'{'}
        {landings.join('; ')}; …{'}'}
      </p>
    </div>
  )
}

/* ------------------------------------------- 2. строитель прямоугольников */

export function TeilerRechteckBauer() {
  const [total, setTotal] = useState(12)
  const [width, setWidth] = useState(3)

  const fits = total % width === 0
  const rows = Math.ceil(total / width)
  const cell = 26

  return (
    <div className="space-y-3">
      <Stepper
        label="Квадратиков"
        value={total}
        min={2}
        max={24}
        onChange={(next) => {
          setTotal(next)
          setWidth(Math.min(width, next))
        }}
      />
      <Stepper label="В ряд по" value={width} min={1} max={12} onChange={setWidth} />

      <svg
        viewBox={`0 0 ${12 * cell + 2} ${rows * cell + 2}`}
        width={width * cell + 2}
        height={rows * cell + 2}
        className="max-w-full"
      >
        {Array.from({ length: total }, (_, index) => {
          const column = index % width
          const row = Math.floor(index / width)
          const isRest = row === rows - 1 && total % width !== 0
          return (
            <rect
              key={index}
              x={1 + column * cell}
              y={1 + row * cell}
              width={cell}
              height={cell}
              fill={isRest ? '#fbe3c2' : '#c7d6f7'}
              stroke={isRest ? '#c2761a' : '#2f5ecb'}
              strokeWidth="1.5"
            />
          )
        })}
      </svg>

      <p className={`text-lg ${fits ? 'font-semibold text-emerald-700' : 'text-amber-700'}`}>
        {fits
          ? `Прямоугольник получился ровный: ${width} · ${total / width} = ${total}. Значит ${width} — делитель числа ${total}.`
          : `Последний ряд неполный — остаток ${total % width}. Значит ${width} не делитель числа ${total}.`}
      </p>
    </div>
  )
}

/* ------------------------------------------------- 3. живой ggT и kgV */

function divisors(value: number): number[] {
  return Array.from({ length: value }, (_, index) => index + 1).filter(
    (candidate) => value % candidate === 0,
  )
}

export function GgtKgvRechner() {
  const [first, setFirst] = useState(12)
  const [second, setSecond] = useState(18)

  const firstDivisors = divisors(first)
  const secondDivisors = divisors(second)
  const common = firstDivisors.filter((value) => secondDivisors.includes(value))
  const ggt = common[common.length - 1]

  const multiples = (value: number) => Array.from({ length: 8 }, (_, index) => value * (index + 1))
  const firstMultiples = multiples(first)
  const secondMultiples = multiples(second)
  const kgv = firstMultiples.find((value) => value % second === 0)

  const chip = (value: number, highlighted: boolean) => (
    <span
      key={value}
      className={`rounded-lg px-2 py-1 text-sm tabular-nums ${
        highlighted ? 'bg-emerald-100 font-bold text-emerald-800' : 'text-ink-soft'
      }`}
    >
      {value}
    </span>
  )

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-4">
        <Stepper label="Первое число" value={first} min={2} max={30} onChange={setFirst} />
        <Stepper label="Второе число" value={second} min={2} max={30} onChange={setSecond} />
      </div>

      <div className="rounded-xl bg-slate-50 p-3">
        <p className="ru-text mb-1 text-sm">Делители — общие подсвечены</p>
        <p className="flex flex-wrap gap-1">
          T<sub>{first}</sub>: {firstDivisors.map((value) => chip(value, common.includes(value)))}
        </p>
        <p className="mt-1 flex flex-wrap gap-1">
          T<sub>{second}</sub>: {secondDivisors.map((value) => chip(value, common.includes(value)))}
        </p>
        <p className="mt-2 text-lg font-semibold">
          ggT({first}; {second}) = {ggt}
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 p-3">
        <p className="ru-text mb-1 text-sm">Кратные — первое совпадение подсвечено</p>
        <p className="flex flex-wrap gap-1">
          V<sub>{first}</sub>: {firstMultiples.map((value) => chip(value, value === kgv))}
        </p>
        <p className="mt-1 flex flex-wrap gap-1">
          V<sub>{second}</sub>: {secondMultiples.map((value) => chip(value, value === kgv))}
        </p>
        <p className="mt-2 text-lg font-semibold">
          {kgv ? `kgV(${first}; ${second}) = ${kgv}` : 'Встреча дальше — увеличь список в уме'}
        </p>
      </div>
    </div>
  )
}
