# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล: นางสาวปทิตญา ภูกิจคุณาเดชากร  
> รหัสนักศึกษา: 68030151  
> วันที่สอบ: 08/05/2569

---

## Project Overview

> ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**Student Fork / Repo:** `https://github.com/Ptitya/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel)  | `https://restaurant-frontend-delta-inky.vercel.app`          | ✅     |
| Backend (Render)   | `https://restaurant-backend-ia1q.onrender.com`        | ✅     |
| API Health Check   | `https://restaurant-backend-ia1q.onrender.com/api/health` | ✅ |
| Database (Neon)    | `postgresql://neondb_owner:npg_pYKF58nvkMSm@ep-nameless-breeze-aos2r6sq-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`      | ✅     |

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
| <!-- เพิ่มเติม --> Security Penetration Test | การเจาะระบบต้องใช้เครื่องมือและทีมเฉพาะ ไม่ครอบคลุมการสอบ |
| <!-- เพิ่มเติม --> Cloud Deployment (Production) | แม้มีการใช้ Neon/Vercel แต่การสอบไม่ครอบคลุมการ deploy แบบ production-scale หรือ multi-cloud integration |
| <!-- เพิ่มเติม --> Third-Party Payment Gateway | ใช้ mock data ไม่เชื่อมต่อระบบจริง |
| <!-- เพิ่มเติม --> Data Migration | ไม่ครอบคลุมการย้ายข้อมูลจากระบบเก่าเข้าสู่ระบบใหม่ |
| <!-- เพิ่มเติม --> Backup & Disaster Recovery | การสอบไม่ทดสอบการกู้คืนระบบหรือการจัดการเมื่อระบบล่ม |

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
| OS             | Windows 11  |
| Node.js        | 22 LTS                             |
| npm            | 11.9.0               |
| Docker         | Docker version 29.4.3, build 055a478|
| PostgreSQL     | 16 (Neon.tech)                     |
| Browser        | Chrome 148           |
| Newman         | 6.2.2               |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria (เงื่อนไขเริ่มทดสอบ)
- [✅] Repository ถูก Clone และรัน Backend + Frontend ได้
- [✅] Database เชื่อมต่อ Neon.tech สำเร็จ
- [✅] `/api/health` ตอบกลับ `{"status":"ok"}`
- [✅] Postman Collection พร้อมสำหรับ Newman

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
| 3 | Inventory (สต๊อกสินค้า)      | สต๊อกไม่อัปเดต ทำให้วัตถุดิบหมดโดยไม่รู้ หรือขายเกินสต๊อก | High |
| 4 | Authentication/Login      | พนักงานเข้าระบบไม่ได้ หรือมีการเข้าถึงโดยไม่ได้รับอนุญาต | Critical |
| 5 | Table Management (การจัดการโต๊ะ)     | โต๊ะไม่ถูกจองหรือปล่อยว่างผิดพลาด ทำให้ลูกค้ารอนานหรือเกิดความสับสน | Medium |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี)

| TC-ID   | Type     | Feature  | Scenario                        | Input                                             | Expected Result          | Actual Result | Pass/Fail |
|---------|----------|----------|---------------------------------|---------------------------------------------------|--------------------------|---------------|-----------|
| TC-001  | Positive | Auth     | Login ด้วย credential ถูกต้อง  | `{username: "admin", password: "Admin@123"}`      | HTTP 200 + JWT Token     |       ตามคาด        | ✅        |
| TC-002  | Positive | Menu     | เพิ่มเมนูใหม่สำเร็จ            | `{name: "ข้าวผัด", price: 60, stock: 100}`        | HTTP 201 + menu object   |       ตามคาด       | ✅        |
| TC-003  | Positive | Payment  | ชำระเงินและรับเงินทอนถูกต้อง   | `{orderId: 1, amount: 200}`                       | HTTP 200 + change = X    |       ตามคาด        | ✅        |
| TC-004  | Negative | Auth     | Login ด้วย password ผิด        | `{username: "admin", password: "wrong"}`          | HTTP 401 Unauthorized    |       ตามคาด        | ✅        |
| TC-005  | Negative | Order    | เพิ่มสินค้าที่หมดสต็อก         | `{menuId: 99, quantity: 999}`                     | HTTP 400 + error message |       ตามคาด        | ✅        |
| TC-006  | Negative | Payment  | ชำระเงินน้อยกว่ายอดรวม        | `{orderId: 1, amount: 10}`                        | HTTP 400 Insufficient    |        ตามคาด       | ✅        |
| TC-007  | Security | Auth     | เรียก API โดยไม่มี JWT Token   | GET /api/orders (no header)                       | HTTP 401 Unauthorized    |        ตามคาด       | ✅        |
| TC-008  | Security | Order    | Cashier เข้าถึง Admin endpoint | Token ของ Cashier + DELETE /api/menu/1            | HTTP 403 Forbidden       |        ตามคาด       | ✅        |
| TC-009  | Security | Auth     | SQL Injection ใน Login field   | `{username: "' OR 1=1 --", password: "x"}`        | HTTP 401 (ไม่ผ่าน Login) |        ตามคาด       | ✅        |
| TC-010  | Edge     | Order    | ออเดอร์ที่ไม่มีสินค้า (0 ชิ้น) | `{tableId: 1, items: []}`                         | HTTP 400 + error message |        ตามคาด       | ✅        |
| TC-011  | Edge     | Payment  | ชำระเงินพอดียอด (change = 0)   | `{orderId: 1, amount: exactTotal}`                | HTTP 200 + change = 0    |       ตามคาด        | ✅        |
| TC-012 | Positive | Stock | ตัดสต็อกสินค้าหลังชำระเงิน | ออเดอร์ "Americano" 2 แก้ว | สต็อกลดลงตามจำนวนที่สั่ง | ตามคาด | ✅ |
|TC-013 | Negative | Menu |เพิ่มเมนูที่ชื่อซ้ำกับที่มีอยู่ | `{name: "Espresso", ...}` (มีอยู่แล้ว) | HTTP 400 + "Duplicate name" | ตามคาด | ✅ |
|TC-014 | Security | Auth | ใช้ Expired Token เรียกใช้งาน | Token ที่หมดอายุแล้ว | HTTP 401 Unauthorized | ตามคาด | ✅ |
| TC-015 | Edge | Order | สั่งสินค้าจำนวนติดลบ | `{menuId: 1, quantity: -5}` | HTTP 400 + Validation Error | ตามคาด | ✅ |

**สรุปผล:** ผ่าน 15 / 15 กรณี (15%)

---

## Test Reports

> **ส่วนที่ 3 (ต่อ) — ผลการรัน Newman**

### Newman E2E Test Summary

```
Collection: RMS-TestSuite-v2
Run Date:   2026-05-15 19:37

┌─────────────────────────┬──────────────────┐
│                         │         executed │
├─────────────────────────┼──────────────────┤
│              iterations │                1 │
│                requests │               21 │
│            test-scripts │               21 │
│      prerequest-scripts │                0 │
│              assertions │               26 │
├─────────────────────────┴──────────────────┤
│ total run duration:     3.2s               │
│ total data received:    5.38kB             │
│ average response time:  75ms               │
└────────────────────────────────────────────┘
```

**Pass Rate:** 22 / 26 (84.61%)  
**Newman Report (HTML):** `./tests/reports/newman-report.html`

> 📸 วางภาพหน้าจอผลการรัน Newman ที่นี่ 
![alt text](image10.png)

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
| High     | 9      |
| Medium   | 10      |
| Low      | 0      |
| **รวม**  | **20**  |

#### รายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะ |
|---------|--------|----------|--------------------|---------------------|-------|
| handlebars | GHSA-3mfm-83xf-c92rCritical | Critical | 4.0.0 - 4.7.8 | >= 4.7.9  | Fix available via --force |
| lodash | GHSA-xxjr-mmjv-4gpgHigh | High |<=4.17.23 | >= 4.17.21* | Fix available via --force |
| flatted | GHSA-25h7-pfq9-p65fHigh | High | <=3.4.1 | >= 3.4.2 | Fix available via --force |
| node-forge | GHSA-554w-wpv2-vw27High | High | <=1.3.3 | >= 1.3.4 | Fix available via --force |
| underscore | GHSA-qpx9-hpmf-5gmwHigh | High | <=1.13.7 | >= 1.13.8 | Fix available via --force |

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

### BUG-001:จ่ายเงินไม่เพียงพอแต่ระบบแจ้งข้อผิดพลาดไม่ถูกต้อง (Underpayment 404 Error)

**Severity:**  High 
**Priority:** P1  
**Feature:** Payment System
**Status:** Fixed

#### Steps to Reproduce
1.สร้างออเดอร์และกดยืนยันรายการอาหาร (Confirmed)

2.เรียกใช้งาน API POST /api/payments โดยระบุยอดเงินที่จ่าย (amountPaid) น้อยกว่ายอดรวมจริง (เช่น จ่าย 1 บาท จากยอด 150 บาท)

3.ตรวจสอบ HTTP Status Code ที่ได้รับจาก Server

#### Expected Result
> ระบบควรปฏิเสธรายการด้วย 400 Bad Request พร้อมข้อความแจ้งเตือนว่า "Insufficient payment amount"

#### Actual Result
> ระบบส่งค่ากลับมาเป็น 404 Not Found (หรือในบางกรณีอาจยอมให้ผ่านเป็น 201) ซึ่งทำให้ไม่สามารถระบุสาเหตุที่แท้จริงได้ว่าจ่ายเงินไม่ครบหรือหาข้อมูลไม่เจอ

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> `![BUG-001 Screenshot](./tests/reports/bug-001.png)`
![alt text](image7.png)

#### Business Impact
> ทำให้เกิดความเสี่ยงที่ร้านจะเสียรายได้หากพนักงานเข้าใจผิดว่าทำรายการสำเร็จ ทั้งที่ลูกค้าจ่ายเงินไม่ครบ และระบบจัดการสถานะออเดอร์ผิดพลาด

---

### BUG-002: ระบบสร้างออเดอร์ไม่ได้เนื่องจากสถานะโต๊ะขัดแย้ง (Order Creation Failure - 409 Conflict)

**Severity:** High  
**Priority:** P2 
**Feature:** Order Management  
**Status:** Fixed

#### Steps to Reproduce
1.เรียกใช้งาน API POST /api/orders เพื่อเปิดโต๊ะใหม่ (เช่น โต๊ะเบอร์ 5)

2.ตรวจสอบผลลัพธ์ในกรณีที่โต๊ะนั้นอาจจะมีข้อมูลเก่าค้างอยู่ใน Database หรือสถานะไม่เป็น Available

3.ตรวจสอบ HTTP Status Code ที่ได้รับ

#### Expected Result
> ระบบควรสร้างออเดอร์ใหม่สำเร็จ และส่งค่า 201 Created กลับมาพร้อม orderId เพื่อใช้ในขั้นตอนสั่งอาหารต่อไป

#### Actual Result
> ระบบส่งค่ากลับมาเป็น 409 Conflict ตั้งแต่การพยายามสร้างออเดอร์ครั้งแรก ทำให้ Newman ไม่สามารถดึง orderId ไปใช้ใน API อื่นๆ ได้ (ส่งผลให้ข้อถัดไปกลายเป็น 500 Error)

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> `![BUG-002 Screenshot](./tests/reports/bug-002.png)`
![alt text](image8.png)

#### Business Impact
> พนักงานไม่สามารถเปิดออเดอร์ใหม่ให้ลูกค้าได้ แม้จะเป็นการเริ่มรันระบบใหม่ ทำให้ระบบการสั่งอาหารทั้งหมดหยุดชะงัก และลูกค้าไม่สามารถสั่งอาหารได้
---

### BUG-003: ช่องโหว่ความปลอดภัย SQL Injection ในระบบค้นหาเมนู

**Severity:** Critical  
**Priority:** P1  
**Feature:** Menu Search 
**Status:** Fixed

#### Steps to Reproduce
1.เข้าไปที่ฟังก์ชันค้นหาเมนูอาหาร (Search Menu)

2.ใส่คำค้นหาที่เป็น SQL Command เช่น ' OR '1'='1 ผ่านทาง Query Parameter (?search=' OR '1'='1)

3.ตรวจสอบการตอบกลับจากระบบ
#### Expected Result
> ระบบควรทำการ Sanitize ข้อมูลหรือใช้ Parameterized Query เพื่อป้องกันคำสั่งแปลกปลอม และควรส่งค่ากลับเป็นรายการว่าง หรือ 400 Bad Request หากพบสัญลักษณ์ที่อันตราย

#### Actual Result
> ระบบพยายามประมวลผลคำสั่งนั้นจนเกิดข้อผิดพลาดภายใน และส่งค่ากลับมาเป็นรูปแบบ JSON ที่ไม่ถูกต้อง (JSONError: "undefined" is not valid JSON) ซึ่งแสดงว่าคำสั่ง SQL เข้าไปรบกวนการทำงานของ Database โดยตรง

#### Evidence
> 📸 วางภาพหน้าจอที่นี่  
> `![BUG-003 Screenshot](./tests/reports/bug-003.png)`
![alt text](image9.png)

#### Business Impact
> ผู้ไม่หวังดีอาจใช้ช่องโหว่นี้ในการดึงข้อมูลสำคัญออกจากฐานข้อมูล (Data Leakage) เช่น ข้อมูลพนักงาน ยอดขาย หรืออาจทำการลบข้อมูลทั้งหมดในระบบ (Drop Table) ทำให้ธุรกิจหยุดชะงักและเสียชื่อเสียงอย่างรุนแรง
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
> (วางภาพที่นี่) 
![alt text](image.png)
> 📸 **ภาพหน้าจอ Frontend Login สำเร็จ** (`http://localhost:5173`)
>
> (วางภาพที่นี่)
![image1.png](image1.png)
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
| Frontend       | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ✅ |

#### หลักฐาน (Staging)

> 📸 **ภาพหน้าจอ `docker compose ps`** (ทุก Container สถานะ running)
>
> (วางภาพที่นี่)
![alt text](image2.png)
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
| 1 | Health Check     | `GET /api/health`                             | `{"status":"ok"}`      | 📸      | ✅ ผ่าน          |
| 2 | Login            | Login ด้วย admin บน Frontend URL              | เข้าระบบสำเร็จ        | 📸      | ✅ ผ่าน         |
| 3 | Open Order & Add | เปิดโต๊ะ → เพิ่มสินค้า → Confirm             | ออเดอร์ถูกบันทึก      | 📸      | ✅ ผ่าน         |
| 4 | Payment          | ชำระเงิน → ตรวจสอบ change                    | คำนวณเงินทอนถูกต้อง   | 📸      | ✅ ผ่าน      |

**Production Smoke Test ผ่าน: 4 / 4 รายการ**

> 📸 (วางภาพหน้าจอหลักฐานแต่ละ Feature)
![alt text](image3.png)
![alt text](image4.png)
![alt text](image5.png)
![alt text](image6.png)
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
| Tests Passed    | 21     |
| Tests Failed    | 0     |
| **Pass Rate**   | **100%** |

> 📸 **ภาพหน้าจอ GitHub Actions Pipeline สำเร็จ**
>
> (วางภาพที่นี่)
![alt text](image11.png)
![alt text](image12.png)
![alt text](image13.png)

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
