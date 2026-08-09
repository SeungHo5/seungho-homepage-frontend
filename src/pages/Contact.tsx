export default function Contact() {
  return (
    <div style={{ background: '#09090b', minHeight: '100vh', paddingTop: '64px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
        <div style={{ maxWidth: '680px', width: '100%', textAlign: 'center' }}>
          {/* Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '100px',
            padding: '6px 18px',
            marginBottom: '40px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#f59e0b',
            letterSpacing: '0.12em',
          }}>
            07 / CONTACT
          </div>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 900,
            color: '#f4f4f5',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '24px',
          }}>
            연락해주세요
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 2vw, 17px)',
            color: 'rgba(244,244,245,0.5)',
            lineHeight: 1.8,
            marginBottom: '56px',
            maxWidth: '480px',
            margin: '0 auto 56px',
          }}>
            프로젝트 협업, 기술 질문, 또는 단순한 안부 인사도 환영합니다.
            GitHub이나 이메일로 편하게 연락주세요.
          </p>

          {/* Contact cards */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
            {[
              {
                icon: '🐙',
                label: 'GitHub',
                value: 'github.com/ohseungho',
                href: 'https://github.com',
                color: '#f4f4f5',
              },
              {
                icon: '✉️',
                label: 'Email',
                value: 'oh@weblab.dev',
                href: 'mailto:oh@weblab.dev',
                color: '#f59e0b',
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  padding: '20px 28px',
                  textDecoration: 'none',
                  minWidth: '240px',
                  transition: 'border-color 0.2s, transform 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement
                  a.style.borderColor = 'rgba(245,158,11,0.3)'
                  a.style.transform = 'translateY(-3px)'
                  a.style.background = 'rgba(245,158,11,0.04)'
                }}
                onMouseLeave={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement
                  a.style.borderColor = 'rgba(255,255,255,0.08)'
                  a.style.transform = 'translateY(0)'
                  a.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <span style={{ fontSize: '28px' }}>{link.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(244,244,245,0.35)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px', letterSpacing: '0.08em' }}>
                    {link.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: link.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {link.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              color: 'rgba(244,244,245,0.2)',
              letterSpacing: '0.08em',
            }}>
              Build. Learn. Troubleshoot.
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'rgba(244,244,245,0.12)', marginTop: '8px' }}>
              © 2026 Oh Seungho — Web Lab
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        style={{
          height: '200px',
          background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(245,158,11,0.04), transparent)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
