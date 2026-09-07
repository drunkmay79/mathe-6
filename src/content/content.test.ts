import { describe, expect, it } from 'vitest'
import { hasIllustration } from '@/components/illustrations'
import { GLOSSARY, hasTerm } from './glossary'
import { ALL_LESSONS, CHAPTERS } from './index'
import { chapterSchema } from './schema'

/**
 * Тесты на сам контент, а не на код.
 *
 * Контент пишется вручную по сканам учебника, и типичная ошибка здесь — не
 * падающая сборка, а тихо неправильный урок: ссылка на несуществующий термин,
 * повторяющийся id, вариант ответа с индексом за границей списка. Такие вещи
 * ломают страницу уже во время занятия, поэтому ловим их тестом.
 */

describe('структура контента', () => {
  it('каждая глава проходит валидацию схемой', () => {
    for (const chapter of CHAPTERS) {
      expect(() => chapterSchema.parse(chapter)).not.toThrow()
    }
  })

  it('id уроков уникальны во всём учебнике', () => {
    // id урока — это и адрес страницы, и ключ прогресса: дубль ломает оба.
    const ids = ALL_LESSONS.map(({ lesson }) => lesson.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('id глав уникальны', () => {
    const ids = CHAPTERS.map((chapter) => chapter.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('номера глав не повторяются', () => {
    const numbers = CHAPTERS.map((chapter) => chapter.number)
    expect(new Set(numbers).size).toBe(numbers.length)
  })

  it('id заданий уникальны внутри урока', () => {
    for (const { lesson } of ALL_LESSONS) {
      const ids = lesson.exercises.map((exercise) => exercise.id)
      expect(new Set(ids).size, `урок ${lesson.id}`).toBe(ids.length)
    }
  })
})

describe('связи с глоссарием', () => {
  it('все термины урока есть в словаре', () => {
    for (const { lesson } of ALL_LESSONS) {
      for (const term of lesson.terms) {
        expect(hasTerm(term), `урок ${lesson.id}: термина "${term}" нет в glossary.ts`).toBe(true)
      }
    }
  })

  it('все рисунки уроков существуют', () => {
    for (const { lesson } of ALL_LESSONS) {
      for (const block of lesson.theory) {
        if (block.type !== 'visual') continue
        expect(hasIllustration(block.art), `урок ${lesson.id}: нет рисунка "${block.art}"`).toBe(
          true,
        )
      }
    }
  })

  it('id терминов в словаре уникальны', () => {
    const ids = GLOSSARY.map((entry) => entry.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('задания пригодны к показу', () => {
  it('правильный вариант выбора существует', () => {
    for (const { lesson } of ALL_LESSONS) {
      for (const exercise of lesson.exercises) {
        if (exercise.kind !== 'choice') continue
        expect(
          exercise.correct,
          `${lesson.id}/${exercise.id}: correct вне списка вариантов`,
        ).toBeLessThan(exercise.options.length)
      }
    }
  })

  it('в каждом уроке есть чем заняться', () => {
    for (const { lesson } of ALL_LESSONS) {
      expect(lesson.exercises.length, `урок ${lesson.id} без заданий`).toBeGreaterThan(0)
    }
  })

  it('у каждого задания есть подсказка или разбор', () => {
    // Ученица занимается одна: тупик без объяснения — это конец занятия.
    for (const { lesson } of ALL_LESSONS) {
      for (const exercise of lesson.exercises) {
        const hasHelp =
          exercise.hints.length > 0 || Boolean(exercise.solution) || exercise.kind === 'open' // у свободного ответа роль разбора играет образец
        expect(hasHelp, `${lesson.id}/${exercise.id}: ни подсказок, ни решения`).toBe(true)
      }
    }
  })

  it('связи в заданиях на соединение ссылаются на существующие элементы', () => {
    for (const { lesson } of ALL_LESSONS) {
      for (const exercise of lesson.exercises) {
        if (exercise.kind !== 'match') continue
        const leftIds = new Set(exercise.left.map((item) => item.id))
        const rightIds = new Set(exercise.right.map((item) => item.id))
        for (const [left, right] of exercise.pairs) {
          expect(leftIds.has(left), `${lesson.id}/${exercise.id}: нет элемента "${left}"`).toBe(
            true,
          )
          expect(rightIds.has(right), `${lesson.id}/${exercise.id}: нет элемента "${right}"`).toBe(
            true,
          )
        }
      }
    }
  })

  it('в множествах нет повторов', () => {
    for (const { lesson } of ALL_LESSONS) {
      for (const exercise of lesson.exercises) {
        if (exercise.kind !== 'set') continue
        expect(new Set(exercise.values).size, `${lesson.id}/${exercise.id}`).toBe(
          exercise.values.length,
        )
      }
    }
  })

  it('в каждом уроке есть задания базового уровня', () => {
    // Базовый уровень открыт по умолчанию: урок без него встретит пустым экраном.
    for (const { lesson } of ALL_LESSONS) {
      const basis = lesson.exercises.filter((exercise) => exercise.level === 'basis')
      expect(basis.length, `урок ${lesson.id} без заданий уровня basis`).toBeGreaterThan(0)
    }
  })
})
