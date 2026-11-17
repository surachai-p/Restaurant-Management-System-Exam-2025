# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/Pootanapat/Restaurant-Management-System-Exam-2025/actions/workflows/ci.yml/badge.svg)](https://github.com/Pootanapat/Restaurant-Management-System-Exam-2025/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** ภูธนพัตน์ ตากิ่มนอก

**รหัสนักศึกษา:** 68030231

**วันที่สอบ:** 17 พฤศจิกายน 2569

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
| Frontend    | https://pootanapat-rms-68030231.vercel.app |
| Backend API | https://pootanapat-rms-api.onrender.com |
| Health Check| https://pootanapat-rms-api.onrender.com/api/health |

---

## 📋 Test Plan

### Test Scope
**In Scope:**
- [x] Authentication (Login/Logout, JWT)
- [x] Menu Management (CRUD + Role-based access)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash/Card/QR)
- [x] Sales Reports

**Out of Scope:** Payment gateway จริงและ load/stress test เนื่องจากระบบใช้ข้อมูลจำลองและโจทย์ไม่ได้กำหนด workload target

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
| Browser   | Microsoft Edge (Playwright headless) |
| OS        | Windows NT 10.0.26200.0 |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| รับเงินไม่ครบแต่ปิดออเดอร์ | รายได้และยอดเงินสดคลาดเคลื่อน | P1 |
| เปิดหลายออเดอร์บนโต๊ะเดียว | เสิร์ฟและคิดเงินผิดโต๊ะ | P1 |

---

## 🧪 Test Cases & Results

### Vitest Results
```
Run: npm test
Test Files: 3 passed (3)
Tests: 25 passed (25)
```

### Newman Pass Rate
```
Requests: 24/24  |  Assertions: 29/29  |  Failed: 0  |  Pass Rate: 100%
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-002 | Auth | Admin login | 200 + JWT | 200 + JWT | PASS |
| TC-005 | Auth | Wrong password | 401 | 401 | PASS |
| TC-007 | Security | No token | 401 | 401 | PASS |
| TC-010 | Security | SQL Injection | ไม่คืนข้อมูลทั้งหมด | 200 + empty array | PASS |
| TC-011 | Security | Waiter update price | 403 | 403 | PASS |
| TC-015 | Order | Double booking | 409 | 409 | PASS |
| TC-023 | Payment | Underpayment | 400 | 400 | PASS |

---

## 🐛 Bug Reports

## BUG-001: ระบบรับชำระเงินไม่ครบและสร้างเงินทอนติดลบ

**Severity:** Critical
**Feature:** Payment
**Endpoint:** `POST /api/payments`

### Steps to Reproduce
1. สร้างและยืนยันออเดอร์ที่มียอดมากกว่า 1 บาท
2. เรียก `POST /api/payments` ด้วย `amountPaid=1`
3. ระบบเดิมสร้าง Payment และคืนเงินทอนติดลบ

### Expected / Actual Result
- Expected: HTTP 400 และไม่สร้าง Payment
- Actual หลังแก้: HTTP 400 พร้อมปฏิเสธ underpayment

### Business Impact
ร้านอาจปิดออเดอร์ทั้งที่รับเงินไม่ครบ ทำให้รายได้และรายงานยอดขายผิด

---

## 🚀 Deployment Guide

### Prerequisites
```
Node.js >= 22.0.0
Docker Desktop (for local)
```

### Local Setup (Docker Compose)
```bash
git clone https://github.com/Pootanapat/Restaurant-Management-System-Exam-2025.git
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
| `DATABASE_URL` | Neon PostgreSQL URL | เก็บเป็น Render secret |
| `JWT_SECRET` | Random secret string | *(ไม่ระบุ)* |
| `CORS_ORIGIN` | Frontend URL | `https://pootanapat-rms-68030231.vercel.app` |

### Neon PostgreSQL Database Setup
1. สร้าง Neon PostgreSQL 16 project
2. Copy direct connection string → ใส่เป็น `DATABASE_URL` ใน Render
3. Docker start command รัน `prisma db push` และ seed ก่อนเริ่ม API

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://pootanapat-rms-api.onrender.com/api`

### Render Deployment (Backend + Database)
1. สร้าง Neon PostgreSQL database (ตามขั้นตอนด้านบน)
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
| Health | GET /api/health | ✅ PASS |
| Login | POST /api/auth/login | ✅ PASS |
| Add Menu | POST /api/menu | ✅ PASS |
| Open Order | POST /api/orders | ✅ PASS |
| Payment | POST /api/payments | ✅ PASS |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
✓ TC-002: Admin login
✓ TC-005: Wrong password → 401
✓ TC-010: SQL Injection input does not leak records
✓ TC-015: Double booking → 409
✓ TC-023: Underpayment → 400
24/24 requests, 29/29 assertions, 100% pass
```

---

## 🔐 Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
