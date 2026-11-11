import { useState } from 'react'
import Avatar from './Avatar'
import StatusBadge from './StatusBadge'

const statusFilters = ['All', 'Completed', 'Pending', 'Failed']

function TransactionTable({ transactions }) {
  const [statusFilter, setStatusFilter] = useState('All')

  // Only keep the transactions that match the selected tab
  const filteredTransactions =
    statusFilter === 'All'
      ? transactions
      : transactions.filter((transaction) => transaction.status === statusFilter)

  // Number shown next to each tab, e.g. "Pending 2"
  function countByStatus(status) {
    if (status === 'All') return transactions.length
    return transactions.filter((transaction) => transaction.status === status).length
  }

  return (
    <div className="card h-full overflow-hidden">
      <div className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Latest orders from your customers</p>
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          {statusFilters.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {status}
              <span className="text-gray-400">{countByStatus(status)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* overflow-x-auto lets the table scroll sideways on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="border-y border-gray-100 bg-gray-50/80 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-400">
            <tr>
              <th className="px-5 py-3 font-medium sm:px-6">Customer</th>
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium sm:px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="px-5 py-3.5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <Avatar name={transaction.customer} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-gray-900 dark:text-white">{transaction.customer}</p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">{transaction.email}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-gray-600 dark:text-gray-300">#{transaction.id}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-gray-600 dark:text-gray-300">{transaction.date}</td>
                <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">
                  {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </td>
                <td className="px-5 py-3.5 sm:px-6">
                  <StatusBadge status={transaction.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <p className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            No {statusFilter.toLowerCase()} transactions found.
          </p>
        )}
      </div>
    </div>
  )
}

export default TransactionTable
