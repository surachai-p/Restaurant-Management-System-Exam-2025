// src/lib/errors.ts
// Custom domain errors — distinct from generic Express errors so route
// handlers can branch cleanly and HTTP status codes stay consistent
// across the codebase. Designed by Nattawan (68030085) for the RMS exam.

export class DomainError extends Error {
  public readonly httpStatus: number
  public readonly code: string
  constructor(code: string, message: string, httpStatus = 400) {
    super(message)
    this.code = code
    this.httpStatus = httpStatus
    this.name = this.constructor.name
  }
}

export class PaymentError extends DomainError {
  constructor(code: 'PAY_INSUFFICIENT' | 'PAY_INVALID_STATE' | 'PAY_NO_ITEMS', message: string) {
    super(code, message, 400)
  }
}

export class OrderConflictError extends DomainError {
  constructor(message = 'Table already has an open order') {
    super('ORDER_DUPLICATE_OPEN', message, 409)
  }
}

export class ForbiddenError extends DomainError {
  constructor(permission: string) {
    super('RBAC_FORBIDDEN', `Missing permission: ${permission}`, 403)
  }
}

/**
 * Helper to translate a thrown DomainError (or anything else) into an
 * Express response. Keeps every route's catch block to one line.
 */
import type { Response } from 'express'
export const sendError = (res: Response, err: unknown): void => {
  if (err instanceof DomainError) {
    res.status(err.httpStatus).json({ error: err.message, code: err.code })
    return
  }
  const msg = err instanceof Error ? err.message : 'Internal server error'
  res.status(500).json({ error: msg, code: 'INTERNAL' })
}
