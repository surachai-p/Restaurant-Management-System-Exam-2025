import { Router, Request, Response } from 'express'
import { Category } from '@prisma/client'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// GET /api/menu — list / search
router.get('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search ? String(req.query.search) : undefined
    const category = req.query.category ? String(req.query.category) : undefined

    // ✅ แก้ไข BUG-003: ใช้ findMany ปกติของ Prisma เพื่อป้องกัน SQL Injection 100%
    if (search) {
      const results = await prisma.menuItem.findMany({
        where: {
          isAvailable: true,
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        },
        orderBy: { name: 'asc' }
      })
      res.status(200).json(results)
      return
    }

    const items = await prisma.menuItem.findMany({
      where: {
        isAvailable: true,
        ...(category ? { category: category as Category } : {}),
      },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// POST /api/menu — admin only
router.post('/', authenticate, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body
    const { name, price, stock } = body

    if (!name || price === undefined) {
      res.status(400).json({ error: 'Name and price required' })
      return
    }

    // ✅ ป้องกันสต็อกติดลบ
    if (stock !== undefined && Number(stock) < 0) {
      res.status(400).json({ error: 'Stock cannot be negative' })
      return
    }

    const item = await prisma.menuItem.create({
      data: {
        name: String(name),
        description: body.description || "",
        price: Number(price),
        category: body.category as Category,
        imageUrl: body.imageUrl || "",
        isAvailable: true,
        // ใช้ชื่อฟิลด์แบบ Dynamic เพื่อป้องกัน Error ถ้าใน Schema ชื่อไม่ตรง
        ...((body as any).stock !== undefined ? { stock: Number(stock) } : {})
      } as any
    })
    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// PUT /api/menu/:id — admin only
// ✅ แก้ไข BUG-004: บังคับใช้ requireRole('admin') เท่านั้น
router.put('/:id', authenticate, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const body = req.body
    
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid ID' }); return }

    const item = await prisma.menuItem.findUnique({ where: { id } })
    if (!item) {
      res.status(404).json({ error: 'Menu item not found' })
      return
    }

    if (body.stock !== undefined && Number(body.stock) < 0) {
      res.status(400).json({ error: 'Stock cannot be negative' })
      return
    }

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        name: body.name || item.name,
        description: body.description !== undefined ? body.description : item.description,
        price: body.price !== undefined ? Number(body.price) : item.price,
        category: (body.category as Category) || item.category,
        isAvailable: body.isAvailable !== undefined ? body.isAvailable : item.isAvailable,
        imageUrl: body.imageUrl !== undefined ? body.imageUrl : item.imageUrl,
        ...((body as any).stock !== undefined ? { stock: Number(body.stock) } : {})
      } as any
    })
    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// DELETE /api/menu/:id — admin only
router.delete('/:id', authenticate, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) { res.status(400).json({ error: 'Invalid ID' }); return }

    const item = await prisma.menuItem.findUnique({ where: { id } })
    if (!item) {
      res.status(404).json({ error: 'Menu item not found' })
      return
    }
    // Soft Delete: เปลี่ยนสถานะเป็นไม่พร้อมใช้งานแทนการลบจริง
    await prisma.menuItem.update({ where: { id }, data: { isAvailable: false } })
    res.status(200).json({ message: 'Menu item disabled' })
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

export default router