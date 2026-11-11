import { useState } from 'react'
import { FiAlertCircle, FiEye, FiEyeOff, FiInfo, FiLock, FiMail } from 'react-icons/fi'
import { demoAccount, monthlyPerformance } from '../data/dashboardData'

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300'
const errorClass = 'mt-1.5 text-xs text-red-600 dark:text-red-400'

// Numbers shown on the right-hand brand panel
const highlights = [
  { label: 'Revenue', value: '$45,230', change: '+12.5%' },
  { label: 'Users', value: '2,450', change: '+8.2%' },
  { label: 'Orders', value: '1,230', change: '+15.3%' },
]
const highestRevenue = Math.max(...monthlyPerformance.map((month) => month.revenue))

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validateForm() {
    const newErrors = {}

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (password === '') {
      newErrors.password = 'Please enter your password.'
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    setLoginError('')

    const newErrors = validateForm()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)

    // Pretend we are waiting for a server to check the details
    setTimeout(() => {
      const isCorrect = email.trim().toLowerCase() === demoAccount.email && password === demoAccount.password

      if (isCorrect) {
        // App.jsx marks the user as logged in, and the router then shows the dashboard
        onLogin()
      } else {
        setLoginError('Incorrect email or password. Try the demo account below.')
        setIsSubmitting(false)
      }
    }, 600)
  }

  function fillDemoAccount() {
    setEmail(demoAccount.email)
    setPassword(demoAccount.password)
    setErrors({})
    setLoginError('')
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Left side: login form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Analytix</span>
          </div>

          <h1 className="mt-10 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to see how your business is performing.
          </p>

          {loginError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
            >
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <div>
              <label htmlFor="login-email" className={labelClass}>
                Email address
              </label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={`input-field w-full py-2.5 pl-9 ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="login-password" className={labelClass}>
                Password
              </label>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`input-field w-full py-2.5 pl-9 pr-10 ${errors.password ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className={errorClass}>{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {/* Small spinning circle while "signing in" */}
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Demo account hint */}
          <div className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <div className="flex items-start gap-3">
              <FiInfo className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-medium text-indigo-900 dark:text-indigo-200">Demo account</p>
                <p className="mt-1 break-all text-indigo-700/90 dark:text-indigo-300/90">
                  {demoAccount.email}
                  <br />
                  Password: {demoAccount.password}
                </p>
                <button
                  type="button"
                  onClick={fillDemoAccount}
                  className="mt-3 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm ring-1 ring-indigo-200 hover:bg-indigo-50 dark:bg-gray-900 dark:text-indigo-300 dark:ring-indigo-500/30 dark:hover:bg-gray-800"
                >
                  Use demo account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: brand panel (large screens only) */}
      <div className="hidden bg-indigo-600 lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:px-16">
        <div className="max-w-lg">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Understand your business at a glance.
          </h2>
          <p className="mt-4 text-indigo-100">
            Track revenue, customers and orders in one clean dashboard, and export reports in a click.
          </p>

          {/* Mini preview of the dashboard */}
          <div className="mt-10 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15">
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-medium text-indigo-200">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                  <p className="text-xs font-medium text-emerald-300">{item.change}</p>
                </div>
              ))}
            </div>

            {/* Simple bar chart made with divs: each bar's height is relative to the best month */}
            <div className="mt-6 flex h-28 items-end gap-2">
              {monthlyPerformance.map((month) => (
                <div
                  key={month.label}
                  className="flex-1 rounded-t bg-white/70"
                  style={{ height: `${(month.revenue / highestRevenue) * 100}%` }}
                  title={`${month.label}: $${month.revenue.toLocaleString()}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
