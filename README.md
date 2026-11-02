# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/rarekk/Restaurant-Management-System-Exam-2025/actions/workflows/ci.yml/badge.svg)](https://github.com/rarekk/Restaurant-Management-System-Exam-2025/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** _กรอกชื่อ-สกุล_
**รหัสนักศึกษา:** _กรอกรหัส_
**วันที่สอบ:** 2 พฤศจิกายน 2569

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + **TypeScript** + **Tailwind CSS** |
| Backend  | Node.js 22 LTS + Express + **TypeScript** |
| Database | PostgreSQL 17 (Supabase) |
| ORM      | **Prisma** |
| Testing  | **Vitest** + Supertest + Newman |
| Deploy   | Vercel (FE) + Render (BE) + Supabase (DB) |

---

## 🌐 Production URLs

| Service     | URL |
|-------------|-----|
| Frontend    | https://restaurant-management-system-exam-2025.vercel.app |
| Backend API | https://rms-backend-52xr.onrender.com |
| Health Check| https://rms-backend-52xr.onrender.com/api/health |

---

## 📋 Test Plan

<!-- ส่วนที่ 1: นักศึกษากรอก -->

### Test Scope
**In Scope:**
- [x] Authentication (Login/Logout, JWT)
- [x] Menu Management (CRUD + Role-based access)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash/Card/QR)
- [x] Sales Reports

**Out of Scope:** การเชื่อมต่อระบบตัดบัตรเครดิต/ธนาคารจริง (Third-party Payment Gateway) และ Load/Stress Testing

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment Calculation) |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด |
| Security Testing | Manual + Postman + npm audit | Auth, SQL Injection, Role Check, Dependency Vulnerabilities |

### Test Environment

| Component | Specification |
|-----------|--------------|
| Node.js   | 22 LTS |
| PostgreSQL | 17 (Supabase `eu-central-1`) |
| Browser   | Google Chrome (Latest) |
| OS        | Windows 11 |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| ระบบชำระเงินไม่ตรวจสอบยอดเงินที่จ่ายต่ำกว่าราคาจริง (Underpayment) | ร้านอาหารสูญเสียรายได้และทอนเงินติดลบ | P1 |
| ช่องโหว่ SQL Injection และการไม่ตรวจสอบสิทธิ์แก้ไขราคาเมนู | ข้อมูลรั่วไหลและพนักงานทั่วไปสามารถแก้ราคาอาหารได้ | P1 |
| การเปิดโต๊ะซ้ำ (Double Booking) บนโต๊ะที่มีออเดอร์เปิดอยู่แล้ว | ออเดอร์ลูกค้าปนกันและคิดเงินผิดโต๊ะ | P2 |

---

## 🧪 Test Cases & Results

<!-- ส่วนที่ 2 -->

### Vitest Results
```
Run: npm test
✓ Payment returns positive change when overpaid
✗ [BUG-001] Should NOT allow negative change  ← reveals bug!
...
```

### Newman Pass Rate
```
Total: 21  |  Passed: 17  |  Failed: 4  |  Pass Rate: 81.0%
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-002 | Auth | Admin login | 200 + JWT | 200 + JWT | ✅ Pass |
| TC-005 | Auth | Wrong password | 401 | 401 Unauthorized | ✅ Pass |
| TC-007 | Security | No token | 401 | 401 Unauthorized | ✅ Pass |
| TC-010 | Security | SQL Injection | Empty/400 | 200 (คืนเมนูทั้งหมด 10 รายการ — BUG-003) | ❌ Fail (BUG-003) |
| TC-011 | Security | Waiter update price | 403 | 200 (แก้ไขราคาสำเร็จ — BUG-004) | ❌ Fail (BUG-004) |
| TC-015 | Order | Double booking | 409 | 201 (สร้างออเดอร์ซ้ำได้ — BUG-002) | ❌ Fail (BUG-002) |
| TC-020 | Payment | Underpayment | 400 | 201 (ทอนเงินติดลบ — BUG-001) | ❌ Fail (BUG-001) |

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

## BUG-001: ระบบยอมให้ชำระเงินน้อยกว่ายอดรวมและคำนวณเงินทอนติดลบ (Underpayment)

**Severity:** Critical
**Feature:** Payment
**Endpoint:** `POST /api/payments`

### Steps to Reproduce
1. เปิดออเดอร์ เพิ่มรายการอาหาร (เช่น ยอดรวม 160 บาท) และกด Confirm ออเดอร์
2. ส่งคำขอ `POST /api/payments` ด้วยสิทธิ์ Cashier โดยระบุ `{"orderId": 1, "amountPaid": 100, "method": "cash"}`

### Expected / Actual Result
- **Expected:** ระบบปฏิเสธการชำระเงินและคืนค่า HTTP `400 Bad Request` (`Insufficient payment amount`)
- **Actual:** ระบบบันทึกการชำระเงินสำเร็จ คืนค่า HTTP `201 Created` พร้อมค่า `"change": -60`

### Business Impact
ทำให้ร้านอาหารรับเงินไม่ครบตามยอดขายจริงและข้อมูลบัญชี/ลิ้นชักเก็บเงินคลาดเคลื่อน

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
git clone https://github.com/rarekk/Restaurant-Management-System-Exam-2025.git
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
| `DATABASE_URL` | Supabase PostgreSQL Pooler URL | `postgresql://postgres.dtuzbmsbcsdkaeibtpeq:***@aws-1-eu-central-1.pooler.supabase.com:5432/postgres` |
| `JWT_SECRET` | Random secret string | *(ไม่ระบุ)* |
| `CORS_ORIGIN` | Frontend URL | `https://restaurant-management-system-exam-2025.vercel.app` |

### Supabase PostgreSQL Database Setup
1. ไปที่ https://supabase.com/dashboard → สร้างโปรเจกต์ `rms-database`
2. กด Connect → คัดลอก Session Pooler Connection String (Port `5432`) → ใส่เป็น `DATABASE_URL`
3. รัน `npx prisma db push` และ `npx tsx prisma/seed.ts` เพื่อสร้าง Schema และข้อมูลเริ่มต้น

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://rms-backend-52xr.onrender.com/api`

### Render Deployment (Backend)
1. New Blueprint / Web Service → Connect GitHub repo `rarekk/Restaurant-Management-System-Exam-2025`
2. Root Directory: `backend`
3. Environment: Docker (`PORT=10000`)
4. Add Environment Variables ใน Environment tab:
   - `DATABASE_URL`: Supabase Session Pooler URL (`aws-1-eu-central-1.pooler.supabase.com:5432`)
   - `JWT_SECRET`: random string
   - `CORS_ORIGIN`: `*` หรือ Frontend Vercel URL
5. Deploy → Monitor logs

### Smoke Test Results

| Test | URL | Result |
|------|-----|--------|
| Health | GET https://rms-backend-52xr.onrender.com/api/health | ✅ (`200 OK`) |
| Login | POST https://rms-backend-52xr.onrender.com/api/auth/login | ✅ (`200 OK + JWT`) |
| Add Menu | GET/POST https://rms-backend-52xr.onrender.com/api/menu | ✅ (`200/201`) |
| Open Order | POST https://rms-backend-52xr.onrender.com/api/orders | ✅ (`201 Created`) |
| Payment | POST https://rms-backend-52xr.onrender.com/api/payments | ✅ (`201 Created`) |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
✓ TC-001: GET /api/health → 200 OK
✓ TC-002: Admin login → 200 + JWT
✓ TC-005: Wrong password → 401
✓ TC-007: No token → 401
✗ TC-010: SQL Injection (BUG-003 detected)
✗ TC-011: Waiter updates menu price (BUG-004 detected)
✗ TC-015: Double booking same table (BUG-002 detected)
✗ TC-020: Underpayment (BUG-001 detected)
```

---

## 🔐 Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
