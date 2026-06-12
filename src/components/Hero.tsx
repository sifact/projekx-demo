import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

interface Props {
  onLogin?: () => void
}

export default function Hero({ onLogin }: Props) {
  return (
    <section className="relative min-h-screen bg-violet-50 flex items-center justify-center overflow-hidden pt-16">
      <style>{`
        @keyframes hero-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-18px); }
        }
        .hero-float {
          animation: hero-float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Large bubble — top-left */}
      <div className="hero-float absolute top-20 left-4 w-36 h-36 rounded-full bg-violet-300/50 pointer-events-none" />
      {/* Small bubble — between the two left illustrations */}
      <div className="hero-float absolute top-[44%] left-28 w-20 h-20 rounded-full bg-violet-300/50 pointer-events-none" />

      {/* Left illustrations — top image at top, bottom image pushed to bottom */}
      <div className="hidden xl:flex flex-col justify-between absolute left-0 top-[12%] bottom-[4%]">
        <img
          src="/hero-img/HPM-Ui2w.avif"
          alt="Team collaboration"
          className="hero-float w-64 h-auto object-contain rounded-r-2xl opacity-40"
        />
        <img
          src="/hero-img/7N_HmoIg.avif"
          alt="Calendar view"
          className="hero-float w-56 h-auto object-contain rounded-r-2xl opacity-40 ml-6"
        />
      </div>

      {/* Right illustrations — top image at top, bottom image pushed to bottom */}
      <div className="hidden xl:flex flex-col justify-between items-end absolute right-0 top-[12%] bottom-[4%]">
        <img
          src="/hero-img/cOFjNplw.avif"
          alt="Scheduling"
          className="hero-float w-64 h-auto object-contain rounded-l-2xl opacity-40"
        />
        <img
          src="/hero-img/cbPS81jA.avif"
          alt="Kanban board"
          className="hero-float w-56 h-auto object-contain rounded-l-2xl opacity-40 mr-6"
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Top illustration */}
        <img
          src="/hero-img/_ojzN7fg.avif"
          alt="Dashboard overview"
          className="hero-float w-44 h-auto mx-auto mb-6 object-contain opacity-40"
        />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-5 py-2 text-sm text-violet-700 font-medium mb-8">
          ✨ The future of project management is here
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900 mb-6">
          <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
            projekx
          </span>{' '}
          – Project
          <br />
          Management
          <br />
          Made Effortless
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultra-intuitive project management SaaS tool built for teams who want to{' '}
          <span className="font-bold text-violet-600">plan smarter</span>,{' '}
          <span className="font-bold text-violet-600">collaborate better</span>, and{' '}
          <span className="font-bold text-violet-600">get work done</span>—without the learning curve.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            onClick={onLogin}
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 h-12 text-base rounded-xl w-full sm:w-auto"
          >
            Start Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={onLogin}
            variant="outline"
            className="px-8 h-12 text-base rounded-xl border-2 border-gray-300 text-gray-700 w-full sm:w-auto"
          >
            <Play className="mr-2 h-4 w-4" /> Watch Demo
          </Button>
        </div>

        {/* Social proof */}
        <p className="text-sm text-gray-400">
          ✓ No credit card required &nbsp;&nbsp; ✓ Paid plans 7-day free trial &nbsp;&nbsp; ✓ Setup &lt;1 minute
        </p>
      </div>
    </section>
  )
}
