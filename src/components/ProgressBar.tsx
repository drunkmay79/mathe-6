type ProgressBarProps = {
  solved: number
  total: number
  label?: string
}

/** Полоска «решено N из M». Показывает прогресс урока или всего учебника. */
export function ProgressBar({ solved, total, label }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((solved / total) * 100)
  const done = total > 0 && solved === total

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-sm">
        <span className="ru-text">{label ?? 'Решено'}</span>
        <span className="tabular-nums font-medium">
          {solved} / {total}
          {done ? ' ✓' : ''}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Прогресс'}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${
            done ? 'bg-emerald-500' : 'bg-accent'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
