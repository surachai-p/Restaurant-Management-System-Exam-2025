import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import type { Order, MenuItem } from '../types';
import type { AxiosError } from 'axios';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [order, setOrder]     = useState<Order | null>(null);
  const [menu, setMenu]       = useState<MenuItem[]>([]);
  const [selItem, setSel]     = useState('');
  const [qty, setQty]         = useState(1);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [msg, setMsg]         = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ใช้ useCallback และเพิ่ม try-catch ป้องกันหน้าขาวเวลาโหลดข้อมูลพลาด
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [o, m] = await Promise.all([
        api.get<Order>(`/orders/${id}`),
        api.get<MenuItem[]>('/menu'),
      ]);
      setOrder(o.data); 
      setMenu(m.data);
    } catch (error) {
      console.error('Error loading order:', error);
      setMsg({ type: 'error', text: 'Failed to load order details. It might have been deleted.' });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { 
    load(); 
  }, [load]);

  const addItem = async () => {
    if (!selItem || qty < 1) return;
    setIsProcessing(true);
    try {
      await api.post(`/orders/${id}/items`, { menuItemId: Number(selItem), quantity: qty });
      setMsg({ type: 'success', text: 'Item added successfully' }); 
      setSel(''); 
      setQty(1); 
      await load();
    } catch (err) {
      const e = err as AxiosError<{ error: string }>;
      setMsg({ type: 'error', text: e.response?.data?.error ?? 'Failed to add item' });
    } finally {
      setIsProcessing(false);
    }
  };

  const removeItem = async (itemId: number) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    try { 
      await api.delete(`/orders/${id}/items/${itemId}`); 
      await load(); 
    } catch { 
      setMsg({ type: 'error', text: 'Failed to remove item' }); 
    }
  };

  const confirmOrder = async () => {
    setIsProcessing(true);
    try { 
      await api.put(`/orders/${id}/confirm`); 
      setMsg({ type: 'success', text: 'Order confirmed successfully!' }); 
      await load(); 
    } catch (err) {
      const e = err as AxiosError<{ error: string }>;
      setMsg({ type: 'error', text: e.response?.data?.error ?? 'Failed to confirm order' });
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this entire order?')) return;
    try { 
      await api.put(`/orders/${id}/cancel`); 
      navigate('/orders'); 
    } catch { 
      setMsg({ type: 'error', text: 'Failed to cancel order' }); 
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400 animate-pulse">Loading order details…</div>;
  if (!order)  return <div className="text-center py-20 text-gray-500 font-medium">Order not found 🍽️</div>;

  const isOpen      = order.status === 'open';
  const isConfirmed = order.status === 'confirmed';

  // Helper สำหรับจัดการสีสถานะออเดอร์ (ป้องกันปัญหา Tailwind Purge)
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'confirmed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-4">
          <Link to="/orders" className="btn-ghost btn-sm px-3 py-1.5 border border-gray-200 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium">
            ← Back
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Order #{order.id} <span className="text-gray-400 mx-1">—</span> Table {order.table?.tableNumber ?? order.tableId}</h1>
          <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="flex gap-2">
          {isConfirmed && <Link to={`/payment/${order.id}`} className="btn-success shadow-sm">💳 Pay Now</Link>}
          {(isOpen || isConfirmed) && <button className="btn-danger shadow-sm" onClick={cancelOrder}>Cancel Order</button>}
        </div>
      </div>

      {msg && (
        <div className={`px-4 py-3 rounded-lg text-sm font-medium shadow-sm border ${
          msg.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order items */}
        <div className="lg:col-span-2 card bg-white shadow-sm border border-gray-100 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h2>
          
          {!order.items?.length ? (
            <div className="text-gray-400 text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p>No items added yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left py-3 px-2 text-gray-500 font-semibold uppercase text-xs">Item</th>
                    <th className="text-center py-3 px-2 text-gray-500 font-semibold uppercase text-xs">Qty</th>
                    <th className="text-right py-3 px-2 text-gray-500 font-semibold uppercase text-xs">Unit Price</th>
                    <th className="text-right py-3 px-2 text-gray-500 font-semibold uppercase text-xs">Subtotal</th>
                    {isOpen && <th className="px-2"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {order.items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-2 font-medium text-gray-800">{item.menuItem?.name ?? 'Unknown Item'}</td>
                      <td className="py-3 px-2 text-center text-gray-600">{item.quantity}</td>
                      <td className="py-3 px-2 text-right text-gray-600">฿{Number(item.unitPrice).toFixed(2)}</td>
                      <td className="py-3 px-2 text-right font-semibold text-gray-900">฿{Number(item.subtotal).toFixed(2)}</td>
                      {isOpen && (
                        <td className="py-3 px-2 text-right">
                          <button 
                            onClick={() => removeItem(item.id)} 
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                            title="Remove Item"
                          >
                            ✕
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="text-right text-xl font-bold mt-4 pt-4 border-t border-gray-100 text-gray-900">
            Total: <span className="text-green-600 ml-2">฿{Number(order.totalAmount).toFixed(2)}</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {isOpen && (
            <div className="card bg-white shadow-sm border border-blue-100 rounded-xl p-5 bg-blue-50/10">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Item</h2>
              <div className="space-y-4">
                <div>
                  <label className="label font-medium mb-1 block text-sm">Menu Item</label>
                  <select className="input w-full" value={selItem} onChange={e => setSel(e.target.value)}>
                    <option value="">Select an item…</option>
                    {menu.map(m => (
                      <option key={m.id} value={m.id}>{m.name} — ฿{Number(m.price).toFixed(2)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label font-medium mb-1 block text-sm">Quantity</label>
                  <input className="input w-full" type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} />
                </div>
                <button 
                  className="btn-primary w-full justify-center py-2 shadow-sm disabled:opacity-50" 
                  onClick={addItem}
                  disabled={!selItem || isProcessing}
                >
                  {isProcessing ? 'Adding...' : '+ Add to Order'}
                </button>
              </div>
            </div>
          )}
          
          <div className="card bg-white shadow-sm border border-gray-100 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Actions</h2>
            {isOpen && (
              <button 
                className="btn-success w-full justify-center py-2.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={confirmOrder}
                disabled={!order.items?.length || isProcessing}
              >
                ✓ Confirm Order
              </button>
            )}
            {isConfirmed && (
              <Link to={`/payment/${order.id}`} className="btn-success w-full justify-center flex py-2.5 shadow-sm">
                💳 Process Payment
              </Link>
            )}
            {(order.status === 'paid' || order.status === 'cancelled') && (
              <div className={`text-center py-3 rounded-lg border font-medium ${
                order.status === 'paid' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
              }`}>
                This order has been {order.status}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
