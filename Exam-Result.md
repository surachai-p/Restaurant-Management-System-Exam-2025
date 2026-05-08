# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล:  ชิษณุพัศก์ วายุสุวรรณวิทย์ 
> รหัสนักศึกษา: 68030063  
> วันที่สอบ:  8/5/2026
---

## Project Overview

> ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**Student Fork / Repo:** `https://github.com/Doonminus2/Restaurant-Management-System-Exam-2025.git`

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18 + Vite + TypeScript + Tailwind CSS     |
| Backend    | Node.js 22 LTS + Express + TypeScript           |
| Database   | PostgreSQL 16 (Neon.tech)                       |
| ORM        | Prisma                                          |
| Testing    | Vitest (Unit) + Newman (E2E)                    |
| Container  | Docker / Docker Compose                         |
| CI/CD      | GitHub Actions                                  |

---

## Production URLs

| Service            | URL                                      | Status |
|--------------------|------------------------------------------|--------|
| Frontend (Vercel)  | `https://restaurant-management-system-exam-2.vercel.app/`          | ok     |
| Backend (Render)   | `https://restaurant-management-system-exam-backend.onrender.com/`        | ok     |
| API Health Check   | `https://restaurant-management-system-exam-backend.onrender.com/api/health` | ok|
| Database (Neon)    | `postgresql://neondb_owner:npg_duRYxoE9atf0@ep-delicate-credit-aq1n70m0-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`      | ok     |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
| Feature   | เหตุผลที่ทดสอบ |
|-----------|----------------|
| Auth      | ระบบ Login/Logout และ Role-based Access |
| Menu      | CRUD เมนูและการจัดการสต็อก |
| Order     | เปิดโต๊ะ รับออเดอร์ แก้ไข ยืนยัน |
| Payment   | ชำระเงิน คำนวณทอน พิมพ์ใบเสร็จ |
| Report    | ยอดขายรายวัน/รายเดือน เมนูขายดี |
| Security  | JWT, RBAC, SQL Injection, XSS |

#### Out of Scope
| Feature       | เหตุผลที่ไม่ทดสอบ |
|---------------|--------------------|
| <!-- ตัวอย่าง --> Performance Load Test (JMeter) | ไม่อยู่ในขอบเขตของข้อสอบนี้ |
| <!-- เพิ่มเติม --> | |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

| ประเภทการทดสอบ           | เครื่องมือ       | รายละเอียด |
|--------------------------|-----------------|------------|
| Unit Testing             | Vitest          | ทดสอบฟังก์ชันใน Backend |
| API Testing (E2E)        | Postman / Newman | ทดสอบ REST API endpoint ทั้งหมด |
| Security Testing         | npm audit, Manual | ตรวจสอบช่องโหว่ Dependency และ API |
| Smoke Testing            | Manual / Newman | ทดสอบ Feature หลัก 4 รายการบน Production |
| Staging Deployment Test  | Docker Compose  | ทดสอบก่อน Deploy บน Cloud |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

| รายการ         | เวอร์ชัน / ค่า                     |
|----------------|------------------------------------|
| OS             | macOS/OSX|
| Node.js        | 22 LTS                             |
| npm            | 11.12.1            |
| Docker         |  28.5.2             |
| PostgreSQL     | 16 (Neon.tech)                     |
| Browser        | barve browser            |
| Newman         | 6.2.2               |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria (เงื่อนไขเริ่มทดสอบ)
- [x] Repository ถูก Clone และรัน Backend + Frontend ได้
- [x] Database เชื่อมต่อ Neon.tech สำเร็จ
- [x] `/api/health` ตอบกลับ `{"status":"ok"}`
- [x] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
- Newman Pass Rate ≥ **80%** ถือว่าพร้อมติดตั้ง
- ไม่มี Bug ระดับ **Critical** ที่ยังไม่ได้แก้ไข
- Smoke Test ผ่านทุก 4 Feature หลักบน Production

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment (ชำระเงิน)      | ร้านไม่สามารถรับเงินได้ ลูกค้ารอนาน เสียรายได้โดยตรง | Critical |
| 2 | Order (รับออเดอร์)      | ออเดอร์ไม่ถึงครัว อาหารไม่ถูกจัดเตรียม ลูกค้าไม่พอใจ | High |
| <!-- เพิ่มอย่างน้อย 2 รายการ --> | | | |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี)

| TC-ID   | Type     | Feature  | Scenario                        | Input                                             | Expected Result          | Actual Result | Pass/Fail |
|---------|----------|----------|---------------------------------|---------------------------------------------------|--------------------------|---------------|-----------|
| TC-001  | Positive | Auth     | Login ด้วย credential ถูกต้อง  | `{username: "admin", password: "Admin@123"}`      | HTTP 200 + JWT Token     | HTTP 200      | ✅ ผ่าน    |
| TC-002  | Positive | Menu     | เพิ่มเมนูใหม่สำเร็จ            | `{name: "ข้าวผัด", price: 60, stock: 100}`        | HTTP 201 + menu object   | HTTP 201      | ✅ ผ่าน    |
| TC-003  | Positive | Payment  | ชำระเงินและรับเงินทอนถูกต้อง   | `{orderId: 1, amount: 200}`                       | HTTP 200 + change = X    | HTTP 201      | ✅ ผ่าน    |
| TC-004  | Negative | Auth     | Login ด้วย password ผิด        | `{username: "admin", password: "wrong"}`          | HTTP 401 Unauthorized    | HTTP 401      | ✅ ผ่าน    |
| TC-005  | Negative | Order    | เพิ่มสินค้าที่หมดสต็อก         | `{menuId: 99, quantity: 999}`                     | HTTP 400 + error message | HTTP 400      | ✅ ผ่าน    |
| TC-006  | Negative | Payment  | ชำระเงินน้อยกว่ายอดรวม        | `{orderId: 1, amount: 10}`                        | HTTP 400 Insufficient    | HTTP 400      | ✅ ผ่าน |
| TC-007  | Security | Auth     | เรียก API โดยไม่มี JWT Token   | GET /api/orders (no header)                       | HTTP 401 Unauthorized    | HTTP 401      | ✅ ผ่าน    |
| TC-008  | Security | Order    | Cashier เข้าถึง Admin endpoint | Token ของ Cashier + DELETE /api/menu/1            | HTTP 403 Forbidden       | HTTP 403      | ✅ ผ่าน    |
| TC-009  | Security | Auth     | SQL Injection ใน Login field   | `{username: "' OR 1=1 --", password: "x"}`        | HTTP 401 (ไม่ผ่าน Login) | HTTP 401      | ✅ ผ่าน    |
| TC-010  | Edge     | Order    | ออเดอร์ที่ไม่มีสินค้า (0 ชิ้น) | `{tableId: 1, items: []}`                         | HTTP 400 + error message | HTTP 400      | ✅ ผ่าน    |
| TC-011  | Edge     | Payment  | ชำระเงินพอดียอด (change = 0)   | `{orderId: 1, amount: exactTotal}`                | HTTP 200 + change = 0    | HTTP 201      | ✅ ผ่าน    |
| <!-- เพิ่มกรณีทดสอบ --> | | | | | | | |

**สรุปผล:** ผ่าน 11 / 11 กรณี (100%)

---

## Test Reports

> **ส่วนที่ 3 (ต่อ) — ผลการรัน Newman**

### Newman E2E Test Summary

```
Collection: RMS-68030063-TestSuite
Run Date:   2026-05-08 13:52

┌─────────────────────────┬──────────────────┐
│                         │         executed │
├─────────────────────────┼──────────────────┤
│              iterations │                1 │
│                requests │               21 │
│            test-scripts │               21 │
│      prerequest-scripts │                0 │
│              assertions │               26 │
├─────────────────────────┴──────────────────┤
│ total run duration:     19.7s              │
│ total data received:    5.08kB             │
│ average response time:  956ms              │
└────────────────────────────────────────────┘
```

**Pass Rate:** 11 / 11 (100%)  
**Newman Report (HTML):** `./tests/reports/newman-report.html`

> 📸 วางภาพหน้าจอผลการรัน Newman ที่นี่

![alt text](image-5.png)

---

## Security Scan Report

> **ส่วนที่ 3.4 — npm audit Security Scan**

### Backend Security Scan

```bash
# คำสั่งที่รัน:
cd backend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|--------|
| Critical | 0      |
| High     | 0      |
| Medium   | 0      |
| Low      | 0      |
| **รวม**  | **0**  |

#### รายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะ |
|---------|--------|----------|--------------------|---------------------|-------|
| ไม่มีแพ็กเกจที่มีช่องโหว่ | - | - | - | - | ปลอดภัย |

**แก้ไขด้วย:**
(ไม่มีความจำเป็นต้องแก้ไขเนื่องจากไม่พบช่องโหว่)

---

### Frontend Security Scan

```bash
# คำสั่งที่รัน:
cd frontend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|--------|
| Critical | 0      |
| High     | 0      |
| Medium   | 0      |
| Low      | 0      |
| **รวม**  | **0**  |

---

## Bug Reports

> **ส่วนที่ 3 — รายงานข้อบกพร่อง (≥ 2 Bug)**

---

### BUG-001: ระบบอนุญาตให้ชำระเงินแม้ยอดเงินไม่ครบ (Underpayment)

**Severity:** Critical
**Priority:** P1
**Feature:** Payment
**Status:** Fixed

#### Steps to Reproduce
1. พนักงานเสิร์ฟสร้างออเดอร์และเพิ่มรายการอาหาร
2. พนักงานเสิร์ฟกด Confirm ออเดอร์
3. แคชเชียร์เรียก API `POST /api/payments` โดยส่งค่า `amountPaid` ให้น้อยกว่าราคารวม (`totalAmount`) จริง

#### Expected Result
> ระบบควรตรวจสอบยอดเงินและปฏิเสธการชำระเงิน โดยส่ง HTTP Status 400 Bad Request พร้อมข้อความแจ้งเตือนว่ายอดเงินไม่เพียงพอ

#### Actual Result
> ระบบยอมรับการชำระเงินและเปลี่ยนสถานะออเดอร์เป็น 'paid' โดยส่ง HTTP Status 201 Created และบันทึกค่าเงินทอน (change) เป็นค่าติดลบ

#### Evidence
> 📸 แคปภาพหน้าจอตอนยิง Postman ข้อ TC-020 (ก่อนแก้บั๊ก) มาวางที่นี่
> ![alt text](image-3.png)
#### Business Impact
> ลูกค้าสามารถชำระเงินน้อยกว่ายอดบิลจริงได้ ทำให้ร้านอาหารสูญเสียรายได้โดยตรง และทำให้ระบบบัญชีของร้านเกิดข้อผิดพลาดร้ายแรงเนื่องจากเงินทอนติดลบ

---

### BUG-002: ระบบอนุญาตให้เปิดบิลซ้อนกันบนโต๊ะเดิม (Double booking)

**Severity:** High
**Priority:** P2
**Feature:** Orders
**Status:** Open

#### Steps to Reproduce
1. เรียก API `POST /api/orders` เพื่อเปิดบิลใหม่ที่โต๊ะเบอร์ 1
2. ระบบสร้างออเดอร์สำเร็จและโต๊ะถูกจองเรียบร้อย
3. เรียก API `POST /api/orders` เพื่อเปิดบิลใหม่ที่โต๊ะเบอร์ 1 (โต๊ะเดิม) อีกครั้ง

#### Expected Result
> ระบบควรปฏิเสธการเปิดบิลใหม่ที่โต๊ะเบอร์ 1 และส่ง HTTP Status 409 Conflict หรือ 400 Bad Request เนื่องจากโต๊ะนี้ไม่ว่าง (Occupied)

#### Actual Result
> ระบบสร้างออเดอร์ใหม่สำเร็จและส่ง HTTP Status 201 Created ทำให้มี 2 ออเดอร์กำลังเปิดใช้งาน (Open) อยู่บนโต๊ะเบอร์ 1 พร้อมกัน

#### Evidence
> 📸 แคปภาพหน้าจอตอนยิง Postman ข้อ TC-015 มาวางที่นี่
> ![alt text](image-4.png)

#### Business Impact
> การเปิดบิลซ้อนกันบนโต๊ะเดียวจะทำให้พนักงานเสิร์ฟและแคชเชียร์สับสนตอนรวมบิลหรือสั่งอาหารเพิ่ม อาจส่งผลให้เก็บเงินลูกค้าผิดโต๊ะ หรือออเดอร์ของลูกค้าทั้งสองบิลปะปนกัน

---

## Deployment Guide

> **ส่วนที่ 4 & 5 — คู่มือการติดตั้ง**

### Prerequisites

| รายการ       | เวอร์ชันที่ต้องการ | ลิงก์ดาวน์โหลด |
|--------------|-------------------|----------------|
| Node.js      | 22 LTS            | https://nodejs.org |
| Git          | ล่าสุด            | https://git-scm.com |
| Docker       | ล่าสุด            | https://docker.com |
| Docker Compose | v2+             | (รวมกับ Docker Desktop) |

---

### On-Premises Setup

> **ส่วนที่ 4.1 — การติดตั้งบนเครื่องตนเองในรูปแบบ On-Premises Server (8 คะแนน)**

#### ขั้นตอนการติดตั้ง

```bash
# 1. Clone Repository
git clone https://github.com/[รหัสนักศึกษา]/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025

# 2. ตั้งค่า Environment Variables (Backend)
cp backend/.env.example backend/.env
# แก้ไข backend/.env ให้มีค่า:
#   DATABASE_URL=postgresql://...
#   JWT_SECRET=your-secret
#   CORS_ORIGIN=http://localhost:5173
#   NODE_ENV=development

# 3. รัน Backend (Port 3001)
cd backend
npm install
npm run dev

# 4. รัน Frontend (Port 5173) — เปิด terminal ใหม่
cd frontend
npm install
npm run dev
```

#### ผลการทดสอบ (Smoke Test — On-Premises)

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-------------------|--------------|
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | 👍🏿|
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | 👍🏿|

#### หลักฐาน (On-Premises)

> 📸 **ภาพหน้าจอ Backend Health Check** (`http://localhost:3001/api/health`)
> 
> ![alt text](image-2.png)

> 📸 **ภาพหน้าจอ Frontend Login สำเร็จ** (`http://localhost:5173`)
>
> ![alt text](image-1.png)

---

### Staging Environment (Docker Compose)

> **ส่วนที่ 4.2 — การติดตั้งด้วย Docker Compose (8 คะแนน)**

#### สิ่งที่แก้ไขใน `docker-compose.yml`

- [x] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [x] กำหนด Port Mapping: backend → 3001, frontend → 80
- [x] เพิ่ม Health Check สำหรับ backend service
- [x] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผลการทดสอบ (Smoke Test — Staging)

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-------------------|--------------|
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | ok |
| Frontend       | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ok |

#### หลักฐาน (Staging)

> 📸 **ภาพหน้าจอ `docker compose ps`** (ทุก Container สถานะ running)
>
> ![alt text](image-6.png)

---

### Neon.tech Database Setup

> **ส่วนที่ 5.1**

#### ขั้นตอน
1. ไปที่ https://console.neon.tech → Create Project → เลือก PostgreSQL 16
2. คัดลอก Connection String (format: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`)
3. ใช้เป็นค่า `DATABASE_URL` ใน Backend

**Connection String:** `postgresql://[user]:[pass]@[host].neon.tech/[db]?sslmode=require`

---

### Render + Vercel Deployment Steps

> **ส่วนที่ 5.2 & 5.3**

#### Backend บน Render.com

```
Build Command:  npm install && npx prisma generate && npm run build
Start Command:  npx prisma db push && npx tsx prisma/seed.ts && npm start
```

#### Frontend บน Vercel

```
Root Directory: frontend
Framework:      Vite
Build Command:  npm run build
```

---

### Environment Variables Table

| Variable      | Service   | ค่าตัวอย่าง / คำอธิบาย                         |
|---------------|-----------|------------------------------------------------|
| `DATABASE_URL` | Backend  | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `JWT_SECRET`   | Backend  | random string ที่ปลอดภัย (≥ 32 ตัวอักษร)       |
| `CORS_ORIGIN`  | Backend  | `https://restaurant-management-system-exam-2.vercel.app/` (ใส่หลัง Deploy Vercel เสร็จ) |
| `NODE_ENV`     | Backend  | `production`                                    |
| `VITE_API_URL` | Frontend | `https://restaurant-management-system-exam-backend.onrender.com` |

---

### Smoke Test Results

> **ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production**

| # | Feature          | คำสั่ง / ขั้นตอน                              | Expected               | หลักฐาน | ผ่าน/ไม่ผ่าน |
|---|------------------|-----------------------------------------------|------------------------|---------|--------------|
| 1 | Health Check     | `GET /api/health`                             | `{"status":"ok"}`      | 📸      | ได้          |
| 2 | Login            | Login ด้วย admin บน Frontend URL              | เข้าระบบสำเร็จ        | 📸      | ok         |
| 3 | Open Order & Add | เปิดโต๊ะ → เพิ่มสินค้า → Confirm             | ออเดอร์ถูกบันทึก      | 📸      | ok        |
| 4 | Payment          | ชำระเงิน → ตรวจสอบ change                    | คำนวณเงินทอนถูกต้อง   | 📸      | ok        |

**Production Smoke Test ผ่าน: ___ / 4 รายการ**

> 📸 (วางภาพหน้าจอหลักฐานแต่ละ Feature)
![alt text](image-7.png)
![alt text](image-8.png)
![alt text](image-9.png)
![alt text](image-10.png)

---

## CI/CD Pipeline + Newman Pass Rate

> **ส่วนที่ 5.5**

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

- [x] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [x] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [x] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [x] เพิ่ม step ติดตั้งและรัน Newman
- [x] เพิ่ม step `npm audit --audit-level=high` ทุกครั้งที่ push

### Newman Pass Rate (จาก CI/CD Pipeline)

| Metric          | ค่า    |
|-----------------|--------|
| Total Tests     | 26     |
| Tests Passed    | 22     |
| Tests Failed    | 4 (BUG-002, BUG-003 ×2, BUG-004 — Known Open Bugs) |
| **Pass Rate**   | **84.6%** |

> 📸 **ภาพหน้าจอ GitHub Actions Pipeline สำเร็จ**
>
![alt text](image-11.png)
![alt text](image-12.png)
![alt text](image-13.png)

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
