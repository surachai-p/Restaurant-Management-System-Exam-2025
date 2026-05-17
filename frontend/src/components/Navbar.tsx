// src/components/Navbar.tsx — Sidebar navigation
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const icons: Record<string, JSX.Element> = {
  Dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Menu: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  Orders: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  Reports: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/menu', label: 'Menu', end: false },
    { to: '/orders', label: 'Orders', end: false },
    ...(user?.role !== 'waiter' ? [{ to: '/reports', label: 'Reports', end: false }] : []),
  ]

  const roleColors: Record<string, string> = {
    admin: 'bg-rose-500/20 text-rose-300',
    cashier: 'bg-violet-500/20 text-violet-300',
    waiter: 'bg-sky-500/20 text-sky-300',
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-stone-900 flex flex-col z-30">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
            R
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight tracking-tight">RMS</p>
            <p className="text-stone-500 text-xs">Restaurant Manager</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-100'
              }`
            }
          >
            {icons[label]}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-stone-800">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-stone-300 font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-stone-200 text-sm font-medium truncate">{user?.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${roleColors[user?.role ?? ''] ?? 'bg-stone-700 text-stone-400'}`}>
              {user?.role}
            </span>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/login') }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-stone-500 hover:bg-rose-500/10 hover:text-rose-400 text-sm font-medium transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
