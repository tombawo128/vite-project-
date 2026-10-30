import { useState } from 'react'
import { signUp } from '../utils/auth.js'

function SignUpPage({ onSignUp, onSwitch }) {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const password = String(formData.get('password') || '')

    if (name.length < 2) {
      setError('Enter your full name.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== String(formData.get('confirm') || '')) {
      setError('Passwords do not match.')
      return
    }

    setBusy(true)
    setError('')
    const result = await signUp({ name, email: String(formData.get('email') || ''), password })
    setBusy(false)
    if (result.error) {
      setError(result.error)
      return
    }
    onSignUp(result.user, `Account created. Welcome, ${result.user.name}.`)
  }

  return (
    <div className="app auth-app">
      {/* Same header style as the main app */}
      <header>
        <div>
          <h1>Small Business Manager</h1>
          <p>Create your free account</p>
        </div>
      </header>

      {/* Same nav-bar style — "Sign up" active, "Log in" inactive */}
      <nav aria-label="Authentication navigation">
        <button type="button" onClick={onSwitch}>Log in</button>
        <button className="selected" type="button">Sign up</button>
      </nav>

      <main>
        <div className="page-title">
          <div>
            <h2>Create an account</h2>
            <p>Sign up to start managing customers, sales and tasks.</p>
          </div>
        </div>

        <form className="simple-form auth-inner-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="signup-name">
            Full name
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              required
            />
          </label>

          <label htmlFor="signup-email">
            Email address
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label htmlFor="signup-password">
            Password
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              minLength="6"
              required
            />
          </label>

          <label htmlFor="signup-confirm">
            Confirm password
            <input
              id="signup-confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
            />
          </label>

          {error && (
            <p className="form-error" role="alert">⚠ {error}</p>
          )}

          <button type="submit" className="auth-primary-btn" disabled={busy}>
            {busy ? <><span className="auth-spinner-dark" /> Creating account…</> : 'Create account'}
          </button>
        </form>

        <p className="note">
          Already have an account?{' '}
          <button type="button" className="link-button" onClick={onSwitch}>
            Log in
          </button>
        </p>
      </main>
    </div>
  )
}

export default SignUpPage
