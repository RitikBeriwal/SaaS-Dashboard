import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi'

const iconColors = {
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
  sky: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
}

// "icon: Icon" renames the prop, because React components must start with a capital letter
function StatCard({ title, value, change, comparisonLabel, icon: Icon, color = 'indigo' }) {
  const isPositive = change >= 0

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-2 truncate text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconColors[color]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        {/* The change badge is optional - some cards only show a label */}
        {change !== undefined && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
            }`}
          >
            {isPositive ? <FiArrowUpRight className="h-3.5 w-3.5" /> : <FiArrowDownRight className="h-3.5 w-3.5" />}
            {isPositive ? '+' : '-'}
            {Math.abs(change)}%
          </span>
        )}
        <span className="text-gray-500 dark:text-gray-400">{comparisonLabel}</span>
      </div>
    </div>
  )
}

export default StatCard
