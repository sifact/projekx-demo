import { ClipboardList, Calendar, Users, BarChart3, Bell, Sparkles, Smartphone, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  iconBg: string
  highlight?: boolean
}

const features: Feature[] = [
  {
    icon: ClipboardList,
    title: 'Drag-and-Drop Task Boards',
    description: "Organize workflows visually with customizable Kanban boards that adapt to your team's needs.",
    iconBg: 'bg-violet-600',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Create timelines, set due dates, and manage dependencies with intelligent planning tools.',
    iconBg: 'bg-blue-500',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Assign tasks, share files, and communicate in real-time with built-in messaging and comments.',
    iconBg: 'bg-green-500',
    highlight: true,
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Monitor project health with visual dashboards, analytics, and real-time status indicators.',
    iconBg: 'bg-red-500',
  },
  {
    icon: Bell,
    title: 'Automated Reminders',
    description: 'Never miss a deadline with intelligent notifications and smart alert systems.',
    iconBg: 'bg-orange-500',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Suggestions',
    description: 'Get smart task prioritization, time estimates, and productivity insights powered by AI.',
    iconBg: 'bg-violet-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile-Ready',
    description: 'Stay productive anywhere with responsive design and native mobile applications.',
    iconBg: 'bg-green-600',
  },
  {
    icon: Shield,
    title: 'Secure & Scalable',
    description: 'Enterprise-grade security with role-based permissions, encryption, and cloud backups.',
    iconBg: 'bg-purple-700',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Everything you need to manage projects{' '}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              like a pro
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            projekx combines powerful functionality with effortless simplicity. Get all the tools your team needs in one
            intuitive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className={`${feature.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`font-bold text-base mb-2 ${feature.highlight ? 'text-violet-600' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
