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
    <form className="simple-form auth-form" onSubmit={handleSubmit}>
      <div>
        <h2>Log in</h2>
        <p>Enter your email and password to open your dashboard.</p>
      </div>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" disabled={busy}>{busy ? 'Logging in...' : 'Log in'}</button>
      <p className="auth-switch">
        No account yet? <button type="button" className="link-button" onClick={onSwitch}>Sign up</button>
      </p>
    </form>
  )
}

export default LoginPage
