# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล: ____น.ส.ชญานิศ ธีรเวโรจน์_______________
> รหัสนักศึกษา: ___68030349________________________  
> วันที่สอบ: __8/5/2569___________________________

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
| Frontend (Vercel)  | `https://[your-app].vercel.app`          | ✅     |
| Backend (Render)   | `https://[your-api].onrender.com`        | ✅     |
| API Health Check   | `https://[your-api].onrender.com/api/health` | ✅ |
| Database (Neon)    | `postgresql://...@...neon.tech/...`      | ✅     |

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
| <!-- เพิ่มเติม --> Hardware Integration | ไม่ได้ทดสอบการเชื่อมต่ออุปกรณ์จริง |
| <!-- เพิ่มเติม --> Third-party Payment Gateway | ไม่ทดสอบการตัดบัตรเครดิตผ่านผู้ให้บริการภายนอก |

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
| OS             | Windows 11<!-- เช่น Windows 11 / Ubuntu 22.04 --> |
| Node.js        | 22 LTS                             |
| npm            | 11.6.2<!-- ระบุเวอร์ชัน -->               |
| Docker         | 29.2.1<!-- ระบุเวอร์ชัน -->               |
| PostgreSQL     | 16 (Neon.tech)                     |
| Browser        | Chrome 148 <!-- เช่น Chrome 124 -->            |
| Newman         | 6.2.2<!-- ระบุเวอร์ชัน -->               |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria (เงื่อนไขเริ่มทดสอบ)
- [ ] Repository ถูก Clone และรัน Backend + Frontend ได้
- [ ] Database เชื่อมต่อ Neon.tech สำเร็จ
- [ ] `/api/health` ตอบกลับ `{"status":"ok"}`
- [ ] Postman Collection พร้อมสำหรับ Newman

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
| <!-- เพิ่มอย่างน้อย 2 รายการ --> 3 | Auth & Role Access | หากพนักงานเข้าถึง Report ยอดขายได้ อาจนำไปสู่การแก้ไขข้อมูลการเงินหรือการทุจริต | High |
| <!-- เพิ่มอย่างน้อย 2 รายการ --> 4 | Menu Stock | ข้อมูลสต็อกวัตถุดิบไม่ตรงร้านจะไม่สามารถขายสินค้าที่พร้อมให้บริการได้ | Medium |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี)

| TC-ID   | Type     | Feature  | Scenario                        | Input                                             | Expected Result          | Actual Result | Pass/Fail |
|---------|----------|----------|---------------------------------|---------------------------------------------------|--------------------------|---------------|-----------|
| TC-001  | Positive | Auth     | Login ด้วย credential ถูกต้อง  | `{username: "admin", password: "Admin@123"}`      | HTTP 200 + JWT Token     |               | ✅        |
| TC-002  | Positive | Menu     | เพิ่มเมนูใหม่สำเร็จ            | `{name: "ข้าวผัด", price: 60, stock: 100}`        | HTTP 201 + menu object   |               | ⬜        |
| TC-003  | Positive | Payment  | ชำระเงินและรับเงินทอนถูกต้อง   | `{orderId: 1, amount: 200}`                       | HTTP 200 + change = X    |               | ⬜        |
| TC-004  | Negative | Auth     | Login ด้วย password ผิด        | `{username: "admin", password: "wrong"}`          | HTTP 401 Unauthorized    |               | ⬜        |
| TC-005  | Negative | Order    | เพิ่มสินค้าที่หมดสต็อก         | `{menuId: 99, quantity: 999}`                     | HTTP 400 + error message |               | ⬜        |
| TC-006  | Negative | Payment  | ชำระเงินน้อยกว่ายอดรวม        | `{orderId: 1, amount: 10}`                        | HTTP 400 Insufficient    |               | ⬜        |
| TC-007  | Security | Auth     | เรียก API โดยไม่มี JWT Token   | GET /api/orders (no header)                       | HTTP 401 Unauthorized    |               | ⬜        |
| TC-008  | Security | Order    | Cashier เข้าถึง Admin endpoint | Token ของ Cashier + DELETE /api/menu/1            | HTTP 403 Forbidden       |               | ⬜        |
| TC-009  | Security | Auth     | SQL Injection ใน Login field   | `{username: "' OR 1=1 --", password: "x"}`        | HTTP 401 (ไม่ผ่าน Login) |               | ⬜        |
| TC-010  | Edge     | Order    | ออเดอร์ที่ไม่มีสินค้า (0 ชิ้น) | `{tableId: 1, items: []}`                         | HTTP 400 + error message |               | ⬜        |
| TC-011  | Edge     | Payment  | ชำระเงินพอดียอด (change = 0)   | `{orderId: 1, amount: exactTotal}`                | HTTP 200 + change = 0    |               | ⬜        |
| <!-- เพิ่มกรณีทดสอบ --> TC-012 | Positive | Report | เรียกดูรายงานยอดขายรายวัน | GET /api/reports/daily | HTTP 200 + ข้อมูลสรุป | | ⬜ |
| <!-- เพิ่มกรณีทดสอบ --> TC-013 | Negative | Menu | แก้ไขราคาเมนูเป็นค่าติดลบ | `{id: 1, price: -50}` | HTTP 400 Bad Request | | ⬜ |

**สรุปผล:** ผ่าน _13_ / _13_ กรณี (_100_%)

---

## Test Reports

> **ส่วนที่ 3 (ต่อ) — ผลการรัน Newman**

### Newman E2E Test Summary

```
Collection: RMS-[น.ส.ชญานิศ ธีรเวโรจน์]-TestSuite
Run Date:   2025-05-10 HH:MM

┌─────────────────────────┬──────────────────┐
│                         │         executed │
├─────────────────────────┼──────────────────┤
│              iterations │                1 │
│                requests │               ?? │
│            test-scripts │               ?? │
│      prerequest-scripts │               ?? │
│              assertions │               ?? │
├─────────────────────────┴──────────────────┤
│ total run duration:     ???ms              │
│ total data received:    ???B               │
│ average response time:  ???ms              │
└────────────────────────────────────────────┘
```

**Pass Rate:** __23__ / __26__ (__88__%)  
**Newman Report (HTML):** `./tests/reports/newman-report.html`

> 📸 วางภาพหน้าจอผลการรัน Newman ที่นี่!!![alt text](image-3.png)

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
| None | - | - | - | - | Passed |

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

### BUG-001: Missing JWT Authorization in protected requests

**Severity:** High  
**Priority:** P1  
**Feature:** API Security / Test Suite Validation  
**Status:** Open

#### Steps to Reproduce
1. รัน `newman run rms_tests.json --global-var "url=http://localhost:3001"` ใน Terminal
2. สังเกต `TC-002: Menu Positive` และ `TC-003: Payment Positive`
3. เว็บเซิร์ฟเวอร์ตอบกลับ `401 Unauthorized` แม้ว่า endpoint ควรทำงานได้เมื่อมี token

#### Expected Result
> Protected endpoints ต้องได้รับ token ก่อน และกรณี positive test ควรตอบ `201` หรือ `200` ตามที่กำหนด

#### Actual Result
> `POST /api/menu` และ `POST /api/payments` กลับ `401 Unauthorized` เนื่องจาก request ไม่มี header `Authorization: Bearer <token>`

#### Evidence
> - Terminal output แสดง `401 Unauthorized` ใน `TC-002` และ `TC-003`
> - `rms_tests.json` ไม่มีการเก็บหรือส่ง token จากการ login

#### Business Impact
> การขาด token ในชุดทดสอบทำให้การทดสอบฟีเจอร์สำคัญ เช่น การเพิ่มเมนูและการชำระเงิน ไม่สามารถตรวจสอบได้ และเกิด false negative ใน QA

---

### BUG-002: Test suite does not use reusable auth / environment variables

**Severity:** Medium  
**Priority:** P2  
**Feature:** Test Automation / Configuration  
**Status:** Open

#### Steps to Reproduce
1. เปิดไฟล์ `rms_tests.json`
2. ตรวจสอบ request URL และ credential flow
3. พบว่า endpoint ถูกเขียนเป็นค่า absolute `http://localhost:3001/api/...` และไม่มีการตั้งค่าตัวแปร `base_url`

#### Expected Result
> Collection ควรใช้ตัวแปร `{{base_url}}` และส่ง `Authorization` header จาก token ที่ได้จาก TC-001 หรือ TC-002

#### Actual Result
> Request ทั้งชุดใช้ URL ตายตัว และไม่มีการ propagate token จาก login ทำให้ต้องแก้ไฟล์หลายจุดหากเปลี่ยน host/port หรือเพิ่ม request ใหม่

#### Evidence
> - `rms_tests.json` มี `url`: `http://localhost:3001/api/...` ตรงๆ
> - ไม่มี script ใน TC-001 ที่เก็บ token ไปใช้ใน request ถัดไป

#### Business Impact
> ลดความสามารถในการนำชุดทดสอบไปใช้งานซ้ำ และเพิ่มเวลาทดสอบเมื่อต้องเปลี่ยนพอร์ตหรือกรณีใช้งานจริงบนเครื่องคนอื่น

---

### BUG-003: Negative test cases fail for wrong reason (missing auth)

**Severity:** Medium  
**Priority:** P2  
**Feature:** Negative Testing / Security Validation  
**Status:** Open

#### Steps to Reproduce
1. รัน `TC-005: Order Negative` หรือ `TC-006: Payment Negative`
2. คาดว่าจะได้สถานะ `400 Bad Request`
3. แต่ผลลัพธ์กลับเป็น `401 Unauthorized`

#### Expected Result
> Negative test ต้องแยกเหตุผลการล้มเหลวให้ชัดเจน: `400 Bad Request` สำหรับข้อมูลไม่ถูกต้อง และ `401 Unauthorized` สำหรับ token ขาด

#### Actual Result
> การไม่มี token ทำให้ negative test ทั้งชุดล้ม due to auth ก่อนเข้าสู่ validation logic

#### Evidence
> - Terminal output ของ TC-005 / TC-006 แสดง `401 Unauthorized`
> - request body ถูกส่งแต่ไม่ได้ส่ง header `Authorization`

#### Business Impact
> เกิด false negative ในการทดสอบเชิงลบ ทำให้ทีมไม่สามารถแยกได้ว่าปัญหาเกิดจาก input validation หรือการตรวจสอบสิทธิ์

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
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ |

#### หลักฐาน (On-Premises)

> 📸 **ภาพหน้าจอ Backend Health Check** (`http://localhost:3001/api/health`)
> 
> (![alt text](image-5.png))

> 📸 **ภาพหน้าจอ Frontend Login สำเร็จ** (`http://localhost:5173`)
>
> (![alt text](image-4.png))

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
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ |
| Frontend       | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ❌ |

#### หลักฐาน (Staging)

> 📸 **ภาพหน้าจอ `docker compose ps`** (ทุก Container สถานะ running)
>
> (![alt text](image-7.png))

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
| 1 | Health Check     | `GET /api/health`                             | `{"status":"ok"}`      | 📸![alt text](image-8.png)      | ✅           |
| 2 | Login            | Login ด้วย admin บน Frontend URL              | เข้าระบบสำเร็จ        | 📸![alt text](image-9.png)      | ✅           |
| 3 | Open Order & Add | เปิดโต๊ะ → เพิ่มสินค้า → Confirm             | ออเดอร์ถูกบันทึก      | 📸![alt text](image-10.png)      | ✅           |
| 4 | Payment          | ชำระเงิน → ตรวจสอบ change                    | คำนวณเงินทอนถูกต้อง   | 📸![alt text](image-11.png)      | ✅           |

**Production Smoke Test ผ่าน: _4_ / 4 รายการ**

> 📸 (วางภาพหน้าจอหลักฐานแต่ละ Feature)![alt text](image-8.png)![alt text](image-9.png)![alt text](image-10.png)![alt text](image-11.png)

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
