import { Router } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// POST /api/payments — ดำเนินการชำระเงิน (แคชเชียร์ หรือ แอดมินเท่านั้น)
// ⚠️ BUG-001 Fixed: เพิ่มการตรวจสอบยอดเงินที่จ่ายเข้ามาว่าต้องมากกว่าหรือเท่ากับยอดรวมอาหาร
router.post('/', authenticate, requireRole('admin', 'cashier'), async (req, res) => {
  try {
    const { orderId, amountPaid, method } = req.body as {
      orderId?: number; amountPaid?: number; method?: 'cash' | 'card' | 'qr'
    }
    if (!orderId || amountPaid === undefined) {
      res.status(400).json({ error: 'orderId and amountPaid required' }); return
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
    const paid = Number(amountPaid)

    // ⚠️ BUG-001 Fixed: ตรวจสอบถ้ายอดเงินชำระน้อยกว่ายอดรวม ให้ปฏิเสธการจ่ายเงินทันที
    if (paid < totalAmount) { 
      res.status(400).json({ error: 'Insufficient payment amount' }); 
      return 
    }

    // คำนวณเงินทอน (ค่าจะไม่ติดลบแล้วเพราะเราดักไว้ด้านบนแล้วค่ะ)
    const change = paid - totalAmount

    // ปรับเปลี่ยนไอดีจาก id เป็น sub เพื่อให้เข้าล็อคกับระบบเช็กยามเฝ้าประตู
    const [payment] = await prisma.$transaction([
      prisma.payment.create({
        data: { orderId, cashierId: req.user!.sub, totalAmount, amountPaid: paid, change, method: method ?? 'cash' },
      }),
      prisma.order.update({ where: { id: orderId }, data: { status: 'paid' } }),
      prisma.restaurantTable.update({ where: { id: order.tableId }, data: { status: 'available' } }),
    ])

    res.status(201).json({ payment, change, message: 'Payment processed successfully' })
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
    if (!payment) { res.status(404).json({ error: 'Payment not found' }); return }
    res.json(payment)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

export default router
