type Page = 'home' | 'portfolio' | 'blog' | 'troubleshooting' | 'study' | 'lab' | 'contact'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: '#09090b',
        padding: '48px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '1.5px solid #f59e0b',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#f59e0b',
                }}
              >
                {'</>'}
              </div>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#f4f4f5',
                }}
              >
                Web Lab
              </span>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(244,244,245,0.4)',
                lineHeight: 1.6,
                maxWidth: '220px',
              }}
            >
              오승호의 개인 Web Lab.<br />
              서버와 인프라를 구축하고,<br />
              문제를 해결하며 성장합니다.
            </p>
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#f59e0b', letterSpacing: '0.1em', marginBottom: '16px', fontFamily: "'JetBrains Mono', monospace" }}>
              NAVIGATE
            </p>
            {(['portfolio', 'blog', 'troubleshooting', 'study', 'lab', 'contact'] as Page[]).map((p) => (
              <button
                key={p}
                onClick={() => onNavigate(p)}
                style={{
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  fontSize: '13px',
                  color: 'rgba(244,244,245,0.45)',
                  textTransform: 'capitalize',
                  fontFamily: "'Outfit', sans-serif",
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#f59e0b')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(244,244,245,0.45)')}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#f59e0b', letterSpacing: '0.1em', marginBottom: '16px', fontFamily: "'JetBrains Mono', monospace" }}>
              CONNECT
            </p>
            {[
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'Email', href: 'mailto:oh@weblab.dev' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: 'block',
                  padding: '4px 0',
                  fontSize: '13px',
                  color: 'rgba(244,244,245,0.45)',
                  textDecoration: 'none',
                  fontFamily: "'Outfit', sans-serif",
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#f59e0b')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(244,244,245,0.45)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '12px', color: 'rgba(244,244,245,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>
            © 2026 Oh Seungho. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(244,244,245,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>
            Build. Learn. Troubleshoot.
          </p>
        </div>
      </div>
    </footer>
  )
}
