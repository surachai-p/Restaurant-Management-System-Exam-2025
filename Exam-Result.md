# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| วรัทยา รอดเมล์ | |
| 68030258 | |
| 14/10/2569 | |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/68030258/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) |https://restaurant-management-system-exam-2-gamma.vercel.app | ✅ |
| Backend (Render) |https://rms-backend-68030258.onrender.com | ✅ |
| API Health Check (`/api/health`) |https://rms-backend-68030258.onrender.com/api/health | ✅ |
| Database (Neon.tech connection string) |postgresql://neondb_owner:npg_2W0RetgFlhPc@ep-broad-block-b46x5350.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require | ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | ตรวจสอบระบบยืนยันตัวตน (Login) การออก JWT Token และการจัดการเมื่อรหัสผ่านไม่ถูกต้อง |
| Menu | ตรวจสอบการดึงข้อมูลรายการอาหาร (GET Menu) และการจัดการเมื่อไม่พบรายการอาหารที่ระบุ |
| Order | ตรวจสอบกระบวนการสร้างคำสั่งซื้อ (Create Order) และการป้องกันคำสั่งซื้อที่ไม่ถูกต้อง (เช่น ข้อมูลว่างเปล่า หรือจำนวนติดลบ) |
| Payment | - |
| Report | - |
| Security | ตรวจสอบการป้องกันการเข้าถึง API โดยไม่มี Token (Unauthorized), การใช้ Token ปลอม และการป้องกันการโจมตีแบบ SQL Injection |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| Payment Processing (Cash/Card/QR) | ระบบเป็นเวอร์ชันจำลองเพื่อการทดสอบ API ไม่ได้เชื่อมต่อ Gateway ผู้ให้บริการชำระเงินจริง (เช่น Stripe/Omise/PromptPay API) |
| POS Hardware Integration | ไม่ได้ทดสอบการเชื่อมต่อกับอุปกรณ์ฮาร์ดแวร์หน้าร้านจริง เช่น เครื่องพิมพ์ใบเสร็จความร้อน หรือลิ้นชักเก็บเงิน |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest |ทดสอบ Logic ระดับฟังก์ชัน/Controller ในส่วน Backend เพื่อยืนยันความถูกต้องของระบบก่อนประกอบรวม |
| API Testing (E2E) | Postman / Newman |ทดสอบ End-to-End API ทั้งหมด 11 เคส (Auth, Menu, Order, Security, Edge Case) ผ่าน Postman และรันสรุปผลแบบอัตโนมัติด้วย Newman CLI |
| Security Testing | npm audit |สแกนหาช่องโหว่ของ Third-party Dependencies และทดสอบการรับมือกับ SQL Injection รวมถึงการตรวจสอบสิทธิ์ด้วย JWT Token |
| Smoke Testing | Manual |ทดสอบการทำงานเบื้องต้นหลัง Deploy บน Vercel และ Render เพื่อตรวจสอบว่าระบบเปิดใช้งานได้จริง และ Health Check |
| Staging Test | Docker Compose |จำลอง Environment ของ PostgreSQL และ Backend บนเครื่อง Local ให้ใกล้เคียงกับ Production ก่อนทำการ Deploy ขึ้น Cloud |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | windows 11 |
| Node.js |24.22.0 |
| npm |11.19.1 |
| Docker |29.6.2 |
| PostgreSQL | 16 (Neon.tech) |
| Browser |Google Chrome |
| Newman |v6.2.0 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
- [✅] Repository ถูก Clone และรัน Backend + Frontend ได้
- [✅] Database เชื่อมต่อ Neon.tech สำเร็จ
- [✅] `/api/health` ตอบกลับ `{"status":"ok"}`
- [✅] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 100% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Order Management (การสร้างและจัดการออเดอร์) | คำสั่งซื้อตกหล่น หรือส่งรายการอาหารไปยังห้องครัวล่าช้า/ผิดพลาด ทำให้ลูกค้าได้รับอาหารช้าหรือผิดรายการ ส่งผลกระทบต่อรายได้และความพึงพอใจของลูกค้าโดยตรง | Critical |
| 2 | Authentication & Authorization (ระบบยืนยันตัวตนและสิทธิ์) | พนักงานไม่สามารถล็อกอินเข้าใช้งานเพื่อเปิดโต๊ะ/รับออเดอร์ได้ หรือผู้ไม่มีสิทธิ์สามารถเข้าถึงและแก้ไขข้อมูลสำคัญได้ ส่งผลให้การทำงานหน้าร้านหยุดชะงัก | High |
| 3 | Menu Management (การจัดการเมนูและสถานะสินค้า) | ราคาอาหารแสดงไม่ตรง หรือไม่สามารถอัปเดตสถานะสินค้าหมด (Out of Stock) ได้ทันที ทำให้เกิดการสั่งซื้อรายการที่ไม่มีอยู่จริง และต้องเสียเวลาแก้ไขกับลูกค้าหน้าร้าน | Medium |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{"username": "admin", "password": "Admin@123"}` | HTTP 200 + JWT Token | HTTP 200 OK | [x] Pass |
| TC-002 | Positive | Menu | ดึงข้อมูลรายการอาหารทั้งหมด | `GET /api/menu` | HTTP 200 + Array Data | HTTP 200 OK | [x] Pass |
| TC-003 | Positive | Order | สร้างคำสั่งซื้อใหม่สำเร็จ | `POST /api/orders` + Valid Items | HTTP 201 Created | HTTP 201 Created | [x] Pass |
| TC-004 | Negative | Auth | Login ด้วย password ผิด | `{"username": "admin", "password": "wrong"}` | HTTP 401 Unauthorized | HTTP 401 Unauthorized | [x] Pass |
| TC-005 | Negative | Order | สั่งซื้อโดยส่งรายการสินค้าว่างเปล่า | `POST /api/orders` + `{"items": []}` | HTTP 400 Bad Request | HTTP 400 Bad Request | [x] Pass |
| TC-006 | Negative | Menu | ดึงข้อมูลเมนูที่ไม่มีอยู่จริง | `GET /api/menu/999999` | HTTP 404 Not Found | HTTP 404 Not Found | [x] Pass |
| TC-007 | Security | Auth | เรียก API โดยไม่มี JWT Token | `GET /api/orders` (No Authorization) | HTTP 401 Unauthorized | HTTP 401 Unauthorized | [x] Pass |
| TC-008 | Security | Auth | เรียกใช้ API ด้วย Invalid Token | `GET /api/orders` + Invalid Token | HTTP 401 Unauthorized | HTTP 401 Unauthorized | [x] Pass |
| TC-009 | Security | Auth | โจมตีด้วย SQL Injection ช่องทาง Login | `{"username": "' OR '1'='1", "password": "123"}` | HTTP 401 Unauthorized | HTTP 401 Unauthorized | [x] Pass |
| TC-010 | Edge | Order | สั่งซื้อสินค้าด้วยจำนวนชิ้นติดลบ | `POST /api/orders` + `{"quantity": -5}` | HTTP 400 Bad Request | HTTP 400 Bad Request | [x] Pass |
| TC-011 | Edge | Menu | ส่ง Payload เมนูไม่ครบ / ชนิดข้อมูลผิด | `POST /api/menu` + Invalid JSON | HTTP 400 Bad Request | HTTP 400 Bad Request | [x] Pass |

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
| Collection Name | `RMS-68030258-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030258-TestSuite.json` |
| ไฟล์ Environment | `ใช้ตัวแปรภายใน Collection` |

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

**✏️ ยืนยันว่าทุก Request มี pm.test แล้ว:** ☐ ใช่

#### สรุปผลการรัน Postman (กรอกหลังรัน Collection Run)

**✏️ กรอกผลจริงจาก Postman Collection Runner**

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| TC-001: Admin Login Success | POST | `/api/auth/login` | HTTP 200 OK + JWT Token | [x] |
| TC-002: Get All Menu Items | GET | `/api/menu` | HTTP 200 OK | [x] |
| TC-003: Create Order Success | POST | `/api/orders` | HTTP 201 Created | [x] |
| TC-004: Wrong Password Login | POST | `/api/auth/login` | HTTP 401 Unauthorized | [x] |
| TC-005: Create Empty Order | POST | `/api/orders` | HTTP 400 Bad Request | [x] |
| TC-006: Get Non-Existent Menu | GET | `/api/menu/999999` | HTTP 404 Not Found | [x] |
| TC-007: No Token Request | GET | `/api/orders` | HTTP 401 Unauthorized | [x] |
| TC-008: Invalid Token Request | GET | `/api/orders` | HTTP 401 Unauthorized | [x] |
| TC-009: SQL Injection Attack | POST | `/api/auth/login` | HTTP 401 Unauthorized | [x] |
| TC-010: Negative Quantity Order | POST | `/api/orders` | HTTP 400 Bad Request | [x] |
| TC-011: Invalid Payload Menu | POST | `/api/menu` | HTTP 400 Bad Request | [x] |

**✏️ สรุป:** ผ่าน 11 / 11 Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

`![alt text](image.png)`

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

`![alt text](image-1.png) ![alt text](image-2.png)`

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
| Total Requests |11 |
| Tests Passed |21 |
| Tests Failed |0 |
| Pass Rate |100 % |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

`![Newman Run Result](./tests/reports/newman-cli-result.png)`

---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
![alt text](image-3.png)
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ✅ |
![alt text](image-4.png)
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ☐ |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ☐ |

**✏️ Newman Pass Rate จาก CI/CD:** 2 / 4 (50%)

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
| Critical |1 |
| High |5 |
| Medium |4 |
| Low |2 |
| **รวม** |12|

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
| `proxy-addr` | `GHSA-jqcg-44mw-7w3h` | Critical | `1.1.0 - 2.0.7` | `>= 2.0.8` | มี Fix แล้ว (`npm audit fix`) |
| `source-map-js` | `GHSA-68fv-2mgg-jv7q` | High | `1.0.0 - 1.2.1` | `>= 1.2.2` | มี Fix แล้ว (`npm audit fix`) |
| `vite` | `GHSA-v6wh-96g9-6wx3` | High | `8.0.0 - 8.0.15` | `>= 8.0.16` | มี Fix แล้ว (`npm audit fix`) |
| `form-data` | `GHSA-hmw2-7cc7-3qxx` | High | `4.0.0 - 4.0.5` | `>= 4.0.6` | มี Fix แล้ว (`npm audit fix`) |
| `nanoid` | `GHSA-28wg-ghj8-5hjv` | High | `<= 3.3.17` | `>= 3.3.18` | มี Fix แล้ว (`npm audit fix`) |
| `postcss` | `GHSA-fxqj-rqcc-2cmp` | High | `<= 8.5.22` | `>= 8.5.23` | มี Fix แล้ว (`npm audit fix`) |

**รูปที่ 5 — ผล npm audit Backend**

![alt text](image-5.png)![alt text](image-6.png)

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

**✏️ กรอกจำนวนช่องโหว่จริงที่พบ**

| Severity | จำนวน |
|----------|-------|
| Critical |0 |
| High |12 |
| Medium | 6|
| Low |1 |
| **รวม** |19 |

**รูปที่ 6 — ผล npm audit Frontend**

`![alt text](image-7.png)`

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ☐ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

`![CI Security Scan](./tests/reports/ci-security-scan.png)`

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: สามารถสั่งซื้อสินค้าด้วยจำนวนชิ้นติดลบได้ (Negative Quantity)

| รายการ | ค่า |
|--------|-----|
| **Severity** | High  |
| **Priority** | P2 |
| **Feature** |Order Management |
| **Status** | Fixed |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. ส่ง API Request `POST /api/orders` พร้อมแนบ Authorization Token
2. ระบุ Payload การสั่งซื้อโดยใส่จำนวนสินค้าติดลบ เช่น `{"items": [{"menuId": 1, "quantity": -5}]}`
3. กดส่ง Request ไปยังระบบ

#### Expected Result
> ✏️ ระบบปฏิเสธการสร้างคำสั่งซื้อ และตอบกลับด้วย HTTP Status `400 Bad Request` พร้อมแจ้งว่าจำนวนสินค้าต้องมากกว่า 0

#### Actual Result
> ✏️ ระบบตอบกลับ HTTP Status `201 Created` และบันทึกคำสั่งซื้อโดยคำนวณราคารวมติดลบลงฐานข้อมูล

#### Evidence

`![alt text](image-8.png)`

#### Business Impact
> ✏️ ทำให้ยอดขายรวมของร้านค้าคำนวณผิดพลาด (ยอดเงินติดลบ) และระบบตัดสต็อกสินค้าทำงานผิดปกติ ส่งผลกระทบต่อรายงานทางการเงินและการบัญชี

---

### BUG-002: การร้องขอเมนูที่ไม่มีอยู่จริงในระบบ (Get Non Existent Menu)

| รายการ | ค่า |
|--------|-----|
| **Severity** | High |
| **Priority** | P1  |
| **Feature** |Menu Management |
| **Status** | Fixed |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. เลือก Request **NEG-03 Get Non Existent Menu** ใน Postman Collection
2. ส่งคำขอ `GET /api/menu/99999` (ระบุ ID เมนูที่ไม่มีจริงในระบบ)
3. กดส่ง Request ไปยังระบบ

#### Expected Result
> ✏️ ระบบปฏิเสธการทำรายการ และตอบกลับด้วย HTTP Status `404 Not Found` พร้อมแจ้งข้อความที่ไม่พบรายการ

#### Actual Result
> ✏️ ระบบเกิดข้อผิดพลาด Unhandled Exception และตอบกลับเป็น HTTP Status `500 Internal Server Error`

#### Evidence

`![alt text](image-9.png)`

#### Business Impact
> ✏️ ทำให้เซิร์ฟเวอร์เกิด Unhandled Crash ส่งผลต่อความเสถียรของระบบ และผู้ใช้งานไม่ได้รับข้อความแจ้งเตือนที่ถูกต้อง

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
| Backend API |3000| http://localhost:5173 | — |
| Frontend | 5137 | — | http://localhost:3000 |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | / |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | / |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

`![alt text](image-10.png)`

**รูปที่ 9 — Frontend Login สำเร็จ**

`![alt text](image-11.png)`

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- [/] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [/] กำหนด Port Mapping: backend → 3001, frontend → 80
- [/] เพิ่ม Health Check สำหรับ backend service
- [/] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend |file:./dev.db |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend |http://localhost |
| `NODE_ENV` | backend |production |
| `VITE_API_URL` | frontend |http://localhost:3001 |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend |  มี  | builder -> runner |
| Frontend | มี  | builder -> runner |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

`![alt text](image-12.png) ![alt text](image-13.png)`

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| `sqlite_data` | `./backend/dev.db` | `/app/dev.db` | บันทึกและรักษาข้อมูลฐานข้อมูล SQLite ให้คงอยู่แม้ Container ถูกปิดหรือรีสตาร์ท |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| `rms_network` | `bridge` | `backend`, `frontend` |

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

**✏️ ทดสอบหลัง `docker compose up` สำเร็จ**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | / |
| Frontend | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | /|

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

`![alt text](image-14.png)`

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

`postgresql://neondb_owner:npg_2W0RetgFlhPc@ep-broad-block-b46x5350-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

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
| `DATABASE_URL` | Backend (Render) | file:./dev.db|
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `https://rms-frontend-68030258.vercel.app` |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://rms-backend-68030258.onrender.com` |

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

`![alt text](image-15.png)`

**รูปที่ 13 — Smoke Test Feature 2: Login**

`![alt text](image-16.png)`

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

`![alt text](image-17.png) ![alt text](image-18.png)`

**รูปที่ 15 — Smoke Test Feature 4: Payment**

`![alt text](image-19.png) ![alt text](image-20.png)`

---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขและทดสอบ Pipeline สำเร็จแล้ว**

- [/ ] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [ /] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [ /] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [/ ] เพิ่ม step ติดตั้งและรัน Newman
- [ /] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

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
