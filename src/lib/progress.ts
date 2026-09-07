import { useSyncExternalStore } from 'react'
import type { ExerciseLevel } from '@/content/schema'

/**
 * Прогресс ученицы: что решено, сколько было попыток, открывались ли подсказки.
 *
 * Хранится в localStorage браузера — без аккаунтов и без сервера. Тетрадь
 * работает офлайн, данные не уходят никуда. Обратная сторона: другой браузер
 * или режим инкогнито — чистый лист, поэтому весь код рассчитан на то,
 * что хранилище может оказаться пустым или недоступным.
 */

const STORAGE_KEY = 'mathe6:progress:v1'

export type ExerciseStatus = 'unseen' | 'attempted' | 'solved'

export type ExerciseState = {
  status: ExerciseStatus
  attempts: number
  hintsUsed: number
  /** Ответ был открыт кнопкой «Показать решение». */
  revealed: boolean
  solvedAt?: number
}

export type ProgressData = {
  version: 1
  /** Ключ — `${lessonId}:${exerciseId}`. */
  exercises: Record<string, ExerciseState>
  preferences: {
    /** Показывать русский перевод условия сразу, не нажимая кнопку. */
    showTranslation: boolean
    /** Уровень сложности заданий: три уровня рабочей тетради. */
    level: ExerciseLevel
  }
}

const EMPTY_EXERCISE: ExerciseState = {
  status: 'unseen',
  attempts: 0,
  hintsUsed: 0,
  revealed: false,
}

const INITIAL: ProgressData = {
  version: 1,
  exercises: {},
  preferences: { showTranslation: false, level: 'basis' },
}

export function exerciseKey(lessonId: string, exerciseId: string): string {
  return `${lessonId}:${exerciseId}`
}

function read(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL
    const parsed = JSON.parse(raw) as Partial<ProgressData>
    if (parsed.version !== 1) return INITIAL
    return {
      version: 1,
      exercises: parsed.exercises ?? {},
      preferences: { ...INITIAL.preferences, ...parsed.preferences },
    }
  } catch {
    // Приватное окно, отключённые куки, битый JSON — начинаем с чистого листа.
    return INITIAL
  }
}

let state: ProgressData = typeof localStorage === 'undefined' ? INITIAL : read()
const listeners = new Set<() => void>()

function commit(next: ProgressData): void {
  state = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Не смогли сохранить — сессия всё равно работает, просто не переживёт перезагрузку.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function snapshot(): ProgressData {
  return state
}

/* -------------------------------------------------------------- изменения */

function update(key: string, patch: Partial<ExerciseState>): void {
  const current = state.exercises[key] ?? EMPTY_EXERCISE
  commit({
    ...state,
    exercises: { ...state.exercises, [key]: { ...current, ...patch } },
  })
}

export function recordAttempt(lessonId: string, exerciseId: string): void {
  const key = exerciseKey(lessonId, exerciseId)
  const current = state.exercises[key] ?? EMPTY_EXERCISE
  if (current.status === 'solved') return
  update(key, { status: 'attempted', attempts: current.attempts + 1 })
}

export function recordSolved(lessonId: string, exerciseId: string): void {
  const key = exerciseKey(lessonId, exerciseId)
  const current = state.exercises[key] ?? EMPTY_EXERCISE
  update(key, {
    status: 'solved',
    attempts: current.attempts + 1,
    solvedAt: Date.now(),
  })
}

export function recordHintUsed(lessonId: string, exerciseId: string, hintIndex: number): void {
  const key = exerciseKey(lessonId, exerciseId)
  const current = state.exercises[key] ?? EMPTY_EXERCISE
  // hintIndex — номер открытой подсказки, счётчик не должен уменьшаться.
  update(key, { hintsUsed: Math.max(current.hintsUsed, hintIndex + 1) })
}

export function recordRevealed(lessonId: string, exerciseId: string): void {
  update(exerciseKey(lessonId, exerciseId), { revealed: true })
}

export function setShowTranslation(showTranslation: boolean): void {
  commit({ ...state, preferences: { ...state.preferences, showTranslation } })
}

export function setLevel(level: ExerciseLevel): void {
  commit({ ...state, preferences: { ...state.preferences, level } })
}

/** Сбрасывает один урок — чтобы прорешать его заново перед контрольной. */
export function resetLesson(lessonId: string): void {
  const prefix = `${lessonId}:`
  const exercises = Object.fromEntries(
    Object.entries(state.exercises).filter(([key]) => !key.startsWith(prefix)),
  )
  commit({ ...state, exercises })
}

export function resetAll(): void {
  commit({ ...INITIAL, preferences: state.preferences })
}

/* ------------------------------------------------------------------ React */

export function useProgress(): ProgressData {
  return useSyncExternalStore(subscribe, snapshot, snapshot)
}

export function useExerciseState(lessonId: string, exerciseId: string): ExerciseState {
  const progress = useProgress()
  return progress.exercises[exerciseKey(lessonId, exerciseId)] ?? EMPTY_EXERCISE
}

export type LessonProgress = { solved: number; total: number; percent: number }

export function useLessonProgress(lessonId: string, exerciseIds: string[]): LessonProgress {
  const progress = useProgress()
  const solved = exerciseIds.filter(
    (id) => progress.exercises[exerciseKey(lessonId, id)]?.status === 'solved',
  ).length
  const total = exerciseIds.length
  return { solved, total, percent: total === 0 ? 0 : Math.round((solved / total) * 100) }
}
