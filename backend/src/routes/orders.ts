// src/routes/orders.ts
// BUG-002 (Double Booking) — rewritten by Nattawan (68030085).
//
// Original fix style: pre-check `findFirst({ status: 'open' })` before
// INSERT. That pattern has a race condition — two requests can both pass
// the check before either INSERTs.
//
// This version pushes the constraint down to the database via a partial
// unique index (`uniq_open_order_per_table`, created in bootstrap.ts)
// and lets PostgreSQL be the single source of truth. The route attempts
// the INSERT optimistically, and on Prisma error P2002 (unique violation)
// translates it into a clean HTTP 409. No race condition possible.

import { Router } from 'express'
import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { authenticate } from '../middleware/auth'
import { can } from '../middleware/rbac'
import { OrderConflictError, sendError } from '../lib/errors'

const router = Router()

router.get('/tables', authenticate, async (_req, res) => {
  try {
    const tables = await prisma.restaurantTable.findMany({ orderBy: { tableNumber: 'asc' } })
    res.json(tables)
  } catch (err) { sendError(res, err) }
})

router.get('/', authenticate, async (req, res) => {
  try {
    const { status, tableId } = req.query as { status?: string; tableId?: string }
    const orders = await prisma.order.findMany({
      where: {
        ...(status ? { status: status as any } : {}),
        ...(tableId ? { tableId: Number(tableId) } : {}),
      },
      include: {
        table: true,
        waiter: { select: { id: true, name: true } },
        items: { include: { menuItem: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(orders)
  } catch (err) { sendError(res, err) }
})

router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        table: true,
        waiter: { select: { id: true, name: true } },
        items: { include: { menuItem: true } },
        payment: true,
      },
    })
    if (!order) { res.status(404).json({ error: 'Order not found', code: 'ORDER_NOT_FOUND' }); return }
    res.json(order)
  } catch (err) { sendError(res, err) }
})

// POST /api/orders — open new order.
// BUG-002 fix: rely on DB-level partial unique index + P2002 catch.
router.post('/', authenticate, can('order:create'), async (req, res) => {
  try {
    const { tableId, note } = req.body as { tableId?: number; note?: string }
    if (!tableId) {
      res.status(400).json({ error: 'tableId required', code: 'ORDER_BAD_REQUEST' })
      return
    }

    const table = await prisma.restaurantTable.findUnique({ where: { id: tableId } })
    if (!table) {
      res.status(404).json({ error: 'Table not found', code: 'TABLE_NOT_FOUND' })
      return
    }

    try {
      const order = await prisma.$transaction(async (tx) => {
        const created = await tx.order.create({
          data: { tableId, waiterId: req.user!.id, status: 'open', note },
        })
        await tx.restaurantTable.update({
          where: { id: tableId },
          data: { status: 'occupied' },
        })
        return created
      })
      res.status(201).json(order)
    } catch (txErr) {
      if (
        txErr instanceof Prisma.PrismaClientKnownRequestError &&
        txErr.code === 'P2002'
      ) {
        // Partial unique index violated → another open order exists
        throw new OrderConflictError()
      }
      throw txErr
    }
  } catch (err) { sendError(res, err) }
})

router.post('/:id/items', authenticate, async (req, res) => {
  try {
    const orderId = Number(req.params.id)
    const { menuItemId, quantity = 1 } = req.body as { menuItemId?: number; quantity?: number }

    const [order, menuItem] = await Promise.all([
      prisma.order.findUnique({ where: { id: orderId } }),
      menuItemId ? prisma.menuItem.findUnique({ where: { id: menuItemId } }) : null,
    ])

    if (!order) { res.status(404).json({ error: 'Order not found' }); return }
    if (order.status !== 'open') { res.status(400).json({ error: 'Order is not open' }); return }
    if (!menuItem?.isAvailable) { res.status(404).json({ error: 'Menu item unavailable' }); return }

    const qty = Number(quantity) || 1
    const unitPrice = Number(menuItem.price)
    const subtotal = unitPrice * qty

    const item = await prisma.orderItem.create({
      data: { orderId, menuItemId: menuItem.id, quantity: qty, unitPrice, subtotal },
      include: { menuItem: true },
    })

    const allItems = await prisma.orderItem.findMany({ where: { orderId } })
    const total = allItems.reduce((s: number, i: {subtotal: any}) => s + Number(i.subtotal), 0)
    await prisma.order.update({ where: { id: orderId }, data: { totalAmount: total } })

    res.status(201).json({ item, totalAmount: total })
  } catch (err) { sendError(res, err) }
})

router.delete('/:id/items/:itemId', authenticate, async (req, res) => {
  try {
    const orderId = Number(req.params.id)
    const itemId  = Number(req.params.itemId)

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) { res.status(404).json({ error: 'Order not found' }); return }
    if (order.status !== 'open') { res.status(400).json({ error: 'Cannot modify confirmed order' }); return }

    await prisma.orderItem.deleteMany({ where: { id: itemId, orderId } })

    const allItems = await prisma.orderItem.findMany({ where: { orderId } })
    const total = allItems.reduce((s: number, i: {subtotal: any}) => s + Number(i.subtotal), 0)
    await prisma.order.update({ where: { id: orderId }, data: { totalAmount: total } })

    res.json({ message: 'Item removed', totalAmount: total })
  } catch (err) { sendError(res, err) }
})

router.put('/:id/confirm', authenticate, async (req, res) => {
  try {
    const orderId = Number(req.params.id)
    const order = await prisma.order.findUnique({
      where: { id: orderId }, include: { items: true },
    })
    if (!order) { res.status(404).json({ error: 'Order not found' }); return }
    if (order.status !== 'open') { res.status(400).json({ error: 'Order is not open' }); return }
    if (!order.items.length) { res.status(400).json({ error: 'Cannot confirm empty order' }); return }
    const updated = await prisma.order.update({ where: { id: orderId }, data: { status: 'confirmed' } })
    res.json(updated)
  } catch (err) { sendError(res, err) }
})

router.put('/:id/cancel', authenticate, can('order:cancel'), async (req, res) => {
  try {
    const orderId = Number(req.params.id)
    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) { res.status(404).json({ error: 'Order not found' }); return }
    if (order.status === 'paid') { res.status(400).json({ error: 'Cannot cancel paid order' }); return }
    await prisma.$transaction([
      prisma.order.update({ where: { id: orderId }, data: { status: 'cancelled' } }),
      prisma.restaurantTable.update({ where: { id: order.tableId }, data: { status: 'available' } }),
    ])
    res.json({ message: 'Order cancelled' })
  } catch (err) { sendError(res, err) }
})

export default router
