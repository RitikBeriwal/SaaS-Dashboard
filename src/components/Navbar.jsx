import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FiAlertCircle,
  FiBell,
  FiChevronDown,
  FiFileText,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSettings,
  FiShoppingCart,
  FiSun,
  FiUserPlus,
} from 'react-icons/fi'
import Avatar from './Avatar'
import { notifications as initialNotifications } from '../data/dashboardData'

// Page title for each route
const pageTitles = {
  '/': 'Overview',
  '/analytics': 'Analytics',
  '/customers': 'Customers',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

// Icon for each notification type
const notificationIcons = {
  order: FiShoppingCart,
  alert: FiAlertCircle,
  customer: FiUserPlus,
  report: FiFileText,
}

const iconButtonClass =
  'relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'

const menuLinkClass =
  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'

function Navbar({ user, theme, onToggleTheme, onOpenMobileMenu, onSearch, onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [notifications, setNotifications] = useState(initialNotifications)
  // Which dropdown is open: 'notifications', 'profile' or null (none)
  const [openMenu, setOpenMenu] = useState(null)

  const pageTitle = pageTitles[location.pathname] || 'Dashboard'
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  // Close any open dropdown when the Escape key is pressed
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpenMenu(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Cleanup: remove the listener when the Navbar is removed from the page
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  function toggleMenu(menuName) {
    setOpenMenu(openMenu === menuName ? null : menuName)
  }

  function closeMenu() {
    setOpenMenu(null)
  }

  // Searching saves the text in App.jsx (through onSearch) and opens the Customers page
  function handleSearch(event) {
    event.preventDefault()
    const term = searchTerm.trim()
    if (term === '') return

    onSearch(term)
    navigate('/customers')
    setSearchTerm('')
  }

  function markAsRead(id) {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  function markAllAsRead() {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Invisible full-screen layer: clicking anywhere outside an open dropdown closes it */}
      {openMenu && <div className="fixed inset-0 z-30" onClick={closeMenu} />}

      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className={`${iconButtonClass} -ml-2 lg:hidden`}
          aria-label="Open menu"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <h1 className="truncate text-lg font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>

        {/* Search bar (hidden on small phones) */}
        <form onSubmit={handleSearch} role="search" className="ml-auto hidden w-full max-w-xs md:block">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search customers..."
              aria-label="Search customers"
              className="input-field w-full bg-gray-50 pl-9 dark:bg-gray-800"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className={iconButtonClass}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu('notifications')}
              className={`${iconButtonClass} z-40`}
              aria-label="Notifications"
              aria-expanded={openMenu === 'notifications'}
            >
              <FiBell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {openMenu === 'notifications' && (
              <div className="card fixed inset-x-4 top-16 z-40 overflow-hidden sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96">
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-indigo-400"
                  >
                    Mark all as read
                  </button>
                </div>

                <ul className="max-h-96 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-800">
                  {notifications.map((notification) => {
                    const Icon = notificationIcons[notification.type]

                    return (
                      <li key={notification.id}>
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className={`flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60 ${
                            notification.isRead ? '' : 'bg-indigo-50/60 dark:bg-indigo-500/5'
                          }`}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400">
                              {notification.message}
                            </span>
                            <span className="mt-1 block text-xs text-gray-400 dark:text-gray-500">
                              {notification.time}
                            </span>
                          </span>
                          {!notification.isRead && (
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>

                <p className="border-t border-gray-100 px-4 py-2.5 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  {unreadCount === 0 ? "You're all caught up!" : `${unreadCount} unread notifications`}
                </p>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => toggleMenu('profile')}
              className="relative z-40 flex items-center gap-2.5 rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open profile menu"
              aria-expanded={openMenu === 'profile'}
            >
              <Avatar name={user.name} size="sm" />
              <span className="hidden text-left lg:block">
                <span className="block text-sm font-medium leading-tight text-gray-900 dark:text-white">
                  {user.name}
                </span>
                <span className="block text-xs leading-tight text-gray-500 dark:text-gray-400">
                  {user.role}
                </span>
              </span>
              <FiChevronDown className="hidden h-4 w-4 text-gray-400 lg:block" />
            </button>

            {openMenu === 'profile' && (
              <div className="card absolute right-0 top-full z-40 mt-2 w-64 p-2">
                <div className="flex items-center gap-3 border-b border-gray-100 px-3 pb-3 pt-2 dark:border-gray-800">
                  <Avatar name={user.name} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/settings" onClick={closeMenu} className={menuLinkClass}>
                    <FiSettings className="h-4 w-4 text-gray-400" />
                    Account settings
                  </Link>
                  <Link to="/reports" onClick={closeMenu} className={menuLinkClass}>
                    <FiFileText className="h-4 w-4 text-gray-400" />
                    Reports & exports
                  </Link>
                  <button type="button" onClick={onToggleTheme} className={menuLinkClass}>
                    {theme === 'dark' ? (
                      <FiSun className="h-4 w-4 text-gray-400" />
                    ) : (
                      <FiMoon className="h-4 w-4 text-gray-400" />
                    )}
                    {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                  </button>
                </div>

                <div className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-800">
                  {/* Logging out makes App.jsx redirect to the login page */}
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
