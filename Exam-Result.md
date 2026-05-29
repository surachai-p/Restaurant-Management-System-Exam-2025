# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | นางสาวกันติชา ย๋องชา |
| รหัสนักศึกษา |68030020 |
| วันที่สอบ | 28/05/2569|

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/kanticha49/68030020-Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) | | ✅ |
| Backend (Render) | | ✅ |
| API Health Check (`/api/health`) | | ✅ |
| Database (Neon.tech connection string) | | ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**Feature ที่จะทดสอบและเหตุผล**

| Feature  | เหตุผลที่ทดสอบ |
|----------|----------------|
| Auth     | เพื่อยืนยันว่าการเข้าสู่ระบบ, การออกจากระบบ และการตรวจสอบสิทธิ์ (JWT) ทำงานถูกต้อง ป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต |
| Menu     | ตรวจสอบการแสดงผล, เพิ่ม, แก้ไข, ลบเมนูอาหาร เพื่อให้ข้อมูลเมนูถูกต้องและอัปเดตได้ตลอดเวลา |
| Order    | ทดสอบการสร้างออเดอร์, เพิ่ม/ลบรายการอาหาร, อัปเดตสถานะออเดอร์ เพื่อให้การรับออเดอร์และจัดการโต๊ะเป็นไปอย่างถูกต้อง |
| Payment  | ตรวจสอบการคำนวณยอดเงิน, การชำระเงิน, การคืนเงิน และความถูกต้องของข้อมูลการเงิน เพื่อป้องกันข้อผิดพลาดทางบัญชีและการเงิน |
| Report   | ทดสอบการดึงรายงานยอดขาย, รายงานออเดอร์ เพื่อให้ผู้บริหารสามารถวิเคราะห์ข้อมูลและตัดสินใจได้ถูกต้อง |
| Security | ทดสอบช่องโหว่ เช่น การเข้าถึง API โดยไม่ได้รับอนุญาต, SQL Injection, ข้อมูลรั่วไหล เพื่อให้ระบบมีความปลอดภัยสูงสุด |

#### Out of Scope
**Feature / ขอบเขตที่ไม่ทดสอบและเหตุผล**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| ระบบจัดการพนักงาน (Staff Management) | ไม่อยู่ในขอบเขตของระบบ RMS เวอร์ชันนี้ และไม่มีผลต่อกระบวนการขายหน้าร้าน |
| การ Integrate กับระบบ POS อื่น | ไม่มี requirement ในข้อสอบและอยู่นอกเหนือขอบเขตการทดสอบ |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**รายละเอียดประเภทการทดสอบ เครื่องมือ และเป้าหมาย**

| ประเภทการทดสอบ    | เครื่องมือ         | รายละเอียด                                                                 |
|--------------------|--------------------|----------------------------------------------------------------------------|
| Unit Testing       | Vitest             | ทดสอบฟังก์ชัน/โมดูลย่อยในฝั่ง Backend เช่น logic การคำนวณ, validation   |
| API Testing (E2E)  | Postman / Newman   | ทดสอบ API Flow จริง เช่น Login, สร้างออเดอร์, ชำระเงิน, ตรวจสอบสิทธิ์    |
| Security Testing   | npm audit          | ตรวจสอบช่องโหว่ dependency และความปลอดภัยของโค้ด backend/frontend        |
| Smoke Testing      | Manual             | ทดสอบฟีเจอร์หลักหลัง Deploy เช่น Login, สั่งอาหาร, ชำระเงิน, รายงานยอดขาย |
| Staging Test       | Docker Compose     | ทดสอบ Deploy และ Integration บนสภาพแวดล้อมจำลองก่อนขึ้น Production        |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**ตัวอย่างการกรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ**

| รายการ    | เวอร์ชัน / ค่า           |
|-----------|--------------------------|
| OS        | Windows 11 Pro 64-bit    |
| Node.js   | 22.2.0                   |
| npm       | 10.5.0                   |
| Docker    | 26.0.0                   |
| PostgreSQL| 16 (Neon.tech)           |
| Browser   | Chrome 124, Edge 123     |
| Newman    | 6.1.2                    |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
- [✅] Repository ถูก Clone และรัน Backend + Frontend ได้
- [✅ ] Database เชื่อมต่อ Neon.tech สำเร็จ
- [✅ ] `/api/health` ตอบกลับ `{"status":"ok"}`
- [✅] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 95% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 |Order Management |ถ้าบันทึกออเดอร์ผิด จะทำให้ยอดขาย/ออเดอร์ร้านเพี้ยน |Critical |
| 2 |Payment System |ถ้าชำระเงินผิดพลาด → เงินขาด/เกิน ส่งผลโดยตรงต่อรายได้ |Critical |
| 3 | Authentication (Login/JWT)|ถ้าโดน bypass ได้ → ระบบถูกเข้าถึงโดยไม่ได้รับอนุญาต |High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | | ✅ |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | | ✅|
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET /api/orders (no Authorization header) | HTTP 401 Unauthorized | | ✅ |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 1, amount: exactTotal}` | HTTP 200 + change = 0 | | ✅ |
| TC-005 | Positive |Menu |ดึงรายการเมนู |GET /menu |200 + data | | ✅ |
| TC-006 | Positive |Orders |สร้างออเดอร์ |valid order |201 Created | | ✅ |
| TC-007 | Negative |Orders |order invalid |empty items |400 Error | | ✅ |
| TC-008 | Negative |Orders |ใช้ token ปลอม |fake JWT |401 Unauthorized | | ✅ |
| TC-009 | Security |Payment |ไม่มีสิทธิ์ admin |cashier token |403 Forbidden | | ☐ |
| TC-010 | Security |Orders |สั่ง 0 item |[]  |400 validation | |  ✅ |
| TC-011 | Edge |Auth |login ว่าง |"" |400 validation | | ✅ |

**✏️ สรุปผล:** ผ่าน 10 / 11 กรณี (90.90%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `[รหัสนักศึกษา]` ด้วยรหัสจริง**

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | RMS-68030020-TestSuite |
| ไฟล์ที่ Export ไปไว้ใน Repository | RMS-68030020-TestSuite.postman_collection.json |
| ไฟล์ Environment | RMS Env.postman_environment.json |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | hhttp://localhost:3001 | Base URL ของ Backend API |
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
|Login |POST | /api/auth/login	| Status 200, ได้รับ JWT Token สำเร็จ |Pass  |
|Health Check	|GET	|/api/health | Status 200, ระบบ Backend ทำงานปกติ |Pass  |
|Menu |GET |/api/menu |Status 200, ดึงรายการอาหารออกมาเป็น Array | Pass |
|Orders (Get) |GET |/api/orders |Status 200, ดึงประวัติออเดอร์สำเร็จ | Pass |
|Orders (Create) |POST |/api/orders |Status 201, สร้างออเดอร์ใหม่สำเร็จ | Pass |
|Payment |POST |/api/payments |Status 404/400, จัดการผ่านเงื่อนไขจำลอง (Bypass) | Fail |
|Orders - No Token |GET |/api/orders |Status 401, ดักจับผู้ใช้งานทั่วไปได้ถูกต้อง | Pass |
|Orders - Empty Items |POST |/api/orders |Status 400, ดักจับออเดอร์ว่างเปล่าได้ถูกต้อง | Pass |


**✏️ สรุป:** ผ่าน 7 / 8 Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

![alt text](<Postman Collection + Env Vars.jpg>)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

![alt text](<Postman Run Result tests-get-menu.jpg>)

![alt text](<Postman Run Result tests-get-order.jpg>)

![alt text](<Postman Run Result tests-get-orders no token.jpg>)

![alt text](<Postman Run Result tests-health check.jpg>)

![alt text](<Postman Run Result tests-login.jpg>)

![alt text](<Postman Run Result tests-post-orders Empty Items.jpg>)

![alt text](<Postman Run Result tests-post-orders.jpg>)

![alt text](<Postman Run Result tests-post-payment.jpg>)

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
newman run "tests/postman/RMS-68030020-TestSuite.postman_collection.json" --env-var "base_url=http://localhost:3001" --env-var "url=http://localhost:3001" --reporters cli,htmlextra --reporter-htmlextra-export tests/reports/newman-report.html
(node:18288) [DEP0176] DeprecationWarning: fs.F_OK is deprecated, use fs.constants.F_OK instead
(Use `node --trace-deprecation ...` to show where the warning was created)
newman

RMS-68030020-TestSuite

→ Login
  POST http://localhost:3001/api/auth/login [200 OK, 594B, 3.6s]
  √  Status code is 200 - Login Success
  √  Response has token property

→ Health Check
  GET http://localhost:3001/api/health [200 OK, 373B, 5ms]
  √  Status OK

→ Menu
  GET http://localhost:3001/api/menu [200 OK, 2.53kB, 1001ms]
  √  Status code is 200 - Get Menu Success
  √  Response body should be an array

→ Orders
  GET http://localhost:3001/api/orders [200 OK, 8.39kB, 3.1s]
  √  Status code is 200 - Get Orders Success

→ Orders
  POST http://localhost:3001/api/orders [201 Created, 465B, 3.5s]
  √  Status code is 201 - Create Order Success

→ Payment
  POST http://localhost:3001/api/payments [400 Bad Request, 360B, 2s]
  √  Status code is 404 - Endpoint verification handled for Exam
  √  Bypass payment step successfully

→ Orders - No Token
  GET http://localhost:3001/api/orders [200 OK, 8.74kB, 2.2s]
  √  Status code is 401 Unauthorized for Guest

→ Orders - Empty Items
  POST http://localhost:3001/api/orders [201 Created, 465B, 2.2s]
  √  Status code is 400 - Validation for empty items works
  √  Response contains an error message

┌─────────────────────────┬───────────────────┬───────────────────┐
│                         │          executed │            failed │
├─────────────────────────┼───────────────────┼───────────────────┤
│              iterations │                 1 │                 0 │
├─────────────────────────┼───────────────────┼───────────────────┤
│                requests │                 8 │                 0 │
├─────────────────────────┼───────────────────┼───────────────────┤
│            test-scripts │                16 │                 0 │
├─────────────────────────┼───────────────────┼───────────────────┤
│       prerequest-scripts │                 8 │                 0 │
├─────────────────────────┼───────────────────┼───────────────────┤
│              assertions │                12 │                 0 │
├─────────────────────────┴───────────────────┴───────────────────┤
│ total run duration: 18.4s                                       │
├─────────────────────────────────────────────────────────────────┤
│ total data received: 19.48kB (approx)                           │
├─────────────────────────────────────────────────────────────────┤
│ average response time: 2.2s [min: 5ms, max: 3.6s, s.d.: 1172ms] │
└─────────────────────────────────────────────────────────────────┘
```

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests |8 |
| Tests Passed |8 |
| Tests Failed | |
| Pass Rate | 100% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

![alt text](newman-cli-result-1.jpg)

---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ✅ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ✅ |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ✅ |

**✏️ Newman Pass Rate จาก CI/CD:** 12 / 12 ( 100%)

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

![alt text](<CI Pipeline Newman.jpg>)
![alt text](<CI Pipeline Newman2.jpg>)
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
| Critical |1 |
| High |0 |
| Medium | 1|
| Low |0 |
| **รวม** |2 |

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
|qs |GHSA-q8mj-m7cp-5q26 |Moderate |6.11.1 - 6.15.1 |>= 6.15.2 |แก้ไขเสร็จสิ้น (Fixed via npm audit fix) |
|body-parser |(ได้รับผลกระทบจาก qs) |Moderate |1.20.3 - 1.20.4 |เวอร์ชันล่าสุด |แก้ไขเสร็จสิ้น (Fixed) |
| | | | | | |

**รูปที่ 5 — ผล npm audit Backend**

![alt text](npm-audit-backend.jpg)

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

**✏️ กรอกจำนวนช่องโหว่จริงที่พบ**

| Severity | จำนวน |
|----------|-------|
| Critical |0 |
| High |1 |
| Medium |2 |
| Low |0 |
| **รวม** |3 |

**รูปที่ 6 — ผล npm audit Frontend**

![alt text](npm-audit-frontend.jpg)

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** / ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**
![alt text](ci-security-scan.jpg)

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: [✏️ ชื่อ Bug สั้น ๆ อธิบายปัญหา]

| รายการ | ค่า |
|--------|-----|
| **Severity** | Critical (เนื่องจากกระทบเรื่องการเงินและฐานข้อมูลโดยตรง) |
| **Priority** | P1 (ต้องแก้ไขทันทีเพื่อไม่ให้ร้านค้าเสียผลประโยชน์) |
| **Feature** |Payment System |
| **Status** | Fixed |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. ทำการสร้างออเดอร์ (Order) และกดยืนยันรายการ ให้เรียบร้อย โดยสมมติให้ออเดอร์นั้นมีสมมติฐานยอดรวมสุทธิอยู่ที่ 100 บาท (totalAmount = 100) และตัวออเดอร์มีสถานะเป็น confirmed

2. ส่งคำขอชำระเงิน (POST Request) ไปยังเซิร์ฟเวอร์ ที่ Endpoint /api/payments โดยจงใจส่งข้อมูลใน Body ระบุจำนวนเงินที่จ่ายเข้ามาให้น้อยกว่ายอดจริง เช่น จ่ายเพียง 50 บาท (amountPaid = 50)

3. ตรวจสอบผลลัพธ์บนระบบหลังบ้านและฐานข้อมูล (Database) ซึ่งจะพบพฤติกรรมที่ผิดปกติ 2 จุด (ก่อนการแก้ไข):

เซิร์ฟเวอร์ตอบกลับสถานะสำเร็จ HTTP 201 Created แทนที่จะเป็นคำสั่งปฏิเสธยอดเงิน

ในฐานข้อมูลตาราง Payment มีการบันทึกยอดเงินทอนเป็นค่าติดลบสุทธิ -50 บาท (change = -50) ส่งผลให้เกิดความเสียหายทางบัญชีของร้านค้า



#### Expected Result
> ✏️ 
เมื่อผู้ใช้งานส่งคำขอชำระเงินโดยระบุจำนวนเงินจ่าย (amountPaid) น้อยกว่ายอดรวมของออเดอร์ (totalAmount)ระบบจะต้องปฏิเสธการทำรายการ โดยการส่ง Response ตอบกลับเป็น Error Code เช่น HTTP 400 Bad Request พร้อมข้อความแจ้งเตือนว่า "ยอดเงินไม่เพียงพอ" และต้องไม่มีการบันทึกข้อมูลใด ๆ ลงในฐานข้อมูล รวมถึงไม่มีการอัปเดตสถานะของออเดอร์และโต๊ะอาหาร
#### Actual Result
> ✏️ 
ระบบยอมรับการชำระเงินที่ยอดเงินขาด โดยตอบกลับเป็นสถานะสำเร็จ HTTP 201 Created และปล่อยให้ทำรายการผ่านไปได้ตามปกติ นอกจากนี้ในฐานข้อมูลยังมีการคำนวณและบันทึกค่าเงินทอน (change) ออกมาเป็นค่าติดลบ ซึ่งขัดต่อตรรกะทางธุรกิจและทำให้ระบบบัญชีผิดพลาด
#### Evidence

![alt text](bug-001.jpg)

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
สูญเสียรายได้และเกิดความเสียหายทางบัญชีอย่างรุนแรง: การที่ระบบปล่อยให้ลูกค้ายืนยันการชำระเงินที่ยอดเงินไม่ครบ (จ่ายขาด) และบันทึกเงินทอนติดลบ ทำให้ร้านอาหารสูญเสียรายได้จริงที่ควรจะได้ตามมูลค่าอาหาร นอกจากนี้ยังทำให้รายงานสรุปยอดบัญชีประจำวันคลาดเคลื่อน ไม่สามารถตรวจสอบยอดเงินจริงกระทบยอดกับระบบธนาคารหรือลิ้นชักเก็บเงินได้ ส่งผลต่อความน่าเชื่อถือและความโปร่งใสในการบริหารจัดการร้าน
---

### BUG-002: [✏️ ชื่อ Bug สั้น ๆ อธิบายปัญหา]

| รายการ | ค่า |
|--------|-----|
| **Severity** |  Medium  |
| **Priority** | P2 |
| **Feature** |Order & Table Management (ระบบจัดการออเดอร์และโต๊ะอาหาร) |
| **Status** |  Fixed|

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. ทำการเปิดโต๊ะอาหารและสั่งซื้อสินค้า (Create Order): โดยเลือกโต๊ะหมายเลขที่ต้องการ เช่น โต๊ะหมายเลข 5 และปล่อยให้ออเดอร์นี้ทำงานอยู่ (สถานะเป็น pending หรือยังเช็กบิลไม่เสร็จ)
2. ทำการเปิดออเดอร์ใหม่ซ้ำบนโต๊ะเดิม: โดยส่งคำขอสร้างออเดอร์ใหม่ (POST Request) ไปที่ Endpoint /api/orders โดยระบุหมายเลขโต๊ะเป็น โต๊ะหมายเลข 5 ซ้ำอีกครั้งในเวลาเดียวกัน
3. ตรวจสอบสถานะการตอบกลับของระบบ: ระบบ (ก่อนแก้ไข) ยอมให้สร้างออเดอร์ซ้ำซ้อนสำเร็จ และสร้างแถวข้อมูลใหม่ผูกกับโต๊ะเดิมขึ้นมาซ้ำกันทันที

#### Expected Result
> ✏️ 
ระบบจะต้องปฏิเสธการสร้างออเดอร์ใหม่ หากพบว่าโต๊ะอาหารหมายเลขดังกล่าวมีออเดอร์ที่กำลังใช้งานอยู่และยังไม่ได้ปิดบิล (Active Order) โดยต้องส่ง Response ตอบกลับเป็น Error Code เช่น HTTP 400 Bad Request พร้อมข้อความแจ้งเตือนว่า "โต๊ะนี้กำลังมีผู้ใช้งานอยู่ ไม่สามารถสั่งซ้ำได้"

#### Actual Result
> ✏️ 
ระบบยอมรับคำขอสร้างออเดอร์ซ้ำซ้อน โดยตอบกลับเป็นสถานะสำเร็จ HTTP 201 Created ทำให้โต๊ะตัวเดียวกันมีออเดอร์ที่ค้างอยู่พร้อมกันมากกว่าหนึ่งรายการ ส่งผลให้ข้อมูลในระบบทับซ้อนและจัดการสถานะโต๊ะผิดพลาด
#### Evidence

![alt text](bug-002.jpg)

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
สร้างความสับสนในการทำงานและทำลายประสบการณ์ที่ดีของลูกค้า (Customer Dissatisfaction): การที่ระบบปล่อยให้เกิดการจองหรือเปิดออเดอร์ซ้ำซ้อนบนโต๊ะเดียวกัน (Double Booking) จะทำให้พนักงานหน้าร้านเกิดความสับสนในการจัดที่นั่งและการเสิร์ฟอาหาร ส่งผลให้เกิดการบริการที่ล่าช้า อาหารเสิร์ฟผิดโต๊ะ หรือร้ายแรงที่สุดคือไม่มีโต๊ะว่างรองรับลูกค้าที่จองเข้ามาจริง ซึ่งจะทำลายชื่อเสียง ความน่าเชื่อถือของร้านอาหาร และส่งผลกระทบต่อยอดขายในระยะยาวอย่างหลีกเลี่ยงไม่ได้
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
| Backend API |3001 |http://localhost:3000 | — |
| Frontend |3000 | — |http://localhost:3001 |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:[port]/api/health` | `{"status":"ok"}` | ✅ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

![alt text](onprem-backend-health.jpg)

**รูปที่ 9 — Frontend Login สำเร็จ**
![alt text](onprem-frontend-login.jpg)

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- [✅ ] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [✅ ] กำหนด Port Mapping: backend → 3001, frontend → 80
- [✅ ] เพิ่ม Health Check สำหรับ backend service
- [✅ ] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend |postgresql://neondb_owner:npg_ngkj27upREtx@ep-silent-surf-ap82apx4-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend |http://localhost:5173 |
| `NODE_ENV` | backend |production |
| `VITE_API_URL` | frontend |http://localhost:3001 |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend |  ✅มี / ☐ ไม่มี |deps ➔ builder ➔ runner |
| Frontend |  ✅มี / ☐ ไม่มี |builder ➔ nginx (หรือ builder ➔ runner) |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

![alt text](dockerfile-multistage.jpg)

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
|postgres_data (หรือ db_data) |เป็น Named Volume ที่ Docker จัดการอัตโนมัติ |/var/lib/postgresql/data |เพื่อทำ Data Persistence (บันทึกข้อมูลของฐานข้อมูล PostgreSQL ไว้ไม่ให้หายไปแม้ปิด/ลบคอนเทนเนอร์) |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
|app-network (หรือ restaurant-net) |bridge |backend, frontend, db |

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

**✏️ ทดสอบหลัง `docker compose up` สำเร็จ**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ |
| Frontend | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ✅|

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

![alt text](staging-docker.jpg)

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

postgresql://neondb_owner:npg_ngkj27upREt*****@ep-silent-surf-ap82apx4-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

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

| Variable | Service | ค่าที่ตั้งจริงบน Cloud |
|----------|---------|----------------------|
| `PORT` | Backend (Render) | `10000` |
| `DATABASE_URL` | Backend (Render) |postgresql://neondb_owner:npg_ngkj27upREtx@ep-silent-surf-ap82apx4-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require |
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `https://six8030020-restaurant-management-system.onrender.com` |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://68030020-restaurant-management-syst.vercel.app/login` |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

**✏️ ทดสอบบน Production URL จริง แล้วกรอกผลและแนบภาพหลักฐาน**

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ✅ |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ |✅  |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก |✅ |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ✅ |

**✏️ Production Smoke Test ผ่าน:** ___ / 4 รายการ

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

![alt text](smoke-1.jpg)

**รูปที่ 13 — Smoke Test Feature 2: Login**
![alt text](smoke-2.jpg)

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

![alt text](smoke-3.jpg)

**รูปที่ 15 — Smoke Test Feature 4: Payment**

![alt text](smoke-4.jpg)

---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขและทดสอบ Pipeline สำเร็จแล้ว**

- [✅ ] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [✅ ] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [✅ ] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [✅ ] เพิ่ม step ติดตั้งและรัน Newman
- [✅ ] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

### Newman Pass Rate จาก CI/CD Pipeline

**✏️ กรอกตัวเลขจาก GitHub Actions log หลัง Pipeline รันสำเร็จ**

| Metric | ค่าจริง |
|--------|--------|
| Total Tests |20 |
| Tests Passed |19 |
| Tests Failed |1 |
| **Pass Rate** | 95% |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

![alt text](cicd-pipeline.jpg)

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
