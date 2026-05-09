# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/YOUR_USERNAME/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** _นายธนาเทพ ธีรปกรณ์_
**รหัสนักศึกษา:** _68030120_
**วันที่สอบ:** _8/5/2569_

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
| Frontend    | https://YOUR-FRONTEND.vercel.app |
| Backend API | https://YOUR-BACKEND.onrender.com |
| Health Check| https://YOUR-BACKEND.onrender.com/api/health |

---

## 📋 Test Plan

<!-- ส่วนที่ 1: นักศึกษากรอก -->

### Test Scope
**In Scope:**
- [ ] Authentication (Login/Logout, JWT)
- [ ] Menu Management (CRUD + Role-based access)
- [ ] Order Management (Open/Add Items/Confirm/Cancel)
- [ ] Payment Processing (Cash/Card/QR)
- [ ] Sales Reports

**Out of Scope:** _ระบุสิ่งที่ไม่ทดสอบ_

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
| Browser   | _Version 147.0.7727.138_ |
| OS        | _window 11_ |

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
Run: npm test
✓ Payment returns positive change when overpaid
✗ [BUG-001] Should NOT allow negative change  ← reveals bug!
...
```

### Newman Pass Rate
```
Total: 21  |  Passed: 19  |  Failed: 1  |  Pass Rate: 85.71%%
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-002 | Auth | Admin login | 200 + JWT | 200 + JWT | Pass |
| TC-005 | Auth | Wrong password | 401 | 401 | Pass |
| TC-007 | Security | No token | 401 | Pass | Pass |
| TC-010 | Security | SQL Injection | Empty/400 | 200 + SQL injection possible | Fail |
| TC-011 | Security | Waiter update price | 403 | 200(price changed) | Fail |
| TC-015 | Order | Double booking | 409 | 201(duplicate order allowed) | Fail |
| TC-020 | Payment | Underpayment | 400 | 201/negative chage allowed | Fail |

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

## BUG-001: [ระบบอนุญาตให้บันทึกยอดเงินทอนติดลบ (Underpayment Rejection Failure)]

**Severity:** Critical
**Feature:** Payment
**Endpoint:** `POST /api/payments`

### Steps to Reproduce
1. เรียกใช้งาน Endpoint POST /api/payments

2. ส่งยอดชำระเงิน (Amount Paid) ที่ น้อยกว่า ราคาสินค้า (Total Price)

3. ตรวจสอบค่าที่ระบบคำนวณในตัวแปร change (เงินทอน)

### Expected / Actual Result
- Expected Result: ระบบต้องทำการ Validation และปฏิเสธการทำรายการ (Return HTTP 400 Bad Request) โดยยอดเงินทอนห้ามติดลบ ($$\ge 0$$)

- Actual Result: ระบบคำนวณเงินทอนออกมาเป็นค่าลบ (เช่น -50) และปล่อยให้ดำเนินการต่อโดยไม่มีการตรวจสอบความถูกต้อง

### Business Impact
* ความเสียหายทางการเงิน: ธุรกิจสูญเสียรายได้เนื่องจากลูกค้าจ่ายเงินไม่ครบแต่ระบบยอมรับรายการ

* ข้อมูลผิดพลาด: ยอดเงินในระบบบัญชีและ Database จะผิดเพี้ยน (มีค่าติดลบในส่วนที่ควรจะเป็นบวก)

* ความน่าเชื่อถือ: หากเกิดในระบบ Production จะส่งผลต่อความเชื่อมั่นของลูกค้าและเจ้าของกิจการอย่างมาก

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
| `DATABASE_URL` | Render PostgreSQL URL | `postgresql://neondb_owner:npg_mz1Ch4XejOEs@ep-patient-brook-aorih7ba-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `JWT_SECRET` | Random secret string | *7497907e6c2281cbb8da1c7f317cd72adcd15ca33b69e2b49d4a2c41a75cc275* |
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

หรือใช้ `render.yaml` สำหรับ auto-configuration:
- Push `render.yaml` ไป GitHub
- ใน Render Dashboard → Settings → YAML → Enable

### Smoke Test Results

| Test | URL | Result |
|------|-----|--------|
| Health | GET /api/health | ✅/❌ |
| Login | POST /api/auth/login | ✅/❌ |
| Add Menu | POST /api/menu | ✅/❌ |
| Open Order | POST /api/orders | ✅/❌ |
| Payment | POST /api/payments | ✅/❌ |

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
