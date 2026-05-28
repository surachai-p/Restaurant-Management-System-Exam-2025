# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล |สรวิชญ์ สมตน |
| รหัสนักศึกษา | 68030287 |
| วันที่สอบ |28 พ.ค 2569 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/SorrawichSomton/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) | http://localhost | ✅ |
| Backend (Render) | http://localhost:3001 | ✅ |
| API Health Check (`/api/health`) | http://localhost:3001/api/health | ✅ |
| Database (Neon.tech connection string) | postgresql://postgres:postgres@db:5432/booking_app | ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | เป็นฟีเจอร์หลักสำหรับเข้าสู่ระบบและกำหนดสิทธิ์ผู้ใช้งาน เช่น Admin, Cashier และ Waiter หากผิดพลาดอาจทำให้ผู้ไม่ได้รับอนุญาตเข้าถึงระบบได้ | 
| Menu | ใช้จัดการข้อมูลเมนู ราคา และสต็อกวัตถุดิบ ซึ่งมีผลต่อการขายและความถูกต้องของรายการอาหาร | 
| Order | เป็นกระบวนการหลักของร้านอาหาร ใช้สำหรับเปิดโต๊ะ รับออเดอร์ และยืนยันรายการอาหาร | 
| Payment | ใช้คำนวณยอดชำระ เงินทอน และบันทึกการชำระเงิน หากผิดพลาดจะกระทบรายได้ของร้าน | 
| Report | ใช้สรุปรายงานยอดขายและข้อมูลทางธุรกิจ เพื่อช่วยในการวิเคราะห์และบริหารร้านอาหาร |
| Security | ทดสอบ JWT Authentication และ Role-based Access Control เพื่อป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต | 

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| Performance Testing | ไม่ได้ทดสอบโหลดผู้ใช้งานจำนวนมาก เนื่องจากข้อสอบเน้น Functional Testing และ Deployment |
| Mobile Responsive Testing| ไม่ได้ทดสอบทุกขนาดหน้าจอ เพราะสภาพแวดล้อมที่ใช้สอบเป็น Desktop Browser |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ใช้ทดสอบฟังก์ชันและ Business Logic ของ Backend เพื่อให้มั่นใจว่าการทำงานของระบบถูก |
| API Testing (E2E) | Postman / Newman | ใช้ทดสอบ REST API เช่น Login, Menu, Order และ Payment พร้อมตรวจสอบ HTTP Status และ Response |
| Security Testing | npm audit | ใช้ตรวจสอบช่องโหว่ของ dependencies และ library ที่ใช้งานในระบบ |
| Smoke Testing | Manual | ใช้ตรวจสอบการทำงานพื้นฐานหลัง Deploy เช่น Login, Health Check และการเปิดหน้าเว็บ |
| Staging Test | Docker Compose | ใช้จำลองสภาพแวดล้อมจริงแบบ Multi-container ก่อน Deploy ขึ้น Cloud |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | Windows 11 |
| Node.js | v22.17.1 |
| npm | 10.9.2 |
| Docker | 29.2.1 |
| PostgreSQL | 16 (Neon.tech) |
| Browser | Google Chrome |
| Newman | 6.2.2 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
[✅] Repository ถูก Clone และรัน Backend + Frontend ได้
[✅] Database เชื่อมต่อ Neon.tech สำเร็จ
[✅] /api/health ตอบกลับ {"status":"ok"}
[✅] Postman Collection พร้อมสำหรับ Newman
<img width="1919" height="553" alt="image" src="https://github.com/user-attachments/assets/21af1856-e5d9-4d6a-80ca-ea483b6027e2" />

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 80% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ |≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Authentication / Login | หากผู้ใช้เข้าสู่ระบบไม่ได้ พนักงานจะไม่สามารถใช้งานระบบรับออเดอร์และจัดการร้านอาหารได้ ส่งผลให้การให้บริการหยุดชะงัก | Critical |
| 2 | Payment | หากระบบคำนวณยอดเงินผิดหรือบันทึกการชำระเงินไม่ถูกต้อง อาจทำให้เกิดความเสียหายทางการเงินและข้อมูลรายรับคลาดเคลื่อน | Critical |
| 3 | Order Management | หากระบบบันทึกออเดอร์ผิดพลาด อาจทำให้อาหารตกหล่น ส่งผิดโต๊ะ หรือเกิดความล่าช้าในการให้บริการลูกค้า | High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | | ✅ |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | | ✅ |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET /api/orders (no Authorization header) | HTTP 401 Unauthorized | | ✅ |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 1, amount: exactTotal}` | HTTP 200 + change = 0 | | ✅ |
| TC-005 | Positive | Menu | เพิ่มเมนูใหม่สำเร็จ | {name:"Pizza", price:299} | HTTP 201 Created | ระบบเพิ่มเมนูใหม่ลงฐานข้อมูลสำเร็จ | ✅ |
| TC-006 | Positive | Order | สร้างออเดอร์ใหม่สำเร็จ | {table:1, items:[...]} | HTTP 200 + Order Created | ระบบบันทึกออเดอร์ใหม่ได้สำเร็จ | ✅ |
| TC-007 | Negative | Payment | ชำระเงินน้อยกว่ายอดจริง | {amount:50} | HTTP 400 Bad Request | ระบบแจ้งจำนวนเงินไม่เพียงพอ | ✅ |
| TC-008 | Negative | Menu | เพิ่มเมนูโดยไม่กรอกชื่อ | {name:"", price:100} | HTTP 400 Validation Error | ระบบตรวจสอบข้อมูลและไม่อนุญาตให้บันทึก | ✅ |
| TC-009 | Security | API | ใช้ JWT Token ที่หมดอายุ | Authorization: Expired Token | HTTP 401 Unauthorized | ระบบปฏิเสธ Token ที่หมดอายุ | ✅ |
| TC-010 | Security | Order | ทดลอง SQL Injection ใน Login | ' OR '1'='1 | HTTP 401 Unauthorized | ระบบไม่อนุญาตให้เข้าสู่ระบบ | ✅ |
| TC-011 | Edge | Order | สร้างออเดอร์ที่ไม่มีรายการอาหาร | {items:[]} | HTTP 400 Validation Error | ระบบแจ้งว่าไม่สามารถสร้างออเดอร์ว่างได้ | ✅ |

**✏️ สรุปผล:** ผ่าน 11 / 11 กรณี (100%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `68030287` ด้วยรหัสจริง**

    | รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-68030287-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030287-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env.json` |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|----------------|------------|
| `{{base_url}}` | `http://localhost:3001/api` | Base URL ของ Backend API |
| `{{token}}` | JWT Token จากการ Login ของ Cashier/Waiter | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | JWT Token จากการ Login ของ Admin | Request ที่ต้องใช้สิทธิ์ Admin |

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

**✏️ ยืนยันว่าทุก Request มี pm.test แล้ว:** ✅ ใช่

#### สรุปผลการรัน Postman (กรอกหลังรัน Collection Run)

**✏️ กรอกผลจริงจาก Postman Collection Runner**

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| Health Check | GET | /api/health | Status 200 OK และแสดงข้อความ API running | ☑️ Pass |
| Login Admin | POST | /api/auth/login | Login สำเร็จและได้รับ JWT Token | ☑️ Pass |
| Get Orders | GET | /api/orders | ดึงข้อมูล Orders สำเร็จ | ☑️ Pass |

**✏️ สรุป:** ผ่าน 3 / 3 Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**
<img width="1919" height="1074" alt="image" src="https://github.com/user-attachments/assets/5d3e72d9-019a-467b-ad8b-ea18c6793cf8" />
<img width="1919" height="1078" alt="image" src="https://github.com/user-attachments/assets/7907f960-db6f-468f-8bec-4a4ed3d1443c" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/a52196c0-c714-4bf9-b238-e9f472f781cb" />
<img width="1919" height="1077" alt="image" src="https://github.com/user-attachments/assets/c7205782-3b43-4094-915d-cea2de09fae4" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/8f6ffabd-6b8e-4365-b420-16eff492b4bf" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/5e588a50-efa9-43c0-be7d-99daca9d4180" />

`![Postman Collection + Env Vars](./tests/reports/postman-collection-env.png)`

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**
<img width="1917" height="1073" alt="image" src="https://github.com/user-attachments/assets/269df939-c1c6-4c41-9606-3b77bba760ba" />

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

RMS-68030287-TestSuite

→ Health Check
GET http://localhost:3001/api/health [200 OK, 373B, 22ms]
✓ Status code is 200
✓ Response status is ok

→ Login Admin
POST http://localhost:3001/api/auth/login [200 OK, 594B, 62ms]
✓ Login success
✓ Response has JWT token

→ Get Orders
GET http://localhost:3001/api/orders [200 OK, 301B, 5ms]
✓ Get orders success
✓ Response is array

→ Login Wrong Password
POST http://localhost:3001/api/auth/login [401 Unauthorized, 342B, 59ms]
✓ Unauthorized login

→ Get Orders No Token
GET http://localhost:3001/api/orders [401 Unauthorized, 344B, 3ms]
✓ Unauthorized without token

┌─────────────────────────┬──────────────────┬─────────────────┐
│                         │ executed         │ failed          │
├─────────────────────────┼──────────────────┼─────────────────┤
│ iterations              │ 1                │ 0               │
├─────────────────────────┼──────────────────┼─────────────────┤
│ requests                │ 5                │ 0               │
├─────────────────────────┼──────────────────┼─────────────────┤
│ test-scripts            │ 5                │ 0               │
├─────────────────────────┼──────────────────┼─────────────────┤
│ prerequest-scripts      │ 0                │ 0               │
├─────────────────────────┼──────────────────┼─────────────────┤
│ assertions              │ 8                │ 0               │
└─────────────────────────┴──────────────────┴─────────────────┘

total run duration: 592ms

total data received: 429B (approx)

average response time: 30ms [min: 3ms, max: 62ms, s.d.: 25ms]
```


```

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|----------|
| Total Requests | 5 |
| Tests Passed | 8 |
| Tests Failed | 0 |
| Pass Rate | 100% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

`![Newman Run Result](./tests/reports/newman-cli-result.png)`

<img width="1919" height="1078" alt="image" src="https://github.com/user-attachments/assets/2399c637-dec6-48fb-8270-b27237ea8468" />

---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ✅ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ❌ |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ❌ |

เหตุผล: การรัน Newman แบบ Local ผ่าน 8 / 8 assertions (100%) แต่ GitHub Actions Pipeline ยังมีปัญหาเรื่อง Authentication ใน CI environment

**✏️ Newman Pass Rate จาก CI/CD:** 0 / 8 (0%) — GitHub Actions ยังไม่ผ่าน

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/2f7a811e-da4c-4caa-a185-84a4cedfaae7" />


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
| Critical | 0 |
| High | 0 |
| Medium | 3 |
| Low | 0 |
| **รวม** | 3 |
พบช่องโหว่ระดับ Medium จำนวน 3 รายการ จาก package `qs` ที่ถูกใช้งานผ่าน `express` และ `body-parser`

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------|
| ไม่พบช่องโหว่ระดับ High ขึ้นไป | - | - | - | - | - |

**รูปที่ 5 — ผล npm audit Backend**

<img width="1627" height="1079" alt="image" src="https://github.com/user-attachments/assets/e7369011-78b7-45ed-8f98-df3e402cdf48" />


---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

**✏️ กรอกจำนวนช่องโหว่จริงที่พบ**

| Severity | จำนวน |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 2 |
| Low | 0 |
| **รวม** | 2 |

**รูปที่ 6 — ผล npm audit Frontend**

<img width="1196" height="345" alt="image" src="https://github.com/user-attachments/assets/d99e412f-a813-43d8-b846-b0018c0dc456" />


### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ✅ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

<img width="1919" height="1072" alt="image" src="https://github.com/user-attachments/assets/0f78fccb-ec27-4d1d-8cbe-6cd487cb9a8c" />


---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: Unauthorized Access เมื่อไม่ส่ง JWT Token

| รายการ | ค่า |
|--------|-----|
| **Severity** | High |
| **Priority** | P1 |
| **Feature** | Order API |
| **Status** | Fixed |

#### Steps to Reproduce

1. เปิด Postman หรือ Newman Test
2. ส่ง GET Request ไปที่ `/api/orders`
3. ไม่ใส่ JWT Token ใน Authorization Header

#### Expected Result

> ระบบต้องตอบกลับ `401 Unauthorized`

#### Actual Result

> ระบบตอบกลับผิดจากที่คาดหวัง และ Newman Test ไม่ผ่าน

#### Evidence

![BUG-001](./tests/reports/bug-001.png)

#### Business Impact

> หากระบบไม่ตรวจสอบ Token อย่างถูกต้อง อาจทำให้ผู้ใช้ที่ไม่ได้รับอนุญาตเข้าถึงข้อมูลคำสั่งซื้อของร้านอาหารได้
`![BUG-001](./tests/reports/bug-001.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร

---

### BUG-002: Login Admin ล้มเหลวจากข้อมูล Seed ไม่ตรงกับ Test Script

| รายการ | ค่า |
|--------|-----|
| **Severity** | Medium |
| **Priority** | P2 |
| **Feature** | Authentication |
| **Status** | Fixed |

#### Steps to Reproduce

1. รัน Newman Collection
2. ระบบส่ง Request Login Admin
3. ตรวจสอบผลลัพธ์ใน Terminal หรือ GitHub Actions

#### Expected Result

> ระบบต้อง Login สำเร็จและส่ง JWT Token กลับมา

#### Actual Result

> ระบบตอบกลับ `401 Invalid credentials`

#### Evidence

![BUG-002](./tests/reports/bug-002.png)

#### Business Impact

> CI Pipeline ไม่สามารถผ่านได้ ส่งผลให้การทดสอบอัตโนมัติและการ Deploy ระบบหยุดทำงาน
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
| Backend API | 3001 | `http://localhost:5173` | — |
| Frontend | 80 | — | `/api` |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|--------|-----|------------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{ "status": "ok" }` | ☑ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ☑ |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**
<img width="1909" height="1028" alt="image" src="https://github.com/user-attachments/assets/cfdeba26-62f4-4b7a-8a3b-607eecec02ad" />

`![On-Premises Backend Health](./tests/reports/onprem-backend-health.png)`

**รูปที่ 9 — Frontend Login สำเร็จ**
<img width="1918" height="913" alt="image" src="https://github.com/user-attachments/assets/17e8711e-b990-493b-b644-e2d6155aaec5" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/48eeb2e3-d676-4ec5-b13e-dff9eb9f510a" />

`![On-Premises Frontend Login](./tests/reports/onprem-frontend-login.png)`

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- ✅ เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- ✅ กำหนด Port Mapping: backend → 3001, frontend → 80
- ✅ เพิ่ม Health Check สำหรับ backend service
- ✅ กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | `postgresql://postgres:postgres@db:5432/booking_app` |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | `http://localhost:5173` |
| `NODE_ENV` | backend | `production` |
| `VITE_API_URL` | frontend | `/api` |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ✅ มี | builder → runner |
| Frontend | ✅ มี | builder → nginx |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

<img width="1603" height="740" alt="image" src="https://github.com/user-attachments/assets/0cf5614a-13ec-4c67-98a2-8daefcb986ff" />
<img width="1617" height="739" alt="image" src="https://github.com/user-attachments/assets/9b2f747a-879a-4748-b9aa-8288a480a026" />

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| postgres_data | Docker Volume | /var/lib/postgresql/data | เก็บข้อมูล Database |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| booking-network | bridge | backend, frontend |

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

**✏️ ทดสอบหลัง `docker compose up` สำเร็จ**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ |
| Frontend | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ✅ |

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

<img width="1607" height="1079" alt="image" src="https://github.com/user-attachments/assets/63300890-66f6-4ac5-8769-e410ed786582" />

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

`postgresql://[user]:***@[host].neon.tech/[db]?sslmode=require`

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
| `DATABASE_URL` | Backend (Render) | |
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `https://[ชื่อ app ของตนเอง].vercel.app` |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://[ชื่อ api ของตนเอง].onrender.com` |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

**✏️ ทดสอบบน Production URL จริง แล้วกรอกผลและแนบภาพหลักฐาน**

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ❌ |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ❌ |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | ❌ |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ❌ |

**✏️ Production Smoke Test ผ่าน:** 0 / 4 รายการ

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

`![Smoke Test Health](./tests/reports/smoke-1-health.png)`

**รูปที่ 13 — Smoke Test Feature 2: Login**

`![Smoke Test Login](./tests/reports/smoke-2-login.png)`

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

`![Smoke Test Order](./tests/reports/smoke-3-order.png)`

**รูปที่ 15 — Smoke Test Feature 4: Payment**

`![Smoke Test Payment](./tests/reports/smoke-4-payment.png)`

---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขและทดสอบ Pipeline สำเร็จแล้ว**

- [ ] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [ ] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [ ] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [ ] เพิ่ม step ติดตั้งและรัน Newman
- [ ] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

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
