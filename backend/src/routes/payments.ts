// src/routes/payments.ts
import { Router } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// POST /api/payments
// Validates underpayment (BUG-001 fixed), rejects non-positive amounts,
// prevents duplicate payments via Payment.orderId @unique, and runs the
// payment + order-status + table-release in a single transaction.
router.post('/', authenticate, requireRole('admin', 'cashier'), async (req, res) => {
  try {
    const { orderId, amountPaid, method } = req.body as {
      orderId?: number; amountPaid?: number; method?: 'cash' | 'card' | 'qr'
    }
    if (!orderId || amountPaid === undefined) {
      res.status(400).json({ error: 'orderId and amountPaid required' }); return
    }

    const paid = Number(amountPaid)
    if (!Number.isFinite(paid) || paid <= 0) {
      res.status(400).json({ error: 'Amount paid must be a positive number' }); return
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    })
    if (!order) { res.status(404).json({ error: 'Order not found' }); return }
    if (order.status !== 'confirmed') {
      res.status(400).json({ error: 'Order must be confirmed before payment' }); return
    }
    if (!order.items.length) {
      res.status(400).json({ error: 'Order has no items' }); return
    }

    const totalAmount = Number(order.totalAmount)
    if (paid < totalAmount) {
      res.status(400).json({ error: 'Insufficient payment amount' }); return
    }

    const change = paid - totalAmount

    const result = await prisma.$transaction(async (tx) => {
      // Re-check inside the transaction so a concurrent payment cannot double-pay
      const existing = await tx.payment.findUnique({ where: { orderId } })
      if (existing) return null
      const payment = await tx.payment.create({
        data: { orderId, cashierId: req.user!.id, totalAmount, amountPaid: paid, change, method: method ?? 'cash' },
      })
      await tx.order.update({ where: { id: orderId }, data: { status: 'paid' } })
      await tx.restaurantTable.update({ where: { id: order.tableId }, data: { status: 'available' } })
      return payment
    })

    if (!result) {
      res.status(409).json({ error: 'Payment already processed for this order' }); return
    }

    res.status(200).json({ payment: result, change, message: 'Payment processed successfully' })
  } catch {
    res.status(500).json({ error: 'Failed to process payment' })
  }
})

// GET /api/payments/:orderId — receipt data
router.get('/:orderId', authenticate, async (req, res) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { orderId: Number(req.params.orderId) },
      include: { order: { include: { items: { include: { menuItem: true } }, table: true } } },
    })
    if (!payment) { res.status(404).json({ error: 'Payment not found' }); return }
    res.json(payment)
  } catch {
    res.status(500).json({ error: 'Failed to fetch payment' })
  }
})

export default router
