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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍽️</div>
          <h1 className="text-2xl font-bold text-gray-900">RMS</h1>
          <p className="text-sm text-gray-500 mt-1">Restaurant Management System</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input className="input" type="text" value={username} required
              placeholder="admin / cashier1 / waiter1"
              onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" value={password} required
              placeholder="Password"
              onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full btn-primary justify-center py-2.5 text-base mt-2">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-center text-gray-500">
          <p className="font-medium text-gray-400 mb-2">Quick Sign-in (Exam & Demo)</p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => { setUsername('admin'); setPassword('Admin@123') }}
              className="px-2.5 py-1 bg-pink-50 text-pink-700 hover:bg-pink-100 rounded-md font-medium text-xs transition-colors"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => { setUsername('cashier1'); setPassword('Cashier@123') }}
              className="px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md font-medium text-xs transition-colors"
            >
              Cashier
            </button>
            <button
              type="button"
              onClick={() => { setUsername('waiter1'); setPassword('Waiter@123') }}
              className="px-2.5 py-1 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 rounded-md font-medium text-xs transition-colors"
            >
              Waiter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
