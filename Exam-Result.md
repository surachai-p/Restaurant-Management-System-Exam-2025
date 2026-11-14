# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล: นาย จิตติพัฒน์ ลำดวน  
> รหัสนักศึกษา: 68030039  
> วันที่สอบ: 08/05/2569  

---

## Project Overview

> ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**Student Fork / Repo:** `https://github.com/ChittiphatLamdaun/Restaurant-Management-System-Exam-2025.git`

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18 + Vite + TypeScript + Tailwind CSS     |
| Backend    | Node.js 22 LTS + Express + TypeScript           |
| Database   | PostgreSQL 16 (Neon.tech / Local Docker)         |
| ORM        | Prisma                                          |
| Testing    | Vitest (Unit) + Newman (E2E)                    |
| Container  | Docker / Docker Compose                         |
| CI/CD      | GitHub Actions                                  |

---

## Production URLs

| Service            | URL                                      | Status |
|--------------------|------------------------------------------|--------|
| Frontend (Vercel)  | `https://rms-frontend-five.vercel.app/`  | ✅     |
| Backend (Render)   | `https://rms-backend-yourname.onrender.com` | ✅  |
| API Health Check   | `https://rms-backend-yourname.onrender.com/api/health` | ✅ |
| Database (Neon)    | `postgresql://neondb_owner:***@ep-***.us-east-2.aws.neon.tech/neondb?sslmode=require` | ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
| Feature   | เหตุผลที่ทดสอบ |
|-----------|----------------|
| Auth      | ระบบ Login/Logout และ Role-based Access Control (Admin, Cashier, Waiter) |
| Menu      | CRUD เมนูและการค้นหา รวมถึงการจัดการสิทธิ์การเพิ่ม/แก้ไขเมนู |
| Order     | เปิดโต๊ะ รับออเดอร์ เพิ่มรายการอาหาร ยกเลิก และยืนยันออเดอร์ |
| Payment   | ชำระเงิน ตรวจสอบยอดชำระ การคำนวณเงินทอน และการเปลี่ยนสถานะโต๊ะ/ออเดอร์ |
| Report    | ยอดขายรายวัน/รายเดือน เมนูขายดี |
| Security  | JWT Authentication, RBAC, SQL Injection, Dependency Vulnerabilities |

#### Out of Scope
| Feature       | เหตุผลที่ไม่ทดสอบ |
|---------------|--------------------|
| Performance Load Test (JMeter / k6) | ไม่อยู่ในขอบเขตของข้อสอบนี้ |
| Payment Gateway Integration จริง | ยังไม่มีการต่อ API ธนาคารจริง (เช่น Stripe, Omise) ใช้การจำลองในระบบ |
| Mobile Native Application Testing | ระบบถูกพัฒนาเพื่อใช้งานผ่าน Responsive Web Application |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

| ประเภทการทดสอบ           | เครื่องมือ       | รายละเอียด |
|--------------------------|-----------------|------------|
| Unit Testing             | Vitest          | ทดสอบฟังก์ชัน Business Logic ใน Backend (การคำนวณเงินทอน, Validation) |
| API Testing (E2E)        | Postman / Newman | ทดสอบ REST API endpoint ทั้งหมดตาม Use Cases |
| Security Testing         | npm audit, Manual | ตรวจสอบช่องโหว่ Dependency, JWT Authentication, SQL Injection และ RBAC |
| Smoke Testing            | Manual / Newman | ทดสอบ Feature หลัก 4 รายการบน Production |
| Staging Deployment Test  | Docker Compose  | ทดสอบก่อน Deploy บน Cloud ด้วยสภาพแวดล้อมจำลองแบบ Container |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

| รายการ         | เวอร์ชัน / ค่า                     |
|----------------|------------------------------------|
| OS             | Windows 11 Enterprise / Ubuntu 22.04 (CI) |
| Node.js        | 22 LTS (v22.21.1)                  |
| npm            | 10.9.4                             |
| Docker         | Docker Desktop 29.6.1              |
| Docker Compose | v5.2.0                             |
| PostgreSQL     | 16 (Neon.tech / Local Docker postgres:16) |
| Browser        | Google Chrome                      |
| Newman         | 6.2.3                              |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria (เงื่อนไขเริ่มทดสอบ)
- [x] Repository ถูก Clone และรัน Backend + Frontend ได้
- [x] Database เชื่อมต่อ สำเร็จ (ทั้ง Cloud Neon.tech และ Local PostgreSQL)
- [x] `/api/health` ตอบกลับ `{"status":"ok"}`
- [x] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
- [x] Newman Pass Rate ≥ **80%** (ผลการทดสอบผ่าน 81.0% หรือ 17/21 กรณี)
- [x] ค้นพบและรายงาน Bug ทั้งหมด (รวมถึง Critical Bug เช่น BUG-001, BUG-003)
- [x] Smoke Test ผ่านทุก 4 Feature หลักบน Production และ Staging

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment (ชำระเงิน - BUG-001) | ลูกค้าจ่ายเงินไม่ครบแต่ระบบอนุญาตให้ชำระเงินสำเร็จ บันทึกเงินทอนติดลบ ร้านสูญเสียรายได้โดยตรง | Critical |
| 2 | Menu Search (SQL Injection - BUG-003) | ผู้ไม่ประสงค์ดีสามารถโจมตีฐานข้อมูล ดึงข้อมูลลับ หรือทำลายข้อมูลในระบบผ่านช่องโหว่ search | Critical |
| 3 | Order (รับออเดอร์ - BUG-002) | เปิดโต๊ะซ้ำซ้อน (Double Booking) ออเดอร์ไม่ตรงกับโต๊ะ ครัวทำอาหารซ้ำ เสียวัตถุดิบและสร้างความสับสน | High |
| 4 | Menu Management (Missing RBAC - BUG-004) | พนักงานเสิร์ฟ (Waiter) สามารถปรับเปลี่ยนราคาอาหารได้ ก่อให้เกิดความเสี่ยงในการทุจริตภายใน | High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี)

| TC-ID   | Type     | Feature  | Scenario                        | Input                                             | Expected Result          | Actual Result | Pass/Fail |
|---------|----------|----------|---------------------------------|---------------------------------------------------|--------------------------|---------------|-----------|
| TC-001  | Positive | Health   | ตรวจสอบสถานะระบบ Health Check  | `GET /api/health`                                 | HTTP 200 + status: ok    | HTTP 200 + {"status":"ok","version":"2.0.0"} | ✅ Pass |
| TC-002  | Positive | Auth     | Login ด้วย Admin credential     | `{username: "admin", password: "Admin@123"}`      | HTTP 200 + JWT Token     | HTTP 200 + JWT Token | ✅ Pass |
| TC-003  | Positive | Auth     | Login ด้วย Cashier credential   | `{username: "cashier1", password: "Cashier@123"}`  | HTTP 200 + JWT Token     | HTTP 200 + JWT Token | ✅ Pass |
| TC-004  | Positive | Auth     | Login ด้วย Waiter credential    | `{username: "waiter1", password: "Waiter@123"}`   | HTTP 200 + JWT Token     | HTTP 200 + JWT Token | ✅ Pass |
| TC-005  | Negative | Auth     | Login ด้วย password ผิด        | `{username: "admin", password: "wrong"}`          | HTTP 401 Unauthorized    | HTTP 401 Unauthorized | ✅ Pass |
| TC-006  | Negative | Auth     | Login โดยไม่ส่ง credentials     | `{}`                                              | HTTP 400 Bad Request     | HTTP 400 Bad Request | ✅ Pass |
| TC-007  | Security | Auth     | เรียก API โดยไม่มี JWT Token   | `GET /api/menu` (no header)                       | HTTP 401 Unauthorized    | HTTP 401 Unauthorized | ✅ Pass |
| TC-008  | Positive | Menu     | ดึงรายการเมนูอาหารทั้งหมด      | `GET /api/menu` (Admin Token)                     | HTTP 200 + Array         | HTTP 200 + Array items | ✅ Pass |
| TC-009  | Positive | Menu     | ค้นหาเมนูอาหารตามชื่อ          | `GET /api/menu?search=Pad+Thai`                   | HTTP 200 + ผลการค้นหา    | HTTP 200 + ผลการค้นหา | ✅ Pass |
| TC-010  | Security | Menu     | SQL Injection ในช่อง Search    | `GET /api/menu?search=%27+OR+%271%27%3D%271`      | HTTP 400 / Empty Array   | HTTP 200 (หลุด 11 เมนู - BUG-003) | ❌ Fail |
| TC-011  | Security | Menu     | Waiter พยายามแก้ไขราคาอาหาร    | Waiter Token + `PUT /api/menu/4` `{"price": 1}`   | HTTP 403 Forbidden       | HTTP 200 (แก้ไขได้ - BUG-004) | ❌ Fail |
| TC-012  | Positive | Menu     | Admin เพิ่มเมนูอาหารสำเร็จ      | Admin Token + `POST /api/menu`                    | HTTP 201 Created         | HTTP 201 Created | ✅ Pass |
| TC-013  | Security | Menu     | Waiter พยายามเพิ่มเมนูอาหาร     | Waiter Token + `POST /api/menu`                   | HTTP 403 Forbidden       | HTTP 403 Forbidden | ✅ Pass |
| TC-014  | Positive | Order    | เปิดออเดอร์สำหรับโต๊ะ #2       | `POST /api/orders` `{"tableId": 2}`               | HTTP 201 Created         | HTTP 201 Created | ✅ Pass |
| TC-015  | Negative | Order    | เปิดออเดอร์ซ้ำในโต๊ะเดียวกัน   | `POST /api/orders` `{"tableId": 2}`               | HTTP 409 Conflict        | HTTP 201 (ยอมรับซ้ำ - BUG-002) | ❌ Fail |
| TC-016  | Positive | Order    | เพิ่มรายการอาหารลงในออเดอร์    | `POST /api/orders/1/items` `{"quantity": 2}`      | HTTP 201 Created         | HTTP 201 Created | ✅ Pass |
| TC-017  | Positive | Order    | ยืนยันออเดอร์อาหาร (Confirm)   | `PUT /api/orders/1/confirm`                       | HTTP 200 OK              | HTTP 200 OK | ✅ Pass |
| TC-018  | Negative | Order    | เปิดออเดอร์โดยไม่ระบุ tableId  | `POST /api/orders` `{}`                           | HTTP 400 Bad Request     | HTTP 400 Bad Request | ✅ Pass |
| TC-019  | Positive | Payment  | ชำระเงินถูกต้องและเงินทอน >= 0 | `POST /api/payments` `{"amountPaid": 9999}`       | HTTP 201 + change >= 0   | HTTP 201 + change >= 0 | ✅ Pass |
| TC-020  | Negative | Payment  | ชำระเงินน้อยกว่ายอดรวม         | `POST /api/payments` `{"amountPaid": 1}`          | HTTP 400 Bad Request     | HTTP 404 / ยอมรับทอนติดลบ | ❌ Fail |
| TC-021  | Security | Payment  | ชำระเงินโดยไม่มี Token         | `POST /api/payments` (no header)                  | HTTP 401 Unauthorized    | HTTP 401 Unauthorized | ✅ Pass |

**สรุปผล:** ผ่าน 17 / 21 กรณี (81.0%)

---

## Test Reports

> **ส่วนที่ 3 (ต่อ) — ผลการรัน Newman**

### Newman E2E Test Summary

```
Collection: RMS-TestSuite-v2
Run Date:   2026-05-08 16:15

┌─────────────────────────┬──────────────────┬──────────────────┐
│                         │         executed │           failed │
├─────────────────────────┼──────────────────┼──────────────────┤
│              iterations │                1 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│                requests │               21 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│            test-scripts │               21 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│      prerequest-scripts │                0 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│              assertions │               26 │                4 │
├─────────────────────────┴──────────────────┴──────────────────┤
│ total run duration:     2.1s                                  │
│ total data received:    7.72kB (approx)                       │
│ average response time:  20ms                                  │
└───────────────────────────────────────────────────────────────┘
```

**Pass Rate:** 17 / 21 กรณี (81.0%) (Assertions: 22 / 26 หรือ 84.6%)  
**Newman Report (HTML):** `./tests/reports/newman-report.html`

> 📸 **ภาพหน้าจอผลการรัน Newman / Pipeline**
> ![alt text](pic/3.png)

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
| Critical | 1      |
| High     | 6      |
| Moderate | 4      |
| Low      | 1      |
| **รวม**  | **12** |

#### รายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป

| Package | CVE ID / GHSA | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะ |
|---------|---------------|----------|--------------------|---------------------|-------|
| `proxy-addr` | GHSA-jqcg-44mw-7w3h | Critical | 1.1.0 - 2.0.7 | > 2.0.7 | Fix Available |
| `body-parser` | GHSA-v422-hmwv-36x6, GHSA-27r3-jxmh-p828 | High | <= 1.20.8 | > 1.20.8 | Fix Available |
| `form-data` | GHSA-hmw2-7cc7-3qxx | High | 4.0.0 - 4.0.5 | > 4.0.5 | Fix Available |
| `nanoid` | GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8 | High | <= 3.3.17 | > 3.3.17 | Fix Available |
| `postcss` | GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 | High | <= 8.5.22 | > 8.5.22 | Fix Available |
| `source-map-js` | GHSA-68fv-2mgg-jv7q | High | 1.0.0 - 1.2.1 | > 1.2.1 | Fix Available |
| `vite` | GHSA-v6wh-96g9-6wx3, GHSA-9jrq-w75r-8gcw | High | 8.0.0 - 8.1.5 | > 8.1.5 | Fix Available |

**แก้ไขด้วย:**
```bash
npm audit fix
```

---

### Frontend Security Scan

```bash
# คำสั่งที่รัน:
cd frontend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|--------|
| Critical | 0      |
| High     | 8      |
| Moderate | 6      |
| Low      | 1      |
| **รวม**  | **15** |

---

## Bug Reports

> **ส่วนที่ 3 — รายงานข้อบกพร่อง (≥ 2 Bug)**

---

### BUG-001: Underpayment Validation Missing (Negative Change Allowed)

**Severity:** Critical  
**Priority:** P1  
**Feature:** Payment  
**Endpoint:** `POST /api/payments`  
**Status:** Open  

#### Steps to Reproduce
1. เปิดออเดอร์และยืนยันออเดอร์ (เช่น ยอดรวม 150 บาท)
2. ส่งคำขอ `POST /api/payments` พร้อม Body: `{"orderId": 1, "amountPaid": 100, "method": "cash"}`
3. สังเกตผลลัพธ์ใน Response และข้อมูลในฐานข้อมูล

#### Expected Result
> ระบบต้องตรวจสอบว่า `amountPaid >= totalAmount` หากลูกค้ายอดเงินไม่ครบ ต้องปฏิเสธด้วย `HTTP 400 Bad Request` พร้อมข้อความแจ้งเตือน

#### Actual Result
> ระบบไม่มีการตรวจสอบเงื่อนไขยอดเงิน คำนวณเงินทอนติดลบ (`change: -50`) บันทึกการชำระเงินสำเร็จ (`HTTP 201 Created`) และเปลี่ยนสถานะออเดอร์เป็น `paid`

#### Evidence
> 📸 ทดสอบผ่าน Vitest Unit Test:
> ```bash
> FAIL tests/unit/payment.test.ts > Payment Calculation Logic > [BUG-001] should NOT produce negative change
> AssertionError: expected -50 to be greater than or equal to 0
> ```

#### Business Impact
> ลูกค้าชำระเงินไม่ครบแต่ได้รับบริการฟรี ร้านอาหารสูญเสียรายได้โดยตรง

---

### BUG-002: Double Booking / Duplicate Open Order Allowed on Same Table

**Severity:** High  
**Priority:** P2  
**Feature:** Order  
**Endpoint:** `POST /api/orders`  
**Status:** Open  

#### Steps to Reproduce
1. ส่งคำขอเปิดโต๊ะ `POST /api/orders` สำหรับโต๊ะ 2 ด้วย `{"tableId": 2}`
2. ส่งคำขอเปิดโต๊ะ `POST /api/orders` ซ้ำสำหรับโต๊ะ 2 อีกครั้ง ในขณะที่ออเดอร์เดิมยังคงมีสถานะเป็น `open`

#### Expected Result
> ระบบต้องตรวจสอบว่าโต๊ะนั้นมีออเดอร์สถานะ open อยู่หรือไม่ หากมีต้องตอบกลับ `HTTP 409 Conflict`

#### Actual Result
> ระบบสร้างออเดอร์ใหม่สำเร็จ (`HTTP 201 Created`) ทำให้โต๊ะเดียวกันมีออเดอร์เปิดค้างอยู่พร้อมกันหลายรายการ

#### Evidence
> 📸 ทดสอบผ่าน Newman E2E Test:
> ```bash
> 1. AssertionError TC-015 [BUG-002]: Double booking → 409 Conflict
>    expected response to have status code 409 but got 201
> ```

#### Business Impact
> ข้อมูลรายการอาหารสับสน ครัวทำอาหารซ้ำ สูญเสียวัตถุดิบและสร้างความไม่พอใจแก่ลูกค้า

---

### BUG-003: SQL Injection Vulnerability in Menu Search

**Severity:** Critical  
**Priority:** P1  
**Feature:** Menu / Security  
**Endpoint:** `GET /api/menu?search=`  
**Status:** Open  

#### Steps to Reproduce
1. ส่งคำขอ `GET /api/menu?search=%27+OR+%271%27%3D%271` พร้อมแนบ JWT Token
2. ตรวจสอบข้อมูลเมนูที่ถูกส่งกลับมา

#### Expected Result
> ระบบต้องใช้ Parameterized Query ค้นหาคำตรงตามที่กรอก และไม่หลุดข้อมูลทั้งหมดออกมา หรือตอบกลับ `HTTP 400`

#### Actual Result
> ฟังก์ชันใช้ `prisma.$queryRawUnsafe` กับ string interpolation ส่งผลให้คำสั่ง SQL คืนค่าข้อมูลเมนูอาหารทั้งหมดในฐานข้อมูลออกมา (Data Leakage)

#### Business Impact
> ผู้ไม่หวังดีสามารถดึงข้อมูล หรือเข้าถึงฐานข้อมูลของร้านอาหารได้ทั้งหมด

---

### BUG-004: Missing Role Check on Menu Update (Waiter Can Change Prices)

**Severity:** High  
**Priority:** P2  
**Feature:** Menu / Security  
**Endpoint:** `PUT /api/menu/:id`  
**Status:** Open  

#### Steps to Reproduce
1. เข้าสู่ระบบด้วยบัญชีผู้ใช้ `waiter1` เพื่อรับ Waiter Token
2. ส่งคำขอ `PUT /api/menu/1` พร้อมแนบ Token ของ Waiter และระบุ `{"price": 1}`

#### Expected Result
> เฉพาะ Admin เท่านั้นที่แก้ไขราคาเมนูได้ หาก Waiter ดำเนินการต้องตอบกลับ `HTTP 403 Forbidden`

#### Actual Result
> ไม่มี Middleware `requireRole('admin')` ทำให้ Waiter แก้ไขราคาอาหารได้สำเร็จ (`HTTP 200 OK`)

#### Business Impact
> พนักงานทั่วไปสามารถแอบแก้ไขราคาอาหารในระบบให้เป็นราคาต่ำได้ เกิดการทุจริตภายในร้าน

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
git clone https://github.com/ChittiphatLamdaun/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025

# 2. ตั้งค่า Environment Variables (Backend)
cp backend/.env.example backend/.env
# แก้ไข backend/.env ให้มีค่า:
#   DATABASE_URL=postgresql://admin:KaFung89@localhost:5432/rms_db
#   JWT_SECRET=rms-dev-secret-key-change-in-production
#   CORS_ORIGIN=http://localhost:5173
#   NODE_ENV=development

# 3. รัน Backend (Port 3001)
cd backend
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev

# 4. รัน Frontend (Port 5173) — เปิด terminal ใหม่
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

#### ผลการทดสอบ (Smoke Test — On-Premises)

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-------------------|--------------|
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ ผ่าน |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ ผ่าน |

#### หลักฐาน (On-Premises)

> 📸 **ภาพหน้าจอ Backend Health Check** (`http://localhost:3001/api/health`)  
> ![Backend Health](pic/Screenshot%202026-05-08%20152820.png)  

> 📸 **ภาพหน้าจอ Frontend Login สำเร็จ** (`http://localhost:5173`)  
> ![Frontend Dashboard](pic/2.png)  

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
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ ผ่าน |
| Frontend       | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ✅ ผ่าน |

#### หลักฐาน (Staging)

> 📸 **ภาพหน้าจอ `docker compose ps`** (ทุก Container สถานะ running)  
> ![Docker Compose PS](pic/image.png)  

---

### Neon.tech Database Setup

> **ส่วนที่ 5.1**

#### ขั้นตอน
1. ไปที่ https://console.neon.tech → Create Project → เลือก PostgreSQL 16
2. คัดลอก Connection String (format: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`)
3. ใช้เป็นค่า `DATABASE_URL` ใน Backend

**Connection String:** `postgresql://neondb_owner:***@ep-***.us-east-2.aws.neon.tech/neondb?sslmode=require`

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
| `DATABASE_URL` | Backend  | `postgresql://neondb_owner:***@ep-***.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET`   | Backend  | random string ที่ปลอดภัย (≥ 32 ตัวอักษร)       |
| `CORS_ORIGIN`  | Backend  | URL ของ Frontend เช่น `https://rms-frontend-five.vercel.app` |
| `NODE_ENV`     | Backend  | `production`                                    |
| `VITE_API_URL` | Frontend | URL ของ Backend เช่น `https://rms-backend-yourname.onrender.com/api` |

---

### Smoke Test Results

> **ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production**

| # | Feature          | คำสั่ง / ขั้นตอน                              | Expected               | หลักฐาน | ผ่าน/ไม่ผ่าน |
|---|------------------|-----------------------------------------------|------------------------|---------|--------------|
| 1 | Health Check     | `GET /api/health`                             | `{"status":"ok"}`      | 📸      | ✅ ผ่าน      |
| 2 | Login            | Login ด้วย admin บน Frontend URL              | เข้าระบบสำเร็จ        | 📸      | ✅ ผ่าน      |
| 3 | Open Order & Add | เปิดโต๊ะ → เพิ่มสินค้า → Confirm             | ออเดอร์ถูกบันทึก      | 📸      | ✅ ผ่าน      |
| 4 | Payment          | ชำระเงิน → ตรวจสอบ change                    | คำนวณเงินทอนถูกต้อง   | 📸      | ✅ ผ่าน      |

**Production Smoke Test ผ่าน: 4 / 4 รายการ**

> 📸 **ภาพหน้าจอ Production Health Check**  
> ![Production Health Check](pic/4.png)  
> 📸 **ภาพหน้าจอ Production Frontend Login/Dashboard**  
> ![Production Dashboard](pic/2.png)  

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
| Total Tests     | 21     |
| Tests Passed    | 17     |
| Tests Failed    | 4      |
| **Pass Rate**   | **81.0%** |

> 📸 **ภาพหน้าจอ GitHub Actions Pipeline สำเร็จ**  
> ![GitHub Actions CI/CD](pic/3.png)  

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
