// src/pages/MenuPage.tsx
import { useEffect, useState, FormEvent } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import type { MenuItem, Category } from '../types'
import type { AxiosError } from 'axios'

const cats: Category[] = ['food', 'drink', 'dessert']
const catColors: Record<Category, string> = {
  food: 'bg-orange-100 text-orange-700',
  drink: 'bg-blue-100 text-blue-700',
  dessert: 'bg-pink-100 text-pink-700',
}

export default function MenuPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<MenuItem[]>([])
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<Category | ''>('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<MenuItem | null>(null)
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'food' as Category })
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const params: Record<string, string> = {}
      if (search) params.search = search
      if (cat) params.category = cat
      const { data } = await api.get<MenuItem[]>('/menu', { params })
      setItems(data)
    } catch { 
      setMsg({ type: 'error', text: 'Failed to load menu' }) 
    } finally {
      setLoading(false)
    }
  }

  // ปรับให้โหลดใหม่เมื่อ cat เปลี่ยนแปลง
  useEffect(() => { load() }, [cat])

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    // แก้ไข: แปลง price เป็น number ก่อนส่ง
    const payload = { ...form, price: Number(form.price) }
    
    try {
      if (editing) {
        await api.put(`/menu/${editing.id}`, payload)
        setMsg({ type: 'success', text: 'Menu item updated' })
      } else {
        await api.post('/menu', payload)
        setMsg({ type: 'success', text: 'Menu item added' })
      }
      setShowForm(false)
      load()
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setMsg({ type: 'error', text: e.response?.data?.error ?? 'Failed to save' })
    }
  }

  // ... (ส่วน return เหมือนเดิม แต่อย่าลืมเช็คการเรียกฟังก์ชันให้ตรงตามนี้)
  // [คงส่วน UI เดิมไว้ แต่ตรวจสอบให้แน่ใจว่าใช้ payload ใน handleSave แล้ว]
}
