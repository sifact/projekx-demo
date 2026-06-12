import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginUser, setCurrentEmail } from '@/utils/auth'
import type { Page } from '@/types'

interface Props {
  navigate: (to: Page) => void
}

export default function LoginPage({ navigate }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = loginUser(email, password)
    if (!user) {
      setError('Invalid email or password')
      return
    }
    setCurrentEmail(email)
    navigate('dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-[460px]">
        {/* Logo circle */}
        <div className="flex justify-center mb-8">
          <button onClick={() => navigate('landing')} className="w-24 h-24 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center overflow-hidden p-2 hover:shadow-lg transition-shadow">
            <img src="/logo/1.avif" alt="projekx" className="w-full h-auto object-contain" />
          </button>
        </div>

        <h1 className="text-[28px] font-black text-center text-gray-900 mb-1">Welcome to projekx</h1>
        <p className="text-gray-400 text-center text-sm mb-8">Sign in to continue</p>

        {/* Google button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl h-12 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors mb-6"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* OR divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800 text-center">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="rounded-xl border-gray-200 h-12"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800 text-center">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="rounded-xl border-gray-200 h-12 pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-500 hover:text-violet-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full h-12 bg-[#374151] hover:bg-[#1F2937] text-white rounded-xl text-base font-semibold"
          >
            Sign in
          </Button>
        </form>

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            Forgot password?
          </button>
          <div className="text-sm text-gray-500">
            Need an account?{' '}
            <button
              type="button"
              onClick={() => navigate('signup')}
              className="font-bold text-gray-900 hover:text-violet-600 transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}
