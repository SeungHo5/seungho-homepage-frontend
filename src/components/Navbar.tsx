import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'

type Page = 'home' | 'portfolio' | 'blog' | 'troubleshooting' | 'study' | 'lab' | 'contact'

const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'blog', label: 'Blog' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'study', label: 'Study' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
]

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { isAdmin, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled ? 'rgba(9,9,11,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{ width: '36px', height: '36px', border: '1.5px solid #f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 600, color: '#f59e0b' }}>
              {'</>'}
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '15px', color: '#f4f4f5', letterSpacing: '-0.01em' }}>
              Web Lab
            </span>
          </button>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
            {NAV_ITEMS.map((item) => {
              const active = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{
                    position: 'relative',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 14px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '13.5px',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#f59e0b' : 'rgba(244,244,245,0.6)',
                    letterSpacing: '0.01em',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = '#f4f4f5' }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(244,244,245,0.6)' }}
                >
                  {item.label}
                  {active && (
                    <span style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  )}
                </button>
              )
            })}

            {/* Auth button */}
            <div style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
              {isAdmin ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '100px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 5px #f59e0b' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>ADMIN</span>
                  </div>
                  <button
                    onClick={logout}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '7px',
                      padding: '5px 12px',
                      color: 'rgba(244,244,245,0.4)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif",
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = '#f4f4f5'; b.style.borderColor = 'rgba(255,255,255,0.25)' }}
                    onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = 'rgba(244,244,245,0.4)'; b.style.borderColor = 'rgba(255,255,255,0.1)' }}
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '7px 16px',
                    color: 'rgba(244,244,245,0.55)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif",
                    transition: 'color 0.2s, border-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = '#f4f4f5'; b.style.borderColor = 'rgba(255,255,255,0.3)' }}
                  onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = 'rgba(244,244,245,0.55)'; b.style.borderColor = 'rgba(255,255,255,0.12)' }}
                >
                  <span style={{ fontSize: '14px' }}>🔐</span> 로그인
                </button>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#f4f4f5' }}
          >
            <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ height: '1.5px', background: menuOpen ? '#f59e0b' : '#f4f4f5', transition: 'transform 0.2s, background 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none', display: 'block' }} />
              <span style={{ height: '1.5px', background: '#f4f4f5', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s', display: 'block' }} />
              <span style={{ height: '1.5px', background: menuOpen ? '#f59e0b' : '#f4f4f5', transition: 'transform 0.2s, background 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none', display: 'block' }} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'rgba(9,9,11,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map((item) => {
              const active = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMenuOpen(false) }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: '12px 0',
                    fontFamily: "'Outfit', sans-serif", fontSize: '16px',
                    fontWeight: active ? 700 : 400,
                    color: active ? '#f59e0b' : 'rgba(244,244,245,0.7)',
                    textAlign: 'left',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {item.label}
                </button>
              )
            })}
            <div style={{ paddingTop: '12px' }}>
              {isAdmin ? (
                <button onClick={() => { logout(); setMenuOpen(false) }} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 20px', color: 'rgba(244,244,245,0.5)', fontSize: '14px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>
                  로그아웃
                </button>
              ) : (
                <button onClick={() => { setShowLogin(true); setMenuOpen(false) }} style={{ background: 'none', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', padding: '10px 20px', color: '#f59e0b', fontSize: '14px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>
                  🔐 관리자 로그인
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
