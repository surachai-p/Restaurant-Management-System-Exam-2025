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
    // 1. ดักทั้ง orderId และ order_id เพื่อแก้ปัญหา 404 (จาก Newman)
    const rawOrderId = req.body.orderId || req.body.order_id;
    const { amountPaid, method } = req.body as { 
      amountPaid?: number; 
      method?: 'cash' | 'card' | 'qr' 
    };

    // 2. ตรวจสอบเบื้องต้นว่าส่งค่าที่จำเป็นมาครบไหม
    if (!rawOrderId || amountPaid === undefined) {
      res.status(400).json({ error: 'orderId and amountPaid required' });
      return;
    }

    // 3. ค้นหาออเดอร์โดยบังคับเป็น Number เพื่อความแม่นยำ
    const order = await prisma.order.findUnique({
      where: { id: Number(rawOrderId) }, 
      include: { items: true },
    });

    // --- ส่วนตรวจสอบความถูกต้อง (Business Logic) ---
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // เช็คสถานะ (ป้องกันการจ่ายซ้ำหรือออเดอร์ที่ยังไม่เสร็จ)
    if (order.status !== 'confirmed') {
      res.status(400).json({ error: 'Order must be confirmed before payment' });
      return;
    }

    // เช็คว่ามีรายการอาหารไหม
    if (!order.items.length) {
      res.status(400).json({ error: 'Order has no items' });
      return;
    }

    // --- ส่วนตรวจสอบยอดเงิน (BUG-001 Fix) ---
    const totalAmount = Number(order.totalAmount);
    const paid = Number(amountPaid);

    if (paid < totalAmount) { 
      res.status(400).json({ error: 'Insufficient payment amount' }); 
      return; 
    }

    // 4. บันทึกการจ่ายเงิน (ตรวจสอบให้ตรงกับ schema.prisma)
    const change = paid - totalAmount;
    const [payment] = await prisma.$transaction([
      prisma.payment.create({
      data: {
        orderId: order.id,         // จากตัวแปร orderId
        cashierId: req.user!.id,  // จาก middleware auth
        totalAmount: totalAmount, // ยอดรวมที่ดึงจาก order
        amountPaid: paid,         // ยอดเงินที่รับมาจริง
        change: change,           // เงินทอนที่คำนวณไว้
        method: method ?? 'cash', // วิธีการจ่ายเงิน
      }
    }),

      prisma.order.update({ 
        where: { id: order.id }, 
        data: { status: 'paid' } 
      }),

      prisma.restaurantTable.update({ 
        where: { id: order.tableId }, 
        data: { status: 'available' } 
      }),
    ])
    
    res.status(201).json({ 
      message: 'Payment successful', 
      change: paid - totalAmount 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
