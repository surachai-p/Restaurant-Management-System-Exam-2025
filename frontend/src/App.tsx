// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import PaymentPage from './pages/PaymentPage';
import ReportsPage from './pages/ReportsPage';
import type { Role } from './types';

// คอมโพเนนต์สำหรับจัดการสิทธิ์การเข้าถึง (Role-Based Access Control)
function PrivateRoute({ children, roles }: { children: React.ReactNode; roles?: Role[] }) {
  const { user } = useAuth();
  
  // ถ้าไม่ได้ล็อกอิน ให้ Redirect ไปหน้า Login
  if (!user) return <Navigate to="/login" replace />;
  
  // ถ้ามีการระบุ roles และ User ไม่มีสิทธิ์นั้น ให้ Redirect กลับหน้า Dashboard
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  
  return <>{children}</>;
}

// โครงสร้างหลักของหน้าเว็บ (แสดง Navbar และจัด Layout พื้นฐาน)
function Layout({ children }: { children: React.ReactNode }) {
  // ไม่ต้องเช็ค !user ซ้ำที่นี่แล้ว เพราะ PrivateRoute จัดการให้ก่อนที่ Layout จะถูกเรนเดอร์
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ======================= PUBLIC ROUTE ======================= */}
          <Route path="/login" element={<LoginPage />} />

          {/* ====================== PROTECTED ROUTES ==================== */}
          <Route path="/" element={<PrivateRoute><Layout><DashboardPage /></Layout></PrivateRoute>} />
          <Route path="/menu" element={<PrivateRoute><Layout><MenuPage /></Layout></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Layout><OrdersPage /></Layout></PrivateRoute>} />
          <Route path="/orders/:id" element={<PrivateRoute><Layout><OrderDetailPage /></Layout></PrivateRoute>} />
          <Route path="/payment/:orderId" element={<PrivateRoute><Layout><PaymentPage /></Layout></PrivateRoute>} />
          
          {/* เฉพาะ Admin และ Cashier เท่านั้นที่เข้าถึงหน้ารายงานได้ */}
          <Route 
            path="/reports" 
            element={
              <PrivateRoute roles={['admin', 'cashier']}>
                <Layout>
                  <ReportsPage />
                </Layout>
              </PrivateRoute>
            } 
          />

          {/* Fallback: ถ้าพิมพ์ URL มั่วๆ จะเด้งกลับมาหน้าแรก */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
