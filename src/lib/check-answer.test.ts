import { describe, expect, it } from 'vitest'
import type { Exercise } from '@/content/schema'
import {
  checkAnswer,
  decodeFlags,
  decodePairs,
  encodeFlags,
  encodePairs,
  formatExpectedAnswer,
  isReduced,
  normalizeText,
  parseFraction,
  parseNumber,
  parseNumberList,
  reduceFraction,
} from './check-answer'

/** Поля, которые схема проставляет по умолчанию, — чтобы не повторять их в каждом задании. */
const base = { hints: [] as string[], level: 'basis' as const, focus: 'mathe' as const }

/** Конкретный вариант задания — иначе spread по объединению ловит «лишние» поля. */
type OfKind<K extends Exercise['kind']> = Extract<Exercise, { kind: K }>

describe('parseNumber', () => {
  it('читает немецкую запятую как разделитель дробной части', () => {
    expect(parseNumber('3,5')).toBe(3.5)
    expect(parseNumber('0,25')).toBe(0.25)
  })

  it('читает международную точку', () => {
    expect(parseNumber('3.5')).toBe(3.5)
  })

  it('считает точки разделителями тысяч, если есть запятая', () => {
    expect(parseNumber('1.234,5')).toBe(1234.5)
  })

  it('считает несколько точек разделителями тысяч', () => {
    expect(parseNumber('1.234.567')).toBe(1234567)
  })

  it('терпит пробелы внутри числа', () => {
    expect(parseNumber('1 234,5')).toBe(1234.5)
    expect(parseNumber('  42  ')).toBe(42)
  })

  it('отбрасывает единицу измерения в хвосте', () => {
    expect(parseNumber('20 cm')).toBe(20)
    expect(parseNumber('15 €')).toBe(15)
    expect(parseNumber('12,5 cm²')).toBe(12.5)
  })

  it('понимает дробь как число', () => {
    expect(parseNumber('3/4')).toBe(0.75)
  })

  it('возвращает null на нечисле', () => {
    expect(parseNumber('')).toBeNull()
    expect(parseNumber('weiß nicht')).toBeNull()
    expect(parseNumber('3,,5')).toBeNull()
  })
})

describe('parseNumberList', () => {
  it('читает перечисление через любой из привычных разделителей', () => {
    expect(parseNumberList('1; 2; 4; 8')).toEqual([1, 2, 4, 8])
    expect(parseNumberList('1, 2, 4, 8')).toEqual([1, 2, 4, 8])
    expect(parseNumberList('1 2 4 8')).toEqual([1, 2, 4, 8])
  })

  it('снимает фигурные скобки и подпись слева от знака равенства', () => {
    expect(parseNumberList('{1; 2; 4}')).toEqual([1, 2, 4])
    expect(parseNumberList('T_32 = {1; 2; 4}')).toEqual([1, 2, 4])
  })

  it('возвращает null, если хоть один элемент не целое число', () => {
    // Молча выкинуть непонятое опаснее, чем сказать «не смог прочитать».
    expect(parseNumberList('1; zwei; 4')).toBeNull()
    expect(parseNumberList('1; 1/2')).toBeNull()
    expect(parseNumberList('   ')).toBeNull()
  })

  it('запятая здесь разделяет список, а не дробную часть', () => {
    // Множества в этой теме состоят только из целых чисел, поэтому запятая
    // между ними — перечисление. Немецкая «2,5» в такое поле просто не приходит.
    expect(parseNumberList('1; 2,5')).toEqual([1, 2, 5])
  })
})

describe('parseFraction', () => {
  it('разбирает обыкновенную дробь', () => {
    expect(parseFraction('3/4')).toEqual({ numerator: 3, denominator: 4 })
  })

  it('переносит знак в числитель', () => {
    expect(parseFraction('3/-4')).toEqual({ numerator: -3, denominator: 4 })
    expect(parseFraction('-3/4')).toEqual({ numerator: -3, denominator: 4 })
  })

  it('не принимает нулевой знаменатель', () => {
    expect(parseFraction('3/0')).toBeNull()
  })
})

describe('reduceFraction / isReduced', () => {
  it('сокращает дробь', () => {
    expect(reduceFraction({ numerator: 6, denominator: 8 })).toEqual({
      numerator: 3,
      denominator: 4,
    })
  })

  it('видит несокращённую дробь', () => {
    expect(isReduced({ numerator: 6, denominator: 8 })).toBe(false)
    expect(isReduced({ numerator: 3, denominator: 4 })).toBe(true)
  })
})

describe('normalizeText', () => {
  it('раскрывает умляуты и ß', () => {
    expect(normalizeText('Zähler')).toBe('zaehler')
    expect(normalizeText('Maßstab')).toBe('massstab')
  })

  it('снимает артикль и точку в конце', () => {
    expect(normalizeText('Der Nenner.')).toBe('nenner')
  })
})

describe('кодировка нетекстовых ответов', () => {
  it('таблица wahr/falsch переживает круг кодирования', () => {
    const flags = [true, false, null, true]
    expect(encodeFlags(flags)).toBe('wf-w')
    expect(decodeFlags('wf-w')).toEqual(flags)
  })

  it('связи не зависят от порядка, в котором их отметили', () => {
    const forward = encodePairs([
      ['a', 'x'],
      ['b', 'y'],
    ])
    const backward = encodePairs([
      ['b', 'y'],
      ['a', 'x'],
    ])
    expect(forward).toBe(backward)
    expect(decodePairs(forward)).toEqual([
      ['a', 'x'],
      ['b', 'y'],
    ])
  })
})

const numberExercise: OfKind<'number'> = {
  ...base,
  kind: 'number',
  id: 'a1',
  prompt: { de: 'Berechne 12 · 4', ru: 'Вычисли 12 · 4' },
  answer: 48,
}

const fractionExercise: OfKind<'fraction'> = {
  ...base,
  kind: 'fraction',
  id: 'a2',
  prompt: { de: 'Kürze 6/8', ru: 'Сократи 6/8' },
  numerator: 3,
  denominator: 4,
  requireReduced: true,
  requireExact: false,
}

const choiceExercise: OfKind<'choice'> = {
  ...base,
  kind: 'choice',
  id: 'a3',
  prompt: { de: 'Was ist eine Primzahl?', ru: 'Что такое простое число?' },
  options: [
    { de: '9', ru: '9' },
    { de: '7', ru: '7' },
  ],
  correct: 1,
}

const textExercise: OfKind<'text'> = {
  ...base,
  kind: 'text',
  id: 'a4',
  prompt: {
    de: 'Wie heißt die Zahl unter dem Bruchstrich?',
    ru: 'Как называется число под чертой?',
  },
  accept: ['Nenner'],
}

const setExercise: OfKind<'set'> = {
  ...base,
  kind: 'set',
  id: 'a5',
  prompt: { de: 'Finde die Teiler von 8.', ru: 'Найди делители числа 8.' },
  values: [1, 2, 4, 8],
}

const trueFalseExercise: OfKind<'truefalse'> = {
  ...base,
  kind: 'truefalse',
  id: 'a6',
  prompt: { de: 'Wahr oder falsch?', ru: 'Верно или неверно?' },
  statements: [
    { de: '6 ist ein Teiler von 54.', ru: '6 — делитель 54.', correct: true },
    { de: '7 ist ein Teiler von 61.', ru: '7 — делитель 61.', correct: false },
  ],
}

const matchExercise: OfKind<'match'> = {
  ...base,
  kind: 'match',
  id: 'a7',
  prompt: { de: 'Verbinde die Zahl mit ihren Vielfachen.', ru: 'Соедини число с кратными.' },
  left: [
    { id: 'l8', label: '8' },
    { id: 'l12', label: '12' },
  ],
  right: [
    { id: 'r24', label: '24' },
    { id: 'r40', label: '40' },
  ],
  pairs: [
    ['l8', 'r24'],
    ['l8', 'r40'],
    ['l12', 'r24'],
  ],
}

describe('checkAnswer', () => {
  it('пустой ответ не считается ошибкой в математике', () => {
    const result = checkAnswer(numberExercise, '   ')
    expect(result).toEqual({ ok: false, reason: 'empty' })
  })

  it('засчитывает число в любой из привычных записей', () => {
    expect(checkAnswer(numberExercise, '48').ok).toBe(true)
    expect(checkAnswer(numberExercise, '48,0').ok).toBe(true)
    expect(checkAnswer(numberExercise, ' 48 ').ok).toBe(true)
  })

  it('различает неверный ответ и нечитаемый', () => {
    expect(checkAnswer(numberExercise, '47')).toMatchObject({ ok: false, reason: 'wrong' })
    expect(checkAnswer(numberExercise, 'keine Ahnung')).toMatchObject({
      ok: false,
      reason: 'unparsable',
    })
  })

  it('уважает допуск при округлении', () => {
    // Ответ — треть. С допуском 0,01 округление до сотых засчитывается,
    // а до десятых уже нет: 0,3 отличается от 1/3 на 0,033.
    const rounded: OfKind<'number'> = { ...numberExercise, answer: 1 / 3, tolerance: 0.01 }
    expect(checkAnswer(rounded, '0,33').ok).toBe(true)
    expect(checkAnswer(rounded, '0,3').ok).toBe(false)
  })

  it('без допуска требует точного значения', () => {
    const exact: OfKind<'number'> = { ...numberExercise, answer: 1 / 3 }
    expect(checkAnswer(exact, '0,33').ok).toBe(false)
  })

  it('отделяет несокращённую дробь от неверной', () => {
    expect(checkAnswer(fractionExercise, '3/4').ok).toBe(true)
    expect(checkAnswer(fractionExercise, '6/8')).toMatchObject({ ok: false, reason: 'not-reduced' })
    expect(checkAnswer(fractionExercise, '2/3')).toMatchObject({ ok: false, reason: 'wrong' })
  })

  it('с requireExact требует именно ту запись, о которой просили', () => {
    // «Расширь 1/4 до знаменателя 16»: ответ 1/4 по значению верен,
    // но задание при этом не выполнено.
    const erweitern: OfKind<'fraction'> = {
      ...base,
      kind: 'fraction',
      id: 'a9',
      prompt: { de: 'Erweitere 1/4 auf den Nenner 16.', ru: 'Расширь 1/4 до знаменателя 16.' },
      numerator: 4,
      denominator: 16,
      requireReduced: false,
      requireExact: true,
    }
    expect(checkAnswer(erweitern, '4/16').ok).toBe(true)
    expect(checkAnswer(erweitern, '1/4')).toMatchObject({ ok: false, reason: 'wrong' })
    expect(checkAnswer(erweitern, '1/4').note).toContain('16')
  })

  it('без requireReduced принимает любую равную дробь', () => {
    const lenient: OfKind<'fraction'> = { ...fractionExercise, requireReduced: false }
    expect(checkAnswer(lenient, '6/8').ok).toBe(true)
  })

  it('проверяет выбор варианта по индексу', () => {
    expect(checkAnswer(choiceExercise, '1').ok).toBe(true)
    expect(checkAnswer(choiceExercise, '0').ok).toBe(false)
  })

  it('прощает регистр, артикль и умляуты в текстовом ответе', () => {
    expect(checkAnswer(textExercise, 'nenner').ok).toBe(true)
    expect(checkAnswer(textExercise, 'Der Nenner').ok).toBe(true)
    expect(checkAnswer(textExercise, 'Zähler').ok).toBe(false)
  })
})

describe('checkAnswer: множество чисел', () => {
  it('не смотрит на порядок и повторы', () => {
    expect(checkAnswer(setExercise, '8; 4; 2; 1').ok).toBe(true)
    expect(checkAnswer(setExercise, '1; 2; 2; 4; 8').ok).toBe(true)
  })

  it('недобор — это «ещё не всё», а не ошибка', () => {
    // Разница важная: найти 1, 2, 4 из четырёх делителей — это верный ход мысли.
    expect(checkAnswer(setExercise, '1; 2; 4')).toMatchObject({ ok: false, reason: 'incomplete' })
  })

  it('лишнее число — ошибка в правиле', () => {
    expect(checkAnswer(setExercise, '1; 2; 3; 4; 8')).toMatchObject({ ok: false, reason: 'extra' })
  })

  it('называет лишнее число в пояснении', () => {
    const result = checkAnswer(setExercise, '1; 2; 3; 4; 8')
    expect(result.note).toContain('3')
  })
})

describe('checkAnswer: wahr / falsch', () => {
  it('требует отметить все строки', () => {
    expect(checkAnswer(trueFalseExercise, 'w-')).toMatchObject({
      ok: false,
      reason: 'incomplete',
    })
  })

  it('засчитывает полностью верную таблицу', () => {
    expect(checkAnswer(trueFalseExercise, 'wf').ok).toBe(true)
  })

  it('считает, сколько строк отмечено неверно', () => {
    expect(checkAnswer(trueFalseExercise, 'fw')).toMatchObject({ ok: false, reason: 'wrong' })
    expect(checkAnswer(trueFalseExercise, 'fw').note).toContain('2')
  })
})

describe('checkAnswer: соединение линиями', () => {
  it('засчитывает полный набор связей', () => {
    const answer = encodePairs([
      ['l12', 'r24'],
      ['l8', 'r40'],
      ['l8', 'r24'],
    ])
    expect(checkAnswer(matchExercise, answer).ok).toBe(true)
  })

  it('различает недостающую связь и лишнюю', () => {
    const missing = encodePairs([
      ['l8', 'r24'],
      ['l8', 'r40'],
    ])
    expect(checkAnswer(matchExercise, missing)).toMatchObject({ ok: false, reason: 'incomplete' })

    const extra = encodePairs([
      ['l8', 'r24'],
      ['l8', 'r40'],
      ['l12', 'r24'],
      ['l12', 'r40'],
    ])
    expect(checkAnswer(matchExercise, extra)).toMatchObject({ ok: false, reason: 'extra' })
  })
})

describe('formatExpectedAnswer', () => {
  it('показывает число в немецкой записи', () => {
    expect(formatExpectedAnswer({ ...numberExercise, answer: 3.5 })).toBe('3,5')
  })

  it('показывает дробь сокращённой', () => {
    expect(formatExpectedAnswer(fractionExercise)).toBe('3/4')
  })

  it('показывает множество по возрастанию, в фигурных скобках', () => {
    expect(formatExpectedAnswer(setExercise)).toBe('{1; 2; 4; 8}')
  })

  it('показывает связи по подписям, а не по внутренним id', () => {
    expect(formatExpectedAnswer(matchExercise)).toBe('8 — 24; 8 — 40; 12 — 24')
  })

  it('показывает выбранный вариант и первый принятый текст', () => {
    expect(formatExpectedAnswer(choiceExercise)).toBe('7')
    expect(formatExpectedAnswer(textExercise)).toBe('Nenner')
  })

  it('для свободного ответа показывает образец', () => {
    const open: OfKind<'open'> = {
      ...base,
      kind: 'open',
      id: 'a8',
      prompt: { de: 'Begründe.', ru: 'Обоснуй.' },
      reference: 'Потому что делители повторяются.',
    }
    expect(formatExpectedAnswer(open)).toBe('Потому что делители повторяются.')
  })
})
