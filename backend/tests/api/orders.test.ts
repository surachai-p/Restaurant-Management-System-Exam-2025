// tests/api/orders.test.ts
// BUG-002 regression + stock validation + RBAC. Prisma is mocked.
import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'

vi.mock('../../src/lib/prisma', () => ({
  default: {
    order: { findUnique: vi.fn(), findMany: vi.fn(), update: vi.fn(), create: vi.fn(), findFirst: vi.fn() },
    orderItem: { findMany: vi.fn(), create: vi.fn(), deleteMany: vi.fn() },
    user: { findFirst: vi.fn() },
    menuItem: { findUnique: vi.fn(), update: vi.fn() },
    restaurantTable: { findUnique: vi.fn(), findMany: vi.fn(), update: vi.fn() },
    $transaction: vi.fn(),
  },
}))

import prisma from '../../src/lib/prisma'
import app from '../../src/app'

const sign = (role: string, id = 1) => jwt.sign(
  { id, username: role + '1', role, name: role + ' One' },
  process.env.JWT_SECRET ?? 'rms-secret-key-2024',
  { expiresIn: '1h' },
)
const waiter = { Authorization: `Bearer ${sign('waiter')}` }
const cashier = { Authorization: `Bearer ${sign('cashier', 2)}` }

beforeEach(() => {
  vi.mocked(prisma.restaurantTable.findUnique).mockResolvedValue(
    { id: 1, tableNumber: 1, capacity: 4, status: 'available', createdAt: new Date(), updatedAt: new Date() } as any,
  )
})

describe('POST /api/orders — BUG-002 (double booking)', () => {
  it('creates an order when no open order exists on the table', async () => {
    vi.mocked(prisma.$transaction).mockImplementationOnce(async (fn: any) => {
      const tx = {
        order: { findFirst: vi.fn().mockResolvedValue(null), create: vi.fn().mockResolvedValue({ id: 5, tableId: 1, status: 'open' }) },
        restaurantTable: { update: vi.fn() },
      }
      return fn(tx)
    })
    const res = await request(app).post('/api/orders').set(waiter).send({ tableId: 1 })
    expect(res.status).toBe(201)
  })

  it('rejects a second open order on the same table with HTTP 409', async () => {
    vi.mocked(prisma.$transaction).mockImplementationOnce(async (fn: any) => {
      const tx = {
        order: { findFirst: vi.fn().mockResolvedValue({ id: 4, tableId: 1, status: 'open' }), create: vi.fn() },
        restaurantTable: { update: vi.fn() },
      }
      return fn(tx)
    })
    const res = await request(app).post('/api/orders').set(waiter).send({ tableId: 1 })
    expect(res.status).toBe(409)
    expect(res.body.error).toMatch(/open order/i)
  })

  it('returns 404 for an unknown table', async () => {
    vi.mocked(prisma.restaurantTable.findUnique).mockResolvedValueOnce(null as any)
    const res = await request(app).post('/api/orders').set(waiter).send({ tableId: 999 })
    expect(res.status).toBe(404)
  })
})

describe('POST /api/orders/:id/items — stock validation', () => {
  const order = { id: 1, status: 'open', items: [] }

  it('rejects zero and negative quantities (HTTP 400)', async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue(order as any)
    for (const qty of [0, -2, 1.5]) {
      const res = await request(app).post('/api/orders/1/items').set(waiter)
        .send({ menuItemId: 2, quantity: qty })
      expect(res.status).toBe(400)
    }
  })

  it('rejects adding an out-of-stock item (HTTP 400)', async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue(order as any)
    vi.mocked(prisma.menuItem.findUnique).mockResolvedValue(
      { id: 2, name: 'Pad Thai', price: 80, isAvailable: true, stockQuantity: 0 } as any,
    )
    const res = await request(app).post('/api/orders/1/items').set(waiter)
      .send({ menuItemId: 2, quantity: 1 })
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/stock/i)
  })

  it('rejects quantity exceeding remaining stock (HTTP 400)', async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue(order as any)
    vi.mocked(prisma.menuItem.findUnique).mockResolvedValue(
      { id: 2, name: 'Pad Thai', price: 80, isAvailable: true, stockQuantity: 3 } as any,
    )
    const res = await request(app).post('/api/orders/1/items').set(waiter)
      .send({ menuItemId: 2, quantity: 4 })
    expect(res.status).toBe(400)
  })

  it('accepts an in-stock quantity (HTTP 201)', async () => {
    vi.mocked(prisma.order.findUnique).mockResolvedValue(order as any)
    vi.mocked(prisma.menuItem.findUnique).mockResolvedValue(
      { id: 2, name: 'Pad Thai', price: 80, isAvailable: true, stockQuantity: 30 } as any,
    )
    vi.mocked(prisma.orderItem.create).mockResolvedValue(
      { id: 9, orderId: 1, menuItemId: 2, quantity: 2, unitPrice: 80, subtotal: 160 } as any,
    )
    vi.mocked(prisma.orderItem.findMany).mockResolvedValue([
      { id: 9, orderId: 1, menuItemId: 2, quantity: 2, unitPrice: 80, subtotal: 160 },
    ] as any)
    vi.mocked(prisma.order.update).mockResolvedValue({ id: 1, totalAmount: 160 } as any)
    const res = await request(app).post('/api/orders/1/items').set(waiter)
      .send({ menuItemId: 2, quantity: 2 })
    expect(res.status).toBe(201)
    expect(res.body.totalAmount).toBe(160)
  })
})

describe('RBAC — role enforcement', () => {
  it('cashier cannot access admin-only menu creation (HTTP 403)', async () => {
    const res = await request(app).post('/api/menu').set(cashier)
      .send({ name: 'New Dish', price: 50 })
    expect(res.status).toBe(403)
  })

  it('waiter cannot update menu items (BUG-004 fixed, HTTP 403)', async () => {
    const res = await request(app).put('/api/menu/1').set(waiter)
      .send({ price: 1 })
    expect(res.status).toBe(403)
  })

  it('waiter cannot cancel orders (HTTP 403)', async () => {
    const res = await request(app).put('/api/orders/1/cancel').set(waiter)
    expect(res.status).toBe(403)
  })

  it('SQL injection in username fails login (HTTP 401)', async () => {
    vi.mocked(prisma.user.findFirst).mockResolvedValueOnce(null as any)
    const res = await request(app).post('/api/auth/login')
      .send({ username: "' OR 1=1 --", password: 'x' })
    expect(res.status).toBe(401)
  })
})
