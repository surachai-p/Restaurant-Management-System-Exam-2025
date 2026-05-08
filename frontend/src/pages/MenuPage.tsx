// src/pages/MenuPage.tsx
import { useEffect, useState, FormEvent } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import type { MenuItem, Category } from '../types'
import type { AxiosError } from 'axios'

const cats: Category[] = ['food', 'drink', 'dessert']
const catStyle: Record<Category, { bg: string; text: string; icon: string }> = {
  food:    { bg: 'bg-orange-100', text: 'text-orange-700', icon: '🍛' },
  drink:   { bg: 'bg-sky-100',    text: 'text-sky-700',    icon: '🥤' },
  dessert: { bg: 'bg-pink-100',   text: 'text-pink-700',   icon: '🍮' },
}

export default function MenuPage() {
  const { user } = useAuth()
  const [items, setItems]     = useState<MenuItem[]>([])
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState<Category | ''>('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<MenuItem | null>(null)
  const [form, setForm]       = useState({ name: '', description: '', price: '', category: 'food' as Category })
  const [msg, setMsg]         = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const params: Record<string, string> = {}
      if (search) params.search = search
      if (cat)    params.category = cat
      const { data } = await api.get<MenuItem[]>('/menu', { params })
      setItems(data)
    } catch { setMsg({ type: 'error', text: 'ไม่สามารถโหลดเมนูได้' }) }
    setLoading(false)
  }

  useEffect(() => { load() }, [cat])

  const openForm = (item?: MenuItem) => {
    setEditing(item ?? null)
    setForm(item
      ? { name: item.name, description: item.description ?? '', price: String(item.price), category: item.category }
      : { name: '', description: '', price: '', category: 'food' })
    setShowForm(true); setMsg(null)
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/menu/${editing.id}`, form)
        setMsg({ type: 'success', text: 'อัปเดตเมนูเรียบร้อย' })
      } else {
        await api.post('/menu', form)
        setMsg({ type: 'success', text: 'เพิ่มเมนูเรียบร้อย' })
      }
      setShowForm(false); load()
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setMsg({ type: 'error', text: e.response?.data?.error ?? 'บันทึกไม่สำเร็จ' })
    }
  }

  const handleDisable = async (id: number) => {
    if (!confirm('ต้องการปิดรายการนี้?')) return
    try { await api.delete(`/menu/${id}`); load() }
    catch { setMsg({ type: 'error', text: 'ไม่สามารถปิดรายการได้' }) }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">เมนูอาหาร</h1>
          <p className="text-sm text-stone-500 mt-0.5">จัดการรายการอาหารและเครื่องดื่ม</p>
        </div>
        {user?.role === 'admin' && (
          <button className="btn-primary" onClick={() => openForm()}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            เพิ่มรายการ
          </button>
        )}
      </div>

      {msg && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          msg.type === 'error' ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
        }`}>
          {msg.type === 'success' ? '✓' : '✕'} {msg.text}
        </div>
      )}

      {/* Filter bar */}
      <div className="card py-4">
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex-1 min-w-48 relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input className="input pl-9" value={search}
              onChange={e => setSearch(e.target.value)} placeholder="ค้นหาเมนู…"
              onKeyDown={e => e.key === 'Enter' && load()} />
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => setCat('')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${!cat ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
              ทั้งหมด
            </button>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1 ${cat === c ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                {catStyle[c].icon} {c}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={load}>ค้นหา</button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card border-2 border-amber-200 bg-amber-50/30">
          <h2 className="text-base font-bold text-stone-800 mb-4">{editing ? '✏️ แก้ไขเมนู' : '➕ เพิ่มเมนูใหม่'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">ชื่อรายการ *</label>
              <input className="input" value={form.name} required
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="label">ราคา (บาท) *</label>
              <input className="input" type="number" step="0.01" value={form.price} required
                onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="label">รายละเอียด</label>
              <input className="input" value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div>
              <label className="label">หมวดหมู่</label>
              <select className="input" value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value as Category }))}>
                {cats.map(c => <option key={c} value={c}>{catStyle[c].icon} {c}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" className="btn-success">บันทึก</button>
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>ยกเลิก</button>
            </div>
          </form>
        </div>
      )}

      {/* Menu grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => {
            const s = catStyle[item.category]
            return (
              <div key={item.id} className="card-hover group">
                <div className="flex justify-between items-start mb-3">
                  <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${s.bg} ${s.text}`}>
                    {s.icon} {item.category}
                  </span>
                  <span className="text-xl font-black text-stone-900">฿{Number(item.price).toFixed(0)}</span>
                </div>
                <p className="font-bold text-stone-900 text-base">{item.name}</p>
                {item.description && <p className="text-sm text-stone-500 mt-1 line-clamp-2">{item.description}</p>}
                {user?.role === 'admin' && (
                  <div className="flex gap-2 mt-4 pt-3 border-t border-stone-100">
                    <button className="btn-ghost btn-sm flex-1 justify-center" onClick={() => openForm(item)}>แก้ไข</button>
                    <button className="btn-danger btn-sm" onClick={() => handleDisable(item.id)}>ปิด</button>
                  </div>
                )}
              </div>
            )
          })}
          {items.length === 0 && (
            <div className="col-span-full card text-center py-16">
              <div className="text-4xl mb-3">🍽️</div>
              <p className="text-stone-400 font-medium">ไม่พบรายการเมนู</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
