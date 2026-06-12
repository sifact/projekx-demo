import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navLinks = ['Features', 'Clients', 'Testimonials', 'Pricing', 'Newsletter', 'Contact']

interface Props {
  onLogin?: () => void
}

export default function Navbar({ onLogin }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src="/logo/1.avif" alt="projekx" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onLogin} className="hidden md:inline-flex bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-6">
            Login
          </Button>
          <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block text-sm text-gray-600 hover:text-gray-900 font-medium py-1"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <Button onClick={onLogin} className="w-full bg-violet-600 hover:bg-violet-700 text-white mt-2">Login</Button>
        </div>
      )}
    </nav>
  )
}
