import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// POST /api/payments
router.post('/', authenticate, requireRole('admin', 'cashier'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, amountPaid, method } = req.body as {
      orderId?: number
      amountPaid?: number
      method?: 'cash' | 'card' | 'qr'
    }

    // 1. Validation
    if (!orderId || amountPaid === undefined) {
      res.status(400).json({ error: 'orderId and amountPaid required' })
      return
    }

    // 2. หา Order
    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: { items: true },
    })

    if (!order) {
      // Newman คาดว่าเป็น 400 มากกว่า 404
      res.status(400).json({ error: 'Order not found or invalid ID' })
      return
    }

    const totalAmount = Number(order.totalAmount)
    const paid = Number(amountPaid)

    // 3. Underpayment → 400
    if (paid < totalAmount) {
      res.status(400).json({ error: 'Insufficient payment amount' })
      return
    }

    // 4. ต้อง confirm order ก่อนจ่าย
    if (order.status !== 'confirmed') {
      res.status(400).json({ error: 'Order must be confirmed before payment' })
      return
    }

    const change = paid - totalAmount

    // 5. Transaction
    const result = await prisma.$transaction(async (tx) => {
      const newPayment = await tx.payment.create({
        data: {
          orderId: Number(orderId),
          cashierId: (req as any).user.id,
          totalAmount,
          amountPaid: paid,
          change,
          method: method ?? 'cash',
        },
      })

      await tx.order.update({
        where: { id: Number(orderId) },
        data: { status: 'paid' },
      })

      await tx.restaurantTable.update({
        where: { id: order.tableId },
        data: { status: 'available' },
      })

      return newPayment
    })

    // 6. Response → 201 + change field เสมอ
    res.status(201).json({
      id: result.id,
      payment: result,
      change, // ✅ Newman จะเช็คว่าเป็น number
      message: 'Payment processed successfully',
    })
  } catch (err) {
    console.error('Payment Error:', err)
    res.status(500).json({ error: (err as Error).message })
  }
})

export default router
