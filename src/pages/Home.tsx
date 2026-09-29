import { useState, useEffect, useRef } from 'react'
// React Router의 Link를 사용하면
// App.tsx에서 navigate 함수를 props로 전달하지 않아도
// Home 컴포넌트가 직접 원하는 URL로 이동할 수 있다.
//
// 기존:
// onClick={() => onNavigate('portfolio')}
//
// 변경:
// <Link to="/portfolio">
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Home 화면에서 미리 보여줄 공개 페이지 정보.
//
// Blog / Study / Lab은 관리자 로그인 후에만 접근하도록 했기 때문에
// 공개 Home에서는 Portfolio와 Troubleshooting만 보여준다.
//
// path
// → React Router에서 이동할 실제 URL
//
// preview
// → 오른쪽 Preview 영역에서 어떤 컴포넌트를 보여줄지 구분하는 값
const SECTIONS = [
  {
    id: 'portfolio',
    path: '/portfolio',

    num: '01',

    title: 'Portfolio',

    subtitle: '경험 · 운영 · 구축',

    // 기존의 추상적인 설명 대신
    // 실제 업무와 개인 인프라 경험이 있다는 것을 바로 알 수 있게 수정
    desc:
      '공공기관 시스템 전환과 WEB/WAS 운영, 그리고 개인 인프라 구축 과정에서 직접 경험한 업무와 프로젝트를 정리했습니다.',

    accent:
      '운영 환경에서 직접 확인하고 해결한 경험을 기록합니다.',

    // 현재 실제 경험과 연결되는 기술 위주로 구성
    tags: [
      'Apache',
      'WildFly',
      'Linux',
      'Oracle',
      'Nginx',
      'Docker',
      'Jenkins',
    ],

  },

  {
    id: 'troubleshooting',
    path: '/troubleshooting',

    num: '02',

    title: 'Troubleshooting',

    subtitle: '장애 · 분석 · 해결',

    desc:
      '운영과 구축 과정에서 실제로 발생한 문제를 로그와 설정을 바탕으로 분석하고 해결한 과정을 정리했습니다.',

    accent:
      '증상만 처리하기보다 원인을 좁혀가는 과정을 중요하게 생각합니다.',

    tags: [
      'TLS',
      'WildFly',
      'Nginx',
      'Linux',
      'Log Analysis',
      'Root Cause',
    ],

  },
]

function PreviewPortfolio() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >

      {/* 실제 업무 경험 Preview */}
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#f4f4f5',
                marginBottom: '4px',
              }}
            >
              Public System G-Cloud Migration
            </div>

            <div
              style={{
                fontSize: '12px',
                color: 'rgba(244,244,245,0.45)',
              }}
            >
              WEB/WAS 전환 · 운영 검증 · 장애 대응
            </div>
          </div>

          {/* 단순 프로젝트가 아니라 실제 업무 경험임을 표시 */}
          <div
            style={{
              fontSize: '11px',
              color: '#22c55e',
              background: 'rgba(34,197,94,0.12)',
              padding: '3px 8px',
              borderRadius: '4px',
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: 'nowrap',
            }}
          >
            EXPERIENCE
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {['Apache', 'WildFly', 'Oracle', 'Linux'].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '10px',
                color: 'rgba(244,244,245,0.5)',
                background: 'rgba(255,255,255,0.06)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>


      {/* 현재 진행 중인 개인 인프라 구축 Preview */}
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#f4f4f5',
                marginBottom: '4px',
              }}
            >
              Personal Infrastructure
            </div>

            <div
              style={{
                fontSize: '12px',
                color: 'rgba(244,244,245,0.45)',
              }}
            >
              Nginx · HTTPS · Jenkins · Docker 기반 개인 서비스 구축
            </div>
          </div>

          {/* 아직 CI/CD 전체가 최종 완료된 상태가 아니므로
              COMPLETE가 아니라 BUILDING으로 표시 */}
          <div
            style={{
              fontSize: '11px',
              color: '#f59e0b',
              background: 'rgba(245,158,11,0.12)',
              padding: '3px 8px',
              borderRadius: '4px',
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: 'nowrap',
            }}
          >
            BUILDING
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          {['Nginx', 'HTTPS', 'Jenkins', 'Docker'].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '10px',
                color: 'rgba(244,244,245,0.5)',
                background: 'rgba(255,255,255,0.06)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

function PreviewTroubleshooting() {

  // 실제 운영/구축 과정에서 경험한 장애 사례를
  // Home Preview에서 간단하게 보여주기 위한 데이터.
  //
  // 자세한 원인과 해결 과정은
  // Troubleshooting 페이지에서 다룰 예정.
  const issues = [
    {
      status: 'SOLVED',
      title: 'TLS Handshake / CipherSuite',
      code: 'Unsupported CipherSuite',
    },
    {
      status: 'SOLVED',
      title: 'WildFly Request Parsing Error',
      code: 'UT000173 Invalid control character',
    },
    {
      status: 'SOLVED',
      title: 'Server Storage Exhaustion',
      code: 'No space left on device',
    },
  ]


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >

      {/* issues 배열의 장애 사례를 하나씩 화면에 출력 */}
      {issues.map((item) => (
        <div
          key={item.title}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderLeft: '2px solid #22c55e',
            borderRadius: '8px',
            padding: '14px 16px',
          }}
        >

          {/* 해결 여부 */}
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#22c55e',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '6px',
            }}
          >
            {item.status}
          </div>


          {/* 장애 제목 */}
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#f4f4f5',
              marginBottom: '4px',
            }}
          >
            {item.title}
          </div>


          {/* 실제 로그 또는 핵심 에러 메시지 */}
          <div
            style={{
              fontSize: '11px',
              color: 'rgba(244,244,245,0.35)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {item.code}
          </div>

        </div>
      ))}

    </div>
  )
}

// section.id 값에 따라 오른쪽에 표시할 Preview를 결정한다.
//
// 현재 SECTIONS에는 portfolio와 troubleshooting만 존재하지만,
// 예상하지 못한 id가 들어왔을 때 무조건 Troubleshooting을 보여주지 않고
// null을 반환하도록 명확하게 처리한다.
function SectionPreview({ id }: { id: string }) {
  if (id === 'portfolio') {
    return <PreviewPortfolio />
  }

  if (id === 'troubleshooting') {
    return <PreviewTroubleshooting />
  }

  return null
}


// 기존에는 App.tsx에서 onNavigate를 props로 전달받았지만
// React Router의 Link를 사용하므로 더 이상 props가 필요하지 않다.
export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [heroOpacity, setHeroOpacity] = useState(1)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setScrollY(y)
      const heroH = heroRef.current?.offsetHeight || window.innerHeight
      setHeroOpacity(Math.max(0, 1 - (y / heroH) * 1.6))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // 현재 Home에서 Scroll Reveal이 적용되는 SECTIONS는
  // Portfolio와 Troubleshooting 총 2개이므로 Ref도 2개만 필요하다.
  //
  // Hook은 반복문 안에서 호출할 수 없기 때문에
  // 각각 호출한 뒤 배열로 묶어 section의 idx와 연결한다.
  const revealRef0 = useScrollReveal()
  const revealRef1 = useScrollReveal()
  const revealRefs = [revealRef0, revealRef1,]

  return (
    <div style={{ background: '#09090b' }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* Parallax background */}
        <div
          style={{
            position: 'absolute',
            inset: '-15% 0',
            backgroundImage: `url(https://images.unsplash.com/photo-1759661990336-51bd4b951fea?w=1920&h=1080&fit=crop&auto=format)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            transform: `translateY(${scrollY * 0.38}px)`,
            willChange: 'transform',
          }}
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.7) 40%, rgba(9,9,11,0.92) 85%, #09090b 100%)',
          }}
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(245,158,11,0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: '960px',
            opacity: heroOpacity,
            transform: `translateY(${scrollY * 0.12}px)`,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '40px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 500,
              color: '#f59e0b',
              letterSpacing: '0.12em',
            }}
          >
            BUILD · LEARN · TROUBLESHOOT
          </div>

          {/* Main title */}
          <h1
            style={{
              fontFamily: "'Outfit', 'Noto Sans KR', sans-serif",
              fontSize: 'clamp(39px, 7vw, 88px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#f4f4f5',
              marginBottom: '28px',
              letterSpacing: '-0.02em',
            }}
          >
            안녕하세요,
            <br />
            오승호의{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Web Lab
            </span>
            입니다
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 19px)',
              color: 'rgba(244,244,245,0.6)',
              lineHeight: 1.7,
              marginBottom: '48px',
              fontFamily: "'Outfit', 'Noto Sans KR', sans-serif",
              fontWeight: 300,
              maxWidth: '600px',
              margin: '0 auto 48px',
            }}
          >
            서버와 인프라를 구축하고, 문제를 해결하며, 배운 내용을 기록합니다.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/portfolio"
              style={{
                padding: '14px 32px',
                background: '#f59e0b',
                color: '#09090b',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: '0.01em',
                transition: 'background 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                // Link는 기본적으로 <a> 태그처럼 동작하므로
                // 기본 밑줄을 제거해서 기존 버튼 디자인을 유지한다.
                justifyContent: 'center',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fbbf24'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f59e0b'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span>📁</span> Portfolio 보기
            </Link>
            {/* Blog는 로그인 후 Navbar에서 접근하도록 하고,
              공개 Home의 두 번째 CTA는 Troubleshooting으로 변경 */}
            <Link
              to="/troubleshooting"
              style={{
                padding: '14px 32px',
                background: 'transparent',
                color: '#f4f4f5',
                border: '1px solid rgba(244,244,245,0.25)',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                transition: 'border-color 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  'rgba(244,244,245,0.55)'

                e.currentTarget.style.transform =
                  'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  'rgba(244,244,245,0.25)'

                e.currentTarget.style.transform =
                  'translateY(0)'
              }}
            >
              <span>🔧</span> Troubleshooting 보기

            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: Math.max(0, 1 - scrollY / 200),
          }}
        >
          <div
            style={{
              width: '26px',
              height: '40px',
              border: '1.5px solid rgba(244,244,245,0.3)',
              borderRadius: '13px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '3px',
                height: '8px',
                background: '#f59e0b',
                borderRadius: '2px',
                animation: 'scrollBounce 1.8s ease-in-out infinite',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '10px',
              color: 'rgba(244,244,245,0.35)',
              letterSpacing: '0.12em',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            SCROLL
          </span>
        </div>

        <style>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(10px); opacity: 0.3; }
          }
        `}</style>
      </section>

      {/* ── Quick intro cards ─────────────────────────────── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { icon: '🔧', label: 'Build', sub: '서버와 인프라를 설계하고 구축합니다.' },
            { icon: '📚', label: 'Learn', sub: '새로운 기술을 학습하고 기록합니다.' },
            { icon: '🔍', label: 'Troubleshoot', sub: '문제를 분석하고 해결하며 성장합니다.' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <span style={{ fontSize: '28px' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#f4f4f5', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'rgba(244,244,245,0.4)', lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section previews ─────────────────────────────── */}
      {SECTIONS.map((section, idx) => {
        const isEven = idx % 2 === 0
        return (
          <section
            key={section.id}
            style={{
              padding: 'clamp(64px, 8vw, 120px) 24px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              maxWidth: '1280px',
              margin: '0 auto',
            }}
          >
            <div
              ref={revealRefs[idx]}
              className="scroll-reveal"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(40px, 6vw, 100px)',
                alignItems: 'center',
                direction: isEven ? 'ltr' : 'rtl',
              }}
            >
              {/* Text side */}
              <div style={{ direction: 'ltr' }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: '#f59e0b',
                    letterSpacing: '0.15em',
                    marginBottom: '16px',
                    fontWeight: 600,
                  }}
                >
                  {section.num} / {section.subtitle}
                </div>

                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(36px, 5vw, 60px)',
                    fontWeight: 900,
                    color: '#f4f4f5',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    marginBottom: '24px',
                  }}
                >
                  {section.title}
                </h2>

                <p
                  style={{
                    fontSize: '15px',
                    color: 'rgba(244,244,245,0.55)',
                    lineHeight: 1.75,
                    marginBottom: '12px',
                    maxWidth: '440px',
                  }}
                >
                  {section.desc}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#f59e0b',
                    marginBottom: '32px',
                    fontStyle: 'italic',
                    opacity: 0.8,
                  }}
                >
                  {section.accent}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        color: 'rgba(244,244,245,0.5)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={section.path}
                  style={{
                    padding: '12px 28px',
                    background: 'transparent',
                    border: '1px solid rgba(245,158,11,0.4)',
                    color: '#f59e0b',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Outfit', sans-serif",
                    transition: 'background 0.2s, border-color 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      'rgba(245,158,11,0.1)'

                    e.currentTarget.style.borderColor =
                      '#f59e0b'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      'transparent'

                    e.currentTarget.style.borderColor =
                      'rgba(245,158,11,0.4)'
                  }}
                >
                  {section.title} 보기 →
                </Link>
              </div>

              {/* Preview side */}
              <div style={{ direction: 'ltr' }}>
                <div
                  style={{
                    background: 'rgba(17,17,22,0.8)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    padding: '24px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '20px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#22c55e',
                          opacity: 0.6,
                        }}
                      />
                    ))}
                    <div
                      style={{
                        marginLeft: '8px',
                        fontSize: '11px',
                        color: 'rgba(244,244,245,0.2)',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      seungho.cloud{section.path}
                    </div>
                  </div>
                  <SectionPreview id={section.id} />
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA banner ──────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 140px) 24px',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, transparent 50%)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#f59e0b',
              letterSpacing: '0.15em',
              marginBottom: '24px',
            }}
          >
            CONTACT
          </p>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 900,
              color: '#f4f4f5',
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}
          >
            함께 만들거나,{' '}
            <span style={{ color: '#f59e0b' }}>연락</span>해주세요.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(244,244,245,0.5)', marginBottom: '40px', lineHeight: 1.7 }}>
            프로젝트 협업, 기술 질문, 또는 그냥 안녕이라도 — 언제든 환영합니다.
          </p>
          <Link
            to="/contact"
            style={{
              padding: '16px 40px',
              background: '#f59e0b',
              color: '#09090b',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              transition: 'background 0.2s, transform 0.2s',
              // Link는 실제로 <a> 태그로 렌더링되므로
              // 브라우저의 기본 밑줄을 제거하고 기존 버튼 형태를 유지한다.
              textDecoration: 'none',

              // Link가 버튼처럼 내부 글자를 정렬할 수 있도록 설정
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget
              b.style.background = '#fbbf24'
              b.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget
              b.style.background = '#f59e0b'
              b.style.transform = 'translateY(0)'
            }}
          >
            Contact 페이지로 →
          </Link>
        </div>
      </section>
    </div>
  )
}
