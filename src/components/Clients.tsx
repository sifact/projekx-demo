const logos = [
  { src: '/trusted-team/amortales.png', alt: 'Amortales' },
  { src: '/trusted-team/TUB.png', alt: 'TUB' },
  { src: '/trusted-team/aylazoe.png', alt: 'Aylazoe' },
  { src: '/trusted-team/eateryfest.png', alt: 'EateryFest' },
  { src: '/trusted-team/geniusempire.png', alt: 'GeniusEmpire' },
  { src: '/trusted-team/rmg.png', alt: 'RMG' },
]

const stats = [
  { value: '10k+', label: 'Active Users' },
  { value: '1M+', label: 'Projects Completed' },
  { value: '99.9%', label: 'Uptime' },
]

export default function Clients() {
  return (
    <section id="clients" className="py-20 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-gray-400 text-sm tracking-wide mb-14">
          Trusted by innovative teams at companies of all sizes
        </p>
      </div>

      {/* Marquee strip */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {/* Original set */}
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-14 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo) => (
            <div
              key={`${logo.alt}-dup`}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-14 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black text-violet-600 mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
