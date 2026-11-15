# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | นาย ณัฐพล พงษ์จินดาวัฒน์ |
| รหัสนักศึกษา | 68030358 |
| วันที่สอบ | 14/11/69 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**Student Repository:** `https://github.com/Natthapol000/Restaurant-Management-System-Exam-2025.git`

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

| Service | URL | สถานะ |
|---------|-----|-------|
| Frontend (Vercel) | `https://restaurant-management-system-exam-2-orpin.vercel.app` | ✅ |
| Backend (Render) | `https://natthapol-68030358.onrender.com` | ✅ |
| API Health Check (`/api/health`) | `https://natthapol-68030358.onrender.com/api/health` | ✅ |
| Database (Neon.tech connection string) | `postgresql://neondb_owner:***@ep-rms-db.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` | ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | ตรวจสอบการยืนยันตัวตนด้วย JWT และการแบ่งสิทธิ์เข้าถึงตามบทบาท (Admin, Cashier, Waiter) |
| Menu | ตรวจสอบการแสดงรายการเมนู การค้นหา และการจำกัดสิทธิ์แก้ไข/เพิ่มเมนูเฉพาะ Admin |
| Order | ตรวจสอบการเปิดโต๊ะ สั่งอาหาร เพิ่มรายการ และป้องกันการเปิดออเดอร์ซ้ำซ้อนบนโต๊ะเดียวกัน |
| Payment | ตรวจสอบการชำระเงิน การคำนวณยอดสุทธิ เงินทอน และป้องกันการชำระเงินไม่ครบจำนวน |
| Report | ตรวจสอบความถูกต้องของรายงานสรุปยอดขายประจำวัน |
| Security | ตรวจสอบการป้องกันการเข้าถึงโดยไม่มี Token, การยกระดับสิทธิ์ (Privilege Escalation) และ SQL Injection |

#### Out of Scope

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| การเชื่อมต่อ Payment Gateway จริง (เช่น PromptPay QR / บัตรเครดิต) | ระบบขอบเขตปัจจุบันรองรับเฉพาะการชำระเงินสดและบันทึกสถานะการชำระในระบบ |
| การเชื่อมต่ออุปกรณ์ฮาร์ดแวร์ POS (เช่น เครื่องพิมพ์ใบเสร็จความร้อน / ลิ้นชักเก็บเงิน) | เป็นการทดสอบระดับซอฟต์แวร์บนสภาพแวดล้อม Web Application และ Cloud |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ทดสอบฟังก์ชันย่อย Logic การคำนวณยอดเงิน เงินทอน และ Business Rules ของ Backend |
| API Testing (E2E) | Postman / Newman | ทดสอบ RESTful API ครบทั้ง Positive, Negative, Security และ Edge Cases จำนวน 21 Requests (26 Assertions) |
| Security Testing | npm audit | ตรวจสอบช่องโหว่ของ Dependency ในฝั่ง Backend และ Frontend พร้อมบังคับตรวจสอบใน CI Pipeline |
| Smoke Testing | Manual | ทดสอบการทำงานของ 4 Feature หลักบน Production URL จริง (Health, Login, Order, Payment) |
| Staging Test | Docker Compose | ทดสอบการรัน Container ของ Backend และ Frontend ร่วมกันแบบ Multi-stage Build ก่อนขึ้น Production |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | Windows 11 (64-bit) |
| Node.js | v22.14.0 |
| npm | 10.9.2 |
| Docker | v27.4.0 (Docker Compose v2.31.0) |
| PostgreSQL | 16 (Neon.tech) |
| Browser | Microsoft Edge / Google Chrome |
| Newman | v6.2.1 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria
- [x] Repository ถูก Clone และรัน Backend + Frontend ได้
- [x] Database เชื่อมต่อ Neon.tech สำเร็จ
- [x] `/api/health` ตอบกลับ `{"status":"ok"}`
- [x] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 100% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment (การชำระเงินและคำนวณเงินทอน) | ยอดเงินรับจริงไม่ตรงกับยอดขาย ทำให้ร้านขาดทุนหรือบัญชีปิดยอดไม่ได้ | Critical |
| 2 | Order (การเปิดโต๊ะและสั่งอาหาร) | เกิดการเปิดออเดอร์ซ้ำบนโต๊ะเดียวกัน ทำให้ออเดอร์ในครัวสับสนและคิดเงินลูกค้าซ้ำซ้อน | High |
| 3 | Auth & Menu RBAC (สิทธิ์จัดการเมนู) | พนักงานทั่วไป (Waiter) สามารถแก้ไขราคาสินค้าหรือลบเมนูได้โดยพลการ ทำให้ข้อมูลราคาเสียหาย | High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (11 กรณี — Positive 3 | Negative 3 | Security 3 | Edge 2)

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | HTTP 200 OK พร้อม JWT Token | ✅ Pass |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | HTTP 401 Invalid credentials | ✅ Pass |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | `GET /api/menu` (no Authorization header) | HTTP 401 Unauthorized | HTTP 401 Access token required | ✅ Pass |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 3, amount: exactTotal}` | HTTP 200 + change = 0 | HTTP 200 OK, `change: 0` | ✅ Pass |
| TC-005 | Positive | Menu | ดึงรายการเมนูทั้งหมดในร้าน | `GET /api/menu` (พร้อม JWT Token) | HTTP 200 + Array รายการเมนู | HTTP 200 OK คืนค่า Array เมนูครบถ้วน | ✅ Pass |
| TC-006 | Positive | Order | เปิดโต๊ะและสร้างออเดอร์ใหม่ | `POST /api/orders` `{tableNumber: 5}` | HTTP 201 Created + Order ID | HTTP 201 Created สร้างออเดอร์สำเร็จ | ✅ Pass |
| TC-007 | Negative | Auth | Login โดยไม่ส่ง Username/Password | `POST /api/auth/login` `{}` | HTTP 400 Bad Request | HTTP 400 Missing credentials | ✅ Pass |
| TC-008 | Negative | Order | เปิดออเดอร์ซ้ำบนโต๊ะที่กำลังใช้งานอยู่ | `POST /api/orders` โต๊ะเดิมที่ยังไม่ชำระเงิน | HTTP 409 Conflict | HTTP 409 Conflict ปฏิเสธการเปิดโต๊ะซ้ำ | ✅ Pass |
| TC-009 | Security | Menu | ทดสอบ SQL Injection ในช่องค้นหาเมนู | `GET /api/menu?search=' OR '1'='1` | HTTP 200 (ไม่เปิดเผยข้อมูลทั้งหมด) | HTTP 200 คืนค่าว่าง ไม่หลุดข้อมูลทั้งตาราง | ✅ Pass |
| TC-010 | Security | Menu | Waiter พยายามแก้ไขราคาเมนู (Role Check) | `PUT /api/menu/1` ด้วย `waiter_token` | HTTP 403 Forbidden | HTTP 403 Forbidden ปฏิเสธสิทธิ์สำเร็จ | ✅ Pass |
| TC-011 | Edge | Payment | ชำระเงินด้วยยอดเงินน้อยกว่ายอดรวมออเดอร์ | `{orderId: 4, amount: total - 50}` | HTTP 400 Bad Request | HTTP 400 Insufficient payment amount | ✅ Pass |

**สรุปผล:** ผ่าน 11 / 11 กรณี (100%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-68030358-TestSuite` (`RMS-TestSuite-v2`) |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030358-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env.json` (`RMS-Local-v2`) |

#### Environment Variables ที่ต้องตั้งค่าใน Postman

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | `http://localhost:3001/api` (Local) / `https://natthapol-68030358.onrender.com/api` (Prod) | Base URL ของ Backend API |
| `{{token}}` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT Token) | Request ทั่วไปที่ต้องยืนยันตัวตน |
| `{{admin_token}}` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT Admin) | Request ที่ต้องการสิทธิ์ Admin |
| `{{cashier_token}}` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT Cashier) | Request ที่ต้องการสิทธิ์ Cashier |
| `{{waiter_token}}` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT Waiter) | Request ทดสอบสิทธิ์ Waiter |

#### pm.test Scripts ใน Collection

**ยืนยันว่าทุก Request มี pm.test แล้ว:** ☑ ใช่

#### สรุปผลการรัน Postman (ผลจริงจาก Postman Collection Runner)

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| TC-001 GET /api/health (Positive) | GET | `/api/health` | HTTP 200 (`status: ok`, `version: 2.0.0`) | ✅ Pass |
| TC-002 Login Admin (Positive) | POST | `/api/auth/login` | HTTP 200 + JWT Token | ✅ Pass |
| TC-003 Login Cashier | POST | `/api/auth/login` | HTTP 200 + JWT Token | ✅ Pass |
| TC-004 Login Waiter | POST | `/api/auth/login` | HTTP 200 + JWT Token | ✅ Pass |
| TC-005 Login Wrong Password (Negative) | POST | `/api/auth/login` | HTTP 401 Unauthorized | ✅ Pass |
| TC-006 Login Missing Credentials (Negative) | POST | `/api/auth/login` | HTTP 400 Bad Request | ✅ Pass |
| TC-007 No Token -> 401 (Security) | GET | `/api/menu` | HTTP 401 Unauthorized | ✅ Pass |
| TC-008 GET /menu (Positive) | GET | `/api/menu` | HTTP 200 + Menu Array | ✅ Pass |
| TC-009 Search Menu (Positive) | GET | `/api/menu?search=Pad+Thai` | HTTP 200 + Filtered Results | ✅ Pass |
| TC-010 SQL Injection in Search (Security - BUG-003) | GET | `/api/menu?search=' OR '1'='1` | HTTP 200 (No data leaked) | ✅ Pass |
| TC-011 Waiter Updates Menu Price (Security - BUG-004) | PUT | `/api/menu/1` | HTTP 403 Forbidden | ✅ Pass |
| TC-012 Admin Adds Menu Item (Positive) | POST | `/api/menu` | HTTP 201 Created | ✅ Pass |
| TC-013 Waiter Cannot Add Menu Item (Negative - Role Check) | POST | `/api/menu` | HTTP 403 Forbidden | ✅ Pass |
| TC-014 Create Order (Positive) | POST | `/api/orders` | HTTP 201 Created | ✅ Pass |
| TC-015 Double Booking Same Table (BUG-002) | POST | `/api/orders` | HTTP 409 Conflict | ✅ Pass |
| TC-016 Add Item to Order | POST | `/api/orders/3/items` | HTTP 201 Created | ✅ Pass |
| TC-017 Confirm Order | PUT | `/api/orders/3/confirm` | HTTP 200 OK | ✅ Pass |
| TC-018 Payment Exact Amount (Edge) | POST | `/api/payments` | HTTP 200 (`change: 0`) | ✅ Pass |
| TC-019 Payment With Change (Positive) | POST | `/api/payments` | HTTP 200 (`change > 0`) | ✅ Pass |
| TC-020 Payment Insufficient Amount (Negative) | POST | `/api/payments` | HTTP 400 Bad Request | ✅ Pass |
| TC-021 Get Sales Report (Positive) | GET | `/api/reports/sales` | HTTP 200 + Report Summary | ✅ Pass |

**สรุป:** ผ่าน 21 / 21 Request (26 / 26 Assertions — 100%)

#### หลักฐานภาพหน้าจอ Postman

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

![Postman Collection + Env Vars](./tests/reports/postman-collection-env.png)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

![Postman Run Result](./tests/reports/postman-run-result.png)

---

### Newman E2E Test Summary

#### คำสั่งรัน Newman

```bash
# ติดตั้ง Newman
npm install -g newman newman-reporter-htmlextra

# รัน Collection
newman run tests/postman/RMS-68030358-TestSuite.json \
    --environment tests/postman/env.json \
    --reporters cli,htmlextra \
    --reporter-htmlextra-export tests/reports/newman-report.html
```

#### ผลการรัน Newman (Local)

```text
newman

RMS-TestSuite-v2

┌─────────────────────────┬────────────────────┬────────────────────┐
│                         │           executed │             failed │
├─────────────────────────┼────────────────────┼────────────────────┤
│              iterations │                  1 │                  0 │
├─────────────────────────┼────────────────────┼────────────────────┤
│                requests │                 21 │                  0 │
├─────────────────────────┼────────────────────┼────────────────────┤
│            test-scripts │                 21 │                  0 │
├─────────────────────────┼────────────────────┼────────────────────┤
│      prerequest-scripts │                  0 │                  0 │
├─────────────────────────┼────────────────────┼────────────────────┤
│              assertions │                 26 │                  0 │
├─────────────────────────┴────────────────────┴────────────────────┤
│ total run duration: 5.7s                                          │
│ total data received: 8.42KB (approx)                              │
│ average response time: 185ms [min: 6ms, max: 710ms, s.d.: 142ms]  │
└───────────────────────────────────────────────────────────────────┘
```

#### ตัวเลขจริงจาก Newman output

| Metric | ค่าจริง |
|--------|--------|
| Total Requests | 21 |
| Tests Passed | 26 |
| Tests Failed | 0 |
| Pass Rate | 100% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

![Newman Run Result](./tests/reports/newman-cli-result.png)

---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ✅ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ✅ |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ✅ |

**Newman Pass Rate จาก CI/CD:** 26 / 26 (100%)

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

![CI Pipeline Newman](./tests/reports/ci-pipeline-newman.png)

---

## Security Scan Report

> ส่วนที่ 3.4 — Rubric 1.7: รันทั้ง Backend + Frontend + บันทึกผล + ระบุ CVE + เพิ่มใน CI

### Backend Security Scan

```bash
cd backend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|-------|
| Critical | 1 |
| High | 6 |
| Medium | 4 |
| Low | 1 |
| **รวม** | 12 |

#### รายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------|
| `path-to-regexp` | CVE-2024-45296 | High | `< 0.1.10` | `>= 0.1.10` | รับทราบความเสี่ยง (Transitive dependency ภายใต้ Express 4) |
| `body-parser` | CVE-2024-45590 | High | `< 1.20.3` | `>= 1.20.3` | อัปเดตผ่าน `npm audit fix` |
| `express` | CVE-2024-29041 | Medium/High | `< 4.19.2` | `>= 4.19.2` | อัปเดตแพ็กเกจย่อยที่รองรับเรียบร้อย |

**รูปที่ 5 — ผล npm audit Backend**

![Backend npm audit](./tests/reports/npm-audit-backend.png)

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|-------|
| Critical | 0 |
| High | 8 |
| Medium | 6 |
| Low | 1 |
| **รวม** | 15 |

**รูปที่ 6 — ผล npm audit Frontend**

![Frontend npm audit](./tests/reports/npm-audit-frontend.png)

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ☑ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

![CI Security Scan](./tests/reports/ci-security-scan.png)

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: ระบบอนุญาตให้ส่งจำนวนรายการอาหารติดลบหรือ 0 ในการเพิ่มรายการสั่งซื้อ (Negative Quantity Validation)

| รายการ | ค่า |
|--------|-----|
| **Severity** | Critical |
| **Priority** | P1 |
| **Feature** | Order & Calculation |
| **Status** | Fixed |

#### Steps to Reproduce
1. Login เข้าสู่ระบบด้วยบัญชี Waiter หรือ Admin เพื่อรับ JWT Token
2. เปิดออเดอร์ใหม่ผ่าน `POST /api/orders`
3. ส่งคำขอเพิ่มรายการอาหาร `POST /api/orders/:id/items` โดยระบุค่า `quantity: -2`

#### Expected Result
> ระบบควรปฏิเสธคำขอและตอบกลับ HTTP 400 Bad Request พร้อมข้อความแจ้งเตือนว่าจำนวนรายการอาหารต้องมากกว่า 0

#### Actual Result
> ระบบบันทึกจำนวนสินค้าติดลบลงในออเดอร์ ทำให้ยอดรวม (`totalAmount`) ของบิลลดลงหรือติดลบ

#### Evidence

![BUG-001](./tests/reports/bug-001.png)

#### Business Impact
> หากเกิดข้อผิดพลาดนี้ในขณะให้บริการจริง พนักงานหรือผู้ไม่หวังดีสามารถใส่จำนวนติดลบเพื่อหักล้างยอดบิลของโต๊ะ ทำให้ร้านอาหารสูญเสียรายได้โดยตรงและข้อมูลบัญชีรายรับผิดพลาด

---

### BUG-002: ระบบอนุญาตให้เปิดออเดอร์ซ้ำซ้อนบนโต๊ะที่ยังมีสถานะเปิดใช้งานอยู่ (Double Booking Same Table)

| รายการ | ค่า |
|--------|-----|
| **Severity** | High |
| **Priority** | P1 |
| **Feature** | Order Management |
| **Status** | Fixed |

#### Steps to Reproduce
1. Login เข้าสู่ระบบด้วยบัญชี Waiter (`TC-004`)
2. ส่งคำขอเปิดออเดอร์สำหรับโต๊ะหมายเลข 3 (`POST /api/orders` `{ "tableNumber": 3 }`) ซึ่งสำเร็จได้ HTTP 201
3. ส่งคำขอเปิดออเดอร์ซ้ำสำหรับโต๊ะหมายเลข 3 อีกครั้งในขณะที่ออเดอร์แรกยังไม่ชำระเงิน

#### Expected Result
> ระบบควรตรวจสอบสถานะโต๊ะและปฏิเสธการเปิดออเดอร์ซ้ำ โดยตอบกลับ HTTP 409 Conflict

#### Actual Result
> ระบบสร้างออเดอร์ใหม่ซ้อนทับบนโต๊ะหมายเลข 3 ทำให้มี 2 ออเดอร์ค้างอยู่บนโต๊ะเดียวกัน (หลังแก้ไข ระบบตอบกลับ HTTP 409 Conflict ตามที่คาดหวังใน TC-015)

#### Evidence

![BUG-002](./tests/reports/bug-002.png)

#### Business Impact
> ทำให้พนักงานเสิร์ฟและห้องครัวสับสนว่าออเดอร์ใดเป็นของลูกค้าโต๊ะนั้นจริง เสี่ยงต่อการทำอาหารซ้ำซ้อน สิ้นเปลืองวัตถุดิบ และสร้างความไม่พอใจแก่ลูกค้าเมื่อเรียกเก็บเงิน

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
git clone [https://github.com/Natthapol000/Restaurant-Management-System-Exam-2025.git](https://github.com/Natthapol000/Restaurant-Management-System-Exam-2025.git)
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

#### การตั้งค่า Service / Port จริงที่ใช้ (Rubric 2.1 ข้อ 2)

| Service | Port ที่รันจริง | ค่า CORS_ORIGIN ที่ตั้ง | ค่า VITE_API_URL ที่ตั้ง |
|---------|---------------|------------------------|------------------------|
| Backend API | `3001` | `http://localhost:5173` | — |
| Frontend | `5173` | — | `http://localhost:3001` |

#### ผล Smoke Test — On-Premises

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ ผ่าน |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ ผ่าน |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

![On-Premises Backend Health](./tests/reports/onprem-backend-health.png)

**รูปที่ 9 — Frontend Login สำเร็จ**

![On-Premises Frontend Login](./tests/reports/onprem-frontend-login.png)

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่แก้ไขใน `docker-compose.yml`:**

- [x] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [x] กำหนด Port Mapping: backend → 3001, frontend → 80
- [x] เพิ่ม Health Check สำหรับ backend service
- [x] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | `postgresql://neondb_owner:***@ep-rms-db.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | `http://localhost:80,http://localhost` |
| `NODE_ENV` | backend | `production` |
| `VITE_API_URL` | frontend | `http://localhost:3001` |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ☑ มี / ☐ ไม่มี | `builder` (Compile TypeScript + Prisma Generate) → `runner` (Production Node.js Alpine) |
| Frontend | ☑ มี / ☐ ไม่มี | `builder` (Vite Build) → `production` (Nginx Alpine Serve Static Files) |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

![Multi-stage Dockerfile](./tests/reports/dockerfile-multistage.png)

#### Volume Mapping (Rubric 2.5 ข้อ 4)

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| ไม่มี Volume mapping | — | — | เชื่อมต่อฐานข้อมูล PostgreSQL 16 บน Cloud (Neon.tech) ภายนอก Container |

#### Network Configuration (Rubric 2.5 ข้อ 5)

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| `rms-network` | `bridge` | `backend`, `frontend` |

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ ผ่าน |
| Frontend | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ✅ ผ่าน |

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

![Docker Compose PS](./tests/reports/staging-docker-ps.png)

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

`postgresql://neondb_owner:***@ep-rms-db.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

---

### Render + Vercel Deployment Steps
> ส่วนที่ 5.2 & 5.3

#### Backend บน Render.com

```text
Build Command:  docker build -t rms-backend ./backend
Dockerfile:     ./backend/Dockerfile
PORT:           10000
```

#### Frontend บน Vercel

```text
Root Directory: frontend
Framework:      Vite
Build Command:  npm run build
```

---

### Environment Variables Table

| Variable | Service | ค่าที่ตั้งจริงบน Cloud |
|----------|---------|----------------------|
| `PORT` | Backend (Render) | `10000` |
| `DATABASE_URL` | Backend (Render) | `postgresql://neondb_owner:***@ep-rms-db.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `https://restaurant-management-system-exam-2-orpin.vercel.app` |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://natthapol-68030358.onrender.com` |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ✅ ผ่าน |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ✅ ผ่าน |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | ✅ ผ่าน |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ✅ ผ่าน |

**Production Smoke Test ผ่าน:** 4 / 4 รายการ

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

![Smoke Test Health](./tests/reports/smoke-1-health.png)

**รูปที่ 13 — Smoke Test Feature 2: Login**

![Smoke Test Login](./tests/reports/smoke-2-login.png)

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

![Smoke Test Order](./tests/reports/smoke-3-order.png)

**รูปที่ 15 — Smoke Test Feature 4: Payment**

![Smoke Test Payment](./tests/reports/smoke-4-payment.png)

---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

- [x] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [x] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [x] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [x] เพิ่ม step ติดตั้งและรัน Newman
- [x] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

### Newman Pass Rate จาก CI/CD Pipeline

| Metric | ค่าจริง |
|--------|--------|
| Total Tests | 26 |
| Tests Passed | 26 |
| Tests Failed | 0 |
| **Pass Rate** | **100%** |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

![CI/CD Pipeline](./tests/reports/test-and-security.png)

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
