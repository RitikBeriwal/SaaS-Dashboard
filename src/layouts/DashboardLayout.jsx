import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function DashboardLayout({ user, onSearch, onLogout }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Start with the theme the user picked last time (saved in localStorage)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  // Every time the theme changes: add/remove the "dark" class on <html> and save the choice
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Dark background behind the mobile drawer. Clicking it closes the drawer. */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main area: pushed right by the sidebar width on large screens */}
      <div
        className={`flex min-h-screen flex-col transition-[padding] duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <Navbar
          user={user}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onSearch={onSearch}
          onLogout={onLogout}
        />

        <main className="mx-auto w-full max-w-400 flex-1 p-4 sm:p-6 lg:p-8">
          {/* <Outlet /> is where React Router renders the current page */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
