import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import type { SalesReport } from '../types';

export default function ReportsPage() {
  const [data, setData]       = useState<SalesReport | null>(null);
  const [start, setStart]     = useState('');
  const [end, setEnd]         = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const load = useCallback(async (customStart?: string, customEnd?: string) => {
    const s = customStart !== undefined ? customStart : start;
    const e = customEnd !== undefined ? customEnd : end;

    // Frontend Validation: เช็คว่า Start Date ไม่เลย End Date
    if (s && e && new Date(s) > new Date(e)) {
      setError('Start date cannot be after the end date.');
      return;
    }

    setLoading(true); 
    setError('');
    
    try {
      const params: Record<string, string> = {};
      if (s) params.startDate = s;
      if (e) params.endDate   = e;
      
      const { data: d } = await api.get<SalesReport>('/reports/sales', { params });
      setData(d);
    } catch { 
      setError('Failed to load sales report. Please try again.'); 
    } finally {
      setLoading(false);
    }
  }, [start, end]);

  // โหลดข้อมูลทั้งหมดครั้งแรกตอนเปิดหน้า
  useEffect(() => { 
    load('', ''); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">📊 Sales Reports</h1>

      {/* Filter Section */}
      <div className="card shadow-sm border border-gray-100 bg-white rounded-xl py-5 px-6">
        <div className="flex gap-4 items-end flex-wrap">
          <div>
            <label className="label font-medium mb-1.5 block text-gray-700 text-sm">Start Date</label>
            <input 
              type="date" 
              className="input w-44 shadow-sm" 
              value={start} 
              onChange={e => setStart(e.target.value)} 
            />
          </div>
          <div>
            <label className="label font-medium mb-1.5 block text-gray-700 text-sm">End Date</label>
            <input 
              type="date" 
              className="input w-44 shadow-sm" 
              value={end} 
              max={new Date().toISOString().split('T')[0]} // ไม่ให้เลือกเกินวันปัจจุบัน
              onChange={e => setEnd(e.target.value)} 
            />
          </div>
          <button 
            className="btn-primary py-2.5 px-6 shadow-sm disabled:opacity-50" 
            onClick={() => load()}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
          
          <button 
            className="btn-ghost py-2.5 px-4" 
            onClick={() => { setStart(''); setEnd(''); load('', ''); }}
          >
            Clear
          </button>
        </div>
        
        {start && (
          <p className="mt-3 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md inline-block border border-amber-200">
            <strong>⚠️ Note (BUG-005):</strong> Orders from {start} 00:00:00 may be excluded due to a system issue.
          </p>
        )}
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium shadow-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-16 text-gray-400 animate-pulse font-medium text-lg">
          Generating report…
        </div>
      )}

      {data && !loading && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card text-center shadow-sm border border-blue-100 bg-blue-50/30 rounded-xl py-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">฿{Number(data.totalRevenue).toFixed(2)}</div>
              <div className="text-sm font-medium text-blue-800/70 uppercase tracking-wide">Total Revenue</div>
            </div>
            <div className="card text-center shadow-sm border border-emerald-100 bg-emerald-50/30 rounded-xl py-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{data.totalOrders}</div>
              <div className="text-sm font-medium text-emerald-800/70 uppercase tracking-wide">Orders Paid</div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Top Selling Items */}
            {data.topItems.length > 0 && (
              <div className="card xl:col-span-1 shadow-sm border border-gray-100 bg-white rounded-xl">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">🏆 Top Selling Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        {['#', 'Item', 'Qty', 'Revenue'].map((h, i) => (
                          <th key={h} className={`py-3 px-2 text-gray-500 font-semibold uppercase text-xs ${i === 3 ? 'text-right' : i === 2 ? 'text-center' : 'text-left'}`}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {data.topItems.map((item, i) => (
                        <tr key={item.name} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-2.5 px-2 text-gray-400 font-medium">{i + 1}</td>
                          <td className="py-2.5 px-2 font-medium text-gray-800">{item.name}</td>
                          <td className="py-2.5 px-2 text-center text-gray-600">{item.quantity}</td>
                          <td className="py-2.5 px-2 font-semibold text-green-600 text-right">฿{item.revenue.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payment History */}
            <div className={`card shadow-sm border border-gray-100 bg-white rounded-xl ${data.topItems.length > 0 ? 'xl:col-span-2' : 'xl:col-span-3'}`}>
              <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">💳 Payment History</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      {['ID', 'Order#', 'Total', 'Paid', 'Change', 'Method', 'Time'].map((h, i) => (
                        <th key={h} className={`py-3 px-3 text-gray-500 font-semibold uppercase text-xs ${[2,3,4].includes(i) ? 'text-right' : 'text-left'}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.payments.map(p => {
                      const change = Number(p.change);
                      return (
                        <tr key={p.id} className={`transition-colors ${change < 0 ? 'bg-red-50/80 hover:bg-red-100/80' : 'hover:bg-gray-50/80'}`}>
                          <td className="py-3 px-3 text-gray-500 font-medium">{p.id}</td>
                          <td className="py-3 px-3 font-bold text-gray-800">#{p.orderId}</td>
                          <td className="py-3 px-3 text-right text-gray-600">฿{Number(p.totalAmount).toFixed(2)}</td>
                          <td className="py-3 px-3 text-right text-gray-800 font-medium">฿{Number(p.amountPaid).toFixed(2)}</td>
                          <td className={`py-3 px-3 text-right font-semibold ${change < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ฿{change.toFixed(2)}{change < 0 ? ' ⚠️' : ''}
                          </td>
                          <td className="py-3 px-3 capitalize text-gray-600">
                            <span className={`px-2 py-1 rounded-md text-[11px] font-bold tracking-wide border ${
                              p.method === 'cash' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                              p.method === 'qr' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                              'bg-purple-100 text-purple-700 border-purple-200'
                            }`}>
                              {String(p.method)}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-xs font-medium text-gray-400">
                            {new Date(p.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                          </td>
                        </tr>
                      );
                    })}
                    {data.payments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-gray-500">
                          <span className="text-3xl block mb-2">🧾</span>
                          <p className="font-medium">No payments found in this date range.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
