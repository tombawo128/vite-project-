import { supabase } from './supabase.js'

/**
 * Sign up a new user with email + password.
 * Supabase stores the user; we also store the display name in user_metadata.
 */
export async function signUp({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  })

  if (error) return { error: error.message }

  const user = data.user
  return {
    user: {
      id: user.id,
      name: user.user_metadata?.full_name || name,
      email: user.email,
    },
  }
}

/**
 * Sign in an existing user with email + password.
 */
export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: error.message }

  const user = data.user
  return {
    user: {
      id: user.id,
      name: user.user_metadata?.full_name || user.email,
      email: user.email,
    },
  }
}

/**
 * Sign out the current user.
 */
export async function logOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Sign out error:', error.message)
}

/**
 * Get the currently authenticated user from the active session (if any).
 * Returns a plain user object or null.
 */
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return null
  const u = session.user
  return {
    id: u.id,
    name: u.user_metadata?.full_name || u.email,
    email: u.email,
  }
}

/**
 * Subscribe to auth state changes (login / logout / token refresh).
 * Returns the unsubscribe function.
 */
export function onAuthChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (session?.user) {
        const u = session.user
        callback({
          id: u.id,
          name: u.user_metadata?.full_name || u.email,
          email: u.email,
        })
      } else {
        callback(null)
      }
    }
  )
  return () => subscription.unsubscribe()
}