import { chapter as teilbarkeitUndBrueche } from './chapters/01-teilbarkeit-und-brueche'
import type { Chapter, Exercise, Lesson, SourceRef } from './schema'

/**
 * Реестр учебного материала.
 *
 * Новая глава подключается в двух местах: файл в chapters/ и одна строчка здесь.
 * Ничего больше — маршруты, оглавление и прогресс строятся из этого списка.
 */
export const CHAPTERS: Chapter[] = [teilbarkeitUndBrueche].sort((a, b) => a.number - b.number)

export type LessonRef = {
  chapter: Chapter
  lesson: Lesson
  /** Сквозной номер урока по всему учебнику, с нуля. */
  index: number
}

export const ALL_LESSONS: LessonRef[] = CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({ chapter, lesson, index: 0 })),
).map((ref, index) => ({ ...ref, index }))

const lessonsById = new Map(ALL_LESSONS.map((ref) => [ref.lesson.id, ref]))

export function findLesson(lessonId: string): LessonRef | undefined {
  return lessonsById.get(lessonId)
}

/** Соседние уроки — для кнопок «назад» и «дальше» внизу страницы. */
export function neighbourLessons(lessonId: string): { prev?: LessonRef; next?: LessonRef } {
  const current = findLesson(lessonId)
  if (!current) return {}
  return {
    prev: ALL_LESSONS[current.index - 1],
    next: ALL_LESSONS[current.index + 1],
  }
}

export function lessonPath(lessonId: string): string {
  return `/lesson/${lessonId}`
}

/**
 * Задания урока, разделённые по назначению: разминка про язык формулировок
 * и собственно математика. Разминка показывается до теории.
 */
export function splitExercises(lesson: Lesson) {
  return {
    sprache: lesson.exercises.filter((exercise) => exercise.focus === 'sprache'),
    mathe: lesson.exercises.filter((exercise) => exercise.focus === 'mathe'),
  }
}

/* ------------------------------------------------- указатель по учебнику */

export type SourceEntry = { lesson: Lesson; exercise: Exercise; source: SourceRef }

export type SourcePage = {
  book: SourceRef['book']
  page: number
  /** Темы, которые задействуют эту страницу. */
  lessons: Lesson[]
  entries: SourceEntry[]
}

export const BOOK_TITLES: Record<SourceRef['book'], string> = {
  lb: 'Учебник — Lehrbuch',
  ah: 'Рабочая тетрадь — Arbeitsheft',
}

/**
 * Указатель «страница книги → задания в приложении».
 *
 * Домашнее задание в школе называют номером страницы и номерами упражнений,
 * а не темой. Без такого указателя приложение приходится листать наугад,
 * и им просто перестают пользоваться.
 */
export const SOURCE_PAGES: SourcePage[] = (() => {
  const byKey = new Map<string, SourcePage>()

  for (const { lesson } of ALL_LESSONS) {
    const refs: { source: SourceRef; exercise?: Exercise }[] = []
    if (lesson.source) refs.push({ source: lesson.source })
    for (const exercise of lesson.exercises) {
      if (exercise.source) refs.push({ source: exercise.source, exercise })
    }

    for (const { source, exercise } of refs) {
      const key = `${source.book}-${source.page}`
      let page = byKey.get(key)
      if (!page) {
        page = { book: source.book, page: source.page, lessons: [], entries: [] }
        byKey.set(key, page)
      }
      if (!page.lessons.includes(lesson)) page.lessons.push(lesson)
      if (exercise) page.entries.push({ lesson, exercise, source })
    }
  }

  // Внутри страницы номера идут как в книге: 2, 2a, 4a, 6b, 12c.
  for (const page of byKey.values()) {
    page.entries.sort((a, b) => compareTasks(a.source.task, b.source.task))
  }

  return [...byKey.values()].sort((a, b) =>
    a.book === b.book ? a.page - b.page : a.book === 'lb' ? -1 : 1,
  )
})()

/** Сравнивает номера заданий по-человечески: 2 раньше 12, «4a» раньше «4b». */
function compareTasks(first?: string, second?: string): number {
  if (!first) return second ? 1 : 0
  if (!second) return -1
  const number = (task: string) => Number(task.match(/^\d+/)?.[0] ?? 0)
  const letters = (task: string) => task.replace(/^\d+/, '')
  return number(first) - number(second) || letters(first).localeCompare(letters(second))
}

/** Какие страницы книг закрывает тема — для шапки урока. */
export function lessonPages(lesson: Lesson): Record<SourceRef['book'], number[]> {
  const pages: Record<SourceRef['book'], number[]> = { lb: [], ah: [] }
  const add = (source?: SourceRef) => {
    if (source && !pages[source.book].includes(source.page)) pages[source.book].push(source.page)
  }
  add(lesson.source)
  for (const exercise of lesson.exercises) add(exercise.source)
  pages.lb.sort((a, b) => a - b)
  pages.ah.sort((a, b) => a - b)
  return pages
}

/** Записывает список страниц коротко: 8–10 вместо 8, 9, 10. */
export function formatPages(pages: number[]): string {
  if (pages.length === 0) return ''
  const ranges: string[] = []
  let start = pages[0]
  let previous = pages[0]

  for (const page of pages.slice(1)) {
    if (page === previous + 1) {
      previous = page
      continue
    }
    ranges.push(start === previous ? `${start}` : `${start}–${previous}`)
    start = page
    previous = page
  }
  ranges.push(start === previous ? `${start}` : `${start}–${previous}`)
  return ranges.join(', ')
}

/** Адрес конкретного задания: тема плюс якорь на карточку. */
export function exercisePath(lessonId: string, exerciseId: string): string {
  return `/lesson/${lessonId}?ex=${exerciseId}`
}

export const TOTAL_EXERCISES = ALL_LESSONS.reduce(
  (sum, { lesson }) => sum + lesson.exercises.length,
  0,
)
