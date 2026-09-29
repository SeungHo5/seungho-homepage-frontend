// React Router에서 필요한 기능들을 가져온다.
//
// Routes
// → 여러 Route를 묶고 현재 URL과 일치하는 Route를 찾아준다.
//
// Route
// → 특정 URL에서 어떤 컴포넌트를 보여줄지 정의한다.
//
// Navigate
// → 다른 URL로 이동시키는 컴포넌트.
//   여기서는 존재하지 않는 URL 접근 시 "/"로 이동시키기 위해 사용한다.
//
// useLocation
// → 현재 브라우저의 URL 정보를 가져오는 Hook.
//   예: /portfolio에 있다면 location.pathname은 "/portfolio"

import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
// URL이 변경되었을 때
// title 변경, scroll 이동 같은 부수 작업을 수행하기 위해 사용
import { useEffect } from 'react'

// 공통 컴포넌트
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// 각 페이지 컴포넌트
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Troubleshooting from './pages/Troubleshooting'
import Study from './pages/Study'
import Lab from './pages/Lab'
import Contact from './pages/Contact'

// 로그인한 관리자만 접근할 수 있는 페이지를 보호하는 컴포넌트
import ProtectedRoute from './components/ProtectedRoute'

// URL과 브라우저 탭에 표시할 title을 연결해둔 객체.
//
// 예:
// 현재 URL이 /portfolio
// ↓
// PAGE_TITLES['/portfolio']
// ↓
// "SeungHo's Portfolio"
const PAGE_TITLES: Record<string, string> = {
  "/": "SeungHo's Blog",
  "/portfolio": "SeungHo's Portfolio",
  "/blog": "SeungHo's Blog",
  "/troubleshooting": "SeungHo's Troubleshooting",
  "/study": "SeungHo's Study",
  "/lab": "SeungHo's Lab",
  "/contact": "Contact",
}


export default function App() {

  // 현재 브라우저 URL 정보
  // 예: https://seungho.cloud/portfolio
  // location.pathname === '/portfolio'
  const location = useLocation()

  // useEffect는 컴포넌트가 렌더링된 이후
  // 특정 작업을 실행하기 위한 React Hook.
  //
  // 아래 dependency array에
  // location.pathname을 넣었기 때문에
  //
  // URL 경로가 변경될 때마다 실행된다.
  //
  // 예:
  // / → /portfolio
  //
  // pathname 변경
  // ↓
  // useEffect 다시 실행
  useEffect(() => {

    // 현재 URL에 맞는 브라우저 title 설정
    //
    // 예:
    // location.pathname === "/portfolio"
    //
    // PAGE_TITLES["/portfolio"]
    // ↓
    // "SeungHo's Portfolio"
    //
    // 만약 등록되지 않은 주소라면
    // ?? 뒤의 기본값을 사용한다.
    document.title = PAGE_TITLES[location.pathname] ?? "SeungHo's Blog"

    // 기존 페이지 이동 시 스크롤 위로 올리는 기능 유지
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },  [location.pathname])
  

  return (
    
    <div style={{ background: '#09090b', minHeight: '100vh' }}>

      <Navbar />

      <main>
        
        <Routes>

          {/* 공개 페이지 */}
          {/*
          path 
            "어떤 주소?"
          element
            "그 주소에서 뭘 보여줘?"
          */} 
          <Route
            path="/"
            element={<Home />}
            />

          <Route
            path="/portfolio"
            element={<Portfolio />}
            />

          <Route
            path="/troubleshooting"
            element={<Troubleshooting />}
            />
          
          <Route
            path="/contact"
            element={<Contact />}
            />

          {/* 관리자 전용 페이지 */}
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
            />
            
          <Route
            path="/study"
            element={
              <ProtectedRoute>
                <Study />
              </ProtectedRoute>
            }
            />

          <Route
            path="/lab"
            element={
              <ProtectedRoute>
                <Lab />
              </ProtectedRoute>
            }
            />

          {/* 존재하지 않는 경로 접근 시 홈으로 리다이렉트 */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
            />
        </Routes>

      </main>
      
      <Footer />
    </div>
  )
}
