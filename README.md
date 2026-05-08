# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/YOUR_USERNAME/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** ณัชพล อ่อนบาง
**รหัสนักศึกษา:** 68030084
**วันที่สอบ:** 8/5/2569

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

| Service      | URL |
|-------------|-----|
| Frontend    | https://restaurant-management-system-exam-2-eta.vercel.app |
| Backend API | https://restaurant-management-system-exam-2025-d617.onrender.com |
| Health Check| https://restaurant-management-system-exam-2025-d617.onrender.com/api/health |

---

## 📋 Test Plan

### Test Scope
**In Scope:**
- [x] Authentication (Login/Logout, JWT)
- [x] Menu Management (CRUD + Role-based access)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash/Card/QR)
- [x] Sales Reports

**Out of Scope:** Frontend UI testing, Load testing, Mobile browser testing

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment Calculation) |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด |
| Security Testing | Manual + Postman | Auth, SQL Injection, Role Check |

### Test Environment

| Component  | Specification |
|-----------|--------------|
| Node.js   | 22 LTS |
| PostgreSQL | 16 (Neon.tech) |
| Browser   | Chrome 124 |
| OS        | Windows 11 |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| ระบบรับชำระเงินไม่ครบจำนวน | ร้านสูญเสียรายได้โดยไม่มีการแจ้งเตือน | P1 |
| Waiter แก้ไขราคาเมนูได้โดยไม่ได้รับอนุญาต | อาจเกิดการทุจริตหรือความเสียหายต่อรายได้ | P2 |

---

## 🧪 Test Cases & Results

### Vitest Results
```
Run: npm test

✓ Payment Calculation Logic > returns correct positive change when overpaid
✓ Payment Calculation Logic > returns zero change when exact amount is paid
✗ Payment Calculation Logic > [BUG-001] should NOT produce negative change (underpayment rejection)
  → expected -50 to be greater than or equal to 0
✓ Payment Validation > accepts payment when amountPaid equals totalAmount
✓ Payment Validation > accepts payment when amountPaid exceeds totalAmount
✓ Payment Validation > rejects payment when amountPaid is less than totalAmount
✓ Payment Validation > rejects payment of zero
✓ Business Risk: Order Total Integrity > order total equals sum of all item subtotals

Test Files: 1 failed | 1 passed (2)
Tests:      1 failed | 19 passed (20)
```

### Newman Pass Rate
```
Total: 26 assertions  |  Passed: 13  |  Failed: 13  |  Pass Rate: 50%
```

### Test Case Table

| TC-ID  | Feature  | Scenario             | Expected   | Actual                  | Pass/Fail          |
|--------|----------|----------------------|------------|-------------------------|--------------------|
| TC-002 | Auth     | Admin login          | 200 + JWT  | 500 Internal Server Error | ❌ Fail           |
| TC-005 | Auth     | Wrong password       | 401        | 401                     | ✅ Pass            |
| TC-007 | Security | No token             | 401        | 401                     | ✅ Pass            |
| TC-010 | Security | SQL Injection        | Empty/400  | Invalid URI Error       | ❌ Fail (BUG-003)  |
| TC-011 | Security | Waiter update price  | 403        | 200 OK                  | ❌ Fail (BUG-004)  |
| TC-015 | Order    | Double booking       | 409        | 201 Created             | ❌ Fail (BUG-002)  |
| TC-020 | Payment  | Underpayment         | 400        | 401 Unauthorized        | ❌ Fail (BUG-001)  |

---

## 🐛 Bug Reports

## BUG-001: should NOT produce negative change (underpayment rejection)

**Severity:** Critical | **Feature:** Payment | **Endpoint:** `POST /api/payments`

### Steps to Reproduce
1. เรียก payment calculation โดยส่ง `amountPaid = 450`, `total = 500`
2. ระบบคำนวณ `change = amountPaid - total`
3. ได้ผลลัพธ์ `change = -50`

### Expected / Actual Result
- **Expected:** ระบบ return HTTP 400 เมื่อ amountPaid < total
- **Actual:** `expected -50 to be greater than or equal to 0` — ระบบเก็บค่า `change = -50` โดยไม่มีการ validate (บรรทัด 29 ใน payment.test.ts)

### Business Impact
ระบบยอมรับการชำระเงินที่ไม่ครบจำนวน และบันทึกเงินทอนติดลบ ทำให้ร้านอาหารสูญเสียรายได้โดยไม่มีการแจ้งเตือน

---

## BUG-002: Double booking same table does not return 409

**Severity:** High | **Feature:** Order | **Endpoint:** `POST /api/orders`

### Steps to Reproduce
1. สร้าง order สำหรับ tableId เดิม 2 ครั้งติดกัน
2. ส่ง `POST /api/orders` พร้อม `{ "tableId": 2 }` ครั้งที่ 2

### Expected / Actual Result
- **Expected:** HTTP 409 Conflict
- **Actual:** HTTP 201 Created — ระบบอนุญาตให้จองโต๊ะซ้ำได้

### Business Impact
โต๊ะเดียวกันมี order ซ้ำซ้อน ทำให้เกิดความสับสนในการให้บริการและอาจทำให้ลูกค้าได้รับประสบการณ์ที่แย่

---

## BUG-003: SQL Injection in search causes Invalid URI error

**Severity:** High | **Feature:** Menu | **Endpoint:** `GET /api/menu?search=`

### Steps to Reproduce
1. ส่ง `GET /api/menu?search=' OR '1'='1`
2. สังเกตผลลัพธ์

### Expected / Actual Result
- **Expected:** HTTP 400 หรือ Empty array
- **Actual:** `Invalid URI` error — ระบบไม่ได้ sanitize input ก่อนสร้าง URI

### Business Impact
ช่องโหว่ SQL Injection อาจทำให้ผู้ไม่หวังดีดึงข้อมูลทั้งหมดในฐานข้อมูลได้

---

## BUG-004: Waiter can update menu price (missing role check)

**Severity:** High | **Feature:** Menu | **Endpoint:** `PUT /api/menu/:id`

### Steps to Reproduce
1. Login เป็น waiter1
2. ส่ง `PUT /api/menu/1` พร้อม `{ "price": 1 }`
3. สังเกตผลลัพธ์

### Expected / Actual Result
- **Expected:** HTTP 403 Forbidden
- **Actual:** HTTP 200 OK — waiter สามารถแก้ไขราคาเมนูได้

### Business Impact
พนักงาน waiter สามารถแก้ไขราคาอาหารได้โดยไม่ได้รับอนุญาต อาจทำให้เกิดการทุจริตหรือความเสียหายต่อรายได้ของร้าน

---

## 🚀 Deployment Guide

### Prerequisites
```
Node.js >= 22.0.0
Docker Desktop (for local)
```

### Local Setup (Docker Compose)
```bash
git clone https://github.com/YOUR_USERNAME/restaurant-management-system.git
cd restaurant-management-system
docker compose up --build
# Frontend: http://localhost
# Backend:  http://localhost:3001/api/health
```

### Local Setup (Manual)
```bash
# Backend
cd backend && cp .env.example .env
# แก้ DATABASE_URL ใน .env ให้เป็น Neon.tech connection string
npm install && npx prisma db push && npx tsx prisma/seed.ts && npm run dev

# Frontend (Terminal ใหม่)
cd frontend && cp .env.example .env.local
npm install && npm run dev -- --port 3000
# เปิด http://localhost:3000
```

### Environment Variables (Backend)

| Variable       | Description             | Example |
|---------------|------------------------|---------|
| `DATABASE_URL` | Neon.tech PostgreSQL URL | `postgresql://user:pass@...neon.tech/neondb?sslmode=require` |
| `JWT_SECRET`   | Random secret string    | *(ไม่ระบุ)* |
| `CORS_ORIGIN`  | Frontend URL            | `https://your-app.vercel.app` |

### Render PostgreSQL Database Setup
1. ไปที่ https://dashboard.render.com → Databases → New PostgreSQL
2. เลือก Free plan หรือ Paid ตามต้องการ
3. Copy External Database URL → ใส่เป็น `DATABASE_URL`
4. รัน `npx prisma db push` เพื่อสร้าง Schema

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://your-backend.onrender.com/api`

### Render Deployment (Backend + Database)
1. สร้าง PostgreSQL database บน Render
2. New Web Service → Connect GitHub repo → เลือก branch
3. Environment: Docker
4. Add Environment Variables:
   - `DATABASE_URL`: จาก Neon.tech
   - `JWT_SECRET`: random string
   - `CORS_ORIGIN`: frontend URL
5. Deploy → Monitor logs

### Smoke Test Results

| Test    | URL                    | Result |
|---------|------------------------|--------|
| Health  | GET /api/health        | ✅ |
| Login   | POST /api/auth/login   | ✅ |
| Add Menu | POST /api/menu        | ✅ |
| Open Order | POST /api/orders   | ✅ |
| Payment | POST /api/payments     | ✅ |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
✓ TC-001: Health check → 200
✓ TC-002: Admin login → 200 + JWT
✓ TC-005: Wrong password → 401
✓ TC-007: No token → 401
✗ TC-010: SQL Injection (BUG-003 detected)
✗ TC-011: Waiter update price (BUG-004 detected)
✗ TC-015: Double booking (BUG-002 detected)
✗ TC-020: Underpayment (BUG-001 detected)
```

---

## 🔐 Default Credentials (Testing Only)

| Role    | Username  | Password     |
|---------|-----------|--------------|
| Admin   | admin     | Admin@123    |
| Cashier | cashier1  | Cashier@123  |
| Waiter  | waiter1   | Waiter@123   |