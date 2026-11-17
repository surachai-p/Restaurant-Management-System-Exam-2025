# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/AgnesTachyon-feet/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/AgnesTachyon-feet/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** _อรัญชัย คำเพ็ญ_
**รหัสนักศึกษา:** _68030316_
**วันที่สอบ:** _16/11/2026_

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + **TypeScript** + **Tailwind CSS** |
| Backend  | Node.js 22 LTS + Express + **TypeScript** |
| Database | PostgreSQL 16 (Neon.tech **หรือ** Render PostgreSQL — ยังไม่ได้ตัดสิน, see Exam-Result.md §5.1 conflict note) |
| ORM      | **Prisma** |
| Testing  | **Vitest** + Supertest + Newman |
| Deploy   | Vercel (FE) + Render (BE + DB) |

---

## 🌐 Production URLs

| Service     | URL |
|-------------|-----|
| Frontend    | https://restaurant-management-system-exam-2-jet.vercel.app/ |
| Backend API | https://booking-backend-2xgx.onrender.com/ |
| Health Check| https://booking-backend-2xgx.onrender.com/api/health |

---

## 📋 Test Plan

<!-- ส่วนที่ 1: นักศึกษากรอก -->

### Test Scope
**In Scope:**
- [x] Authentication (Login/Logout, JWT)
- [x] Menu Management (CRUD + Role-based access + Stock)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash; Card/QR recorded as method only)
- [x] Sales Reports (Daily / Range / Monthly)

**Out of Scope:** Performance Load Test (JMeter); real payment-gateway integration.

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment) + API tests (mocked Prisma) — 38/38 pass |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด — 30 requests / 38 assertions / 100% |
| Security Testing | Manual + Postman + npm audit | Auth, SQL Injection, Role Check — backend audit clean |

### Test Environment

| Component | Specification |
|-----------|--------------|
| Node.js   | 22 LTS runtime (build verified with v26) |
| PostgreSQL | 16 (staged locally via Docker; cloud provider pending decision) |
| Browser   | — |
| OS        | Linux |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| _กรอก_ | _กรอก_ | P1 |
| _กรอก_ | _กรอก_ | P2 |

---

## 🧪 Test Cases & Results

<!-- ส่วนที่ 2 -->

### Vitest Results
```
Run: npm test   (2026-10-31)
Test Files  4 passed (4)
Tests       38 passed (38)   — includes BUG-001 regression, RBAC, stock validation, SQLi login
```

### Newman Pass Rate
```
Total: 30 requests / 38 assertions  |  Passed: 38  |  Failed: 0  |  Pass Rate: 100%
Evidence: tests/reports/newman-report.json (staging, docker compose, 2026-10-31)
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-002 | Auth | Admin login | 200 + JWT | 200 + JWT | ✅ |
| TC-005 | Auth | Wrong password | 401 | 401 | ✅ |
| TC-007 | Security | No token | 401 | 401 | ✅ |
| TC-010 | Security | SQL Injection (menu search) | No leak | 0 records, 200 | ✅ |
| TC-011 | Security | Waiter update price | 403 | 403 | ✅ |
| TC-013 | Security | Waiter create menu | 403 | 403 | ✅ |
| TC-015 | Order | Double booking | 409 | 409 | ✅ |
| TC-005 | Order | Out-of-stock item | 400 | 400 | ✅ |
| TC-020b | Payment | Underpayment | 400 | 400 | ✅ |
| TC-019 | Payment | Exact payment | 200 + change 0 | 200 + change 0 | ✅ |
| TC-040 | Report | Monthly report | 200 + bestSelling | 200 | ✅ |

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

## BUG-001: Underpayment accepted (negative change)

**Severity:** Critical
**Feature:** Payment
**Endpoint:** `POST /api/payments`
**Status:** **Fixed** (2026-10-31)

### Steps to Reproduce
1. Confirm an order (total ฿600).
2. `POST /api/payments {orderId, amountPaid: 100}`

### Expected / Actual Result
- Expected: HTTP 400 "Insufficient payment amount", no payment record.
- Before fix: HTTP 201 with `change: -500` stored.
- After fix: HTTP 400. Verified by Newman TC-020b + Vitest `tests/api/payments.test.ts`.

### Business Impact
บันทึกรายรับที่ไม่ได้เงินจริง — รายงานยอดขายผิดพลาด

---

## BUG-002: Table double booking

**Severity:** High
**Feature:** Order
**Endpoint:** `POST /api/orders`
**Status:** **Fixed** (2026-10-31)

### Steps to Reproduce
1. `POST /api/orders {tableId: X}` twice while the first open-order exists.

### Expected / Actual Result
- Expected: second request → 409 (checked inside the same transaction).
- After fix: 409 "Table already has an open order" (Newman TC-015 + Vitest).

### Business Impact
จองโต๊ะซ้ำ — ลูกค้าชนกัน, สถานะโต๊ะไม่ตรง

---

## BUG-003: SQL Injection in menu search

**Severity:** Critical
**Feature:** Menu (API)
**Endpoint:** `GET /api/menu?search=`
**Status:** **Fixed** (2026-10-31)

### Steps to Reproduce
1. `GET /api/menu?search=' OR '1'='1`

### Expected / Actual Result
- Before fix: `$queryRawUnsafe` interpolated the payload → leaked all menu rows.
- After fix: parameterized `$queryRaw` tagged template → 0 records (Newman TC-010).

### Business Impact
ก่อนแก้: ข้อมูลทั้งฐานข้อมูลอาจถูกอ่าน/แก้ไขจากพนักงานภายใน

---

## BUG-004: Waiter could update menu prices (RBAC missing)

**Severity:** High
**Feature:** Menu (RBAC)
**Endpoint:** `PUT /api/menu/:id`
**Status:** **Fixed** (2026-10-31)

### Steps to Reproduce
1. Login as waiter, `PUT /api/menu/1 {price: 1}`.

### Expected / Actual Result
- Before fix: 200 — update succeeded.
- After fix: 403 (Newman TC-011 + Vitest).

### Business Impact
พนักงานแก้ราคาเมลูเองได้ — ความเสี่ยงขาดทุน

---

## BUG-005: Sales report excluded orders at midnight of startDate

**Severity:** Medium
**Feature:** Reports
**Endpoint:** `GET /api/reports/sales`
**Status:** **Fixed** (2026-10-31)

### Steps to Reproduce
1. `GET /api/reports/sales?startDate=YYYY-MM-DD`.

### Expected / Actual Result
- Before fix: `gt` (strictly after) excluded the midnight-of-startDate orders.
- After fix: `gte` + start normalised to 00:00:00 (inclusive).

### Business Impact
รายงานยอดขายต่ำกว่าจริง

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
| `DATABASE_URL` | Render PostgreSQL URL | `postgresql://user:pass@...render.com/db` |
| `JWT_SECRET` | Random secret string | *(ไม่ระบุ)* |
| `CORS_ORIGIN` | Frontend URL | `https://your-app.vercel.app` |

### Render PostgreSQL Database Setup
1. ไปที่ https://dashboard.render.com → Databases → New PostgreSQL
2. เลือก Free plan หรือ Paid ตามต้องการ
3. Copy External Database URL → ใส่เป็น `DATABASE_URL`
4. รัน `npx prisma db push` เพื่อสร้าง Schema (local หรือใน Render build)

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://your-backend.onrender.com/api`

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

### Environment Variables (Backend)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Neon **หรือ** Render — pending decision) | `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Random ≥32-char secret ( REQUIRED in production — server refuses to start without it when `NODE_ENV=production`) | *(not stored in repo)* |
| `CORS_ORIGIN` | Frontend URL | `https://your-app.vercel.app` |

### Database Hosting — PENDING DECISION

⚠️ The documents disagree:
- `Exam-Result.md` §5.1 says **Neon.tech**.
- `README.md` says **Render PostgreSQL** (steps below).

Both are valid for the app (Prisma `DATABASE_URL` + `sslmode=require`). **No cloud database has been provisioned yet.** Seed is guarded (no-op if users exist) and `prisma db push` only runs in the backend container start command — review this before pointing it at a production database.

### Render PostgreSQL Database Setup
1. ไปที่ https://dashboard.render.com → Databases → New PostgreSQL
2. เลือก Free plan หรือ Paid ตามต้องการ
3. Copy External Database URL → ใส่เป็น `DATABASE_URL`
4. รัน `npx prisma db push` เพื่อสร้าง Schema (local หรือใน Render build)

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://your-backend.onrender.com/api`

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

> **Note:** the Render auto-config file currently sits under the dead filename `r.yxx` — rename it to `render.yaml` and remove its `disk` mount (a Docker pserv on Render doesn't need, and likely rejects, a disk mount) before enabling it:
- Push `render.yaml` to GitHub
- In Render Dashboard → Settings → YAML → Enable

### Smoke Test Results

| Test | URL | Result |
|------|-----|--------|
| Health | GET /api/health | ✅ `{"status":"ok"}` (staging, 2026-10-31) |
| Login | POST /api/auth/login | ✅ JWT returned (staging) |
| Add Menu | POST /api/menu | ✅ 201 (Newman TC-012) |
| Open Order | POST /api/orders | ✅ 201 + double-booking 409 (Newman TC-014/015) |
| Payment | POST /api/payments | ✅ 200, correct change (Newman TC-019; underpayment now 400) |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
✓ TC-002: Admin login
✓ TC-005: Wrong password → 401
✗ TC-010: SQL Injection (BUG-003 detected)
...
```

---

## 🔐 Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
