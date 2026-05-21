# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/YOUR_USERNAME/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** นางสาวปทิตญา ภูกิจคุณาเดชากร
**รหัสนักศึกษา:** 68030151
**วันที่สอบ:** 08/05/2569

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + **TypeScript** + **Tailwind CSS** |
| Backend  | Node.js 22 LTS + Express + **TypeScript** |
| Database | PostgreSQL 16 (Neon.tech) |
| ORM      | **Prisma** |
| Testing  | **Vitest** + Supertest + Newman |
| Deploy   | Vercel (FE) + Render (BE + DB) |

---

## 🌐 Production URLs

| Service     | URL |
|-------------|-----|
| Frontend    | https://restaurant-frontend-delta-inky.vercel.app |
| Backend API | https://restaurant-backend-ia1q.onrender.com |
| Health Check| https://restaurant-backend-ia1q.onrender.com/api/health |

---

## 📋 Test Plan

<!-- ส่วนที่ 1: นักศึกษากรอก -->

### Test Scope
**In Scope:**
- [ ✅ ] Authentication (Login/Logout, JWT)
- [ ✅ ] Menu Management (CRUD + Role-based access)
- [ ✅ ] Order Management (Open/Add Items/Confirm/Cancel)
- [ ✅ ] Payment Processing (Cash/Card/QR)
- [ ✅ ] Sales Reports

**Out of Scope:** 
| Feature       | เหตุผลที่ไม่ทดสอบ |
|---------------|--------------------|
| Performance Load Test (JMeter) | ไม่อยู่ในขอบเขตของข้อสอบนี้ |
| Security Penetration Test | การเจาะระบบต้องใช้เครื่องมือและทีมเฉพาะ ไม่ครอบคลุมการสอบ |
| Cloud Deployment (Production) | แม้มีการใช้ Neon/Vercel แต่การสอบไม่ครอบคลุมการ deploy แบบ production-scale หรือ multi-cloud integration |
| Third-Party Payment Gateway | ใช้ mock data ไม่เชื่อมต่อระบบจริง |
| Data Migration | ไม่ครอบคลุมการย้ายข้อมูลจากระบบเก่าเข้าสู่ระบบใหม่ |
| Backup & Disaster Recovery | การสอบไม่ทดสอบการกู้คืนระบบหรือการจัดการเมื่อระบบล่ม |

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment Calculation) |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด |
| Security Testing | Manual + Postman | Auth, SQL Injection, Role Check |

### Test Environment

| Component | Specification |
|-----------|--------------|
| Node.js   | 22 LTS |
| PostgreSQL | 16 (Neon.tech) |
| Browser   | Chrome 148 |
| OS        | Windows 11 |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| Payment Failure | 	ร้านไม่สามารถรับเงินได้ → เสียรายได้ทันทีและกระทบความเชื่อมั่นลูกค้า |	P1 |
| Order Mismanagement	| ออเดอร์ไม่ถูกส่งเข้าครัว → ลูกค้าไม่พอใจและอาจสูญเสียลูกค้าประจำ |	P2 |
| Inventory Inaccuracy |	สต๊อกไม่ตรง ทำให้วัตถุดิบหมดโดยไม่รู้ → อาหารบางเมนูขายไม่ได้ |	P2 |
| Authentication Failure |	พนักงานเข้าระบบไม่ได้ หรือมีการเข้าถึงโดยไม่ได้รับอนุญาต → กระทบการทำงานและความปลอดภัย |	P1 |
| Table Management Error	| โต๊ะไม่ถูกจองหรือปล่อยว่างผิดพลาด → ลูกค้ารอนานหรือเกิดความสับสน |	P3 |

---

## 🧪 Test Cases & Results

<!-- ส่วนที่ 2 -->

### Vitest Results
```
Run: npm test
✓ Payment Calculation Logic > returns correct positive change when overpaid
✓ Payment Calculation Logic > returns zero change when exact amount is paid
✓ [BUG-001] Fixed: Payment Validation > rejects payment when amountPaid is less than totalAmount
✓ Security Check > GET /api/auth/me — invalid token → returns 401
...
Test Files: 2 passed
Tests: 20 passed | 0 failed
...
```

### Newman Pass Rate
```
Total: 26  |  Passed: 22  |  Failed: 4  |  Pass Rate: 84.61%
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-002 | Auth | Admin login | 200 + JWT | | ✅ |
| TC-005 | Auth | Wrong password | 401 | | ✅ |
| TC-007 | Security | No token | 401 | | ✅ |
| TC-010 | Security | SQL Injection | Empty/400 | | ✅ |
| TC-011 | Security | Waiter update price | 403 | | ✅ |
| TC-015 | Order | Double booking | 409 | | ✅ |
| TC-020 | Payment | Underpayment | 400 | | ✅ |

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

### BUG-001:จ่ายเงินไม่เพียงพอแต่ระบบแจ้งข้อผิดพลาดไม่ถูกต้อง (Underpayment 404 Error)

**Severity:**  High 
**Priority:** P1  
**Feature:** Payment System
**Status:** Fixed

#### Steps to Reproduce
1.สร้างออเดอร์และกดยืนยันรายการอาหาร (Confirmed)

2.เรียกใช้งาน API POST /api/payments โดยระบุยอดเงินที่จ่าย (amountPaid) น้อยกว่ายอดรวมจริง (เช่น จ่าย 1 บาท จากยอด 150 บาท)

3.ตรวจสอบ HTTP Status Code ที่ได้รับจาก Server

#### Expected Result
> ระบบควรปฏิเสธรายการด้วย 400 Bad Request พร้อมข้อความแจ้งเตือนว่า "Insufficient payment amount"

#### Actual Result
> ระบบส่งค่ากลับมาเป็น 404 Not Found (หรือในบางกรณีอาจยอมให้ผ่านเป็น 201) ซึ่งทำให้ไม่สามารถระบุสาเหตุที่แท้จริงได้ว่าจ่ายเงินไม่ครบหรือหาข้อมูลไม่เจอ

#### Business Impact
> ทำให้เกิดความเสี่ยงที่ร้านจะเสียรายได้หากพนักงานเข้าใจผิดว่าทำรายการสำเร็จ ทั้งที่ลูกค้าจ่ายเงินไม่ครบ และระบบจัดการสถานะออเดอร์ผิดพลาด

---

### BUG-002: ระบบสร้างออเดอร์ไม่ได้เนื่องจากสถานะโต๊ะขัดแย้ง (Order Creation Failure - 409 Conflict)

**Severity:** High  
**Priority:** P2 
**Feature:** Order Management  
**Status:** Fixed

#### Steps to Reproduce
1.เรียกใช้งาน API POST /api/orders เพื่อเปิดโต๊ะใหม่ (เช่น โต๊ะเบอร์ 5)

2.ตรวจสอบผลลัพธ์ในกรณีที่โต๊ะนั้นอาจจะมีข้อมูลเก่าค้างอยู่ใน Database หรือสถานะไม่เป็น Available

3.ตรวจสอบ HTTP Status Code ที่ได้รับ

#### Expected Result
> ระบบควรสร้างออเดอร์ใหม่สำเร็จ และส่งค่า 201 Created กลับมาพร้อม orderId เพื่อใช้ในขั้นตอนสั่งอาหารต่อไป

#### Actual Result
> ระบบส่งค่ากลับมาเป็น 409 Conflict ตั้งแต่การพยายามสร้างออเดอร์ครั้งแรก ทำให้ Newman ไม่สามารถดึง orderId ไปใช้ใน API อื่นๆ ได้ (ส่งผลให้ข้อถัดไปกลายเป็น 500 Error)

#### Business Impact
> พนักงานไม่สามารถเปิดออเดอร์ใหม่ให้ลูกค้าได้ แม้จะเป็นการเริ่มรันระบบใหม่ ทำให้ระบบการสั่งอาหารทั้งหมดหยุดชะงัก และลูกค้าไม่สามารถสั่งอาหารได้
---

### BUG-003: ช่องโหว่ความปลอดภัย SQL Injection ในระบบค้นหาเมนู

**Severity:** Critical  
**Priority:** P1  
**Feature:** Menu Search 
**Status:** Fixed

#### Steps to Reproduce
1.เข้าไปที่ฟังก์ชันค้นหาเมนูอาหาร (Search Menu)

2.ใส่คำค้นหาที่เป็น SQL Command เช่น ' OR '1'='1 ผ่านทาง Query Parameter (?search=' OR '1'='1)

3.ตรวจสอบการตอบกลับจากระบบ
#### Expected Result
> ระบบควรทำการ Sanitize ข้อมูลหรือใช้ Parameterized Query เพื่อป้องกันคำสั่งแปลกปลอม และควรส่งค่ากลับเป็นรายการว่าง หรือ 400 Bad Request หากพบสัญลักษณ์ที่อันตราย

#### Actual Result
> ระบบพยายามประมวลผลคำสั่งนั้นจนเกิดข้อผิดพลาดภายใน และส่งค่ากลับมาเป็นรูปแบบ JSON ที่ไม่ถูกต้อง (JSONError: "undefined" is not valid JSON) ซึ่งแสดงว่าคำสั่ง SQL เข้าไปรบกวนการทำงานของ Database โดยตรง

#### Business Impact
> ผู้ไม่หวังดีอาจใช้ช่องโหว่นี้ในการดึงข้อมูลสำคัญออกจากฐานข้อมูล (Data Leakage) เช่น ข้อมูลพนักงาน ยอดขาย หรืออาจทำการลบข้อมูลทั้งหมดในระบบ (Drop Table) ทำให้ธุรกิจหยุดชะงักและเสียชื่อเสียงอย่างรุนแรง
---

## 🚀 Deployment Guide

<!-- ส่วนที่ 5 -->

### Prerequisites
```
Node.js >= 22.0.0
Docker Desktop (for local)
```

### Local Setup (Docker Compose)
```bash
git clone https://github.com/Ptitya/Restaurant-Management-System-Exam-2025.git
cd restaurant-management-system
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
| `DATABASE_URL` | Render PostgreSQL URL | `postgresql://neondb_owner:npg_pYKF58nvkMSm@ep-nameless-breeze-aos2r6sq-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `JWT_SECRET` | Random secret string | *(ไม่ระบุ)* |
| `CORS_ORIGIN` | Frontend URL | `https://restaurant-frontend-delta-inky.vercel.app` |

### Render PostgreSQL Database Setup
1. ไปที่ https://dashboard.render.com → Databases → New PostgreSQL
2. เลือก Free plan หรือ Paid ตามต้องการ
3. Copy External Database URL → ใส่เป็น `DATABASE_URL`
4. รัน `npx prisma db push` เพื่อสร้าง Schema (local หรือใน Render build)

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://restaurant-backend-ia1q.onrender.com`

### Render Deployment (Backend + Database)
1. สร้าง PostgreSQL database บน Render (ตามขั้นตอนด้านบน)
2. New Web Service → Connect GitHub repo → เลือก branch
3. Root Directory: (ว่าง) หรือ `backend` ถ้าใช้ Dockerfile แยก
4. Environment: Docker
5. Build Command: (ว่าง - ใช้ Dockerfile)
6. Start Command: (ว่าง - ใช้ Dockerfile CMD)
7. Add Environment Variables ใน Environment tab:
   - `DATABASE_URL`: จาก database ที่สร้าง
   - `JWT_SECRET`: random string
   - `CORS_ORIGIN`: frontend URL
8. Deploy → Monitor logs

หรือใช้ `render.yaml` สำหรับ auto-configuration:
- Push `render.yaml` ไป GitHub
- ใน Render Dashboard → Settings → YAML → Enable

### Smoke Test Results

| Test | URL | Result |
|------|-----|--------|
| Health | GET /api/health | ✅ |
| Login | POST /api/auth/login | ✅ |
| Add Menu | POST /api/menu | ✅ |
| Open Order | POST /api/orders | ✅ |
| Payment | POST /api/payments | ✅ |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
RMS-TestSuite-v2

❏ Health & System
↳ TC-001 GET /api/health (Positive)
  GET http://localhost:3001/api/health [200 OK, 339B, 26ms]
  ✓  TC-001: health returns 200
  ✓  TC-001: status is ok
  ✓  TC-001: version 2.0.0

❏ Authentication
↳ TC-002 Login Admin (Positive)
  POST http://localhost:3001/api/auth/login [200 OK, 560B, 145ms]
  ✓  TC-002: admin login 200
  ✓  TC-002: returns JWT token

↳ TC-003 Login Cashier
  POST http://localhost:3001/api/auth/login [200 OK, 574B, 88ms]
  ✓  TC-003: cashier login 200

↳ TC-004 Login Waiter
  POST http://localhost:3001/api/auth/login [200 OK, 567B, 87ms]
  ✓  TC-004: waiter login 200

↳ TC-005 Login Wrong Password (Negative)
  POST http://localhost:3001/api/auth/login [401 Unauthorized, 308B, 87ms]
  ✓  TC-005: wrong password → 401

↳ TC-006 Login Missing Credentials (Negative)
  POST http://localhost:3001/api/auth/login [400 Bad Request, 318B, 3ms]
  ✓  TC-006: missing creds → 400

↳ TC-007 No Token → 401 (Security)
  GET http://localhost:3001/api/menu [401 Unauthorized, 310B, 2ms]
  ✓  TC-007: no token → 401

❏ Menu
↳ TC-008 GET /menu (Positive)
  GET http://localhost:3001/api/menu [200 OK, 2.49kB, 6ms]
  ✓  TC-008: get menu 200
  ✓  TC-008: returns array

↳ TC-009 Search Menu (Positive)
  GET http://localhost:3001/api/menu?search=Pad Thai [200 OK, 488B, 7ms]
  ✓  TC-009: search returns results

↳ TC-010 SQL Injection in Search (Security - BUG-003)
  GET http://localhost:3001/api/menu?search=' OR '1'='1 [200 OK, 267B, 4ms]
  ✓  TC-010 [BUG-003]: SQL Injection should NOT leak all records

↳ TC-011 Waiter Updates Menu Price (Security - BUG-004)
  PUT http://localhost:3001/api/menu/4 [403 Forbidden, 310B, 2ms]
  ✓  TC-011 [BUG-004]: Waiter cannot update menu price (expect 403)

↳ TC-012 Admin Adds Menu Item (Positive)
  POST http://localhost:3001/api/menu [201 Created, 460B, 4ms]
  ✓  TC-012: admin adds menu item → 201

↳ TC-013 Waiter Cannot Add Menu Item (Negative - Role Check)
  POST http://localhost:3001/api/menu [403 Forbidden, 310B, 2ms]
  ✓  TC-013: waiter cannot add menu → 403

❏ Orders
↳ TC-014 Create Order (Positive)
  POST http://localhost:3001/api/orders [201 Created, 428B, 9ms]
  ✓  TC-014: create order → 201

↳ TC-015 Double Booking Same Table (BUG-002)
  POST http://localhost:3001/api/orders [409 Conflict, 318B, 3ms]
  ✓  TC-015 [BUG-002]: Double booking → 409 Conflict

↳ TC-016 Add Item to Order
  POST http://localhost:3001/api/orders/1/items [201 Created, 587B, 10ms]
  ✓  TC-016: add item → 201

↳ TC-017 Confirm Order
  PUT http://localhost:3001/api/orders/1/confirm [200 OK, 430B, 5ms]
  ✓  TC-017: confirm order → 200

↳ TC-018 Create Order Without TableId (Negative)
  POST http://localhost:3001/api/orders [400 Bad Request, 304B, 2ms]
  ✓  TC-018: missing tableId → 400

❏ Payment
↳ TC-019 Exact Payment (Positive)
  POST http://localhost:3001/api/payments [201 Created, 534B, 7ms]
  ✓  TC-019: payment → 201
  ✓  TC-019: change is non-negative

↳ TC-020 Underpayment (BUG-001)
  POST http://localhost:3001/api/payments [400 Bad Request, 315B, 2ms]
  ✓  TC-020 [BUG-001]: Underpayment should → 400

↳ TC-021 Payment Without Auth (Security)
  POST http://localhost:3001/api/payments [401 Unauthorized, 310B, 1ms]
  ✓  TC-021: no auth → 401

┌─────────────────────────┬───────────────────┬──────────────────┐
│                         │          executed │           failed │
├─────────────────────────┼───────────────────┼──────────────────┤
│              iterations │                 1 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│                requests │                21 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│            test-scripts │                21 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│      prerequest-scripts │                 0 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│              assertions │                26 │                0 │
├─────────────────────────┴───────────────────┴──────────────────┤
│ total run duration: 793ms                                      │
├────────────────────────────────────────────────────────────────┤
│ total data received: 4.81kB (approx)                           │
├────────────────────────────────────────────────────────────────┤
│ average response time: 23ms [min: 1ms, max: 145ms, s.d.: 39ms] │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
