import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const SKILLS = [
  { cat: 'Backend', items: ['Java', 'Spring Boot', 'Spring JPA', 'Python', 'Node.js'] },
  { cat: 'Infrastructure', items: ['Linux', 'Docker', 'Docker Compose', 'Kubernetes', 'Jenkins'] },
  { cat: 'Database', items: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB'] },
  { cat: 'Monitoring', items: ['Grafana', 'Prometheus', 'ELK Stack', 'Loki'] },
  { cat: 'Network', items: ['Nginx', 'HAProxy', 'Reverse Proxy', 'SSL/TLS'] },
  { cat: 'Cloud & Tools', items: ['Git', 'GitHub Actions', 'Proxmox', 'Ansible'] },
]

const PROJECTS = [
  {
    title: 'Home Lab Server',
    desc: 'Proxmox 기반 홈 서버를 구축하고 Docker Compose로 각종 서비스를 운영합니다. Grafana로 모니터링, Nginx로 리버스 프록시를 구성했습니다.',
    tags: ['Proxmox', 'Docker', 'Nginx', 'Grafana', 'Linux'],
    status: 'RUNNING',
    image: 'https://images.unsplash.com/photo-1680992046626-418f7e910589?w=600&h=340&fit=crop&auto=format',
    year: '2026',
  },
  {
    title: 'CI/CD Pipeline 자동화',
    desc: 'Jenkins와 GitHub Webhook을 연동하여 Push 시 자동으로 빌드, 테스트, Docker 이미지 빌드 및 배포까지 이어지는 파이프라인을 구축했습니다.',
    tags: ['Jenkins', 'Docker', 'GitHub', 'Shell Script'],
    status: 'COMPLETE',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=340&fit=crop&auto=format',
    year: '2025',
  },
  {
    title: 'Spring Boot REST API',
    desc: 'Spring Boot + JPA 기반으로 RESTful API를 설계하고 구현했습니다. JWT 인증, N+1 문제 해결, 쿼리 최적화 등을 직접 적용했습니다.',
    tags: ['Spring Boot', 'JPA', 'MySQL', 'JWT', 'Java'],
    status: 'COMPLETE',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=340&fit=crop&auto=format',
    year: '2025',
  },
  {
    title: 'Kubernetes 클러스터 구축',
    desc: 'Raspberry Pi 4 3대로 k3s 클러스터를 구성하고, MetalLB, Ingress, Helm Chart 등을 사용하여 실제 서비스 배포 환경을 실험하고 있습니다.',
    tags: ['Kubernetes', 'k3s', 'Raspberry Pi', 'Helm', 'MetalLB'],
    status: 'IN PROGRESS',
    image: 'https://images.unsplash.com/photo-1680992044138-ce4864c2b962?w=600&h=340&fit=crop&auto=format',
    year: '2026',
  },
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'skills' | 'projects'>('about')
  const skillsRef = useScrollReveal()
  const projectsRef = useScrollReveal()

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Header */}
      <div
        className="portfolio-header"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '60px 24px 0',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#f59e0b', letterSpacing: '0.15em', marginBottom: '16px' }}>
            01 / PORTFOLIO
          </p>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 900,
              color: '#f4f4f5',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '40px',
            }}
          >
            오승호
          </h1>

          {/* Tabs */}
          <div className="portfolio-tabs" style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {(['about', 'experience', 'skills', 'projects'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #f59e0b' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '14px 24px',
                  flexShrink: 0,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '14px',
                  fontWeight: activeTab === tab ? 700 : 400,
                  color: activeTab === tab ? '#f59e0b' : 'rgba(244,244,245,0.45)',
                  textTransform: 'capitalize',
                  transition: 'color 0.2s, border-color 0.2s',
                  marginBottom: '-1px',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="portfolio-content" 
      style={{ maxWidth: '1280px', 
        margin: '0 auto'
        }}
        >
        {/* About */}
        {activeTab === 'about' && (
          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', flexWrap: 'wrap', marginBottom: '56px' }}>
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))',
                  border: '1px solid rgba(245,158,11,0.2)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                }}
              >
                👨‍💻
              </div>
              <div>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, color: '#f4f4f5', marginBottom: '8px' }}>
                  Oh Seungho
                </h2>
                <p style={{ fontSize: '15px', color: '#f59e0b', marginBottom: '16px', fontWeight: 500 }}>
                  Backend & Infrastructure Engineer
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(244,244,245,0.55)', lineHeight: 1.8 }}>
                  서버와 인프라에 관심이 많은 개발자입니다. 직접 서버를 구축하고, 문제를 분석하고 해결하며,
                  배운 내용을 기록하는 것을 좋아합니다. DevOps와 Backend 개발을 함께 공부하며
                  실무에 가까운 환경을 직접 만들어가고 있습니다.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              {[
                { label: 'Focus', value: 'Backend & Infra' },
                { label: 'Location', value: 'Seoul, Korea' },
                { label: 'Status', value: 'Studying & Building' },
                { label: 'Interest', value: 'DevOps, Kubernetes, AI' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    padding: '16px 20px',
                  }}
                >
                  <div style={{ fontSize: '11px', color: 'rgba(244,244,245,0.35)', marginBottom: '6px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>{item.label.toUpperCase()}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f4f4f5' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {activeTab === 'experience' && (
          <div style={{ maxWidth: '720px' }}>
            {[
              {
                role: '개인 프로젝트 & 학습',
                org: 'Web Lab (Self)',
                period: '2024.01 — Present',
                desc: '홈 서버 구축, CI/CD 파이프라인 자동화, Kubernetes 클러스터 구성 등 인프라 관련 프로젝트를 직접 설계하고 운영합니다. 문제가 생기면 분석하고 해결한 내용을 Troubleshooting 섹션에 기록합니다.',
                tags: ['Docker', 'Linux', 'Jenkins', 'Kubernetes', 'Spring Boot'],
              },
              {
                role: '백엔드 개발 공부',
                org: '컴퓨터공학 전공',
                period: '2022.03 — Present',
                desc: 'Java, Spring Boot, JPA를 중심으로 백엔드 개발을 학습했습니다. REST API 설계, 데이터베이스 최적화, 인증/인가 처리 등을 직접 프로젝트에 적용했습니다.',
                tags: ['Java', 'Spring Boot', 'JPA', 'MySQL', 'Git'],
              },
            ].map((exp, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '24px',
                  paddingBottom: '40px',
                  marginBottom: '40px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', marginTop: '6px' }} />
                  {i < 1 && <div style={{ width: '1px', flex: 1, background: 'rgba(255,255,255,0.07)', marginTop: '8px' }} />}
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'rgba(244,244,245,0.3)', marginBottom: '8px' }}>{exp.period}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f4f4f5', marginBottom: '4px' }}>{exp.role}</h3>
                  <p style={{ fontSize: '13px', color: '#f59e0b', marginBottom: '12px' }}>{exp.org}</p>
                  <p style={{ fontSize: '14px', color: 'rgba(244,244,245,0.55)', lineHeight: 1.75, marginBottom: '16px' }}>{exp.desc}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {exp.tags.map((t) => (
                      <span key={t} style={{ fontSize: '11px', color: 'rgba(244,244,245,0.5)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 9px', borderRadius: '5px', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {activeTab === 'skills' && (
          <div ref={skillsRef} className="scroll-reveal">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
              {SKILLS.map((group) => (
                <div
                  key={group.cat}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px',
                    padding: '24px',
                  }}
                >
                  <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#f59e0b', letterSpacing: '0.1em', marginBottom: '16px', fontWeight: 600 }}>
                    {group.cat.toUpperCase()}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {group.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontSize: '13px',
                          color: 'rgba(244,244,245,0.7)',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.09)',
                          padding: '5px 12px',
                          borderRadius: '7px',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {activeTab === 'projects' && (
          <div ref={projectsRef} className="scroll-reveal">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
              {PROJECTS.map((proj) => (
                <div
                  key={proj.title}
                  className="card-hover"
                  style={{
                    background: 'rgba(17,17,22,0.9)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      height: '200px',
                      backgroundImage: `url(${proj.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(17,17,22,0.95) 100%)' }} />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        color: proj.status === 'COMPLETE' ? '#22c55e' : proj.status === 'RUNNING' ? '#f59e0b' : '#60a5fa',
                        background: proj.status === 'COMPLETE' ? 'rgba(34,197,94,0.12)' : proj.status === 'RUNNING' ? 'rgba(245,158,11,0.12)' : 'rgba(96,165,250,0.12)',
                        padding: '4px 10px',
                        borderRadius: '5px',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {proj.status}
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f4f4f5', lineHeight: 1.3 }}>{proj.title}</h3>
                      <span style={{ fontSize: '11px', color: 'rgba(244,244,245,0.25)', fontFamily: "'JetBrains Mono', monospace", marginLeft: '12px', flexShrink: 0 }}>{proj.year}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'rgba(244,244,245,0.5)', lineHeight: 1.7, marginBottom: '16px' }}>{proj.desc}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {proj.tags.map((t) => (
                        <span key={t} style={{ fontSize: '10px', color: 'rgba(244,244,245,0.45)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '5px', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
