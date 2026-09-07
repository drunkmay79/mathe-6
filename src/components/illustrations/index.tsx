/* eslint-disable react-refresh/only-export-components --
   Это реестр рисунков, а не модуль с компонентами: наружу отдаются таблица
   и функция проверки. Горячая перезагрузка при правке картинки просто
   перезагрузит страницу целиком — на разработку это не влияет. */
import type { ReactElement } from 'react'

/**
 * Рисунки к урокам.
 *
 * Каждая картинка объясняет одну мысль — ту, которую словами объяснять долго.
 * Правило простое: если рисунок можно убрать и ничего не потеряется, он лишний.
 *
 * Рисуются кодом, а не лежат картинками: остаются чёткими на любом экране,
 * ничего не весят и правятся одной строкой.
 */

const INK = '#334155'
const MUTED = '#94a3b8'
const BLUE = '#2f5ecb'
const BLUE_SOFT = '#dbe4fb'
const AMBER = '#c2761a'
const AMBER_SOFT = '#fbe3c2'
const GREEN = '#047857'

/* ------------------------------------------------------- числовая прямая */

const STEP = 44
const START_X = 34

const at = (n: number) => START_X + n * STEP

type NumberLineProps = {
  /** Сколько делений показывать: 0, 1, … max. */
  max: number
  y: number
  /** Числа, которые надо выделить цветом. */
  highlight: number[]
  color: string
}

function NumberLine({ max, y, highlight, color }: NumberLineProps) {
  return (
    <>
      <line x1={at(0)} y1={y} x2={at(max) + 22} y2={y} stroke={INK} strokeWidth="2" />
      <path d={`M ${at(max) + 22} ${y} l -9 -5 v 10 z`} fill={INK} />
      {Array.from({ length: max + 1 }, (_, n) => {
        const marked = highlight.includes(n)
        return (
          <g key={n}>
            <line
              x1={at(n)}
              y1={y - (marked ? 7 : 4)}
              x2={at(n)}
              y2={y + (marked ? 7 : 4)}
              stroke={marked ? color : MUTED}
              strokeWidth={marked ? 2.5 : 1.5}
            />
            <text
              x={at(n)}
              y={y + 26}
              textAnchor="middle"
              fontSize="14"
              fontWeight={marked ? 700 : 400}
              fill={marked ? color : MUTED}
            >
              {n}
            </text>
          </g>
        )
      })}
    </>
  )
}

/** Дуга прыжка над числовой прямой с подписью вроде «+3». */
function Jump({
  from,
  to,
  y,
  label,
  color,
}: {
  from: number
  to: number
  y: number
  label: string
  color: string
}) {
  const apexControl = y - 62
  return (
    <>
      <path
        d={`M ${at(from)} ${y - 9} Q ${(at(from) + at(to)) / 2} ${apexControl} ${at(to)} ${y - 9}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text
        x={(at(from) + at(to)) / 2}
        y={y - 40}
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={color}
      >
        {label}
      </text>
    </>
  )
}

/* ------------------------------------------------------------- рисунки */

/** Кратные как прыжки по числовой прямой. */
function VielfacheSpruenge() {
  return (
    <svg
      viewBox="0 0 600 130"
      className="w-full"
      role="img"
      aria-label="Числовая прямая от нуля до двенадцати, прыжки по три: 3, 6, 9, 12"
    >
      <NumberLine max={12} y={92} highlight={[0, 3, 6, 9, 12]} color={BLUE} />
      {[
        [0, 3],
        [3, 6],
        [6, 9],
        [9, 12],
      ].map(([from, to]) => (
        <Jump key={from} from={from} to={to} y={92} label="+3" color={BLUE} />
      ))}
    </svg>
  )
}

/** Прямоугольники из 12 квадратиков: стороны и есть делители. */
function TeilerRechtecke() {
  const cell = 19
  const shapes = [
    { rows: 1, cols: 12, x: 16, label: '1 · 12' },
    { rows: 2, cols: 6, x: 282, label: '2 · 6' },
    { rows: 3, cols: 4, x: 434, label: '3 · 4' },
  ]
  const bottom = 96

  return (
    <svg
      viewBox="0 0 600 132"
      className="w-full"
      role="img"
      aria-label="Из двенадцати квадратиков складываются три прямоугольника: один на двенадцать, два на шесть, три на четыре"
    >
      {shapes.map((shape) => {
        const width = shape.cols * cell
        const top = bottom - shape.rows * cell
        return (
          <g key={shape.label}>
            {Array.from({ length: shape.rows }, (_, row) =>
              Array.from({ length: shape.cols }, (_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={shape.x + col * cell}
                  y={top + row * cell}
                  width={cell}
                  height={cell}
                  fill={BLUE_SOFT}
                  stroke={BLUE}
                  strokeWidth="1.5"
                />
              )),
            )}
            <text
              x={shape.x + width / 2}
              y={bottom + 24}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={BLUE}
            >
              {shape.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** Два прыгуна с разным шагом впервые встречаются — это kgV. */
function KgvTreffen() {
  const meeting = at(12)
  return (
    <svg
      viewBox="0 0 600 232"
      className="w-full"
      role="img"
      aria-label="Прыжки по четыре и прыжки по шесть впервые совпадают на числе двенадцать"
    >
      <NumberLine max={12} y={62} highlight={[4, 8, 12]} color={BLUE} />
      {[
        [0, 4],
        [4, 8],
        [8, 12],
      ].map(([from, to]) => (
        <Jump key={from} from={from} to={to} y={62} label="+4" color={BLUE} />
      ))}

      <NumberLine max={12} y={186} highlight={[6, 12]} color={AMBER} />
      {[
        [0, 6],
        [6, 12],
      ].map(([from, to]) => (
        <Jump key={from} from={from} to={to} y={186} label="+6" color={AMBER} />
      ))}

      {/* место встречи */}
      <line
        x1={meeting}
        y1={70}
        x2={meeting}
        y2={178}
        stroke={GREEN}
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <circle cx={meeting} cy={62} r="9" fill="none" stroke={GREEN} strokeWidth="2.5" />
      <circle cx={meeting} cy={186} r="9" fill="none" stroke={GREEN} strokeWidth="2.5" />
      <text x={meeting - 14} y={128} textAnchor="end" fontSize="15" fontWeight="700" fill={GREEN}>
        первая встреча
      </text>
    </svg>
  )
}

/** Наибольший общий делитель как самое большое число одинаковых пакетов. */
function GgtPakete() {
  const bags = Array.from({ length: 6 }, (_, index) => index)
  const bagWidth = 78
  const gap = 16

  return (
    <svg
      viewBox="0 0 600 150"
      className="w-full"
      role="img"
      aria-label="Шесть одинаковых пакетов, в каждом две конфеты и три наклейки"
    >
      {bags.map((index) => {
        const x = 20 + index * (bagWidth + gap)
        return (
          <g key={index}>
            <rect
              x={x}
              y={16}
              width={bagWidth}
              height={96}
              rx="10"
              fill="#ffffff"
              stroke={MUTED}
              strokeWidth="1.5"
            />
            {[0, 1].map((dot) => (
              <circle
                key={`b${dot}`}
                cx={x + 26 + dot * 26}
                cy={46}
                r="10"
                fill={BLUE_SOFT}
                stroke={BLUE}
                strokeWidth="1.5"
              />
            ))}
            {[0, 1, 2].map((dot) => (
              <circle
                key={`a${dot}`}
                cx={x + 19 + dot * 20}
                cy={84}
                r="9"
                fill={AMBER_SOFT}
                stroke={AMBER}
                strokeWidth="1.5"
              />
            ))}
          </g>
        )
      })}
      <text x="20" y="138" fontSize="14" fontWeight="600" fill={BLUE}>
        12 конфет = 6 · 2
      </text>
      <text x="330" y="138" fontSize="14" fontWeight="600" fill={AMBER}>
        18 наклеек = 6 · 3
      </text>
    </svg>
  )
}

/* ----------------------------------------------------------- реестр */

export const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  'vielfache-spruenge': VielfacheSpruenge,
  'teiler-rechtecke': TeilerRechtecke,
  'kgv-treffen': KgvTreffen,
  'ggt-pakete': GgtPakete,
}

export function hasIllustration(id: string): boolean {
  return id in ILLUSTRATIONS
}
