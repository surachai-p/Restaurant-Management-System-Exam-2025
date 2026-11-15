// tests/unit/payment.test.ts
import { describe, it, expect } from 'vitest'

function isValidPayment(totalAmount: number, amountPaid: number): boolean {
  return amountPaid >= totalAmount
}

function calculateChange(totalAmount: number, amountPaid: number): number {
  if (!isValidPayment(totalAmount, amountPaid)) {
    throw new Error('Insufficient payment amount')
  }
  return amountPaid - totalAmount
}

describe('Payment Calculation Logic', () => {
  it('returns correct positive change when overpaid', () => {
    expect(calculateChange(150, 200)).toBe(50)
  })

  it('returns zero change when exact amount is paid', () => {
    expect(calculateChange(150, 150)).toBe(0)
  })

  it('[BUG-001] should NOT produce negative change (underpayment rejection)', () => {
    expect(isValidPayment(150, 100)).toBe(false)
    expect(() => calculateChange(150, 100)).toThrow('Insufficient payment amount')
  })
})
