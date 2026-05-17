# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/weerapat-s/Restaurant-Management-System-Exam-2025/actions/workflows/ci.yml/badge.svg)](https://github.com/weerapat-s/Restaurant-Management-System-Exam-2025/actions)

---

## Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

| รายการ | ข้อมูล |
|--------|--------|
| รายวิชา | การออกแบบและพัฒนาซอฟต์แวร์ 1 |
| ชื่อ-นามสกุล | นายวีระภัทร อ่วมเกษม |
| รหัสนักศึกษา | 68030271 |
| วันที่สอบ | 2026-05-08 |

---

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend  | Node.js 22 LTS + Express + TypeScript |
| Database | PostgreSQL 16 (Neon.tech Serverless) |
| ORM      | Prisma |
| Testing  | Vitest + Supertest + Newman |
| Container | Docker / Docker Compose |
| CI/CD    | GitHub Actions |
| Deploy   | Vercel (Frontend) + Render (Backend) |

---

## Production URLs

| Service      | URL | Status |
|--------------|-----|--------|
| Frontend     | https://restaurantmanagementsystem-rouge.vercel.app | Live |
| Backend API  | https://restaurant-management-system-exam-2025.onrender.com | Live |
| Health Check | https://restaurant-management-system-exam-2025.onrender.com/api/health | `{"status":"ok","version":"2.0.0"}` |

---

## Test Plan

### Test Scope

**In Scope:**
- Authentication (Login/Logout, JWT Token)
- Menu Management (CRUD + Role-based access)
- Order Management (Open / Add Items / Confirm / Cancel)
- Payment Processing (Cash / Card / QR + Change Calculation)
- Sales Reports (Date filter, Revenue summary)
- Security (SQL Injection, RBAC, Token validation)

**Out of Scope:**
- Performance / Load Testing (JMeter) — ไม่อยู่ในขอบเขตของข้อสอบ
- UI End-to-End Testing (Playwright/Cypress) — ใช้ Postman/Newman แทน
- Mobile Responsiveness — ไม่อยู่ในขอบเขตของระบบ RMS รุ่นนี้

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic — Payment Calculation, Validation |
| API Testing (E2E) | Postman / Newman | REST Endpoints ทั้งหมด (21 test cases, 26 assertions) |
| Security Testing | Manual + Postman | SQL Injection, Role Check, No-Token Access |
| Dependency Scan | npm audit | ช่องโหว่ใน Dependencies ทั้ง Backend และ Frontend |
| Smoke Testing | Manual / Newman | 4 Feature หลักบน Production หลัง Deploy |
| Staging Test | Docker Compose | Multi-container ก่อน Deploy บน Cloud |

### Test Environment

| Component | Specification |
|-----------|--------------|
| OS | Windows 11 Home Single Language |
| Node.js | 22 LTS |
| npm | 10.x |
| Docker | Docker Desktop (latest) |
| PostgreSQL | 16 (Neon.tech Serverless) |
| Browser | Chrome (latest) |
| Newman | 6.2.2 |
| Vitest | 4.1.5 |

### Entry / Exit Criteria

**Entry Criteria:**
- Repository ถูก Clone และรัน Backend + Frontend ได้
- Database เชื่อมต่อ Neon.tech สำเร็จ
- `GET /api/health` ตอบกลับ `{"status":"ok"}`
- Postman Collection พร้อมสำหรับ Newman

**Exit Criteria:**
- Newman Pass Rate >= 80% ถือว่าพร้อมติดตั้ง
- ไม่มี Bug ระดับ Critical ที่ยังไม่ได้รายงานและประเมินผลกระทบ
- Smoke Test ผ่านทุก 4 Feature หลักบน Production
- `npm audit` ไม่พบ vulnerability ระดับ High ที่ยังไม่ได้แก้ไข

### Business Risk

| # | Feature | ผลกระทบ | ระดับ |
|---|---------|---------|-------|
| 1 | Payment — BUG-001 | ยอมรับชำระเงินน้อยกว่ายอดจริง คืนเงินทอนติดลบ ร้านสูญเสียรายได้ | Critical |
| 2 | Order — BUG-002 | เปิดออเดอร์ซ้ำบนโต๊ะเดิมได้ ครัวสับสน อาหารออกผิด | High |
| 3 | Menu Security — BUG-003/004 | SQL Injection ดึงข้อมูลทั้งหมด + Waiter แก้ราคาเมนูได้ | High |
| 4 | Report — BUG-005 | ตัวกรองวันที่ผิด ยอดขายหาย ผู้บริหารตัดสินใจจากข้อมูลผิด | Medium |

---

## Test Cases & Results

### Vitest Unit Tests — 20 / 20 PASS

```
 RUN  v4.1.5

 PASS  tests/unit/payment.test.ts
   Payment Calculation Logic
     ✓ returns correct positive change when overpaid
     ✓ returns zero change when exact amount is paid
     ✓ [BUG-001 FIXED] route rejects underpayment before change calculation
   Payment Validation
     ✓ accepts payment when amountPaid equals totalAmount
     ✓ accepts payment when amountPaid exceeds totalAmount
     ✓ rejects payment when amountPaid is less than totalAmount
     ✓ rejects payment of zero
   Business Risk: Order Total Integrity
     ✓ order total equals sum of all item subtotals

 PASS  tests/api/auth.test.ts
   GET /api/health
     ✓ returns 200 with status ok
   POST /api/auth/login — input validation
     ✓ returns 400 when body is empty
     ✓ returns 400 when username is missing
     ✓ returns 400 when password is missing
     ✓ returns 401 when user does not exist
   Protected routes — 401 without token
     ✓ Menu list: GET /api/menu → 401
     ✓ Order list: GET /api/orders → 401
     ✓ Create order: POST /api/orders → 401
     ✓ Create payment: POST /api/payments → 401
     ✓ Sales report: GET /api/reports/sales → 401
     ✓ Me endpoint: GET /api/auth/me → 401
   GET /api/auth/me — invalid token
     ✓ returns 401 for malformed JWT

 Test Files  2 passed (2)
      Tests  20 passed (20)
   Duration  1.26s
```

### Newman E2E Tests — 26 / 26 PASS

```
┌─────────────────────────┬────────────────────┬───────────────────┐
│                         │           executed │            failed │
├─────────────────────────┼────────────────────┼───────────────────┤
│              iterations │                  1 │                 0 │
│                requests │                 24 │                 0 │
│            test-scripts │                 21 │                 0 │
│      prerequest-scripts │                  1 │                 0 │
│              assertions │                 26 │                 0 │
├─────────────────────────┴────────────────────┴───────────────────┤
│ total run duration: 5.4s                                         │
│ average response time: 155ms                                     │
└──────────────────────────────────────────────────────────────────┘
```

### Test Case Table

| TC-ID | Type | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|------|---------|----------|----------|--------|-----------|
| TC-001 | Positive | Health | GET /api/health | 200 + `{"status":"ok"}` | 200 + `{"status":"ok","version":"2.0.0"}` | PASS |
| TC-002 | Positive | Auth | Admin login | 200 + JWT token | 200 + JWT token | PASS |
| TC-003 | Positive | Auth | Cashier login | 200 + JWT token | 200 + JWT token | PASS |
| TC-004 | Positive | Auth | Waiter login | 200 + JWT token | 200 + JWT token | PASS |
| TC-005 | Negative | Auth | Wrong password | 401 | 401 | PASS |
| TC-006 | Negative | Auth | Missing credentials | 400 | 400 | PASS |
| TC-007 | Security | Auth | No token → protected route | 401 | 401 | PASS |
| TC-008 | Positive | Menu | GET /api/menu list | 200 + array | 200 + array | PASS |
| TC-009 | Positive | Menu | Search "Pad Thai" | 200 + results | 200 + results | PASS |
| TC-010 | Security | Menu | SQL Injection in search (BUG-003) | 200 empty / 400 | 200 `[]` | PASS |
| TC-011 | Security | Menu | Waiter update price (BUG-004) | 403 | 403 | PASS |
| TC-012 | Positive | Menu | Admin adds menu item | 201 | 201 | PASS |
| TC-013 | Negative | Menu | Waiter cannot add menu | 403 | 403 | PASS |
| TC-014 | Positive | Order | Create order | 201 | 201 | PASS |
| TC-015 | Negative | Order | Double booking (BUG-002) | 409 | 409 | PASS |
| TC-016 | Positive | Order | Add item to order | 201 | 201 | PASS |
| TC-017 | Positive | Order | Confirm order | 200 | 200 | PASS |
| TC-018 | Negative | Order | Missing tableId | 400 | 400 | PASS |
| TC-019 | Positive | Payment | Exact payment | 201 + change >= 0 | 201 + change >= 0 | PASS |
| TC-020 | Negative | Payment | Underpayment (BUG-001) | 400 | 400 | PASS |
| TC-021 | Security | Payment | No auth | 401 | 401 | PASS |

**Newman Pass Rate: 26 / 26 assertions (100%)**

---

## Bug Reports

### BUG-001 — Underpayment Accepted, Negative Change Stored

**Severity:** Critical | **Priority:** P1 | **Status:** Fixed

**Endpoint:** `POST /api/payments`

**Steps to Reproduce:**
1. Login เป็น Cashier รับ JWT Token
2. เปิดออเดอร์และยืนยัน (totalAmount = 200)
3. ส่ง `POST /api/payments` ด้วย `amountPaid: 10`

**Expected:** HTTP 400 — `"Insufficient payment amount"`  
**Actual (Before Fix):** HTTP 201 — `change: -190` (ค่าลบ) บันทึกสำเร็จ

**Root Cause:** ขาด validation `if (paid < totalAmount)` ใน `backend/src/routes/payments.ts`

**Fix Applied:**
```typescript
if (paid < totalAmount) {
  res.status(400).json({ error: 'Insufficient payment amount' }); return
}
```

**Verified:** Newman TC-020 → HTTP 400 ✅

---

### BUG-002 — Double Booking: Same Table Can Have Multiple Open Orders

**Severity:** High | **Priority:** P1 | **Status:** Fixed

**Endpoint:** `POST /api/orders`

**Steps to Reproduce:**
1. Login เป็น Waiter
2. `POST /api/orders` ด้วย `tableId: 2` → สำเร็จ (Order #1)
3. `POST /api/orders` ด้วย `tableId: 2` อีกครั้ง → สำเร็จ (Order #2) — ไม่ควรทำได้

**Expected:** HTTP 409 — `"Table already has an open order"`  
**Actual (Before Fix):** HTTP 201 ทั้งสองครั้ง

**Root Cause:** ขาดการตรวจสอบออเดอร์ที่เปิดอยู่บนโต๊ะเดิม

**Fix Applied:**
```typescript
const existing = await prisma.order.findFirst({ where: { tableId, status: 'open' } })
if (existing) { res.status(409).json({ error: 'Table already has an open order' }); return }
```

**Verified:** Newman TC-015 → HTTP 409 ✅

---

### BUG-003 — SQL Injection in Menu Search Endpoint

**Severity:** Critical | **Priority:** P1 | **Status:** Fixed

**Endpoint:** `GET /api/menu?search=`

**Steps to Reproduce:**
1. Login รับ JWT Token
2. `GET /api/menu?search=' OR '1'='1`

**Expected:** HTTP 200 — empty array `[]`  
**Actual (Before Fix):** HTTP 200 — ข้อมูลเมนูทั้งหมดรั่วไหล (SQL Injection สำเร็จ)

**Root Cause:** ใช้ `$queryRawUnsafe()` พร้อม string interpolation

**Fix Applied:**
```typescript
const pattern = `%${search}%`
const results = await prisma.$queryRaw`
  SELECT * FROM "menu_items"
  WHERE ("name" ILIKE ${pattern} OR "description" ILIKE ${pattern})
  AND "isAvailable" = true`
```

**Verified:** Newman TC-010 → `[]` ✅

---

### BUG-004 — Waiter Can Update Menu Prices (Missing Role Check)

**Severity:** High | **Priority:** P2 | **Status:** Fixed

**Endpoint:** `PUT /api/menu/:id`

**Steps to Reproduce:**
1. Login เป็น Waiter
2. `PUT /api/menu/1` ด้วย Waiter token + body `{"price": 1}`

**Expected:** HTTP 403 — `"Insufficient permissions"`  
**Actual (Before Fix):** HTTP 200 — ราคาเมนูถูกเปลี่ยนสำเร็จ

**Root Cause:** `requireRole('admin')` หายไปจาก PUT route

**Fix Applied:**
```typescript
router.put('/:id', authenticate, requireRole('admin'), async (req, res) => { ... })
```

**Verified:** Newman TC-011 → HTTP 403 ✅

---

### BUG-005 — Sales Report Date Filter Uses `gt` Instead of `gte`

**Severity:** Medium | **Priority:** P2 | **Status:** Fixed

**Endpoint:** `GET /api/reports/sales?startDate=`

**Steps to Reproduce:**
1. มีข้อมูล Payment ในวันที่ 2026-05-08
2. `GET /api/reports/sales?startDate=2026-05-08&endDate=2026-05-08`

**Expected:** รายงานรวม payment ทุกรายการของวันนั้น  
**Actual (Before Fix):** ยอดขายขาดหาย เพราะ `gt` ไม่รวม startDate (ต้องการ `gte`)

**Root Cause:** ใช้ `dateFilter.gt` แทน `dateFilter.gte`

**Fix Applied:**
```typescript
const dateFilter: { gte?: Date; lte?: Date } = {}
if (startDate) dateFilter.gte = new Date(startDate)
```

**Verified:** `GET /api/reports/sales?startDate=2026-05-08&endDate=2026-05-08` → `{"totalOrders":5}` ✅

---

## Automated Testing

รันการทดสอบทั้งหมดด้วยคำสั่งเดียวจาก root directory:

```bash
npm run test:all
```

| Script | คำสั่ง | คำอธิบาย |
|--------|--------|----------|
| `test:unit` | `npm --prefix backend test` | รัน Vitest unit tests |
| `test:e2e` | `newman run tests/postman/RMS-TestSuite-v2.json ...` | รัน Newman E2E tests |
| `test:all` | `npm run test:unit && npm run test:e2e` | รันทั้งสองต่อเนื่องกัน |

**ผล:**
- Vitest: **20 / 20** (100%)
- Newman: **26 / 26** assertions (100%)

Newman HTML Report: `tests/reports/newman-report.html`

---

## Deployment Guide

### Prerequisites

```
Node.js >= 22.0.0
Docker Desktop (for Docker Compose)
```

### Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |

---

### Local Setup (Docker Compose — Staging)

```bash
# 1. Clone Repository
git clone https://github.com/weerapat-s/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025

# 2. สร้างไฟล์ .env ที่ root
cat > .env << EOF
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
JWT_SECRET=your-secret-key-min-32-chars
CORS_ORIGIN=http://localhost
EOF

# 3. Build และรัน
docker compose up --build

# Frontend: http://localhost
# Backend:  http://localhost:3001/api/health
```

---

### Local Setup (Manual — Development)

```bash
# Backend
cd backend
cp .env.example .env          # แก้ DATABASE_URL, JWT_SECRET, CORS_ORIGIN
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev                    # http://localhost:3001

# Frontend (Terminal ใหม่)
cd frontend
echo "VITE_API_URL=http://localhost:3001/api" > .env.local
npm install
npm run dev                    # http://localhost:5173
```

---

### Environment Variables

| Variable | Service | คำอธิบาย |
|----------|---------|----------|
| `DATABASE_URL` | Backend | PostgreSQL connection string (Neon.tech) |
| `JWT_SECRET` | Backend | Random string >= 32 ตัวอักษร |
| `CORS_ORIGIN` | Backend | URL ของ Frontend (`http://localhost` หรือ Vercel URL) |
| `NODE_ENV` | Backend | `development` หรือ `production` |
| `PORT` | Backend | Port ของ Backend (default: 3001) |
| `VITE_API_URL` | Frontend | URL ของ Backend API |

---

### Neon.tech Database Setup

1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String → ใส่เป็น `DATABASE_URL`
3. รัน `npx prisma db push` เพื่อสร้าง Schema
4. รัน `npx tsx prisma/seed.ts` เพื่อ seed ข้อมูลเริ่มต้น

---

### Render Deployment (Backend)

```
Service Type:   Web Service
Environment:    Docker
Dockerfile:     ./Dockerfile
Health Check:   /api/health
Region:         Singapore
```

**Environment Variables บน Render:**
| Variable | ค่า |
|----------|-----|
| `DATABASE_URL` | Connection String จาก Neon.tech |
| `JWT_SECRET` | Random string >= 32 ตัวอักษร |
| `CORS_ORIGIN` | `https://your-app.vercel.app` |
| `NODE_ENV` | `production` |

---

### Vercel Deployment (Frontend)

```
Root Directory: frontend
Framework:      Vite
Build Command:  npm run build
```

**Environment Variables บน Vercel:**
| Variable | ค่า |
|----------|-----|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` |

---

### Staging Smoke Test Results

| # | Test | URL | Result |
|---|------|-----|--------|
| 1 | Backend Health | `GET http://localhost:3001/api/health` | PASS |
| 2 | Login (Admin) | `POST http://localhost:3001/api/auth/login` | PASS |
| 3 | Frontend | `GET http://localhost` | PASS |
| 4 | API via Nginx | `GET http://localhost/api/health` | PASS |

### Production Smoke Test Results

| # | Test | URL | Result |
|---|------|-----|--------|
| 1 | Backend Health | `GET https://restaurant-management-system-exam-2025.onrender.com/api/health` | PASS |
| 2 | Login (Admin) | `POST .../api/auth/login` | PASS |
| 3 | Open Order + Payment | `POST .../orders → confirm → payments` | PASS |
| 4 | Frontend | `https://restaurantmanagementsystem-rouge.vercel.app` | PASS |

---

## CI/CD Pipeline

`.github/workflows/ci.yml` มี 2 jobs ทำงานต่อเนื่องกัน:

| Job | Steps |
|-----|-------|
| `test` | checkout → setup-node(22) → backend install → prisma generate → **vitest run** → npm audit backend → frontend install → npm audit frontend → **frontend build** |
| `e2e` (needs: test) | checkout → setup-node(22) → backend install → prisma db push → seed → **start backend** → wait health → **newman run** → upload HTML report |

**Triggers:** push / PR ไปที่ `main` หรือ `master`

**Newman Pass Rate (CI):** 26 / 26 assertions (100%) — ทดสอบบน fresh PostgreSQL DB
