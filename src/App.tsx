import { useState, useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Troubleshooting from './pages/Troubleshooting'
import Study from './pages/Study'
import Lab from './pages/Lab'
import Contact from './pages/Contact'

// types <Page>는 내가 쓸 값의 자료형을 지정한 타입으로 제한
type Page = 'home' | 'portfolio' | 'blog' | 'troubleshooting' | 'study' | 'lab' | 'contact'

export default function App() {

  // React가 관리 할 상태(state)를 하나 만듬
  // [page, setPage]는 배열 구조 분해 할당
  // useState는 값을 두개 돌려줌 [현재 상태값, 상태 변경 함수]
  // page는 현재 어떤 페이지를 보여주고 있는지 저장하고 있는 변수
  // setPage는 page를 변경할 때 사용하는 함수
  // 'home'은 초기 세팅
  const [page, setPage] = useState<Page>('home')

  // 현재 navigate는 사용자가 다른 메뉴를 눌렀을 때 현재 페이지를 바꾸고, 화면 스크롤도 맨 위로 올려주는 함수
  // Arrow Function(화살표 함수) 사용
  // p: Page의 타입 안에서만 사용 가능하고 그 타입으로 페이지를 변경
  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // useEffect
  // → 컴포넌트가 렌더링된 이후 특정 작업을 실행하기 위한 React Hook
  //
  // 여기서는 [page]를 dependency array(의존성 배열)로 사용한다.
  // 따라서 page 값이 변경될 때마다 이 useEffect 내부 코드가 실행된다.
  useEffect(() => {
    
    // 각 페이지 별 브라우저 제목을 설정하기 위해 Record 타입을 사용하여 titles 객체를 정의
    // Record<Page, string>은 Page 타입의 키를 가지며, 각 키에 대한 값은 string 타입인 객체를 의미
    const titles: Record<Page, string> = {
      home: "SeungHo's Blog",
      portfolio: "SeungHo's Portfolio",
      blog: "SeungHo's Blog",
      troubleshooting: "SeungHo's Troubleshooting",
      study: "SeungHo's Study",
      lab: "SeungHo's Lab",
      contact: "Contact",
    }
    // 현재 페이지에 해당하는 제목을 브라우저의 title로 설정
    document.title = titles[page]
    // page가 변경될 때마다 브라우저의 제목이 업데이트되도록 설정
  }, [page])

  return (
    // AuthProvider 컴포넌트로 감싸서 인증 관련 상태를 관리
    <AuthProvider>
    <div style={{ background: '#09090b', minHeight: '100vh' }}>

      {/*currentPage, onNavigate는 props임-
      props는 부모컴포넌트가 자식 컴포넌트에게 값을 전달해주는 방법>*/}
      <Navbar currentPage={page} onNavigate={navigate} />

        {/*
          조건부 렌더링
          page의 값에 따라 다른 컴포넌트 렌더링
          && 연산자를 통하여 page가 true일 때만 해당 컴포넌트를 렌더링

          main은 HTML5에서 문서의 주요 콘텐츠를 나타내는 요소로, 페이지의 핵심 내용을 담는 영역
        */}
      <main>
        {/*
          
          onNavigate={navigate}는 Home 컴포넌트에 navigate 함수를 props로 전달
          Home 컴포넌트에서 navigate 함수를 호출하면 App 컴포넌트의 navigate 함수가 실행되어 페이지를 변경
        */}
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'portfolio' && <Portfolio />}
        {page === 'blog' && <Blog />}
        {page === 'troubleshooting' && <Troubleshooting />}
        {page === 'study' && <Study />}
        {page === 'lab' && <Lab />}
        {page === 'contact' && <Contact />}
      </main>
          {/*
            page가 'home'이 아닐 때만 Footer 컴포넌트를 렌더링
            Footer 컴포넌트에 navigate 함수를 props로 전달
          */}
      {page !== 'home' && <Footer onNavigate={navigate} />}
    </div>
    </AuthProvider>
  )
}
