// src/lib/permissions.ts
// Permission matrix — single source of truth for "who can do what".
// Adding/removing a capability is a 1-line change to this table instead
// of hunting `requireRole('admin')` calls scattered across routes.
//
// Author: Nattawan (68030085) — RMS exam refactor.

import type { Role } from '@prisma/client'

export type Permission =
  | 'menu:read'
  | 'menu:create'
  | 'menu:update'
  | 'menu:delete'
  | 'order:create'
  | 'order:read'
  | 'order:cancel'
  | 'payment:process'
  | 'report:read'

const MATRIX: Record<Role, ReadonlySet<Permission>> = {
  admin: new Set<Permission>([
    'menu:read', 'menu:create', 'menu:update', 'menu:delete',
    'order:create', 'order:read', 'order:cancel',
    'payment:process', 'report:read',
  ]),
  cashier: new Set<Permission>([
    'menu:read',
    'order:read', 'order:cancel',
    'payment:process', 'report:read',
  ]),
  waiter: new Set<Permission>([
    'menu:read',
    'order:create', 'order:read',
  ]),
}

export const hasPermission = (role: Role, permission: Permission): boolean =>
  MATRIX[role]?.has(permission) ?? false
