// src/routes/public.ts — no authentication required
import { Router } from 'express'
import { randomUUID } from 'crypto'
import prisma from '../lib/prisma'

const router = Router()

// ─── Menu ────────────────────────────────────────────────────────────────────

// GET /api/public/menu
router.get('/menu', async (req, res) => {
  try {
    const { category } = req.query as { category?: string }
    const items = await prisma.menuItem.findMany({
      where: { isAvailable: true, ...(category ? { category: category as any } : {}) },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// ─── Tables ──────────────────────────────────────────────────────────────────

// GET /api/public/tables
router.get('/tables', async (_req, res) => {
  try {
    const tables = await prisma.restaurantTable.findMany({
      orderBy: { tableNumber: 'asc' },
    })
    res.json(tables)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// ─── Reservations ────────────────────────────────────────────────────────────

// POST /api/public/reservations
router.post('/reservations', async (req, res) => {
  try {
    const { customerName, phone, partySize, reservedAt, note } = req.body as {
      customerName?: string; phone?: string; partySize?: number
      reservedAt?: string; note?: string
    }
    if (!customerName || !phone || !reservedAt) {
      res.status(400).json({ error: 'customerName, phone และ reservedAt จำเป็นต้องระบุ' }); return
    }
    const token = randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()
    const reservation = await prisma.reservation.create({
      data: {
        token,
        customerName,
        phone,
        partySize: Number(partySize) || 2,
        reservedAt: new Date(reservedAt),
        note,
      },
    })
    res.status(201).json(reservation)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// GET /api/public/reservations/:token
router.get('/reservations/:token', async (req, res) => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { token: req.params.token },
    })
    if (!reservation) { res.status(404).json({ error: 'ไม่พบการจอง' }); return }
    res.json(reservation)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// ─── Customer Orders ──────────────────────────────────────────────────────────

// POST /api/public/orders — customer self-order (no waiter)
// body: { tableId, customerName, items: [{menuItemId, quantity}], note? }
router.post('/orders', async (req, res) => {
  try {
    const { tableId, customerName, items, note } = req.body as {
      tableId?: number
      customerName?: string
      items?: { menuItemId: number; quantity: number }[]
      note?: string
    }

    if (!tableId) { res.status(400).json({ error: 'tableId จำเป็นต้องระบุ' }); return }
    if (!items?.length) { res.status(400).json({ error: 'กรุณาเลือกอย่างน้อย 1 รายการ' }); return }

    const table = await prisma.restaurantTable.findUnique({ where: { id: tableId } })
    if (!table) { res.status(404).json({ error: 'ไม่พบโต๊ะ' }); return }
    if (table.status === 'occupied') {
      res.status(409).json({ error: 'โต๊ะนี้มีออเดอร์เปิดอยู่แล้ว' }); return
    }

    // Validate and price all items
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: items.map(i => i.menuItemId) }, isAvailable: true },
    })
    if (menuItems.length !== items.length) {
      res.status(400).json({ error: 'บางรายการไม่พร้อมให้บริการ' }); return
    }

    const priced = items.map(i => {
      const menu = menuItems.find(m => m.id === i.menuItemId)!
      const qty = Math.max(1, i.quantity)
      const unit = Number(menu.price)
      return { menuItemId: menu.id, quantity: qty, unitPrice: unit, subtotal: unit * qty }
    })
    const totalAmount = priced.reduce((s, i) => s + i.subtotal, 0)

    const order = await prisma.$transaction(async tx => {
      const o = await tx.order.create({
        data: {
          tableId,
          waiterId: null,
          customerName: customerName || 'ลูกค้า',
          status: 'open',
          totalAmount,
          note,
          items: { create: priced },
        },
        include: { items: { include: { menuItem: true } }, table: true },
      })
      await tx.restaurantTable.update({ where: { id: tableId }, data: { status: 'occupied' } })
      return o
    })

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// GET /api/public/orders/:id — track order status
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        items: { include: { menuItem: true } },
        table: true,
        payment: true,
      },
    })
    if (!order) { res.status(404).json({ error: 'ไม่พบออเดอร์' }); return }
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

export default router
