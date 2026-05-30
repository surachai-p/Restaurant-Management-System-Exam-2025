import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Order, RestaurantTable, OrderStatus } from '../types';
import type { AxiosError } from 'axios';

const STATUSES: (OrderStatus | '')[] = ['', 'open', 'confirmed', 'paid', 'cancelled'];

export default function OrdersPage() {
  const [orders, setOrders]       = useState<Order[]>([]);
  const [tables, setTables]       = useState<RestaurantTable[]>([]);
  const [statusFilter, setStatus] = useState<OrderStatus | ''>('open');
  const [loading, setLoading]     = useState(true);
  const [isCreating, setIsCreating] = useState(false); // ป้องกันกดสร้างรัวๆ
  const [showNew, setShowNew]     = useState(false);
  const [newTableId, setNewTable] = useState('');
  const [errMsg, setErrMsg]       = useState('');
  const navigate = useNavigate();

  // เพิ่ม useCallback และ try...catch...finally ป้องกันหน้าค้างถ้าโหลดไม่สำเร็จ
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [o, t] = await Promise.all([
        api.get<Order[]>(`/orders${statusFilter ? `?status=${statusFilter}` : ''}`),
        api.get<RestaurantTable[]>('/orders/tables'),
      ]);
      setOrders(o.data); 
      setTables(t.data); 
    } catch (error) {
      console.error('Failed to load orders or tables:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { 
    load(); 
  }, [load]);

  const handleNewOrder = async () => {
    if (!newTableId) { 
      setErrMsg('Please select a table'); 
      return; 
    }
    
    setIsCreating(true);
    setErrMsg('');
    
    try {
      const { data } = await api.post<Order>('/orders', { tableId: Number(newTableId) });
      navigate(`/orders/${data.id}`);
    } catch (err) {
      const e = err as AxiosError<{ error: string }>;
      setErrMsg(e.response?.data?.error ?? 'Failed to open order');
    } finally {
      setIsCreating(false);
    }
  };

  const available = tables.filter(t => t.status === 'available');

  // Helper สำหรับจัดการสีสถานะ (ป้องกัน Tailwind Purge Issue)
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <button 
          className="btn-success px-4 py-2 shadow-sm" 
          onClick={() => { setShowNew(!showNew); setErrMsg(''); setNewTable(''); }}
        >
          {showNew ? '✕ Cancel' : '+ New Order'}
        </button>
      </div>

      {showNew && (
        <div className="card border-2 border-green-200 bg-green-50/30 shadow-sm p-5 rounded-xl">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Open New Order</h2>
          {errMsg && (
            <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg font-medium">
              {errMsg}
            </div>
          )}
          <div className="flex gap-3 items-center flex-wrap">
            <select 
              className="input w-64 shadow-sm" 
              value={newTableId} 
              onChange={e => setNewTable(e.target.value)}
              disabled={isCreating}
            >
              <option value="">Select an available table…</option>
              {available.map(t => (
                <option key={t.id} value={t.id}>Table #{t.tableNumber} (Capacity: {t.capacity})</option>
              ))}
            </select>
            <button 
              className="btn-success px-6 shadow-sm disabled:opacity-50" 
              onClick={handleNewOrder}
              disabled={isCreating || !newTableId}
            >
              {isCreating ? 'Opening...' : 'Open Order'}
            </button>
            <button 
              className="btn-ghost" 
              onClick={() => setShowNew(false)}
              disabled={isCreating}
            >
              Cancel
            </button>
          </div>
          {available.length === 0 && (
            <p className="text-sm text-red-500 mt-3 font-medium">⚠️ No tables are currently available.</p>
          )}
        </div>
      )}

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map(s => (
          <button 
            key={s} 
            onClick={() => setStatus(s)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              statusFilter === s 
                ? 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="capitalize">{s || 'All Orders'}</span>
          </button>
        ))}
      </div>

      <div className="card bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden p-0">
        {loading ? (
          <div className="text-center py-16 text-gray-400 animate-pulse font-medium">Loading orders…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/50">
                <tr className="border-b border-gray-100">
                  {['Order #', 'Table', 'Items', 'Total', 'Status', 'Time', 'Actions'].map((h, i) => (
                    <th key={h} className={`py-3.5 px-4 text-xs text-gray-500 uppercase font-bold tracking-wider ${i === 6 ? 'text-right' : 'text-left'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">#{o.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">Table {o.table?.tableNumber ?? o.tableId}</td>
                    <td className="py-3 px-4 text-gray-600">{o.items?.length ?? 0}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">฿{Number(o.totalAmount).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${getStatusColor(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-gray-400">
                      {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <Link to={`/orders/${o.id}`} className="btn-primary btn-sm px-3 shadow-sm">View</Link>
                        {o.status === 'confirmed' && (
                          <Link to={`/payment/${o.id}`} className="btn-success btn-sm px-3 shadow-sm">Pay</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-500">
                      <span className="text-3xl block mb-2">📋</span>
                      <p className="font-medium">No orders found for this status</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
