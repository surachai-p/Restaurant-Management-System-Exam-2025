# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | ประภาภรณ์ ภูผาลี |
| รหัสนักศึกษา | 68030159 |
| วันที่สอบ | 28/05/69 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/ccxxk16/Restaurant-Management-System-Exam-2025.git`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend | Node.js 22 LTS + Express + TypeScript |
| Database | PostgreSQL 16 (Neon.tech) |
| ORM | Prisma |
| Testing | Vitest (Unit) + Newman (E2E) |
| Container | Docker / Docker Compose |
| CI/CD | GitHub Actions |

---

## Production URLs

**✏️ แทนที่ URL placeholder ด้วย URL จริงหลัง Deploy เสร็จ แล้วเปลี่ยนสถานะเป็น ✅ หรือ ❌**

| Service | URL (กรอก URL จริง) | สถานะ |
|---------|---------------------|-------|
| Frontend (Vercel) | https://rms-2025.vercel.app | / |
| Backend (Render) |https://restaurant-management-system-exam-2025-r1cw.onrender.com/api/health | / |
| API Health Check (`/api/health`) | https://rms-2025.vercel.app/api/health | / |
| Database (Neon.tech connection string) | postgresql://neondb_owner:npg_uN98ROlCFHqE@ep-cool-fog-aoi1f7fv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require | / |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth |  เพื่อความปลอดภัยของข้อมูลผู้ใช้ และมั่นใจว่ากระบวนการสมัครสมาชิก/ล็อกอิน (รวมถึง Social Login) ทำงานถูกต้อง |
| Menu | ค้นหาและคัดกรองสินค้า/บริการได้ถูกต้อง ไม่สะดุด เพราะเป็นจุดแรกที่ส่งผลต่อ User Experience (UX) |
| Order | เพื่อเช็กว่าสถานะของออเดอร์อัปเดตถูกต้องตามระบบ 
| Payment | ป้องกันความผิดพลาดทางการเงินและสร้างความน่าเชื่อถือ ตรวจสอบการเชื่อมต่อกับ Third-party Payment Gateway (เช่น บัตรเครดิต, QR Code, TrueMoney) ว่าตัดเงินสำเร็จและส่งสถานะกลับมาถูกต้อง |
| Report | เพื่อให้ผู้บริหารหรือแอดมินนำข้อมูลไปใช้ตัดสินใจทางธุรกิจได้อย่างถูกต้อง ข้อมูลในรายงาน (ยอดขาย, ออเดอร์คงค้าง) ต้องตรงกับฐานข้อมูลจริง |
| Security | ป้องกันการโจมตีพื้นฐาน เช่น SQL Injection หรือ Cross-Site Scripting (XSS) ที่อาจทำให้ระบบล่มหรือข้อมูลรั่วไหล |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
|Multi-currency Support (การรองรับสกุลเงินต่างประเทศ) |ระบบออกแบบมาเพื่อซื้อขายและรองรับเฉพาะสกุลเงินบาท (THB) เท่านั้น จึงยังไม่มีการทดสอบอัตราแลกเปลี่ยน |
|Data Migration |ระบบนี้เป็นการพัฒนาขึ้นมาใหม่ทั้งหมด (Greenfield Project) และไม่มีฐานข้อมูลจากระบบเดิมที่ต้องทำการโอนย้ายข้อมูล |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ทดสอบฟังก์ชันการทำงานแยกเป็นส่วนๆ |
| API Testing (E2E) | Postman / Newman |ใช้ Newman (CLI Tool) เพื่อรันคอลเลกชันการทดสอบนี้โดยอัตโนมัติใน Pipeline ของ CI/CD เมื่อมีการอัปเดตโค้ด |
| Security Testing | npm audit | รันคำสั่งตรวจหาช่องโหว่ความปลอดภัย |
| Smoke Testing | Manual | ทดสอบแบบด่วนด้วยตนเองทันทีหลัง Deploy บน Environment ใหม่ |
| Staging Test | Docker Compose | รัน Frontend, Backend, Database, และ Cache (Redis) ร่วมกันผ่าน Docker เพื่อให้มั่นใจว่าการตั้งค่าเน็ตเวิร์กและ Environment Variables ทำงานประสานกันได้อย่างถูกต้อง |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | window |
| Node.js | v22.22.2 |
| npm | 10.9.7 |
| Docker | 29.2.1 |
| PostgreSQL | 16 (Neon.tech) |
| Browser | microsofe edge |
| Newman | 6.2.2 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
- [ /] Repository ถูก Clone และรัน Backend + Frontend ได้
- [/ ] Database เชื่อมต่อ Neon.tech สำเร็จ
- [ /] `/api/health` ตอบกลับ `{"status":"ok"}`
- [/ ] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 85 % |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Order-taking & Kitchen Display System  |  หากระบบล่มหรือส่งข้อมูลออเดอร์ผิดพลาด/ดีเลย์ จะทำให้ทำอาหารผิดโต๊ะ, อาหารออกล่าช้า หรือออเดอร์ตกหล่น | Critical |
| 2 | Billing & Point of Sale (POS) Payment | หากคำนวณยอดเงินผิดพลาด (เช่น ส่วนลดไม่ทำงาน, คิดภาษีผิด) หรือเชื่อมต่อเครื่องรูดบัตร/QR Code ไม่ได้ จะทำให้ร้านสูญเสียรายได้ หรือถูกมองว่าไม่โปร่งใส | Critical |
| 3 | Authentication & Login | หากพนักงาน, แอดมิน หรือผู้จัดการร้านไม่สามารถล็อกอินเข้าระบบได้ จะทำให้ไม่สามารถเปิดโต๊ะ รับออเดอร์ หรือเช็กบิลใดๆ ได้เลย | Critical |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | | / |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | | / |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET /api/orders (no Authorization header) | HTTP 401 Unauthorized | | / |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 1, amount: exactTotal}` | HTTP 200 + change = 0 | | / |
| TC-005 | Positive |Order |จองโต๊ะเพื่อสั่งรายกายอาหาร | {tableId: 5, items: [{menuId: 10, qty: 2}]}| HTTP 201 Created + Order ID | HTTP 201 สร้างออเดอร์สำเร็จ และอัปเดตสถานะเข้าครัว | / |
| TC-006 | Positive |Menu |ค้นหาเมนูด้วยคีย์เวิร์ด| GET /api/menus?search="fired rice "| HTTP 200 + รายการอาหารที่ตรงเงื่อนไข | HTTP 200 แสดงรายการเมนู "Fried rice" ถูกต้อง| / |
| TC-007 | Negative |Order |สร้างออเดอร์โดยไม่ใส่รายการอาหาร| {tableId: 5, items: []}| HTTP 400 Bad Request |HTTP 400 แสดงข้อความเตือน "Items cannot be empty" | / |
| TC-008 | Negative | Payment|ชำระเงินด้วยยอดเงินที่น้อยกว่าราคาสินค้า |{orderId: 1, amount: total - 50} | HTTP 400 Bad Request|HTTP 400 แสดงข้อความเตือน "Insufficient amount" | / |
| TC-009 | Security |Menu |พนักงานพยายามลบเมนูอาหาร (สิทธิ์ไม่ถึง) |DELETE /api/menus/10 |HTTP 403 Forbidden | HTTP 403 Forbidden ระบบปฏิเสธการลบเมนู| / |
| TC-010 | Security |Order | พยายามดึงข้อมูลออเดอร์ข้ามร้าน | GET /api/orders?id=1' OR '1'='1| HTTP 400 | HTTP 400 Bad Request ระบบกรองข้อมูลและป้องกันได้| / |
| TC-011 | Edge | Order |สั่งอาหารในจำนวนที่มากเกินไป | {tableId: 2, items: [{menuId: 4, qty: 999}]} | HTTP 400 หรือจำกัดจำนวนต่อออเดอร์ |HTTP 400 แสดงข้อความเตือน "Quantity exceeds maximum limit" |/|

**✏️ สรุปผล:** ผ่าน 11 / 11 กรณี (100%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `[รหัสนักศึกษา]` ด้วยรหัสจริง**

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-68030159-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030159-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env.json` |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | https://restaurant-management-system-exam-2025-r1cw.onrender.com | Base URL ของ Backend API |
| `{{token}}` | (JWT จาก Login ด้วย Cashier/Waiter) | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | (JWT จาก Login ด้วย Admin) | Request ที่ต้องการสิทธิ์ Admin |

#### pm.test Scripts ใน Collection
> ⚠️ ทุก Request ใน Collection ต้องมี `pm.test(...)` ตรวจสอบ Response  
> ตัวอย่าง:
> ```javascript
> pm.test("Status code is 200", function () {
>     pm.response.to.have.status(200);
> });
> pm.test("Response has JWT token", function () {
>     const jsonData = pm.response.json();
>     pm.expect(jsonData).to.have.property('token');
> });
> ```

**✏️ ยืนยันว่าทุก Request มี pm.test แล้ว:** ☐ ใช่

#### สรุปผลการรัน Postman (กรอกหลังรัน Collection Run)

**✏️ กรอกผลจริงจาก Postman Collection Runner**

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| | | | | ☐ |
| | | | | ☐ |
| | | | | ☐ |

**✏️ สรุป:** ผ่าน ___ / ___ Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

![Postman Collection + Env Vars](./img/environtment.png)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

`![Postman Run Result](./tests/reports/postman-run-result.png)`

---

### Newman E2E Test Summary

#### คำสั่งรัน Newman

```bash
# ติดตั้ง Newman (ถ้ายังไม่ได้ติดตั้ง)
npm install -g newman newman-reporter-htmlextra

# รัน Collection
newman run tests/postman/RMS-[รหัสนักศึกษา]-TestSuite.json \
    --environment tests/postman/env.json \
    --reporters cli,htmlextra \
    --reporter-htmlextra-export tests/reports/newman-report.html
```

#### ผลการรัน Newman (Local)

**✏️ วาง output จาก Terminal ที่ได้หลังรัน Newman แทนที่ข้อความ template ด้านล่างทั้งหมด**

```
[วาง Newman CLI output จริงที่นี่]
```

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests | |
| Tests Passed | |
| Tests Failed | |
| Pass Rate | % |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

`![Newman Run Result](./tests/reports/newman-cli-result.png)`

---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ☐ |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ☐ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ☐ |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ☐ |

**✏️ Newman Pass Rate จาก CI/CD:** ___ / ___ (___%)

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

`![CI Pipeline Newman](./tests/reports/ci-pipeline-newman.png)`

---

## Security Scan Report

> ส่วนที่ 3.4 — Rubric 1.7: รันทั้ง Backend + Frontend + บันทึกผล + ระบุ CVE + เพิ่มใน CI

### Backend Security Scan

```bash
cd backend && npm audit --audit-level=moderate
```

**✏️ กรอกจำนวนช่องโหว่จริงที่พบ (ถ้าไม่มีให้ใส่ 0)**

| Severity | จำนวน |
|----------|-------|
| Critical | |
| High | |
| Medium | |
| Low | |
| **รวม** | |

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
| | | | | | |

**รูปที่ 5 — ผล npm audit Backend**

`![Backend npm audit](./tests/reports/npm-audit-backend.png)`

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

**✏️ กรอกจำนวนช่องโหว่จริงที่พบ**

| Severity | จำนวน |
|----------|-------|
| Critical | |
| High | |
| Medium | |
| Low | |
| **รวม** | |

**รูปที่ 6 — ผล npm audit Frontend**

`![Frontend npm audit](./tests/reports/npm-audit-frontend.png)`

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ☐ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

`![CI Security Scan](./tests/reports/ci-security-scan.png)`

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: [✏️ ชื่อ Bug สั้น ๆ อธิบายปัญหา]

| รายการ | ค่า |
|--------|-----|
| **Severity** | (เลือก: Critical / High / Medium / Low) |
| **Priority** | (เลือก: P1 / P2 / P3) |
| **Feature** | |
| **Status** | (เลือก: Open / Fixed) |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. 
2. 
3. 

#### Expected Result
> ✏️ 

#### Actual Result
> ✏️ 

#### Evidence

`![BUG-001](./tests/reports/bug-001.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร

---

### BUG-002: [✏️ ชื่อ Bug สั้น ๆ อธิบายปัญหา]

| รายการ | ค่า |
|--------|-----|
| **Severity** | (เลือก: Critical / High / Medium / Low) |
| **Priority** | (เลือก: P1 / P2 / P3) |
| **Feature** | |
| **Status** | (เลือก: Open / Fixed) |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. 
2. 
3. 

#### Expected Result
> ✏️ 

#### Actual Result
> ✏️ 

#### Evidence

`![BUG-002](./tests/reports/bug-002.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร

---

## Deployment Guide

> ส่วนที่ 4 & 5 — คู่มือการติดตั้ง

### Prerequisites

| รายการ | เวอร์ชันที่ต้องการ |
|--------|------------------|
| Node.js | 22 LTS |
| Git | ล่าสุด |
| Docker | ล่าสุด |
| Docker Compose | v2+ |

---

### Local Setup (Docker Compose + Manual)

#### On-Premises Setup
> **ส่วนที่ 4.1 — ติดตั้งบนเครื่องตนเองในรูปแบบ On-Premises Server (8 คะแนน)**

**ขั้นตอนการติดตั้ง:**

```bash
# 1. Clone Repository
git clone https://github.com/[รหัสนักศึกษา]/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025

# 2. ตั้งค่า Environment Variables (Backend)
cp backend/.env.example backend/.env
# เปิดไฟล์ backend/.env แล้วกรอกค่า:
#   DATABASE_URL=postgresql://...
#   JWT_SECRET=...
#   CORS_ORIGIN=http://localhost:5173
#   NODE_ENV=development

# 3. รัน Backend (Port 3001)
cd backend && npm install && npm run dev

# 4. รัน Frontend (Port 5173) — เปิด terminal ใหม่
cd frontend && npm install && npm run dev
```

> ⚠️ **หมายเหตุเรื่อง Port**:
> - **Local / On-Premises**: ขั้นตอนกำหนด Port 3001 แต่ URL หลักฐานในข้อสอบระบุ `localhost:3000/api/health` ให้ตรวจสอบค่า `PORT` ใน `backend/.env.example` ของ Repository จริง แล้วใช้ port ที่ระบบรันจริง
> - **Render.com**: Backend รันบน **Port 10000** เสมอ (กำหนดใน `render.yaml` และ Render Dashboard) — `VITE_API_URL` ใช้ `https://[api].onrender.com` โดยไม่ต้องระบุ port

#### การตั้งค่า Service / Port จริงที่ใช้ (Rubric 2.1 ข้อ 2)

**✏️ กรอกค่าจริงที่ตั้งบนเครื่องของตนเอง**

| Service | Port ที่รันจริง | ค่า CORS_ORIGIN ที่ตั้ง | ค่า VITE_API_URL ที่ตั้ง |
|---------|---------------|------------------------|------------------------|
| Backend API |  3001    | http://localhost:5173 | — |
| Frontend | 5173 | — | /api|

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:[port]/api/health` | `{"status":"ok"}` | / |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | / |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

![On-Premises Backend Health](./img/backend-health.png)

**รูปที่ 9 — Frontend Login สำเร็จ**

![On-Premises Frontend Login](./img/frontend-login.png)

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- [ / ] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [ / ] กำหนด Port Mapping: backend → 3001, frontend → 80
- [ / ] เพิ่ม Health Check สำหรับ backend service
- [ / ] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | postgresql://neondb_owner:npg_uN98ROlCFHqE@ep-cool-fog-aoi1f7fv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | http://localhost:5173 |
| `NODE_ENV` | backend | production |
| `VITE_API_URL` | frontend | /api |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | มี   | deps - builder - runner            |
| Frontend | มี |        builder - runner            |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

![Multi-stage Dockerfile](./img/multi_stage_backend.png)`
![Multi-stage Dockerfile](./img/muiti_stage_frontend.png)`

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| ไม่มี Volume mapping|     -     |       -        |      -      |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| rms-network	 | bridge	| db, backend, frontend |

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

**✏️ ทดสอบหลัง `docker compose up` สำเร็จ**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | / |
| Frontend | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | / |

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

![Docker Compose PS](./img/contianer_running.png)

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**


postgresql://neondb_owner:****************@ep-cool-fog-aoi1f7fv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

---

### Render + Vercel Deployment Steps
> ส่วนที่ 5.2 & 5.3

#### Backend บน Render.com

> 📌 Repository มีไฟล์ `render.yaml` ที่ root — สามารถใช้ **New Blueprint** บน Render Dashboard เพื่อ Deploy อัตโนมัติจากไฟล์นี้แทนการตั้งค่าทีละอย่าง

```
Build Command:  docker build -t rms-backend ./backend
Dockerfile:     ./backend/Dockerfile
PORT:           10000  ← Render กำหนดให้ใช้ port นี้สำหรับ Docker service
```

> ⚠️ **PORT บน Render = 10000** เสมอ ไม่ใช่ 3001 — ต้องตั้งค่า `PORT=10000` ใน Environment Variables บน Render Dashboard ด้วย

#### Frontend บน Vercel

```
Root Directory: frontend
Framework:      Vite
Build Command:  npm run build
```

---

### Environment Variables Table

**✏️ กรอก URL จริงที่ได้หลัง Deploy (ใช้สำหรับตั้งค่าใน Render และ Vercel)**

|    Variable    |     Service      |            ค่าที่ตั้งจริงบน Cloud               |
|----------------|------------------|-------------------------------------------|
| `PORT`         | Backend (Render) |                 `10000`                    |
| `DATABASE_URL` | Backend (Render) | postgresql://neondb_owner:npg_uN98ROlCFHqE@ep-cool-fog-aoi1f7fv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require                                         |
| `JWT_SECRET`   | Backend (Render) |           (ตั้งค่าแล้ว — ไม่ระบุ)               |
| `CORS_ORIGIN`  | Backend (Render) |      https://rms-2025.vercel.app          |
| `NODE_ENV`     | Backend (Render) |               production              |
| `VITE_API_URL` | Frontend (Vercel) | https://restaurant-management-system-exam-2025-r1cw.onrender.com/api |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

**✏️ ทดสอบบน Production URL จริง แล้วกรอกผลและแนบภาพหลักฐาน**

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | / |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | / |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | / |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | / |

**✏️ Production Smoke Test ผ่าน:** ___ / 4 รายการ

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

![Smoke Test Health](./img/api_health_check.png)

**รูปที่ 13 — Smoke Test Feature 2: Login**

![Smoke Test Login](./img/rms_login.png)

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

![Smoke Test Order](./img/open_order.png)

**รูปที่ 15 — Smoke Test Feature 4: Payment**

![Smoke Test Payment](./img/payment.png)

---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขและทดสอบ Pipeline สำเร็จแล้ว**

- [ / ] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [ / ] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [ / ] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [ / ] เพิ่ม step ติดตั้งและรัน Newman 
- [ / ] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

### Newman Pass Rate จาก CI/CD Pipeline

**✏️ กรอกตัวเลขจาก GitHub Actions log หลัง Pipeline รันสำเร็จ**

| Metric | ค่าจริง |
|--------|--------|
| Total Tests | |
| Tests Passed | |
| Tests Failed | |
| **Pass Rate** | **%** |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

`![CI/CD Pipeline](./tests/reports/cicd-pipeline-success.png)`

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
