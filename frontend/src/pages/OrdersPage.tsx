// src/pages/OrdersPage.tsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import type { Order, RestaurantTable, OrderStatus } from '../types'
import type { AxiosError } from 'axios'

const STATUSES: (OrderStatus | '')[] = ['', 'open', 'confirmed', 'paid', 'cancelled']
const statusLabel: Record<string, string> = { '': 'ทั้งหมด', open: 'เปิด', confirmed: 'ยืนยัน', paid: 'ชำระแล้ว', cancelled: 'ยกเลิก' }

export default function OrdersPage() {
  const [orders, setOrders]       = useState<Order[]>([])
  const [tables, setTables]       = useState<RestaurantTable[]>([])
  const [statusFilter, setStatus] = useState<OrderStatus | ''>('open')
  const [loading, setLoading]     = useState(true)
  const [showNew, setShowNew]     = useState(false)
  const [newTableId, setNewTable] = useState('')
  const [errMsg, setErrMsg]       = useState('')
  const navigate = useNavigate()

  const load = async () => {
    setLoading(true)
    const [o, t] = await Promise.all([
      api.get<Order[]>(`/orders${statusFilter ? `?status=${statusFilter}` : ''}`),
      api.get<RestaurantTable[]>('/orders/tables'),
    ])
    setOrders(o.data); setTables(t.data); setLoading(false)
  }

  useEffect(() => { load() }, [statusFilter])

  const handleNewOrder = async () => {
    if (!newTableId) { setErrMsg('กรุณาเลือกโต๊ะ'); return }
    try {
      const { data } = await api.post<Order>('/orders', { tableId: Number(newTableId) })
      navigate(`/orders/${data.id}`)
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setErrMsg(e.response?.data?.error ?? 'เปิดออเดอร์ไม่สำเร็จ')
    }
  }

  const available = tables.filter(t => t.status === 'available')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">ออเดอร์</h1>
          <p className="text-sm text-stone-500 mt-0.5">จัดการออเดอร์ทั้งหมด</p>
        </div>
        <button className="btn-success" onClick={() => { setShowNew(!showNew); setErrMsg('') }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          ออเดอร์ใหม่
        </button>
      </div>

      {/* New order panel */}
      {showNew && (
        <div className="card border-2 border-emerald-200 bg-emerald-50/30">
          <h2 className="text-base font-bold text-stone-800 mb-3">🪑 เปิดออเดอร์ใหม่</h2>
          {errMsg && <div className="mb-3 text-sm text-rose-600 font-medium">{errMsg}</div>}
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-52">
              <label className="label">เลือกโต๊ะที่ว่าง</label>
              <select className="input" value={newTableId} onChange={e => setNewTable(e.target.value)}>
                <option value="">— เลือกโต๊ะ —</option>
                {available.map(t => (
                  <option key={t.id} value={t.id}>โต๊ะ #{t.tableNumber} (รองรับ {t.capacity} คน)</option>
                ))}
              </select>
            </div>
            <button className="btn-success" onClick={handleNewOrder}>เปิดออเดอร์</button>
            <button className="btn-ghost" onClick={() => setShowNew(false)}>ยกเลิก</button>
          </div>
          {available.length === 0 && <p className="text-xs text-rose-500 mt-2 font-medium">ไม่มีโต๊ะว่างในขณะนี้</p>}
        </div>
      )}

      {/* Status tabs */}
      <div className="flex gap-1.5 flex-wrap p-1 bg-stone-200/50 rounded-2xl w-fit">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setStatus(s)}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              statusFilter === s
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}>
            {statusLabel[s]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-stone-400 font-medium">ไม่พบออเดอร์</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  {['ออเดอร์', 'โต๊ะ', 'รายการ', 'ยอดรวม', 'สถานะ', 'เวลา', ''].map(h => (
                    <th key={h} className="py-3 px-5 text-left text-xs text-stone-500 uppercase tracking-wider font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-stone-800">#{o.id}</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs">
                        {o.table?.tableNumber ?? o.tableId}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-stone-600">{o.items?.length ?? 0} รายการ</td>
                    <td className="py-3.5 px-5 font-bold text-stone-900">฿{Number(o.totalAmount).toFixed(2)}</td>
                    <td className="py-3.5 px-5"><span className={`badge-${o.status}`}>{statusLabel[o.status] ?? o.status}</span></td>
                    <td className="py-3.5 px-5 text-xs text-stone-400">{new Date(o.createdAt).toLocaleTimeString('th-TH')}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex gap-2">
                        <Link to={`/orders/${o.id}`} className="btn-primary btn-sm">ดู</Link>
                        {o.status === 'confirmed' && (
                          <Link to={`/payment/${o.id}`} className="btn-success btn-sm">ชำระ</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
