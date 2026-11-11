import { useState } from 'react'
import { FiSearch, FiUsers, FiX } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import Avatar from '../components/Avatar'
import StatusBadge from '../components/StatusBadge'
import { customers } from '../data/customers'

const statusOptions = ['All', 'Active', 'Pending', 'Inactive']
const planOptions = ['All plans', 'Starter', 'Pro', 'Enterprise']

// searchTerm and onSearchChange come from App.jsx, because the navbar search box
// also needs to set this value (this is called "lifting state up")
function Customers({ searchTerm, onSearchChange }) {
  const [statusFilter, setStatusFilter] = useState('All')
  const [planFilter, setPlanFilter] = useState('All plans')

  function clearFilters() {
    onSearchChange('')
    setStatusFilter('All')
    setPlanFilter('All plans')
  }

  // A customer is shown only if it matches the search AND the status AND the plan
  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase()
    const matchesSearch =
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.company.toLowerCase().includes(search)
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter
    const matchesPlan = planFilter === 'All plans' || customer.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  function countByStatus(status) {
    if (status === 'All') return customers.length
    return customers.filter((customer) => customer.status === status).length
  }

  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'All' || planFilter !== 'All plans'

  return (
    <div>
      <PageHeader title="All customers" description="Search, filter and review everyone using your product." />

      <div className="card overflow-hidden">
        {/* Toolbar: status tabs, search and plan filter */}
        <div className="flex flex-col gap-4 p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            {statusOptions.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {status}
                <span className="text-xs text-gray-400">{countByStatus(status)}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative sm:w-72">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search name, email or company"
                aria-label="Search customers"
                className="input-field w-full pl-9"
              />
            </div>

            <select
              value={planFilter}
              onChange={(event) => setPlanFilter(event.target.value)}
              aria-label="Filter by plan"
              className="input-field cursor-pointer pr-8"
            >
              {planOptions.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <FiX className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Customers table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left text-sm">
            <thead className="border-y border-gray-100 bg-gray-50/80 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3 font-medium sm:px-6">Customer</th>
                <th className="hidden px-5 py-3 font-medium lg:table-cell">Company</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="hidden px-5 py-3 font-medium xl:table-cell">Location</th>
                <th className="px-5 py-3 text-right font-medium">Total spent</th>
                <th className="px-5 py-3 font-medium sm:px-6">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="px-5 py-3.5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <Avatar name={customer.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900 dark:text-white">{customer.name}</p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3.5 text-gray-600 lg:table-cell dark:text-gray-300">
                    {customer.company}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      {customer.plan}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="hidden whitespace-nowrap px-5 py-3.5 text-gray-600 xl:table-cell dark:text-gray-300">
                    {customer.location}
                  </td>
                  <td className="px-5 py-3.5 text-right font-medium text-gray-900 dark:text-white">
                    ${customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-gray-600 sm:px-6 dark:text-gray-300">
                    {customer.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {filteredCustomers.length === 0 && (
            <div className="flex flex-col items-center px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800">
                <FiUsers className="h-6 w-6" />
              </span>
              <p className="mt-4 font-medium text-gray-900 dark:text-white">No customers found</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try a different search term or remove some filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <p className="border-t border-gray-100 px-5 py-3.5 text-sm text-gray-500 sm:px-6 dark:border-gray-800 dark:text-gray-400">
          Showing <span className="font-medium text-gray-900 dark:text-white">{filteredCustomers.length}</span> of{' '}
          {customers.length} customers
        </p>
      </div>
    </div>
  )
}

export default Customers
