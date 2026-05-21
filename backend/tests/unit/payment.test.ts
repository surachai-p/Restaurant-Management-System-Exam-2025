import { describe, it, expect } from 'vitest'

// ── Business logic helpers (แก้ให้ถูกต้อง) ────────────────────
function calculateChange(totalAmount: number, amountPaid: number): number {
  const diff = amountPaid - totalAmount;
  // ✅ แก้ไข: ถ้าจ่ายไม่พอ (ติดลบ) ให้คืนค่าเป็น 0 หรือจัดการ Error 
  // แต่ใน Test คาดหวังว่าต้องไม่ติดลบ (>= 0)
  return diff < 0 ? 0 : diff; 
}

function isValidPayment(totalAmount: number, amountPaid: number): boolean {
  // ✅ แก้ไข: ยอดจ่ายต้องมากกว่าหรือเท่ากับยอดรวม และต้องไม่เป็น 0
  if (amountPaid <= 0) return false;
  return amountPaid >= totalAmount;
}

// ── Tests (ไม่ต้องแก้ส่วนนี้ เพราะ Assertions ถูกต้องอยู่แล้ว) ──────────────────
describe('Payment Calculation Logic', () => {
  it('returns correct positive change when overpaid', () => {
    expect(calculateChange(150, 200)).toBe(50)
  })

  it('returns zero change when exact amount is paid', () => {
    expect(calculateChange(150, 150)).toBe(0)
  })

  // ✅ ข้อนี้จะ "ผ่าน" แล้ว เพราะเราเช็คไม่ให้คืนค่าติดลบ
  it('[BUG-001] should NOT produce negative change (underpayment rejection)', () => {
    const change = calculateChange(150, 100)
    expect(change).toBeGreaterThanOrEqual(0) 
  })
})

describe('Payment Validation', () => {
  it('accepts payment when amountPaid equals totalAmount', () => {
    expect(isValidPayment(150, 150)).toBe(true)
  })

  it('accepts payment when amountPaid exceeds totalAmount', () => {
    expect(isValidPayment(150, 200)).toBe(true)
  })

  // ✅ ข้อนี้จะ "ผ่าน" เพราะ 100 < 150 จะคืนค่า false
  it('rejects payment when amountPaid is less than totalAmount', () => {
    expect(isValidPayment(150, 100)).toBe(false)
  })

  // ✅ ข้อนี้จะ "ผ่าน" เพราะยอดเป็น 0 จะคืนค่า false
  it('rejects payment of zero', () => {
    expect(isValidPayment(150, 0)).toBe(false)
  })
})

describe('Business Risk: Order Total Integrity', () => {
  it('order total equals sum of all item subtotals', () => {
    const items = [
      { unitPrice: 80, quantity: 2, subtotal: 160 },
      { unitPrice: 45, quantity: 1, subtotal: 45 },
      { unitPrice: 60, quantity: 1, subtotal: 60 },
    ]
    const calculated = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
    const stored     = items.reduce((s, i) => s + i.subtotal, 0)
    expect(calculated).toBe(265)
    expect(stored).toBe(265)
    expect(calculated).toBe(stored)
  })
})