import { useState } from 'react'

export interface Comment {
  id: number
  author: string
  content: string
  date: string
  isAdmin?: boolean
}

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  onAddComment: (postId: string, comment: Comment) => void
}

let nextId = 1000

function timeAgo(dateStr: string) {
  const now = new Date()
  const then = new Date(dateStr)
  const diffMs = now.getTime() - then.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return '방금 전'
  if (diffMin < 60) return `${diffMin}분 전`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24) return `${diffH}시간 전`
  return dateStr.slice(0, 10)
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '8px',
  color: '#f4f4f5',
  fontSize: '13.5px',
  fontFamily: "'Outfit', 'Noto Sans KR', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

export default function CommentSection({ postId, comments, onAddComment }: CommentSectionProps) {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = 'rgba(245,158,11,0.4)'
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = 'rgba(255,255,255,0.09)'
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!author.trim() || !content.trim()) return
    setSubmitting(true)
    setTimeout(() => {
      onAddComment(postId, {
        id: nextId++,
        author: author.trim(),
        content: content.trim(),
        date: new Date().toISOString(),
      })
      setContent('')
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 2000)
    }, 300)
  }

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4px', paddingTop: '20px' }}>
      <h4 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'rgba(244,244,245,0.35)', letterSpacing: '0.1em', marginBottom: '16px', fontWeight: 600 }}>
        COMMENTS ({comments.length})
      </h4>

      {/* Comment list */}
      {comments.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {comments.map((c) => (
            <div
              key={c.id}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 14px',
                background: c.isAdmin ? 'rgba(245,158,11,0.05)' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${c.isAdmin ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '10px',
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: c.isAdmin ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.07)',
                border: `1px solid ${c.isAdmin ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px',
              }}>
                {c.isAdmin ? '👨‍💻' : c.author.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: c.isAdmin ? '#f59e0b' : '#f4f4f5' }}>{c.author}</span>
                  {c.isAdmin && (
                    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', color: '#f59e0b', background: 'rgba(245,158,11,0.12)', padding: '1px 6px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                      ADMIN
                    </span>
                  )}
                  <span style={{ fontSize: '11px', color: 'rgba(244,244,245,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>
                    {timeAgo(c.date)}
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'rgba(244,244,245,0.65)', lineHeight: 1.65 }}>{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="이름 (닉네임 가능)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={INPUT_STYLE}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={30}
        />
        <div style={{ position: 'relative' }}>
          <textarea
            placeholder="댓글을 작성해주세요. 누구나 작성할 수 있습니다."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            style={{ ...INPUT_STYLE, resize: 'none', lineHeight: 1.65 }}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={500}
          />
          <span style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '10px', color: 'rgba(244,244,245,0.2)', fontFamily: "'JetBrains Mono', monospace", pointerEvents: 'none' }}>
            {content.length}/500
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={!author.trim() || !content.trim() || submitting}
            style={{
              padding: '9px 22px',
              background: (author.trim() && content.trim()) ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${(author.trim() && content.trim()) ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: '8px',
              color: (author.trim() && content.trim()) ? '#f59e0b' : 'rgba(244,244,245,0.25)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: (author.trim() && content.trim()) ? 'pointer' : 'default',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.2s',
              minWidth: '100px',
            }}
          >
            {submitted ? '✓ 등록됨' : submitting ? '...' : '댓글 등록'}
          </button>
        </div>
      </form>
    </div>
  )
}
