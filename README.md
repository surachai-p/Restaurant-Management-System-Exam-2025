# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/ChittiphatLamdaun/Restaurant-Management-System-Exam-2025/actions/workflows/cicd.yml/badge.svg)](https://github.com/ChittiphatLamdaun/Restaurant-Management-System-Exam-2025/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** นาย จิตติพัฒน์ ลำดวน  
**รหัสนักศึกษา:** 68030039  
**วันที่สอบ:** 08/05/2569  

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + **TypeScript** + **Tailwind CSS** |
| Backend  | Node.js 22 LTS + Express + **TypeScript** |
| Database | PostgreSQL 16 (Neon.tech / Render / Local Docker) |
| ORM      | **Prisma** |
| Testing  | **Vitest** + Supertest + Newman |
| Deploy   | Vercel (FE) + Render (BE + DB) |

---

## 🌐 Production URLs

| Service     | URL |
|-------------|-----|
| Frontend    | https://rms-frontend-five.vercel.app/ |
| Backend API | https://rms-backend-yourname.onrender.com |
| Health Check| https://rms-backend-yourname.onrender.com/api/health |

---

## 📋 Test Plan

<!-- ส่วนที่ 1: นักศึกษากรอก -->

### Test Scope
**In Scope:**
- [x] Authentication (Login/Logout, JWT, Session)
- [x] Menu Management (CRUD + Role-based access)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash/Card/QR, Change calculation)
- [x] Sales Reports (Daily/Monthly reports)
- [x] Security Testing (JWT, RBAC, SQL Injection, Dependency audit)

**Out of Scope:**
- Performance & Load Testing (Apache JMeter, k6)
- Payment Gateway Integration กับระบบธนาคารภายนอกจริง (เช่น Stripe, Omise, GB Prime Pay)
- Mobile Native Application Testing

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment Calculation & Validation, Order Total Integrity) |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด (Health, Auth, Menu, Orders, Payment) |
| Security Testing | Manual + Postman + npm audit | Auth, SQL Injection, Role Check (RBAC), Dependency Vulnerability Scan |

### Test Environment

| Component | Specification |
|-----------|--------------|
| Node.js   | 22 LTS (v22.21.1) |
| npm       | 10.9.4 |
| PostgreSQL | 16 (Neon.tech / Local Docker postgres:16) |
| Newman    | 6.2.3 |
| Browser   | Google Chrome |
| OS        | Windows 11 |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`  
**Exit:** ≥ 80% Test Cases ผ่าน (ได้ผลลัพธ์ 81.0%), ไม่มี Critical Bug ที่ยังไม่รายงาน  

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| ขาดการตรวจสอบยอดเงินชำระ (Underpayment - BUG-001) | ลูกค้าจ่ายเงินไม่ครบแต่ระบบบันทึกสถานะชำระสำเร็จและเงินทอนติดลบ ร้านสูญเสียรายได้โดยตรง | P1 |
| ช่องโหว่ SQL Injection ในการค้นหาเมนู (BUG-003) | ผู้ไม่หวังดีสามารถดึงข้อมูล หรือเข้าถึงข้อมูลลับทั้งหมดในฐานข้อมูล | P1 |
| การเปิดโต๊ะซ้ำซ้อน (Double Booking - BUG-002) | เปิดออเดอร์ซ้ำในโต๊ะเดียวกัน ข้อมูลออเดอร์สับสน ครัวทำอาหารซ้ำ สูญเสียวัตถุดิบ | P2 |
| ขาดการจำกัดสิทธิ์แก้ไขเมนูอาหาร (Missing RBAC - BUG-004) | พนักงานเสิร์ฟ (Waiter) สามารถแก้ไขราคาอาหารได้ อาจเกิดการทุจริตภายใน | P2 |

---

## 🧪 Test Cases & Results

<!-- ส่วนที่ 2 -->

### Vitest Results
```
Run: npm test

 RUN  v4.1.5 C:/CICD/Restaurant-Management-System-Exam-2025/backend

 ❯ tests/unit/payment.test.ts (8 tests | 1 failed) 9ms
     ✓ returns correct positive change when overpaid 2ms
     ✓ returns zero change when exact amount is paid 0ms
     × [BUG-001] should NOT produce negative change (underpayment rejection) 4ms
     ✓ accepts payment when amountPaid equals totalAmount 0ms
     ✓ accepts payment when amountPaid exceeds totalAmount 0ms
     ✓ rejects payment when amountPaid is less than totalAmount 0ms
     ✓ rejects payment of zero 0ms
     ✓ order total equals sum of all item subtotals 0ms
 ✓ tests/api/auth.test.ts (12 tests) 79ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/unit/payment.test.ts > Payment Calculation Logic > [BUG-001] should NOT produce negative change (underpayment rejection)
AssertionError: expected -50 to be greater than or equal to 0
 ❯ tests/unit/payment.test.ts:29:20
     27|     // Current route stores change = -50 without validation
     28|     // Expected: route should return HTTP 400, not store -50
     29|     expect(change).toBeGreaterThanOrEqual(0) // ❌ FAILS → -50 < 0
       |                    ^
     30|   })
     31| })

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 19 passed (20)
   Duration  1.88s
```

### Newman Pass Rate
```
Total: 21  |  Passed: 17  |  Failed: 4  |  Pass Rate: 81.0%
Total Assertions: 26  |  Passed: 22  |  Failed: 4  |  Assertion Pass Rate: 84.6%
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-001 | Health | Check system health | 200 + status: ok | 200 OK + {"status":"ok","version":"2.0.0"} | Pass |
| TC-002 | Auth | Admin login | 200 + JWT Token | 200 OK + JWT Token | Pass |
| TC-003 | Auth | Cashier login | 200 + JWT Token | 200 OK + JWT Token | Pass |
| TC-004 | Auth | Waiter login | 200 + JWT Token | 200 OK + JWT Token | Pass |
| TC-005 | Auth | Wrong password | 401 Unauthorized | 401 Unauthorized | Pass |
| TC-006 | Auth | Missing credentials | 400 Bad Request | 400 Bad Request | Pass |
| TC-007 | Security | Access without token | 401 Unauthorized | 401 Unauthorized | Pass |
| TC-008 | Menu | Get all menu items | 200 + Array | 200 OK + Array items | Pass |
| TC-009 | Menu | Search menu | 200 + Result array | 200 OK + Result array | Pass |
| TC-010 | Security | SQL Injection in search | Empty/400 (no leak) | 200 OK (leaked 11 records) | Fail (BUG-003) |
| TC-011 | Security | Waiter update price | 403 Forbidden | 200 OK (price updated) | Fail (BUG-004) |
| TC-012 | Menu | Admin add menu item | 201 Created | 201 Created | Pass |
| TC-013 | Security | Waiter add menu item | 403 Forbidden | 403 Forbidden | Pass |
| TC-014 | Order | Open order on table | 201 Created | 201 Created | Pass |
| TC-015 | Order | Double booking same table | 409 Conflict | 201 Created (allowed duplicate) | Fail (BUG-002) |
| TC-016 | Order | Add item to order | 201 Created | 201 Created | Pass |
| TC-017 | Order | Confirm order | 200 OK | 200 OK | Pass |
| TC-018 | Order | Missing tableId | 400 Bad Request | 400 Bad Request | Pass |
| TC-019 | Payment | Exact/Over payment | 201 + change >= 0 | 201 Created + change >= 0 | Pass |
| TC-020 | Payment | Underpayment rejection | 400 Bad Request | 404/Allows negative change | Fail (BUG-001) |
| TC-021 | Security | Payment without auth | 401 Unauthorized | 401 Unauthorized | Pass |

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

### BUG-001: Underpayment Validation Missing (Negative Change Allowed)

**Severity:** Critical  
**Priority:** P1  
**Feature:** Payment  
**Endpoint:** `POST /api/payments`  
**Status:** Open  

#### Steps to Reproduce
1. ทำการเปิด Order และเพิ่มสินค้า จากนั้น Confirm Order (เช่น ยอดรวม 150 บาท)
2. ส่งคำขอ `POST /api/payments` พร้อม Body: `{"orderId": 1, "amountPaid": 100, "method": "cash"}`
3. สังเกตผลลัพธ์ใน Response และข้อมูลที่บันทึกลงตาราง Payments

#### Expected / Actual Result
- **Expected Result:** ระบบต้องทำการตรวจสอบความถูกต้องของยอดเงินชำระ `amountPaid >= totalAmount` หากลูกค้าชำระเงินไม่ครบ ต้องปฏิเสธคำขอด้วย `HTTP 400 Bad Request` พร้อมข้อความแจ้งข้อผิดพลาด เช่น `{"error": "Insufficient payment amount"}`
- **Actual Result:** ระบบไม่มีการตรวจสอบเงื่อนไขยอดเงิน คำนวณเงินทอน `change = paid - totalAmount` ส่งผลให้ได้ค่าติดลบ (`change: -50`) และบันทึกลงฐานข้อมูลสำเร็จ (`HTTP 201 Created`) โต๊ะถูกเปลี่ยนสถานะเป็น available และออเดอร์ถูกเปลี่ยนเป็น paid

#### Business Impact
ทำให้ร้านอาหารสูญเสียรายได้อย่างต่อเนื่อง ลูกค้าชำระเงินไม่ครบแต่ระบบปล่อยผ่านและปิดโต๊ะเรียบร้อย เกิดความเสียหายทางการเงินโดยตรง

---

### BUG-002: Double Booking / Duplicate Open Order Allowed on Same Table

**Severity:** High  
**Priority:** P2  
**Feature:** Order  
**Endpoint:** `POST /api/orders`  
**Status:** Open  

#### Steps to Reproduce
1. ส่งคำขอ `POST /api/orders` เพื่อเปิดออเดอร์ใหม่ให้กับโต๊ะ #2 ด้วย Body: `{"tableId": 2}`
2. ส่งคำขอ `POST /api/orders` สำหรับโต๊ะ #2 ซ้ำอีกครั้ง ในขณะที่ออเดอร์แรกยังคงมีสถานะเป็น `open`

#### Expected / Actual Result
- **Expected Result:** ระบบต้องตรวจสอบว่าโต๊ะนั้นมีออเดอร์ที่สถานะ `open` ค้างอยู่หรือไม่ หากมีอยู่แล้วต้องปฏิเสธด้วย `HTTP 409 Conflict` พร้อมข้อความ `{"error": "Table already has an open order"}`
- **Actual Result:** ระบบไม่ตรวจสอบออเดอร์เดิมที่เปิดอยู่ ยินยอมให้สร้างออเดอร์ใหม่สำเร็จ (`HTTP 201 Created`) ทำให้โต๊ะเดียวกันมีออเดอร์สถานะ open พร้อมกันหลายรายการ

#### Business Impact
ทำให้ข้อมูลรายการอาหารและการเรียกเก็บเงินสับสน พนักงานเสิร์ฟและพนักงานครัวอาจทำอาหารซ้ำซ้อน เสียวัตถุดิบและสร้างความไม่พอใจให้ลูกค้า

---

### BUG-003: SQL Injection Vulnerability in Menu Search

**Severity:** Critical  
**Priority:** P1  
**Feature:** Menu / Security  
**Endpoint:** `GET /api/menu?search=`  
**Status:** Open  

#### Steps to Reproduce
1. เข้าสู่ระบบเพื่อรับ JWT Token
2. ส่งคำขอ `GET /api/menu?search=%27+OR+%271%27%3D%271` โดยแนบ Header `Authorization: Bearer <token>`
3. ตรวจสอบรายการข้อมูลเมนูที่ส่งกลับมา

#### Expected / Actual Result
- **Expected Result:** ระบบต้องใช้ Parameterized Query หรือ Prisma query builder เพื่อค้นหาเฉพาะข้อความจริง ไม่ตีความ SQL syntax ควรได้รายการว่าง หรือตอบกลับ `400 Bad Request`
- **Actual Result:** โค้ดใน backend ใช้ `prisma.$queryRawUnsafe` ร่วมกับ string interpolation (`${search}`) ทำให้เงื่อนไข SQL กลายเป็นจริงเสมอ และส่งข้อมูลเมนูทั้งหมดในระบบออกมา (Data Leakage)

#### Business Impact
ผู้ไม่หวังดีสามารถใช้ช่องโหว่ SQL Injection เพื่อดึงข้อมูลสำคัญ รหัสผ่าน หรือทำลายฐานข้อมูลระบบได้

---

### BUG-004: Missing Role Check on Menu Update (Waiter Can Change Prices)

**Severity:** High  
**Priority:** P2  
**Feature:** Menu / Security  
**Endpoint:** `PUT /api/menu/:id`  
**Status:** Open  

#### Steps to Reproduce
1. เข้าสู่ระบบด้วยบัญชีพนักงานเสิร์ฟ `waiter1` เพื่อรับ Waiter JWT Token
2. ส่งคำขอ `PUT /api/menu/1` พร้อมแนบ Token ของ Waiter และระบุ Body เช่น `{"price": 1}`

#### Expected / Actual Result
- **Expected Result:** เฉพาะผู้ใช้ที่มีสิทธิ์ระดับ Admin เท่านั้นที่สามารถแก้ไขราคาและข้อมูลเมนูได้ (`requireRole('admin')`) หากพนักงานระดับอื่นเรียกใช้ ต้องตอบกลับ `HTTP 403 Forbidden`
- **Actual Result:** Route ดังกล่าวขาด Middleware ตรวจสอบสิทธิ์ `requireRole('admin')` มีเพียง `authenticate` เท่านั้น ทำให้ Waiter สามารถแก้ไขราคาอาหารได้สำเร็จ (`HTTP 200 OK`)

#### Business Impact
พนักงานเสิร์ฟหรือผู้ใช้งานระดับทั่วไปสามารถแก้ไขราคาอาหารในระบบให้เป็นราคาต่ำได้ ก่อให้เกิดช่องโหว่ในการทุจริตภายในองค์กร

---

## 🚀 Deployment Guide

<!-- ส่วนที่ 5 -->

### Prerequisites
```
Node.js >= 22.0.0
Docker Desktop (for local / staging)
PostgreSQL 16 (Neon.tech หรือ Local Container)
```

### Local Setup (Docker Compose)
```bash
git clone https://github.com/ChittiphatLamdaun/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025
docker compose up --build
# Frontend: http://localhost
# Backend:  http://localhost:3001/api/health
```

### Local Setup (Manual)
```bash
# Backend
cd backend && cp .env.example .env
# แก้ DATABASE_URL ใน .env
npm install && npx prisma db push && npx tsx prisma/seed.ts && npm run dev

# Frontend (Terminal ใหม่)
cd frontend && cp .env.example .env.local
npm install && npm run dev
# เปิด http://localhost:5173
```

### Environment Variables (Backend)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL URL (Neon / Render / Local) | `postgresql://user:pass@host:5432/rms_db` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `rms-dev-secret-key-change-in-production` |
| `CORS_ORIGIN` | Allowed Frontend Origin | `http://localhost:5173` หรือ `https://rms-frontend-five.vercel.app` |
| `NODE_ENV` | Environment mode | `development` หรือ `production` |
| `PORT` | API Port | `3001` |

### Render PostgreSQL Database Setup
1. ไปที่ https://dashboard.render.com → Databases → New PostgreSQL
2. เลือก Free plan หรือ Paid ตามต้องการ
3. Copy External Database URL → ใส่เป็น `DATABASE_URL`
4. รัน `npx prisma db push` เพื่อสร้าง Schema (local หรือใน Render build)

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://rms-backend-yourname.onrender.com/api`

### Render Deployment (Backend + Database)
1. สร้าง PostgreSQL database บน Render (ตามขั้นตอนด้านบน)
2. New Web Service → Connect GitHub repo → เลือก branch `main`
3. Root Directory: `backend`
4. Environment: Docker
5. Build Command: (ว่าง - ใช้ Dockerfile)
6. Start Command: (ว่าง - ใช้ Dockerfile CMD)
7. Add Environment Variables ใน Environment tab:
   - `DATABASE_URL`: จาก database ที่สร้าง
   - `JWT_SECRET`: random 64-char string
   - `CORS_ORIGIN`: frontend URL บน Vercel
8. Deploy → Monitor logs

### Smoke Test Results

| Test | URL | Result |
|------|-----|--------|
| Health | GET /api/health | ✅ Pass |
| Login | POST /api/auth/login | ✅ Pass |
| Add Menu | POST /api/menu | ✅ Pass |
| Open Order | POST /api/orders | ✅ Pass |
| Payment | POST /api/payments | ✅ Pass |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
✓ TC-001: GET /api/health (Positive)
✓ TC-002: Login Admin (Positive)
✓ TC-003: Login Cashier
✓ TC-004: Login Waiter
✓ TC-005: Login Wrong Password (Negative)
✓ TC-006: Login Missing Credentials (Negative)
✓ TC-007: No Token → 401 (Security)
✓ TC-008: GET /menu (Positive)
✓ TC-009: Search Menu (Positive)
✗ TC-010: SQL Injection in Search (Security - BUG-003)
✗ TC-011: Waiter Updates Menu Price (Security - BUG-004)
✓ TC-012: Admin Adds Menu Item (Positive)
✓ TC-013: Waiter Cannot Add Menu Item (Negative - Role Check)
✓ TC-014: Create Order (Positive)
✗ TC-015: Double Booking Same Table (BUG-002)
✓ TC-016: Add Item to Order
✓ TC-017: Confirm Order
✓ TC-018: Create Order Without TableId (Negative)
✓ TC-019: Exact Payment (Positive)
✗ TC-020: Underpayment (BUG-001)
✓ TC-021: Payment Without Auth (Security)

Total: 21  |  Passed: 17  |  Failed: 4  |  Pass Rate: 81.0%
```

---

## 🔐 Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
