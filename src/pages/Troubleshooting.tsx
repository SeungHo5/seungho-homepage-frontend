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

    title: '실서버 전환 직후 OpenAPI 연계 장애',

    // 정확한 에러코드를 기억하지 못한다면
    // 억지로 만들어 넣지 않고 장애 유형을 적는다.
    errorCode: 'OpenAPI Error',

    errorMsg: '운영 전환 직후 OpenAPI 연계 요청 실패',

    env: '공공기관 우편 시스템 · G-Cloud 운영 환경',

    tags: [
      'OpenAPI',
      'Production',
      'Properties',
      'Log Analysis',
      'Troubleshooting',
    ],

    // 정확한 날짜를 기억하면 나중에 변경
    date: '2026.07',

    difficulty: 'HIGH',

    problem:
      'G-Cloud 실서버 전환 직후 운영 환경에서 OpenAPI 연계가 정상적으로 동작하지 않는 장애가 발생했습니다.',

    investigation:
      '운영 서버 로그를 확인하며 WEB/WAS와 애플리케이션, 연계 구간을 순차적으로 점검했습니다. 로그를 기준으로 원인 범위를 좁힌 결과 서버 자체 문제가 아니라 애플리케이션 properties 설정과 관련된 문제임을 확인했습니다.',

    cause:
      '운영 환경에 적용된 properties 설정값이 실제 연계 환경과 맞지 않아 OpenAPI 요청이 정상 처리되지 않았습니다.',

    solution:
      '문제가 된 properties 설정을 확인·수정한 뒤 서비스를 재확인했고 OpenAPI 연계가 정상적으로 동작하는 것을 확인했습니다.',

    comments: [],
  },
  {
    id: 'ts2',

    status: 'SOLVED',

    title: '알뜰폰 연계 SSLHandshake 오류',

    errorCode: 'SSLHandshakeException',

    errorMsg:
      'TLS Handshake Failed / Cipher Suite mismatch',

    env:
      'Java · TLS 1.2 · 외부 알뜰폰 연계',

    tags: [
      'TLS 1.2',
      'SSL',
      'Cipher Suite',
      'OpenSSL',
      'External API',
    ],

    // 정확한 날짜를 기억하면 나중에 변경
    date: '2026.07',

    difficulty: 'HIGH',

    problem:
      '외부 알뜰폰 시스템과 연계하는 과정에서 SSL Handshake 오류가 발생했습니다. 다른 외부 연계들은 정상적으로 통신하고 있었지만 특정 알뜰폰 연계에서만 TLS 연결이 정상적으로 성립하지 않았습니다.',

    investigation:
      '정상적으로 통신하는 다른 연계들과 해당 알뜰폰 연계의 TLS 설정을 비교했습니다. TLS 버전과 인증서뿐 아니라 Cipher Suite까지 확인하기 위해 OpenSSL과 curl 등을 이용해 서버가 지원하는 암호화 방식을 점검했습니다. 여러 연계가 동일한 Cipher Suite를 사용하고 있는 것과 달리 해당 연계만 다른 Cipher Suite를 사용하고 있다는 차이를 확인했습니다.',

    cause:
      '알뜰폰 연계 서버에서 사용하는 Cipher Suite가 다른 연계 시스템과 달랐고, Java 애플리케이션에서 사용 가능한 Cipher Suite와 일치하지 않아 TLS Handshake가 실패했습니다.',

    solution:
      '연계 서버에서 지원하는 Cipher Suite를 확인한 뒤 TLS 1.2 환경에서 ECDHE-RSA-AES256-GCM-SHA384를 사용할 수 있도록 설정을 조정했습니다. 이후 OpenSSL과 curl을 이용해 TLS 연결을 다시 확인하고 실제 연계 요청이 정상 처리되는 것을 검증했습니다.',

    comments: [],
  },
  {
    id: 'ts3',

    status: 'SOLVED',

    title: '간편인증 · 안면인증 KMC 전환 오류',

    // 실제 오류 로그를 나중에 찾으면 교체
    errorCode: 'KMC Integration Issue',

    errorMsg:
      '인증 모듈 전환 후 간편인증 및 안면인증 연계 오류',

    env:
      'Java 1.6 → Java 1.8 · Dream Security → KMC',

    tags: [
      'KMC',
      'Dream Security',
      'Java',
      'Authentication',
      'API Integration',
    ],

    date: '2026.07',

    difficulty: 'HIGH',

    problem:
      '기존 Dream Security 기반으로 동작하던 간편인증 및 안면인증 기능을 KMC 기반 인증 방식으로 전환하는 과정에서 인증 연계가 정상적으로 동작하지 않는 문제가 발생했습니다.',

    investigation:
      '기존 인증 모듈과 신규 KMC 연계 구조를 비교하고 Java 실행 환경, 인증 관련 라이브러리, 설정값 및 외부 연계 구간을 순차적으로 확인했습니다. 기존 Java 1.6 환경에서 사용하던 인증 방식을 Java 1.8 환경으로 전환하면서 변경된 부분을 중심으로 로그와 설정을 점검했습니다.',

    cause:
      '기존 Dream Security 인증 환경과 신규 KMC 인증 환경의 구성 및 Java 실행 환경 차이로 인해 기존 설정과 연계 방식 일부를 그대로 사용할 수 없었습니다.',

    solution:
      'Java 환경을 1.6에서 1.8로 전환하고 KMC 연계에 필요한 라이브러리와 설정을 적용했습니다. 이후 간편인증과 안면인증 각각의 요청 흐름을 확인하며 외부 연계 및 인증 결과를 검증해 정상 동작을 확인했습니다.',

    comments: [],
  },
  {
    id: 'ts4',

    status: 'SOLVED',

    title: '한글 Cookie 값으로 인한 WildFly 요청 처리 오류',

    errorCode: 'UT000173',

    errorMsg:
      'An invalid control character was present in the cookie value or attribute',

    env:
      'Java · JSP/Servlet · WildFly · Undertow',

    tags: [
      'WildFly',
      'Undertow',
      'Cookie',
      'HTTP',
      'Encoding',
    ],

    date: '2026.07',

    difficulty: 'MEDIUM',

    problem:
      '인증 관련 요청 처리 과정에서 WildFly/Undertow가 Cookie를 응답에 추가하는 단계에서 UT000173 오류를 발생시키며 이후 요청 흐름이 정상적으로 진행되지 않는 문제가 발생했습니다.',

    investigation:
      'Undertow 로그에서 Invalid control character 오류를 확인하고 Cookie 생성 부분을 추적했습니다. new Cookie()에 전달되는 값을 확인한 결과 Cookie 값에 한글이 그대로 포함되어 있었으며, 로그에 출력된 문자 코드 [50724]가 실제 한글 문자 "오"의 유니코드 값과 일치하는 것을 확인했습니다. 이후 response.addCookie() 단계에서 예외가 발생하면서 다음 처리 로직까지 진행되지 않는 흐름으로 원인을 좁혔습니다.',

    cause:
      'HTTP Cookie 값에 한글 문자열을 인코딩하지 않은 상태로 직접 저장하면서 Undertow의 Cookie 유효성 검사를 통과하지 못했습니다.',

    solution:
      'Cookie에 한글 값을 그대로 저장하지 않고 URL Encoding을 적용해 HTTP Cookie에서 사용할 수 있는 형태로 변환하도록 처리했습니다. Cookie 값을 다시 사용할 때는 디코딩하도록 구성해 한글 데이터를 유지하면서도 Undertow의 Cookie 검증 오류가 발생하지 않도록 했습니다.',

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
