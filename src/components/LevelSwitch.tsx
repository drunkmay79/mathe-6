import { LEVELS, type ExerciseLevel } from '@/content/schema'

type LevelSwitchProps = {
  value: ExerciseLevel
  onChange: (level: ExerciseLevel) => void
  /** Сколько заданий на каждом уровне — чтобы пустой уровень не выглядел поломкой. */
  counts: Record<ExerciseLevel, number>
}

/**
 * Переключатель сложности. Повторяет три уровня рабочей тетради:
 * там на каждую тему по странице на уровень, со значками ▽ ▷ ⋈.
 */
export function LevelSwitch({ value, onChange, counts }: LevelSwitchProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="ru-text text-sm">Сложность:</span>
      <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
        {LEVELS.map((level) => {
          const active = level.id === value
          const count = counts[level.id]
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange(level.id)}
              disabled={count === 0}
              aria-pressed={active}
              title={`${level.de} — ${level.ru}`}
              className={`rounded-lg px-3 py-1.5 text-sm transition disabled:opacity-40 ${
                active ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
              }`}
            >
              <span aria-hidden>{level.sign}</span> {level.ru}
              <span className={`ml-1.5 tabular-nums ${active ? 'opacity-70' : 'text-ink-soft'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
