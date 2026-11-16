
import { Router } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// POST /api/payments
// BUG-001 FIX: Reject underpayment and invalid payment amounts
router.post('/', authenticate, requireRole('admin', 'cashier'), async (req, res) => {
  try {
    const { orderId, amountPaid, method } = req.body as {
      orderId?: number
      amountPaid?: number
      method?: 'cash' | 'card' | 'qr'
    }

    if (!Number.isInteger(orderId) || Number(orderId) <= 0 || amountPaid === undefined || amountPaid === null) {
      res.status(400).json({ error: 'Valid orderId and amountPaid required' })
      return
    }

    if (typeof amountPaid !== 'number' || !Number.isFinite(amountPaid) || amountPaid <= 0) {
      res.status(400).json({ error: 'Invalid payment amount' })
      return
    }

    if (method !== undefined && !['cash', 'card', 'qr'].includes(method)) {
      res.status(400).json({ error: 'Invalid payment method' })
      return
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId! },
      include: { items: true },
    })

    if (!order) {
      res.status(404).json({ error: 'Order not found' })
      return
    }

    if (order.status !== 'confirmed') {
      res.status(400).json({ error: 'Order must be confirmed before payment' })
      return
    }

    if (!order.items.length) {
      res.status(400).json({ error: 'Order has no items' })
      return
    }

    const totalAmount = Number(order.totalAmount)
    const paid = amountPaid

    // BUG-001 FIX: Underpayment must be rejected
if (
  typeof orderId !== 'number' ||
  !Number.isInteger(orderId) ||
  orderId <= 0 ||
  amountPaid === undefined ||
  amountPaid === null
) {
  res.status(400).json({
    error: 'Valid orderId and amountPaid required'
  })
  return
}


    if (paid < totalAmount) {
      res.status(400).json({ error: 'Insufficient payment amount' })
      return
    }

    // Change can no longer be negative
    const change = paid - totalAmount

    const [payment] = await prisma.$transaction([
      prisma.payment.create({
        data: {
          orderId,
          cashierId: req.user!.id,
          totalAmount,
          amountPaid: paid,
          change,
          method: method ?? 'cash',
        },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: { status: 'paid' },
      }),
      prisma.restaurantTable.update({
        where: { id: order.tableId },
        data: { status: 'available' },
      }),
    ])

    res.status(201).json({
      payment,
      change,
      message: 'Payment processed successfully',
    })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// GET /api/payments/:orderId
router.get('/:orderId', authenticate, async (req, res) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { orderId: Number(req.params.orderId) },
    })

    if (!payment) {
      res.status(404).json({ error: 'Payment not found' })
      return
    }

    res.json(payment)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

export default router
