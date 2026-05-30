// src/components/Navbar.tsx
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // ฟังก์ชันช่วยเลือกสี Badge ตามสิทธิ์ใช้งาน เพื่อป้องกัน Tailwind คอมไพล์สีไม่ติด
  const getRoleBadgeClass = (role: string | undefined) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border border-red-500/30'
      case 'manager':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
      case 'waiter':
        return 'bg-green-500/20 text-green-400 border border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
    }
  }

  return (
    <nav className="bg-gray-900 text-white h-14 flex items-center px-6 shadow-lg">
      <span className="text-lg font-bold tracking-wide mr-8">🍽️ RMS</span>
      
      <div className="flex gap-1 flex-1">
        {[
          { to: '/', label: 'Dashboard', end: true },
          { to: '/menu', label: 'Menu', end: false },
          { to: '/orders', label: 'Orders', end: false },
          // แก้ไขเงื่อนไข: ต้องมีการล็อกอินก่อน และสิทธิ์ต้องไม่ใช่ waiter ถึงจะแสดงปุ่ม Reports
          ...(user && user.role !== 'waiter' ? [{ to: '/reports', label: 'Reports', end: false }] : []),
        ].map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-white/20 text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300">{user.name}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${getRoleBadgeClass(user.role)}`}>
            {user.role}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1 border border-gray-600 rounded-md text-gray-300 hover:border-red-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
