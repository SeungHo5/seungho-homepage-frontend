import { useState, useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Troubleshooting from './pages/Troubleshooting'
import Study from './pages/Study'
import Lab from './pages/Lab'
import Contact from './pages/Contact'

type Page = 'home' | 'portfolio' | 'blog' | 'troubleshooting' | 'study' | 'lab' | 'contact'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: "Web Lab — 오승호",
      portfolio: "Portfolio — Web Lab",
      blog: "Blog — Web Lab",
      troubleshooting: "Troubleshooting — Web Lab",
      study: "Study — Web Lab",
      lab: "Lab — Web Lab",
      contact: "Contact — Web Lab",
    }
    document.title = titles[page]
  }, [page])

  return (
    <AuthProvider>
    <div style={{ background: '#09090b', minHeight: '100vh' }}>
      <Navbar currentPage={page} onNavigate={navigate} />

      <main>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'portfolio' && <Portfolio />}
        {page === 'blog' && <Blog />}
        {page === 'troubleshooting' && <Troubleshooting />}
        {page === 'study' && <Study />}
        {page === 'lab' && <Lab />}
        {page === 'contact' && <Contact />}
      </main>

      {page !== 'home' && <Footer onNavigate={navigate} />}
    </div>
    </AuthProvider>
  )
}
