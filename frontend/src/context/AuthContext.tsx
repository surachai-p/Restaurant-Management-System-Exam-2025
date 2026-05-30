// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import api from '../services/api'
import type { User } from '../types'

interface AuthCtxType {
  user: User | null
  login: (username: string, password: string) => Promise<User>
  logout: () => void
}

const AuthCtx = createContext<AuthCtxType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      // ตรวจสอบ Token และผูกเข้ากับ Axios ตั้งแต่ตอนเริ่มต้นโหลดแอปพลิเคชันครั้งแรก
      const token = localStorage.getItem('rms_token')
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
      return JSON.parse(localStorage.getItem('rms_user') ?? 'null') as User | null
    } catch {
      return null
    }
  })

  const login = async (username: string, password: string): Promise<User> => {
    const { data } = await api.post<{ token: string; user: User }>('/auth/login', { username, password })
    
    // บันทึกลงความจำเบราว์เซอร์
    localStorage.setItem('rms_token', data.token)
    localStorage.setItem('rms_user', JSON.stringify(data.user))
    
    // อุดรอยรั่ว: ผูก Token เข้ากับ Header ของ Axios ทันทีเพื่อให้ Request ถัดไปทำงานได้ไร้รอยต่อ
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('rms_token')
    localStorage.removeItem('rms_user')
    
    // ล้างค่า Token ออกจาก Header ของ Axios ป้องกันสิทธิ์ค้างใช้งาน
    delete api.defaults.headers.common['Authorization'] = ''
    
    setUser(null)
  }

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
