// src/routes/reports.ts
import { Router } from 'express'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// GET /api/reports/sales?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// Uses gte for startDate (inclusive) — BUG-005 fixed.
router.get('/sales', authenticate, requireRole('admin', 'cashier'), async (req, res) => {
  try {
    const { startDate, endDate } = req.query as { startDate?: string; endDate?: string }

    const dateFilter: { gte?: Date; lte?: Date } = {}

    if (startDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0)
      dateFilter.gte = start
    }
    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      dateFilter.lte = end
    }

    const payments = await prisma.payment.findMany({
      where: Object.keys(dateFilter).length ? { createdAt: dateFilter as any } : {},
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

    // Best-selling items
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
  } catch {
    res.status(500).json({ error: 'Failed to generate sales report' })
  }
})

// GET /api/reports/daily
router.get('/daily', authenticate, requireRole('admin', 'cashier'), async (_req, res) => {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1)

    const payments = await prisma.payment.findMany({
      where: { createdAt: { gte: today, lt: tomorrow } },
    })
    const revenue = payments.reduce((s: number, p: any) => s + Number(p.totalAmount), 0)
    res.json({ date: today.toDateString(), totalOrders: payments.length, totalRevenue: revenue })
  } catch {
    res.status(500).json({ error: 'Failed to generate daily report' })
  }
})

// GET /api/reports/monthly?year=YYYY&month=MM
// Monthly sales totals grouped by day, plus best-selling items for the month.
router.get('/monthly', authenticate, requireRole('admin', 'cashier'), async (req, res) => {
  try {
    const { year, month } = req.query as { year?: string; month?: string }

    const now = new Date()
    const y = Number(year) || now.getFullYear()
    const m = Number(month) || now.getMonth() + 1
    if (m < 1 || m > 12) {
      res.status(400).json({ error: 'month must be 1-12' }); return
    }

    const start = new Date(y, m - 1, 1, 0, 0, 0, 0)
    const end = new Date(y, m, 0, 23, 59, 59, 999)

    const payments = await prisma.payment.findMany({
      where: { createdAt: { gte: start, lte: end } },
      include: {
        order: { include: { items: { include: { menuItem: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const totalRevenue = payments.reduce((s: number, p: any) => s + Number(p.totalAmount), 0)

    const itemMap: Record<string, { name: string; quantity: number; revenue: number }> = {}
    for (const p of payments) {
      for (const i of p.order.items) {
        const name = i.menuItem.name
        if (!itemMap[name]) itemMap[name] = { name, quantity: 0, revenue: 0 }
        itemMap[name].quantity += i.quantity
        itemMap[name].revenue += Number(i.subtotal)
      }
    }
    const bestSelling = Object.values(itemMap).sort((a, b) => b.quantity - a.quantity)

    res.json({
      month: `${y}-${String(m).padStart(2, '0')}`,
      totalOrders: payments.length,
      totalRevenue,
      bestSelling,
    })
  } catch {
    res.status(500).json({ error: 'Failed to generate monthly report' })
  }
})

export default router
