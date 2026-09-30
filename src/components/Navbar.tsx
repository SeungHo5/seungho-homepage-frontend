import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'


// Navbar에 표시할 메뉴 정보.
//
// 기존에는
// { id: 'portfolio', label: 'Portfolio' }
//
// 처럼 React state에서 사용할 id를 저장했지만,
// 이제는 Router를 사용하기 때문에 실제 URL(path)을 저장한다.
//
// adminOnly
// → true이면 관리자 로그인 상태에서만 메뉴에 표시

const NAV_ITEMS = [
  {
    path: '/',
    label: 'Home',
    adminOnly: false,
  },
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
  }
]

export default function Navbar() {
  
  // AuthContext에서 로그인 상태와 로그아웃 함수를 가져온다.
  //
  // isAdmin === true
  // → 관리자 로그인 상태
  //
  // isAdmin === false
  // → 로그아웃 상태

  const { isAdmin, logout } = useAuth()

  // 현재 브라우저 URL 정보를 가져온다.
  //
  // 예:
  // https://seungho.cloud/portfolio
  //
  // location.pathname
  // → "/portfolio"
  //
  // 기존 currentPage props의 역할을
  // 이제 Router의 URL 정보가 대신한다.
  const location = useLocation()
  
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  // 현재 로그인 상태에 따라 Navbar에 표시할 메뉴를 결정한다.
  //
  // 로그아웃 상태:
  //
  // Home
  // Portfolio
  // Troubleshooting
  // Contact
  //
  // 관리자 로그인 상태:
  //
  // Home
  // Portfolio
  // Blog
  // Troubleshooting
  // Study
  // Lab
  // Contact
  const visibleNavItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || isAdmin
  )


  // useEffect 훅을 사용하여 스크롤 이벤트를 감지하고 scrolled 상태를 업데이트
  // handler라는 함수를 만들고 scroll 이벤트가 발생할때마다 handler 함수가 실행
  // 현재 화면에서 스크롤 위치가 40px 이상이면 setScrolled(true), 그렇지 않으면 setScrolled(false)로 상태를 업데이트
  // passive: true는 스크롤 이벤트가 발생할 때 브라우저의 기본 동작을 차단하지 않도록 설정
  // useEffect에서 return은 cleanup 함수
  // cleanup 함수는 이 Effect가 끝낼 때 이 정리 작업을 수행하도록 설정 (보통 Navbar 컴포넌트가 사라질 때 이벤트 리스너를 제거)
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40)
    }
    
    window.addEventListener('scroll', handler, {
       passive: true ,
      })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    // React 컴포넌트에서는 최상위 요소는 하나여야 하기 때문에 Fragment를 사용하여 여러 요소를 그룹화
    // <>는 불필요한 DOM 요소를 추가하지 않고 여러 자식을 그룹화할 수 있음
    // </>는 Fragment의 닫는 태그
    <>
     {/* nav는 HTML5에서 내비게이션 링크를 나타내는 요소로, 웹사이트의 주요 탐색 메뉴를 담는 영역 */}
      <nav
          //중괄호가 두개인 이유는 JSX에서 JavaScript 표현식을 사용하기 위한 중괄호 하나와
          // style 속성에 객체를 전달하기 위한 중괄호 하나가 겹쳐져서 두개가 됨
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
        className="navbar-inner"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* ===================================
              Logo
              ===================================

              기존:
              button
                ↓
              onNavigate('home')

              변경:
              Link
                ↓
              to="/"

              로고 클릭 시 Home URL로 이동한다.
          */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{ width: '36px', height: '36px', border: '1.5px solid #f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 600, color: '#f59e0b' }}>
              {'</>'}
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '15px', color: '#f4f4f5', letterSpacing: '-0.01em' }}>
              SeungHo's Blog
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
            {/*
              visibleNavItems를 map으로 순회해서
              Navbar 메뉴들을 생성한다.
            */}
            {visibleNavItems.map((item) => {
              // 현재 브라우저의 URL 경로와 메뉴의 path를 비교한다.
              //
              // 예:
              // location.pathname === '/portfolio'
              // item.path === '/portfolio'
              //
              // 둘이 같으면 현재 활성화된 메뉴이므로 active는 true.
              const active = location.pathname === item.path
              
              return (
                // NavLink를 사용하여 해당 URL로 이동한다.
                // 페이지 전체를 새로고침하지 않고 React Router가 화면을 전환한다.
                <NavLink
                key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  style={{
                    position: 'relative',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 14px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '13.5px',
                    fontWeight: active ? 600 : 400,
                    // active가 true이면 '#f59e0b' 색상, false이면 'rgba(244,244,245,0.6)' 색상
                    color: active ? '#f59e0b' : 'rgba(244,244,245,0.6)',
                    letterSpacing: '0.01em',
                    transition: 'color 0.2s ease',
                  }}
                  // onMouseEnter 이벤트는 마우스가 버튼 위로 올라갔을 때 실행되는 이벤트로 e.currentTarget은 이벤트가 발생한 요소를 가리킴
                  // active가 false일 때만 색상을 변경하도록 조건부로 설정
                  onMouseEnter={(e) => { if (!active) {e.currentTarget.style.color = '#f4f4f5' }}}
                  onMouseLeave={(e) => { if (!active) {e.currentTarget.style.color = 'rgba(244,244,245,0.6)' }}}
                >
                  {item.label}

                  {active && (
                    <span style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  )}
                </NavLink>
              )
            })}
  
            {/* Auth button */}
            <div style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
              {/* isAdmin에 대한 삼항연산자로 isAdmin이 true이면 로그아웃 버튼을, false이면 로그인 버튼을 렌더링 */}
              {isAdmin ? ( 
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '100px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 5px #f59e0b' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>ADMIN</span>
                  </div>
                  <button
                  // logout은 useAuth()를 통해 AuthContext에서 가져온 함수.
                  // 로그아웃 버튼을 클릭하면 logout 함수가 호출되어 isAdmin 상태를 false로 변경
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
                //setShowLogin(true)는 showLogin 상태를 true로 변경하여 상태가 바뀌었으므로 Navbar 다시 렌더링
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
          <div className="mobile-menu" 
            style={{ background: 'rgba(9,9,11,0.97)',
            borderTop: '1px solid rgba(255,255,255,0.06)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '4px'
            }}
          >
            {visibleNavItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => { setMenuOpen(false) }}
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
                </NavLink>
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
       {/* showLogin 상태가 true일 때만 LoginModal 컴포넌트를 렌더링 
      onClose prop은 LoginModal 컴포넌트에서 로그인 모달을 닫을 때 호출되는 함수로, 
      setShowLogin(false)를 호출하여 showLogin 상태를 false로 변경
       */}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
