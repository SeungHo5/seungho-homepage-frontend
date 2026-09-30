export default function Contact() {
  return (
    <div
      style={{
        background: '#09090b',
        minHeight: '100vh',
        paddingTop: '64px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="contact-Content"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* 
            Contact 페이지 번호.

            다른 페이지와 동일하게
            JetBrains Mono + 주황색 포인트 디자인을 유지한다.
          */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '40px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#f59e0b',
              letterSpacing: '0.12em',
            }}
          >
            04 / CONTACT
          </div>

          {/* 페이지 제목 */}
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(40px, 7vw, 80px)',
              fontWeight: 900,
              color: '#f4f4f5',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '24px',
            }}
          >
            연락해주세요
          </h1>

          {/*
            프로젝트 협업을 받는 목적의 페이지는 아니기 때문에
            협업 문구는 제거했다.

            채용 담당자나 홈페이지 방문자가
            GitHub 또는 이메일을 통해 연락할 수 있다는 정도만
            간결하게 안내한다.
          */}
          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 17px)',
              color: 'rgba(244,244,245,0.5)',
              lineHeight: 1.8,
              maxWidth: '480px',
              margin: '0 auto 56px',
            }}
          >
            궁금한 점이나 연락이 필요하시면
            <br />
            GitHub 또는 이메일을 통해 편하게 연락해주세요.
          </p>

          {/* Contact cards */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '64px',
            }}
          >
            {[
              {
                icon: '🐙',
                label: 'GitHub',

                // 화면에 보여줄 GitHub 주소
                value: 'github.com/SeungHo5',

                // 실제 GitHub 프로필 주소
                href: 'https://github.com/SeungHo5',

                color: '#f4f4f5',

                // GitHub는 현재 페이지를 유지하기 위해 새 탭으로 연다.
                external: true,
              },
              {
                icon: '✉️',
                label: 'Email',

                // 실제 이메일 주소
                value: 'osh4607@gmail.com',

                // mailto:를 사용하면 클릭 시
                // 사용자의 기본 메일 프로그램이 실행된다.
                href: 'mailto:osh4607@gmail.com',

                color: '#f59e0b',

                // 이메일은 새 탭이 필요하지 않다.
                external: false,
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}

                /*
                 * GitHub 같은 외부 사이트는 새 탭으로 연다.
                 *
                 * target="_blank" 사용 시
                 * rel="noopener noreferrer"를 함께 사용해
                 * 새 페이지가 기존 페이지의 window 객체에
                 * 접근하지 못하도록 한다.
                 */
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  padding: '20px',
                  textDecoration: 'none',
                  width: '100%',
                  maxWidth: '300px',
                  minWidth: 0,
                  transition:
                    'border-color 0.2s, transform 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement

                  a.style.borderColor = 'rgba(245,158,11,0.3)'
                  a.style.transform = 'translateY(-3px)'
                  a.style.background = 'rgba(245,158,11,0.04)'
                }}
                onMouseLeave={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement

                  a.style.borderColor = 'rgba(255,255,255,0.08)'
                  a.style.transform = 'translateY(0)'
                  a.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                {/* 아이콘 */}
                <span style={{ fontSize: '28px' }}>{link.icon}</span>

                {/* 링크 정보 */}
                <div
                  style={{
                    textAlign: 'left',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'rgba(244,244,245,0.35)',
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: '4px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {link.label.toUpperCase()}
                  </div>

                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: link.color,
                      fontFamily: "'JetBrains Mono', monospace",

                      /*
                       * 모바일 화면에서 이메일이나 URL이
                       * 카드 너비보다 길어지더라도
                       * 자연스럽게 줄바꿈되도록 한다.
                       */
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {link.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* 하단 구분선 */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: '40px',
            }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                color: 'rgba(244,244,245,0.2)',
                letterSpacing: '0.08em',
              }}
            >
              Build. Learn. Troubleshoot.
            </p>

            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(244,244,245,0.12)',
                marginTop: '8px',
              }}
            >
              © 2026 Oh Seungho — Web Lab
            </p>
          </div>
        </div>
      </div>

      {/* 
        페이지 아래쪽에 아주 약한 주황색 빛을 넣어
        기존 홈페이지의 디자인 분위기를 유지한다.
      */}
      <div
        style={{
          height: '200px',
          background:
            'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(245,158,11,0.04), transparent)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    </div>
  )
}