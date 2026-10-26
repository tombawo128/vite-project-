const USERS_KEY = 'users'

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

export async function signUp({ name, email, password }) {
  const users = getUsers()
  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )
  if (exists) {
    return { error: 'An account with this email already exists.' }
  }
  const user = { name, email, password }
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
  return { user: { name, email } }
}

export async function logIn({ email, password }) {
  const match = getUsers().find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  )
  if (!match) {
    return { error: 'Incorrect email or password.' }
  }
  return { user: { name: match.name, email: match.email } }
}