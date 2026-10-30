import { useState } from 'react'
import { logIn } from '../utils/auth.js'

function LoginPage({ onLogin, onSwitch }) {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setBusy(true)
    setError('')
    const result = await logIn({
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ''),
    })
    setBusy(false)
    if (result.error) {
      setError(result.error)
      return
    }
    onLogin(result.user, `Welcome back, ${result.user.name}.`)
  }

  return (
    <div className="app auth-app">
      {/* Same header style as the main app */}
      <header>
        <div>
          <h1>Small Business Manager</h1>
          <p>Sign in to your account</p>
        </div>
      </header>

      {/* Same nav-bar style — shows "Log in" as active tab, "Sign up" as inactive */}
      <nav aria-label="Authentication navigation">
        <button className="selected" type="button">Log in</button>
        <button type="button" onClick={onSwitch}>Sign up</button>
      </nav>

      <main>
        <div className="page-title">
          <div>
            <h2>Log in</h2>
            <p>Enter your email and password to open your dashboard.</p>
          </div>
        </div>

        <form className="simple-form auth-inner-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-email">
            Email address
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label htmlFor="login-password">
            Password
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </label>

          {error && (
            <p className="form-error" role="alert">⚠ {error}</p>
          )}

          <button type="submit" className="auth-primary-btn" disabled={busy}>
            {busy ? <><span className="auth-spinner-dark" /> Signing in…</> : 'Log in'}
          </button>
        </form>

        <p className="note">
          No account yet?{' '}
          <button type="button" className="link-button" onClick={onSwitch}>
            Create a free account
          </button>
        </p>
      </main>
    </div>
  )
}

export default LoginPage
