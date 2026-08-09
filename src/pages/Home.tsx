import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type Page = 'home' | 'portfolio' | 'blog' | 'troubleshooting' | 'study' | 'lab' | 'contact'

interface HomeProps {
  onNavigate: (page: Page) => void
}

const SECTIONS = [
  {
    id: 'portfolio',
    num: '01',
    title: 'Portfolio',
    subtitle: '경험 · 기술 · 프로젝트',
    desc: '제가 해온 경험과 기술 스택, 그리고 직접 구축한 프로젝트들을 정리한 공간입니다.',
    accent: 'Backend & Infrastructure Engineer로서의 여정을 기록합니다.',
    tags: ['Java', 'Spring Boot', 'Docker', 'Linux', 'MySQL'],
    preview: 'portfolio',
  },
  {
    id: 'blog',
    num: '02',
    title: 'Blog',
    subtitle: '공부 · 기록 · 정리',
    desc: '공부한 기술과 개념을 직접 정리하고 기록하는 기술 블로그입니다.',
    accent: '배움을 기록하면 지식이 됩니다.',
    tags: ['DevOps', 'Backend', 'Infrastructure', 'Study'],
    preview: 'blog',
  },
  {
    id: 'troubleshooting',
    num: '03',
    title: 'Troubleshooting',
    subtitle: '장애 · 분석 · 해결',
    desc: '실제 문제의 증상부터 원인 분석, 해결 과정까지 기록하는 Error 해결 데이터베이스입니다.',
    accent: '문제를 해결하며 더 깊이 이해합니다.',
    tags: ['Debug', 'Error Log', 'Root Cause', 'Solution'],
    preview: 'troubleshooting',
  },
  {
    id: 'lab',
    num: '04',
    title: 'Lab',
    subtitle: '구축 · 실험 · 운영',
    desc: 'Server, Linux, Docker, Kubernetes, Monitoring, AI 등을 직접 구축하고 실험하는 인프라 연구실입니다.',
    accent: '실제로 구축해야 비로소 배웁니다.',
    tags: ['Kubernetes', 'Jenkins', 'Grafana', 'Prometheus', 'Ollama'],
    preview: 'lab',
  },
]

function PreviewPortfolio() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f4f4f5', marginBottom: '4px' }}>Home Server Setup</div>
            <div style={{ fontSize: '12px', color: 'rgba(244,244,245,0.45)' }}>Proxmox + Docker Compose 기반 홈 서버 구축</div>
          </div>
          <div style={{ fontSize: '11px', color: '#f59e0b', background: 'rgba(245,158,11,0.12)', padding: '3px 8px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>RUNNING</div>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['Linux', 'Docker', 'Nginx'].map(t => (
            <span key={t} style={{ fontSize: '10px', color: 'rgba(244,244,245,0.5)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f4f4f5', marginBottom: '4px' }}>CI/CD Pipeline</div>
            <div style={{ fontSize: '12px', color: 'rgba(244,244,245,0.45)' }}>Jenkins + GitHub Webhook 자동 배포 시스템</div>
          </div>
          <div style={{ fontSize: '11px', color: '#22c55e', background: 'rgba(34,197,94,0.12)', padding: '3px 8px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>COMPLETE</div>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['Jenkins', 'Docker', 'GitHub'].map(t => (
            <span key={t} style={{ fontSize: '10px', color: 'rgba(244,244,245,0.5)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PreviewBlog() {
  const posts = [
    { title: 'Docker Compose로 개발 환경 구축하기', cat: 'DevOps', date: '2026.07.28' },
    { title: 'Spring Boot JPA N+1 문제 해결', cat: 'Backend', date: '2026.07.15' },
    { title: 'Nginx Reverse Proxy 완전 정복', cat: 'Infrastructure', date: '2026.07.02' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {posts.map((p, i) => (
        <div key={i} style={{
          padding: '16px 0',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 500, color: '#f4f4f5', marginBottom: '4px', lineHeight: 1.4 }}>{p.title}</div>
            <span style={{ fontSize: '11px', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '2px 7px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{p.cat}</span>
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(244,244,245,0.3)', whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>{p.date}</div>
        </div>
      ))}
    </div>
  )
}

function PreviewTroubleshooting() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { status: 'SOLVED', title: 'WildFly WAR Deployment Failed', code: 'WFLYWS0047', tags: ['WildFly', 'Java'] },
        { status: 'SOLVED', title: 'Jenkins Docker Build Permission', code: 'permission denied', tags: ['Jenkins', 'Docker'] },
        { status: 'IN PROGRESS', title: 'K8s Pod CrashLoopBackOff', code: 'OOMKilled', tags: ['Kubernetes'] },
      ].map((item, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderLeft: `2px solid ${item.status === 'SOLVED' ? '#22c55e' : item.status === 'IN PROGRESS' ? '#f59e0b' : '#ef4444'}`,
          borderRadius: '8px',
          padding: '14px 16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
              color: item.status === 'SOLVED' ? '#22c55e' : '#f59e0b',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {item.status}
            </span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f4f4f5', marginBottom: '4px' }}>{item.title}</div>
          <div style={{ fontSize: '11px', color: 'rgba(244,244,245,0.35)', fontFamily: "'JetBrains Mono', monospace" }}>{item.code}</div>
        </div>
      ))}
    </div>
  )
}

function PreviewLab() {
  const experiments = [
    { name: 'Grafana + Prometheus', status: 'RUNNING', tags: ['Monitoring'] },
    { name: 'Kubernetes (k3s)', status: 'EXPERIMENTING', tags: ['K8s', 'Raspberry Pi'] },
    { name: 'Local AI (Ollama)', status: 'RUNNING', tags: ['AI', 'GPU'] },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {experiments.map((e, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px',
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f4f4f5', marginBottom: '6px' }}>{e.name}</div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {e.tags.map(t => (
                <span key={t} style={{ fontSize: '10px', color: 'rgba(244,244,245,0.4)', background: 'rgba(255,255,255,0.05)', padding: '1px 6px', borderRadius: '3px', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em',
            color: e.status === 'RUNNING' ? '#22c55e' : '#f59e0b',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {e.status}
          </div>
        </div>
      ))}
    </div>
  )
}

function SectionPreview({ id }: { id: string }) {
  if (id === 'portfolio') return <PreviewPortfolio />
  if (id === 'blog') return <PreviewBlog />
  if (id === 'troubleshooting') return <PreviewTroubleshooting />
  return <PreviewLab />
}

export default function Home({ onNavigate }: HomeProps) {
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

  const revealRef0 = useScrollReveal()
  const revealRef1 = useScrollReveal()
  const revealRef2 = useScrollReveal()
  const revealRef3 = useScrollReveal()
  const revealRefs = [revealRef0, revealRef1, revealRef2, revealRef3]

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
              fontSize: 'clamp(40px, 7vw, 88px)',
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
            <button
              onClick={() => onNavigate('portfolio')}
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
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.background = '#fbbf24'
                b.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.background = '#f59e0b'
                b.style.transform = 'translateY(0)'
              }}
            >
              <span>📁</span> Portfolio 보기
            </button>
            <button
              onClick={() => onNavigate('blog')}
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
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.borderColor = 'rgba(244,244,245,0.55)'
                b.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.borderColor = 'rgba(244,244,245,0.25)'
                b.style.transform = 'translateY(0)'
              }}
            >
              <span>📝</span> Blog 보기
            </button>
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

                <button
                  onClick={() => onNavigate(section.id as Page)}
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
                  }}
                  onMouseEnter={(e) => {
                    const b = e.currentTarget as HTMLButtonElement
                    b.style.background = 'rgba(245,158,11,0.1)'
                    b.style.borderColor = '#f59e0b'
                  }}
                  onMouseLeave={(e) => {
                    const b = e.currentTarget as HTMLButtonElement
                    b.style.background = 'transparent'
                    b.style.borderColor = 'rgba(245,158,11,0.4)'
                  }}
                >
                  {section.title} 보기 →
                </button>
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
                      weblab.dev/{section.id}
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
          <button
            onClick={() => onNavigate('contact')}
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
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement
              b.style.background = '#fbbf24'
              b.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement
              b.style.background = '#f59e0b'
              b.style.transform = 'translateY(0)'
            }}
          >
            Contact 페이지로 →
          </button>
        </div>
      </section>
    </div>
  )
}
