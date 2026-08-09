import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

interface LoginModalProps {
  onClose: () => void
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '9px',
  color: '#f4f4f5',
  fontSize: '14px',
  fontFamily: "'Outfit', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login } = useAuth()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const idRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    idRef.current?.focus()
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = login(id.trim(), pw)
    if (ok) {
      onClose()
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      setShake(true)
      setPw('')
      setTimeout(() => setShake(false), 500)
    }
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.style.borderColor = 'rgba(245,158,11,0.55)'
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      />

      {/* Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '400px',
          background: '#111116',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '36px',
          animation: shake ? 'shake 0.45s ease' : 'slideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            20%      { transform: translateX(-8px); }
            40%      { transform: translateX(8px); }
            60%      { transform: translateX(-5px); }
            80%      { transform: translateX(5px); }
          }
        `}</style>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            border: '1.5px solid #f59e0b',
            borderRadius: '10px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            fontWeight: 700,
            color: '#f59e0b',
            marginBottom: '16px',
          }}>
            {'</>'}
          </div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 800, color: '#f4f4f5', marginBottom: '6px' }}>
            관리자 로그인
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(244,244,245,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>
            Web Lab Admin
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: 'rgba(244,244,245,0.4)', letterSpacing: '0.1em', marginBottom: '7px', fontFamily: "'JetBrains Mono', monospace" }}>
              ID
            </label>
            <input
              ref={idRef}
              type="text"
              placeholder="admin"
              value={id}
              onChange={(e) => { setId(e.target.value); setError('') }}
              style={INPUT_STYLE}
              onFocus={onFocus}
              onBlur={onBlur}
              autoComplete="username"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: 'rgba(244,244,245,0.4)', letterSpacing: '0.1em', marginBottom: '7px', fontFamily: "'JetBrains Mono', monospace" }}>
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••••"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError('') }}
              style={INPUT_STYLE}
              onFocus={onFocus}
              onBlur={onBlur}
              autoComplete="current-password"
            />
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '8px',
              fontSize: '12.5px',
              color: '#f87171',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '9px',
                color: 'rgba(244,244,245,0.45)',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              취소
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '12px',
                background: '#f59e0b',
                border: 'none',
                borderRadius: '9px',
                color: '#09090b',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#fbbf24')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#f59e0b')}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
