import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface VocabCard {
  term: string
  def: string
}

interface FlashCard {
  front: string
  back: string
}

interface QuizItem {
  question: string
  options: string[]
  answer: number
}

const INITIAL_VOCAB: VocabCard[] = [
  { term: 'Idempotent', def: '같은 연산을 여러 번 수행해도 결과가 동일한 성질. HTTP PUT, DELETE는 idempotent하다.' },
  { term: 'Ingress', def: 'Kubernetes에서 외부 트래픽을 클러스터 내부 서비스로 라우팅하는 리소스.' },
  { term: 'Rolling Update', def: '새 버전을 순차적으로 배포하면서 서비스 중단 없이 업데이트하는 배포 전략.' },
  { term: 'Circuit Breaker', def: '외부 서비스 호출 실패가 연속될 때 자동으로 차단하여 시스템 전체를 보호하는 패턴.' },
]

const INITIAL_FLASHCARDS: FlashCard[] = [
  { front: 'Pod', back: 'Kubernetes에서 배포의 최소 단위. 하나 이상의 컨테이너를 포함하며 동일한 네트워크 네임스페이스를 공유.' },
  { front: 'ReplicaSet', back: '지정된 수의 Pod 복제본이 항상 실행되도록 보장하는 Kubernetes 리소스.' },
  { front: 'ConfigMap', back: '컨테이너에 환경 변수나 설정 파일을 주입하기 위한 Kubernetes 오브젝트. 민감 정보는 Secret 사용.' },
]

const INITIAL_QUIZ: QuizItem[] = [
  {
    question: 'Kubernetes에서 클러스터 외부 트래픽을 내부 Service로 라우팅하는 리소스는?',
    options: ['Service', 'Ingress', 'ConfigMap', 'Deployment'],
    answer: 1,
  },
  {
    question: 'Docker에서 컨테이너 간 네트워크를 설정할 때 사용하는 명령어는?',
    options: ['docker network create', 'docker connect', 'docker bridge', 'docker link'],
    answer: 0,
  },
]

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#f4f4f5',
  fontSize: '14px',
  fontFamily: "'Outfit', 'Noto Sans KR', sans-serif",
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

type ActiveTool = 'vocabulary' | 'flashcard' | 'quiz' | null

export default function Study() {
  const { isAdmin } = useAuth()
  const [activeTool, setActiveTool] = useState<ActiveTool>(null)
  const [showEditor, setShowEditor] = useState(false)

  // Vocab state
  const [vocabCards, setVocabCards] = useState<VocabCard[]>(INITIAL_VOCAB)
  const [flippedVocab, setFlippedVocab] = useState<number | null>(null)
  const [newTerm, setNewTerm] = useState('')
  const [newDef, setNewDef] = useState('')

  // Flashcard state
  const [flashCards, setFlashCards] = useState<FlashCard[]>(INITIAL_FLASHCARDS)
  const [flashIndex, setFlashIndex] = useState(0)
  const [flashFlipped, setFlashFlipped] = useState(false)
  const [newFront, setNewFront] = useState('')
  const [newBack, setNewBack] = useState('')

  // Quiz state
  const [quizItems, setQuizItems] = useState<QuizItem[]>(INITIAL_QUIZ)
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [newQuestion, setNewQuestion] = useState('')
  const [newOptions, setNewOptions] = useState(['', '', '', ''])
  const [newAnswer, setNewAnswer] = useState(0)

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = 'rgba(245,158,11,0.5)'
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
  }

  function handleAddVocab() {
    if (!newTerm.trim() || !newDef.trim()) return
    setVocabCards([{ term: newTerm.trim(), def: newDef.trim() }, ...vocabCards])
    setNewTerm(''); setNewDef('')
    setShowEditor(false)
  }

  function handleAddFlash() {
    if (!newFront.trim() || !newBack.trim()) return
    setFlashCards([...flashCards, { front: newFront.trim(), back: newBack.trim() }])
    setNewFront(''); setNewBack('')
    setShowEditor(false)
  }

  function handleAddQuiz() {
    if (!newQuestion.trim() || newOptions.some((o) => !o.trim())) return
    setQuizItems([...quizItems, { question: newQuestion.trim(), options: newOptions.map((o) => o.trim()), answer: newAnswer }])
    setNewQuestion(''); setNewOptions(['', '', '', '']); setNewAnswer(0)
    setShowEditor(false)
  }

  function getEditorTitle() {
    if (activeTool === 'vocabulary') return { tag: 'VOCABULARY', title: '단어 추가', action: handleAddVocab, valid: !!(newTerm.trim() && newDef.trim()) }
    if (activeTool === 'flashcard') return { tag: 'FLASH CARD', title: '카드 추가', action: handleAddFlash, valid: !!(newFront.trim() && newBack.trim()) }
    return { tag: 'QUIZ', title: '퀴즈 추가', action: handleAddQuiz, valid: !!(newQuestion.trim() && newOptions.every((o) => o.trim())) }
  }

  const TOOLS = [
    { id: 'vocabulary' as ActiveTool, icon: '📖', title: 'Vocabulary', desc: '기술 용어, 영단어를 카드 형태로 학습합니다.', tags: ['Flash Card', 'IT Terms'], status: 'AVAILABLE', color: '#f59e0b', count: vocabCards.length + ' terms' },
    { id: 'flashcard' as ActiveTool, icon: '🃏', title: 'Flash Card', desc: '개념을 질문-답변 카드 형태로 반복 학습합니다.', tags: ['Active Recall'], status: 'AVAILABLE', color: '#a78bfa', count: flashCards.length + ' cards' },
    { id: 'quiz' as ActiveTool, icon: '🎲', title: 'Random Quiz', desc: '등록한 개념들을 랜덤으로 퀴즈 형태로 테스트합니다.', tags: ['Multiple Choice'], status: 'AVAILABLE', color: '#34d399', count: quizItems.length + ' questions' },
    { id: null, icon: '📄', title: 'PDF Study Sheet', desc: 'PDF를 업로드하고 핵심 내용을 정리하여 학습 자료를 만듭니다.', tags: ['PDF', 'Notes'], status: 'COMING SOON', color: '#60a5fa', count: '' },
    { id: null, icon: '⏱️', title: 'Pomodoro Timer', desc: '포모도로 기법으로 집중 학습 세션을 관리합니다.', tags: ['Focus'], status: 'COMING SOON', color: '#f87171', count: '' },
    { id: null, icon: '📊', title: 'Study Stats', desc: '학습 기록과 통계를 시각화합니다.', tags: ['Analytics'], status: 'PLANNED', color: '#fb923c', count: '' },
  ]

  const editorInfo = activeTool && activeTool !== null ? getEditorTitle() : null

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', paddingTop: '64px' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#f59e0b', letterSpacing: '0.15em', marginBottom: '16px' }}>05 / STUDY</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: '#f4f4f5', letterSpacing: '-0.03em', marginBottom: '8px' }}>Study Lab</h1>
              <p style={{ fontSize: '15px', color: 'rgba(244,244,245,0.45)', lineHeight: 1.6 }}>직접 만들어 사용하는 학습 도구 모음.</p>
            </div>
            {activeTool && isAdmin && (
              <button
                onClick={() => setShowEditor(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', background: '#f59e0b', border: 'none',
                  borderRadius: '10px', color: '#09090b', fontSize: '14px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: "'Outfit', sans-serif", transition: 'background 0.2s, transform 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fbbf24'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f59e0b'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}
              >
                <span>✏️</span>
                {activeTool === 'vocabulary' && '단어 추가'}
                {activeTool === 'flashcard' && '카드 추가'}
                {activeTool === 'quiz' && '퀴즈 추가'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {/* Tool grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {TOOLS.map((tool) => {
            const isActive = activeTool === tool.id && tool.id !== null
            return (
              <div
                key={tool.title}
                className={tool.status === 'AVAILABLE' ? 'card-hover' : ''}
                onClick={() => {
                  if (tool.status === 'AVAILABLE' && tool.id !== null) {
                    setActiveTool(isActive ? null : tool.id)
                    setFlashFlipped(false)
                    setSelectedAnswer(null)
                  }
                }}
                style={{
                  background: isActive ? `rgba(${tool.color === '#f59e0b' ? '245,158,11' : tool.color === '#a78bfa' ? '167,139,250' : '52,211,153'},0.06)` : 'rgba(17,17,22,0.9)',
                  border: isActive ? `1px solid ${tool.color}44` : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px', padding: '24px',
                  cursor: tool.status === 'AVAILABLE' ? 'pointer' : 'default',
                  opacity: tool.status === 'PLANNED' ? 0.45 : 1,
                  position: 'relative', overflow: 'hidden',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '30px' }}>{tool.icon}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', color: tool.status === 'AVAILABLE' ? '#22c55e' : tool.status === 'COMING SOON' ? '#f59e0b' : 'rgba(244,244,245,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>
                      {tool.status}
                    </div>
                    {tool.count && <div style={{ fontSize: '10px', color: 'rgba(244,244,245,0.25)', fontFamily: "'JetBrains Mono', monospace", marginTop: '2px' }}>{tool.count}</div>}
                  </div>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f4f4f5', marginBottom: '6px' }}>{tool.title}</h3>
                <p style={{ fontSize: '12.5px', color: 'rgba(244,244,245,0.5)', lineHeight: 1.6, marginBottom: '14px' }}>{tool.desc}</p>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {tool.tags.map((t) => <span key={t} style={{ fontSize: '10px', color: 'rgba(244,244,245,0.35)', background: 'rgba(255,255,255,0.05)', padding: '2px 7px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>)}
                </div>
                {tool.status === 'AVAILABLE' && (
                  <div style={{ marginTop: '14px', fontSize: '11px', color: tool.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {isActive ? '▲ 접기' : '▶ 열기'}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Vocabulary ── */}
        {activeTool === 'vocabulary' && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f4f4f5' }}>📖 Vocabulary <span style={{ fontSize: '13px', color: 'rgba(244,244,245,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>— {vocabCards.length} terms</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
              {vocabCards.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setFlippedVocab(flippedVocab === i ? null : i)}
                  style={{
                    background: flippedVocab === i ? 'rgba(245,158,11,0.07)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${flippedVocab === i ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: '12px', padding: '20px', cursor: 'pointer',
                    minHeight: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    transition: 'all 0.22s ease',
                  }}
                >
                  {flippedVocab === i
                    ? <p style={{ fontSize: '13px', color: 'rgba(244,244,245,0.7)', lineHeight: 1.7 }}>{v.def}</p>
                    : <div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#f4f4f5', marginBottom: '6px', fontFamily: "'JetBrains Mono', monospace" }}>{v.term}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(244,244,245,0.22)' }}>탭하여 뜻 보기</div>
                      </div>
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Flash Card ── */}
        {activeTool === 'flashcard' && (
          <div style={{ marginBottom: '40px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f4f4f5' }}>🃏 Flash Card <span style={{ fontSize: '13px', color: 'rgba(244,244,245,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>— {flashIndex + 1} / {flashCards.length}</span></h2>
            </div>
            <div
              onClick={() => setFlashFlipped(!flashFlipped)}
              style={{
                background: flashFlipped ? 'rgba(167,139,250,0.07)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${flashFlipped ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '16px', padding: '40px', cursor: 'pointer',
                textAlign: 'center', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s ease', marginBottom: '16px',
              }}
            >
              {flashFlipped
                ? <p style={{ fontSize: '15px', color: 'rgba(244,244,245,0.8)', lineHeight: 1.75 }}>{flashCards[flashIndex].back}</p>
                : <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#f4f4f5', marginBottom: '10px', fontFamily: "'JetBrains Mono', monospace" }}>{flashCards[flashIndex].front}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(244,244,245,0.25)' }}>클릭하여 뒤집기</div>
                  </div>
              }
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              {['✓ 알아요', '× 모르겠어요'].map((label, li) => (
                <button key={li} onClick={() => { setFlashIndex((flashIndex + 1) % flashCards.length); setFlashFlipped(false) }} style={{ flex: 1, padding: '10px', background: li === 0 ? 'rgba(52,211,153,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${li === 0 ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', color: li === 0 ? '#34d399' : '#f87171', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>{label}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {flashCards.map((_, i) => (
                <div key={i} onClick={() => { setFlashIndex(i); setFlashFlipped(false) }} style={{ width: i === flashIndex ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === flashIndex ? '#a78bfa' : 'rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all 0.2s' }} />
              ))}
            </div>
          </div>
        )}

        {/* ── Quiz ── */}
        {activeTool === 'quiz' && (
          <div style={{ marginBottom: '40px', maxWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f4f4f5' }}>🎲 Random Quiz <span style={{ fontSize: '13px', color: 'rgba(244,244,245,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>— {quizIndex + 1} / {quizItems.length}</span></h2>
              <button onClick={() => { setQuizIndex(Math.floor(Math.random() * quizItems.length)); setSelectedAnswer(null) }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '7px', padding: '7px 14px', color: 'rgba(244,244,245,0.55)', fontSize: '12px', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" }}>
                RANDOM ↺
              </button>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '22px', marginBottom: '16px' }}>
              <p style={{ fontSize: '15px', color: '#f4f4f5', lineHeight: 1.7 }}>{quizItems[quizIndex].question}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '20px' }}>
              {quizItems[quizIndex].options.map((opt, oi) => {
                const isCorrect = oi === quizItems[quizIndex].answer
                const isSelected = selectedAnswer === oi
                const revealed = selectedAnswer !== null
                return (
                  <button
                    key={oi}
                    onClick={() => !revealed && setSelectedAnswer(oi)}
                    style={{
                      padding: '13px 16px', textAlign: 'left',
                      background: revealed ? (isCorrect ? 'rgba(52,211,153,0.1)' : isSelected ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.02)') : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${revealed ? (isCorrect ? 'rgba(52,211,153,0.4)' : isSelected ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)') : 'rgba(255,255,255,0.07)'}`,
                      borderRadius: '8px',
                      color: revealed ? (isCorrect ? '#34d399' : isSelected ? '#f87171' : 'rgba(244,244,245,0.35)') : 'rgba(244,244,245,0.7)',
                      fontSize: '14px', cursor: revealed ? 'default' : 'pointer',
                      fontFamily: "'Outfit', 'Noto Sans KR', sans-serif",
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", marginRight: '10px', opacity: 0.6 }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                    {opt}
                  </button>
                )
              })}
            </div>
            {selectedAnswer !== null && (
              <button
                onClick={() => { setQuizIndex((quizIndex + 1) % quizItems.length); setSelectedAnswer(null) }}
                style={{ padding: '12px 24px', background: '#34d399', border: 'none', borderRadius: '9px', color: '#09090b', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}
              >
                다음 문제 →
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Add content modal ───────────────────────── */}
      {showEditor && activeTool && isAdmin && editorInfo && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(6px)' }} onClick={() => setShowEditor(false)} />
          <div style={{
            position: 'relative', zIndex: 1, width: '100%', maxWidth: '600px',
            maxHeight: '100vh', overflowY: 'auto',
            background: '#111116', border: '1px solid rgba(255,255,255,0.1)',
            borderTop: 'none', borderRadius: '0 0 20px 20px',
            padding: '32px 36px 40px', marginTop: '64px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#f59e0b', letterSpacing: '0.12em', marginBottom: '6px' }}>{editorInfo.tag}</p>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 800, color: '#f4f4f5', margin: 0 }}>{editorInfo.title}</h2>
              </div>
              <button onClick={() => setShowEditor(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: 'rgba(244,244,245,0.5)', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Vocabulary form */}
              {activeTool === 'vocabulary' && (
                <>
                  <div>
                    <label style={LABEL_STYLE}>TERM *</label>
                    <input type="text" placeholder="Circuit Breaker" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} style={{ ...INPUT_STYLE, fontFamily: "'JetBrains Mono', monospace" }} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>DEFINITION *</label>
                    <textarea placeholder="외부 서비스 호출 실패가 연속될 때 자동으로 차단하여 시스템 전체를 보호하는 패턴." value={newDef} onChange={(e) => setNewDef(e.target.value)} rows={4} style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7 }} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </>
              )}

              {/* Flashcard form */}
              {activeTool === 'flashcard' && (
                <>
                  <div>
                    <label style={LABEL_STYLE}>앞면 (개념 / 용어) *</label>
                    <input type="text" placeholder="Deployment" value={newFront} onChange={(e) => setNewFront(e.target.value)} style={{ ...INPUT_STYLE, fontFamily: "'JetBrains Mono', monospace" }} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>뒷면 (설명 / 정의) *</label>
                    <textarea placeholder="Pod의 배포와 업데이트를 선언적으로 관리하는 Kubernetes 리소스. RollingUpdate, Recreate 전략 지원." value={newBack} onChange={(e) => setNewBack(e.target.value)} rows={4} style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7 }} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </>
              )}

              {/* Quiz form */}
              {activeTool === 'quiz' && (
                <>
                  <div>
                    <label style={LABEL_STYLE}>QUESTION *</label>
                    <textarea placeholder="질문을 입력하세요" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} rows={3} style={{ ...INPUT_STYLE, resize: 'vertical', lineHeight: 1.7 }} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={LABEL_STYLE}>OPTIONS * (정답에 체크)</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {newOptions.map((opt, oi) => (
                        <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            onClick={() => setNewAnswer(oi)}
                            style={{
                              width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                              background: newAnswer === oi ? '#34d399' : 'rgba(255,255,255,0.04)',
                              border: `1px solid ${newAnswer === oi ? '#34d399' : 'rgba(255,255,255,0.15)'}`,
                              color: newAnswer === oi ? '#09090b' : 'rgba(244,244,245,0.4)',
                              fontSize: '11px', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                              transition: 'all 0.15s',
                            }}
                          >
                            {['A', 'B', 'C', 'D'][oi]}
                          </button>
                          <input
                            type="text"
                            placeholder={`보기 ${['A', 'B', 'C', 'D'][oi]}`}
                            value={opt}
                            onChange={(e) => { const arr = [...newOptions]; arr[oi] = e.target.value; setNewOptions(arr) }}
                            style={{ ...INPUT_STYLE, flex: 1 }}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(244,244,245,0.25)', marginTop: '8px', fontFamily: "'JetBrains Mono', monospace" }}>원형 버튼으로 정답 선택</p>
                  </div>
                </>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button onClick={() => setShowEditor(false)} style={{ padding: '11px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px', color: 'rgba(244,244,245,0.5)', fontSize: '14px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>취소</button>
                <button
                  onClick={editorInfo.action}
                  disabled={!editorInfo.valid}
                  style={{ padding: '11px 28px', background: editorInfo.valid ? '#f59e0b' : 'rgba(245,158,11,0.3)', border: 'none', borderRadius: '9px', color: editorInfo.valid ? '#09090b' : 'rgba(9,9,11,0.5)', fontSize: '14px', fontWeight: 700, cursor: editorInfo.valid ? 'pointer' : 'not-allowed', fontFamily: "'Outfit', sans-serif", transition: 'background 0.2s' }}
                >
                  추가하기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
