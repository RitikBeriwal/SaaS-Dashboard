import { NavLink } from 'react-router-dom'
import {
  FiBarChart2,
  FiChevronsLeft,
  FiFileText,
  FiGrid,
  FiSettings,
  FiUsers,
  FiX,
} from 'react-icons/fi'

const navItems = [
  { label: 'Overview', path: '/', icon: FiGrid },
  { label: 'Analytics', path: '/analytics', icon: FiBarChart2 },
  { label: 'Customers', path: '/customers', icon: FiUsers },
  { label: 'Reports', path: '/reports', icon: FiFileText },
  { label: 'Settings', path: '/settings', icon: FiSettings },
]

function Sidebar({ isCollapsed, isMobileOpen, onToggleCollapse, onCloseMobile }) {
  // On large screens the sidebar can be collapsed to show icons only.
  // On mobile it is a drawer that slides in from the left.
  const widthClass = isCollapsed ? 'lg:w-20' : 'lg:w-64'
  const mobileClass = isMobileOpen ? 'translate-x-0' : '-translate-x-full'
  // Hide text labels when collapsed (only on large screens - the mobile drawer always shows them)
  const labelClass = isCollapsed ? 'lg:hidden' : ''

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-all duration-300 lg:z-20 lg:translate-x-0 dark:border-gray-800 dark:bg-gray-900 ${widthClass} ${mobileClass}`}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-5 dark:border-gray-800">
        <div className={`flex items-center gap-2.5 ${isCollapsed ? 'lg:mx-auto' : ''}`}>
          <img src="/favicon.svg" alt="" className="h-8 w-8" />
          <span className={`text-lg font-bold tracking-tight text-gray-900 dark:text-white ${labelClass}`}>
            Analytix
          </span>
        </div>

        {/* Close button - only visible in the mobile drawer */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Close menu"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p
          className={`mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 ${labelClass}`}
        >
          Main menu
        </p>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <li key={item.path}>
                {/* NavLink gives us "isActive" so we can highlight the current page.
                    "end" makes Overview active only on "/" and not on every page. */}
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onCloseMobile}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                    } ${isCollapsed ? 'lg:justify-center' : ''}`
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className={labelClass}>{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Plan usage card (hidden when collapsed) */}
      <div className={`mx-3 mb-3 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-500/10 ${labelClass}`}>
        <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Pro plan</p>
        <p className="mt-1 text-xs text-indigo-700/80 dark:text-indigo-300/80">
          18 of 25 reports used this month
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-500/20">
          <div className="h-full w-[72%] rounded-full bg-indigo-600" />
        </div>
      </div>

      {/* Collapse button - only on large screens */}
      <div className="hidden border-t border-gray-100 p-3 lg:block dark:border-gray-800">
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white ${isCollapsed ? 'justify-center' : ''}`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FiChevronsLeft
            className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          />
          <span className={labelClass}>Collapse</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
