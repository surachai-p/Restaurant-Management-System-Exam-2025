import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app'; // Express app
import { prisma } from '../../src/lib/prisma';

// ตัวอย่าง: ทดสอบ API Orders พร้อม Database
describe('Orders API - Integration Tests', () => {
  let authToken: string;
  let testUserId: number;
  let testMenuItemId: number;

  beforeAll(async () => {
    // ล้างข้อมูลทดสอบและตั้งค่าเริ่มต้น
    await prisma.order.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // สร้างผู้ใช้ทดสอบและเข้าสู่ระบบ
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'TestPass123!',
        name: 'Test User'
      });

    authToken = registerRes.body.token;
    testUserId = registerRes.body.user.id;

    // ให้ค่า MenuItem ID หากจำเป็น
    testMenuItemId = 1;
  });

  describe('POST /api/orders', () => {
    it('should create new order with valid data', async () => {
      const orderData = {
        items: [
          { menuItemId: testMenuItemId, quantity: 2 },
          { menuItemId: testMenuItemId + 1, quantity: 1 }
        ],
        tableNumber: 5
      };

      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData);

      expect(response.status).toBe(201);
      expect(response.body.order).toBeDefined();
      expect(response.body.order.userId).toBe(testUserId);
      expect(response.body.order.status).toBe('PENDING');
    });

    it('should reject order without authentication', async () => {
      const orderData = {
        items: [{ menuItemId: testMenuItemId, quantity: 1 }],
        tableNumber: 5
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      expect(response.status).toBe(401);
    });

    it('should reject order with invalid table number', async () => {
      const orderData = {
        items: [{ menuItemId: testMenuItemId, quantity: 1 }],
        tableNumber: -1 // Invalid
      };

      const response = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/orders/:id', () => {
    let orderId: number;

    beforeEach(async () => {
      // สร้าง order สำหรับทดสอบ GET
      const createRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          items: [{ menuItemId: testMenuItemId, quantity: 1 }],
          tableNumber: 5
        });

      orderId = createRes.body.order.id;
    });

    it('should get order details', async () => {
      const response = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.order.id).toBe(orderId);
    });

    it('should not get other user order', async () => {
      // สร้างผู้ใช้ใหม่
      const newUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'other@example.com',
          password: 'TestPass123!',
          name: 'Other User'
        });

      const response = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${newUserRes.body.token}`);

      expect(response.status).toBe(403); // Forbidden
    });
  });

  describe('Payment Integration', () => {
    let orderId: number;

    beforeEach(async () => {
      const createRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          items: [{ menuItemId: testMenuItemId, quantity: 2 }],
          tableNumber: 5
        });

      orderId = createRes.body.order.id;
    });

    it('should process payment and update order status', async () => {
      const paymentRes = await request(app)
        .post('/api/payments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          orderId,
          amount: 500.00,
          paymentMethod: 'CREDIT_CARD'
        });

      expect(paymentRes.status).toBe(200);

      // ตรวจสอบว่า order status เปลี่ยนเป็น COMPLETED
      const orderRes = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(orderRes.body.order.status).toBe('COMPLETED');
    });
  });
});
