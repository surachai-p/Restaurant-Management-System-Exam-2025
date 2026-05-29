// src/pages/PaymentPage.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import type { Order, PaymentMethod } from '../types'
import type { AxiosError } from 'axios'

interface PaymentResult {
  payment: {
    id?: number
    totalAmount: number
    amountPaid: number
    change: number
    method: PaymentMethod
    createdAt?: string
  }
  change: number
  message?: string
}

const methodLabels: Record<PaymentMethod, string> = {
  cash: 'เงินสด',
  card: 'บัตรเครดิต/เดบิต',
  qr: 'QR Payment',
}

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const [order, setOrder]       = useState<Order | null>(null)
  const [amountPaid, setAmount] = useState('')
  const [method, setMethod]     = useState<PaymentMethod>('cash')
  const [result, setResult]     = useState<PaymentResult | null>(null)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(true)
  const [paying, setPaying]     = useState(false)

  useEffect(() => {
    api.get<Order>(`/orders/${orderId}`)
      .then(r => setOrder(r.data))
      .catch(() => setError('ไม่พบข้อมูลออเดอร์'))
      .finally(() => setLoading(false))
  }, [orderId])

  const total = Number(order?.totalAmount ?? 0)
  const paid = Number.parseFloat(amountPaid) || 0
  const change = Math.max(paid - total, 0)
  const underpaid = amountPaid !== '' && paid < total
  const canPay = Boolean(order) && !paying && paid >= total && order?.status === 'confirmed'

  const handlePay = async () => {
    if (!order) return
    setError('')

    if (paid < total) {
      setError('จำนวนเงินที่รับมาต้องมากกว่าหรือเท่ากับยอดรวม')
      return
    }

    setPaying(true)
    try {
      const { data } = await api.post<PaymentResult>('/payments', {
        orderId: Number(orderId),
        amountPaid: paid,
        method,
      })
      setResult(data)
      setOrder({ ...order, status: 'paid', payment: data.payment as any })
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setError(e.response?.data?.error ?? 'ชำระเงินไม่สำเร็จ')
    } finally {
      setPaying(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) return <div className="text-center py-20 text-stone-400">Loading...</div>
  if (!order)  return <div className="text-center py-20 text-stone-400">Order not found</div>

  const receiptPaid = Number(result?.payment.amountPaid ?? paid)
  const receiptChange = Number(result?.change ?? change)
  const receiptDate = result?.payment.createdAt
    ? new Date(result.payment.createdAt)
    : new Date()

  return (
    <div className="payment-page max-w-6xl mx-auto space-y-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-red-800">Payment</p>
          <h1 className="text-3xl font-bold text-stone-950">ชำระเงิน Order #{order.id}</h1>
          <p className="text-sm text-stone-500 mt-1">Table {order.table?.tableNumber ?? order.tableId}</p>
        </div>
        <Link to={`/orders/${order.id}`} className="btn-ghost">Back to Order</Link>
      </div>

      {error && (
        <div className="no-print px-4 py-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}

      {order.status !== 'confirmed' && !result && (
        <div className="no-print px-4 py-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-md text-sm">
          ออเดอร์นี้ไม่อยู่ในสถานะ confirmed จึงยังไม่สามารถชำระเงินได้
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
        <section className="card no-print">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-xl font-semibold text-stone-950">รายการอาหาร</h2>
              <p className="text-sm text-stone-500">ตรวจสอบรายการก่อนรับชำระเงิน</p>
            </div>
            <span className={`badge-${order.status}`}>{order.status}</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="py-2 text-left text-stone-500 font-medium">รายการ</th>
                  <th className="py-2 text-center text-stone-500 font-medium">จำนวน</th>
                  <th className="py-2 text-right text-stone-500 font-medium">ราคา</th>
                  <th className="py-2 text-right text-stone-500 font-medium">รวม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {order.items?.map(item => (
                  <tr key={item.id}>
                    <td className="py-3 font-medium text-stone-900">{item.menuItem?.name ?? 'Unknown item'}</td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-right">THB {Number(item.unitPrice).toFixed(2)}</td>
                    <td className="py-3 text-right font-semibold">THB {Number(item.subtotal).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-lg bg-red-950 p-5 text-white">
            <div className="flex justify-between text-sm text-red-100">
              <span>ยอดที่ต้องชำระ</span>
              <span>Order #{order.id}</span>
            </div>
            <div className="mt-2 text-right text-4xl font-bold">THB {total.toFixed(2)}</div>
          </div>
        </section>

        <section className="card no-print">
          {!result ? (
            <>
              <h2 className="text-xl font-semibold text-stone-950">รับชำระเงิน</h2>
              <p className="text-sm text-stone-500 mt-1">ระบบจะคำนวณเงินทอนให้อัตโนมัติ</p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="label">วิธีชำระเงิน</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['cash', 'card', 'qr'] as PaymentMethod[]).map(value => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setMethod(value)}
                        className={`rounded-md border px-3 py-3 text-sm font-medium transition-colors ${
                          method === value
                            ? 'border-red-800 bg-red-800 text-white'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-red-200 hover:bg-red-50'
                        }`}
                      >
                        {methodLabels[value]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">จำนวนเงินที่รับมา (THB)</label>
                  <input
                    className="input text-2xl font-semibold"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amountPaid}
                    placeholder={total.toFixed(2)}
                    onChange={e => setAmount(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[total, total + 100, total + 500].map(value => (
                    <button
                      key={value}
                      type="button"
                      className="btn-ghost justify-center"
                      onClick={() => setAmount(value.toFixed(2))}
                    >
                      {value.toFixed(0)}
                    </button>
                  ))}
                </div>

                <div className={`rounded-lg border p-5 ${
                  underpaid ? 'border-red-200 bg-red-50' : 'border-emerald-200 bg-emerald-50'
                }`}>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">ยอดรวม</span>
                    <span className="font-semibold">THB {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-stone-600">รับเงิน</span>
                    <span className="font-semibold">THB {paid.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between border-t mt-3 pt-3 text-xl font-bold ${
                    underpaid ? 'border-red-200 text-red-800' : 'border-emerald-200 text-emerald-800'
                  }`}>
                    <span>{underpaid ? 'ยังขาด' : 'เงินทอน'}</span>
                    <span>THB {Math.abs(paid - total).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button className="btn-success flex-1 justify-center py-3" onClick={handlePay} disabled={!canPay}>
                    {paying ? 'กำลังชำระเงิน...' : 'ชำระเงิน'}
                  </button>
                  <button className="btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl text-emerald-700">
                OK
              </div>
              <h2 className="text-2xl font-bold text-stone-950">ชำระเงินสำเร็จ</h2>
              <p className="mt-1 text-sm text-stone-500">สามารถพิมพ์ใบเสร็จหรือกลับไปหน้า Orders ได้ทันที</p>

              <div className="mt-6 rounded-lg bg-stone-50 p-5 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">ยอดรวม</span>
                  <span className="font-semibold">THB {Number(result.payment.totalAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-stone-500">รับเงิน</span>
                  <span className="font-semibold">THB {Number(result.payment.amountPaid).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 mt-3 pt-3 text-xl font-bold text-red-800">
                  <span>เงินทอน</span>
                  <span>THB {Number(result.change).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button className="btn-primary flex-1 justify-center" onClick={handlePrint}>พิมพ์ใบเสร็จ</button>
                <button className="btn-ghost flex-1 justify-center" onClick={() => navigate('/orders')}>Back to Orders</button>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="receipt-print card bg-white">
        <div className="text-center border-b border-stone-200 pb-4">
          <h2 className="text-2xl font-bold text-stone-950">RMS</h2>
          <p className="text-sm text-stone-500">ใบเสร็จรับเงิน</p>
          <p className="text-xs text-stone-400 mt-1">{receiptDate.toLocaleString('th-TH')}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <span className="text-stone-500">Order</span>
          <span className="text-right font-semibold">#{order.id}</span>
          <span className="text-stone-500">Table</span>
          <span className="text-right font-semibold">{order.table?.tableNumber ?? order.tableId}</span>
          <span className="text-stone-500">Payment</span>
          <span className="text-right font-semibold">{methodLabels[result?.payment.method ?? method]}</span>
        </div>

        <table className="mt-5 w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="py-2 text-left font-semibold">รายการ</th>
              <th className="py-2 text-center font-semibold">Qty</th>
              <th className="py-2 text-right font-semibold">รวม</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map(item => (
              <tr key={item.id} className="border-b border-stone-100">
                <td className="py-2">{item.menuItem?.name ?? 'Unknown item'}</td>
                <td className="py-2 text-center">{item.quantity}</td>
                <td className="py-2 text-right">{Number(item.subtotal).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>ยอดรวม</span>
            <span className="font-semibold">THB {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>รับเงิน</span>
            <span className="font-semibold">THB {receiptPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-stone-200 pt-3 text-lg font-bold">
            <span>เงินทอน</span>
            <span>THB {receiptChange.toFixed(2)}</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-stone-500">Thank you for dining with RMS</p>
      </section>
    </div>
  )
}
