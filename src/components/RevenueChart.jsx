import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// Tooltip colors come from CSS variables in index.css, so they follow light/dark mode
const tooltipStyle = {
  backgroundColor: 'var(--tooltip-bg)',
  border: '1px solid var(--tooltip-border)',
  borderRadius: '12px',
  boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
  fontSize: '13px',
}

// Turns 4500 into "$4.5k" for the Y axis labels
function formatAxisValue(value) {
  return value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value}`
}

// data: array like [{ label: 'Jan', revenue: 2840, previousRevenue: 2610 }, ...]
// showComparison: also draw last year's revenue as a dashed line
function RevenueChart({ title, subtitle, data, showComparison = false }) {
  // Add up the revenue of every point to show the total in the header
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)

  return (
    <div className="card h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Total revenue</p>
          <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 h-72">
        {/* ResponsiveContainer makes the chart fill the width of its parent */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={56}
              tick={{ fontSize: 12 }}
              tickFormatter={formatAxisValue}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: 'var(--tooltip-text)', fontWeight: 600, marginBottom: 4 }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            {/* itemSorter={null} keeps the legend in the same order as the lines below */}
            {showComparison && (
              <Legend
                verticalAlign="top"
                align="right"
                height={36}
                iconType="circle"
                iconSize={8}
                itemSorter={null}
                wrapperStyle={{ fontSize: 13 }}
                formatter={(value) => <span className="text-gray-600 dark:text-gray-300">{value}</span>}
              />
            )}

            <Line
              type="monotone"
              dataKey="revenue"
              name={showComparison ? 'This year' : 'Revenue'}
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff' }}
            />
            {showComparison && (
              <Line
                type="monotone"
                dataKey="previousRevenue"
                name="Last year"
                stroke="#9ca3af"
                strokeWidth={2}
                strokeDasharray="6 6"
                dot={false}
                activeDot={{ r: 5 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart
