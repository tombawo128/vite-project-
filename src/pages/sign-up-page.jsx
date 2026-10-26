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
    <form className="simple-form auth-form" onSubmit={handleSubmit}>
      <div>
        <h2>Create an account</h2>
        <p>Sign up to start managing customers, sales and tasks.</p>
      </div>
      <label>
        Full name
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="new-password" minLength="6" required />
      </label>
      <label>
        Confirm password
        <input name="confirm" type="password" autoComplete="new-password" required />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" disabled={busy}>{busy ? 'Creating account...' : 'Sign up'}</button>
      <p className="auth-switch">
        Already have an account? <button type="button" className="link-button" onClick={onSwitch}>Log in</button>
      </p>
    </form>
  )
}

export default SignUpPage
