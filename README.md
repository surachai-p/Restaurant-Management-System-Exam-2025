# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/YOUR_USERNAME/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** นางสาวรรัทยา รอดเมล์
**รหัสนักศึกษา:** 68030258
**วันที่สอบ:** 14/10/2569

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
| Frontend    | https://restaurant-management-system-exam-2-gamma.vercel.app |
| Backend API | https://rms-backend-68030258.onrender.com |
| Health Check| https://rms-backend-68030258.onrender.com/api/health |

---

## 📋 Test Plan

<!-- ส่วนที่ 1: นักศึกษากรอก -->

### Test Scope
**In Scope:**
- [/] Authentication (Login/Logout, JWT)
- [/] Menu Management (CRUD + Role-based access)
- [/] Order Management (Open/Add Items/Confirm/Cancel)
- [ ] Payment Processing (Cash/Card/QR)
- [ ] Sales Reports

**Out of Scope:** 
- การเชื่อมต่อกับระบบ Payment Gateway ภายนอกจริง (Third-party Payment Integration)
- การเชื่อมต่ออุปกรณ์ฮาร์ดแวร์จริง เช่น เครื่องพิมพ์ใบเสร็จ (POS Receipt Printer)
- การทดสอบรองรับผู้ใช้งานพร้อมกันจำนวนมาก (Load & Stress Testing)

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
| Browser   | Google Chrome |
| OS        | Windows 11 |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|------------|---------|----------|
| Server Backend (Render Free Tier) เข้าสู่สถานะ Sleep/Spin down เมื่อไม่มีการใช้งานเกิน 15 นาที | เกิดอาการ Cold Start หน่วงเวลา 30-50 วินาทีในการเรียกใช้งานครั้งแรก พนักงานหรือลูกค้าอาจคิดว่าระบบค้าง | P1 |
| Session Token (JWT) หมดอายุระหว่างใช้งาน หรือพนักงานล็อกอินค้างไว้ | ระบบจะปฏิเสธคำสั่งซื้อทันที (401 Unauthorized) ทำให้พนักงานต้องล็อกอินใหม่ และต้องกดเลือกรายการอาหารซ้ำอีกครั้ง | P2 |
| การส่งข้อมูลออเดอร์ที่ไม่สมบูรณ์จากหน้าร้าน (เช่น ข้อมูลไม่ครบถ้วน หรือระบุเลขโต๊ะผิด) | ระบบปฏิเสธการสร้างคำสั่งซื้อ (400 Bad Request) ทำให้รายการอาหารส่งไม่ถึงห้องครัว | P2 |

---

## 🧪 Test Cases & Results

### Test Results Summary (11 Test Cases)

| Test ID | Category | Test Scenario | Method & Endpoint | Expected Status | Actual Status | Result |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **POS-01** | Positive | Login เข้าสู่ระบบด้วยข้อมูลถูกต้อง | `POST /api/auth/login` | 200 OK | 200 OK | **PASS** |
| **POS-02** | Positive | ดึงข้อมูลรายการอาหารทั้งหมด | `GET /api/menu` | 200 OK | 200 OK | **PASS** |
| **POS-03** | Positive | สร้างคำสั่งซื้อใหม่สำเร็จ | `POST /api/orders` | 201 Created | 201 Created | **PASS** |
| **NEG-01** | Negative | Login ด้วย Password ที่ไม่ถูกต้อง | `POST /api/auth/login` | 401 Unauthorized | 401 Unauthorized | **PASS** |
| **NEG-02** | Negative | สั่งซื้อโดยส่งรายการสินค้าว่างเปล่า (Empty Items) | `POST /api/orders` | 400 Bad Request | 400 Bad Request | **PASS** |
| **NEG-03** | Negative | ดึงข้อมูลเมนูอาหารที่ไม่มีอยู่จริง (ID: 999999) | `GET /api/menu/999999` | 404 Not Found | 404 Not Found | **PASS** |
| **SEC-01** | Security | เรียกใช้ Protected Route โดยไม่ส่ง Access Token | `GET /api/orders` | 401 Unauthorized | 401 Unauthorized | **PASS** |
| **SEC-02** | Security | เรียกใช้งานโดยส่ง Invalid / Expired Token | `GET /api/orders` | 401 Unauthorized | 401 Unauthorized | **PASS** |
| **SEC-03** | Security | ทดสอบโจมตีด้วย SQL Injection ช่องทาง Login | `POST /api/auth/login` | 401 Unauthorized | 401 Unauthorized | **PASS** |
| **EDG-01** | Edge Case | สั่งซื้อสินค้าด้วยจำนวนชิ้นติดลบ (Quantity: -5) | `POST /api/orders` | 400 Bad Request | 400 Bad Request | **PASS** |
| **EDG-02** | Edge Case | ส่ง Payload เมนูโดยตัด Field สำคัญ / ชนิดข้อมูลผิด | `POST /api/menu` | 400 Bad Request | 400 Bad Request | **PASS** |

### Vitest Results
```
Run: npm test
✓ Payment returns positive change when overpaid
✗ [BUG-001] Should NOT allow negative change  ← reveals bug!
...
```

### Newman Pass Rate
```
Total: 21  |  Passed: 21  |  Failed: 0  |  Pass Rate: 100%
```

### Test Case Table

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| POS-01 | Auth | Admin login success | 200 + JWT | 200 OK | Pass |
| POS-02 | Menu | Get all menu items | 200 OK | 200 OK | Pass |
| POS-03 | Order | Create order success | 201 Created | 201 Created | Pass |
| NEG-01 | Auth | Wrong password login | 401 | 401 Unauthorized | Pass |
| NEG-02 | Order | Create empty order | 400 | 400 Bad Request | Pass |
| NEG-03 | Menu | Get non-existent menu | 404 | 404 Not Found | Pass |
| SEC-01 | Security | Unauthorized request (No token) | 401 | 401 Unauthorized | Pass |
| SEC-02 | Security | Invalid token request | 401 | 401 Unauthorized | Pass |
| SEC-03 | Security | SQL Injection login attack | 401 | 401 Unauthorized | Pass |
| EDG-01 | Order | Negative quantity order | 400 | 400 Bad Request | Pass |
| EDG-02 | Menu | Invalid payload / missing field | 400 | 400 Bad Request | Pass |---

## 🐛 Bug Reports

> ** Status:** No Critical Bugs Found (ไม่พบบั๊กระดับวิกฤตจากการทดสอบด้วย Test Suite ทั้ง 11 เคส ระบบทำงานได้ถูกต้องตาม Scenarios ทั้งหมด)

## BUG-001: ไม่มีการ Validate จำนวนสินค้าติดลบในการสร้าง Order

**Severity:** High  
**Feature:** Order Management  
**Endpoint:** `POST /api/orders`  

* **Description:** เมื่อส่ง Payload สั่งซื้อสินค้าโดยระบุจำนวนติดลบ (`quantity: -5`) ในครั้งแรก ระบบยอมให้สร้างออเดอร์ได้
* **Steps to Reproduce:**
  1. Login เข้าสู่ระบบเพื่อรับ Access Token
  2. ยิง Request `POST /api/orders` โดยใส่ Body `{ "items": [{ "menuId": 1, "quantity": -5 }] }`
* **Expected Result:** ระบบต้องปฏิเสธและตอบกลับด้วย HTTP `400 Bad Request`
* **Actual Result:** ระบบตอบกลับด้วย HTTP `201 Created` (ในเวอร์ชันตั้งต้น)
* **Status:** `Resolved` (แก้ไขแล้วโดยเพิ่ม Input Validation เช็ค `quantity > 0` ใน Backend Controller)
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
