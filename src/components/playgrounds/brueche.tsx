import { useState } from 'react'
import { CircleShape, NumberLineShape } from '../Figure'
import { Bar, Choice, FractionText, Lamp, Stepper } from './shared'

/** Тренажёры к темам про дроби. */

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/* ============================================ доля целого (тема 4) */

export function AnteilMalen() {
  const [total, setTotal] = useState(8)
  const [filled, setFilled] = useState<Set<number>>(new Set([0, 1, 2]))

  const toggle = (index: number) => {
    const next = new Set(filled)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    setFilled(next)
  }

  return (
    <div className="space-y-4">
      <Stepper
        label="Частей всего"
        value={total}
        min={2}
        max={12}
        onChange={(next) => {
          setTotal(next)
          setFilled(new Set())
        }}
      />
      <div className="flex justify-center">
        <CircleShape total={total} filled={filled} onToggle={toggle} />
      </div>
      <p className="text-center text-2xl">
        Закрашено <FractionText numerator={filled.size} denominator={total} />
      </p>
    </div>
  )
}

export function BruchAnatomie() {
  const [part, setPart] = useState<'zaehler' | 'nenner'>('zaehler')
  const total = 8
  const shaded = 3
  const filled = new Set(Array.from({ length: shaded }, (_, index) => index))

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setPart('zaehler')}
          className={`rounded-xl border px-4 py-2.5 font-semibold transition ${
            part === 'zaehler'
              ? 'border-accent bg-accent text-white'
              : 'border-slate-300 hover:border-slate-400'
          }`}
        >
          Zähler
        </button>
        <button
          type="button"
          onClick={() => setPart('nenner')}
          className={`rounded-xl border px-4 py-2.5 font-semibold transition ${
            part === 'nenner'
              ? 'border-accent bg-accent text-white'
              : 'border-slate-300 hover:border-slate-400'
          }`}
        >
          Nenner
        </button>
      </div>

      <p className="text-center text-5xl">
        <span className="inline-flex flex-col items-center leading-none">
          <span
            className={`border-b-4 px-3 pb-1 font-bold transition ${
              part === 'zaehler' ? 'border-accent text-accent' : 'border-ink text-ink-soft'
            }`}
          >
            {shaded}
          </span>
          <span
            className={`px-3 pt-1 font-bold transition ${
              part === 'nenner' ? 'text-accent' : 'text-ink-soft'
            }`}
          >
            {total}
          </span>
        </span>
      </p>

      <div className="flex justify-center">
        <CircleShape total={total} filled={part === 'zaehler' ? filled : new Set()} />
      </div>

      <p className="text-center text-lg">
        {part === 'zaehler'
          ? 'Zähler — верхнее число. Оно считает, сколько частей взяли: закрашено 3.'
          : 'Nenner — нижнее число. Оно называет, на сколько равных частей разрезали целое: их 8.'}
      </p>
    </div>
  )
}

const WHOLES = ['круг', 'полоска', '12 конфет']

export function GanzesWechseln() {
  const [fraction, setFraction] = useState(1)
  const [whole, setWhole] = useState(0)
  const denominators = [2, 3, 4, 6]
  const denominator = denominators[fraction]
  const candies = 12
  const share = candies / denominator

  return (
    <div className="space-y-4">
      <Choice
        label="Берём"
        options={denominators.map((value) => `1/${value}`)}
        value={fraction}
        onChange={setFraction}
      />
      <Choice label="От чего" options={WHOLES} value={whole} onChange={setWhole} />

      <div className="flex min-h-40 items-center justify-center">
        {whole === 0 && <CircleShape total={denominator} filled={new Set([0])} />}
        {whole === 1 && <Bar parts={denominator} shaded={1} />}
        {whole === 2 && (
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: candies }, (_, index) => (
              <span
                key={index}
                className={`size-8 rounded-full border-2 ${
                  index < share ? 'border-accent bg-accent/30' : 'border-slate-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-lg">
        {whole === 2
          ? `Одна ${denominator}-я часть от 12 конфет — это ${share} конфеты.`
          : `Одна ${denominator}-я часть целого. Само целое разное, а доля называется одинаково.`}
      </p>
      <p className="ru-text text-center text-sm">
        Дробь всегда говорит «часть от чего-то». Поменяли целое — поменялся и размер части.
      </p>
    </div>
  )
}

/* ================================= сокращение и расширение (тема 5) */

const BASES = [
  { numerator: 1, denominator: 2 },
  { numerator: 2, denominator: 3 },
  { numerator: 3, denominator: 4 },
]

export function KuerzenSchieber() {
  const [base, setBase] = useState(0)
  const [times, setTimes] = useState(1)
  const { numerator, denominator } = BASES[base]

  return (
    <div className="space-y-4">
      <Choice
        label="Дробь"
        options={BASES.map((item) => `${item.numerator}/${item.denominator}`)}
        value={base}
        onChange={setBase}
      />
      <Stepper label="Умножить на" value={times} min={1} max={6} onChange={setTimes} />

      <div className="space-y-2">
        <Bar parts={denominator} shaded={numerator} />
        <Bar parts={denominator * times} shaded={numerator * times} />
      </div>

      <p className="text-center text-xl">
        <FractionText numerator={numerator} denominator={denominator} /> ={' '}
        <FractionText numerator={numerator * times} denominator={denominator * times} />
      </p>
      <p className="ru-text text-center text-sm">
        Полоски закрашены одинаково — значит это одна и та же величина, просто нарезанная мельче.
      </p>
    </div>
  )
}

export function BruchZoom() {
  const [state, setState] = useState({ numerator: 1, denominator: 2 })
  const canMerge = state.numerator % 2 === 0 && state.denominator % 2 === 0

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Bar parts={state.denominator} shaded={state.numerator} />
      </div>
      <p className="text-center text-3xl">
        <FractionText numerator={state.numerator} denominator={state.denominator} />
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() =>
            setState((current) => ({
              numerator: current.numerator * 2,
              denominator: current.denominator * 2,
            }))
          }
          disabled={state.denominator > 12}
          className="rounded-xl bg-accent px-4 py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-40"
        >
          Разрезать каждую часть пополам
        </button>
        <button
          type="button"
          onClick={() =>
            setState((current) => ({
              numerator: current.numerator / 2,
              denominator: current.denominator / 2,
            }))
          }
          disabled={!canMerge}
          className="rounded-xl border border-slate-300 px-4 py-2.5 transition hover:border-slate-400 disabled:opacity-40"
        >
          Склеить части по две
        </button>
      </div>
      <p className="ru-text text-center text-sm">
        Резать — это erweitern, склеивать — kürzen. Закрашенная часть полоски не меняется ни разу:
        меняются только числа, которыми её называют.
      </p>
    </div>
  )
}

export function KuerzenJagd() {
  const [state, setState] = useState({ numerator: 18, denominator: 24 })
  const divisor = gcd(state.numerator, state.denominator)
  const done = divisor === 1

  return (
    <div className="space-y-4">
      <p className="text-center text-4xl">
        <FractionText numerator={state.numerator} denominator={state.denominator} />
      </p>
      <p className="ru-text text-center text-sm">Раздели числитель и знаменатель на одно число:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[2, 3, 4, 5, 6, 9].map((candidate) => {
          const fits = state.numerator % candidate === 0 && state.denominator % candidate === 0
          return (
            <button
              key={candidate}
              type="button"
              disabled={!fits}
              onClick={() =>
                setState((current) => ({
                  numerator: current.numerator / candidate,
                  denominator: current.denominator / candidate,
                }))
              }
              className="size-12 rounded-xl border border-slate-300 text-lg font-semibold transition hover:border-accent disabled:opacity-25"
            >
              :{candidate}
            </button>
          )
        })}
      </div>
      <div className="flex justify-center">
        <Lamp label="сокращено полностью" on={done} />
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setState({ numerator: 18, denominator: 24 })}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:border-slate-400"
        >
          Начать заново
        </button>
      </div>
      <p className="ru-text text-center text-sm">
        Серые кнопки не нажимаются: на это число делится только одно из двух чисел дроби, а нужно
        обязательно оба.
      </p>
    </div>
  )
}

/* ================================ сравнение и порядок (тема 6) */

export function BruecheVergleichen() {
  const [first, setFirst] = useState({ numerator: 2, denominator: 3 })
  const [second, setSecond] = useState({ numerator: 3, denominator: 5 })

  const value = (fraction: { numerator: number; denominator: number }) =>
    fraction.numerator / fraction.denominator
  const sign = value(first) > value(second) ? '>' : value(first) < value(second) ? '<' : '='

  const controls = (
    fraction: { numerator: number; denominator: number },
    set: (value: { numerator: number; denominator: number }) => void,
  ) => (
    <div className="space-y-2">
      <Stepper
        label="Числитель"
        value={fraction.numerator}
        min={0}
        max={fraction.denominator}
        onChange={(numerator) => set({ ...fraction, numerator })}
      />
      <Stepper
        label="Знаменатель"
        value={fraction.denominator}
        min={1}
        max={12}
        onChange={(denominator) =>
          set({ denominator, numerator: Math.min(fraction.numerator, denominator) })
        }
      />
      <Bar parts={fraction.denominator} shaded={fraction.numerator} width={280} />
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-5 sm:grid-cols-2">
        {controls(first, setFirst)}
        {controls(second, setSecond)}
      </div>
      <p className="text-center text-2xl font-bold">
        <FractionText numerator={first.numerator} denominator={first.denominator} />{' '}
        <span className="text-accent">{sign}</span>{' '}
        <FractionText numerator={second.numerator} denominator={second.denominator} />
      </p>
    </div>
  )
}

export function GleichnamigMachen() {
  const [first, setFirst] = useState({ numerator: 2, denominator: 3 })
  const [second, setSecond] = useState({ numerator: 3, denominator: 4 })
  const [shown, setShown] = useState(false)

  const common =
    (first.denominator * second.denominator) / gcd(first.denominator, second.denominator)
  const firstTimes = common / first.denominator
  const secondTimes = common / second.denominator

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Stepper
          label="Знаменатель 1"
          value={first.denominator}
          min={2}
          max={12}
          onChange={(denominator) =>
            setFirst({ denominator, numerator: Math.min(first.numerator, denominator) })
          }
        />
        <Stepper
          label="Знаменатель 2"
          value={second.denominator}
          min={2}
          max={12}
          onChange={(denominator) =>
            setSecond({ denominator, numerator: Math.min(second.numerator, denominator) })
          }
        />
      </div>

      <p className="text-center text-2xl">
        <FractionText numerator={first.numerator} denominator={first.denominator} /> и{' '}
        <FractionText numerator={second.numerator} denominator={second.denominator} />
      </p>

      {!shown ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShown(true)}
            className="rounded-xl bg-accent px-5 py-2.5 font-medium text-white transition hover:opacity-90"
          >
            Привести к общему знаменателю
          </button>
        </div>
      ) : (
        <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-center">
          <p>
            Общий знаменатель — это kgV({first.denominator}; {second.denominator}) ={' '}
            <strong>{common}</strong>
          </p>
          <p className="text-xl">
            <FractionText numerator={first.numerator} denominator={first.denominator} /> ·{' '}
            {firstTimes} ={' '}
            <FractionText
              numerator={first.numerator * firstTimes}
              denominator={common}
              className="text-accent"
            />
          </p>
          <p className="text-xl">
            <FractionText numerator={second.numerator} denominator={second.denominator} /> ·{' '}
            {secondTimes} ={' '}
            <FractionText
              numerator={second.numerator * secondTimes}
              denominator={common}
              className="text-accent"
            />
          </p>
          <p className="ru-text text-sm">
            Теперь знаменатели одинаковые — сравнивать надо только числители.
          </p>
          <button
            type="button"
            onClick={() => setShown(false)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:border-slate-400"
          >
            Спрятать
          </button>
        </div>
      )}
    </div>
  )
}

const TO_SORT = [
  { numerator: 3, denominator: 4 },
  { numerator: 1, denominator: 2 },
  { numerator: 5, denominator: 8 },
  { numerator: 1, denominator: 3 },
]

export function BruchSortierer() {
  const [picked, setPicked] = useState<number[]>([])
  const [wrong, setWrong] = useState<number | null>(null)

  const order = [...TO_SORT.keys()].sort(
    (a, b) =>
      TO_SORT[a].numerator / TO_SORT[a].denominator - TO_SORT[b].numerator / TO_SORT[b].denominator,
  )

  const tap = (index: number) => {
    if (picked.includes(index)) return
    if (order[picked.length] === index) {
      setPicked([...picked, index])
      setWrong(null)
    } else {
      setWrong(index)
    }
  }

  return (
    <div className="space-y-4">
      <p className="ru-text text-center text-sm">
        Нажимай дроби по порядку — от самой маленькой к самой большой.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {TO_SORT.map((fraction, index) => (
          <button
            key={index}
            type="button"
            onClick={() => tap(index)}
            className={`flex w-24 flex-col items-center gap-1 rounded-xl border-2 p-3 text-xl transition ${
              picked.includes(index)
                ? 'border-emerald-400 bg-emerald-50'
                : wrong === index
                  ? 'border-amber-400 bg-amber-50'
                  : 'border-slate-300 hover:border-accent'
            }`}
          >
            <FractionText numerator={fraction.numerator} denominator={fraction.denominator} />
            {picked.includes(index) && (
              <span className="text-sm font-semibold text-emerald-700">
                {picked.indexOf(index) + 1}
              </span>
            )}
          </button>
        ))}
      </div>

      {picked.length === TO_SORT.length ? (
        <p className="text-center text-lg font-semibold text-emerald-700">
          Готово! Порядок правильный.
        </p>
      ) : wrong !== null ? (
        <p className="text-center text-amber-700">
          Эта пока не самая маленькая из оставшихся. Посмотри на полоски внизу.
        </p>
      ) : null}

      <div className="space-y-1">
        {TO_SORT.map((fraction, index) => (
          <Bar
            key={index}
            parts={fraction.denominator}
            shaded={fraction.numerator}
            width={260}
            color={picked.includes(index) ? '#047857' : '#2f5ecb'}
            soft={picked.includes(index) ? '#bbf7d0' : '#c7d6f7'}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            setPicked([])
            setWrong(null)
          }}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:border-slate-400"
        >
          Начать заново
        </button>
      </div>
    </div>
  )
}

/* ==================================== числовая прямая (тема 7) */

export function BruchAmStrahl() {
  const [parts, setParts] = useState(4)
  const [tick, setTick] = useState(3)
  const divisor = gcd(tick, parts) || 1

  return (
    <div className="space-y-4">
      <Stepper
        label="Долей в целом"
        value={parts}
        min={2}
        max={10}
        onChange={(next) => {
          setParts(next)
          setTick(Math.min(tick, next * 2))
        }}
      />
      <div className="overflow-x-auto">
        <NumberLineShape from={0} to={2} parts={parts} picked={tick} onPick={setTick} />
      </div>
      <p className="text-center text-xl">
        Этот штрих — это <FractionText numerator={tick} denominator={parts} />
        {divisor > 1 && (
          <>
            , после сокращения{' '}
            <FractionText
              numerator={tick / divisor}
              denominator={parts / divisor}
              className="text-accent"
            />
          </>
        )}
        {tick % parts === 0 && <span className="ru-text"> — то есть целое число</span>}
      </p>
    </div>
  )
}

export function StrahlLupe() {
  const [level, setLevel] = useState(0)
  const parts = 2 ** (level + 1)
  const tick = parts / 2

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <NumberLineShape from={0} to={1} parts={parts} marks={[tick]} />
      </div>
      <p className="text-center text-2xl">
        Стрелка стоит на месте, а имя у точки новое:{' '}
        <FractionText numerator={tick} denominator={parts} className="text-accent" />
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setLevel((value) => Math.min(3, value + 1))}
          disabled={level >= 3}
          className="rounded-xl bg-accent px-4 py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-40"
        >
          Поделить мельче
        </button>
        <button
          type="button"
          onClick={() => setLevel(0)}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition hover:border-slate-400"
        >
          Сначала
        </button>
      </div>
      <p className="ru-text text-center text-sm">
        Одна и та же точка на прямой называется 1/2, 2/4, 4/8, 8/16 — это всё одно и то же число.
        Такие дроби называют gleichwertig, равнозначными.
      </p>
    </div>
  )
}

export function GemischteZahlStrahl() {
  const [tick, setTick] = useState(7)
  const parts = 4
  const whole = Math.floor(tick / parts)
  const rest = tick % parts

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <NumberLineShape from={0} to={3} parts={parts} picked={tick} onPick={setTick} />
      </div>
      <p className="text-center text-xl">
        Неправильная дробь: <FractionText numerator={tick} denominator={parts} />
      </p>
      <p className="text-center text-xl">
        Смешанное число:{' '}
        {rest === 0 ? (
          <strong className="text-accent">{whole}</strong>
        ) : (
          <>
            <strong className="text-accent">{whole > 0 ? whole : ''}</strong>{' '}
            <FractionText numerator={rest} denominator={parts} className="text-accent" />
          </>
        )}
      </p>
      <p className="ru-text text-center text-sm">
        Целых частей прошли {whole}, и осталось ещё {rest} из {parts}. Это одно и то же число,
        записанное двумя способами.
      </p>
    </div>
  )
}
