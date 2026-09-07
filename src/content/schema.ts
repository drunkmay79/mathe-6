import { z } from 'zod'

/**
 * Схема учебного контента.
 *
 * Главный принцип: ученица читает задание по-немецки (как в учебнике),
 * но любая формулировка обязана иметь русскую версию — она открывается по кнопке
 * «Перевод». Поэтому `bilingual` требует оба языка, а не делает `ru` опциональным.
 *
 * Объяснения, подсказки и разборы — только по-русски: это язык, на котором
 * она думает о математике. Немецкий здесь цель, а не средство.
 */

export const bilingualSchema = z.object({
  de: z.string().min(1),
  ru: z.string().min(1),
})
export type Bilingual = z.infer<typeof bilingualSchema>

const slug = (what: string) =>
  z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${what}: только строчные латинские буквы, цифры и дефис`)

/** Ссылка на исходную страницу учебника или рабочей тетради. */
export const sourceRefSchema = z.object({
  /** lb = Lehrbuch (учебник), ah = Arbeitsheft (рабочая тетрадь) */
  book: z.enum(['lb', 'ah']),
  page: z.number().int().positive(),
  /** Номер задания на странице, как он напечатан: "3", "4b", "A2" */
  task: z.string().min(1).optional(),
})
export type SourceRef = z.infer<typeof sourceRefSchema>

/**
 * Уровень сложности. Повторяет три уровня рабочей тетради Parallelo:
 * на каждую тему там по странице на уровень, со значками ▽ ▷ ⋈.
 */
export const exerciseLevelSchema = z.enum(['basis', 'mittel', 'plus'])
export type ExerciseLevel = z.infer<typeof exerciseLevelSchema>

export const LEVELS: { id: ExerciseLevel; sign: string; de: string; ru: string }[] = [
  { id: 'basis', sign: '▽', de: 'Grundlagen', ru: 'Основа' },
  { id: 'mittel', sign: '▷', de: 'Übung', ru: 'Тренировка' },
  { id: 'plus', sign: '⋈', de: 'Mehr', ru: 'Сложнее' },
]

/* ------------------------------------------------------------------ теория */

export const exampleStepSchema = z.object({
  /** Строка KaTeX: "\\frac{3}{4} + \\frac{1}{4} = 1" */
  expr: z.string().min(1).optional(),
  /** Что именно происходит на этом шаге. По-русски. */
  explain: z.string().min(1),
})
export type ExampleStep = z.infer<typeof exampleStepSchema>

export const theoryBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text'),
    body: bilingualSchema,
  }),
  z.object({
    type: z.literal('math'),
    expr: z.string().min(1),
    caption: bilingualSchema.optional(),
  }),
  /** Правило в рамке — то, что стоит выучить наизусть. Merke в учебнике. */
  z.object({
    type: z.literal('rule'),
    title: bilingualSchema,
    body: bilingualSchema,
    expr: z.string().min(1).optional(),
  }),
  /**
   * Картинка, которая объясняет мысль лучше слов: прыжки по числовой прямой,
   * прямоугольники из квадратиков. `art` — id из components/illustrations,
   * `caption` — что на ней происходит, по-русски.
   */
  z.object({
    type: z.literal('visual'),
    art: z.string().min(1),
    caption: z.string().min(1),
  }),
  /** Разобранный пример: условие + шаги решения. Beispiel в учебнике. */
  z.object({
    type: z.literal('example'),
    prompt: bilingualSchema,
    steps: z.array(exampleStepSchema).min(1),
  }),
])
export type TheoryBlock = z.infer<typeof theoryBlockSchema>

/* ---------------------------------------------------------------- задания */

const exerciseBase = {
  id: slug('id задания'),
  prompt: bilingualSchema,
  /** Формула к условию, KaTeX. */
  expr: z.string().min(1).optional(),
  /** Подсказки по-русски, показываются по одной. */
  hints: z.array(z.string().min(1)).default([]),
  /** Разбор после правильного ответа или после сдачи. По-русски. */
  solution: z.string().min(1).optional(),
  source: sourceRefSchema.optional(),
  level: exerciseLevelSchema.default('basis'),
  /**
   * 'sprache' — задание про язык формулировки, а не про математику.
   * Такие показываются в разминке перед теорией, а не в общем списке.
   */
  focus: z.enum(['mathe', 'sprache']).default('mathe'),
}

export const exerciseSchema = z.discriminatedUnion('kind', [
  /** Числовой ответ. Немецкая запятая как разделитель дробной части допускается. */
  z.object({
    ...exerciseBase,
    kind: z.literal('number'),
    answer: z.number(),
    /** Допуск сравнения. По умолчанию 1e-9 — то есть точное совпадение. */
    tolerance: z.number().nonnegative().optional(),
    unit: bilingualSchema.optional(),
  }),
  /** Обыкновенная дробь. */
  z.object({
    ...exerciseBase,
    kind: z.literal('fraction'),
    numerator: z.number().int(),
    denominator: z
      .number()
      .int()
      .refine((d) => d !== 0, 'знаменатель не может быть нулём'),
    /** true — засчитываем только сокращённую дробь (6/8 не пройдёт, 3/4 пройдёт). */
    requireReduced: z.boolean().default(false),
  }),
  /**
   * Множество чисел: Teiler-Menge, Vielfachen-Menge.
   * Порядок и повторы не важны — важен состав.
   */
  z.object({
    ...exerciseBase,
    kind: z.literal('set'),
    values: z.array(z.number().int()).min(1),
    /** Подпись перед полем ввода, как в учебнике: "T_{32} =" */
    label: z.string().min(1).optional(),
  }),
  /** Выбор одного варианта. */
  z.object({
    ...exerciseBase,
    kind: z.literal('choice'),
    options: z.array(bilingualSchema).min(2),
    correct: z.number().int().nonnegative(),
  }),
  /** Таблица утверждений wahr / falsch. */
  z.object({
    ...exerciseBase,
    kind: z.literal('truefalse'),
    statements: z
      .array(
        z.object({
          de: z.string().min(1),
          ru: z.string().min(1),
          correct: z.boolean(),
          /** Почему именно так. По-русски, показывается после проверки. */
          why: z.string().min(1).optional(),
        }),
      )
      .min(2),
  }),
  /**
   * Соединить линиями: каждому элементу слева — один или несколько справа.
   * В учебнике это «Verbinde die Zahl mit ihren Vielfachen».
   */
  z.object({
    ...exerciseBase,
    kind: z.literal('match'),
    left: z.array(z.object({ id: z.string().min(1), label: z.string().min(1) })).min(2),
    right: z.array(z.object({ id: z.string().min(1), label: z.string().min(1) })).min(2),
    /** Верные пары: [id слева, id справа]. */
    pairs: z.array(z.tuple([z.string().min(1), z.string().min(1)])).min(1),
  }),
  /** Короткий текстовый ответ, обычно немецкий термин. */
  z.object({
    ...exerciseBase,
    kind: z.literal('text'),
    /** Все написания, которые считаем верными. Регистр и умляуты нормализуются. */
    accept: z.array(z.string().min(1)).min(1),
  }),
  /**
   * Свободный ответ: Begründe, Erkläre, Beschreibe dein Vorgehen.
   * Автоматически не проверяется — ученица сравнивает свой ответ с образцом.
   * Такие задания и дают язык, поэтому выбрасывать их нельзя.
   */
  z.object({
    ...exerciseBase,
    kind: z.literal('open'),
    /** Образец ответа по-русски. */
    reference: z.string().min(1),
    /** Как то же самое звучало бы по-немецки — если фразу стоит запомнить. */
    referenceDe: z.string().min(1).optional(),
  }),
])
export type Exercise = z.infer<typeof exerciseSchema>
export type ExerciseKind = Exercise['kind']

/** Задания, которые приложение проверяет само. Всё, кроме свободного ответа. */
export type AutoCheckedExercise = Exclude<Exercise, { kind: 'open' }>

export function isAutoChecked(exercise: Exercise): exercise is AutoCheckedExercise {
  return exercise.kind !== 'open'
}

/* ------------------------------------------------------------ урок и глава */

/**
 * Языковой вход в тему: фразы, которыми сформулированы задания.
 *
 * На уровне A1–A2 задание чаще проваливается на глаголе-команде, чем на
 * математике. Поэтому фразы разбираются до теории, а не по ходу дела.
 */
export const phraseSchema = z.object({
  de: z.string().min(1),
  ru: z.string().min(1),
  /** Уточнение: что именно требуется сделать, чем это отличается от соседней фразы. */
  note: z.string().min(1).optional(),
})
export type Phrase = z.infer<typeof phraseSchema>

export const lessonSchema = z.object({
  id: slug('id урока'),
  title: bilingualSchema,
  /** Одно-два предложения по-русски: чему учит урок. */
  summary: z.string().min(1),
  /** Ключи из глоссария (src/content/glossary.ts). Проверяются тестом. */
  terms: z.array(slug('термин')).default([]),
  /** Фразы из формулировок заданий этой темы. */
  phrases: z.array(phraseSchema).default([]),
  theory: z.array(theoryBlockSchema).default([]),
  exercises: z.array(exerciseSchema).default([]),
  source: sourceRefSchema.optional(),
})
export type Lesson = z.infer<typeof lessonSchema>

export const chapterSchema = z.object({
  id: slug('id главы'),
  /** Номер главы в немецком учебнике. */
  number: z.number().int().positive(),
  title: bilingualSchema,
  lessons: z.array(lessonSchema).min(1),
})
export type Chapter = z.infer<typeof chapterSchema>

export const glossaryEntrySchema = z.object({
  id: slug('id термина'),
  de: z.string().min(1),
  ru: z.string().min(1),
  /** Артикль существительного — его в немецком приходится учить вместе со словом. */
  article: z.enum(['der', 'die', 'das']).optional(),
  plural: z.string().min(1).optional(),
  /** Пример употребления в немецкой формулировке задачи. */
  example: z.string().min(1).optional(),
  /**
   * Подсказка для запоминания: от какого слова образовано.
   * Немецкие математические термины почти все прозрачные — Teiler от teilen,
   * Zähler от zählen. Увидев это один раз, слово уже не забываешь.
   */
  memo: z.string().min(1).optional(),
  category: z.enum(['zahlen', 'geometrie', 'rechnen', 'operatoren', 'allgemein']),
})
export type GlossaryEntry = z.infer<typeof glossaryEntrySchema>

/**
 * Хелпер для файлов глав: валидирует главу прямо при загрузке модуля,
 * поэтому опечатка в контенте падает сразу, а не превращается в пустой экран.
 *
 * Принимает «сырой» вид (`z.input`) — поля со значением по умолчанию,
 * например `hints` или `level`, можно не писать.
 */
export function defineChapter(chapter: z.input<typeof chapterSchema>): Chapter {
  return chapterSchema.parse(chapter)
}
