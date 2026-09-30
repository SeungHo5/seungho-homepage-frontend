// React Router의 Link를 사용하면
// App.tsx에서 onNavigate 함수를 props로 전달받지 않고도
// Footer에서 직접 원하는 URL로 이동할 수 있다.
import { Link } from 'react-router-dom'

// Blog / Study / Lab 같은 관리자 전용 메뉴를
// 로그인 상태에 따라 보여주기 위해 AuthContext를 사용한다.
import { useAuth } from '../context/AuthContext'

// Footer의 NAVIGATE 영역에서 사용할 메뉴 정보.
//
// path
// → 실제 이동할 URL
//
// adminOnly
// → true인 메뉴는 관리자 로그인 상태에서만 보여준다.

const FOOTER_NAV_ITEMS = [
  {
    path: '/portfolio',
    label: 'Portfolio',
    adminOnly: false,
  },
  {
    path: '/blog',
    label: 'Blog',
    adminOnly: true,
  },
  {
    path: '/troubleshooting',
    label: 'Troubleshooting',
    adminOnly: false,
  },
  { 
    path: '/study',
    label: 'Study',
    adminOnly: true,
  },
  {
    path: '/lab',
    label: 'Lab',
    adminOnly: true,
  },
  {
    path: '/contact',
    label: 'Contact',
    adminOnly: false,
  },
]

// 기존:
//
// interface FooterProps {
//   onNavigate: (page: Page) => void
// }
//
// export default function Footer({ onNavigate }: FooterProps)
//
// Router 적용 후에는 Footer가 직접 Link를 사용하기 때문에
// 더 이상 navigation props가 필요하지 않는다.

export default function Footer() {
  // 관리자 로그인 여부를 가져온다.
  //
  // isAdmin === true
  // → Blog / Study / Lab까지 Footer에 표시
  //
  // isAdmin === false
  // → 공개 메뉴만 표시
  const { isAdmin } = useAuth()

  // 공개 메뉴이거나 관리자 로그인 상태인 메뉴만 남긴다.
  //
  // 예:
  //
  // Blog
  // adminOnly === true
  //
  // 로그아웃:
  // false || false → false → 숨김
  //
  // 로그인:
  // false || true → true → 표시
  const visibleNavItems = FOOTER_NAV_ITEMS.filter(
    (item) => !item.adminOnly || isAdmin
  )


  return (
    <footer
      className = 'site-Footer'
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: '#09090b',
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
            {visibleNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
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
                onMouseEnter={(e) => ((e.currentTarget).style.color = '#f59e0b')}
                onMouseLeave={(e) => ((e.currentTarget).style.color = 'rgba(244,244,245,0.45)')}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#f59e0b', letterSpacing: '0.1em', marginBottom: '16px', fontFamily: "'JetBrains Mono', monospace" }}>
              CONNECT
            </p>
            {[
              { label: 'GitHub', href: 'https://github.com/SeungHo5' },
              { label: 'Email', href: 'mailto:osh4607@gmail.com' },
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
