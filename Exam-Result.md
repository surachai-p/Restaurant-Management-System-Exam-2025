# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล: วชิระพล สิริอิสสระนันท์
> รหัสนักศึกษา: 68030250  
> วันที่สอบ: 8 พฤษภาคม 2569

---

## Project Overview

> ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**Student Fork / Repo:** `https://github.com/[รหัสนักศึกษา]/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel)  | `https://[your-app].vercel.app`          | ⬜     |
| Backend (Render)   | `https://[your-api].onrender.com`        | ⬜     |
| API Health Check   | `https://[your-api].onrender.com/api/health` | ⬜ |
| Database (Neon)    | `postgresql://...@...neon.tech/...`      | ⬜     |

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
| OS             | <!-- เช่น Windows 11 / Ubuntu 22.04 --> |
| Node.js        | 22 LTS                             |
| npm            | <!-- ระบุเวอร์ชัน -->               |
| Docker         | <!-- ระบุเวอร์ชัน -->               |
| PostgreSQL     | 16 (Neon.tech)                     |
| Browser        | <!-- เช่น Chrome 124 -->            |
| Newman         | <!-- ระบุเวอร์ชัน -->               |

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
| TC-001  | Positive | Auth     | Login ด้วย credential ถูกต้อง  | `{username: "admin", password: "Admin@123"}`      | HTTP 200 + JWT Token     |HTTP 200 OK - ได้รับ JWT Token สำหรับใช้ในการยืนยันตัวตน (Authentication)| ✅        |
| TC-002  | Positive | Menu     | เพิ่มเมนูใหม่สำเร็จ            | `{name: "ข้าวผัด", price: 60, stock: 100}`        | HTTP 201 + menu object   | เพิ่มเมนูได้สำเร็จ HTTP 201 และข้าวผัดเข้าไปอยู่ในเมนู มี ID = 11 | ✅        |
| TC-003  | Positive | Payment  | ชำระเงินและรับเงินทอนถูกต้อง   | `{orderId: 1, amount: 200}`                       | HTTP 200 + change = X    | ชำระเงินสำเร็จและได้รับเงินทอน HTTP 200 | ✅        |
| TC-004  | Negative | Auth     | Login ด้วย password ผิด        | `{username: "admin", password: "wrong"}`          | HTTP 401 Unauthorized    |  ไม่สามารถเข้าสู้ระบบได้ และมีข้อความแจ้งเตือน  | ✅        |
| TC-005  | Negative | Order    | เพิ่มสินค้าที่หมดสต็อก         | `{menuId: 99, quantity: 999}`                     | HTTP 400 + error message |เกิด numeric field overflow และระบบแสดง Error Message ของ Prisma ออกมาที่หน้าจอ (Raw Error Leak)| ❌        |
| TC-006  | Negative | Payment  | ชำระเงินน้อยกว่ายอดรวม        | `{orderId: 1, amount: 10}`                        | HTTP 400 Insufficient    |ระบบยอมรับการชำระเงินที่น้อยกว่ายอดรวม (Underpayment) และแสดงสถานะ Successful โดยคำนวณเงินทอนติดลบ (฿-215.00) แทนที่จะปฏิเสธรายการ| ❌        |
| TC-007  | Security | Auth     | เรียก API โดยไม่มี JWT Token   | GET /api/orders (no header)                       | HTTP 401 Unauthorized    | ไม่สามารถทำได้ ขึ้น 401 (Unauthorized) | ✅        |
| TC-008  | Security | Order    | Cashier เข้าถึง Admin endpoint | Token ของ Cashier + DELETE /api/menu/1            | HTTP 403 Forbidden       | ไม่สามารถทำได้ ขึ้น HTTP 403 Forbidden | ✅        |
| TC-009  | Security | Auth     | SQL Injection ใน Login field   | `{username: "' OR 1=1 --", password: "x"}`        | HTTP 401 (ไม่ผ่าน Login) | ไม่ผ่าน Login เข้าสู่ระบบไม่ได้ | ✅        |
| TC-010  | Edge     | Order    | ออเดอร์ที่ไม่มีสินค้า (0 ชิ้น) | `{tableId: 1, items: []}`                         | HTTP 400 + error message |ปุ่มยืนยันออเดอร์ถูก Disable (กดไม่ได้) หรือระบบมีการดัก Error ตั้งแต่หน้า Frontend ทำให้ไม่สามารถบันทึกออเดอร์ว่างเปล่าได้| ✅        |
| TC-011  | Edge     | Payment  | ชำระเงินพอดียอด (change = 0)   | `{orderId: 1, amount: exactTotal}`                | HTTP 200 + change = 0    |ชำระเงินสำเร็จ เงินทอน 0 บาท| ✅        |
| <!-- เพิ่มกรณีทดสอบ --> | | | | | | | |

**สรุปผล:** ผ่าน 9 / 11 กรณี (81%)

---

## Test Reports

> **ส่วนที่ 3 (ต่อ) — ผลการรัน Newman**

### Newman E2E Test Summary

```
Collection: RMS-[รหัสนักศึกษา]-TestSuite
Run Date:   YYYY-MM-DD HH:MM

┌─────────────────────────┬──────────────────┐
│                         │         executed │
├─────────────────────────┼──────────────────┤
│              iterations │                1 │
│                requests │               21 │
│            test-scripts │               21 │
│      prerequest-scripts │               0 │
│              assertions │               26 │
├─────────────────────────┴──────────────────┤
│ total run duration:     6.4s              │
│ total data received:    1.47kB               │
│ average response time:  271ms              │
└────────────────────────────────────────────┘
```

**Pass Rate:** 11 / 26 (42.3%)  
**Newman Report (HTML):** `./tests/reports/newman-report.html`

> ![newman-reports](/image/newman-reports.png)

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
| - | - | - | - | - | ✅ Pass (Secure) |

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
| High     | 1      |
| Medium   | 2      |
| Low      | 0      |
| **รวม**  | **3**  |

---

## Bug Reports

> **ส่วนที่ 3 — รายงานข้อบกพร่อง (≥ 2 Bug)**

---

### BUG-001: ระบบเกิด Runtime Error (Numeric Overflow) เมื่อระบุจำนวนสินค้ามากเกินไป

**Severity:** High
**Priority:** P1
**Feature:** Order (การจัดการออเดอร์) 
**Status:** Open

#### Steps to Reproduce
1. เข้าสู่ระบบด้วยสิทธิ์ Admin หรือ Cashier
2. เลือกโต๊ะที่เปิดอยู่ หรือทำการเปิดโต๊ะใหม่
3. ในส่วน Add Item ให้เลือกเมนูอาหารใดก็ได้
4. ระบุจำนวน (Quantity) เป็นค่าที่สูงมาก เช่น 999999999
5. กดปุ่ม "Add to Order"

#### Expected Result
> ระบบควรมีการตรวจสอบ (Validation) และแจ้งเตือนว่า "จำนวนสินค้าเกินขีดจำกัด" หรือ "ค่าไม่ถูกต้อง" และไม่ควรยอมให้ส่ง Request ไปยังฐานข้อมูล

#### Actual Result
> ระบบพยายามประมวลผลและเกิดข้อผิดพลาดจากฐานข้อมูล (PostgresError code: 22003) แสดงข้อความ "numeric field overflow" บนหน้าจอ UI ทำให้หน้าเว็บค้างและผู้ใช้ทั่วไปเห็นรายละเอียดของ Code ภายใน

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> ![BUG-001 Screenshot](/image/BUG-001.png)

#### Business Impact
> ทำให้พนักงานไม่สามารถทำออเดอร์ต่อได้ทันที (System Instability) และเป็นการเปิดเผยโครงสร้างฐานข้อมูล (Information Disclosure) ซึ่งเป็นช่องโหว่ด้านความปลอดภัย

---

### BUG-002: ระบบยอมรับการชำระเงินที่น้อยกว่ายอดรวม (Underpayment)

**Severity:** Critical
**Priority:** P1 
**Feature:** Payment
**Status:** Open

#### Steps to Reproduce
1. ดำเนินการสั่งอาหารจนมียอดรวม (Total Amount) มากกว่า 0 บาท (เช่น ฿225.00)
2. ไปที่หน้าชำระเงิน (Payment)
3. ในช่อง Amount Paid ให้ระบุจำนวนเงินที่ น้อยกว่า ยอดรวม (เช่น ฿10.00)
4. กดปุ่มยืนยันการชำระเงิน

#### Expected Result
> ระบบต้องปฏิเสธการชำระเงิน ตอบกลับด้วย HTTP 400 Bad Request และแสดงข้อความแจ้งเตือนว่า "ยอดเงินไม่เพียงพอ"

#### Actual Result
> ระบบแสดงสถานะ "Payment Successful!" และอนุญาตให้จบรายการได้ตามปกติ โดยคำนวณเงินทอนติดลบ (Change: ฿-215.00) และบันทึกลงฐานข้อมูลว่าชำระเงินเรียบร้อยแล้ว

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> ![BUG-002 Screenshot](/image/BUG-002.png)

#### Business Impact
> ร้ายแรงมากต่อธุรกิจ เนื่องจากร้านอาหารจะเสียรายได้โดยตรง และอาจเกิดการทุจริตจากการระบุยอดชำระเงินไม่ตรงตามจริง

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
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | ⬜ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ⬜ |

#### หลักฐาน (On-Premises)

> 📸 **ภาพหน้าจอ Backend Health Check** (`http://localhost:3001/api/health`)
> 
> ![backend-health-check-pic](/image/backend-health-check.png)

> 📸 **ภาพหน้าจอ Frontend Login สำเร็จ** (`http://localhost:5173`)
>
> ![frontend-login-success](/image/frontend-login-success.png)

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
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | ⬜ |
| Frontend       | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ⬜ |

#### หลักฐาน (Staging)

> 📸 **ภาพหน้าจอ `docker compose ps`** (ทุก Container สถานะ running)
>
> ![docker-compose-ps](/image/docker-compose-ps.png)
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
| `CORS_ORIGIN`  | Backend  | URL ของ Frontend เช่น `https://[app].vercel.app` |
| `NODE_ENV`     | Backend  | `production`                                    |
| `VITE_API_URL` | Frontend | URL ของ Backend เช่น `https://[api].onrender.com` |

---

### Smoke Test Results

> **ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production**

| # | Feature          | คำสั่ง / ขั้นตอน                              | Expected               | หลักฐาน | ผ่าน/ไม่ผ่าน |
|---|------------------|-----------------------------------------------|------------------------|---------|--------------|
| 1 | Health Check     | `GET /api/health`                             | `{"status":"ok"}`      | 📸      | ⬜           |
| 2 | Login            | Login ด้วย admin บน Frontend URL              | เข้าระบบสำเร็จ        | 📸      | ⬜           |
| 3 | Open Order & Add | เปิดโต๊ะ → เพิ่มสินค้า → Confirm             | ออเดอร์ถูกบันทึก      | 📸      | ⬜           |
| 4 | Payment          | ชำระเงิน → ตรวจสอบ change                    | คำนวณเงินทอนถูกต้อง   | 📸      | ⬜           |

**Production Smoke Test ผ่าน: 4 / 4 รายการ**

>**Health Check**
![Health Check](/image/health-check.png) <br>
**Login**
![Login](/image/Login.png) <br>
**Open Order & Add**
![Open Order & Add](/image/order.png) <br>
**Payment**
![Payment](/image/payment.png)


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
| Total Tests     | ??     |
| Tests Passed    | ??     |
| Tests Failed    | ??     |
| **Pass Rate**   | **??%** |

> 📸 **ภาพหน้าจอ GitHub Actions Pipeline สำเร็จ**
>
> (วางภาพที่นี่)

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
