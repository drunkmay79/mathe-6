import type { AutoCheckedExercise, Exercise } from '@/content/schema'

/**
 * Проверка ответов.
 *
 * Здесь сознательно много снисходительности к форме записи: ученица пишет
 * ответ на немецкой клавиатуре и в немецкой школьной нотации, а думает
 * по-русски. Ошибка формата не должна выглядеть как ошибка в математике —
 * иначе она начнёт исправлять правильное решение.
 *
 * Что принимаем как одно и то же число:
 *   "3,5"      немецкая запятая как разделитель дробной части
 *   "3.5"      международная точка
 *   "1.234,5"  точки — разделители тысяч, потому что есть запятая
 *   "1 234,5"  пробел вместо точки
 *   "20 cm"    хвост с единицей измерения отбрасывается
 *   "3/4"      обыкновенная дробь
 *
 * Ответ приходит сюда строкой — так его хранит карточка задания. Для заданий,
 * где ответ не текст, кодировку задают функции encodeFlags и encodePairs ниже.
 * Их же используют компоненты ввода, чтобы обе стороны договаривались явно,
 * а не через случайное совпадение формата.
 */

export type CheckReason =
  | 'empty'
  | 'unparsable'
  | 'wrong'
  | 'not-reduced'
  /** Всё названное верно, но названо не всё. */
  | 'incomplete'
  /** Есть лишнее сверх верного. */
  | 'extra'

export type CheckResult =
  { ok: true; note?: string } | { ok: false; reason: CheckReason; note?: string }

const DEFAULT_TOLERANCE = 1e-9

/** Пробелы любого вида (\s покрывает и неразрывный) и апострофы-разделители тысяч. */
const SEPARATORS = /[\s'’]/g

/**
 * Разбирает число из того, что набрала ученица. Возвращает null, если это не число.
 *
 * Правило про точку и запятую: если в записи есть запятая, она и есть
 * разделитель дробной части, а все точки — разделители тысяч. Если запятой нет,
 * единственная точка считается десятичной (так пишет калькулятор),
 * а несколько точек — разделителями тысяч.
 */
export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim()
  if (trimmed === '') return null

  // Отбрасываем хвост из букв и знаков: "20 cm", "15 €", "50 %", "12 cm²".
  const withoutUnit = trimmed.replace(/[^\d,.\-/]+$/u, '')
  const cleaned = withoutUnit.replace(SEPARATORS, '')
  if (cleaned === '') return null

  const fraction = parseFraction(cleaned)
  if (fraction) return fraction.numerator / fraction.denominator

  let normalized: string
  if (cleaned.includes(',')) {
    normalized = cleaned.replace(/\./g, '').replace(',', '.')
  } else if ((cleaned.match(/\./g)?.length ?? 0) > 1) {
    normalized = cleaned.replace(/\./g, '')
  } else {
    normalized = cleaned
  }

  if (!/^-?\d+(\.\d+)?$/.test(normalized)) return null
  const value = Number(normalized)
  return Number.isFinite(value) ? value : null
}

export type ParsedFraction = { numerator: number; denominator: number }

/** Разбирает "3/4" или "-3/4". Смешанные числа ("1 1/2") пока не поддерживаются. */
export function parseFraction(raw: string): ParsedFraction | null {
  const cleaned = raw.trim().replace(SEPARATORS, '')
  const match = /^(-?\d+)\/(-?\d+)$/.exec(cleaned)
  if (!match) return null

  const numerator = Number(match[1])
  const denominator = Number(match[2])
  if (denominator === 0) return null

  // Знак всегда переносим в числитель: -3/4 и 3/-4 — одна и та же дробь.
  return denominator < 0
    ? { numerator: -numerator, denominator: -denominator }
    : { numerator, denominator }
}

/**
 * Разбирает перечисление чисел: множество делителей или кратных.
 *
 * Принимает всё, чем их разделяют на письме и в учебнике:
 *   "1; 2; 4; 8"   "1, 2, 4, 8"   "1 2 4 8"   "{1; 2; 4; 8}"   "T_32 = {1; 2; 4}"
 *
 * Возвращает null, если хоть один элемент не число: молча выкидывать
 * непонятое опаснее, чем сказать «не смог прочитать».
 */
export function parseNumberList(raw: string): number[] | null {
  const withoutLabel = raw.includes('=') ? raw.slice(raw.lastIndexOf('=') + 1) : raw
  const inner = withoutLabel.replace(/[{}[\]]/g, '').trim()
  if (inner === '') return null

  const parts = inner.split(/[;,\s]+/).filter((part) => part !== '')
  if (parts.length === 0) return null

  const values: number[] = []
  for (const part of parts) {
    const value = parseNumber(part)
    if (value === null || !Number.isInteger(value)) return null
    values.push(value)
  }
  return values
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    ;[x, y] = [y, x % y]
  }
  return x
}

export function reduceFraction({ numerator, denominator }: ParsedFraction): ParsedFraction {
  const divisor = gcd(numerator, denominator) || 1
  return { numerator: numerator / divisor, denominator: denominator / divisor }
}

export function isReduced({ numerator, denominator }: ParsedFraction): boolean {
  return gcd(numerator, denominator) === 1
}

/**
 * Приводит текстовый ответ к сравнимому виду: регистр, умляуты, артикль, точка в конце.
 * "Der Nenner." и "nenner" — одно и то же.
 */
export function normalizeText(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/^(der|die|das)\s+/, '')
    .replace(/[.,!?;:]+$/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/* --------------------------------------------------- кодировка нетекстовых ответов */

/** Таблица wahr/falsch: по символу на строку. 'w' — wahr, 'f' — falsch, '-' — не отмечено. */
export function encodeFlags(flags: (boolean | null)[]): string {
  return flags.map((flag) => (flag === null ? '-' : flag ? 'w' : 'f')).join('')
}

export function decodeFlags(raw: string): (boolean | null)[] {
  return [...raw].map((char) => (char === 'w' ? true : char === 'f' ? false : null))
}

/** Соединение линиями: пары "левый:правый", разделённые вертикальной чертой. */
export function encodePairs(pairs: [string, string][]): string {
  return pairs
    .map(([left, right]) => `${left}:${right}`)
    .sort()
    .join('|')
}

export function decodePairs(raw: string): [string, string][] {
  return raw
    .split('|')
    .filter((part) => part !== '')
    .map((part) => {
      const [left = '', right = ''] = part.split(':')
      return [left, right] as [string, string]
    })
}

/* ------------------------------------------------------------------ проверка */

/**
 * Проверяет ответ ученицы против задания.
 *
 * Задания со свободным ответом (`open`) сюда не попадают: их не с чем
 * сравнивать, ученица сверяется с образцом сама. Тип это гарантирует.
 */
export function checkAnswer(exercise: AutoCheckedExercise, raw: string): CheckResult {
  if (raw.trim() === '') return { ok: false, reason: 'empty' }

  switch (exercise.kind) {
    case 'number': {
      const value = parseNumber(raw)
      if (value === null) {
        return { ok: false, reason: 'unparsable', note: 'Похоже, это не число. Проверь запись.' }
      }
      const tolerance = exercise.tolerance ?? DEFAULT_TOLERANCE
      return Math.abs(value - exercise.answer) <= tolerance
        ? { ok: true }
        : { ok: false, reason: 'wrong' }
    }

    case 'fraction': {
      const parsed = parseFraction(raw)
      if (!parsed) {
        return {
          ok: false,
          reason: 'unparsable',
          note: 'Дробь пишется через косую черту, например 3/4.',
        }
      }
      const expected = reduceFraction({
        numerator: exercise.numerator,
        denominator: exercise.denominator,
      })
      const actual = reduceFraction(parsed)
      const sameValue =
        actual.numerator === expected.numerator && actual.denominator === expected.denominator
      if (!sameValue) return { ok: false, reason: 'wrong' }

      if (
        exercise.requireExact &&
        (parsed.numerator !== exercise.numerator || parsed.denominator !== exercise.denominator)
      ) {
        // Значение верное, но задание было именно про запись: расширить или
        // привести к нужному знаменателю.
        return {
          ok: false,
          reason: 'wrong',
          note: `Значение верное, но записать нужно дробь со знаменателем ${exercise.denominator}.`,
        }
      }

      if (exercise.requireReduced && !isReduced(parsed)) {
        return {
          ok: false,
          reason: 'not-reduced',
          note: 'Значение верное, но дробь ещё можно сократить (kürzen).',
        }
      }
      return { ok: true }
    }

    case 'set': {
      const parsed = parseNumberList(raw)
      if (!parsed) {
        return {
          ok: false,
          reason: 'unparsable',
          note: 'Числа перечисляют через точку с запятой: 1; 2; 4; 8.',
        }
      }
      const expected = new Set(exercise.values)
      const actual = new Set(parsed)

      const extra = [...actual].filter((value) => !expected.has(value))
      if (extra.length > 0) {
        // Лишнее число — более грубая ошибка, чем недобор: значит правило понято неверно.
        return {
          ok: false,
          reason: 'extra',
          note:
            extra.length === 1
              ? `Число ${extra[0]} сюда не подходит. Проверь его.`
              : `Лишние числа: ${extra.join(', ')}.`,
        }
      }

      const missing = expected.size - actual.size
      if (missing > 0) {
        return {
          ok: false,
          reason: 'incomplete',
          note:
            missing === 1
              ? 'Всё верно, но одно число ещё не найдено.'
              : `Всё верно, но не найдено ещё ${missing} числа.`,
        }
      }
      return { ok: true }
    }

    case 'choice': {
      const index = Number(raw)
      return Number.isInteger(index) && index === exercise.correct
        ? { ok: true }
        : { ok: false, reason: 'wrong' }
    }

    case 'pick': {
      const chosen = new Set(
        raw
          .split(',')
          .filter((part) => part !== '')
          .map(Number),
      )
      const expected = new Set(exercise.correct)
      const extra = [...chosen].filter((index) => !expected.has(index)).length
      if (extra > 0) {
        return {
          ok: false,
          reason: 'extra',
          note: extra === 1 ? 'Одно число лишнее.' : `Лишних отмечено: ${extra}.`,
        }
      }
      const missing = expected.size - chosen.size
      if (missing > 0) {
        return {
          ok: false,
          reason: 'incomplete',
          note:
            missing === 1
              ? 'Всё отмеченное верно, но одно число ещё не найдено.'
              : `Всё верно, но не найдено ещё ${missing}.`,
        }
      }
      return { ok: true }
    }

    case 'truefalse': {
      const flags = decodeFlags(raw)
      if (flags.length < exercise.statements.length || flags.some((flag) => flag === null)) {
        return { ok: false, reason: 'incomplete', note: 'Отметь каждую строку.' }
      }
      const wrong = exercise.statements.filter(
        (statement, index) => flags[index] !== statement.correct,
      ).length
      return wrong === 0
        ? { ok: true }
        : {
            ok: false,
            reason: 'wrong',
            note: wrong === 1 ? 'Одна строка отмечена неверно.' : `Неверных строк: ${wrong}.`,
          }
    }

    case 'match': {
      const actual = new Set(decodePairs(raw).map(([left, right]) => `${left}:${right}`))
      const expected = new Set(exercise.pairs.map(([left, right]) => `${left}:${right}`))

      const extra = [...actual].filter((pair) => !expected.has(pair)).length
      if (extra > 0) {
        return {
          ok: false,
          reason: 'extra',
          note: extra === 1 ? 'Одна связь лишняя.' : `Лишних связей: ${extra}.`,
        }
      }
      const missing = expected.size - actual.size
      if (missing > 0) {
        return {
          ok: false,
          reason: 'incomplete',
          note:
            missing === 1 ? 'Не хватает одной связи.' : `Верно, но не хватает ${missing} связей.`,
        }
      }
      return { ok: true }
    }

    case 'shade': {
      const shaded = Number(raw)
      if (!Number.isInteger(shaded)) return { ok: false, reason: 'empty' }
      if (shaded === exercise.target) return { ok: true }
      return shaded < exercise.target
        ? {
            ok: false,
            reason: 'incomplete',
            note: `Закрашено ${shaded}, а нужно ${exercise.target}.`,
          }
        : {
            ok: false,
            reason: 'extra',
            note: `Закрашено ${shaded} — это больше, чем нужно.`,
          }
    }

    case 'numberline': {
      const tick = Number(raw)
      if (!Number.isInteger(tick)) return { ok: false, reason: 'empty' }
      return tick === exercise.target
        ? { ok: true }
        : { ok: false, reason: 'wrong', note: 'Не тот штрих. Посчитай их от начала ещё раз.' }
    }

    case 'text': {
      const answer = normalizeText(raw)
      return exercise.accept.some((variant) => normalizeText(variant) === answer)
        ? { ok: true }
        : { ok: false, reason: 'wrong' }
    }
  }
}

/** Правильный ответ в человекочитаемом виде — для показа после сдачи задания. */
export function formatExpectedAnswer(exercise: Exercise): string {
  switch (exercise.kind) {
    case 'number': {
      // Показываем в немецкой записи: именно так ответ выглядит в учебнике.
      const text = String(exercise.answer).replace('.', ',')
      return exercise.unit ? `${text} ${exercise.unit.de}` : text
    }
    case 'fraction': {
      const { numerator, denominator } = reduceFraction({
        numerator: exercise.numerator,
        denominator: exercise.denominator,
      })
      return `${numerator}/${denominator}`
    }
    case 'set':
      return `{${[...exercise.values].sort((a, b) => a - b).join('; ')}}`
    case 'choice':
      return exercise.options[exercise.correct]?.de ?? ''
    case 'truefalse':
      return exercise.statements
        .map((statement) => (statement.correct ? 'wahr' : 'falsch'))
        .join(', ')
    case 'match':
      return exercise.pairs
        .map(([left, right]) => {
          const leftLabel = exercise.left.find((item) => item.id === left)?.label ?? left
          const rightLabel = exercise.right.find((item) => item.id === right)?.label ?? right
          return `${leftLabel} — ${rightLabel}`
        })
        .join('; ')
    case 'pick':
      return exercise.correct.map((index) => exercise.options[index]).join(', ')
    case 'shade':
      return `${exercise.target} из ${exercise.total}`
    case 'numberline':
      return `${exercise.target}-й штрих от ${exercise.from}`
    case 'text':
      return exercise.accept[0]
    case 'open':
      return exercise.reference
  }
}
