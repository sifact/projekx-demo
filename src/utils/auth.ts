import type { User } from '@/types'

const USERS_KEY = 'projekx_users'
const CURRENT_KEY = 'projekx_current_email'

export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]') as User[]
  } catch {
    return []
  }
}

export function registerUser(user: User): void {
  const users = getUsers()
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
}

export function loginUser(email: string, password: string): User | null {
  return getUsers().find(u => u.email === email && u.password === password) ?? null
}

export function setCurrentEmail(email: string): void {
  localStorage.setItem(CURRENT_KEY, email)
}

export function getCurrentUser(): User | null {
  const email = localStorage.getItem(CURRENT_KEY)
  if (!email) return null
  return getUsers().find(u => u.email === email) ?? null
}

export function logoutUser(): void {
  localStorage.removeItem(CURRENT_KEY)
}

export function emailExists(email: string): boolean {
  return getUsers().some(u => u.email.toLowerCase() === email.toLowerCase())
}
