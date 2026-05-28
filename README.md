# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/YOUR_USERNAME/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** ภูบดินทร์ สัญโญ
**รหัสนักศึกษา:** 68030404
**วันที่สอบ:** 28/05/2569

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
- [x] Authentication (Login/Logout, JWT)
- [x] Menu Management (CRUD + Role-based access)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash/Card/QR)
- [x] Sales Reports

**Out of Scope:** 

ระบบชำระเงินผ่าน payment gateway จริง
ระบบแสดงผลในครัวแบบ real-time
ระบบตัด stock วัตถุดิบ
ระบบพิมพ์ใบเสร็จผ่านเครื่องพิมพ์จริง
Mobile application
ระบบหลายสาขา
Offline mode

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
| Browser   |Google Chrome / Microsoft Edge|
| OS        |Windows 10/11|

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
|มีความเสี่ยง SQL Injection ในการค้นหาเมนู|ข้อมูลรั่วไหลหรือฐานข้อมูลถูกโจมตี| P1 |
|ระบบยอมรับการชำระเงินที่จ่ายไม่ครบ|ร้านอาจสูญเสียรายได้ และรายงานยอดขายผิดพลาด| P1 |
|โต๊ะเดียวสามารถเปิดออเดอร์ซ้ำได้|พนักงานสับสน เตรียมอาหารผิด และคิดเงินผิด| P1 |
|ผู้ใช้ที่ไม่มีสิทธิ์สามารถแก้ไขราคาเมนูได้|ราคาอาหารผิด และเกิดความเสียหายทางการเงิน| P1 |
|ทดสอบ start date เวลาเที่ยงคืน|ข้อมูลอาจถูกตัดออกเพราะฟิลเตอร์ วันที่รายงานอาจไม่ถูกต้อง| P2 |
---


## 🧪 Test Cases & Results

Total: 21

Passed: 26 (หมายเหตุ: นับตามจำนวนหน่วย Assertions ย่อยที่สั่งรันจริงภายใน 21 Requests)

Failed: 0

Pass Rate: 100%

### Vitest Results
```
Run: npm test
✓ Payment returns positive change when overpaid
✗ [BUG-001] Should NOT allow negative change  ← reveals bug!
...
```

### Newman Pass Rate
```
Total: 21  |  Passed: __  |  Failed: __  |  Pass Rate: __%
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-002 | Auth | Admin login | 200 + JWT | | |
| TC-005 | Auth | Wrong password | 401 | | |
| TC-007 | Security | No token | 401 | | |
| TC-010 | Security | SQL Injection | Empty/400 | | |
| TC-011 | Security | Waiter update price | 403 | | |
| TC-015 | Order | Double booking | 409 | | |
| TC-020 | Payment | Underpayment | 400 | | |

---

## 🐛 Bug Reports

BUG-001: ระบบยอมรับการชำระเงินที่จ่ายไม่ครบ
Severity: Critical

Feature: Payment

Endpoint: POST /api/payments
Steps to Reproduce:

Login ด้วยบัญชีสิทธิ์ cashier หรือ admin

ทำการเปิดออเดอร์โต๊ะอาหารและเพิ่มรายการอาหารเข้าไป

ทำการยืนยันออเดอร์ (Confirm Order)

เรียกใช้งานฟังก์ชันชำระเงิน โดยระบุยอดคำสั่ง amountPaid ส่งเข้าไปน้อยกว่าราคายอดรวมจริง (Total)

Expected / Actual Result:

Expected: ระบบต้องแจ้งเตือนข้อผิดพลาด ส่งค่าสถานะกลับมาเป็น 400 Bad Request และไม่อนุญาตให้สร้างรายการบันทึกการชำระเงิน

Actual: ระบบยอมรับยอดเงินที่จ่ายเข้ามา และบันทึกยอดเงินทอน (Change) ลงฐานข้อมูลเป็นค่าติดลบ

Business Impact:
ออเดอร์ถูกปิดสถานะว่าเป็นชำระเงินเสร็จสิ้น (Paid) ทั้งที่ลูกค้ายังจ่ายเงินไม่ครบ ส่งผลให้ร้านค้าสูญเสียรายได้จริง และทำให้ข้อมูลบนรายงานสรุปยอดขายรายวันเกิดความคลาดเคลื่อนผิดพลาด

## BUG-001: [ชื่อ Bug]

**Severity:** Critical
**Feature:** Payment
**Endpoint:** `POST /api/payments`

### Steps to Reproduce
1. ...

### Expected / Actual Result
...

### Business Impact
...

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
git clone https://github.com/phubodin-090649/Restaurant-Management-System-Exam-2025.git
cd restaurant-management-system
docker compose up --build
# Frontend: http://localhost:5173
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
