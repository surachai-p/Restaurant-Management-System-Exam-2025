import { beforeEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'

vi.mock('../../src/lib/prisma', () => ({
  default: {
    user: { findFirst: vi.fn() },
    menuItem: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    restaurantTable: { findUnique: vi.fn(), update: vi.fn() },
    order: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    orderItem: { findMany: vi.fn(), create: vi.fn(), deleteMany: vi.fn() },
    payment: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn() },
    $transaction: vi.fn(),
  },
}))

import app from '../../src/app'
import prisma from '../../src/lib/prisma'
import { JWT_SECRET } from '../../src/middleware/auth'

const tokenFor = (role: 'admin' | 'cashier' | 'waiter') =>
  jwt.sign({ id: 1, username: role, role, name: role }, JWT_SECRET)

describe('security and business-rule regressions', () => {
  beforeEach(() => vi.clearAllMocks())

  it('[BUG-003] treats SQL-injection text as a normal menu search', async () => {
    vi.mocked(prisma.menuItem.findMany).mockResolvedValueOnce([])

    const response = await request(app)
      .get('/api/menu')
      .query({ search: "' OR '1'='1" })
      .set('Authorization', `Bearer ${tokenFor('admin')}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
    expect(prisma.menuItem.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ isAvailable: true, OR: expect.any(Array) }),
      }),
    )
  })

  it('[BUG-004] rejects a waiter attempting to update menu prices', async () => {
    const response = await request(app)
      .put('/api/menu/1')
      .set('Authorization', `Bearer ${tokenFor('waiter')}`)
      .send({ price: 1 })

    expect(response.status).toBe(403)
    expect(prisma.menuItem.update).not.toHaveBeenCalled()
  })

  it('[BUG-002] rejects a second active order for the same table', async () => {
    vi.mocked(prisma.restaurantTable.findUnique).mockResolvedValueOnce({ id: 2 } as never)
    vi.mocked(prisma.order.findFirst).mockResolvedValueOnce({ id: 99 } as never)

    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${tokenFor('waiter')}`)
      .send({ tableId: 2 })

    expect(response.status).toBe(409)
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('[BUG-001] rejects underpayment before creating a payment', async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValueOnce({
      id: 1,
      tableId: 2,
      status: 'confirmed',
      totalAmount: 150,
      items: [{ id: 1 }],
    } as never)

    const response = await request(app)
      .post('/api/payments')
      .set('Authorization', `Bearer ${tokenFor('cashier')}`)
      .send({ orderId: 1, amountPaid: 100, method: 'cash' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Insufficient payment amount')
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('[BUG-005] includes payments exactly at the requested start date', async () => {
    vi.mocked(prisma.payment.findMany).mockResolvedValueOnce([])

    const response = await request(app)
      .get('/api/reports/sales')
      .query({ startDate: '2026-11-17' })
      .set('Authorization', `Bearer ${tokenFor('admin')}`)

    expect(response.status).toBe(200)
    expect(prisma.payment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { createdAt: { gte: new Date('2026-11-17') } },
      }),
    )
  })
})
