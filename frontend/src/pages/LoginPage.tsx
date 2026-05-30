import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { AxiosError } from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // แก้ไข: ย้ายการทำ Redirect ไปไว้ใน useEffect เพื่อป้องกัน Render Phase Update Error
  useEffect(() => {
    if (user) {
      // ใช้ replace: true เพื่อไม่ให้ผู้ใช้กดปุ่ม Back กลับมาหน้า Login ได้อีก
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // หากมี user แล้ว (กำลังรอ redirect) จะไม่แสดงฟอร์ม
  if (user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);
    
    try {
      await login(username, password);
      navigate('/', { replace: true });
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error ?? 'Login failed. Please check your credentials.');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3 hover:scale-110 transition-transform cursor-default">🍽️</div>
          <h1 className="text-2xl font-bold text-gray-900">RMS</h1>
          <p className="text-sm text-gray-500 mt-1">Restaurant Management System</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="label block mb-1">Username</label>
            <input 
              id="username"
              className="input w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
              type="text" 
              value={username} 
              required
              placeholder="admin / cashier1 / waiter1"
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <label htmlFor="password" className="label block mb-1">Password</label>
            <input 
              id="password"
              className="input w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
              type="password" 
              value={password} 
              required
              placeholder="••••••••"
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center gap-2 py-2.5 text-base mt-6 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in…
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-center text-gray-500">
          <p className="font-semibold mb-2 text-gray-600">Test Accounts</p>
          <div className="space-y-1.5">
            <p><span className="font-medium text-gray-800">admin</span> / Admin@123</p>
            <p><span className="font-medium text-gray-800">cashier1</span> / Cashier@123</p>
            <p><span className="font-medium text-gray-800">waiter1</span> / Waiter@123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
