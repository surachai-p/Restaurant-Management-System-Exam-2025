# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI/CD Pipeline](https://github.com/Doonminus2/Restaurant-Management-System-Exam-2025/actions/workflows/cicd.yml/badge.svg)](https://github.com/Doonminus2/Restaurant-Management-System-Exam-2025/actions/workflows/cicd.yml)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** ชิษณุพัศก์ วายุสุวรรณวิทย์
**รหัสนักศึกษา:** 68030063
**วันที่สอบ:** 8/5/2026

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend  | Node.js 22 LTS + Express + TypeScript |
| Database | PostgreSQL 16 (Neon.tech) |
| ORM      | Prisma |
| Testing  | Vitest + Supertest + Newman |
| Deploy   | Vercel (FE) + Render (BE) |

---

## 🌐 Production URLs

| Service      | URL |
|--------------|-----|
| Frontend     | https://restaurant-management-system-exam-2.vercel.app |
| Backend API  | https://restaurant-management-system-exam-backend.onrender.com |
| Health Check | https://restaurant-management-system-exam-backend.onrender.com/api/health |
| Database     | Neon.tech (PostgreSQL 16) |

---

## 📋 Test Plan

### Test Scope

**In Scope:**
- [x] Authentication (Login/Logout, JWT)
- [x] Menu Management (CRUD + Role-based access)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash)
- [x] Security (SQL Injection, Role Check, No-Auth)

**Out of Scope:** Sales Reports (UI only, not tested via API)

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment Calculation) |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด (21 TC) |
| Security Testing | Postman | Auth, SQL Injection, Role Check |

### Test Environment

| Component  | Specification |
|------------|--------------|
| Node.js    | 22 LTS |
| PostgreSQL  | 16 (Neon.tech) |
| Browser    | Chrome 124 |
| OS         | macOS |

### Entry / Exit Criteria

**Entry:** ระบบ Start ได้ ✅ · `GET /api/health` คืน `{"status":"ok"}` ✅ · Database เชื่อมต่อ Neon.tech ✅ · Postman Collection พร้อม ✅

**Exit:** ≥ 80% Test Cases ผ่าน ✅ (84.6%) · ไม่มี Critical Bug ที่ยังไม่รายงาน ✅

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| ชำระเงินน้อยกว่ายอดจริง (Underpayment) | ร้านสูญเสียรายได้ | P1 |
| เปิดบิลซ้อนบนโต๊ะเดิม (Double Booking) | บิลปะปน เก็บเงินผิดโต๊ะ | P2 |

---

## 🧪 Test Cases & Results

### Vitest Unit Tests
```
Test Files  2 passed (2)
     Tests  20 passed (20)
  Duration  352ms
```

### Newman E2E Pass Rate
```
Assertions Total : 26
Assertions Passed: 22
Assertions Failed: 4  (BUG-002, BUG-003 ×2, BUG-004 — Known Open Bugs)
Pass Rate        : 84.6%
```

### Test Case Summary

| TC-ID  | Feature  | Scenario                        | Expected       | Actual         | Pass/Fail |
|--------|----------|---------------------------------|----------------|----------------|-----------|
| TC-001 | Health   | GET /api/health                 | 200 + ok       | 200 + ok       | ✅ |
| TC-002 | Auth     | Admin login                     | 200 + JWT      | 200 + JWT      | ✅ |
| TC-005 | Auth     | Wrong password                  | 401            | 401            | ✅ |
| TC-007 | Security | No token                        | 401            | 401            | ✅ |
| TC-012 | Menu     | Admin adds menu item            | 201            | 201            | ✅ |
| TC-013 | Menu     | Waiter cannot add menu          | 403            | 403            | ✅ |
| TC-014 | Order    | Create order                    | 201            | 201            | ✅ |
| TC-015 | Order    | Double booking (BUG-002)        | 409 Conflict   | 201 Created    | ❌ |
| TC-019 | Payment  | Exact payment                   | 201 + change≥0 | 201 + change≥0 | ✅ |
| TC-020 | Payment  | Underpayment (BUG-001 Fixed)    | 400            | 400            | ✅ |
| TC-021 | Security | Payment without auth            | 401            | 401            | ✅ |

---

## 🐛 Bug Reports

### BUG-001: ระบบอนุญาตให้ชำระเงินน้อยกว่ายอดรวม — **FIXED ✅**

**Severity:** Critical | **Feature:** Payment | **Endpoint:** `POST /api/payments`

**Steps:** ส่ง `amountPaid` ที่น้อยกว่า `totalAmount`

**Expected:** `400 Bad Request` — **Actual (ก่อนแก้):** `201 Created` + change ติดลบ

**Fix:** เพิ่ม validation ใน `backend/src/routes/payments.ts` ตรวจสอบ `amountPaid >= totalAmount`

---

### BUG-002: ระบบอนุญาตให้เปิดบิลซ้อนกันบนโต๊ะเดิม — **OPEN ❌**

**Severity:** High | **Feature:** Orders | **Endpoint:** `POST /api/orders`

**Steps:** เรียก `POST /api/orders` ด้วย `tableId` เดิมซ้ำ 2 ครั้ง

**Expected:** `409 Conflict` — **Actual:** `201 Created` (เปิดบิลซ้อนได้)

---

## 🚀 Deployment Guide

### Prerequisites
```
Node.js >= 22.0.0
Docker Desktop (สำหรับ Local)
```

### Local Setup (Docker Compose)
```bash
git clone https://github.com/Doonminus2/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025
cp backend/.env .env          # แก้ DATABASE_URL ให้ชี้ไป Neon.tech
docker compose up --build
# Frontend: http://localhost
# Backend:  http://localhost:3001/api/health
```

### Local Setup (Manual)
```bash
# Backend
cd backend
npm install && npx prisma db push && npx tsx prisma/seed.ts && npm run dev

# Frontend (Terminal ใหม่)
cd frontend
npm install && npm run dev
# เปิด http://localhost:5173
```

### Environment Variables

| Variable       | Service  | ค่าตัวอย่าง |
|----------------|----------|-------------|
| `DATABASE_URL` | Backend  | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `JWT_SECRET`   | Backend  | random string ≥ 32 ตัวอักษร |
| `CORS_ORIGIN`  | Backend  | `https://restaurant-management-system-exam-2.vercel.app` |
| `NODE_ENV`     | Backend  | `production` |
| `VITE_API_URL` | Frontend | `https://restaurant-management-system-exam-backend.onrender.com/api` |

### Deploy Backend (Render.com)
1. New Web Service → Connect GitHub Repo `Doonminus2/Restaurant-Management-System-Exam-2025`
2. Root Directory: `backend` | Environment: `Node`
3. Build Command: `npm install && npx prisma generate && npm run build`
4. Start Command: `npx prisma db push && npx tsx prisma/seed.ts && npm start`
5. ใส่ Environment Variables ด้านบนใน Dashboard

### Deploy Frontend (Vercel)
1. Import Repo → Root Directory: `frontend` | Framework: `Vite`
2. Add Environment Variable: `VITE_API_URL` = Backend URL + `/api`
3. Deploy

### Smoke Test Results (Production)

| Test         | URL                          | Result |
|--------------|------------------------------|--------|
| Health Check | `GET /api/health`            | ✅ |
| Login        | `POST /api/auth/login`       | ✅ |
| Open Order   | `POST /api/orders`           | ✅ |
| Payment      | `POST /api/payments`         | ✅ |

---

## 🔄 CI/CD Pipeline

Pipeline: [GitHub Actions — CI/CD Pipeline](https://github.com/Doonminus2/Restaurant-Management-System-Exam-2025/actions/workflows/cicd.yml)

**Steps:**
1. ✅ Setup Node.js 22
2. ✅ Run Backend Unit Tests (`npm test`) — 20/20 passed
3. ✅ Security Audit Backend (`npm audit --audit-level=high`)
4. ✅ Security Audit Frontend (`npm audit --audit-level=critical`)
5. ✅ Install & Run Newman E2E Tests
6. ✅ Upload Newman HTML Report (artifact)

**Newman Pass Rate:** 22/26 assertions = **84.6%**

---

## 🔐 Default Credentials (Testing Only)

| Role    | Username | Password     |
|---------|----------|--------------|
| Admin   | admin    | Admin@123    |
| Cashier | cashier1 | Cashier@123  |
| Waiter  | waiter1  | Waiter@123   |
