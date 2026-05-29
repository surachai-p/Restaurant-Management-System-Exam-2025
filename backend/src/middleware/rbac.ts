// src/middleware/rbac.ts
// Data-driven RBAC middleware. Reads from the permission matrix in
// lib/permissions.ts so role changes don't require code changes in routes.
//
// Usage:  router.put('/:id', authenticate, can('menu:update'), handler)
//
// Author: Nattawan (68030085).

import type { Request, Response, NextFunction } from 'express'
import { hasPermission, type Permission } from '../lib/permissions'

export const can = (permission: Permission) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated', code: 'AUTH_REQUIRED' })
      return
    }
    if (!hasPermission(req.user.role, permission)) {
      res.status(403).json({
        error: `Role '${req.user.role}' lacks permission '${permission}'`,
        code: 'RBAC_FORBIDDEN',
      })
      return
    }
    next()
  }
