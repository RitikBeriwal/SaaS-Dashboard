import { useEffect, useState } from 'react'
import { FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import Avatar from '../components/Avatar'

// Turns the saved user into the starting values of the form
function getInitialForm(user) {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    password: '',
    confirmPassword: '',
  }
}

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300'
const errorClass = 'mt-1.5 text-xs text-red-600 dark:text-red-400'

function Settings({ user, onSaveUser }) {
  const [formData, setFormData] = useState(getInitialForm(user))
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Hide the success message automatically after 3 seconds
  useEffect(() => {
    if (successMessage === '') return

    const timer = setTimeout(() => setSuccessMessage(''), 3000)
    // Cleanup: cancel the timer if the message changes or the page is closed
    return () => clearTimeout(timer)
  }, [successMessage])

  // One change handler for every input - it uses the input's "name" attribute
  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function validateForm() {
    const newErrors = {}

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name.'
    }
    // Simple email check: something@something.something
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }
    // Password is optional, but if it is filled in it must be strong enough
    if (formData.password !== '' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)
    // Stop here if there is at least one error
    if (Object.keys(newErrors).length > 0) return

    // Send the new details up to App.jsx, which updates the navbar and dashboard
    onSaveUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role.trim(),
    })
    setFormData({ ...formData, password: '', confirmPassword: '' })
    setSuccessMessage(
      formData.password ? 'Profile and password updated successfully.' : 'Profile updated successfully.'
    )
  }

  function handleCancel() {
    setFormData(getInitialForm(user))
    setErrors({})
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Account settings" description="Manage your profile information and password." />

      {successMessage && (
        <div
          role="status"
          className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
        >
          <FiCheckCircle className="h-5 w-5 shrink-0" />
          {successMessage}
        </div>
      )}

      {/* noValidate turns off the browser's popups so our own error messages are shown */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Profile information */}
        <section className="card p-5 sm:p-6">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6 dark:border-gray-800">
            <Avatar name={formData.name} size="lg" />
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Profile information</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                This is how your name appears across Analytix.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`input-field w-full ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field w-full ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="role" className={labelClass}>
                Job title <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                className="input-field w-full"
              />
            </div>
          </div>
        </section>

        {/* Password */}
        <section className="card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-6 dark:border-gray-800">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Change password</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Leave these fields empty to keep your current password.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              {showPassword ? 'Hide passwords' : 'Show passwords'}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className={labelClass}>
                New password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                className={`input-field w-full ${errors.password ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {errors.password && <p className={errorClass}>{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat the new password"
                autoComplete="new-password"
                className={`input-field w-full ${errors.confirmPassword ? 'border-red-500 dark:border-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
            </div>
          </div>
        </section>

        {/* Form buttons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
