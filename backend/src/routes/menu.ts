// src/routes/menu.ts
import { Router } from 'express'
import { Category } from '@prisma/client'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// GET /api/menu  — list / search (parameterized — SQL Injection safe)
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, category } = req.query as { search?: string; category?: string }

    if (search) {
      // Using tagged-template $queryRaw so the search value is always sent as a
      // bound parameter — no string interpolation reaches the SQL layer.
      const results = await prisma.$queryRaw`SELECT * FROM menu_items
        WHERE (name ILIKE ${'%' + search + '%'} OR description ILIKE ${'%' + search + '%'})
        AND "isAvailable" = true`
      res.json(results); return
    }

    const items = await prisma.menuItem.findMany({
      where: {
        isAvailable: true,
        ...(category ? { category: category as any } : {}),
      },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })
    res.json(items)
  } catch {
    res.status(500).json({ error: 'Failed to fetch menu items' })
  }
})

// GET /api/menu/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: Number(req.params.id) } })
    if (!item) { res.status(404).json({ error: 'Menu item not found' }); return }
    res.json(item)
  } catch {
    res.status(500).json({ error: 'Failed to fetch menu item' })
  }
})

// POST /api/menu — admin only
router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const { name, description, price, category, stockQuantity, imageUrl } = req.body as {
      name?: string; description?: string; price?: number; stockQuantity?: number
      category?: Category; imageUrl?: string
    }
    if (!name || price === undefined) {
      res.status(400).json({ error: 'Name and price required' }); return
    }
    const numPrice = Number(price)
    if (!Number.isFinite(numPrice) || numPrice <= 0) {
      res.status(400).json({ error: 'Price must be a positive number' }); return
    }
    const validCategories: Category[] = ['food', 'drink', 'dessert']
    if (category && !validCategories.includes(category)) {
      res.status(400).json({ error: 'Invalid category' }); return
    }
    const stock = Number(stockQuantity ?? 0)
    if (!Number.isInteger(stock) || stock < 0) {
      res.status(400).json({ error: 'Stock must be a non-negative integer' }); return
    }
    const item = await prisma.menuItem.create({
      data: { name, description, price: numPrice, category, stockQuantity: stock, imageUrl },
    })
    res.status(201).json(item)
  } catch {
    res.status(500).json({ error: 'Failed to create menu item' })
  }
})

// PUT /api/menu/:id — admin only
router.put('/:id', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: Number(req.params.id) } })
    if (!item) { res.status(404).json({ error: 'Menu item not found' }); return }
    const { name, description, price, category, isAvailable, stockQuantity, imageUrl } = req.body
    const data: Record<string, unknown> = {}
    if (name !== undefined) data.name = name
    if (description !== undefined) data.description = description
    if (imageUrl !== undefined) data.imageUrl = imageUrl
    if (category !== undefined) {
      const validCategories: Category[] = ['food', 'drink', 'dessert']
      if (!validCategories.includes(category)) { res.status(400).json({ error: 'Invalid category' }); return }
      data.category = category
    }
    if (price !== undefined) {
      const numPrice = Number(price)
      if (!Number.isFinite(numPrice) || numPrice <= 0) {
        res.status(400).json({ error: 'Price must be a positive number' }); return
      }
      data.price = numPrice
    }
    if (isAvailable !== undefined) data.isAvailable = Boolean(isAvailable)
    if (stockQuantity !== undefined) {
      const stock = Number(stockQuantity)
      if (!Number.isInteger(stock) || stock < 0) {
        res.status(400).json({ error: 'Stock must be a non-negative integer' }); return
      }
      data.stockQuantity = stock
    }
    const updated = await prisma.menuItem.update({ where: { id: item.id }, data })
    res.json(updated)
  } catch {
    res.status(500).json({ error: 'Failed to update menu item' })
  }
})

// DELETE /api/menu/:id — soft delete, admin only ✅
router.delete('/:id', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: Number(req.params.id) } })
    if (!item) { res.status(404).json({ error: 'Menu item not found' }); return }
    await prisma.menuItem.update({ where: { id: Number(req.params.id) }, data: { isAvailable: false } })
    res.json({ message: 'Menu item disabled' })
  } catch {
    res.status(500).json({ error: 'Failed to disable menu item' })
  }
})

export default router
