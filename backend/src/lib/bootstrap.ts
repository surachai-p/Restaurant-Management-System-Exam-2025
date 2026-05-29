// src/lib/bootstrap.ts
// One-time DB bootstrap: creates a *partial unique index* that enforces
// "at most one open order per table" at the database layer.
//
// This is the BUG-002 fix layer. Prisma's schema-level @@unique cannot
// express a `WHERE status='open'` clause, so we use a raw `CREATE UNIQUE
// INDEX IF NOT EXISTS` here. The index makes the constraint
// race-condition-proof: even under concurrent POST /api/orders, only
// one INSERT can succeed; the other returns Prisma error P2002.
//
// Author: Nattawan (68030085).

import prisma from './prisma'

const PARTIAL_UNIQUE_OPEN_ORDER = `
  CREATE UNIQUE INDEX IF NOT EXISTS uniq_open_order_per_table
  ON orders ("tableId")
  WHERE status = 'open'
`

export const ensureDatabaseConstraints = async (): Promise<void> => {
  try {
    await prisma.$executeRawUnsafe(PARTIAL_UNIQUE_OPEN_ORDER)
    console.log('[bootstrap] partial unique index ensured: uniq_open_order_per_table')
  } catch (err) {
    console.warn('[bootstrap] could not ensure index:', (err as Error).message)
  }
}
