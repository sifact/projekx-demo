import { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote: '"Engineering teams love the technical features — API integrations, custom workflows, and developer-friendly interface. It\'s built by people who understand software development."',
    name: 'David Kim',
    title: 'VP of Engineering at home services firm',
    avatar: '/customer-saying/testimonial-david-kim-B7ZksXMt.avif',
  },
  {
    quote: '"projekx handles our complex e-commerce operations flawlessly. From inventory management to customer delivery tracking, everything is synchronized in one place."',
    name: 'Li Zhang',
    title: 'Product Owner at retail store',
    avatar: '/customer-saying/Li.avif',
  },
  {
    quote: '"projekx transformed how our team collaborates. We shipped our last product 3 weeks ahead of schedule thanks to the intuitive workflow management."',
    name: 'Emma Carter',
    title: 'Head of Product at TechFlow',
    avatar: '/customer-saying/Emma.avif',
  },
  {
    quote: '"The reporting and analytics features have given us unprecedented visibility into project performance. Our stakeholders love the real-time dashboards."',
    name: 'Marcus Johnson',
    title: 'CTO at CloudScale Inc.',
    avatar: '/customer-saying/Marcu.avif',
  },
  {
    quote: '"Switching to projekx was the best decision we made this year. The entire team was up and running in under an hour and productivity doubled within the first week."',
    name: 'Ara Malik',
    title: 'Project Manager at FinTech Solutions',
    avatar: '/customer-saying/ara.avif',
  },
  {
    quote: '"The customer support is world-class. Every issue gets resolved fast and the team genuinely cares about your success. I recommend projekx to every founder I meet."',
    name: 'Sarah Lin',
    title: 'Founder & CEO at GrowthBase',
    avatar: '/customer-saying/Li.avif',
  },
  {
    quote: '"As someone managing 12+ client projects simultaneously, projekx finally gives me the clarity and control I need. The interface keeps me focused on what actually matters."',
    name: 'James Rivera',
    title: 'Senior Product Manager at ScaleUp Co.',
    avatar: '/customer-saying/testimonial-david-kim-B7ZksXMt.avif',
  },
]

const GAP = 24
const AUTO_INTERVAL = 4000

function getVisible() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth < 640) return 1
  if (window.innerWidth < 1024) return 2
  return 3
}

export default function Testimonials() {
  const [start, setStart] = useState(0)
  const [offset, setOffset] = useState(0)
  const [visible, setVisible] = useState(3)
  const wrapRef = useRef<HTMLDivElement>(null)
  const startRef = useRef(0)
  const visibleRef = useRef(3)
  const pausedRef = useRef(false)

  const slide = useCallback((idx: number, vis?: number) => {
    if (!wrapRef.current) return
    const v = vis ?? visibleRef.current
    const w = wrapRef.current.offsetWidth
    const cardW = (w - GAP * (v - 1)) / v
    setOffset(idx * (cardW + GAP))
    setStart(idx)
    startRef.current = idx
  }, [])

  // Init + resize: update visible count and recalculate
  useEffect(() => {
    const update = () => {
      const v = getVisible()
      visibleRef.current = v
      setVisible(v)
      const newMax = testimonials.length - v
      const clamped = Math.min(startRef.current, newMax)
      slide(clamped, v)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [slide])

  // Auto-play — uses refs so it never goes stale
  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return
      const currentMax = testimonials.length - visibleRef.current
      const next = startRef.current >= currentMax ? 0 : startRef.current + 1
      slide(next)
    }, AUTO_INTERVAL)
    return () => clearInterval(timer)
  }, [slide])

  const maxStart = testimonials.length - visible

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            What our customers{' '}
            <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              are saying
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-4">
            Don't just take our word for it. See what teams around the world are saying about projekx.
          </p>
        </div>

        <div
          className="flex items-center gap-2 sm:gap-4"
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {/* Prev */}
          <button
            onClick={() => slide(start === 0 ? maxStart : start - 1)}
            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Track */}
          <div ref={wrapRef} className="flex-1 overflow-hidden min-w-0">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ gap: `${GAP}px`, transform: `translateX(-${offset}px)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-slate-50 rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
                  style={{ width: `calc((100% - ${GAP * (visible - 1)}px) / ${visible})` }}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 sm:h-5 sm:w-5 fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{t.quote}</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-gray-900 truncate">{t.name}</div>
                      <div className="text-xs text-gray-400 truncate">{t.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => slide(start >= maxStart ? 0 : start + 1)}
            className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxStart + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => slide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === start ? 'bg-violet-600 w-6' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
