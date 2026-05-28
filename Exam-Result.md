# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล |นายอัครพนธ์ อรุณ |
| รหัสนักศึกษา |68030319 |
| วันที่สอบ |28/05/2569 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/68030319/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) | | ☐ |
| Backend (Render) | | ☐ |
| API Health Check (`/api/health`) | | ☐ |
| Database (Neon.tech connection string) | | ☐ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | เพื่อป้องกันผู้ไม่มีสิทธิ์เข้าถึงระบบ |
| Menu | เพื่อให้ลูกค้ามีข้อมูลอาหารที่ถูกต้องในการสั่ง |
| Order | เป็นหัวใจหลักของแอปพลิเคชันในการสร้างรายได้ |
| Payment | เพื่อรับประกันความถูกต้องของการเงินและเงินทอน |
| Report | เพื่อให้เจ้าของร้านดูยอดขายประจำวันได้ |
| Security | เพื่ออุดช่องโหว่ ป้องกันข้อมูลรั่วไหล |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| Payroll | ไม่อยู่ในขอบเขต (Requirements) ของระบบ |
| | |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | |
| API Testing (E2E) | Postman / Newman | |
| Security Testing | npm audit | |
| Smoke Testing | Manual | |
| Staging Test | Docker Compose | |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | Windows 11 |
| Node.js | v24.14.0 |
| npm | 11.9.0 |
| Docker | version 29.4.3, build 055a478 |
| PostgreSQL | 16 (Neon.tech) |
| Browser | Google Chrome v120+ |
| Newman | 6.2.2 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
- [ ] Repository ถูก Clone และรัน Backend + Frontend ได้
- [ ] Database เชื่อมต่อ Neon.tech สำเร็จ
- [ ] `/api/health` ตอบกลับ `{"status":"ok"}`
- [ ] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ ___% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ ___ รายการ |
| Smoke Test บน Production ผ่าน | ___ / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment คำนวณเงินผิด | ระบบคำนวณเงินทอนผิดพลาด หรือรับยอดชำระไม่ครบ ทำให้ร้านสูญเสียรายได้ | Critical |
| 2 | Auth (Role) หละหลวม | พนักงานเสิร์ฟสามารถเข้าถึงฟังก์ชันลบเมนูหรือดูรายงานยอดขายของ Admin ได้ ทำให้ข้อมูลทางธุรกิจเสียหาย | High |
| 3 | | | |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | HTTP 200 + JWT Token | ✅ |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | HTTP 401 Unauthorized | ✅ |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET /api/orders (no Authorization header) | HTTP 401 Unauthorized | HTTP 401 Unauthorized | ✅ |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 1, amount: exactTotal}` | HTTP 200 + change = 0 | HTTP 200 + change = 0 | ✅ |
| TC-005 | Positive | Menu | Admin เพิ่มเมนูใหม่สำเร็จ | {name: "Burger", price: 100} | HTTP 201 Created | HTTP 201 | ✅ |
| TC-006 | Positive | Order | เปิดโต๊ะใหม่สำเร็จ | {tableId: 5} | HTTP 201 Created | HTTP 201 | ✅ |
| TC-007 | Negative | Payment | ชำระเงินไม่ครบ (Underpayment) | {amount: ยอดที่น้อยกว่าค่าอาหาร} | HTTP 400 Bad Request | HTTP 200 (Bug!) | ✅ |
| TC-008 | Negative | Menu | สร้างเมนูโดยไม่ใส่ชื่อ | {price: 100} | HTTP 400 Bad Request | HTTP 400 | ✅ |
| TC-009 | Security | Auth | Waiter ลบเมนู (ตรวจสอบสิทธิ์) | DELETE /api/menu/1 (Token Waiter) | HTTP 403 Forbidden | HTTP 403 | ✅ |
| TC-010 | Security | Security | SQL Injection ที่ช่อง Login | {username: "admin' OR 1=1--"} | HTTP 401 / 400 | HTTP 401| ✅ |
| TC-011 | Edge | Order | สั่งอาหารจำนวน 0 ชิ้น | {itemId: 1, quantity: 0} | HTTP 400 Bad Request | HTTP 400 | ✅ |

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
| Collection Name | `RMS-68030319-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030319-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env.json` |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | | Base URL ของ Backend API |
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

**✏️ ยืนยันว่าทุก Request มี pm.test แล้ว:** ✅ ใช่

#### สรุปผลการรัน Postman (กรอกหลังรัน Collection Run)

**✏️ กรอกผลจริงจาก Postman Collection Runner**

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| Health Check | GET | /api/health | Status 200 OK และแสดงข้อความ API running |  ✅Pass |
| Login Admin | POST | /api/auth/login | Login สำเร็จและได้รับ JWT Token |  ✅Pass |
| Get Orders | GET | /api/orders | ดึงข้อมูล Orders สำเร็จ |  ✅Pass |

**✏️ สรุป:** ผ่าน 3 / 3 Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/b39711d2-258f-4ad2-bea8-3fb6cc59716f" />

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/fee3fbf5-a6a2-488c-8de7-67c19b6698fe" />


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

<img width="1272" height="798" alt="image" src="https://github.com/user-attachments/assets/9d9ca0f1-98bf-48c8-b00d-749b4ccc9bbe" />

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

<img width="1061" height="676" alt="image" src="https://github.com/user-attachments/assets/2cccca46-5b02-48a4-8113-53cc4dc3bb5d" />


### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ☐ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

`![CI Security Scan](./tests/reports/ci-security-scan.png)`

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: [✏️ คำนวณเงินทอนติดลบ]

| รายการ | ค่า |
|--------|-----|
| **Severity** | (เลือก: Critical / High / Medium / Low) |
| **Priority** | (เลือก: P1 / P2 / P3) |
| **Feature** | Payment / Checkout |
| **Status** | (เลือก: Open / Fixed) |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. ล็อกอินเข้าสู่ระบบผ่าน API (หรือหน้าเว็บ) ด้วยสิทธิ์ Cashier
2. ทำการชำระเงิน (POST /api/payments) สำหรับออเดอร์ที่มีอยู่
3. ระบุยอดเงินที่รับมา (paid) ให้น้อยกว่าราคารวมของบิล (totalAmount) เช่น บิล 100 บาท แต่ระบุยอดจ่าย 50 บาท
4. กดยืนยันการชำระเงินและตรวจสอบผลลัพธ์ (ระบบให้ผ่านและบันทึกเงินทอนเป็นค่าติดลบ)

#### Expected Result
> ✏️ ระบบต้องปฏิเสธการทำรายการและส่ง HTTP Status 400 (Bad Request) กลับมา โดยไม่บันทึกข้อมูลลงฐานข้อมูล พร้อมทั้งแสดงข้อความแจ้งเตือนว่ายอดเงินที่รับมาไม่เพียงพอ

#### Actual Result
> ✏️ ระบบยอมรับการทำรายการ ส่ง HTTP Status 200 (OK) กลับมา และบันทึกข้อมูลการชำระเงินลงฐานข้อมูลสำเร็จ โดยระบบคำนวณเงินทอน (Change) ออกมาเป็น ค่าติดลบ

#### Evidence

`![BUG-001](./tests/reports/bug-001.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
ส่งผลให้ร้านอาหารสูญเสียรายได้โดยตรง (Financial Loss) อย่างร้ายแรง เนื่องจากพนักงานสามารถปิดบิลได้โดยที่รับเงินจากลูกค้าไม่ครบถ้วน ทำให้รายงานทางบัญชีและสรุปยอดขายประจำวันผิดพลาดทั้งหมด
---

### BUG-002: [✏️ ระบบอนุญาตให้ระบุจำนวนสินค้า]

| รายการ | ค่า |
|--------|-----|
| **Severity** | (เลือก: Critical / High / Medium / Low) |
| **Priority** | (เลือก: P1 / P2 / P3) |
| **Feature** | Order Management |
| **Status** | (เลือก: Open / Fixed) |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. ล็อกอินเข้าสู่ระบบผ่าน API ด้วยสิทธิ์ Waiter หรือ Cashier
2. ยิง Request เพื่อสร้างออเดอร์ใหม่ (POST /api/orders) หรือแก้ไขออเดอร์เดิม
3. ในส่วนของรายการอาหาร (Items) ให้ระบุจำนวนอาหาร (quantity) เป็นค่าติดลบหรือศูนย์ (เช่น -1 หรือ 0)
4. ส่ง Request และตรวจสอบผลลัพธ์ (ระบบยอมรับคำสั่งซื้อและบันทึกจำนวนที่ผิดปกติลงฐานข้อมูล)

#### Expected Result
> ✏️ ระบบต้องปฏิเสธคำสั่งซื้อและส่ง HTTP Status 400 (Bad Request) กลับมา โดยไม่อนุญาตให้บันทึกรายการอาหารที่มีจำนวนน้อยกว่า 1 (ศูนย์หรือติดลบ) ลงในฐานข้อมูล พร้อมแสดงข้อความแจ้งเตือนข้อผิดพลาดเกี่ยวกับการระบุจำนวน

#### Actual Result
> ✏️ ระบบยอมรับคำสั่งซื้อและส่ง HTTP Status 200 (หรือ 201) กลับมา โดยบันทึกรายการอาหารที่มีจำนวนเป็นศูนย์หรือติดลบลงในฐานข้อมูล ซึ่งอาจนำไปคำนวณหักลบกับค่าอาหารรายการอื่น ทำให้ยอดรวมของบิล (Total Amount) ลดลงผิดปกติ

#### Evidence

`![BUG-002](./tests/reports/bug-002.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
เปิดช่องโหว่ร้ายแรงให้เกิดการทุจริต (Fraud) พนักงานสามารถใส่จำนวนอาหารติดลบเพื่อลดยอดบิลรวมและนำเงินส่วนต่างเข้ากระเป๋าตัวเองได้ นอกจากนี้ยังทำให้ระบบคำนวณสต๊อกวัตถุดิบและรายงานสรุปยอดขายประจำวันผิดพลาด ส่งผลเสียต่อการทำบัญชีของร้านอาหารโดยตรง
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
| Backend API | 3001 | "http://localhost:5173" | — |
| Frontend | 80 | — | /api |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:[port]/api/health` | `{"status":"ok"}` | ✅ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

<img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/c7a899f9-e4bc-4fc5-9d9c-757d264a19de" />


**รูปที่ 9 — Frontend Login สำเร็จ**

<img width="1908" height="951" alt="image" src="https://github.com/user-attachments/assets/d358777f-6ff6-4ef1-9f73-074f7d9635ca" />

<img width="1900" height="1033" alt="image" src="https://github.com/user-attachments/assets/3307a6ea-fdb0-4b52-85a2-cd779a988cb9" />

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- [✅] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [✅] กำหนด Port Mapping: backend → 3001, frontend → 80
- [✅] เพิ่ม Health Check สำหรับ backend service
- [✅] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | "postgresql://postgres:postgres@db:5432/rms_db" |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | "http://localhost:5173" |
| `NODE_ENV` | backend | production |
| `VITE_API_URL` | frontend | /api |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ✅ มี / ☐ ไม่มี | builder → runner |
| Frontend | ✅ มี / ☐ ไม่มี | builder → runner |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

<img width="1743" height="969" alt="image" src="https://github.com/user-attachments/assets/fdb551f6-982f-4608-8f3d-166df969f31c" />
<img width="1472" height="961" alt="image" src="https://github.com/user-attachments/assets/32d15ce3-34bc-419c-9233-4ae118a4e16e" />


#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| postgres_data | postgres_data (Named Volume) | /var/lib/postgresql/data | เพื่อเก็บรักษาข้อมูลของฐานข้อมูล (Data Persistence) ไม่ให้ข้อมูลสูญหายเมื่อ Container ถูกปิดหรือสร้างใหม่ |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| default | bridge | db, backend, frontend |

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

<img width="1731" height="984" alt="image" src="https://github.com/user-attachments/assets/a6ee8d45-efa6-4655-bf7f-53d00e697fee" />


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
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ☐ |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ☐ |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | ☐ |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ☐ |

**✏️ Production Smoke Test ผ่าน:** ___ / 4 รายการ

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

- [✅] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [✅] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
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
