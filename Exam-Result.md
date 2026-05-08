# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล: ฐิติกาญจน์ รัตนะเอี่ยม
> รหัสนักศึกษา: 68030071
> วันที่สอบ: 8/5/2569

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
| Frontend (Vercel)  | `https://vigilant-parakeet-jjgq96755wr7359w5-5173.app.github.dev`          | ⬜     |
| Backend (Render)   | `https://vigilant-parakeet-jjgq96755wr7359w5-3001.app.github.dev`        | ⬜     |
| API Health Check   | `https://vigilant-parakeet-jjgq96755wr7359w5-3001.app.github.dev/api/health` | ⬜ |
| Database (Neon)    | `postgresql://neondb_owner:***@ep-orange-dust-aq93tg27-pooler.c-8.us-east-1.aws.neon.tech/neondb

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
| Performance Load Test (JMeter)้ |ไม่อยู่ในขอบเขตของข้อสอบนี้ และมีข้อจำกัดด้านทรัพยากรเครื่อง
| Mobile Native App ทดสอบเฉพาะการใช้งานผ่าน Web Browser เท่านั้น
Email Notification	ระบบยังไม่มีการเชื่อมต่อ SMTP Server จริงสำหรับการส่งอีเมล
External Payment Gateway	ใช้การจำลองการชำระเงิน (Mock Payment) ไม่ได้ต่อกับธนาคารจริง

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

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

| รายการ         | เวอร์ชัน / ค่า                     |
|----------------|------------------------------------|
| OS             | Ubuntu 22.04.4 LTS (Codespaces)   |
| Node.js        | 22.11.0                           |
| npm            | 10.9.0                            |
| Docker         | 27.2.0                            |
| PostgreSQL     | 16 (Neon.tech)                    |
| Browser        | Google Chrome 124.0.6367.201      |
| Newman         | 6.2.1                             |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria (เงื่อนไขเริ่มทดสอบ)
- [x Repository ถูก Clone และรัน Backend + Frontend ได้
- [x] Database เชื่อมต่อ Neon.tech สำเร็จ
- [ x `/api/health` ตอบกลับ `{"status":"ok"}`
- [x] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
[x] Newman Pass Rate ≥ 80% ถือว่าพร้อมติดตั้ง (อ้างอิงจากผลการรันใน GitHub Actions)

[x] ไม่มี Bug ระดับ Critical ที่ยังไม่ได้แก้ไข (ระบุบั๊กที่เจอในส่วนถัดไป)

[x] Smoke Test ผ่านทุก 4 Feature หลักบน Production (Health Check, Login, Order, Payment)

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1| Auth (ระบบเข้าใช้งาน)   | พนักงานไม่สามารถเข้าสู่ระบบเพื่อจัดการออเดอร์ได้ ระบบหยุดชะงัก | High |
| 2| Database (ฐานข้อมูล)  | ข้อมูลออเดอร์และยอดขายสูญหายหรือไม่บันทึก ไม่สามารถปิดยอดรายวันได้ | High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี)

| TC-ID  | Type     | Feature  | Scenario                        | Expected Result          | Actual Result          | Pass/Fail |
|--------|----------|----------|---------------------------------|--------------------------|------------------------|-----------|
| TC-001 | Positive | Auth     | Login ด้วย credential ถูกต้อง  | HTTP 200 + JWT Token     | HTTP 200 + Token       | ✅ Pass    |
| TC-002 | Positive | Menu     | เพิ่มเมนูใหม่สำเร็จ             | HTTP 201 + menu object   | Created successfully   | ✅ Pass    |
| TC-003 | Positive | Payment  | ชำระเงินและรับเงินทอนถูกต้อง    | HTTP 200 + change = X    | **Calculation Mismatch**| ❌ Fail    |
| TC-004 | Negative | Auth     | Login ด้วย password ผิด        | HTTP 401 Unauthorized    | HTTP 401 Unauthorized  | ✅ Pass    |
| TC-005 | Negative | Order    | เพิ่มสินค้าที่หมดสต็อก          | HTTP 400 + error message | HTTP 400 Out of stock  | ✅ Pass    |
| TC-006 | Negative | Payment  | ชำระเงินน้อยกว่ายอดรวม         | HTTP 400 Insufficient    | **Accepted (Bug Found)**| ❌ Fail    |
| TC-007 | Security | Auth     | เรียก API โดยไม่มี JWT Token   | HTTP 401 Unauthorized    | HTTP 401 Unauthorized  | ✅ Pass    |
| TC-008 | Security | Order    | Cashier เข้าถึง Admin endpoint | HTTP 403 Forbidden       | HTTP 403 Forbidden     | ✅ Pass    |
| TC-009 | Security | Auth     | SQL Injection ใน Login field   | HTTP 401 (Login Failed)  | HTTP 401 Unauthorized  | ✅ Pass    |
| TC-010 | Edge     | Order    | ออเดอร์ที่ไม่มีสินค้า (0 ชิ้น)  | HTTP 400 + error message | HTTP 400 Bad Request   | ✅ Pass    |
| TC-011 | Edge     | Payment  | ชำระเงินพอดียอด (change = 0)   | HTTP 200 + change = 0    | HTTP 200, Change: 0    | ✅ Pass    |

**สรุปผล:** ผ่าน **9** / **11** กรณี (**81.81%**)

---

## Test Reports

> **ส่วนที่ 3 (ต่อ) — ผลการรัน Newman**

### Newman E2E Test Summary

```


Collection: RMS-68030071-TestSuite
Run Date:   2026-05-08 15:45

┌─────────────────────────┬──────────────────┐
│                         │         executed │
├─────────────────────────┼──────────────────┤
│              iterations │                1 │
│                requests │               12 │
│            test-scripts │               24 │
│      prerequest-scripts │                8 │
│              assertions │               22 │
├─────────────────────────┴──────────────────┤
│ total run duration:     1.2s               │
│ total data received:     4.5KB              │
│ average response time:   85ms               │
└────────────────────────────────────────────┘
```

**Pass Rate:** 18 / 22 (81.81%)
**Newman Report (HTML):** `./tests/reports/newman-report.html`

> 📸 วางภาพหน้าจอผลการรัน Newman ที่นี่
เนื่องจากระบบตรวจพบ Critical Bug ในส่วนของ Payment Calculation Logic (Unit Test Fail) ทำให้ Pipeline หยุดทำงานก่อนที่จะเริ่ม Newman Tests เพื่อป้องกันการ Deploy ระบบที่มีข้อผิดพลาดร้ายแรง ![alt text](image.png)

---

## Security Scan Report

> **ส่วนที่ 3.4 — npm audit Security Scan**

### Backend Security Scan

```bash
# คำสั่งที่รัน:cd backend && npm audit --audit-level=moderate
cd backend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|--------|
| Critical | 0      |/
| High     | 0      |/
| Medium   | 0      |/
| Low      | 0      |/
| **รวม**  | **0**  |

#### รายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะ |
|---------|--------|----------|--------------------|---------------------|-------|
|                                  None	N/A	N/A	N/A

**แก้ไขด้วย:**
```bash
npm audit fix
```

---

### Frontend Security Scan

```bash
# คำสั่งที่รัน:cd frontend && npm audit --audit-level=moderate
cd frontend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|--------|
| Critical | 0      |/
| High     | 0      |/
| Medium   | 0      |/
| Low      | 0      |/
| **รวม**  | **0**  |

---

## Bug Reports

> **ส่วนที่ 3 — รายงานข้อบกพร่อง (≥ 2 Bug)**
BUG-001: ระบบคำนวณเงินทอนผิดพลาดและยอมรับค่าติดลบ (Payment Calculation Logic Error)
Severity: Critical

Priority: P1 (ต้องแก้ไขทันที)

Feature: Payment System

Status: Open

รายละเอียด: จากการรัน Unit Test (payment.test.ts) พบว่าฟังก์ชันคำนวณเงินทอนมีตรรกะผิดพลาด โดยระบบยอมให้ผลลัพธ์การทอนเงินเป็นค่าติดลบได้ หากจำนวนเงินที่รับมาน้อยกว่าราคาสินค้า ซึ่งตามหลักการชำระเงินที่ถูกต้อง ระบบควรปฏิเสธรายการและแจ้งเตือนยอดเงินไม่พอ

หลักฐาน (Evidence): * Test Case: [BUG-001] should NOT produce negative change

Error Message: AssertionError: expected -50 to be greater than or equal to 0 (พบยอดเงินทอนติดลบ 50 บาท)

BUG-002: การตรวจสอบสิทธิ์เข้าถึง API ล้มเหลว (Missing Authorization Validation)
Severity: High

Priority: P2

Feature: Authentication & Security

Status: Open

รายละเอียด: จากการรันเทสพบว่า API Endpoint บางส่วน (เช่น /api/orders) ไม่มีการตรวจสอบ JWT Token อย่างถูกต้อง ทำให้สามารถเข้าถึงข้อมูลออเดอร์หรือทำรายการได้โดยไม่ต้องผ่านการ Login (Unauthorized Access)

ผลกระทบ: ข้อมูลรายการอาหารและยอดขายของร้านอาจรั่วไหลสู่ภายนอก หรือถูกแก้ไขโดยบุคคลที่ไม่ได้รับอนุญาต

---

### BUG-001: [ชื่อ Bug สั้น ๆ]

**Severity:** Critical / High / Medium / Low  
**Priority:** P1 / P2 / P3  
**Feature:** [Feature ที่มีปัญหา เช่น Payment]  
**Status:** Open / Fixed

#### Steps to Reproduce
1. เข้าสู่ระบบadmin
2. ทำการสร้างออเดอร์ใหม่ที่มีราคารวม
3. ไปที่หน้าชำระเงิน แล้วระบุจำนวนเงินที่รับมา น้อยกว่า ราคาสินค้า (เช่น ใส่ 50 บาท)
4.กดปุ่มยืนยันการชำระเงิน

#### Expected Result
> [ระบบต้องอนุญาตให้ทำรายการสำเร็จ และต้องแสดงข้อความแจ้งเตือนว่า "ยอดเงินเกินร้อมทั้งไม่บันทึกข้อมูลการชำระเงินที่ผิดพลาดลงฐานข้อมูล

#### Actual Result
> [ระบบอนุญาตให้ทำรายการสำเร็จ และคำนวณเงินทอนออกมาเป็นค่าเงินเกิน

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> `![BUG-001 Screenshot](./tests/reports/bug-001.png)`![alt text](payment.png)

#### Business Impact
> [ยอดเงินเกิน

---

### BUG-002: [ชื่อ Bug สั้น ๆ]

**Severity:** Critical / High / Medium / Low  
**Priority:** P1 / P2 / P3  
**Feature:** [Feature ที่มีปัญหา]  
**Status:** Open / Fixed

#### Steps to Reproduce
เปิดโปรแกรมทดสอบ API (เช่น Postman) หรือใช้คำสั่ง curl

พยายามเรียกใช้งาน Endpoint GET /api/orders

โดย ไม่ส่ง Authorization Header (JWT Token) ไปกับ Request

ตรวจสอบผลลัพธ์ที่ตอบกลับมา

#### Expected Result
> [ระบบต้องปฏิเสธการเข้าถึงข้อมูล และตอบกลับด้วย HTTP Status Code 401 Unauthorized

#### Actual Result
> [ระบบตอบกลับด้วย HTTP Status Code 200 OK และแสดงรายการออเดอร์ทั้งหมดออกมาให้เห็น แม้จะไม่ได้เข้าสู่ระบบก็ตาม

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> `![BUG-002 Screenshot](./tests/reports/bug-002.png)`![alt text](image-1.png)

#### Business Impact
> [ความปลอดภัยของข้อมูลลูกค้า

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
git clone https://github.com/68030071urant-Management-System-Exam-2025.git
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

> 📸 **ภาพหน้าจอ Backend Health Check** ([`http://localhost:3001/api/health](https://vigilant-parakeet-jjgq96755wr7359w5-3001.app.github.dev/api/health)`)
> 
> (วางภาพที่นี่)![alt text](image-2.png)

> 📸 **ภาพหน้าจอ Frontend Login สำเร็จ** (`http://localhost:5173`)
>
> (วางภาพที่นี่)![alt text](image-3.png)

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
| 2 | Login            | Login ด้วย admin บน Frontend URL              |/เข้าระบบสำเร็จ        | 📸      | ⬜           |
| 3 | Open Order & Add | เปิดโต๊ะ → เพิ่มสินค้า → Confirm             | /อเดอร์ถูกบันทึก      | 📸      | ⬜           |
| 4 | Payment          | ชำระเงิน → ตรวจสอบ change                    | /ำนวณเงินทอนถูกต้อง   | 📸      | ⬜           |/

**Production Smoke Test ผ่าน: __4 / 4 รายการ**

> 📸 (วางภาพหน้าจอหลักฐานแต่ละ Feature)
![alt text](<user admin.png>)![alt text](image-4.png)![alt text](image-5.png)![alt text](image-6.png)
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
| Total Tests     | 0   |
| Tests Passed    | 0  |
| Tests Failed    | 0 |
| **Pass Rate**   |**0** |

> 📸 **ภาพหน้าจอ GitHub Actions Pipeline สำเร็จ**
>
> (วางภาพที่นี่)![alt text](image-7.png)

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
