// tests/api/payments.test.ts
// BUG-001 regression tests: underpayment rejection, exact payment, overpayment.
// Prisma is mocked — no database required.
import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'

vi.mock('../../src/lib/prisma', () => ({
  default: {
    order: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    payment: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    restaurantTable: { update: vi.fn() },
    $transaction: vi.fn(),
  },
}))

import prisma from '../../src/lib/prisma'
import app from '../../src/app'

const TOKEN = jwt.sign(
  { id: 2, username: 'cashier1', role: 'cashier', name: 'Cashier One' },
  process.env.JWT_SECRET ?? 'rms-secret-key-2024',
  { expiresIn: '1h' },
)
const auth = { Authorization: `Bearer ${TOKEN}` }

const confirmedOrder = {
  id: 1,
  tableId: 3,
  status: 'confirmed',
  totalAmount: { toString: () => '600' } as any,
  items: [{ id: 11, quantity: 2 }],
}

beforeEach(() => {
  vi.mocked(prisma.order.findUnique).mockResolvedValue(confirmedOrder as any)
  vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => {
    // emulate the interactive transaction against the same mocks
    const tx = {
      payment: { findUnique: vi.fn().mockResolvedValue(null), create: vi.fn().mockResolvedValue({ totalAmount: 600, amountPaid: 700, change: 100, method: 'cash' }) },
      order: { update: vi.fn() },
      restaurantTable: { update: vi.fn() },
    }
    return fn(tx)
  })
})

describe('POST /api/payments — BUG-001 (underpayment)', () => {
  it('rejects payment below the order total with HTTP 400', async () => {
    const res = await request(app).post('/api/payments').set(auth)
      .send({ orderId: 1, amountPaid: 100 })
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/insufficient/i)
  })

  it('accepts exact payment with zero change (HTTP 200)', async () => {
    const res = await request(app).post('/api/payments').set(auth)
      .send({ orderId: 1, amountPaid: 600 })
    expect(res.status).toBe(200)
    expect(res.body.change).toBe(0)
  })

  it('accepts overpayment and returns correct change (HTTP 200)', async () => {
    const res = await request(app).post('/api/payments').set(auth)
      .send({ orderId: 1, amountPaid: 700 })
    expect(res.status).toBe(200)
    expect(res.body.change).toBe(100)
  })

  it('rejects zero and negative amounts with HTTP 400', async () => {
    for (const amountPaid of [0, -5]) {
      const res = await request(app).post('/api/payments').set(auth)
        .send({ orderId: 1, amountPaid })
      expect(res.status).toBe(400)
    }
  })

  it('rejects payment on an order that is not confirmed', async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValueOnce(
      { ...confirmedOrder, status: 'open' } as any,
    )
    const res = await request(app).post('/api/payments').set(auth)
      .send({ orderId: 1, amountPaid: 600 })
    expect(res.status).toBe(400)
  })

  it('prevents duplicate payment (HTTP 409)', async () => {
    vi.mocked(prisma.$transaction).mockImplementationOnce(async (fn: any) => {
      const tx = {
        payment: { findUnique: vi.fn().mockResolvedValue({ id: 1 }) },
        order: { update: vi.fn() },
        restaurantTable: { update: vi.fn() },
      }
      return fn(tx)
    })
    const res = await request(app).post('/api/payments').set(auth)
      .send({ orderId: 1, amountPaid: 600 })
    expect(res.status).toBe(409)
  })

  it('returns 401 without a token', async () => {
    const res = await request(app).post('/api/payments').send({ orderId: 1, amountPaid: 150 })
    expect(res.status).toBe(401)
  })
})
