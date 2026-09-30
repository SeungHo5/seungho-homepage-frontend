import { useState } from 'react'

/*
 * Portfolio의 Skills 탭에서 사용할 기술 목록.
 *
 * 단순히 "공부해본 기술"을 전부 넣기보다는
 * 실제 업무 / 프로젝트 / 개인 서버 구축에서
 * 사용해본 기술을 분야별로 나눠서 보여준다.
 *
 * 나중에 기술이 추가되면 해당 카테고리의
 * items 배열에 문자열만 추가하면 된다.
 */

const SKILLS = [
  {
    /*
     * 현재 실무에서 가장 중요한 영역.
     * 공공기관 G-Cloud 전환 업무에서
     * 실제 WEB/WAS 서버를 다루면서 사용했다.
     */
    cat: 'WEB / WAS',
    items: [
      'Apache HTTP Server',
      'Nginx',
      'WildFly',
      'JBoss',
      'JSP / Servlet',
    ],
  },

  {
    /*
     * 백엔드 개발 관련 기술.
     *
     * Java/Spring 계열 프로젝트 경험과
     * 앞으로 개인 홈페이지 백엔드에서도
     * 계속 사용할 영역이다.
     */
    cat: 'Backend',
    items: [
      'Java',
      'Spring',
      'Spring Boot',
      'Spring JPA',
      'Spring Security',
      'REST API',
      'OAuth 2.0',
      'JWT',
    ],
  },

  {
    /*
     * 현재 개인 홈페이지와
     * 이전 프로젝트에서 사용한 Frontend 기술.
     */
    cat: 'Frontend',
    items: [
      'React',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Vite',
      'Tailwind CSS',
    ],
  },

  {
    /*
     * EC2 / ODROID 홈서버 / CI/CD 구축 과정에서
     * 실제로 사용하고 있는 인프라 기술.
     */
    cat: 'Infrastructure',
    items: [
      'Linux',
      'Rocky Linux',
      'Ubuntu',
      'AWS EC2',
      'Docker',
      'Jenkins',
    ],
  },

  {
    /*
     * 실무 및 프로젝트에서 사용한
     * DB와 캐시 관련 기술.
     */
    cat: 'Database / Cache',
    items: [
      'Oracle',
      'Redis',
      'Redis Sentinel',
    ],
  },

  {
    /*
     * 공공기관 시스템 운영 검증과
     * 개인 서버 관제에 관련된 기술.
     */
    cat: 'Monitoring / Test',
    items: [
      'Whatap',
      'JMeter',
      'Prometheus',
      'Grafana',
    ],
  },

  {
    /*
     * SSAFY 프로젝트에서 사용한
     * 게임 / 실시간 통신 관련 기술.
     *
     * Rush Owls에서 Unity와 Photon Fusion을
     * 활용한 실시간 멀티플레이를 구현했다.
     */
    cat: 'Game / Realtime',
    items: [
      'Unity',
      'C#',
      'Photon Fusion',
      'WebSocket',
    ],
  },

  {
    /*
     * 개발 및 운영 과정에서 사용하는
     * 형상관리 / 네트워크 / 협업 도구.
     */
    cat: 'Tools / Network',
    items: [
      'Git',
      'GitHub',
      'SVN',
      'Jira',
      'Reverse Proxy',
      'SSL / TLS',
    ],
  },
]

const PROJECTS = [
  {
    title: 'Personal Portfolio & Home Server',

    desc:
      '개인 포트폴리오를 직접 개발하고 서버 환경을 구축하며 배포 구조를 학습하고 있습니다.',

    tags: [
      'React',
      'TypeScript',
      'Nginx',
      'Docker',
      'Jenkins',
      'Rocky Linux',
      'AWS EC2',
    ],

    status: 'IN PROGRESS',

    image: '',

    year: '2026',

    // 이후 추가
    period: '2026.08 — Present',
    role: 'Frontend · Infrastructure',
    githubUrl: '',
    demoUrls: [],
      
  },
  {
    /*
    * SSAFY 특화 프로젝트 - Rush Owls
    *
    * Unity와 Photon Fusion을 활용한
    * 실시간 멀티플레이 게임 프로젝트.
    *
    * 팀장 역할과 함께 Unity 개발,
    * 실시간 네트워크 동기화 영역을 담당했다.
    */
    title: 'Rush Owls',

    desc:
      'Unity와 Photon Fusion을 활용해 실시간 멀티플레이 게임을 개발했습니다. Host 방식의 네트워크 구조에서 방 생성·참가, 플레이어 Spawn, 이동 및 상태 동기화 등을 구현했으며, 서바이벌 · 퀴즈 등 여러 게임 모드를 개발했습니다.',

    tags: [
      'Unity',
      'C#',
      'Photon Fusion 2',
      'Spring Boot',
      'PostgreSQL',
      'Jira',
    ],

    status: 'COMPLETE',

    // 이후 실제 게임 화면 또는 GIF로 교체
    image: '',

    year: '2025',

    period: '2025.08.18 — 2025.09.29',

    role: 'Team Leader · Unity · Realtime Networking',

    // Repository 주소가 있다면 나중에 추가
    githubUrl: '',

    // Rush Owls 시연 영상이 있다면 이후 추가
    demoUrls: [
      {
        label: 'Demo Video',
        url: 'https://www.youtube.com/watch?v=GFOrKhpAKag',
      },
    ],
  },
  {
    /*
    * SSAFY 특화 프로젝트 - 캐릭캐릭스터디
    *
    * React Native 기반 모바일 화면과 Unity 콘텐츠를 연동하고,
    * 카메라를 통해 분석한 사용자 상태를
    * 3D 캐릭터의 상태로 표현한 스터디 서비스.
    */
    title: '캐릭캐릭스터디',

    desc:
      '사용자의 공부 상태를 캐릭터로 시각화하는 스터디 서비스입니다. React Native로 모바일 UI를 구현하고 MediaPipe를 활용해 집중, 졸음, 자리비움 등의 상태를 분석했으며, 분석 결과를 Unity의 3D 캐릭터와 연동해 실시간으로 표현했습니다.',

    tags: [
      'React Native',
      'Expo',
      'JavaScript',
      'Unity',
      'C#',
      'MediaPipe',
      'WebSocket',
    ],

    status: 'COMPLETE',

    // 나중에 실제 프로젝트 화면이나 GIF로 교체
    image: '',

    year: '2025',

    period: '2025.07.14 — 2025.08.18',

    /*
    * 본인이 담당한 핵심 영역.
    * 프로젝트 상세페이지를 만들 때는 역할을 더 세분화할 예정.
    */
    role: 'Frontend · Unity Integration',

    // GitHub 주소는 나중에 실제 Repository 주소 입력
    githubUrl: '',

    /*
    * 프로젝트 시연 영상.
    * 이후 카드 하단에 Demo Video 버튼을 추가해서 연결할 예정.
    */
    demoUrls: [
      {
        label: 'Demo 1',
        url: 'https://youtube.com/shorts/zOGgttJ9Dbk',
      },
      {
        label: 'Demo 2',
        url: 'https://youtube.com/shorts/vkcPdvWpq64',
      },
    ],
  },
  {
    /*
    * SSAFY 웹 프로젝트
    *
    * Django + Vue를 이용해 제작한 영화 서비스.
    * TMDB API를 통해 영화 데이터를 가져오고,
    * OpenAI API를 이용한 추천 및 퀴즈 기능도 구현했다.
    */
    title: 'Moview',

    desc:
      '영화 정보 조회와 사용자 참여 기능을 제공하는 웹 서비스입니다. TMDB API를 활용해 영화·배우·감독 정보를 제공하고, 평점·리뷰·게시판 기능을 구현했습니다. OpenAI API를 활용한 영화 추천과 퀴즈 기능도 적용했습니다.',

    tags: [
      'Vue',
      'Django',
      'Django REST Framework',
      'SQLite',
      'TMDB API',
      'OpenAI API',
    ],

    status: 'COMPLETE',

    image: '/images/projects/moview.gif',

    year: '2025',

    period: '2025.05',

    role: 'Full Stack',

    githubUrl: '',

    demoUrls: [],
  },
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'skills' | 'projects'>('about')

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
            Seungho's Portfolio
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
              {/* 
                프로필 사진

                public/images/profile.webp 파일을 사용한다.
                public 폴더의 파일은 Vite build 시 dist에 자동으로 복사되므로
                "/images/profile.webp" 경로로 바로 접근할 수 있다.
              */}
              <img
                src="/images/profile.webp"
                alt="오승호 프로필 사진"
                style={{
                  width: '300px',
                  height: '300px',

                  // 사진 모서리를 기존 디자인처럼 둥글게 처리
                  borderRadius: '16px',

                  // 사진 비율이 달라도 120 x 120 영역을 꽉 채운다.
                  // 남는 부분은 자동으로 잘린다.
                  objectFit: 'cover',

                  // 기존 Portfolio의 주황색 디자인을 유지하기 위한 테두리
                  border: '1px solid rgba(245,158,11,0.25)',

                  // flex 영역이 좁아졌을 때 사진이 찌그러지는 것을 방지
                  flexShrink: 0,

                  // img 아래에 생길 수 있는 미세한 baseline 여백 제거
                  display: 'block',
                }}
              />
              <div>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, color: '#f4f4f5', marginBottom: '8px' }}>
                  Oh Seungho
                </h2>
                 {/*
                  현재 가장 강한 실무 경험인 WEB/WAS를 앞에 둔다.

                  Backend만 강조하면 개발 직무로만 보일 수 있기 때문에
                  실제 업무 방향인 WEB/WAS + Infrastructure를 명확하게 보여준다.
                */}
                <p style={{ fontSize: '15px', color: '#f59e0b', marginBottom: '16px', fontWeight: 500 }}>
                  WEB/WAS · Infrastructure Engineer
                </p>
                {/*
                  단순히 "관심이 있다"는 표현보다는
                  실제로 무엇을 해봤는지 먼저 보여준다.

                  About은 경력기술서처럼 너무 길게 쓰지 않고,
                  현재 경험 + 앞으로 확장하는 분야 정도만 요약한다.
                */}
                <p style={{ fontSize: '14px', color: 'rgba(244,244,245,0.55)', lineHeight: 1.8 }}>
                  궁금한 것이 생기면 직접 해보면서 이해하는 것을 좋아합니다.
                  요즘은 개인 서버를 구축하고 CI/CD 환경을 만들어보고 있으며,
                  정보보안기사를 준비하면서 보안에 대해서도 공부하고 있습니다.
                  개발 밖에서는 피아노, 복싱을 배우고 있고 축구를 즐깁니다.
                  새로운 것을 배우고, 시행착오를 겪고, 그 과정을 기록하면서
                  조금씩 할 수 있는 것을 늘려가는 중입니다.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              {[
                {
                  label: 'Focus',
                  value: 'Backend & Infra',
                },
                {
                  label: 'Location',
                  value: 'Mokpo, Korea',
                },
                {
                  label: 'Education',
                  value: '목포대학교 · 정보보호학과',
                },
                {
                  label: 'Current',
                  value: '소프트아이텍 · 우정정보관리원 근무 중',
                },
                { label: 'Studying', 
                  value: 'Server · Network · Security' 
                },
                {
                  label: 'Hobby',
                  value: 'Piano · Boxing · Football',
                },
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
                role: '우편 시스템 운영 · 유지보수',

                org: '소프트아이텍 · 우정정보관리원',

                period: '2026.01 — Present',

                desc:
                  '공공기관 우편 시스템의 G-Cloud 재전환 프로젝트에서 WEB/WAS 전환 준비와 운영 검증을 수행한 뒤, 현재는 우편접수 영역의 운영·유지보수를 담당하고 있습니다. 운영 중 발생하는 접수 오류와 사용자 요청을 분석하고, 애플리케이션 로직 및 DB 변경, 배포와 운영 확인을 수행하고 있습니다.',

                tags: [
                  'Java',
                  'JSP / Servlet',
                  'LafFramework',
                  'Oracle',
                  'Apache',
                  'WildFly / JBoss',
                  'Linux',
                  'XBuilder',
                  'SVN',
                ],
              },
              {
                /*
                * SSAFY 13기 교육 경험
                *
                * 단순 교육 수강이 아니라
                * 알고리즘 → 웹 개발 → 팀 프로젝트까지
                * 개발 역량을 쌓아간 과정이라는 점을 보여준다.
                *
                * 각 프로젝트의 세부 구현 기능은
                * Projects 탭에서 별도로 자세히 보여줄 예정.
                */
                role: 'SSAFY 13기',

                org: '삼성 청년 SW·AI 아카데미',

                period: '2025.01.07 — 2025.12.31',

                desc:
                  '알고리즘과 Python, SQL을 시작으로 Django와 Vue 기반 웹 개발을 학습하고 팀 프로젝트를 수행했습니다. 2025년 5월 영화 웹 서비스 프로젝트를 시작으로, 7월 캐릭캐릭스터디, 8~9월 Rush Owls 프로젝트에 참여하며 웹·모바일·Unity·실시간 네트워크 등 다양한 환경에서 서비스를 구현했습니다. 프로젝트 과정에서 협업과 문제 해결 경험을 쌓았으며 Best Member 2회와 알고리즘 과정 이달의 멤버에 선정되었습니다.',

                tags: [
                  'Algorithm',
                  'Python',
                  'SQL',
                  'Django',
                  'Vue',
                  'Java',
                  'Spring Boot',
                  'React Native',
                  'Unity',
                  'Blender',
                  'Git',
                  'Jira',
                ],
              },
              {
                /*
                * IT 직무 이전에 경험한 산업 현장 경력.
                *
                * 현재 서버 직무와 직접적인 기술 연관성은 적지만,
                * 실제 산업 현장에서 근무했던 경험을 간단히 보여준다.
                */
                role: '조선소 업무',

                org: '성진ENG · HD현대삼호 협력업체',

                period: '2023.07 — 2024.03',

                desc:
                  'HD현대삼호 협력업체인 성진ENG에서 조선소 관련 현장 업무를 수행했습니다. 산업 현장에서 작업 절차와 협업 환경을 경험한 뒤 소프트웨어 분야로 진로를 전환했습니다.',

                tags: [
                  '현장 업무',
                  '계장',
                  '조선소'
                ],
              },
              {
                /*
                * IT 직무 이전의 장기 근무 경험.
                *
                * 약 4년간 한 곳에서 근무한 경험 자체에 의미가 있으므로
                * 기술적인 경력처럼 포장하지 않고 간결하게 작성한다.
                */
                role: '매장 운영 · 고객 응대',

                org: '롯데리아',

                period: '2018.04 — 2022.02',

                desc:
                  '약 4년간 근무하며 고객 응대와 매장 운영 업무를 경험했습니다.',

                tags: [],
              },
              {
                /*
                * 산업기능요원 복무 당시의 근무 경험.
                *
                * 현재 IT 직무와 직접적인 연관성은 적기 때문에
                * 실제 수행했던 업무만 짧게 기록한다.
                */
                role: '파이프 도장 업무',

                org: '한국특수산업',

                period: '2015.01 — 2017.03',

                desc:
                  '산업기능요원으로 근무하며 파이프 도장 관련 현장 업무를 수행했습니다.',

                tags: [
                  '산업기능요원',
                ],
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
                  {i < 4 && <div style={{ width: '1px', flex: 1, background: 'rgba(255,255,255,0.07)', marginTop: '8px' }} />}
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
          <div >
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
          <div >
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
                    <div style={{ marginBottom: '12px' }}>
                    {/* 프로젝트 이름 + 연도 */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '6px',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '17px',
                          fontWeight: 700,
                          color: '#f4f4f5',
                          lineHeight: 1.3,
                        }}
                      >
                        {proj.title}
                      </h3>

                      <span
                        style={{
                          fontSize: '11px',
                          color: 'rgba(244,244,245,0.25)',
                          fontFamily: "'JetBrains Mono', monospace",
                          flexShrink: 0,
                        }}
                      >
                        {proj.year}
                      </span>
                    </div>

                    {/* 내가 프로젝트에서 담당한 영역 */}
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#f59e0b',
                        marginBottom: '4px',
                        fontWeight: 500,
                      }}
                    >
                      {proj.role}
                    </p>

                    {/* 실제 프로젝트 진행 기간 */}
                    <p
                      style={{
                        fontSize: '10px',
                        color: 'rgba(244,244,245,0.3)',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {proj.period}
                    </p>
                  </div>
                    <p style={{ fontSize: '13px', color: 'rgba(244,244,245,0.5)', lineHeight: 1.7, marginBottom: '16px' }}>{proj.desc}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {proj.tags.map((t) => (
                        <span key={t} style={{ fontSize: '10px', color: 'rgba(244,244,245,0.45)', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '5px', fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                      ))}
                    </div>
                    {/* 프로젝트 관련 외부 링크 */}
                      {(proj.githubUrl || proj.demoUrls?.length > 0) && (
                        <div
                          style={{
                            display: 'flex',
                            gap: '8px',
                            flexWrap: 'wrap',
                            marginTop: '18px',
                          }}
                        >
                          {/* GitHub 주소가 있는 프로젝트만 버튼 표시 */}
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: '11px',
                                color: 'rgba(244,244,245,0.65)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                padding: '7px 12px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontFamily: "'JetBrains Mono', monospace",
                              }}
                            >
                              GitHub ↗
                            </a>
                          )}

                          {/* Demo 영상이 여러 개면 개수만큼 자동으로 버튼 생성 */}
                          {proj.demoUrls?.map((demo) => (
                            <a
                              key={demo.url}
                              href={demo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: '11px',
                                color: '#f59e0b',
                                border: '1px solid rgba(245,158,11,0.25)',
                                padding: '7px 12px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontFamily: "'JetBrains Mono', monospace",
                              }}
                            >
                              ▶ {demo.label}
                            </a>
                          ))}
                        </div>
                      )}
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
