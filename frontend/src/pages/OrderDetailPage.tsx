// src/pages/OrderDetailPage.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import type { Order, MenuItem } from '../types'
import type { AxiosError } from 'axios'

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [menu, setMenu]   = useState<MenuItem[]>([])
  const [selItem, setSel] = useState('')
  const [qty, setQty]     = useState(1)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const load = async () => {
    const [o, m] = await Promise.all([
      api.get<Order>(`/orders/${id}`),
      api.get<MenuItem[]>('/menu'),
    ])
    setOrder(o.data); setMenu(m.data); setLoading(false)
  }

  useEffect(() => { load() }, [id])

  const addItem = async () => {
    if (!selItem) return
    try {
      await api.post(`/orders/${id}/items`, { menuItemId: Number(selItem), quantity: qty })
      setMsg({ type: 'success', text: 'เพิ่มรายการแล้ว' }); setSel(''); setQty(1); load()
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setMsg({ type: 'error', text: e.response?.data?.error ?? 'เพิ่มไม่สำเร็จ' })
    }
  }

  const removeItem = async (itemId: number) => {
    if (!confirm('ลบรายการนี้?')) return
    try { await api.delete(`/orders/${id}/items/${itemId}`); load() }
    catch { setMsg({ type: 'error', text: 'ลบไม่สำเร็จ' }) }
  }

  const confirmOrder = async () => {
    try { await api.put(`/orders/${id}/confirm`); setMsg({ type: 'success', text: 'ยืนยันออเดอร์แล้ว!' }); load() }
    catch (err) {
      const e = err as AxiosError<{ error: string }>
      setMsg({ type: 'error', text: e.response?.data?.error ?? 'ยืนยันไม่สำเร็จ' })
    }
  }

  const cancelOrder = async () => {
    if (!window.confirm('ยกเลิกออเดอร์นี้?')) return
    try { await api.put(`/orders/${id}/cancel`); navigate('/orders') }
    catch { setMsg({ type: 'error', text: 'ยกเลิกไม่สำเร็จ' }) }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!order) return <div className="text-center py-20 text-stone-400">ไม่พบออเดอร์</div>

  const isOpen      = order.status === 'open'
  const isConfirmed = order.status === 'confirmed'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <Link to="/orders" className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-stone-200 text-stone-500 hover:bg-stone-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-stone-900">ออเดอร์ #{order.id}</h1>
              <span className={`badge-${order.status}`}>{order.status}</span>
            </div>
            <p className="text-sm text-stone-500">โต๊ะ {order.table?.tableNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {isConfirmed && <Link to={`/payment/${order.id}`} className="btn-success">💳 ชำระเงิน</Link>}
          {(isOpen || isConfirmed) && <button className="btn-danger" onClick={cancelOrder}>ยกเลิก</button>}
        </div>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          msg.type === 'error' ? 'bg-rose-50 border border-rose-200 text-rose-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
        }`}>
          {msg.type === 'success' ? '✓' : '✕'} {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order items */}
        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100">
            <h2 className="font-bold text-stone-900">รายการอาหาร</h2>
          </div>
          {!order.items?.length ? (
            <div className="text-center py-12">
              <div className="text-3xl mb-2">🍽️</div>
              <p className="text-stone-400 text-sm">ยังไม่มีรายการ</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-stone-50">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between px-6 py-3.5">
                    <div className="flex-1">
                      <p className="font-semibold text-stone-900 text-sm">{item.menuItem?.name ?? 'Unknown'}</p>
                      <p className="text-xs text-stone-400">฿{Number(item.unitPrice).toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-stone-800">฿{Number(item.subtotal).toFixed(2)}</span>
                      {isOpen && (
                        <button onClick={() => removeItem(item.id)}
                          className="w-6 h-6 rounded-lg bg-rose-100 text-rose-500 hover:bg-rose-200 transition-colors flex items-center justify-center text-xs font-bold">
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-stone-600 uppercase tracking-wide">ยอดรวม</span>
                  <span className="text-2xl font-black text-stone-900">฿{Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {isOpen && (
            <div className="card">
              <h2 className="font-bold text-stone-900 mb-4">เพิ่มรายการ</h2>
              <div className="space-y-3">
                <div>
                  <label className="label">รายการอาหาร</label>
                  <select className="input" value={selItem} onChange={e => setSel(e.target.value)}>
                    <option value="">— เลือกรายการ —</option>
                    {menu.map(m => (
                      <option key={m.id} value={m.id}>{m.name} — ฿{Number(m.price).toFixed(2)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">จำนวน</label>
                  <input className="input" type="number" min={1} value={qty}
                    onChange={e => setQty(Number(e.target.value))} />
                </div>
                <button className="btn-primary w-full justify-center" onClick={addItem}>
                  เพิ่มลงออเดอร์
                </button>
              </div>
            </div>
          )}

          <div className="card">
            <h2 className="font-bold text-stone-900 mb-4">การดำเนินการ</h2>
            {isOpen && (
              <button className="btn-success w-full justify-center" onClick={confirmOrder}
                disabled={!order.items?.length}>
                ✓ ยืนยันออเดอร์
              </button>
            )}
            {isConfirmed && (
              <Link to={`/payment/${order.id}`} className="btn-success w-full justify-center flex">
                💳 รับชำระเงิน
              </Link>
            )}
            {(order.status === 'paid' || order.status === 'cancelled') && (
              <div className="text-center py-2">
                <span className={`badge-${order.status} text-sm`}>{order.status}</span>
              </div>
            )}
          </div>

          {/* Order info */}
          <div className="card">
            <h2 className="font-bold text-stone-900 mb-3">ข้อมูลออเดอร์</h2>
            <div className="space-y-2 text-sm">
              {[
                { label: 'พนักงาน', value: order.waiter?.name ?? '-' },
                { label: 'เวลาเปิด', value: new Date(order.createdAt).toLocaleString('th-TH') },
              ].map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-stone-400">{r.label}</span>
                  <span className="font-medium text-stone-700">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
