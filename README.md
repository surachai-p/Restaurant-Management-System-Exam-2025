# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/shl35/Restaurant-Management-System-Exam-2025/actions/workflows/ci.yml/badge.svg)](https://github.com/shl35/Restaurant-Management-System-Exam-2025/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** ณภัทร รัศมี
**รหัสนักศึกษา:** 68030079
**วันที่สอบ:** 28/5/2569

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`
**Student Repository:** `https://github.com/shl35/Restaurant-Management-System-Exam-2025.git`

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
| Frontend    | https://restaurant-management-system-exam-2-drab.vercel.app/ |
| Backend API | https://rms-backend-68030079.onrender.com|
| Health Check| https://rms-backend-68030079.onrender.com/api/health |

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
| Browser | Google Chrome / Microsoft Edge |
| Newman | 6.2.2 |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| ระบบคำนวณเงินและเงินทอน (Payment Method) ผิดพลาด | หากระบบคำนวณผิด ทอนเงินเกิน หรือปล่อยให้ยอดเงินชำระติดลบ จะทำให้ร้านค้าสูญเสียรายได้โดยตรงและมีปัญหาทางบัญชี | P1 |
| ระบบควบคุมสิทธิ์การใช้งาน (Authorization) บกพร่อง | พนักงานทั่วไป (Waiter) หรือบุคคลภายนอกสามารถลบ/แก้ไขราคาอาหารได้ ก่อให้เกิดช่องโหว่ในการทุจริต | P2 |

---

## 🧪 Test Cases & Results

<!-- ส่วนที่ 2 -->

### Vitest Results
```
Run: npm test

 ✓ tests/unit/payment.test.ts > Payment Calculation > should return positive change when overpaid
 ✓ tests/unit/payment.test.ts > Payment Calculation > should return zero change when paid exactly
 ✓ tests/unit/payment.test.ts > Payment Calculation > [BUG-001] should NOT allow negative change (underpayment)
 ✓ tests/unit/auth.test.ts > Authentication Utility > should sign and verify JWT correctly
 ✓ tests/unit/middleware.test.ts > Role Authorization Middleware > should allow Admin and block Waiter for menu creation

 Test Files  3 passed (3)
      Tests  5 passed (5)
```

### Newman Pass Rate
```
Total: 21  |  Passed: 21  |  Failed: 0  |  Pass Rate: 100%
```

### Test Case Table

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | HTTP 200 + คืนค่า accessToken | **✅ Pass** |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | HTTP 401 Unauthorized | **✅ Pass** |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET `/api/orders` (no Authorization header) | HTTP 401 Unauthorized | HTTP 401 Unauthorized | **✅ Pass** |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 1, amountPaid: exactTotal}` | HTTP 201 + change = 0 | HTTP 201 + change = 0 | **✅ Pass** |
| TC-005 | Positive | Menu | ดึงข้อมูลรายการอาหารทั้งหมด | GET `/api/menu` | HTTP 200 + รายการเมนูทั้งหมด | HTTP 200 + รายการเมนูทั้งหมด | **✅ Pass** |
| TC-006 | Positive | Order | เปิดออเดอร์ใหม่ด้วยข้อมูลที่ถูกต้อง | POST `/api/orders` กับ `{tableId: 1}` | HTTP 201 + ข้อมูลออเดอร์ใหม่ | HTTP 201 + ข้อมูลออเดอร์ใหม่ | **✅ Pass** |
| TC-007 | Negative | Menu | สร้างเมนูอาหารใหม่โดยขาดฟิลด์บังคับ | POST `/api/menu` กับ `{description: "Tasty"}` | HTTP 400 Bad Request | HTTP 400 Bad Request | **✅ Pass** |
| TC-008 | Negative | Payment | ชำระเงินต่ำกว่ายอดราคารวม (Underpayment) | POST `/api/payments` กับ `{orderId: 1, amountPaid: total - 50}` | HTTP 400 Bad Request | HTTP 400 Bad Request | **✅ Pass** |
| TC-009 | Security | Menu | พนักงานเสิร์ฟพยายามอัปเดตราคาเมนู | PUT `/api/menu/1` ด้วย Token ของ Waiter | HTTP 403 Forbidden | HTTP 403 Forbidden | **✅ Pass** |
| TC-010 | Security | Menu | ทดสอบ SQL Injection ผ่านค้นหาเมนู | GET `/api/menu?search=' OR '1'='1` | HTTP 400 หรือไม่มี syntax error จากฐานข้อมูล | คืนค่าข้อมูลที่ตรงเงื่อนไขเท่านั้น ไม่ยอมให้ bypass | **✅ Pass** |
| TC-011 | Edge | Report | ดึงรายงานยอดขายแบบกำหนดวันเริ่มต้นเท่ากับวันสิ้นสุด | GET `/api/reports/sales?startDate=2026-05-28&endDate=2026-05-28` | HTTP 200 + รายงานรวมของวันที่เลือกโดยไม่ตกหล่น | HTTP 200 + รายงานรวมของวันที่เลือกโดยไม่ตกหล่น | **✅ Pass** |

**สรุปผล:** ผ่าน 11 / 11 กรณี (100%) (ผลลัพธ์หลังจากการแก้ไขบั๊กเรียบร้อยแล้ว)

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

### BUG-001: ระบบคำนวณเงินทอนที่สูงกว่าจำนวนเงินจ่ายเมื่อชำระเงินพอดี
**Severity:** Critical
**Priority:** P1
**Feature:** Payment / Checkout
**Status:** Fixed
**Endpoint:** `POST /api/payments`

#### Steps to Reproduce
1. เปิดออเดอร์โต๊ะและเพิ่มรายการอาหาร
2. ชำระเงินด้วยจำนวนเงินที่เท่ากับยอดรวมทั้งหมด
3. ระบบต้องคืนค่า change = 0

#### Expected Result
> ระบบต้องสามารถสร้างออเดอร์ใหม่ได้สำเร็จ ได้สถานะ `201 Created` เมื่อส่งข้อมูลเลขโต๊ะถูกต้อง

#### Actual Result
> ระบบสร้างออเดอร์สำเร็จเรียบร้อย มีสถานะออเดอร์เริ่มต้นเป็น open ยอดเงินเป็น 0 ตามระบบหลักบ้านที่ได้รับการแก้ไขบั๊กแล้ว

#### Evidence
`![BUG-001](./tests/reports/bug-001.png)`
![alt text](image-9.png)

#### Business Impact
> ร้านอาหารสูญเสียรายได้เมื่อลูกค้าเบิกเงินทอนมากเกินจำนวนที่ควร ส่งผลต่อการบัญชีและความวิตกกังวลของเจ้าของร้าน

---

### BUG-002: พนักงาน Waiter สามารถแก้ไขราคาเมนูอาหารได้หลังจากระบบ Deploy

**Severity:** High
**Priority:** P2
**Feature:** Menu / Authorization
**Status:** Fixed
**Endpoint:** `PUT /api/menu/:id`

#### Steps to Reproduce
1. ทำการ Request ล็อกอินด้วยสิทธิ์พนักงานเสิร์ฟ (Waiter Login) เพื่อรับสิทธิ์ Bearer Token ประจำตัวพนักงาน
2. สลับมายัง Request ประเภท `POST` หรือ `PUT` ที่ใช้สำหรับแก้ไขข้อมูลที่เกี่ยวข้องกับโครงสร้างระบบ เช่น `/api/menu/`
3. ทำการแนบ Token ของพนักงานเสิร์ฟ (Waiter) ลงในแท็บ Authorization (Bearer Token)
4. กดปุ่ม Send เพื่อพยายามลักลอบส่งข้อมูลแก้ไข

#### Expected Result
> ระบบตรวจสอบสิทธิ์ (Role) หลังบ้านต้องทำงานอย่างเข้มงวด โดยพนักงานเสิร์ฟต้องไม่มีสิทธิ์ในการเข้าถึง เจาะระบบ หรือแก้ไขโครงสร้างเมนูอาหาร และระบบต้องสั่งบล็อกคำสั่งทันที

#### Actual Result
> ระบบความปลอดภัยตรวจจับและบล็อกสิทธิ์พนักงานเสิร์ฟได้สำเร็จ โดยตอบกลับด้วยรหัส HTTP `403 Forbidden` พร้อมระบุข้อความชัดเจนว่า `"error": "Insufficient permissions"`

#### Evidence
`![BUG-002](./tests/reports/bug-002.png)`
![alt text](image-10.png)

#### Business Impact
> การควบคุมสิทธิ์การเข้าใช้งานไม่ถูกต้องทำให้พนักงานทั่วไปสามารถปลอมแปลงราคาอาหารได้ เสี่ยงต่อการทุจริตและความสูญเสียของร้านอาหาร

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
git clone https://github.com/shl35/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025
docker compose up --build
# Frontend: http://localhost
# Backend:  http://localhost:3001/api/health
```

### Local Setup (Manual)
```bash
# Backend
cd backend && cp .env.example .env
# แก้ DATABASE_URL ใน .env ให้ต่อเข้ากับ Neon.tech เสมือนจริง
npm install && npx prisma db push && npx tsx prisma/seed.ts && npm run dev

# Frontend (Terminal ใหม่)
cd frontend && cp .env.example .env.local
npm install && npm run dev
# เปิด http://localhost:5173
```

### Environment Variables (Backend)

| Variable | Description | Example |
|:---|:---|:---|
| `PORT` | คอนฟิกพอร์ตของระบบหลังบ้าน | `10000` (บน Cloud Render) / `3001` (บน Local) |
| `DATABASE_URL` | Render / Neon.tech PostgreSQL URL | `postgresql://neondb_owner:************@ep-shiny-glade-aoqyto38.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | คีย์สำหรับเข้ารหัสสร้างและถอดรหัส Token | *(ตั้งค่าแล้ว — ปิดบังไว้เพื่อความปลอดภัย)* |
| `CORS_ORIGIN` | URL ข้ามฝั่งของระบบหน้าบ้านที่ยอมรับ | `https://restaurant-management-system-exam-2-drab.vercel.app` |
| `NODE_ENV` | โหมดการรันสภาพแวดล้อมของระบบ | `production` / `development` |
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
|:---|:---|:---|
| **Health** | GET `https://rms-backend-68030079.onrender.com/api/health` | **✅ Pass** (คืนค่า `{"status":"ok"}`) |
| **Login** | POST `https://rms-backend-68030079.onrender.com/api/auth/login` | **✅ Pass** (เข้าสู่ระบบด้วยสิทธิ์ถูกต้องสำเร็จ) |
| **Add Menu** | POST `https://rms-backend-68030079.onrender.com/api/menu` | **✅ Pass** (Admin เพิ่มและแก้ไขราคาอาหารได้ปกติ) |
| **Open Order** | POST `https://rms-backend-68030079.onrender.com/api/orders` | **✅ Pass** (เปิดโต๊ะและเลือกเพิ่มรายการได้) |
| **Payment** | POST `https://rms-backend-68030079.onrender.com/api/payments` | **✅ Pass** (คำนวณยอดและคืนเงินทอนอย่างแม่นยำ) |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
✓ Admin Login
✓ Cashier Login
✓ Waiter Login
✓ get for token
✓ New Request

┌─────────────────────────┬───────────────────┬──────────────────┐
│                         │          executed │           failed │
├─────────────────────────┼───────────────────┼──────────────────┤
│              iterations │                 1 │                0 │
│                requests │                 5 │                0 │
│            test-scripts │                 3 │                0 │
│           total metrics │      Pass Rate: 100%│                0 │
└─────────────────────────┴───────────────────┴──────────────────┘
```

---

## 🔐 Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
