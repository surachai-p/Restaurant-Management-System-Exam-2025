// src/pages/PaymentPage.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import type { Order, PaymentMethod } from '../types'
import type { AxiosError } from 'axios'

interface PaymentResult {
  payment: { totalAmount: number; amountPaid: number; change: number; method: string }
  change: number
}

const methodIcon: Record<string, string> = { cash: '💵', card: '💳', qr: '📲' }
const methodLabel: Record<string, string> = { cash: 'เงินสด', card: 'บัตรเครดิต', qr: 'QR Code' }

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const [order, setOrder]       = useState<Order | null>(null)
  const [amountPaid, setAmount] = useState('')
  const [method, setMethod]     = useState<PaymentMethod>('cash')
  const [result, setResult]     = useState<PaymentResult | null>(null)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get<Order>(`/orders/${orderId}`).then(r => { setOrder(r.data); setLoading(false) })
  }, [orderId])

  const handlePay = async () => {
    setError('')
    try {
      const { data } = await api.post<PaymentResult>('/payments', {
        orderId: Number(orderId),
        amountPaid: parseFloat(amountPaid),
        method,
      })
      setResult(data)
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setError(e.response?.data?.error ?? 'ชำระเงินไม่สำเร็จ')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!order) return <div className="text-center py-20 text-stone-400">ไม่พบออเดอร์</div>

  const total   = Number(order.totalAmount)
  const paid    = parseFloat(amountPaid) || 0
  const preview = paid - total

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="page-title">รับชำระเงิน</h1>
        <p className="text-sm text-stone-500 mt-0.5">ออเดอร์ #{order.id} · โต๊ะ {order.table?.tableNumber}</p>
      </div>

      {result ? (
        /* Success screen */
        <div className="card text-center py-10">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-stone-900 mb-1">ชำระเงินสำเร็จ!</h2>
          <p className="text-stone-500 text-sm mb-6">ออเดอร์ #{order.id} เสร็จสิ้น</p>

          <div className="bg-stone-50 rounded-2xl p-5 text-left space-y-3 mb-6">
            {[
              { label: 'ยอดที่ต้องชำระ', value: `฿${Number(result.payment.totalAmount).toFixed(2)}`, bold: false },
              { label: 'รับเงินมา', value: `฿${Number(result.payment.amountPaid).toFixed(2)}`, bold: false },
              { label: 'ทอนเงิน', value: `฿${Number(result.change).toFixed(2)}`, bold: true },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center">
                <span className="text-stone-500 text-sm">{r.label}</span>
                <span className={`${r.bold ? 'text-xl font-black text-emerald-600' : 'font-semibold text-stone-800'}`}>{r.value}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-stone-200 flex justify-between text-xs text-stone-400">
              <span>วิธีชำระ</span>
              <span>{methodIcon[result.payment.method]} {methodLabel[result.payment.method]}</span>
            </div>
          </div>
          <button className="btn-primary w-full justify-center py-3" onClick={() => navigate('/orders')}>
            กลับหน้าออเดอร์
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Order summary */}
          <div className="card p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100">
              <h2 className="font-bold text-stone-900">รายการอาหาร</h2>
            </div>
            <div className="divide-y divide-stone-50">
              {order.items?.map(i => (
                <div key={i.id} className="flex justify-between px-6 py-3 text-sm">
                  <span className="text-stone-700">{i.menuItem?.name} <span className="text-stone-400">× {i.quantity}</span></span>
                  <span className="font-semibold text-stone-800">฿{Number(i.subtotal).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-amber-50 flex justify-between items-center">
              <span className="text-sm font-bold text-stone-600 uppercase tracking-wide">ยอดรวม</span>
              <span className="text-2xl font-black text-stone-900">฿{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment form */}
          <div className="card space-y-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium">
                ✕ {error}
              </div>
            )}

            {/* Method selection */}
            <div>
              <label className="label">วิธีชำระเงิน</label>
              <div className="grid grid-cols-3 gap-2">
                {(['cash', 'card', 'qr'] as PaymentMethod[]).map(m => (
                  <button key={m} type="button" onClick={() => setMethod(m)}
                    className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                      method === m
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                    }`}>
                    <div className="text-xl mb-0.5">{methodIcon[m]}</div>
                    {methodLabel[m]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">จำนวนเงินที่รับมา (บาท)</label>
              <input className="input text-xl font-bold text-right" type="number" step="0.01" value={amountPaid}
                placeholder={total.toFixed(2)}
                onChange={e => setAmount(e.target.value)} />
              {amountPaid && (
                <div className={`mt-2 flex justify-between text-sm font-semibold px-1 ${preview >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  <span>เงินทอน</span>
                  <span>฿{preview.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button className="btn-ghost justify-center py-3" onClick={() => navigate(-1)}>ยกเลิก</button>
              <button className="btn-success justify-center py-3 text-base" onClick={handlePay} disabled={!amountPaid}>
                รับชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
