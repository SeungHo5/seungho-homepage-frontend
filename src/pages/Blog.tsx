import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CommentSection, { type Comment } from '../components/CommentSection'

const WRITE_CATEGORIES = ['DevOps', 'Backend', 'Infrastructure', 'Linux', 'Study']
const ALL_CATEGORIES = ['All', ...WRITE_CATEGORIES]

interface Post {
  id: string
  title: string
  desc: string
  category: string
  tags: string[]
  date: string
  readTime: string
  comments: Comment[]
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    title: 'Docker Compose로 멀티 컨테이너 개발 환경 구축하기',
    desc: 'Docker Compose를 사용하여 Spring Boot, MySQL, Redis, Nginx를 하나의 환경에서 실행하는 개발 환경을 구성하는 방법을 정리합니다.',
    category: 'DevOps',
    tags: ['Docker', 'Compose', 'Nginx'],
    date: '2026.07.28',
    readTime: '8 min',
    comments: [
      { id: 1, author: '김개발', content: '정말 유용한 글이에요! 저도 이 방식으로 구성해봤는데 잘 됐습니다.', date: '2026-07-29T10:22:00Z' },
    ],
  },
  {
    id: 'p2',
    title: 'Spring Boot JPA N+1 문제 완전 정복',
    desc: 'JPA를 사용하다 보면 반드시 마주치는 N+1 문제. 발생 원인부터 Fetch Join, EntityGraph, BatchSize를 사용한 해결 방법까지 정리했습니다.',
    category: 'Backend',
    tags: ['Spring Boot', 'JPA', 'Java', 'MySQL'],
    date: '2026.07.15',
    readTime: '12 min',
    comments: [],
  },
  {
    id: 'p3',
    title: 'Nginx Reverse Proxy 설정 완전 가이드',
    desc: 'Nginx를 리버스 프록시로 설정하는 방법, SSL/TLS 인증서 적용, 로드 밸런싱 기초, Docker와 함께 사용하는 방법까지 실제 설정 파일과 함께 설명합니다.',
    category: 'Infrastructure',
    tags: ['Nginx', 'SSL', 'Proxy', 'Linux'],
    date: '2026.07.02',
    readTime: '15 min',
    comments: [],
  },
  {
    id: 'p4',
    title: 'Linux 시스템 모니터링 도구 총정리',
    desc: 'top, htop, iotop, nethogs, ss 등 Linux에서 자주 사용하는 시스템 모니터링 명령어와 사용법을 정리합니다.',
    category: 'Linux',
    tags: ['Linux', 'Monitoring', 'Shell'],
    date: '2026.06.20',
    readTime: '7 min',
    comments: [],
  },
  {
    id: 'p5',
    title: 'Jenkins Pipeline을 사용한 CI/CD 구축기',
    desc: 'Jenkins Declarative Pipeline으로 GitHub Push 시 자동으로 빌드, 테스트, Docker 이미지 빌드, 배포까지 이어지는 파이프라인을 만드는 과정을 기록합니다.',
    category: 'DevOps',
    tags: ['Jenkins', 'CI/CD', 'Docker', 'GitHub'],
    date: '2026.06.10',
    readTime: '14 min',
    comments: [],
  },
  {
    id: 'p6',
    title: 'Kubernetes 핵심 개념 정리 — Pod, Service, Deployment',
    desc: '쿠버네티스를 처음 공부할 때 꼭 알아야 할 기본 개념인 Pod, ReplicaSet, Deployment, Service, Ingress를 실습과 함께 정리했습니다.',
    category: 'Study',
    tags: ['Kubernetes', 'k8s', 'DevOps'],
    date: '2026.05.28',
    readTime: '18 min',
    comments: [],
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
  fontSize: '11px',
  fontWeight: 600,
  color: 'rgba(244,244,245,0.4)',
  letterSpacing: '0.08em',
  marginBottom: '8px',
  fontFamily: "'JetBrains Mono', monospace",
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min`
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function Blog() {
  const { isAdmin } = useAuth()
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [selectedCat, setSelectedCat] = useState('All')
  const [search, setSearch] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)

  // editor state
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('DevOps')
  const [tagsInput, setTagsInput] = useState('')
  const [content, setContent] = useState('')

  const filtered = posts.filter((p) => {
    const matchCat = selectedCat === 'All' || p.category === selectedCat
    const matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  function handleSubmit() {
    if (!title.trim()) return
    const newPost: Post = {
      id: `p${Date.now()}`,
      title: title.trim(),
      desc: desc.trim() || content.slice(0, 120).trim() + (content.length > 120 ? '...' : ''),
      category,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      date: todayStr(),
      readTime: estimateReadTime(content || desc),
      comments: [],
    }
    setPosts([newPost, ...posts])
    setTitle(''); setDesc(''); setCategory('DevOps'); setTagsInput(''); setContent('')
    setShowEditor(false)
  }

  function handleAddComment(postId: string, comment: Comment) {
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
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
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#f59e0b', letterSpacing: '0.15em', marginBottom: '16px' }}>02 / BLOG</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: '#f4f4f5', letterSpacing: '-0.03em', margin: 0 }}>
              기술 블로그
            </h1>
            {isAdmin && (
              <button
                onClick={() => setShowEditor(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#f59e0b', border: 'none', borderRadius: '10px', color: '#09090b', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", transition: 'background 0.2s, transform 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#fbbf24'; b.style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = '#f59e0b'; b.style.transform = 'translateY(0)' }}
              >
                <span>✏️</span> 새 글 쓰기
              </button>
            )}
          </div>

          <div style={{ position: 'relative', maxWidth: '560px' }}>
            <input type="text" placeholder="제목이나 태그로 검색..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...INPUT_STYLE, paddingLeft: '44px' }} onFocus={onFocus} onBlur={onBlur} />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', opacity: 0.4 }}>🔍</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {ALL_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setSelectedCat(cat)} style={{ padding: '7px 16px', background: selectedCat === cat ? '#f59e0b' : 'rgba(255,255,255,0.04)', border: selectedCat === cat ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', color: selectedCat === cat ? '#09090b' : 'rgba(244,244,245,0.55)', fontSize: '13px', fontWeight: selectedCat === cat ? 700 : 400, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>

        <p style={{ fontSize: '12px', color: 'rgba(244,244,245,0.3)', marginBottom: '24px', fontFamily: "'JetBrains Mono', monospace" }}>{filtered.length} posts found</p>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((post) => {
            const isOpen = expandedPost === post.id
            return (
              <div key={post.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {/* Post row */}
                <div
                  style={{ padding: '28px 12px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'start', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s' }}
                  onClick={() => setExpandedPost(isOpen ? null : post.id)}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.015)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '3px 9px', borderRadius: '5px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{post.category}</span>
                      <span style={{ fontSize: '11px', color: 'rgba(244,244,245,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>{post.readTime} read</span>
                      {post.comments.length > 0 && (
                        <span style={{ fontSize: '11px', color: 'rgba(244,244,245,0.35)', fontFamily: "'JetBrains Mono', monospace" }}>💬 {post.comments.length}</span>
                      )}
                    </div>
                    <h2 style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 700, color: '#f4f4f5', marginBottom: '8px', lineHeight: 1.4, letterSpacing: '-0.01em' }}>{post.title}</h2>
                    <p style={{ fontSize: '13.5px', color: 'rgba(244,244,245,0.45)', lineHeight: 1.7, marginBottom: '14px', maxWidth: '600px' }}>{post.desc}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {post.tags.map((t) => (
                        <span key={t} style={{ fontSize: '11px', color: 'rgba(244,244,245,0.4)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', padding: '2px 8px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>#{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: '12px', color: 'rgba(244,244,245,0.25)', fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', marginBottom: '8px' }}>{post.date}</p>
                    <span style={{ fontSize: '14px', opacity: 0.3, transition: 'transform 0.2s', display: 'block', transform: isOpen ? 'rotate(180deg)' : 'none' }}>↓</span>
                  </div>
                </div>

                {/* Expanded: comment section */}
                {isOpen && (
                  <div style={{ padding: '0 12px 28px' }}>
                    <CommentSection
                      postId={post.id}
                      comments={post.comments}
                      onAddComment={handleAddComment}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'rgba(244,244,245,0.25)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '15px' }}>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      {/* ── Write modal ── */}
      {showEditor && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }} onClick={() => setShowEditor(false)} />
          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '760px', maxHeight: '100vh', overflowY: 'auto', background: '#111116', border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none', borderRadius: '0 0 20px 20px', padding: '32px 36px 40px', marginTop: '64px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#f59e0b', letterSpacing: '0.12em', marginBottom: '6px' }}>NEW POST</p>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: 800, color: '#f4f4f5', margin: 0 }}>새 글 쓰기</h2>
              </div>
              <button onClick={() => setShowEditor(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: 'rgba(244,244,245,0.5)', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={LABEL_STYLE}>TITLE *</label>
                <input type="text" placeholder="포스트 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div>
                  <label style={LABEL_STYLE}>CATEGORY</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...INPUT_STYLE, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                    {WRITE_CATEGORIES.map((c) => <option key={c} value={c} style={{ background: '#111116' }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LABEL_STYLE}>TAGS (쉼표로 구분)</label>
                  <input type="text" placeholder="Docker, Linux, Spring Boot" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>
              <div>
                <label style={LABEL_STYLE}>DESCRIPTION</label>
                <input type="text" placeholder="글의 핵심 내용을 한두 문장으로 요약해주세요" value={desc} onChange={(e) => setDesc(e.target.value)} style={INPUT_STYLE} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <label style={LABEL_STYLE}>CONTENT</label>
                <textarea
                  placeholder={`## 개요\n\n여기에 본문을 작성합니다.\n\n\`\`\`bash\ndocker compose up -d\n\`\`\``}
                  value={content} onChange={(e) => setContent(e.target.value)} rows={14}
                  style={{ ...INPUT_STYLE, resize: 'vertical', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: 1.7, minHeight: '240px' }}
                  onFocus={onFocus} onBlur={onBlur}
                />
                {content && <p style={{ fontSize: '11px', color: 'rgba(244,244,245,0.25)', marginTop: '6px', fontFamily: "'JetBrains Mono', monospace" }}>약 {estimateReadTime(content)} 분량</p>}
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button onClick={() => setShowEditor(false)} style={{ padding: '11px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9px', color: 'rgba(244,244,245,0.5)', fontSize: '14px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>취소</button>
                <button onClick={handleSubmit} disabled={!title.trim()} style={{ padding: '11px 28px', background: title.trim() ? '#f59e0b' : 'rgba(245,158,11,0.3)', border: 'none', borderRadius: '9px', color: title.trim() ? '#09090b' : 'rgba(9,9,11,0.5)', fontSize: '14px', fontWeight: 700, cursor: title.trim() ? 'pointer' : 'not-allowed', fontFamily: "'Outfit', sans-serif", transition: 'background 0.2s' }}>발행하기 →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
