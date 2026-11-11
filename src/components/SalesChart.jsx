import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const tooltipStyle = {
  backgroundColor: 'var(--tooltip-bg)',
  border: '1px solid var(--tooltip-border)',
  borderRadius: '12px',
  boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
  fontSize: '13px',
}

// data: array like [{ label: 'Jan', orders: 82, previousOrders: 72 }, ...]
// showComparison: also draw last year's orders as a second bar
function SalesChart({ title, subtitle, data, showComparison = false }) {
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0)

  return (
    <div className="card h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Total orders</p>
          <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
            {totalOrders.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 0, left: -12, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tick={{ fontSize: 12 }}
              interval="preserveStart"
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={8} allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: 'var(--tooltip-text)', fontWeight: 600, marginBottom: 4 }}
              formatter={(value) => `${value} orders`}
            />
            {/* itemSorter={null} keeps the legend in the same order as the bars below */}
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

            <Bar
              dataKey="orders"
              name={showComparison ? 'This year' : 'Orders'}
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
            {showComparison && (
              <Bar dataKey="previousOrders" name="Last year" fill="#c7d2fe" radius={[6, 6, 0, 0]} maxBarSize={32} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesChart
