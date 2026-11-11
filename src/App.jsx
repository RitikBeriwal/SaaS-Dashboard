import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Customers from './pages/Customers'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { currentUser } from './data/dashboardData'

function App() {
  // The user lives here so the Navbar, Dashboard and Settings page all share it.
  // When Settings saves a new name, the Navbar and welcome message update too.
  const [user, setUser] = useState(currentUser)
  // Customer search text, shared by the navbar search box and the Customers page
  const [customerSearch, setCustomerSearch] = useState('')
  // Read the saved login from localStorage, so a page refresh doesn't log the user out.
  // (A real app would store a token from the server instead of a simple "true".)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')

  function handleLogin() {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  function handleLogout() {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    setCustomerSearch('')
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Logged-in users don't need the login page, so send them to the dashboard */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />

        {/* Every dashboard page is rendered inside DashboardLayout (sidebar + navbar).
            These pages are protected: logged-out users are sent to /login instead. */}
        <Route
          element={
            isLoggedIn ? (
              <DashboardLayout user={user} onSearch={setCustomerSearch} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route
            path="/customers"
            element={<Customers searchTerm={customerSearch} onSearchChange={setCustomerSearch} />}
          />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings user={user} onSaveUser={setUser} />} />
          {/* Unknown URLs go back to the dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
