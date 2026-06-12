export type Page = 'landing' | 'login' | 'signup' | 'dashboard'

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt?: string
}
