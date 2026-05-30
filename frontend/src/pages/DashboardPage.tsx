import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { RestaurantTable, Order, DailyReport } from '../types';

const fmt = (n: string | number) => Number(n).toFixed(2);

export default function DashboardPage() {
  const { user } = useAuth();
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [openOrders, setOrders] = useState<Order[]>([]);
  const [daily, setDaily] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // แก้ไข: เปลี่ยนมาใช้ async/await และ try-catch เพื่อจัดการ Error ได้ปลอดภัยขึ้น
    const fetchDashboardData = async () => {
      try {
        const requests = [
          api.get<RestaurantTable[]>('/orders/tables'),
          api.get<Order[]>('/orders?status=open'),
          // แก้ไข: เปลี่ยนจาก user! เป็น user? เพื่อป้องกัน Error กรณี Context โหลดไม่ทัน
          user?.role !== 'waiter' ? api.get<DailyReport>('/reports/daily') : Promise.resolve({ data: null }),
        ] as const;
        
        const [t, o, d] = await Promise.all(requests);
        setTables(t.data);
        setOrders(o.data);
        setDaily(d.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) return <div className="text-center py-20 text-gray-400 animate-pulse">Loading…</div>;

  const occupied = tables.filter(t => t.status === 'occupied').length;
  const available = tables.filter(t => t.status === 'available').length;

  const tableColor: Record<string, string> = {
    available: 'bg-green-50 border-green-200 text-green-700',
    occupied:  'bg-orange-50 border-orange-200 text-orange-700',
    reserved:  'bg-purple-50 border-purple-200 text-purple-700',
  };

  // เพิ่ม: Helper function สำหรับสี Badge ของสถานะออเดอร์
  const getOrderStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'served': return 'bg-green-100 text-green-800 border-green-200';
      case 'paid': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <span className="text-sm text-gray-500">Welcome, {user?.name || 'User'}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tables', value: tables.length, color: 'text-gray-900' },
          { label: 'Occupied', value: occupied, color: 'text-orange-600' },
          { label: 'Available', value: available, color: 'text-green-600' },
          { label: 'Open Orders', value: openOrders.length, color: 'text-blue-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Daily Report (Hidden for Waiters) */}
      {daily && (
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600">฿{fmt(daily.totalRevenue)}</div>
            <div className="text-xs text-blue-500 mt-1 uppercase tracking-wider">Today's Revenue</div>
          </div>
          <div className="card text-center bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600">{daily.totalOrders}</div>
            <div className="text-xs text-blue-500 mt-1 uppercase tracking-wider">Today's Orders Paid</div>
          </div>
        </div>
      )}

      {/* Table Map */}
      <div className="card bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Table Status</h2>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {tables.map(t => (
            <div 
              key={t.id}
              className={`border-2 rounded-xl p-3 text-center transition-transform hover:-translate-y-1 ${tableColor[t.status] ?? 'bg-gray-50 border-gray-200 text-gray-500'}`}
            >
              <div className="text-lg font-bold">#{t.tableNumber}</div>
              <div className="text-[10px] mt-1 uppercase tracking-wider font-semibold">{t.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Orders */}
      {openOrders.length > 0 && (
        <div className="card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Open Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Order#', 'Table', 'Items', 'Total', 'Status', ''].map(h => (
                    <th key={h} className="py-3 px-4 text-left text-xs text-gray-500 uppercase font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {openOrders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-gray-700">#{o.id}</td>
                    <td className="py-3 px-4 text-gray-600">Table {o.table?.tableNumber ?? o.tableId}</td>
                    <td className="py-3 px-4 text-gray-600">{o.items?.length ?? 0} items</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">฿{fmt(o.totalAmount)}</td>
                    <td className="py-3 px-4">
                      {/* แก้ไข: ใช้ Helper function เพื่อจัดสี Badge ตามสถานะออเดอร์ */}
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${getOrderStatusColor(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link 
                        to={`/orders/${o.id}`} 
                        className="inline-block bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
