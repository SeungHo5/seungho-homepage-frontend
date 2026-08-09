import { useState } from 'react'

const CATEGORIES = ['All', 'Server', 'Docker', 'Kubernetes', 'Monitoring', 'CI/CD', 'AI']

const EXPERIMENTS = [
  {
    title: 'Home Server — Proxmox VE',
    category: 'Server',
    status: 'RUNNING',
    goal: 'Proxmox 기반 가상화 서버 구축 및 VM/LXC 운영',
    tags: ['Proxmox', 'Linux', 'Virtualization', 'KVM'],
    result: '4개 VM 운영 중. Debian 12 베이스로 각 서비스 격리 완료.',
    updated: '2026.07.30',
    image: 'https://images.unsplash.com/photo-1680992046626-418f7e910589?w=600&h=300&fit=crop&auto=format',
  },
  {
    title: 'Docker Compose 서비스 스택',
    category: 'Docker',
    status: 'RUNNING',
    goal: 'Nginx, Spring Boot, MySQL, Redis를 Docker Compose로 구성',
    tags: ['Docker', 'Compose', 'Nginx', 'Redis'],
    result: '전체 스택 docker-compose up 하나로 기동 가능. 환경 변수 외부 주입 완료.',
    updated: '2026.07.22',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&h=300&fit=crop&auto=format',
  },
  {
    title: 'Jenkins CI/CD Pipeline',
    category: 'CI/CD',
    status: 'COMPLETE',
    goal: 'GitHub Push → 자동 빌드 → Docker 이미지 빌드 → 서버 배포',
    tags: ['Jenkins', 'GitHub', 'Docker', 'Webhook'],
    result: 'Push 시 평균 3분 30초 내 배포 완료. Blue Ocean UI 연동.',
    updated: '2026.07.10',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=300&fit=crop&auto=format',
  },
  {
    title: 'k3s Kubernetes 클러스터',
    category: 'Kubernetes',
    status: 'IN PROGRESS',
    goal: 'Raspberry Pi 4 3대로 k3s 클러스터 구성 및 실서비스 배포',
    tags: ['k3s', 'Raspberry Pi', 'MetalLB', 'Helm', 'Ingress'],
    result: 'Master + Worker 2 구성 완료. MetalLB 로드밸런서 설정 중.',
    updated: '2026.07.31',
    image: 'https://images.unsplash.com/photo-1680992044138-ce4864c2b962?w=600&h=300&fit=crop&auto=format',
  },
  {
    title: 'Grafana + Prometheus 모니터링',
    category: 'Monitoring',
    status: 'RUNNING',
    goal: '서버 리소스 및 애플리케이션 메트릭 시각화 대시보드 구축',
    tags: ['Grafana', 'Prometheus', 'Node Exporter', 'Loki'],
    result: '서버 5대 메트릭 수집 중. 알림 규칙 10개 설정. Loki 로그 연동 완료.',
    updated: '2026.07.28',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format',
  },
  {
    title: 'Ollama Local AI Server',
    category: 'AI',
    status: 'EXPERIMENTING',
    goal: 'RTX 3060 장착 서버에서 Ollama로 로컬 LLM 운영',
    tags: ['Ollama', 'LLM', 'GPU', 'Llama3', 'Python'],
    result: 'Llama3 8B, Mistral 7B 모델 운영 중. Open WebUI 연동 완료. API 테스트 진행 중.',
    updated: '2026.07.25',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop&auto=format',
  },
]

const statusConfig: Record<string, { text: string; bg: string; dot: string }> = {
  RUNNING: { text: '#22c55e', bg: 'rgba(34,197,94,0.1)', dot: '#22c55e' },
  COMPLETE: { text: '#60a5fa', bg: 'rgba(96,165,250,0.1)', dot: '#60a5fa' },
  'IN PROGRESS': { text: '#f59e0b', bg: 'rgba(245,158,11,0.1)', dot: '#f59e0b' },
  EXPERIMENTING: { text: '#a78bfa', bg: 'rgba(167,139,250,0.1)', dot: '#a78bfa' },
}

export default function Lab() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = EXPERIMENTS.filter(
    (e) => activeCategory === 'All' || e.category === activeCategory
  )

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Hero header */}
      <div
        style={{
          position: 'relative',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(https://images.unsplash.com/photo-1680992046626-418f7e910589?w=1920&h=400&fit=crop&auto=format)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0.5) 100%)',
          }}
          aria-hidden="true"
        />
        <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 48px' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#f59e0b', letterSpacing: '0.15em', marginBottom: '16px' }}>
            06 / LAB
          </p>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: '#f4f4f5', letterSpacing: '-0.03em', marginBottom: '12px' }}>
            Infrastructure Lab
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(244,244,245,0.45)', maxWidth: '520px', lineHeight: 1.7, marginBottom: '32px' }}>
            직접 구축하고 실험하는 서버 · 인프라 · 개발 환경 실험실.
            Server, Linux, Docker, Kubernetes, Monitoring, AI를 다룹니다.
          </p>

          {/* Status summary */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {Object.entries(statusConfig).map(([status, cfg]) => {
              const count = EXPERIMENTS.filter((e) => e.status === status).length
              return (
                <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}` }} />
                  <span style={{ fontSize: '12px', color: 'rgba(244,244,245,0.5)', fontFamily: "'JetBrains Mono', monospace" }}>
                    {status} ({count})
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 16px',
                background: activeCategory === cat ? '#f59e0b' : 'rgba(255,255,255,0.04)',
                border: activeCategory === cat ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '100px',
                color: activeCategory === cat ? '#09090b' : 'rgba(244,244,245,0.55)',
                fontSize: '13px',
                fontWeight: activeCategory === cat ? 700 : 400,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Experiments grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filtered.map((exp, i) => {
            const sc = statusConfig[exp.status] || statusConfig.RUNNING
            return (
              <div
                key={i}
                className="card-hover"
                style={{
                  background: 'rgba(17,17,22,0.9)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: '160px',
                    backgroundImage: `url(${exp.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,17,22,0.2) 0%, rgba(17,17,22,0.9) 100%)' }} />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(9,9,11,0.7)',
                    border: `1px solid ${sc.dot}33`,
                    borderRadius: '6px',
                    padding: '4px 10px',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: sc.dot, boxShadow: `0 0 5px ${sc.dot}` }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: sc.text, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                      {exp.status}
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '10px',
                    color: '#f59e0b',
                    background: 'rgba(245,158,11,0.1)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {exp.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 24px 24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f4f4f5', marginBottom: '10px', lineHeight: 1.35 }}>
                    {exp.title}
                  </h3>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(244,244,245,0.3)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px', letterSpacing: '0.08em' }}>GOAL</div>
                    <p style={{ fontSize: '12.5px', color: 'rgba(244,244,245,0.55)', lineHeight: 1.6 }}>{exp.goal}</p>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(244,244,245,0.3)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px', letterSpacing: '0.08em' }}>RESULT</div>
                    <p style={{ fontSize: '12.5px', color: 'rgba(244,244,245,0.55)', lineHeight: 1.6 }}>{exp.result}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {exp.tags.map((t) => (
                      <span key={t} style={{
                        fontSize: '10px', color: 'rgba(244,244,245,0.4)',
                        background: 'rgba(255,255,255,0.05)', padding: '2px 7px', borderRadius: '4px',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontSize: '10px', color: 'rgba(244,244,245,0.2)', fontFamily: "'JetBrains Mono', monospace" }}>
                    Updated {exp.updated}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
