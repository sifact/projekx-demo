import { useState } from 'react'
import type { Page } from '@/types'
import { getCurrentUser } from '@/utils/auth'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Clients from '@/components/Clients'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Newsletter from '@/components/Newsletter'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoginPage from '@/pages/LoginPage'
import SignUpPage from '@/pages/SignUpPage'
import DashboardPage from '@/pages/DashboardPage'

function App() {
  const [page, setPage] = useState<Page>(() =>
    getCurrentUser() ? 'dashboard' : 'landing'
  )

  const navigate = (to: Page) => setPage(to)

  if (page === 'login') return <LoginPage navigate={navigate} />
  if (page === 'signup') return <SignUpPage navigate={navigate} />
  if (page === 'dashboard') return <DashboardPage navigate={navigate} />

  return (
    <div className="min-h-screen">
      <Navbar onLogin={() => navigate('login')} />
      <Hero onLogin={() => navigate('login')} />
      <Features />
      <Clients />
      <Testimonials />
      <Pricing />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
