import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  return (
    <section
      id="newsletter"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)' }}
    >
      <style>{`
        @keyframes newsletter-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-18px); }
        }
        .newsletter-float {
          animation: newsletter-float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Centered content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
          <Mail className="h-7 w-7 text-white" />
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Stay in the loop</h2>
        <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Get the latest updates, productivity tips, and feature announcements delivered straight to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-5">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="bg-white border-0 text-gray-800 placeholder:text-gray-400 h-12 flex-1 rounded-lg focus-visible:ring-0"
          />
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold h-12 px-6 rounded-lg whitespace-nowrap">
            Subscribe To projekx
          </Button>
        </div>

        <p className="text-white/40 text-xs">No spam, unsubscribe at any time. We respect your privacy.</p>
      </div>

      {/* Absolute bottom-right illustration */}
      <img
        src="/subscribe/xzb3FlPw.avif"
        alt="Subscribe illustration"
        className="newsletter-float hidden lg:block absolute bottom-0 right-8 w-72 h-auto object-contain opacity-40 pointer-events-none"
      />
    </section>
  )
}
