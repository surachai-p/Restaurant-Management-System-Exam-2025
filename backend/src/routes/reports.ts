// src/routes/reports.ts
import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// GET /api/reports/sales?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// ✅ แก้ไข BUG-005 [Date Filter]: เปลี่ยนมาใช้ gte (>=) เพื่อไม่ให้ข้อมูลของเวลาเที่ยงคืนตรงตกหล่น
router.get('/sales', authenticate, requireRole('admin', 'cashier'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query as { startDate?: string; endDate?: string }

    const dateFilter: { gte?: Date; lte?: Date } = {}

    if (startDate) {
      // ✅ แก้ไข BUG-005: ใช้ gte (Greater Than or Equals) 
      dateFilter.gte = new Date(startDate) 
    }
    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      dateFilter.lte = end
    }

    const payments = await prisma.payment.findMany({
      where: Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {},
      include: {
        order: {
          include: {
            items: { include: { menuItem: true } },
          },
        },
        cashier: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const totalRevenue = payments.reduce((s: number, p: any) => s + Number(p.totalAmount), 0)

    // Top selling items
    const itemMap: Record<string, { name: string; quantity: number; revenue: number }> = {}
    payments.forEach((p: any) => {
      p.order.items.forEach((i: any) => {
        const name = i.menuItem.name
        if (!itemMap[name]) itemMap[name] = { name, quantity: 0, revenue: 0 }
        itemMap[name].quantity += i.quantity
        itemMap[name].revenue += Number(i.subtotal)
      })
    })
    const topItems = Object.values(itemMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5)

    res.json({ totalRevenue, totalOrders: payments.length, payments, topItems })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// GET /api/reports/daily
router.get('/daily', authenticate, requireRole('admin', 'cashier'), async (_req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1)

    const payments = await prisma.payment.findMany({
      where: { createdAt: { gte: today, lt: tomorrow } },
    })
    const revenue = payments.reduce((s: number, p: any) => s + Number(p.totalAmount), 0)
    res.json({ date: today.toDateString(), totalOrders: payments.length, totalRevenue: revenue })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

export default router