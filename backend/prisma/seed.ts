import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. ล้างข้อมูลเก่าออกให้หมดก่อนเพื่อป้องกันข้อมูลซ้ำ (ตามลำดับความสัมพันธ์)
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.restaurantTable.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.user.deleteMany();

  // 2. สร้างรหัสผ่านที่ผ่านการแฮชสำหรับผู้ใช้เริ่มต้น
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 3. สร้างข้อมูลผู้ใช้จำลอง (Users)
  console.log('👥 Seeding users...');
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      name: 'Manager Somchai',
      role: 'admin',
    },
  });

  const cashier = await prisma.user.create({
    data: {
      username: 'cashier01',
      password: hashedPassword,
      name: 'Somsri Cashier',
      role: 'cashier',
    },
  });

  const waiter = await prisma.user.create({
    data: {
      username: 'waiter01',
      password: hashedPassword,
      name: 'Anan Waiter',
      role: 'waiter',
    },
  });

  // 4. สร้างเมนูอาหารเริ่มต้น (Menu Items)
  console.log('🍔 Seeding menu items...');
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Basil Fried Rice with Pork',
        description: 'Spicy Thai basil fried rice with minced pork and fried egg',
        price: 65.00,
        category: 'food',
        isAvailable: true,
      },
      {
        name: 'Tom Yum Goong',
        description: 'Spicy and sour lemongrass soup with prawns',
        price: 150.00,
        category: 'food',
        isAvailable: true,
      },
      {
        name: 'Iced Green Tea',
        description: 'Sweet and creamy Thai style iced green tea',
        price: 45.00,
        category: 'drink',
        isAvailable: true,
      },
      {
        name: 'Water',
        description: 'Bottled drinking water with ice',
        price: 10.00,
        category: 'drink',
        isAvailable: true,
      },
      {
        name: 'Mango Sticky Rice',
        description: 'Sweet sticky rice with ripe mango and coconut milk',
        price: 89.00,
        category: 'dessert',
        isAvailable: true,
      },
    ],
  });

  // 5. สร้างโต๊ะอาหารจำลอง (Restaurant Tables)
  console.log('🪑 Seeding restaurant tables...');
  await prisma.restaurantTable.createMany({
    data: [
      { tableNumber: 1, capacity: 2, status: 'available' },
      { tableNumber: 2, capacity: 4, status: 'available' },
      { tableNumber: 3, capacity: 4, status: 'available' },
      { tableNumber: 4, capacity: 6, status: 'available' },
      { tableNumber: 5, capacity: 8, status: 'available' },
    ],
  });

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
