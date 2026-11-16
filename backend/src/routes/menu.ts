
import { Router } from 'express'
import { Category } from '@prisma/client'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const router = Router()

// GET /api/menu — list / search
// BUG-003 FIX: Safe search using Prisma ORM
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, category } = req.query as {
      search?: string
      category?: string
    }

    // Validate category if provided
    if (
      category &&
      !Object.values(Category).includes(category as Category)
    ) {
      res.status(400).json({
        error: 'Invalid menu category',
      })
      return
    }

    const items = await prisma.menuItem.findMany({
      where: {
        isAvailable: true,

        ...(category
          ? { category: category as Category }
          : {}),

        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
              ],
            }
          : {}),
      },

      orderBy: [
        { category: 'asc' },
        { name: 'asc' },
      ],
    })

    res.json(items)
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    })
  }
})

// GET /api/menu/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({
      where: { id: Number(req.params.id) },
    })

    if (!item) {
      res.status(404).json({
        error: 'Menu item not found',
      })
      return
    }

    res.json(item)
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    })
  }
})

// POST /api/menu — Admin only
router.post(
  '/',
  authenticate,
  requireRole('admin'),
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        imageUrl,
      } = req.body as {
        name?: string
        description?: string
        price?: number
        category?: Category
        imageUrl?: string
      }

      if (!name || price === undefined) {
        res.status(400).json({
          error: 'Name and price required',
        })
        return
      }

      const item = await prisma.menuItem.create({
        data: {
          name,
          description,
          price,
          category,
          imageUrl,
        },
      })

      res.status(201).json(item)
    } catch (err) {
      res.status(500).json({
        error: (err as Error).message,
      })
    }
  },
)

// PUT /api/menu/:id — Admin only
// BUG-004 FIX: Prevent waiter from updating menu prices
router.put(
  '/:id',
  authenticate,
  requireRole('admin'),
  async (req, res) => {
    try {
      const itemId = Number(req.params.id)

      if (!Number.isInteger(itemId) || itemId <= 0) {
        res.status(400).json({
          error: 'Invalid menu item ID',
        })
        return
      }

      const item = await prisma.menuItem.findUnique({
        where: { id: itemId },
      })

      if (!item) {
        res.status(404).json({
          error: 'Menu item not found',
        })
        return
      }

      const {
        name,
        description,
        price,
        category,
        isAvailable,
        imageUrl,
      } = req.body

      const updated = await prisma.menuItem.update({
        where: { id: itemId },
        data: {
          name,
          description,
          price,
          category,
          isAvailable,
          imageUrl,
        },
      })

      res.json(updated)
    } catch (err) {
      res.status(500).json({
        error: (err as Error).message,
      })
    }
  },
)

// DELETE /api/menu/:id — Soft delete, Admin only
router.delete(
  '/:id',
  authenticate,
  requireRole('admin'),
  async (req, res) => {
    try {
      const item = await prisma.menuItem.findUnique({
        where: { id: Number(req.params.id) },
      })

      if (!item) {
        res.status(404).json({
          error: 'Menu item not found',
        })
        return
      }

      await prisma.menuItem.update({
        where: { id: Number(req.params.id) },
        data: { isAvailable: false },
      })

      res.json({
        message: 'Menu item disabled',
      })
    } catch (err) {
      res.status(500).json({
        error: (err as Error).message,
      })
    }
  },
)

export default router
