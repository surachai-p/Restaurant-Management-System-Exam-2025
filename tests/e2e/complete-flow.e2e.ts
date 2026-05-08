import { test, expect, Page } from '@playwright/test';

// ตัวอย่าง: ทดสอบขั้นตอนสั่งอาหารจากต้นถึงปลาย
test.describe('Restaurant Management System - E2E Tests', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:5173'); // Frontend URL
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('User should be able to login and view dashboard', async () => {
    // ไปหน้า login
    await expect(page).toHaveURL(/login/i);

    // ป้อนข้อมูลเข้าสู่ระบบ
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'TestPass123!');
    
    // คลิกปุ่ม login
    await page.click('button:has-text("Login")');

    // รอให้เข้าสู่ dashboard
    await page.waitForURL(/dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('User should be able to browse menu and place order', async () => {
    // Login
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'TestPass123!');
    await page.click('button:has-text("Login")');
    await page.waitForURL(/dashboard/);

    // ไปหน้า Menu
    await page.click('a:has-text("Menu")');
    await page.waitForURL(/menu/);

    // ตรวจสอบว่ามีรายการอาหาร
    const menuItems = page.locator('[data-testid="menu-item"]');
    await expect(menuItems.first()).toBeVisible();

    // เลือกอาหาร 2 รายการ
    await page.click('text=Add to Cart');
    await page.click('button:has-text("Add to Cart")');

    // ไปหน้า Orders
    await page.click('a:has-text("Orders")');
    await page.waitForURL(/orders/);

    // ตรวจสอบ order
    await expect(page.locator('text=Pending')).toBeVisible();

    // ดูรายละเอียด order
    await page.click('[data-testid="order-detail"]');
    
    // ตรวจสอบจำนวนรายการ
    const orderItems = page.locator('[data-testid="order-item"]');
    await expect(orderItems).toHaveCount(2);
  });

  test('User should be able to complete payment', async () => {
    // Login
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('input[placeholder*="Password"]', 'TestPass123!');
    await page.click('button:has-text("Login")');
    await page.waitForURL(/dashboard/);

    // สร้าง order
    await page.click('a:has-text("Menu")');
    await page.waitForURL(/menu/);
    await page.click('text=Add to Cart');
    await page.click('button:has-text("Checkout")');

    // เข้าหน้า payment
    await page.waitForURL(/payment/);
    await expect(page.locator('h1')).toContainText('Payment');

    // กรอกข้อมูลการ์ด
    await page.fill('input[placeholder*="Card Number"]', '4111111111111111');
    await page.fill('input[placeholder*="Expiry"]', '12/25');
    await page.fill('input[placeholder*="CVV"]', '123');

    // คลิก Pay Now
    await page.click('button:has-text("Pay Now")');

    // รอข้อความยืนยัน
    await page.waitForSelector('text=Payment Successful');
    await expect(page.locator('text=Payment Successful')).toBeVisible();

    // กลับไปหน้า orders
    await page.click('button:has-text("Back to Orders")');
    
    // ตรวจสอบ order status เป็น COMPLETED
    await expect(page.locator('text=Completed')).toBeVisible();
  });

  test('Admin should be able to view reports', async () => {
    // Login as admin
    await page.fill('input[placeholder*="Email"]', 'admin@example.com');
    await page.fill('input[placeholder*="Password"]', 'AdminPass123!');
    await page.click('button:has-text("Login")');
    await page.waitForURL(/dashboard/);

    // ไปหน้า Reports
    await page.click('a:has-text("Reports")');
    await page.waitForURL(/reports/);

    // ตรวจสอบว่ามี report charts
    await expect(page.locator('[data-testid="sales-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="orders-chart"]')).toBeVisible();

    // เลือกช่วงวันที่
    await page.click('input[placeholder*="Start Date"]');
    await page.fill('input[placeholder*="Start Date"]', '2024-01-01');
    
    await page.click('input[placeholder*="End Date"]');
    await page.fill('input[placeholder*="End Date"]', '2024-12-31');

    // คลิก Generate Report
    await page.click('button:has-text("Generate")');

    // ตรวจสอบข้อมูล
    await page.waitForSelector('text=Total Sales');
    await expect(page.locator('text=Total Sales')).toBeVisible();
  });

  test('Should handle error gracefully', async () => {
    // พยายาม login ด้วย credential ผิด
    await page.fill('input[placeholder*="Email"]', 'wrong@example.com');
    await page.fill('input[placeholder*="Password"]', 'WrongPassword123!');
    await page.click('button:has-text("Login")');

    // ตรวจสอบข้อความ error
    await expect(page.locator('text=Invalid credentials')).toBeVisible();

    // ตรวจสอบว่ายังอยู่หน้า login
    await expect(page).toHaveURL(/login/);
  });
});
