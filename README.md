# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/YOUR_USERNAME/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** นายวัฒนพงศ์ พรหมภิราม
**รหัสนักศึกษา:** 68030265
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
| Browser   | _กรอก_ |
| OS        | _กรอก_ |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment (ชำระเงิน)      | ร้านไม่สามารถรับเงินได้ ลูกค้ารอนาน เสียรายได้โดยตรง | Critical |
| 2 | Order (รับออเดอร์)      | ออเดอร์ไม่ถึงครัว อาหารไม่ถูกจัดเตรียม ลูกค้าไม่พอใจ | High |
|3	Menu Management	ข้อมูลราคาผิดพลาดหรือสินค้าหมดแต่ยังสั่งได้ ทำให้ขาดทุนหรือบริการสะดุด	High
4	Sales Reports	รายงานยอดขายไม่ตรงกับความเป็นจริง ส่งผลต่อการวางแผนสต็อกและบัญชีผิดพลาด	Medium
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
Total: 21  |  Passed: 69  |  Failed: 17  |  Pass Rate: 73.56%
```

### Test Case Table

| TC-ID   | Type     | Feature  | Scenario                        | Input                                             | Expected Result          | Actual Result | Pass/Fail |
|---------|----------|----------|---------------------------------|---------------------------------------------------|--------------------------|---------------|-----------|
| TC-001  | Positive | Auth     | Login ด้วย credential ถูกต้อง  | `{username: "admin", password: "Admin@123"}`      | HTTP 200 + JWT Token     | สามารถเข้าและใช้งานได้ | pass        |
| TC-002  | Positive | Menu     | เพิ่มเมนูใหม่สำเร็จ            | `{name: "ข้าวผัด", price: 60, stock: 100}`        | HTTP 201 + menu object   | -7ho 201 + ข้อมูลที่จะเพิ่ม | pass        |
| TC-003  | Positive | Payment  | ชำระเงินและรับเงินทอนถูกต้อง   | `{orderId: 1, amount: 200}`                       | HTTP 200 + change = X    |รับและชำระเงินถูกต้อง | pass        |
| TC-004  | Negative | Auth     | Login ด้วย password ผิด        | `{username: "admin", password: "wrong"}`          | HTTP 401 Unauthorized    |ไม่สามารถเข้าใช้งานได้ | pass      |
| TC-005  | Negative | Order    | เพิ่มสินค้าที่หมดสต็อก         | `{menuId: 99, quantity: 999}`                     | HTTP 400 + error message | ดูจำนวนสินค้าไม่ได้ | fail        |
| TC-006  | Negative | Payment  | ชำระเงินน้อยกว่ายอดรวม        | `{orderId: 1, amount: 10}`                        | HTTP 400 Insufficient    |ยอดเงินติดลบ | pass        |
| TC-007  | Security | Auth     | เรียก API โดยไม่มี JWT Token   | GET /api/orders (no header)                       | HTTP 401 Unauthorized    | ขี้นว่า 401 Unauthorized แล้วและมีข้อความขึ้นว่า "error": "Access token required" | pass        |
| TC-008  | Security | Order    | Cashier เข้าถึง Admin endpoint | Token ของ Cashier + DELETE /api/menu/1            | HTTP 403 Forbidden       | หน้าเว็บขึ้น 403 Forbidden และมีข้อความขึ้นว่า "error": "Insufficient permission"  | pass        |
| TC-009  | Security | Auth     | SQL Injection ใน Login field   | `{username: "' OR 1=1 --", password: "x"}`        | HTTP 401 (ไม่ผ่าน Login) | หน้าเว็บขึ้น 401 Unauthorizedและมีข้อความ error": "Invalid credentials | pass        |
| TC-010  | Edge     | Order    | ออเดอร์ที่ไม่มีสินค้า (0 ชิ้น) | `{tableId: 1, items: []}`                         | HTTP 400 + error message | 400 Bad Request + "error": "tabeld required" | pass        |
| TC-011  | Edge     | Payment  | ชำระเงินพอดียอด (change = 0)   | `{orderId: 1, amount: exactTotal}`                | HTTP 200 + change = 0    | เงินทอนถูกต้อง | pass        |

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

### BUG-001: [ข้อมูลยังแสดงผลอยู่ทั้งที่ JWT Token หมดอายุไปแล้ว]

**Severity:**  Medium  
**Priority:** P2
**Feature:** Development Server (Build Tools) 
**Status:** Open

#### Steps to Reproduce
1. ใช้ Command Line เข้าไปที่โฟลเดอร์ frontend
2. รันคำสั่ง npm audit --audit-level=moderate
3. ตรวจสอบรายงานในส่วนของแพ็กเกจ esbuild

#### Expected Result
> แพ็กเกจ esbuild ควรเป็นเวอร์ชันที่ปลอดภัย และไม่ยอมให้เว็บไซต์ภายนอกส่งคำขอเข้ามาอ่านข้อมูลใน Development Server ได้

#### Actual Result
> พบช่องโหว่ใน esbuild <=0.24.2 ซึ่งยินยอมให้เว็บไซต์ใดๆ ส่งคำขอ (Requests) มายังเครื่องเซิร์ฟเวอร์ที่ใช้พัฒนา และสามารถอ่านข้อมูลการตอบกลับ (Response) ได้

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> `![BUG-001 Screenshot](./tests/reports/bug-001.png)`

#### Business Impact
> ข้อมูลซอร์สโค้ดหรือข้อมูลจำลองในระหว่างการพัฒนาอาจรั่วไหลไปยังเว็บไซต์ไม่พึงประสงค์ได้ หากผู้พัฒนาเปิดหน้าเว็บอื่นทิ้งไว้ในขณะที่รันโปรเจกต์

### BUG-002: [ชื่อ Bug สั้น ๆ]

**Severity:** Medium
**Priority:** P2
**Feature:** Frontend Framework Tooling (Vite)
**Status:** Open

#### Steps to Reproduce
1. รันคำสั่ง npm audit ในโปรเจกต์
2. ตรวจสอบความเชื่อมโยง (Dependency Tree) ของแพ็กเกจ vite

#### Expected Result
> แพ็กเกจ vite ซึ่งเป็นเครื่องมือหลักในการรัน Frontend ควรจะใช้ส่วนประกอบที่ปลอดภัยทั้งหมด

#### Actual Result
> แพ็กเกจ vite <=6.4.1 มีการเรียกใช้งาน (Depends on) esbuild เวอร์ชันที่มีช่องโหว่ ทำให้ตัว vite เองได้รับผลกระทบด้านความปลอดภัยไปด้วยโดยปริยาย

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> `![BUG-002 Screenshot](./tests/reports/bug-002.png)`

#### Business Impact
> เนื่องจาก vite คือเครื่องมือหลักที่ใช้รันระบบร้านอาหารในฝั่ง Frontend หากตัวเครื่องมือมีช่องโหว่ อาจทำให้สภาพแวดล้อมการทำงานทั้งหมดไม่ปลอดภัย และเสี่ยงต่อการถูกโจมตีผ่านเบราว์เซอร์


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
