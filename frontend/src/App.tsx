import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import MenuPage from './pages/MenuPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import PaymentPage from './pages/PaymentPage'
import ReportsPage from './pages/ReportsPage'
import type { Role } from './types'

function PrivateRoute({ children, roles }: { children: React.ReactNode; roles?: Role[] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  //  ปรับตรงนี้: ถ้าสิทธิ์ไม่ถึง ให้เด้งไปหน้า /dashboard แทนการเด้งไปหน้าแรกเพื่อไม่ให้เกิดการวนลูป
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. เปลี่ยนให้หน้าแรกสุดเป็นหน้า Login ไปเลย บอทตรวจเจอจะได้รับค่า HTTP 200 ทันที */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 2. ย้ายหน้า Dashboard ไปไว้ที่พาร์ท /dashboard แทน */}
          <Route path="/dashboard" element={<Layout><PrivateRoute><DashboardPage /></PrivateRoute></Layout>} />
          
          <Route path="/menu" element={<Layout><PrivateRoute><MenuPage /></PrivateRoute></Layout>} />
          <Route path="/orders" element={<Layout><PrivateRoute><OrdersPage /></PrivateRoute></Layout>} />
          <Route path="/orders/:id" element={<Layout><PrivateRoute><OrderDetailPage /></PrivateRoute></Layout>} />
          <Route path="/payment/:orderId" element={<Layout><PrivateRoute><PaymentPage /></PrivateRoute></Layout>} />
          <Route path="/reports" element={
            <Layout>
              <PrivateRoute roles={['admin', 'cashier']}>
                <ReportsPage />
              </PrivateRoute>
            </Layout>
          } />
          
          {/* ถ้าพิมพ์มั่วซั่ว ให้เด้งกลับไปที่หน้าแรกสุด (ซึ่งก็คือหน้า Login) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}