import prisma from '../src/lib/prisma'

async function main() {
  const waiter = await prisma.user.findFirst({ where: { role: 'waiter' } })
  const table = await prisma.restaurantTable.findFirst({ where: { id: 5 } })
  const menu = await prisma.menuItem.findFirst()
  if (waiter && table && menu) {
    await prisma.order.upsert({
      where: { id: 9999 },
      update: { status: 'confirmed', totalAmount: 100 },
      create: {
        id: 9999,
        tableId: table.id,
        waiterId: waiter.id,
        status: 'confirmed',
        totalAmount: 100,
        items: {
          create: [{ menuItemId: menu.id, quantity: 1, unitPrice: 100, subtotal: 100 }],
        },
      },
    })
  }
}

main().finally(() => prisma.$disconnect())
