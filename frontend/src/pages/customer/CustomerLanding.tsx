// src/pages/customer/CustomerLanding.tsx
import { Link } from 'react-router-dom'

export default function CustomerLanding() {
  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center text-white font-black text-4xl mx-auto mb-6 shadow-2xl shadow-amber-500/40">
          R
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
          ยินดีต้อนรับ
        </h1>
        <p className="text-stone-400 text-lg mb-12 max-w-sm">
          เลือกบริการที่คุณต้องการด้านล่าง
        </p>

        {/* Action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
          <Link to="/customer/reserve"
            className="group bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800 rounded-3xl p-8 text-left transition-all duration-200">
            <div className="text-4xl mb-4">📅</div>
            <h2 className="text-xl font-black text-white mb-1">จองโต๊ะล่วงหน้า</h2>
            <p className="text-stone-500 text-sm">เลือกวัน เวลา และจำนวนคน รับรหัสยืนยันทันที</p>
            <div className="mt-4 flex items-center gap-2 text-amber-500 text-sm font-semibold">
              จองเลย
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link to="/customer/order"
            className="group bg-amber-500 hover:bg-amber-400 rounded-3xl p-8 text-left transition-all duration-200 shadow-lg shadow-amber-500/30">
            <div className="text-4xl mb-4">🍽️</div>
            <h2 className="text-xl font-black text-white mb-1">สั่งอาหาร</h2>
            <p className="text-amber-100 text-sm">เลือกเมนูที่ชอบ คำนวณราคา แล้วส่งออเดอร์</p>
            <div className="mt-4 flex items-center gap-2 text-white text-sm font-semibold">
              ดูเมนู
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Track order */}
        <div className="mt-6 w-full max-w-xl">
          <Link to="/customer/track"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 transition-all text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            ติดตามออเดอร์ / ตรวจสอบการจอง
          </Link>
        </div>
      </div>

      <div className="text-center pb-8 text-stone-700 text-xs">Restaurant Management System v2.0</div>
    </div>
  )
}
