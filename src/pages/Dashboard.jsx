import { useState } from 'react'
import { FiCalendar, FiDollarSign, FiShoppingCart, FiTarget, FiUsers } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import RevenueChart from '../components/RevenueChart'
import SalesChart from '../components/SalesChart'
import TransactionTable from '../components/TransactionTable'
import CustomerList from '../components/CustomerList'
import { dashboardData, dateRanges } from '../data/dashboardData'
import { transactions } from '../data/transactions'
import { customers } from '../data/customers'

// Today's date, e.g. "Saturday, November 7, 2026".
// Calculated once when the file loads, so it doesn't change on every re-render.
const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function Dashboard({ user }) {
  const [selectedRange, setSelectedRange] = useState('12m')

  // Pick the numbers for the selected date range ('7d', '30d' or '12m')
  const data = dashboardData[selectedRange]
  const rangeLabel = dateRanges.find((range) => range.value === selectedRange).label.toLowerCase()

  const firstName = user.name.split(' ')[0]

  const stats = [
    { title: 'Total Revenue', value: data.revenue, change: data.revenueChange, icon: FiDollarSign, color: 'indigo' },
    { title: 'Total Users', value: data.users, change: data.usersChange, icon: FiUsers, color: 'sky' },
    { title: 'Total Orders', value: data.orders, change: data.ordersChange, icon: FiShoppingCart, color: 'emerald' },
    { title: 'Conversion Rate', value: data.conversionRate, change: data.conversionChange, icon: FiTarget, color: 'amber' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <PageHeader title={`Welcome back, ${firstName}!`} description="Overview of your business performance.">
        <span className="hidden text-sm text-gray-500 xl:inline dark:text-gray-400">{today}</span>

        {/* Date range selector */}
        <div className="relative">
          <FiCalendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <select
            value={selectedRange}
            onChange={(event) => setSelectedRange(event.target.value)}
            aria-label="Select date range"
            className="input-field cursor-pointer py-2.5 pl-9 pr-8 font-medium shadow-sm"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </PageHeader>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            comparisonLabel={data.comparisonLabel}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts - "min-w-0" lets the charts shrink properly inside the grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <RevenueChart
            title="Revenue Analytics"
            subtitle={`Revenue over the ${rangeLabel}`}
            data={data.chartData}
          />
        </div>
        <div className="min-w-0">
          <SalesChart title="Sales Overview" subtitle={`Orders over the ${rangeLabel}`} data={data.chartData} />
        </div>
      </div>

      {/* Transactions + recent customers */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <TransactionTable transactions={transactions} />
        </div>
        <div className="min-w-0">
          <CustomerList customers={customers.slice(0, 10)} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
