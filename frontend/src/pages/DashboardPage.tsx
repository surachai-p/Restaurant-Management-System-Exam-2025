// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import type { RestaurantTable, Order, DailyReport } from '../types'

const fmt = (n: string | number) => Number(n).toLocaleString('th-TH', { minimumFractionDigits: 2 })

const tableStatusStyle: Record<string, { bg: string; dot: string; text: string }> = {
  available: { bg: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100', dot: 'bg-emerald-500', text: 'text-emerald-700' },
  occupied:  { bg: 'bg-orange-50 border-orange-200 hover:bg-orange-100', dot: 'bg-orange-500', text: 'text-orange-700' },
  reserved:  { bg: 'bg-purple-50 border-purple-200 hover:bg-purple-100', dot: 'bg-purple-500', text: 'text-purple-700' },
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [tables, setTables]     = useState<RestaurantTable[]>([])
  const [openOrders, setOrders] = useState<Order[]>([])
  const [daily, setDaily]       = useState<DailyReport | null>(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const requests = [
      api.get<RestaurantTable[]>('/orders/tables'),
      api.get<Order[]>('/orders?status=open'),
      user!.role !== 'waiter' ? api.get<DailyReport>('/reports/daily') : Promise.resolve({ data: null }),
    ] as const
    Promise.all(requests).then(([t, o, d]) => {
      setTables(t.data); setOrders(o.data); setDaily(d.data)
    }).finally(() => setLoading(false))
  }, [user])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const occupied  = tables.filter(t => t.status === 'occupied').length
  const available = tables.filter(t => t.status === 'available').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-stone-500 font-medium">{new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <h1 className="text-3xl font-black text-stone-900 tracking-tight mt-0.5">สวัสดี, {user?.name?.split(' ')[0]} 👋</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'โต๊ะทั้งหมด', value: tables.length, icon: '🪑', color: 'text-stone-700', bg: 'bg-stone-50' },
          { label: 'โต๊ะว่าง', value: available, icon: '✅', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'โต๊ะไม่ว่าง', value: occupied, icon: '🔴', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'ออเดอร์เปิด', value: openOrders.length, icon: '📋', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border border-stone-100 p-5 ${s.bg}`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-stone-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue (admin/cashier only) */}
      {daily && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/25">
            <p className="text-amber-100 text-xs font-bold uppercase tracking-wider mb-1">รายได้วันนี้</p>
            <p className="text-4xl font-black">฿{fmt(daily.totalRevenue)}</p>
          </div>
          <div className="bg-gradient-to-br from-stone-700 to-stone-900 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">ออเดอร์ชำระแล้ว</p>
            <p className="text-4xl font-black">{daily.totalOrders}</p>
          </div>
        </div>
      )}

      {/* Table map */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-stone-900">แผนผังโต๊ะ</h2>
          <div className="flex items-center gap-4 text-xs text-stone-500">
            {[{ dot: 'bg-emerald-500', label: 'ว่าง' }, { dot: 'bg-orange-500', label: 'ไม่ว่าง' }, { dot: 'bg-purple-500', label: 'จอง' }].map(l => (
              <span key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${l.dot}`} />
                {l.label}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {tables.map(t => {
            const s = tableStatusStyle[t.status] ?? tableStatusStyle.available
            return (
              <div key={t.id} className={`border-2 rounded-xl p-2.5 text-center cursor-default transition-colors ${s.bg}`}>
                <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${s.dot}`} />
                <div className={`text-sm font-bold ${s.text}`}>{t.tableNumber}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Open orders */}
      {openOrders.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-bold text-stone-900 mb-4">ออเดอร์ที่เปิดอยู่</h2>
          <div className="divide-y divide-stone-50">
            {openOrders.map(o => (
              <div key={o.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                    {o.table?.tableNumber ?? o.tableId}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">ออเดอร์ #{o.id}</p>
                    <p className="text-xs text-stone-500">{o.items?.length ?? 0} รายการ · {new Date(o.createdAt).toLocaleTimeString('th-TH')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-stone-800">฿{fmt(o.totalAmount)}</span>
                  <Link to={`/orders/${o.id}`} className="btn-primary btn-sm">ดูออเดอร์</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {openOrders.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-stone-500 font-medium">ไม่มีออเดอร์ที่เปิดอยู่</p>
        </div>
      )}
    </div>
  )
}
