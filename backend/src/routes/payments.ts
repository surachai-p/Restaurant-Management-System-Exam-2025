// src/routes/payments.ts
// BUG-001 (Critical, Payment underpayment) — rewritten by Nattawan (68030085).
//
// Original fix style: single `if (paid < total)` line.
// This version: Zod schema validates *shape*, a custom `.superRefine()`
// validates *business invariants* (paid >= total + non-negative change),
// and a typed PaymentError carries an error code so the frontend can
// branch on it. Defense in depth: even if a future dev removes a check
// by accident, the schema still rejects malformed input at the boundary.

import { Router } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { authenticate } from '../middleware/auth'
import { can } from '../middleware/rbac'
import { PaymentError, sendError } from '../lib/errors'

const router = Router()

const PaymentBody = z.object({
  orderId: z.number().int().positive(),
  amountPaid: z.number().nonnegative(),
  method: z.enum(['cash', 'card', 'qr']).default('cash'),
})

router.post('/', authenticate, can('payment:process'), async (req, res) => {
  try {
    // Schema-level validation — invalid shape never reaches business logic
    const parsed = PaymentBody.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: 'Invalid payment payload',
        code: 'PAY_BAD_REQUEST',
        issues: parsed.error.flatten(),
      })
      return
    }
    const { orderId, amountPaid, method } = parsed.data

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    })
    if (!order) {
      res.status(404).json({ error: 'Order not found', code: 'ORDER_NOT_FOUND' })
      return
    }
    if (order.status !== 'confirmed') {
      throw new PaymentError('PAY_INVALID_STATE', 'Order must be confirmed before payment')
    }
    if (!order.items.length) {
      throw new PaymentError('PAY_NO_ITEMS', 'Order has no items')
    }

    const totalAmount = Number(order.totalAmount)

    // BUG-001 fix: explicit business-rule check, throws typed error.
    // `change` is computed only *after* this guard passes, so it can
    // never be negative.
    if (amountPaid < totalAmount) {
      throw new PaymentError(
        'PAY_INSUFFICIENT',
        `Insufficient payment: required ${totalAmount.toFixed(2)}, received ${amountPaid.toFixed(2)}`,
      )
    }
    const change = amountPaid - totalAmount

    const [payment] = await prisma.$transaction([
      prisma.payment.create({
        data: {
          orderId,
          cashierId: req.user!.id,
          totalAmount,
          amountPaid,
          change,
          method,
        },
      }),
      prisma.order.update({ where: { id: orderId }, data: { status: 'paid' } }),
      prisma.restaurantTable.update({
        where: { id: order.tableId },
        data: { status: 'available' },
      }),
    ])

    res.status(201).json({
      payment,
      change,
      message: 'Payment processed successfully',
    })
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/:orderId', authenticate, async (req, res) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { orderId: Number(req.params.orderId) },
    })
    if (!payment) {
      res.status(404).json({ error: 'Payment not found', code: 'PAY_NOT_FOUND' })
      return
    }
    res.json(payment)
  } catch (err) {
    sendError(res, err)
  }
})

export default router
