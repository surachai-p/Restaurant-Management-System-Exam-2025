# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล: นายวัฒนพงศ์ พรหมภิราม 
> รหัสนักศึกษา: 68030265  
> วันที่สอบ: 08/05/2569

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
| OS             | Windows 11 
| Node.js        | 24.14.0                             |
| npm            | 11.9.0               |
| Docker         | 29.2.1               |
| PostgreSQL     | 16 (Neon.tech)                     |
| Browser        | Chrome           |
| Newman         | 6.2.2              |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria (เงื่อนไขเริ่มทดสอบ)
- [x] Repository ถูก Clone และรัน Backend + Frontend ได้
- [x] Database เชื่อมต่อ Neon.tech สำเร็จ
- [x] `/api/health` ตอบกลับ `{"status":"ok"}`
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
| <!-- เพิ่มอย่างน้อย 2 รายการ --> | | | |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี)

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
| <!-- เพิ่มกรณีทดสอบ --> | | | | | | | |

**สรุปผล:** ผ่าน 10 / 11 กรณี (90.9%)

---

## Test Reports

> **ส่วนที่ 3 (ต่อ) — ผลการรัน Newman**

### Newman E2E Test Summary

```
Collection: RMS-[68030265]-TestSuite
Run Date:   2569-05-15 19:57

┌─────────────────────────┬──────────────────┐
│                         │         executed │
├─────────────────────────┼──────────────────┤
│              iterations │                1 │
│                requests │               21 │
│            test-scripts │               21 │
│      prerequest-scripts │                0 │
│              assertions │               26 │
├─────────────────────────┴──────────────────┤
│ total run duration:     6.2ms              │
│ total data received:    1.47kB             │
│ average response time:  263ms              │
└────────────────────────────────────────────┘
```

**Pass Rate:** 69 / 17 (75.36%)  
**Newman Report (HTML):** `./tests/reports/newman-report.html`

> 📸 วางภาพหน้าจอผลการรัน Newman ที่นี่

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
| <!-- ระบุรายละเอียด --> | | | | | |

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
| High     | 0      |
| Medium   | 0      |
| Low      | 0      |
| **รวม**  | **0**  |

---

## Bug Reports

> **ส่วนที่ 3 — รายงานข้อบกพร่อง (≥ 2 Bug)**

---

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

---

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
> ![alt text](image.png)

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
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok"}` | ⬜ |
| Frontend       | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ⬜ |

#### หลักฐาน (Staging)

> 📸 **ภาพหน้าจอ `docker compose ps`** (ทุก Container สถานะ running)
>
> ![alt text](image-2.png)

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

**Production Smoke Test ผ่าน: ___ / 4 รายการ**

> 📸 (วางภาพหน้าจอหลักฐานแต่ละ Feature)

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
