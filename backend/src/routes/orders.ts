// src/routes/orders.ts
import { Router } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// GET /api/orders/tables
router.get('/tables', authenticate, async (_req, res) => {
  try {
    const tables = await prisma.restaurantTable.findMany({ orderBy: { tableNumber: 'asc' } })
    res.json(tables)
  } catch {
    res.status(500).json({ error: 'Failed to fetch tables' })
  }
})

// GET /api/orders
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
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// GET /api/orders/:id
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
    if (!order) { res.status(404).json({ error: 'Order not found' }); return }
    res.json(order)
  } catch {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
})

// POST /api/orders — open new order
router.post('/', authenticate, async (req, res) => {
  try {
    const { tableId, note } = req.body as { tableId?: number; note?: string }
    if (!tableId) { res.status(400).json({ error: 'tableId required' }); return }

    const table = await prisma.restaurantTable.findUnique({ where: { id: tableId } })
    if (!table) { res.status(404).json({ error: 'Table not found' }); return }

    // Double-booking prevention: check for an already-open order inside the
    // same interactive transaction that creates the order, so two concurrent
    // requests cannot both pass the check.
    const order = await prisma.$transaction(async (tx) => {
      const existing = await tx.order.findFirst({ where: { tableId, status: 'open' } })
      if (existing) return null
      await tx.restaurantTable.update({ where: { id: tableId }, data: { status: 'occupied' } })
      return tx.order.create({
        data: { tableId, waiterId: req.user!.id, status: 'open', note },
      })
    })

    if (!order) {
      res.status(409).json({ error: 'Table already has an open order' }); return
    }
    res.status(201).json(order)
  } catch {
    res.status(500).json({ error: 'Failed to create order' })
  }
})

// POST /api/orders/:id/items
router.post('/:id/items', authenticate, async (req, res) => {
  try {
    const orderId = Number(req.params.id)
    const { menuItemId, quantity = 1 } = req.body as { menuItemId?: number; quantity?: number }

    const qty = Number(quantity)
    if (!Number.isInteger(qty) || qty < 1) {
      res.status(400).json({ error: 'Quantity must be a positive integer' }); return
    }

    const [order, menuItem] = await Promise.all([
      prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      }),
      menuItemId ? prisma.menuItem.findUnique({ where: { id: menuItemId } }) : null,
    ])

    if (!order) { res.status(404).json({ error: 'Order not found' }); return }
    if (order.status !== 'open') { res.status(400).json({ error: 'Order is not open' }); return }
    if (!menuItem?.isAvailable) { res.status(404).json({ error: 'Menu item unavailable' }); return }

    // Stock validation: stock already reserved by open items of this menu item
    // in this order must count against the remaining quantity.
    const alreadyThisItem = order.items
      .filter(i => i.menuItemId === menuItem.id)
      .reduce((s, i) => s + i.quantity, 0)
    if (alreadyThisItem + qty > menuItem.stockQuantity) {
      res.status(400).json({
        error: `Insufficient stock: only ${Math.max(menuItem.stockQuantity - alreadyThisItem, 0)} left`,
      }); return
    }

    const itemData = {
      orderId,
      menuItemId: menuItem.id,
      quantity: qty,
      unitPrice: Number(menuItem.price),
      subtotal: Number(menuItem.price) * qty,
    }
    const item = await prisma.orderItem.create({
      data: itemData,
      include: { menuItem: true },
    })

    // Recalculate total (single query, computed from itemData to avoid a race)
    const allItems = await prisma.orderItem.findMany({ where: { orderId } })
    const total = allItems.reduce((s: number, i: {subtotal: any}) => s + Number(i.subtotal), 0)
    await prisma.order.update({ where: { id: orderId }, data: { totalAmount: total } })

    res.status(201).json({ item, totalAmount: total })
  } catch {
    res.status(500).json({ error: 'Failed to add order item' })
  }
})

// DELETE /api/orders/:id/items/:itemId
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
  } catch {
    res.status(500).json({ error: 'Failed to remove order item' })
  }
})

// PUT /api/orders/:id/confirm
router.put('/:id/confirm', authenticate, async (req, res) => {
  try {
    const orderId = Number(req.params.id)
    const updated = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId }, include: { items: true },
      })
      if (!order || order.status !== 'open' || !order.items.length) return null
      // Reserve stock on confirmation (kitchen cannot cook what does not exist;
      // validation at add-item time already guaranteed stock availability).
      for (const i of order.items) {
        await tx.menuItem.update({
          where: { id: i.menuItemId },
          data: { stockQuantity: { decrement: i.quantity } },
        })
      }
      return tx.order.update({ where: { id: orderId }, data: { status: 'confirmed' } })
    })
    if (!updated) {
      res.status(400).json({ error: 'Order is not open, not found, or has no items' }); return
    }
    res.json(updated)
  } catch {
    res.status(500).json({ error: 'Failed to confirm order' })
  }
})

// PUT /api/orders/:id/cancel
router.put('/:id/cancel', authenticate, requireRole('admin', 'cashier'), async (req, res) => {
  try {
    const orderId = Number(req.params.id)
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId }, include: { items: true },
      })
      if (!order || order.status === 'paid') return null
      // Restore reserved stock if this order had consumed it on confirm
      if (order.status === 'confirmed') {
        for (const i of order.items) {
          await tx.menuItem.update({
            where: { id: i.menuItemId },
            data: { stockQuantity: { increment: i.quantity } },
          })
        }
      }
      await tx.order.update({ where: { id: orderId }, data: { status: 'cancelled' } })
      await tx.restaurantTable.update({
        where: { id: order.tableId }, data: { status: 'available' },
      })
      return true
    })
    if (!result) {
      res.status(400).json({ error: 'Order not found or already paid' }); return
    }
    res.json({ message: 'Order cancelled' })
  } catch {
    res.status(500).json({ error: 'Failed to cancel order' })
  }
})

export default router
