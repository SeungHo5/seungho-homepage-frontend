import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'

type Page = 'home' | 'portfolio' | 'blog' | 'troubleshooting' | 'study' | 'lab' | 'contact'

// NAV_ITEMS는 네비게이션 바에 표시될 메뉴 항목들을 정의한 배열
// 각 항목은 id와 label을 가지며, id는 Page 타입으로 제한되어 있음
// label은 화면에 표시될 텍스트를 나타냄
const NAV_ITEMS: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'blog', label: 'Blog' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'study', label: 'Study' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
]

// interface는 이 객체는 어떤 모양으로 생겨야 하는지 정해주는 설계도
// NavbarProps라는 객체는 currentPage라는 Page 타입과 onNavigate라는 함수 타입을 가지고
// onNavigate 함수는 Page 타입의 인자를 받아서 반환하는 값은 없음
interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

// App.tsx에서 Navbar 컴포넌트를 호출할 때 currentPage와 onNavigate를 props로 전달
// interface NavbarProps를 사용하여 props의 타입을 정의
export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  // useAuth 훅을 사용하여 인증 관련 상태(isAdmin, logout)를 가져옴
  // useState 훅을 사용하여 scrolled, menuOpen, showLogin 상태를 관리
  const { isAdmin, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  // useEffect 훅을 사용하여 스크롤 이벤트를 감지하고 scrolled 상태를 업데이트
  // handler라는 함수를 만들고 scroll 이벤트가 발생할때마다 handler 함수가 실행
  // 현재 화면에서 스크롤 위치가 40px 이상이면 setScrolled(true), 그렇지 않으면 setScrolled(false)로 상태를 업데이트
  // passive: true는 스크롤 이벤트가 발생할 때 브라우저의 기본 동작을 차단하지 않도록 설정
  // useEffect에서 return은 cleanup 함수
  // cleanup 함수는 이 Effect가 끝낼 때 이 정리 작업을 수행하도록 설정 (보통 Navbar 컴포넌트가 사라질 때 이벤트 리스너를 제거)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
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
              SeungHo's Blog
            </span>
          </button>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
            {/* map은 배열의 값을 하나씩 꺼내서 새로운 형태로 만들어주는 함수
              NAV_ITEMS 배열의 각 항목을 순회하면서 새로운 버튼 요소를 생성
              순회 하는 값들은 item이라는 변수에 담기고, item.id와 item.label을 사용하여 버튼의 key와 텍스트 설정
            */}
            {NAV_ITEMS.map((item) => {
              // active는 현재 페이지가 item.id와 일치하는지 여부를 나타내는 boolean 값
              // 만약 현재 페이지가 item.id와 일치하면 active는 true, 그렇지 않으면 false
              const active = currentPage === item.id
              
              return (
                // 버튼 요소를 생성하고, 클릭 시 onNavigate 함수를 호출하여 페이지를 변경
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
                    // active가 true이면 '#f59e0b' 색상, false이면 'rgba(244,244,245,0.6)' 색상
                    color: active ? '#f59e0b' : 'rgba(244,244,245,0.6)',
                    letterSpacing: '0.01em',
                    transition: 'color 0.2s ease',
                  }}
                  // onMouseEnter 이벤트는 마우스가 버튼 위로 올라갔을 때 실행되는 이벤트로 e.currentTarget은 이벤트가 발생한 요소를 가리킴
                  // active가 false일 때만 색상을 변경하도록 조건부로 설정
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
       {/* showLogin 상태가 true일 때만 LoginModal 컴포넌트를 렌더링 
      onClose prop은 LoginModal 컴포넌트에서 로그인 모달을 닫을 때 호출되는 함수로, 
      setShowLogin(false)를 호출하여 showLogin 상태를 false로 변경
       */}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}
