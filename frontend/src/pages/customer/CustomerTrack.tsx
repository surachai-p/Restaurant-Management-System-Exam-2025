// src/pages/customer/CustomerTrack.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import publicApi, { type CustomerOrder, type Reservation } from '../../services/publicApi'
import type { AxiosError } from 'axios'

type TrackMode = 'order' | 'reservation'

const orderStatusBg: Record<string, string> = {
  open: 'bg-amber-100 text-amber-700',
  preparing: 'bg-blue-100 text-blue-700',
  served: 'bg-emerald-100 text-emerald-700',
  paid: 'bg-stone-200 text-stone-600',
  cancelled: 'bg-red-100 text-red-700',
}
const orderStatusTH: Record<string, string> = {
  open: 'รอดำเนินการ', preparing: 'กำลังเตรียม', served: 'เสิร์ฟแล้ว', paid: 'ชำระแล้ว', cancelled: 'ยกเลิก'
}
const resStatusBg: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
  seated: 'bg-blue-100 text-blue-700',
}
const resStatusTH: Record<string, string> = {
  pending: 'รอยืนยัน', confirmed: 'ยืนยันแล้ว', cancelled: 'ยกเลิก', seated: 'นั่งแล้ว'
}

export default function CustomerTrack() {
  const [mode, setMode] = useState<TrackMode>('order')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<CustomerOrder | null>(null)
  const [reservation, setReservation] = useState<Reservation | null>(null)

  const handleSearch = async () => {
    if (!input.trim()) return
    setError(''); setLoading(true); setOrder(null); setReservation(null)
    try {
      if (mode === 'order') {
        const id = Number(input.trim())
        if (!id || isNaN(id)) { setError('รหัสออเดอร์ต้องเป็นตัวเลข'); setLoading(false); return }
        const { data } = await publicApi.get<CustomerOrder>(`/orders/${id}`)
        setOrder(data)
      } else {
        const { data } = await publicApi.get<Reservation>(`/reservations/${input.trim().toUpperCase()}`)
        setReservation(data)
      }
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      if (e.response?.status === 404) {
        setError(mode === 'order' ? 'ไม่พบออเดอร์นี้' : 'ไม่พบรหัสการจองนี้')
      } else {
        setError(e.response?.data?.error ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่')
      }
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-stone-950 px-4 py-12">
      <div className="max-w-sm mx-auto">
        <Link to="/customer" className="flex items-center gap-2 text-stone-500 hover:text-stone-300 text-sm mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          กลับ
        </Link>

        <div className="text-4xl mb-3">🔍</div>
        <h1 className="text-3xl font-black text-white mb-1">ติดตามสถานะ</h1>
        <p className="text-stone-500 mb-8">ตรวจสอบออเดอร์หรือการจองของคุณ</p>

        {/* Mode toggle */}
        <div className="flex bg-stone-900 rounded-2xl p-1 mb-6">
          {(['order', 'reservation'] as TrackMode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setInput(''); setError(''); setOrder(null); setReservation(null) }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === m ? 'bg-amber-500 text-white shadow' : 'text-stone-500 hover:text-stone-300'}`}>
              {m === 'order' ? '🍽️ ออเดอร์' : '📅 การจอง'}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder={mode === 'order' ? 'รหัสออเดอร์ (ตัวเลข)' : 'รหัสการจอง (เช่น AB12CD34)'}
            className="flex-1 px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors placeholder:text-stone-600"
          />
          <button onClick={handleSearch} disabled={loading || !input.trim()}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-bold rounded-2xl transition-colors text-sm">
            {loading
              ? <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              : 'ค้นหา'}
          </button>
        </div>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-950 border border-red-800 text-red-400 rounded-2xl text-sm">
            {error}
          </div>
        )}

        {/* Order result */}
        {order && (
          <div className="bg-stone-900 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-500 text-xs">ออเดอร์ #{order.id}</p>
                <p className="text-white font-black text-lg">{order.customerName || 'ลูกค้า'}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${orderStatusBg[order.status] ?? 'bg-stone-700 text-stone-300'}`}>
                {orderStatusTH[order.status] ?? order.status}
              </span>
            </div>

            {order.table && (
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">โต๊ะ</span>
                <span className="text-stone-200">โต๊ะ {order.table.tableNumber}</span>
              </div>
            )}

            {order.items && order.items.length > 0 && (
              <div className="border-t border-stone-800 pt-4 space-y-2">
                <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">รายการ</p>
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-300">{item.menuItem?.name ?? `รายการ #${item.id}`} × {item.quantity}</span>
                    <span className="text-stone-200">฿{Number(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-stone-800 pt-4 flex justify-between font-black">
              <span className="text-stone-400">รวมทั้งหมด</span>
              <span className="text-amber-400 text-lg">฿{Number(order.totalAmount).toFixed(2)}</span>
            </div>

            {order.payment && (
              <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-4 space-y-1.5 text-sm">
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">ชำระเงินแล้ว</p>
                <div className="flex justify-between"><span className="text-emerald-700">วิธีชำระ</span><span className="text-emerald-300">{order.payment.method === 'cash' ? 'เงินสด' : order.payment.method}</span></div>
                <div className="flex justify-between"><span className="text-emerald-700">รับเงิน</span><span className="text-emerald-300">฿{Number(order.payment.amountPaid).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-emerald-700">เงินทอน</span><span className="text-emerald-300">฿{Number(order.payment.change).toFixed(2)}</span></div>
              </div>
            )}

            <div className="text-xs text-stone-600 text-right">
              {new Date(order.createdAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
          </div>
        )}

        {/* Reservation result */}
        {reservation && (
          <div className="bg-stone-900 rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-stone-500 text-xs">รหัสการจอง</p>
                <p className="text-amber-400 font-black text-xl tracking-widest">{reservation.token}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${resStatusBg[reservation.status] ?? 'bg-stone-700 text-stone-300'}`}>
                {resStatusTH[reservation.status] ?? reservation.status}
              </span>
            </div>

            {[
              { label: 'ชื่อ', value: reservation.customerName },
              { label: 'โทรศัพท์', value: reservation.phone },
              { label: 'วัน-เวลา', value: new Date(reservation.reservedAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) },
              { label: 'จำนวนคน', value: `${reservation.partySize} คน` },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-stone-500">{r.label}</span>
                <span className="text-stone-200">{r.value}</span>
              </div>
            ))}

            {reservation.note && (
              <div className="border-t border-stone-800 pt-3">
                <p className="text-stone-500 text-xs mb-1">หมายเหตุ</p>
                <p className="text-stone-300 text-sm">{reservation.note}</p>
              </div>
            )}

            <div className="text-xs text-stone-600 text-right pt-1">
              จองเมื่อ {new Date(reservation.createdAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
