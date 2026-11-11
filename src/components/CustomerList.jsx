import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Avatar from './Avatar'

function CustomerList({ customers }) {
  return (
    <div className="card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Customers</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Newest sign-ups</p>
        </div>
        <Link
          to="/customers"
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View all
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
        {customers.map((customer) => (
          <li key={customer.id} className="flex items-center gap-3 py-3">
            <Avatar name={customer.name} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{customer.name}</p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">{customer.email}</p>
            </div>
            <p className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{customer.joinedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomerList
