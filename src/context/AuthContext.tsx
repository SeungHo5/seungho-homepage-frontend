import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
// 백엔드 옮기기 전 임시 관리자 로그인
// useState는 상태, useEffect는 렌더링 이후 추가작업, createContext는 Context 공간 만들기, useContext는 Context 사용
// ReactNode는 화면에 렌더링할수 있도록 하는 react에서 제공하는 요소들의 타입

// AuthContext가 제공해야 할 값들의 모양을 정의한 설계도
interface AuthContextType {
  // isAdmin은 로그인 한 상태인지 아닌지 체크
  isAdmin: boolean
  // 문자열 id와 pw둘다 받고 boolean을 반환하는 함수
  login: (id: string, pw: string) => boolean
  logout: () => void
}

// AuthContextType모양의 데이터를 담을 Context를 하나 만듬
// 기본값은 isAdmin은 false, login도 false
const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
})

const ADMIN_ID = 'admin'
const ADMIN_PW = 'weblab2026!'
const STORAGE_KEY = 'weblab_admin_session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      if (isAdmin) sessionStorage.setItem(STORAGE_KEY, 'true')
      else sessionStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [isAdmin])

  function login(id: string, pw: string): boolean {
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      setIsAdmin(true)
      return true
    }
    return false
  }

  function logout() {
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
