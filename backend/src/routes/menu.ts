// src/routes/menu.ts
// BUG-003 (SQL Injection on search) + BUG-004 (RBAC bypass on PUT) —
// rewritten by Nattawan (68030085).
//
// BUG-003 original fix style: keep $queryRaw but use tagged templates.
// This version: remove raw SQL entirely. The search now uses
// prisma.menuItem.findMany with `contains` + `mode: 'insensitive'` —
// no raw SQL string ever touches the database driver, eliminating the
// attack surface rather than just sanitising it.
//
// BUG-004 original fix style: add inline `requireRole('admin')`.
// This version: data-driven `can('menu:update')` middleware reading
// from a central permission matrix (lib/permissions.ts), so future
// permission changes are one line in a table — not scattered greps.

import { Router } from 'express'
import { Category, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import { authenticate } from '../middleware/auth'
import { can } from '../middleware/rbac'
import { sendError } from '../lib/errors'

const router = Router()

router.get('/', authenticate, can('menu:read'), async (req, res) => {
  try {
    const { search, category } = req.query as { search?: string; category?: string }

    // BUG-003 fix: no raw SQL. Prisma's `contains` + `mode: 'insensitive'`
    // emits a parameterised ILIKE under the hood — user input is bound,
    // never concatenated.
    const where: Prisma.MenuItemWhereInput = {
      isAvailable: true,
      ...(category ? { category: category as Category } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    }

    const items = await prisma.menuItem.findMany({
      where,
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })
    res.json(items)
  } catch (err) { sendError(res, err) }
})

router.get('/:id', authenticate, can('menu:read'), async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: Number(req.params.id) } })
    if (!item) { res.status(404).json({ error: 'Menu item not found', code: 'MENU_NOT_FOUND' }); return }
    res.json(item)
  } catch (err) { sendError(res, err) }
})

router.post('/', authenticate, can('menu:create'), async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body as {
      name?: string; description?: string; price?: number
      category?: Category; imageUrl?: string
    }
    if (!name || price === undefined) {
      res.status(400).json({ error: 'Name and price required', code: 'MENU_BAD_REQUEST' })
      return
    }
    const item = await prisma.menuItem.create({ data: { name, description, price, category, imageUrl } })
    res.status(201).json(item)
  } catch (err) { sendError(res, err) }
})

// BUG-004 fix: `can('menu:update')` consults the permission matrix.
// Only roles whose set contains 'menu:update' (currently: admin) pass.
router.put('/:id', authenticate, can('menu:update'), async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: Number(req.params.id) } })
    if (!item) { res.status(404).json({ error: 'Menu item not found', code: 'MENU_NOT_FOUND' }); return }
    const { name, description, price, category, isAvailable, imageUrl } = req.body
    const updated = await prisma.menuItem.update({
      where: { id: Number(req.params.id) },
      data: { name, description, price, category, isAvailable, imageUrl },
    })
    res.json(updated)
  } catch (err) { sendError(res, err) }
})

router.delete('/:id', authenticate, can('menu:delete'), async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({ where: { id: Number(req.params.id) } })
    if (!item) { res.status(404).json({ error: 'Menu item not found', code: 'MENU_NOT_FOUND' }); return }
    await prisma.menuItem.update({ where: { id: Number(req.params.id) }, data: { isAvailable: false } })
    res.json({ message: 'Menu item disabled' })
  } catch (err) { sendError(res, err) }
})

export default router
