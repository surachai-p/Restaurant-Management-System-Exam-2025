import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'

vi.mock('../../src/lib/prisma', () => ({
  default: {
    user: {
      findFirst: vi.fn(),
      count: vi.fn().mockResolvedValue(1),
      createMany: vi.fn(),
    },
    menuItem: {
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn(),
      create: vi.fn(),
      count: vi.fn().mockResolvedValue(1),
      update: vi.fn(),
    },
    restaurantTable: {
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn().mockResolvedValue(1),
    },
    order: {
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    orderItem: { findMany: vi.fn().mockResolvedValue([]), create: vi.fn(), deleteMany: vi.fn() },
    payment: { findMany: vi.fn().mockResolvedValue([]), findUnique: vi.fn(), create: vi.fn() },
    $queryRawUnsafe: vi.fn().mockResolvedValue([]),
    $transaction: vi.fn().mockResolvedValue([]),
  },
}))

import app from '../../src/app'
import prisma from '../../src/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET ?? 'rms-secret-key-2024'
const adminToken = jwt.sign({ id: 1, username: 'admin', role: 'admin', name: 'Admin' }, JWT_SECRET)
const cashierToken = jwt.sign({ id: 2, username: 'cashier', role: 'cashier', name: 'Cashier' }, JWT_SECRET)
const waiterToken = jwt.sign({ id: 3, username: 'waiter', role: 'waiter', name: 'Waiter' }, JWT_SECRET)

const anyDate = new Date()

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Backend regression tests for bug fixes', () => {
  it('should reject payment when amountPaid is less than totalAmount', async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValueOnce({
      id: 123,
      tableId: 1,
      waiterId: 2,
      status: 'confirmed',
      totalAmount: 200,
      note: null,
      createdAt: anyDate,
      updatedAt: anyDate,
      items: [{ id: 1, orderId: 123, menuItemId: 1, quantity: 1, unitPrice: 200, subtotal: 200 }],
    } as any)

    const res = await request(app)
      .post('/api/payments')
      .set('Authorization', `Bearer ${cashierToken}`)
      .send({ orderId: 123, amountPaid: 150, method: 'cash' })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Insufficient payment amount')
    expect(prisma.payment.create).not.toHaveBeenCalled()
  })

  it('should prevent duplicate open order for the same table', async () => {
    vi.mocked(prisma.restaurantTable.findUnique).mockResolvedValueOnce({
      id: 2,
      tableNumber: 2,
      capacity: 4,
      status: 'available',
      createdAt: anyDate,
      updatedAt: anyDate,
    } as any)
    vi.mocked(prisma.order.findFirst).mockResolvedValueOnce({
      id: 5,
      tableId: 2,
      waiterId: 3,
      status: 'open',
      totalAmount: 0,
      note: null,
      createdAt: anyDate,
      updatedAt: anyDate,
    } as any)

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${waiterToken}`)
      .send({ tableId: 2 })

    expect(res.status).toBe(409)
    expect(res.body.error).toBe('Table already has an open order')
  })

  it('should forbid waiter from updating a menu item', async () => {
    vi.mocked(prisma.menuItem.findUnique).mockResolvedValueOnce({
      id: 1,
      name: 'ข้าวผัด',
      description: 'อร่อย',
      price: 60,
      category: 'food',
      isAvailable: true,
      imageUrl: null,
      createdAt: anyDate,
      updatedAt: anyDate,
    } as any)

    const res = await request(app)
      .put('/api/menu/1')
      .set('Authorization', `Bearer ${waiterToken}`)
      .send({ price: 70 })

    expect(res.status).toBe(403)
    expect(res.body.error).toBe('Forbidden')
  })

  it('should use gte filter for reports startDate', async () => {
    vi.mocked(prisma.payment.findMany).mockResolvedValueOnce([])

    const res = await request(app)
      .get('/api/reports/sales')
      .set('Authorization', `Bearer ${cashierToken}`)
      .query({ startDate: '2025-05-01', endDate: '2025-05-02' })

    expect(res.status).toBe(200)
    const calls = vi.mocked(prisma.payment.findMany).mock.calls
    expect(calls.length).toBe(1)
    expect(calls[0][0].where.createdAt.gte.toISOString()).toBe(new Date('2025-05-01').toISOString())
  })

  it('should search menu safely without raw SQL execution', async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValueOnce([])

    const res = await request(app)
      .get('/api/menu')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ search: 'กาแฟ' })

    expect(res.status).toBe(200)
    expect(prisma.$queryRawUnsafe).not.toHaveBeenCalled()
    expect(prisma.menuItem.findMany).toHaveBeenCalled()
  })
})
