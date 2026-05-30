// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import type { RestaurantTable, Order, DailyReport } from '../types'

const fmt = (n: string | number) => Number(n).toFixed(2)

export default function DashboardPage() {
  const { user } = useAuth()
  const [tables, setTables] = useState<RestaurantTable[]>([])
  const [openOrders, setOrders] = useState<Order[]>([])
  const [daily, setDaily] = useState<DailyReport | null>(null)
  const [loading, setLoading] = useState(true)

  // ป้องกันการทำงานก่อนมี User
  useEffect(() => {
    if (!user) return

    const fetchDashboardData = async () => {
      try {
        const [t, o, d] = await Promise.all([
          api.get<RestaurantTable[]>('/orders/tables').catch(() => ({ data: [] })),
          api.get<Order[]>('/orders?status=open').catch(() => ({ data: [] })),
          user.role !== 'waiter' 
            ? api.get<DailyReport>('/reports/daily').catch(() => ({ data: null }))
            : Promise.resolve({ data: null }),
        ])
        setTables(t.data)
        setOrders(o.data)
        setDaily(d.data)
      } catch (err) {
        console.error("Dashboard Load Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [user])

  if (loading) return <div className="text-center py-20 text-gray-400">Loading…</div>

  const occupied = tables.filter(t => t.status === 'occupied').length
  const available = tables.filter(t => t.status === 'available').length

  // แก้ไขปัญหา Tailwind ไม่คอมไพล์สี: ใช้ฟังก์ชัน Map แทน
  const getStatusBadge = (status: string) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold"
    if (status === 'pending') return `${base} bg-yellow-100 text-yellow-700`
    if (status === 'preparing') return `${base} bg-blue-100 text-blue-700`
    return `${base} bg-gray-100 text-gray-700`
  }

  return (
    <div className="space-y-6">
      {/* ... (ส่วนหัวและ Stats เหมือนเดิม) ... */}
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* (ตัดส่วนแสดงผลที่เหลือมาแปะให้ตรงตามโครงสร้าง) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {/* ... Stats cards ... */}
      </div>

      {/* Table Map และ Order Table (ใช้ getStatusBadge แทน badge-${o.status}) */}
      <td className="py-2.5 px-3"><span className={getStatusBadge(o.status)}>{o.status}</span></td>
      
      {/* ... โค้ดส่วนที่เหลือ ... */}
    </div>
  )
}
