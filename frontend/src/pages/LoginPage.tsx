// src/pages/LoginPage.tsx
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { AxiosError } from 'axios'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  if (user) { navigate('/'); return null }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setError(e.response?.data?.error ?? 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-stone-900 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full" />
        <div className="absolute top-1/3 right-8 w-48 h-48 bg-orange-500/5 rounded-full" />

        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center text-white font-black text-4xl mx-auto mb-6 shadow-2xl shadow-amber-500/40">
            R
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">
            Restaurant<br />Manager
          </h1>
          <p className="text-stone-400 text-lg mb-10">จัดการร้านอาหารของคุณอย่างมืออาชีพ</p>

          <div className="grid grid-cols-2 gap-4 text-left">
            {[
              { icon: '🍽️', label: 'จัดการเมนู', desc: 'เพิ่ม แก้ไข หมวดหมู่' },
              { icon: '📋', label: 'รับออเดอร์', desc: 'เปิดโต๊ะ เพิ่มรายการ' },
              { icon: '💳', label: 'ชำระเงิน', desc: 'Cash / Card / QR' },
              { icon: '📊', label: 'รายงาน', desc: 'ยอดขายรายวัน' },
            ].map(f => (
              <div key={f.label} className="bg-stone-800/50 rounded-2xl p-4">
                <div className="text-2xl mb-1">{f.icon}</div>
                <p className="text-stone-200 font-semibold text-sm">{f.label}</p>
                <p className="text-stone-500 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-8 bg-stone-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-3">
              R
            </div>
            <h1 className="text-2xl font-black text-stone-900">Restaurant Manager</h1>
          </div>

          <h2 className="text-3xl font-black text-stone-900 mb-1">ยินดีต้อนรับ</h2>
          <p className="text-stone-500 mb-8">เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน</p>

          {error && (
            <div className="mb-5 flex items-center gap-2 px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Username</label>
              <input className="input" type="text" value={username} required
                placeholder="กรอก username"
                onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" value={password} required
                placeholder="กรอก password"
                onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all duration-150 disabled:opacity-60 text-base">
              {loading
                ? <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>กำลังเข้าสู่ระบบ…</>
                : 'เข้าสู่ระบบ'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-stone-100 rounded-2xl border border-stone-200">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Test Accounts</p>
            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex justify-between"><span className="font-semibold">admin</span><span>Admin@123</span></div>
              <div className="flex justify-between"><span className="font-semibold">cashier1</span><span>Cashier@123</span></div>
              <div className="flex justify-between"><span className="font-semibold">waiter1</span><span>Waiter@123</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
