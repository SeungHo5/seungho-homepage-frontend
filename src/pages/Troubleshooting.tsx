import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CommentSection, { type Comment } from '../components/CommentSection'

type Status = 'SOLVED' | 'IN PROGRESS' | 'INVESTIGATING'
type Difficulty = 'LOW' | 'MEDIUM' | 'HIGH'

interface Case {
  id: string
  status: Status
  title: string
  errorCode: string
  errorMsg: string
  env: string
  tags: string[]
  date: string
  difficulty: Difficulty
  problem?: string
  investigation?: string
  cause?: string
  solution?: string
  comments: Comment[]
}

const INITIAL_CASES: Case[] = [
  {
    id: 'ts1',
    status: 'SOLVED',
    title: 'WildFly WAR Deployment Failed',
    errorCode: 'WFLYWS0047',
    errorMsg: 'Duplicate URL Pattern in web.xml',
    env: 'WildFly 27, Java 11, CentOS 7',
    tags: ['WildFly', 'Java', 'WebService', 'Deployment'],
    date: '2026.07.20',
    difficulty: 'MEDIUM',
    problem: 'WAR 배포 후 WildFly 서버에서 WFLYWS0047 에러와 함께 배포 실패.',
    investigation: 'standalone/log/server.log 에서 Duplicate URL Pattern 확인. web.xml 내 /webservice 경로 중복 발견.',
    cause: 'web.xml에 동일한 url-pattern이 두 개 선언되어 있었음. 리팩토링 과정에서 복붙 실수.',
    solution: 'web.xml에서 중복된 <servlet-mapping> 블록 제거 후 mvn package → WildFly 재배포 성공.',
    comments: [{ id: 2, author: '이서버', content: '저도 똑같은 문제 있었는데 이렇게 해결했군요. 감사합니다!', date: '2026-07-21T09:14:00Z' }],
  },
  {
    id: 'ts2',
    status: 'SOLVED',
    title: 'Jenkins Pipeline Docker Build Permission Denied',
    errorCode: 'permission denied',
    errorMsg: '/var/run/docker.sock: connect: permission denied',
    env: 'Jenkins 2.440, Docker 25.0, Ubuntu 22.04',
    tags: ['Jenkins', 'Docker', 'Permission', 'CI/CD'],
    date: '2026.07.08',
    difficulty: 'LOW',
    problem: 'Jenkins Pipeline에서 docker build 실행 시 permission denied 에러 발생.',
    investigation: 'jenkins 유저가 docker 그룹에 속해 있지 않음 확인. id jenkins 명령으로 groups 확인.',
    cause: 'Jenkins 설치 후 docker 그룹에 jenkins 유저를 추가하지 않았음.',
    solution: 'sudo usermod -aG docker jenkins && sudo systemctl restart jenkins. 이후 빌드 성공.',
    comments: [],
  },
  {
    id: 'ts3',
    status: 'SOLVED',
    title: 'Spring Boot Hikari Connection Pool Timeout',
    errorCode: 'HikariPool-1',
    errorMsg: 'Connection is not available, request timed out after 30000ms',
    env: 'Spring Boot 3.1, MySQL 8.0, Docker Compose',
    tags: ['Spring Boot', 'MySQL', 'HikariCP', 'Connection Pool'],
    date: '2026.06.25',
    difficulty: 'MEDIUM',
    problem: 'Docker Compose로 Spring Boot 앱 기동 시 MySQL 연결 타임아웃 발생.',
    investigation: 'MySQL 컨테이너가 healthy 상태가 되기 전에 Spring 앱이 먼저 실행되어 연결 시도. healthcheck 미설정 확인.',
    cause: 'docker-compose.yml에 MySQL healthcheck 및 depends_on condition 미설정.',
    solution: 'docker-compose.yml에 healthcheck 추가, depends_on에 condition: service_healthy 적용.',
    comments: [],
  },
  {
    id: 'ts4',
    status: 'IN PROGRESS',
    title: 'Kubernetes Pod CrashLoopBackOff',
    errorCode: 'OOMKilled',
    errorMsg: 'Pod OOMKilled — container exceeded memory limit',
    env: 'k3s 1.28, Raspberry Pi 4 (4GB), Helm 3.12',
    tags: ['Kubernetes', 'k3s', 'OOM', 'Memory'],
    date: '2026.07.29',
    difficulty: 'HIGH',
    problem: 'k3s 클러스터에서 Spring Boot Pod가 OOMKilled로 CrashLoopBackOff 반복.',
    investigation: 'kubectl top pod 및 describe pod으로 메모리 사용량 확인. limits: memory: 256Mi로 설정되어 있으나 Spring JVM 기본 Heap이 512MB 이상 요구.',
    cause: '메모리 limit이 JVM 기본 heap 크기보다 작음. JVM 옵션 미조정.',
    solution: '',
    comments: [],
  },
  {
    id: 'ts5',
    status: 'SOLVED',
    title: 'Nginx 502 Bad Gateway After Docker Restart',
    errorCode: '502 Bad Gateway',
    errorMsg: 'connect() failed (111: Connection refused) while connecting to upstream',
    env: 'Nginx 1.24, Docker Compose, Ubuntu 22.04',
    tags: ['Nginx', 'Docker', 'Proxy', 'Network'],
    date: '2026.06.14',
    difficulty: 'LOW',
    problem: 'Docker Compose 재시작 후 Nginx가 502 에러 반환.',
    investigation: 'upstream으로 지정된 컨테이너명이 Docker 재시작 후 IP가 변경되었으나 Nginx가 캐싱된 DNS로 연결 시도.',
    cause: 'Docker 재시작 시 컨테이너 IP 변경. Nginx upstream에 IP 대신 컨테이너명 사용 필요.',
    solution: 'nginx.conf의 upstream을 컨테이너명(spring-app:8080)으로 변경. Docker 내부 DNS 활용.',
    comments: [],
  },
  {
    id: 'ts6',
    status: 'INVESTIGATING',
    title: 'Grafana Dashboard Data Gap',
    errorCode: 'No data',
    errorMsg: 'Prometheus scrape target down after network reconfiguration',
    env: 'Grafana 10.2, Prometheus 2.47, Node Exporter',
    tags: ['Grafana', 'Prometheus', 'Monitoring'],
    date: '2026.07.31',
    difficulty: 'MEDIUM',
    problem: '네트워크 재설정 후 Grafana 대시보드에 일부 지표가 "No data" 표시.',
    investigation: 'Prometheus Targets 페이지에서 해당 Node Exporter가 DOWN 상태. 네트워크 서브넷 변경으로 prometheus.yml의 targets IP가 잘못된 것으로 추정.',
    cause: '',
    solution: '',
    comments: [],
  },
]

const statusColor: Record<Status, { text: string; bg: string; border: string }> = {
  SOLVED: { text: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: '#22c55e' },
  'IN PROGRESS': { text: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: '#f59e0b' },
  INVESTIGATING: { text: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: '#60a5fa' },
}

const difficultyColor: Record<Difficulty, string> = {
  LOW: '#22c55e',
  MEDIUM: '#f59e0b',
  HIGH: '#ef4444',
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#f4f4f5',
  fontSize: '13px',
  fontFamily: "'JetBrains Mono', monospace",
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '10px',
  fontWeight: 700,
  color: 'rgba(244,244,245,0.4)',
  letterSpacing: '0.1em',
  marginBottom: '7px',
  fontFamily: "'JetBrains Mono', monospace",
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function Troubleshooting() {
  const { isAdmin } = useAuth()
  const [cases, setCases] = useState<Case[]>(INITIAL_CASES)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'ALL' | Status>('ALL')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  // editor state
  const [newTitle, setNewTitle] = useState('')
  const [newErrorCode, setNewErrorCode] = useState('')
  const [newErrorMsg, setNewErrorMsg] = useState('')
  const [newEnv, setNewEnv] = useState('')
  const [newTags, setNewTags] = useState('')
  const [newStatus, setNewStatus] = useState<Status>('INVESTIGATING')
  const [newDifficulty, setNewDifficulty] = useState<Difficulty>('MEDIUM')
  const [newProblem, setNewProblem] = useState('')
  const [newInvestigation, setNewInvestigation] = useState('')
  const [newCause, setNewCause] = useState('')
  const [newSolution, setNewSolution] = useState('')

  const filtered = cases.filter((c) => {
    const matchFilter = filter === 'ALL' || c.status === filter
    const matchSearch =
      search === '' ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.errorCode.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchFilter && matchSearch
  })

  function handleAddComment(caseId: string, comment: Comment) {
    setCases((prev) => prev.map((c) => c.id === caseId ? { ...c, comments: [...c.comments, comment] } : c))
  }

  function handleSubmit() {
    if (!newTitle.trim() || !newErrorCode.trim()) return
    const newCase: Case = {
      id: `ts${Date.now()}`,
      status: newStatus,
      title: newTitle.trim(),
      errorCode: newErrorCode.trim(),
      errorMsg: newErrorMsg.trim(),
      env: newEnv.trim(),
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      date: todayStr(),
      difficulty: newDifficulty,
      problem: newProblem.trim(),
      investigation: newInvestigation.trim(),
      cause: newCause.trim(),
      solution: newSolution.trim(),
      comments: [],
    }
    setCases([newCase, ...cases])
    setNewTitle(''); setNewErrorCode(''); setNewErrorMsg(''); setNewEnv('')
    setNewTags(''); setNewProblem(''); setNewInvestigation(''); setNewCause(''); setNewSolution('')
    setNewStatus('INVESTIGATING'); setNewDifficulty('MEDIUM')
    setShowEditor(false)
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = 'rgba(245,158,11,0.5)'
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
  }

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Header */}
      <div 
      className = "troubleshooting-Header"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)'        
      }}
      >
        <div 
        className = "troubleshooting-Content"
        style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#f59e0b', letterSpacing: '0.15em', marginBottom: '16px' }}>
            03 / TROUBLESHOOTING
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '12px' }}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(30px, 5vw, 64px)', fontWeight: 900, color: '#f4f4f5', letterSpacing: '-0.03em', margin: 0 }}>
              Troubleshooting
            </h1>
            {isAdmin && <button
              onClick={() => setShowEditor(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'transparent',
                border: '1px solid rgba(245,158,11,0.4)',
                borderRadius: '10px',
                color: '#f59e0b',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.background = 'rgba(245,158,11,0.08)'
                b.style.borderColor = '#f59e0b'
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.background = 'transparent'
                b.style.borderColor = 'rgba(245,158,11,0.4)'
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>+</span> 케이스 추가
            </button>}
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(244,244,245,0.4)', marginBottom: '32px' }}>
            장애 분석 기록 · 운영 트러블슈팅 · Error 해결 데이터베이스
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { label: 'Total', value: cases.length, color: '#f4f4f5' },
              { label: 'Solved', value: cases.filter((c) => c.status === 'SOLVED').length, color: '#22c55e' },
              { label: 'In Progress', value: cases.filter((c) => c.status === 'IN PROGRESS').length, color: '#f59e0b' },
              { label: 'Investigating', value: cases.filter((c) => c.status === 'INVESTIGATING').length, color: '#60a5fa' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: s.color, fontFamily: "'Outfit', sans-serif" }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: 'rgba(244,244,245,0.35)', fontFamily: "'JetBrains Mono', monospace", marginTop: '2px' }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '560px' }}>
            <input
              type="text"
              placeholder="Error Code, 키워드, 기술로 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...INPUT_STYLE, paddingLeft: '44px', fontSize: '14px', fontFamily: "'Outfit', sans-serif" }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', opacity: 0.4 }}>🔍</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {(['ALL', 'SOLVED', 'IN PROGRESS', 'INVESTIGATING'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 16px',
                background: filter === f ? (f === 'ALL' ? 'rgba(244,244,245,0.1)' : statusColor[f as Status]?.bg) : 'transparent',
                border: `1px solid ${filter === f ? (f === 'ALL' ? 'rgba(244,244,245,0.3)' : statusColor[f as Status]?.border) : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '6px',
                color: filter === f ? (f === 'ALL' ? '#f4f4f5' : statusColor[f as Status]?.text) : 'rgba(244,244,245,0.4)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'all 0.2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cases */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((c) => {
            const sc = statusColor[c.status]
            const isExpanded = expanded === c.id
            return (
              <div
                key={c.id}
                style={{
                  background: 'rgba(17,17,22,0.8)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: `3px solid ${sc.border}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '20px 24px', cursor: 'pointer' }} onClick={() => setExpanded(isExpanded ? null : c.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: sc.text, background: sc.bg, padding: '3px 9px', borderRadius: '5px', fontFamily: "'JetBrains Mono', monospace", border: `1px solid ${sc.border}22` }}>
                          {c.status}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', color: difficultyColor[c.difficulty], fontFamily: "'JetBrains Mono', monospace" }}>
                          {c.difficulty}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f4f4f5', marginBottom: '6px', lineHeight: 1.3 }}>{c.title}</h3>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: sc.text, background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '5px', display: 'inline-block', marginBottom: '10px' }}>
                        {c.errorCode}
                      </div>
                      <p style={{ fontSize: '12px', color: 'rgba(244,244,245,0.35)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '12px' }}>{c.errorMsg}</p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {c.tags.map((t) => (
                          <span key={t} style={{ fontSize: '10px', color: 'rgba(244,244,245,0.4)', background: 'rgba(255,255,255,0.05)', padding: '2px 7px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: '11px', color: 'rgba(244,244,245,0.25)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '8px' }}>{c.date}</p>
                      <span style={{ fontSize: '14px', opacity: 0.4, display: 'block', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'none' }}>↓</span>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px', marginBottom: '20px' }}>
                      {[
                        { label: '01 PROBLEM', val: c.problem },
                        { label: '02 ENVIRONMENT', val: c.env },
                        { label: '03 INVESTIGATION', val: c.investigation },
                        { label: '04 CAUSE', val: c.cause },
                        { label: '05 SOLUTION', val: c.solution },
                      ].map((step) => (
                        <div key={step.label} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#f59e0b', marginBottom: '6px', fontWeight: 600 }}>{step.label}</div>
                          <div style={{ fontSize: '12px', color: step.val ? 'rgba(244,244,245,0.55)' : 'rgba(244,244,245,0.18)', lineHeight: 1.6, fontStyle: step.val ? 'normal' : 'italic' }}>
                            {step.val || '기록 중...'}
                          </div>
                        </div>
                      ))}
                    </div>

                    {(c.solution || c.investigation) && (
                      <div style={{ background: '#0a0e14', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#4ade80', lineHeight: 1.7, marginBottom: '20px' }}>
                        <span style={{ color: 'rgba(244,244,245,0.3)', marginRight: '8px' }}>$</span>
                        {c.solution || c.investigation}
                      </div>
                    )}

                    <CommentSection
                      postId={c.id}
                      comments={c.comments}
                      onAddComment={handleAddComment}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Write modal ───────────────────────────────── */}
      {showEditor && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }} onClick={() => setShowEditor(false)} />
          <div style={{
            position: 'relative', zIndex: 1, width: '100%', maxWidth: '800px',
            maxHeight: '100vh', overflowY: 'auto',
            background: '#0e0e13', border: '1px solid rgba(255,255,255,0.1)',
            borderTop: 'none', borderRadius: '0 0 20px 20px',
            padding: '32px 36px 40px', marginTop: '64px',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#f59e0b', letterSpacing: '0.12em', marginBottom: '6px' }}>NEW CASE</p>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 800, color: '#f4f4f5', margin: 0 }}>트러블슈팅 케이스 추가</h2>
              </div>
              <button onClick={() => setShowEditor(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: 'rgba(244,244,245,0.5)', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Title */}
              <div>
                <label style={LABEL_STYLE}>TITLE *</label>
                <input type="text" placeholder="문제 제목 (예: Nginx 502 Bad Gateway)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ ...INPUT_STYLE, fontSize: '14px', fontFamily: "'Outfit', sans-serif" }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Error code + msg */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px' }}>
                <div>
                  <label style={LABEL_STYLE}>ERROR CODE *</label>
                  <input type="text" placeholder="WFLYWS0047" value={newErrorCode} onChange={(e) => setNewErrorCode(e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>ERROR MESSAGE</label>
                  <input type="text" placeholder="Duplicate URL Pattern..." value={newErrorMsg} onChange={(e) => setNewErrorMsg(e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Status + Difficulty + Tags */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '14px' }}>
                <div>
                  <label style={LABEL_STYLE}>STATUS</label>
                  <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as Status)} style={{ ...INPUT_STYLE, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="INVESTIGATING" style={{ background: '#0e0e13' }}>INVESTIGATING</option>
                    <option value="IN PROGRESS" style={{ background: '#0e0e13' }}>IN PROGRESS</option>
                    <option value="SOLVED" style={{ background: '#0e0e13' }}>SOLVED</option>
                  </select>
                </div>
                <div>
                  <label style={LABEL_STYLE}>DIFFICULTY</label>
                  <select value={newDifficulty} onChange={(e) => setNewDifficulty(e.target.value as Difficulty)} style={{ ...INPUT_STYLE, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="LOW" style={{ background: '#0e0e13' }}>LOW</option>
                    <option value="MEDIUM" style={{ background: '#0e0e13' }}>MEDIUM</option>
                    <option value="HIGH" style={{ background: '#0e0e13' }}>HIGH</option>
                  </select>
                </div>
                <div>
                  <label style={LABEL_STYLE}>TAGS (쉼표로 구분)</label>
                  <input type="text" placeholder="Docker, Jenkins, Linux" value={newTags} onChange={(e) => setNewTags(e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Environment */}
              <div>
                <label style={LABEL_STYLE}>ENVIRONMENT</label>
                <input type="text" placeholder="Jenkins 2.440, Docker 25.0, Ubuntu 22.04" value={newEnv} onChange={(e) => setNewEnv(e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '4px' }}>
                <p style={{ fontSize: '11px', color: 'rgba(244,244,245,0.3)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '16px' }}>// 분석 기록 (선택 입력)</p>
              </div>

              {/* Problem */}
              <div>
                <label style={LABEL_STYLE}>01 PROBLEM — 증상 및 발생 맥락</label>
                <textarea placeholder="어떤 증상이 발생했는지, 언제 발생했는지 기록합니다." value={newProblem} onChange={(e) => setNewProblem(e.target.value)} rows={3} style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7 }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Investigation */}
              <div>
                <label style={LABEL_STYLE}>03 INVESTIGATION — 로그 분석 및 원인 추적</label>
                <textarea placeholder="로그, 명령어 출력, 시도한 방법들을 기록합니다." value={newInvestigation} onChange={(e) => setNewInvestigation(e.target.value)} rows={4} style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7 }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              {/* Cause + Solution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={LABEL_STYLE}>04 CAUSE — 근본 원인</label>
                  <textarea placeholder="왜 이 문제가 발생했는지 원인을 기록합니다." value={newCause} onChange={(e) => setNewCause(e.target.value)} rows={4} style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7 }} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>05 SOLUTION — 해결 방법</label>
                  <textarea placeholder="어떻게 해결했는지 단계별로 기록합니다." value={newSolution} onChange={(e) => setNewSolution(e.target.value)} rows={4} style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7 }} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button onClick={() => setShowEditor(false)} style={{ padding: '11px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px', color: 'rgba(244,244,245,0.5)', fontSize: '14px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>
                  취소
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!newTitle.trim() || !newErrorCode.trim()}
                  style={{
                    padding: '11px 28px',
                    background: (newTitle.trim() && newErrorCode.trim()) ? '#f59e0b' : 'rgba(245,158,11,0.3)',
                    border: 'none', borderRadius: '9px',
                    color: (newTitle.trim() && newErrorCode.trim()) ? '#09090b' : 'rgba(9,9,11,0.5)',
                    fontSize: '14px', fontWeight: 700,
                    cursor: (newTitle.trim() && newErrorCode.trim()) ? 'pointer' : 'not-allowed',
                    fontFamily: "'Outfit', sans-serif", transition: 'background 0.2s',
                  }}
                >
                  케이스 등록 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
