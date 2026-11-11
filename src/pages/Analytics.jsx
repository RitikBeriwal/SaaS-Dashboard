import { useState } from 'react'
import { FiDollarSign, FiShoppingCart, FiTrendingUp, FiUserPlus } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import RevenueChart from '../components/RevenueChart'
import SalesChart from '../components/SalesChart'
import { monthlyPerformance } from '../data/dashboardData'

// Percentage change between two numbers, rounded to 1 decimal (e.g. 12.5)
function getPercentChange(current, previous) {
  return Number((((current - previous) / previous) * 100).toFixed(1))
}

const metricTabs = [
  { value: 'revenue', label: 'Revenue' },
  { value: 'orders', label: 'Orders' },
]

function Analytics() {
  const [compareLastYear, setCompareLastYear] = useState(true)
  const [topMetric, setTopMetric] = useState('revenue')

  // Add up all 12 months with reduce()
  const totalRevenue = monthlyPerformance.reduce((sum, month) => sum + month.revenue, 0)
  const lastYearRevenue = monthlyPerformance.reduce((sum, month) => sum + month.previousRevenue, 0)
  const totalOrders = monthlyPerformance.reduce((sum, month) => sum + month.orders, 0)
  const lastYearOrders = monthlyPerformance.reduce((sum, month) => sum + month.previousOrders, 0)
  const totalNewCustomers = monthlyPerformance.reduce((sum, month) => sum + month.customers, 0)

  const averageOrderValue = totalRevenue / totalOrders
  const lastYearAverageOrderValue = lastYearRevenue / lastYearOrders

  const summaryCards = [
    {
      title: 'Annual Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: getPercentChange(totalRevenue, lastYearRevenue),
      comparisonLabel: 'vs last year',
      icon: FiDollarSign,
      color: 'indigo',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toLocaleString(),
      change: getPercentChange(totalOrders, lastYearOrders),
      comparisonLabel: 'vs last year',
      icon: FiShoppingCart,
      color: 'emerald',
    },
    {
      title: 'Avg. Order Value',
      value: `$${averageOrderValue.toFixed(2)}`,
      change: getPercentChange(averageOrderValue, lastYearAverageOrderValue),
      comparisonLabel: 'vs last year',
      icon: FiTrendingUp,
      color: 'amber',
    },
    {
      title: 'New Customers',
      value: totalNewCustomers.toLocaleString(),
      comparisonLabel: `Avg. ${Math.round(totalNewCustomers / 12)} per month`,
      icon: FiUserPlus,
      color: 'sky',
    },
  ]

  // Copy the array before sorting, because sort() changes the original array
  const topMonths = [...monthlyPerformance].sort((a, b) => b[topMetric] - a[topMetric]).slice(0, 5)
  const bestValue = topMonths[0][topMetric]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance analytics"
        description="Track how revenue and sales are performing across the year."
      >
        {/* Toggle switch: a hidden checkbox with a styled track and knob */}
        <label className="card flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={compareLastYear}
            onChange={(event) => setCompareLastYear(event.target.checked)}
            className="peer sr-only"
          />
          <span className="relative h-5 w-9 rounded-full bg-gray-200 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-indigo-600 peer-checked:after:translate-x-4 peer-focus-visible:ring-4 peer-focus-visible:ring-indigo-500/20 dark:bg-gray-700" />
          Compare with last year
        </label>
      </PageHeader>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            comparisonLabel={card.comparisonLabel}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      {/* Revenue performance */}
      <RevenueChart
        title="Revenue performance"
        subtitle="Monthly revenue from January to December"
        data={monthlyPerformance}
        showComparison={compareLastYear}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Sales performance */}
        <div className="min-w-0 xl:col-span-2">
          <SalesChart
            title="Sales performance"
            subtitle="Number of orders each month"
            data={monthlyPerformance}
            showComparison={compareLastYear}
          />
        </div>

        {/* Top performing months */}
        <div className="card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Top performing months</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your 5 best months this year</p>
            </div>

            <div className="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
              {metricTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setTopMetric(tab.value)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    topMetric === tab.value
                      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-6 space-y-5">
            {topMonths.map((month, index) => {
              const value = month[topMetric]
              const previousValue = topMetric === 'revenue' ? month.previousRevenue : month.previousOrders
              const change = getPercentChange(value, previousValue)

              return (
                <li key={month.label}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">{month.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {topMetric === 'revenue' ? `$${value.toLocaleString()}` : `${value} orders`}
                      </span>
                      <span
                        className={`w-14 text-right text-xs font-medium ${
                          change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {change >= 0 ? '+' : ''}
                        {change}%
                      </span>
                    </div>
                  </div>
                  {/* Progress bar: width is relative to the best month */}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                      style={{ width: `${(value / bestValue) * 100}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Analytics
