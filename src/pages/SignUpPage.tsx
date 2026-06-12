import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { registerUser, setCurrentEmail, emailExists } from '@/utils/auth'
import type { Page } from '@/types'

interface Props {
  navigate: (to: Page) => void
}

function validatePassword(pw: string): string {
  if (pw.length < 8 || !/[a-zA-Z]/.test(pw) || !/[0-9]/.test(pw) || !/[^a-zA-Z0-9]/.test(pw)) {
    return 'Your password must be at least 8 characters long and include letters, numbers, and at least one symbol.'
  }
  return ''
}

export default function SignUpPage({ navigate }: Props) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: '',
  })
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}

    if (!form.firstName.trim()) next.firstName = 'Required'
    if (!form.lastName.trim()) next.lastName = 'Required'

    const pwErr = validatePassword(form.password)
    if (pwErr) next.password = pwErr
    if (form.password !== form.confirm) next.confirm = 'Passwords do not match'

    if (emailExists(form.email)) next.email = 'An account with this email already exists'

    if (Object.keys(next).length > 0) { setErrors(next); return }

    registerUser({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password, createdAt: new Date().toISOString() })
    setCurrentEmail(form.email)
    navigate('dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-[460px]">
        <button
          type="button"
          onClick={() => navigate('login')}
          className="flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-700 mb-7 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </button>

        <h1 className="text-[28px] font-black text-gray-900 mb-8">Create your account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name row */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800 text-center">Name</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  placeholder="First name"
                  value={form.firstName}
                  onChange={set('firstName')}
                  className="rounded-xl border-gray-200 h-12"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Input
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={set('lastName')}
                  className="rounded-xl border-gray-200 h-12"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800 text-center">Email</label>
            <Input
              type="email"
              placeholder="johnsmith@gmail.com"
              value={form.email}
              onChange={set('email')}
              className="rounded-xl border-gray-200 h-12"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800 text-center">Password</label>
            <div className="relative">
              <Input
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={form.password}
                onChange={set('password')}
                className="rounded-xl border-gray-200 h-12 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-500"
              >
                {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-800 text-center">Confirm Password</label>
            <div className="relative">
              <Input
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={form.confirm}
                onChange={set('confirm')}
                className="rounded-xl border-gray-200 h-12 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-500"
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#374151] hover:bg-[#1F2937] text-white rounded-xl text-base font-semibold mt-2"
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  )
}
