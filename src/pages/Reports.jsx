import { useState } from 'react'
import { FiAward, FiBarChart2, FiDollarSign, FiDownload, FiShoppingCart, FiTrendingUp } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import RevenueChart from '../components/RevenueChart'
import SalesChart from '../components/SalesChart'
import { monthlyPerformance } from '../data/dashboardData'

const reportTypes = [
  { value: 'revenue', label: 'Revenue report' },
  { value: 'sales', label: 'Sales report' },
]

function getPercentChange(current, previous) {
  return Number((((current - previous) / previous) * 100).toFixed(1))
}

// Creates a CSV file in the browser and downloads it - no backend needed
function downloadCSV(rows, fileName) {
  // Each row becomes one line, with values separated by commas
  const csvContent = rows.map((row) => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  // Create a temporary link and click it to start the download
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

function Reports() {
  const [reportType, setReportType] = useState('revenue')

  const totalRevenue = monthlyPerformance.reduce((sum, month) => sum + month.revenue, 0)
  const lastYearRevenue = monthlyPerformance.reduce((sum, month) => sum + month.previousRevenue, 0)
  const totalOrders = monthlyPerformance.reduce((sum, month) => sum + month.orders, 0)
  const lastYearOrders = monthlyPerformance.reduce((sum, month) => sum + month.previousOrders, 0)
  const totalCustomers = monthlyPerformance.reduce((sum, month) => sum + month.customers, 0)
  const totalGrowth = getPercentChange(totalRevenue, lastYearRevenue)

  // Find the month with the highest revenue / orders
  const bestRevenueMonth = monthlyPerformance.reduce((best, month) => (month.revenue > best.revenue ? month : best))
  const bestSalesMonth = monthlyPerformance.reduce((best, month) => (month.orders > best.orders ? month : best))

  // The summary cards change depending on the selected report
  const summaryCards =
    reportType === 'revenue'
      ? [
          {
            title: 'Total revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            change: totalGrowth,
            comparisonLabel: 'vs last year',
            icon: FiDollarSign,
            color: 'indigo',
          },
          {
            title: 'Avg. monthly revenue',
            value: `$${Math.round(totalRevenue / 12).toLocaleString()}`,
            comparisonLabel: 'Across 12 months',
            icon: FiTrendingUp,
            color: 'sky',
          },
          {
            title: 'Best month',
            value: bestRevenueMonth.label,
            comparisonLabel: `$${bestRevenueMonth.revenue.toLocaleString()} in revenue`,
            icon: FiAward,
            color: 'amber',
          },
        ]
      : [
          {
            title: 'Total orders',
            value: totalOrders.toLocaleString(),
            change: getPercentChange(totalOrders, lastYearOrders),
            comparisonLabel: 'vs last year',
            icon: FiShoppingCart,
            color: 'emerald',
          },
          {
            title: 'Avg. order value',
            value: `$${(totalRevenue / totalOrders).toFixed(2)}`,
            comparisonLabel: 'Revenue ÷ orders',
            icon: FiBarChart2,
            color: 'sky',
          },
          {
            title: 'Best month',
            value: bestSalesMonth.label,
            comparisonLabel: `${bestSalesMonth.orders} orders`,
            icon: FiAward,
            color: 'amber',
          },
        ]

  function handleDownload() {
    const header = ['Month', 'Revenue', 'Orders', 'Avg Order Value', 'New Customers', 'Revenue Growth %']
    const rows = monthlyPerformance.map((month) => [
      month.label,
      month.revenue,
      month.orders,
      (month.revenue / month.orders).toFixed(2),
      month.customers,
      getPercentChange(month.revenue, month.previousRevenue),
    ])
    const totalRow = [
      'Total',
      totalRevenue,
      totalOrders,
      (totalRevenue / totalOrders).toFixed(2),
      totalCustomers,
      totalGrowth,
    ]

    downloadCSV([header, ...rows, totalRow], 'analytix-monthly-report.csv')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Business reports" description="Monthly revenue and sales statistics you can export.">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30"
        >
          <FiDownload className="h-4 w-4" />
          Download CSV
        </button>
      </PageHeader>

      {/* Report type switch */}
      <div className="inline-flex gap-1 rounded-lg bg-gray-200/60 p-1 dark:bg-gray-800">
        {reportTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setReportType(type.value)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              reportType === type.value
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
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

      {reportType === 'revenue' ? (
        <RevenueChart
          title="Revenue report"
          subtitle="Monthly revenue compared with last year"
          data={monthlyPerformance}
          showComparison
        />
      ) : (
        <SalesChart
          title="Sales report"
          subtitle="Monthly orders compared with last year"
          data={monthlyPerformance}
          showComparison
        />
      )}

      {/* Monthly statistics table */}
      <div className="card overflow-hidden">
        <div className="p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Monthly statistics</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This table is what gets exported when you download the CSV.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-170 text-left text-sm">
            <thead className="border-y border-gray-100 bg-gray-50/80 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3 font-medium sm:px-6">Month</th>
                <th className="px-5 py-3 text-right font-medium">Revenue</th>
                <th className="px-5 py-3 text-right font-medium">Orders</th>
                <th className="px-5 py-3 text-right font-medium">Avg. order value</th>
                <th className="px-5 py-3 text-right font-medium">New customers</th>
                <th className="px-5 py-3 text-right font-medium sm:px-6">Revenue growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {monthlyPerformance.map((month) => {
                const growth = getPercentChange(month.revenue, month.previousRevenue)

                return (
                  <tr key={month.label} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-5 py-3 font-medium text-gray-900 sm:px-6 dark:text-white">{month.label}</td>
                    <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300">
                      ${month.revenue.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300">{month.orders}</td>
                    <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300">
                      ${(month.revenue / month.orders).toFixed(2)}
                    </td>
                    <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300">{month.customers}</td>
                    <td className="px-5 py-3 text-right sm:px-6">
                      <span
                        className={`text-xs font-semibold ${
                          growth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {growth >= 0 ? '+' : ''}
                        {growth}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className="border-t border-gray-200 bg-gray-50/80 font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800/40 dark:text-white">
              <tr>
                <td className="px-5 py-3 sm:px-6">Total</td>
                <td className="px-5 py-3 text-right">${totalRevenue.toLocaleString()}</td>
                <td className="px-5 py-3 text-right">{totalOrders.toLocaleString()}</td>
                <td className="px-5 py-3 text-right">${(totalRevenue / totalOrders).toFixed(2)}</td>
                <td className="px-5 py-3 text-right">{totalCustomers.toLocaleString()}</td>
                <td
                  className={`px-5 py-3 text-right sm:px-6 ${
                    totalGrowth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {totalGrowth >= 0 ? '+' : ''}
                  {totalGrowth}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports
