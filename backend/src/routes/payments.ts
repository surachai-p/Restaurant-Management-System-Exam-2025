// src/routes/payments.ts
import { Router, NextFunction, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// POST /api/payments
router.post('/', authenticate, requireRole('admin', 'cashier'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId, amountPaid, method } = req.body as {
      orderId?: number; amountPaid?: number; method?: 'cash' | 'card' | 'qr'
    }

    // 1. ตรวจสอบข้อมูลเบื้องต้น
    if (!orderId || amountPaid === undefined || amountPaid === null) {
      res.status(400).json({ error: 'orderId and amountPaid required' })
      return
    }

    const paid = Number(amountPaid)
    if (isNaN(paid) || paid < 0) {
      res.status(400).json({ error: 'amountPaid must be a valid positive number' })
      return
    }

    // 2. ดึงข้อมูลออเดอร์มาตรวจสอบ
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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

    // 🚨 [จุดสำคัญที่สุด]: บล็อกไม่ให้เงินน้อยกว่ายอดรวมหลุดไปทำรายการเด็ดขาด!
    if (paid < totalAmount) {
      res.status(400).json({ 
        error: 'Insufficient payment amount', 
        required: totalAmount, 
        provided: paid 
      })
      return 
    }

    // 🔒 [เซฟตี้ชั้นที่ 2]: บังคับคำนวณเงินทอนไม่ให้ต่ำกว่า 0 เสมอในระดับตัวแปร
    const change = Math.max(0, paid - totalAmount)

    // 3. บันทึกข้อมูลลงฐานข้อมูลแบบพร้อมกัน (Atomicity)
    const [payment] = await prisma.$transaction([
      prisma.payment.create({
        data: { 
          orderId, 
          cashierId: req.user!.id, 
          totalAmount, 
          amountPaid: paid, 
          change, 
          method: method ?? 'cash' 
        },
      }),
      prisma.order.update({ where: { id: orderId }, data: { status: 'paid' } }),
      prisma.restaurantTable.update({ where: { id: order.tableId }, data: { status: 'available' } }),
    ])

    res.status(201).json({ payment, change, message: 'Payment processed successfully' })
  } catch (err) {
    // 💡 ปรับปรุงเพื่อให้ Express Error Handler ช่วยดูแลแอปพลิเคชันไม่ให้ค้าง
    res.status(500).json({ error: (err as Error).message })
    next(err)
  }
})

// GET /api/payments/:orderId
router.get('/:orderId', authenticate, async (req: Request, res: Response, next: NextFunction) => {
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
    next(err)
  }
})

export default router