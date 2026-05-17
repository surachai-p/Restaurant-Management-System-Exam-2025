// src/pages/customer/CustomerOrder.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import publicApi, { type PublicMenuItem, type PublicTable, type CartItem, type CustomerOrder } from '../../services/publicApi'
import type { AxiosError } from 'axios'

type Category = 'food' | 'drink' | 'dessert'

const catStyle: Record<Category, { bg: string; text: string; icon: string }> = {
  food:    { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: '🍛' },
  drink:   { bg: 'bg-sky-500/20',    text: 'text-sky-400',    icon: '🥤' },
  dessert: { bg: 'bg-pink-500/20',   text: 'text-pink-400',   icon: '🍮' },
}

type Step = 'menu' | 'cart' | 'info' | 'done'

export default function CustomerOrder() {
  const [menu, setMenu]     = useState<PublicMenuItem[]>([])
  const [tables, setTables] = useState<PublicTable[]>([])
  const [cart, setCart]     = useState<CartItem[]>([])
  const [catFilter, setCat] = useState<Category | ''>('')
  const [step, setStep]     = useState<Step>('menu')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]   = useState('')
  const [result, setResult] = useState<CustomerOrder | null>(null)

  // Customer info
  const [customerName, setName] = useState('')
  const [tableId, setTableId]   = useState('')
  const [note, setNote]         = useState('')

  useEffect(() => {
    Promise.all([
      publicApi.get<PublicMenuItem[]>('/menu'),
      publicApi.get<PublicTable[]>('/tables'),
    ]).then(([m, t]) => {
      setMenu(m.data)
      setTables(t.data.filter(t => t.status === 'available'))
    }).finally(() => setLoading(false))
  }, [])

  const filtered = catFilter ? menu.filter(i => i.category === catFilter) : menu

  const addToCart = (item: PublicMenuItem) => {
    setCart(prev => {
      const ex = prev.find(c => c.menuItem.id === item.id)
      if (ex) return prev.map(c => c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      return [...prev, { menuItem: item, quantity: 1 }]
    })
  }

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev
      .map(c => c.menuItem.id === id ? { ...c, quantity: c.quantity + delta } : c)
      .filter(c => c.quantity > 0)
    )
  }

  const cartTotal = cart.reduce((s, c) => s + Number(c.menuItem.price) * c.quantity, 0)
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0)
  const getQty = (id: number) => cart.find(c => c.menuItem.id === id)?.quantity ?? 0

  const handleSubmit = async () => {
    if (!tableId) { setError('กรุณาเลือกโต๊ะ'); return }
    if (!customerName.trim()) { setError('กรุณาระบุชื่อ'); return }
    setError(''); setSubmitting(true)
    try {
      const { data } = await publicApi.post<CustomerOrder>('/orders', {
        tableId: Number(tableId),
        customerName,
        note: note || undefined,
        items: cart.map(c => ({ menuItemId: c.menuItem.id, quantity: c.quantity })),
      })
      setResult(data)
      setStep('done')
    } catch (err) {
      const e = err as AxiosError<{ error: string }>
      setError(e.response?.data?.error ?? 'สั่งอาหารไม่สำเร็จ กรุณาลองใหม่')
    } finally { setSubmitting(false) }
  }

  // ── Done screen ────────────────────────────────────────────────────────────
  if (step === 'done' && result) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm bg-stone-900 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-black text-white mb-1">สั่งอาหารแล้ว!</h2>
          <p className="text-stone-400 text-sm mb-6">ออเดอร์ของคุณถูกส่งไปยังครัวแล้ว</p>

          <div className="bg-stone-950 rounded-2xl p-5 mb-4">
            <p className="text-stone-500 text-xs mb-1">หมายเลขออเดอร์</p>
            <p className="text-3xl font-black text-amber-400">#{result.id}</p>
            <p className="text-stone-500 text-xs mt-2">โต๊ะ {result.table?.tableNumber ?? tableId}</p>
          </div>

          <div className="bg-stone-950 rounded-2xl p-4 mb-6 text-left space-y-2">
            {result.items?.map(i => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="text-stone-400">{i.menuItem?.name} × {i.quantity}</span>
                <span className="text-stone-200 font-semibold">฿{Number(i.subtotal).toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-stone-800 flex justify-between font-black">
              <span className="text-stone-300">รวม</span>
              <span className="text-amber-400 text-lg">฿{Number(result.totalAmount).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to={`/customer/track?orderId=${result.id}`}
              className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-2xl text-sm transition-colors">
              ติดตามออเดอร์
            </Link>
            <Link to="/customer"
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-2xl text-sm transition-colors">
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Shared header ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-950 pb-32">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-stone-950/95 backdrop-blur border-b border-stone-900 px-4 py-4 flex items-center justify-between">
        <Link to="/customer" className="text-stone-500 hover:text-stone-300 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-white font-black text-lg">
          {step === 'menu' ? '🍽️ เมนูอาหาร' : step === 'cart' ? '🛒 ตะกร้า' : '📝 ข้อมูล'}
        </h1>
        {step === 'menu' && cartCount > 0 ? (
          <button onClick={() => setStep('cart')}
            className="flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <span>🛒</span>{cartCount}
          </button>
        ) : <div className="w-8" />}
      </div>

      {/* ── Menu step ────────────────────────────────────────────────────── */}
      {step === 'menu' && (
        <div className="px-4 pt-4">
          {/* Category filter */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
            {(['', 'food', 'drink', 'dessert'] as const).map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  catFilter === c
                    ? 'bg-amber-500 text-white'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}>
                {c === '' ? 'ทั้งหมด' : `${catStyle[c as Category].icon} ${c}`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(item => {
                const qty = getQty(item.id)
                const s = catStyle[item.category as Category]
                return (
                  <div key={item.id} className="bg-stone-900 rounded-2xl p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center text-2xl shrink-0`}>
                      {s.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm">{item.name}</p>
                      {item.description && <p className="text-stone-500 text-xs truncate">{item.description}</p>}
                      <p className="text-amber-400 font-black mt-0.5">฿{Number(item.price).toFixed(0)}</p>
                    </div>
                    {qty === 0 ? (
                      <button onClick={() => addToCart(item)}
                        className="w-9 h-9 bg-amber-500 hover:bg-amber-400 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 transition-colors">
                        +
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 bg-stone-800 hover:bg-stone-700 rounded-xl flex items-center justify-center text-white font-bold transition-colors">
                          −
                        </button>
                        <span className="text-white font-black w-5 text-center">{qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 bg-amber-500 hover:bg-amber-400 rounded-xl flex items-center justify-center text-white font-bold transition-colors">
                          +
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Cart step ────────────────────────────────────────────────────── */}
      {step === 'cart' && (
        <div className="px-4 pt-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-stone-500">ยังไม่มีรายการในตะกร้า</p>
              <button onClick={() => setStep('menu')} className="mt-4 text-amber-500 font-semibold text-sm">เลือกเมนู</button>
            </div>
          ) : (
            <>
              {cart.map(c => (
                <div key={c.menuItem.id} className="bg-stone-900 rounded-2xl p-4 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{c.menuItem.name}</p>
                    <p className="text-stone-500 text-xs">฿{Number(c.menuItem.price).toFixed(0)} / ชิ้น</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(c.menuItem.id, -1)}
                      className="w-8 h-8 bg-stone-800 rounded-xl text-white font-bold transition-colors hover:bg-stone-700">
                      −
                    </button>
                    <span className="text-white font-black w-6 text-center">{c.quantity}</span>
                    <button onClick={() => updateQty(c.menuItem.id, 1)}
                      className="w-8 h-8 bg-amber-500 rounded-xl text-white font-bold transition-colors hover:bg-amber-400">
                      +
                    </button>
                  </div>
                  <div className="text-amber-400 font-black text-sm w-16 text-right">
                    ฿{(Number(c.menuItem.price) * c.quantity).toFixed(0)}
                  </div>
                </div>
              ))}

              {/* Summary card */}
              <div className="bg-stone-900 rounded-2xl p-5 mt-4">
                <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-3">สรุปราคา</p>
                {cart.map(c => (
                  <div key={c.menuItem.id} className="flex justify-between text-sm py-1">
                    <span className="text-stone-400">{c.menuItem.name} × {c.quantity}</span>
                    <span className="text-stone-300">฿{(Number(c.menuItem.price) * c.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-stone-800 mt-3 pt-3 flex justify-between items-center">
                  <span className="text-stone-300 font-bold">รวมทั้งหมด</span>
                  <span className="text-amber-400 font-black text-2xl">฿{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={() => { setStep('menu') }}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-300 font-semibold rounded-2xl text-sm transition-colors">
                + เพิ่มรายการ
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Info step ────────────────────────────────────────────────────── */}
      {step === 'info' && (
        <div className="px-4 pt-4 space-y-4">
          {error && (
            <div className="px-4 py-3 bg-red-950 border border-red-800 text-red-400 rounded-2xl text-sm">{error}</div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">ชื่อของคุณ *</label>
            <input value={customerName} onChange={e => setName(e.target.value)} required
              placeholder="ชื่อเพื่อเรียกอาหาร"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors placeholder:text-stone-600" />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">โต๊ะที่นั่ง *</label>
            <select value={tableId} onChange={e => setTableId(e.target.value)}
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors">
              <option value="">— เลือกโต๊ะ —</option>
              {tables.map(t => (
                <option key={t.id} value={t.id}>โต๊ะ #{t.tableNumber} (รองรับ {t.capacity} คน)</option>
              ))}
            </select>
            {tables.length === 0 && <p className="text-xs text-red-400 mt-1">ไม่มีโต๊ะว่างในขณะนี้</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">หมายเหตุ</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
              placeholder="แพ้อาหาร, ขอเผ็ดน้อย ฯลฯ"
              className="w-full px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500 text-white rounded-2xl text-sm outline-none transition-colors resize-none placeholder:text-stone-600" />
          </div>

          {/* Order preview */}
          <div className="bg-stone-900 rounded-2xl p-4">
            <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">รายการที่สั่ง</p>
            {cart.map(c => (
              <div key={c.menuItem.id} className="flex justify-between text-sm py-1">
                <span className="text-stone-400">{c.menuItem.name} × {c.quantity}</span>
                <span className="text-stone-300">฿{(Number(c.menuItem.price) * c.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-stone-800 mt-2 pt-2 flex justify-between font-black">
              <span className="text-stone-300">ยอดรวม</span>
              <span className="text-amber-400">฿{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom action bar ─────────────────────────────────────────────── */}
      {step !== 'done' && (
        <div className="fixed bottom-0 left-0 right-0 bg-stone-950/95 backdrop-blur border-t border-stone-900 px-4 py-4">
          {step === 'menu' && (
            <button onClick={() => setStep('cart')} disabled={cartCount === 0}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white font-black rounded-2xl flex items-center justify-between px-6 transition-colors">
              <span>🛒 ดูตะกร้า ({cartCount})</span>
              <span>฿{cartTotal.toFixed(2)}</span>
            </button>
          )}
          {step === 'cart' && (
            <div className="flex gap-3">
              <button onClick={() => setStep('menu')}
                className="py-4 px-6 bg-stone-900 hover:bg-stone-800 text-stone-300 font-semibold rounded-2xl transition-colors text-sm">
                แก้ไข
              </button>
              <button onClick={() => setStep('info')} disabled={cart.length === 0}
                className="flex-1 py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white font-black rounded-2xl transition-colors flex justify-between px-6">
                <span>ถัดไป</span>
                <span>฿{cartTotal.toFixed(2)}</span>
              </button>
            </div>
          )}
          {step === 'info' && (
            <div className="flex gap-3">
              <button onClick={() => setStep('cart')}
                className="py-4 px-6 bg-stone-900 hover:bg-stone-800 text-stone-300 font-semibold rounded-2xl transition-colors text-sm">
                กลับ
              </button>
              <button onClick={handleSubmit} disabled={submitting || !tableId || !customerName}
                className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-black rounded-2xl transition-colors flex items-center justify-center gap-2">
                {submitting
                  ? <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>กำลังสั่ง…</>
                  : `✓ สั่งอาหาร ฿${cartTotal.toFixed(2)}`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
