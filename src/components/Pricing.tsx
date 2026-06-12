import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    priceSuffix: 'forever',
    priceClass: 'text-violet-600',
    description: 'Perfect for individuals getting started with project management',
    features: [
      '1 active project',
      'Unlimited tasks & subtasks',
      'Basic team collaboration (up to 3 team members)',
      'Task deadlines & reminders',
      'Kanban board view',
      'Basic file attachments (max 1MB per file)',
      'Email support',
    ],
    cta: 'Start Free',
    ctaClass: 'border-violet-400 text-violet-600 hover:bg-violet-50',
    ctaVariant: 'outline' as const,
    highlighted: false,
  },
  {
    name: 'Standard',
    price: '$9.99',
    priceSuffix: '/ per user/month',
    priceAlt: '$99.99 / per user/annual.',
    priceSave: 'Save 16.6%',
    priceClass: 'text-gray-900',
    description: 'Perfect for solopreneurs or small teams, getting started with project management',
    features: [
      'Unlimited projects & team members',
      'Advanced views (Timeline/Gantt, Calendar, List)',
      'Priority task management & dependencies',
      'Recurring tasks & automation rules',
      'Advanced file storage (max 25MB per file)',
      'Custom fields & tags for tasks',
      'Integrations (Slack, Google Drive, Dropbox, Zapier)',
      'Advanced reporting & analytics',
      'Priority customer support',
    ],
    cta: 'Start Free',
    ctaClass: 'bg-violet-600 hover:bg-violet-700 text-white',
    ctaVariant: 'default' as const,
    highlighted: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceSuffix: '- pricing',
    priceClass: 'text-violet-600',
    description: 'For large organizations that need full customization, advanced security, and dedicated support',
    features: [
      'Everything in Standard, plus:',
      'Custom onboarding & dedicated account manager',
      'Single Sign-On (SSO) & role-based permission',
      'Advanced data security & compliance (SOC 2, GDPR, HIPAA-ready)',
      'Unlimited file storage (max 1GB per file)',
      'Private cloud or on-premise deployment options',
      'API access with increased rate limits',
      'Quarterly strategy & optimization sessions',
      '24/7 phone, chat & priority support',
    ],
    cta: 'Contact Sales',
    ctaClass: 'border-violet-400 text-violet-600 hover:bg-violet-50',
    ctaVariant: 'outline' as const,
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-white overflow-hidden">
      <style>{`
        @keyframes pricing-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-18px); }
        }
        .pricing-float {
          animation: pricing-float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Left illustration */}
      <img
        src="/pricing-img/12.avif"
        alt=""
        className="pricing-float hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 w-56 h-auto object-contain opacity-40 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">pricing</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Choose the plan that fits your team. Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col gap-5 ${
                plan.highlighted
                  ? 'border-2 border-violet-500 shadow-xl shadow-violet-100'
                  : 'border border-gray-200'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-5 py-1.5 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className={`text-4xl font-black ${plan.priceClass}`}>{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.priceSuffix}</span>
                </div>
                {'priceAlt' in plan && plan.priceAlt && (
                  <div className="text-sm text-gray-400 mt-1.5">
                    <span>{plan.priceAlt}</span>{' '}
                    <span className="text-blue-500 font-semibold">{plan.priceSave}</span>
                  </div>
                )}
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.ctaVariant} className={`w-full h-12 text-base rounded-xl mt-2 ${plan.ctaClass}`}>
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
