import { chapter as teilbarkeitUndBrueche } from './chapters/01-teilbarkeit-und-brueche'
import type { Chapter, Lesson } from './schema'

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

export const TOTAL_EXERCISES = ALL_LESSONS.reduce(
  (sum, { lesson }) => sum + lesson.exercises.length,
  0,
)
