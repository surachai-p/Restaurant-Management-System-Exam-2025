// src/pages/PaymentQueuePage.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import type { Order } from '../types'

export default function PaymentQueuePage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get<Order[]>('/orders?status=confirmed')
      .then(r => setOrders(r.data))
      .catch(() => setError('Failed to load payment queue'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payment</h1>
          <p className="text-sm text-gray-500 mt-1">Confirmed orders waiting for payment</p>
        </div>
        <span className="badge-confirmed">{orders.length} orders</span>
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="card">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No confirmed orders waiting for payment</p>
            <Link to="/orders" className="btn-primary mt-4">Go to Orders</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Order#', 'Table', 'Items', 'Total', 'Status', ''].map(h => (
                    <th key={h} className="py-2.5 px-3 text-left text-xs text-gray-500 uppercase font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-bold">#{order.id}</td>
                    <td className="py-3 px-3">Table {order.table?.tableNumber ?? order.tableId}</td>
                    <td className="py-3 px-3">{order.items?.length ?? 0}</td>
                    <td className="py-3 px-3 font-semibold">THB {Number(order.totalAmount).toFixed(2)}</td>
                    <td className="py-3 px-3"><span className={`badge-${order.status}`}>{order.status}</span></td>
                    <td className="py-3 px-3 text-right">
                      <Link to={`/payment/${order.id}`} className="btn-success btn-sm">Pay</Link>
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
