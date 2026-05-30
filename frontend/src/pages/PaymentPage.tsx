import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Order, PaymentMethod } from '../types';
import type { AxiosError } from 'axios';

interface PaymentResult {
  payment: { totalAmount: number; amountPaid: number; change: number; method: string };
  change: number;
}

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  
  const [order, setOrder]       = useState<Order | null>(null);
  const [amountPaid, setAmount] = useState('');
  const [method, setMethod]     = useState<PaymentMethod>('cash');
  const [result, setResult]     = useState<PaymentResult | null>(null);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); // ป้องกันกดปุ่มจ่ายเงินรัวๆ

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const r = await api.get<Order>(`/orders/${orderId}`);
        setOrder(r.data);
      } catch (err) {
        console.error('Failed to load order:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const total   = Number(order?.totalAmount || 0);
  const paid    = parseFloat(amountPaid) || 0;
  const preview = paid - total;

  const handlePay = async () => {
    // Frontend Guard: ป้องกันการจ่ายเงินน้อยกว่ายอดจริงก่อนส่งไป Backend
    if (paid < total) {
      setError('Amount paid cannot be less than the total amount.');
      return;
    }

    setError('');
    setIsProcessing(true);
    
    try {
      const { data } = await api.post<PaymentResult>('/payments', {
        orderId: Number(orderId),
        amountPaid: paid,
        method,
      });
      setResult(data);
    } catch (err) {
      const e = err as AxiosError<{ error: string }>;
      setError(e.response?.data?.error ?? 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400 animate-pulse font-medium">Loading payment details…</div>;
  if (!order)  return <div className="text-center py-20 text-gray-500 font-medium">Order not found</div>;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="btn-ghost btn-sm px-3 py-1 border border-gray-200">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900">💳 Payment — Order #{order.id}</h1>
      </div>

      {result ? (
        <div className="card text-center shadow-sm border border-green-100 bg-white p-8 rounded-xl">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Successful!</h2>
          
          <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-5 space-y-3 text-sm text-left shadow-inner">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Total Amount</span>
              <span className="font-bold text-gray-800 text-base">฿{Number(result.payment.totalAmount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Amount Paid</span>
              <span className="text-gray-800">฿{Number(result.payment.amountPaid).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Payment Method</span>
              <span className="text-gray-800 capitalize">{result.payment.method}</span>
            </div>
            <div className={`flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200 mt-2 ${
              result.change < 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              <span>Change</span>
              <span>฿{Number(result.change).toFixed(2)}{result.change < 0 ? ' ⚠️' : ''}</span>
            </div>
          </div>

          {/* เผื่อไว้ในกรณีที่ Backend ยอมให้ผ่าน (ซึ่งเราดักใน Frontend ไว้แล้ว) */}
          {result.change < 0 && (
            <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-left font-medium">
              ⚠️ <strong>BUG-001 DETECTED:</strong> System accepted underpayment!
              Change is negative (฿{Number(result.change).toFixed(2)}).
              This should have returned HTTP 400.
            </div>
          )}
          
          <button className="btn-primary w-full mt-6 py-3 shadow-sm" onClick={() => navigate('/orders')}>
            Back to Orders
          </button>
        </div>
      ) : (
        <div className="card shadow-sm border border-gray-100 bg-white rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Order Summary</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-2.5 px-2 text-gray-500 font-medium uppercase text-xs">Item</th>
                  <th className="text-center py-2.5 px-2 text-gray-500 font-medium uppercase text-xs">Qty</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 font-medium uppercase text-xs">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {order.items?.map(i => (
                  <tr key={i.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2 text-gray-800 font-medium">{i.menuItem?.name}</td>
                    <td className="py-3 px-2 text-center text-gray-600">{i.quantity}</td>
                    <td className="py-3 px-2 text-right text-gray-800">฿{Number(i.subtotal).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-end mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-gray-500 font-semibold">Total to Pay</span>
            <span className="text-3xl font-bold text-green-600">฿{total.toFixed(2)}</span>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium shadow-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="label font-medium mb-1.5 block text-gray-700">Payment Method</label>
              <select className="input w-full shadow-sm" value={method} onChange={e => setMethod(e.target.value as PaymentMethod)}>
                <option value="cash">Cash 💵</option>
                <option value="card">Credit/Debit Card 💳</option>
                <option value="qr">QR PromptPay 📱</option>
              </select>
            </div>
            
            <div>
              <label className="label font-medium mb-1.5 block text-gray-700">Amount Paid (THB)</label>
              <input 
                className={`input text-xl w-full font-semibold shadow-sm ${amountPaid && preview < 0 ? 'border-red-300 focus:ring-red-200' : ''}`} 
                type="number" 
                step="0.01" 
                min={total}
                value={amountPaid}
                placeholder={`Minimum: ฿${total.toFixed(2)}`}
                onChange={e => setAmount(e.target.value)} 
              />
              {amountPaid && (
                <p className={`text-sm mt-2 font-medium flex items-center gap-1 ${preview >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {preview >= 0 ? '✓' : '⚠️'} Change: ฿{preview.toFixed(2)}
                  {preview < 0 && ' (Underpayment)'}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button 
                className="btn-success flex-1 justify-center py-3.5 shadow-md text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all" 
                onClick={handlePay} 
                disabled={!amountPaid || preview < 0 || isProcessing} // ปิดปุ่มถ้ายอดไม่พอ หรือกำลังโหลด
              >
                {isProcessing ? 'Processing...' : 'Process Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
