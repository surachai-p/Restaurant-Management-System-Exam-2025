// src/components/Navbar.tsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate('/login')
  }

  const navLinks = [
    { to: '/', label: 'Dashboard', end: true },
    { to: '/menu', label: 'Menu', end: false },
    { to: '/orders', label: 'Orders', end: false },
    ...(user?.role !== 'waiter' ? [{ to: '/reports', label: 'Reports', end: false }] : []),
  ]

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="text-lg font-bold tracking-wide flex items-center gap-2">
            <span>🍽️</span>
            <span>RMS</span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-1">
            {navLinks.map(({ to, label, end }) => (
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
        </div>

        {/* Desktop User Info & Logout */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm text-gray-300">{user?.name}</span>
          <span className={`badge-${user?.role} text-xs`}>{user?.role}</span>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 border border-gray-600 rounded-md text-gray-300 hover:border-red-400 hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <span className={`badge-${user?.role} text-xs`}>{user?.role}</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900 px-4 pt-2 pb-4 space-y-2">
          <div className="py-2 border-b border-gray-800 text-sm text-gray-400 flex justify-between items-center">
            <span>Signed in as <strong className="text-white">{user?.name}</strong></span>
            <span className={`badge-${user?.role} text-xs`}>{user?.role}</span>
          </div>

          <div className="space-y-1 pt-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full text-center py-2.5 px-4 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
