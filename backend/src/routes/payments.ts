// src/routes/payments.ts
import { Router } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// POST /api/payments
// ⚠️ BUG-001 [Critical]: No validation that amountPaid >= totalAmount
// ✓ Validation: amountPaid must be >= totalAmount to prevent negative change
router.post('/', authenticate, requireRole('admin', 'cashier'), async (req, res) => {
  try {
    // 1. รับค่าพร้อมกำหนด Type ให้ชัดเจนเหมือนเดิม
    const { amountPaid, method } = req.body as { 
      amountPaid?: number; 
      method?: 'cash' | 'card' | 'qr' 
    };

    // 2. ดักเรื่องชื่อตัวแปร ( orderId หรือ order_id )
    const rawOrderId = req.body.orderId || req.body.order_id;

    if (!rawOrderId || amountPaid === undefined) {
      res.status(400).json({ error: 'orderId and amountPaid required' });
      return;
    }

    // 3. บังคับเป็น Number เพื่อแก้บั๊ก 404
    const orderId = Number(rawOrderId);

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'orderId must be a valid number' });
      return;
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId }, 
      include: { items: true },
    });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    if (order.status !== 'confirmed') {
      res.status(400).json({ error: 'Order must be confirmed before payment' }); return
    }
    if (!order.items.length) {
      res.status(400).json({ error: 'Order has no items' }); return
    }

    const totalAmount = Number(order.totalAmount)
    const paid = Number(amountPaid)

    // ⚠️ BUG-001: Missing underpayment validation
    if (paid < totalAmount) { 
      res.status(400).json({ error: 'Insufficient payment amount' }); 
      return 
    }

    // ⚠️ BUG-001: change will be NEGATIVE if paid < totalAmount
    const change = paid - totalAmount

    const [payment] = await prisma.$transaction([
      prisma.payment.create({
        data: { orderId, cashierId: req.user!.id, totalAmount, amountPaid: paid, change, method: method ?? 'cash' },
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
