// src/pages/ReportsPage.tsx
import { useEffect, useState } from 'react'
import api from '../services/api'
import type { SalesReport } from '../types'

export default function ReportsPage() {
  const [data, setData]   = useState<SalesReport | null>(null)
  const [start, setStart] = useState('')
  const [end, setEnd]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true); setError('')
    try {
      const params: Record<string, string> = {}
      if (start) params.startDate = start
      if (end)   params.endDate   = end
      const { data: d } = await api.get<SalesReport>('/reports/sales', { params })
      setData(d)
    } catch { setError('โหลดรายงานไม่สำเร็จ') }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const methodIcon: Record<string, string> = { cash: '💵', card: '💳', qr: '📲' }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">รายงานยอดขาย</h1>
        <p className="text-sm text-stone-500 mt-0.5">สรุปยอดขายและรายการชำระเงิน</p>
      </div>

      {/* Filter */}
      <div className="card">
        <div className="flex gap-4 items-end flex-wrap">
          {[{ label: 'ตั้งแต่วันที่', val: start, set: setStart }, { label: 'ถึงวันที่', val: end, set: setEnd }].map(f => (
            <div key={f.label}>
              <label className="label">{f.label}</label>
              <input type="date" className="input w-44" value={f.val} onChange={e => f.set(e.target.value)} />
            </div>
          ))}
          <button className="btn-primary" onClick={load}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            สร้างรายงาน
          </button>
          {(start || end) && (
            <button className="btn-ghost" onClick={() => { setStart(''); setEnd(''); }}>ล้างตัวกรอง</button>
          )}
        </div>
      </div>

      {error && <div className="px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium">{error}</div>}

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {data && !loading && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/25">
              <p className="text-amber-100 text-xs font-bold uppercase tracking-wider mb-1">รายได้รวม</p>
              <p className="text-3xl font-black">฿{Number(data.totalRevenue).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-gradient-to-br from-stone-700 to-stone-900 rounded-2xl p-6 text-white shadow-lg">
              <p className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">ออเดอร์ทั้งหมด</p>
              <p className="text-3xl font-black">{data.totalOrders} รายการ</p>
            </div>
          </div>

          {/* Top items */}
          {data.topItems.length > 0 && (
            <div className="card">
              <h2 className="font-bold text-stone-900 mb-4">เมนูขายดี Top 5</h2>
              <div className="space-y-3">
                {data.topItems.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                      i === 0 ? 'bg-amber-500 text-white' : i === 1 ? 'bg-stone-300 text-stone-700' : i === 2 ? 'bg-orange-300 text-orange-800' : 'bg-stone-100 text-stone-500'
                    }`}>{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-stone-800">{item.name}</p>
                      <p className="text-xs text-stone-400">{item.quantity} ชิ้น</p>
                    </div>
                    <span className="font-bold text-emerald-600">฿{item.revenue.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment history */}
          <div className="card p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100">
              <h2 className="font-bold text-stone-900">ประวัติการชำระเงิน</h2>
            </div>
            {data.payments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-3xl mb-2">📊</div>
                <p className="text-stone-400 text-sm">ไม่มีรายการในช่วงเวลาที่เลือก</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-100">
                      {['#', 'ออเดอร์', 'ยอดรวม', 'รับมา', 'ทอน', 'วิธี', 'เวลา'].map(h => (
                        <th key={h} className="py-3 px-4 text-left text-xs text-stone-500 uppercase tracking-wider font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {data.payments.map(p => {
                      const change = Number(p.change)
                      return (
                        <tr key={p.id} className="hover:bg-stone-50/60">
                          <td className="py-3 px-4 text-stone-400 text-xs">{p.id}</td>
                          <td className="py-3 px-4 font-bold text-stone-800">#{p.orderId}</td>
                          <td className="py-3 px-4 font-semibold">฿{Number(p.totalAmount).toFixed(2)}</td>
                          <td className="py-3 px-4">฿{Number(p.amountPaid).toFixed(2)}</td>
                          <td className={`py-3 px-4 font-bold ${change < 0 ? 'text-rose-500' : 'text-emerald-600'}`}>
                            ฿{change.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">{methodIcon[String(p.method)] ?? ''} {String(p.method)}</td>
                          <td className="py-3 px-4 text-xs text-stone-400">{new Date(p.createdAt).toLocaleString('th-TH')}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
