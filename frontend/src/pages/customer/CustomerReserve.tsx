// src/pages/customer/CustomerReserve.tsx
import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import publicApi, { type Reservation } from '../../services/publicApi'
import type { AxiosError } from 'axios'

export default function CustomerReserve() {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    partySize: '2',
    date: '',
    time: '18:00',
    note: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [result, setResult]   = useState<Reservation | null>(null)

  const minDate = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const reservedAt = new Date(`${form.date}T${form.time}:00`).toISOString()
      const { data } = await publicApi.post<Reservation>('/reservations', {
        customerName: form.customerName,
        phone: form.phone,
        partySize: Number(form.partySize),
        reservedAt,
        note: form.note || undefined,
      })
      setResult(data)
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setError(e.response?.data?.error ?? 'จองโต๊ะไม่สำเร็จ กรุณาลองใหม่')
    } finally { setLoading(false) }
  }

  const statusBg: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
    seated: 'bg-blue-100 text-blue-700',
  }
  const statusTH: Record<string, string> = {
    pending: 'รอยืนยัน', confirmed: 'ยืนยันแล้ว', cancelled: 'ยกเลิก', seated: 'นั่งแล้ว'
  }

  if (result) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm bg-stone-900 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-1">จองสำเร็จ!</h2>
          <p className="text-stone-400 text-sm mb-6">บันทึกรหัสนี้ไว้เพื่อตรวจสอบสถานะ</p>

          <div className="bg-stone-950 rounded-2xl p-5 mb-6">
            <p className="text-stone-500 text-xs mb-1">รหัสการจอง</p>
            <p className="text-3xl font-black text-amber-400 tracking-widest">{result.token}</p>
          </div>

          <div className="space-y-2 text-sm text-left mb-6">
            {[
              { label: 'ชื่อ', value: result.customerName },
              { label: 'โทรศัพท์', value: result.phone },
              { label: 'วัน-เวลา', value: new Date(result.reservedAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) },
              { label: 'จำนวนคน', value: `${result.partySize} คน` },
              { label: 'สถานะ', value: (
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusBg[result.status]}`}>
                  {statusTH[result.status]}
                </span>
              )},
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center">
                <span className="text-stone-500">{r.label}</span>
                <span className="text-stone-200 font-medium">{r.value as any}</span>
              </div>
            ))}
          </div>

          <Link to="/customer" className="block w-full py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-2xl transition-colors">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    )
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

        <div className="text-4xl mb-3">📅</div>
        <h1 className="text-3xl font-black text-white mb-1">จองโต๊ะ</h1>
        <p className="text-stone-500 mb-8">กรอกข้อมูลเพื่อจองโต๊ะล่วงหน้า</p>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-950 border border-red-800 text-red-400 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">ชื่อ-นามสกุล *</label>
            <input required value={form.customerName}
              onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))}
              placeholder="ชื่อของคุณ"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors placeholder:text-stone-600" />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">เบอร์โทรศัพท์ *</label>
            <input required value={form.phone} type="tel"
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              placeholder="08x-xxx-xxxx"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors placeholder:text-stone-600" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">จำนวนคน *</label>
              <select required value={form.partySize}
                onChange={e => setForm(p => ({ ...p, partySize: e.target.value }))}
                className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} คน</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">เวลา *</label>
              <input required type="time" value={form.time} min="10:00" max="21:00"
                onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">วันที่ *</label>
            <input required type="date" value={form.date} min={minDate}
              onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">หมายเหตุ</label>
            <textarea value={form.note} rows={2}
              onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
              placeholder="แพ้อาหาร, ต้องการที่นั่งพิเศษ ฯลฯ"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors resize-none placeholder:text-stone-600" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white font-bold rounded-2xl transition-colors text-base mt-2 flex items-center justify-center gap-2">
            {loading
              ? <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>กำลังจอง…</>
              : '📅 ยืนยันการจอง'}
          </button>
        </form>
      </div>
    </div>
  )
}
