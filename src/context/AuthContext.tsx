import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface AuthContextType {
  isAdmin: boolean
  login: (id: string, pw: string) => boolean
  logout: () => void
}

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
