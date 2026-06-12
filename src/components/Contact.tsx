import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Users, Phone, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const contactInfo: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Mail, label: 'Email', value: 'hello@projekxhub.com' },
  { icon: Users, label: 'Partnerships', value: 'partners@projekxhub.com' },
  { icon: Phone, label: 'Phone', value: '+1 (315) 277-3691' },
  { icon: MapPin, label: 'Address', value: '57 Lexington Ave\nNew York, NY 10010' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <section id="contact" className="relative py-24 bg-[#0F1130] overflow-hidden">
      <style>{`
        @keyframes contact-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-18px); }
        }
        .contact-float {
          animation: contact-float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Left illustration */}
      <img
        src="/get-in-touch/2hPXe6Kg.avif"
        alt=""
        className="contact-float hidden xl:block absolute left-0 top-8 w-52 h-auto object-contain opacity-40 pointer-events-none"
      />

      {/* Right illustration */}
      <img
        src="/get-in-touch/dlGqhbjQ.avif"
        alt=""
        className="contact-float hidden xl:block absolute right-0 bottom-8 w-52 h-auto object-contain opacity-40 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 text-lg">
            Have questions or want to learn more? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8">Contact Information</h3>
            <div className="space-y-7">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-700/50 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-violet-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-0.5">{label}</div>
                    <div className="text-white text-sm whitespace-pre-line">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1a1d3a] rounded-2xl p-8">
            <h3 className="text-white font-bold text-xl mb-6">Send us a Message</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Name*</Label>
                  <Input
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={set('name')}
                    className="bg-[#252847] border-0 text-white placeholder:text-gray-600 rounded-lg focus-visible:ring-violet-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Email*</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={set('email')}
                    className="bg-[#252847] border-0 text-white placeholder:text-gray-600 rounded-lg focus-visible:ring-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Subject</Label>
                <Input
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={set('subject')}
                  className="bg-[#252847] border-0 text-white placeholder:text-gray-600 rounded-lg focus-visible:ring-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Message*</Label>
                <textarea
                  placeholder="Tell us more about your enquiry"
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  className="w-full bg-[#252847] border-0 text-white placeholder:text-gray-600 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <Button className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 text-white rounded-xl text-base font-semibold border-0">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
