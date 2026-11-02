# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | _กรอกชื่อ-นามสกุล_ |
| รหัสนักศึกษา | _กรอกรหัสนักศึกษา_ |
| วันที่สอบ | 2 พฤศจิกายน 2569 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/rarekk/Restaurant-Management-System-Exam-2025.git`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend | Node.js 22 LTS + Express + TypeScript |
| Database | PostgreSQL 17 (Supabase `eu-central-1`) |
| ORM | Prisma |
| Testing | Vitest (Unit) + Newman (E2E) |
| Container | Docker / Docker Compose |
| CI/CD | GitHub Actions |

---

## Production URLs

**✏️ แทนที่ URL placeholder ด้วย URL จริงหลัง Deploy เสร็จ แล้วเปลี่ยนสถานะเป็น ✅ หรือ ❌**

| Service | URL (กรอก URL จริง) | สถานะ |
|---------|---------------------|-------|
| Frontend (Vercel) | `https://restaurant-management-system-exam-2025.vercel.app` | ✅ |
| Backend (Render) | `https://rms-backend-52xr.onrender.com` | ✅ |
| API Health Check (`/api/health`) | `https://rms-backend-52xr.onrender.com/api/health` | ✅ |
| Database (Supabase connection string) | `postgresql://postgres.dtuzbmsbcsdkaeibtpeq:***@aws-1-eu-central-1.pooler.supabase.com:5432/postgres` | ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | ตรวจสอบการยืนยันตัวตนด้วย Username/Password และการออก JWT Token ตาม Role (`admin`, `cashier`, `waiter`) |
| Menu | ตรวจสอบการดึงรายการเมนู ค้นหาเมนู และการจำกัดสิทธิ์ในการเพิ่ม/แก้ไข/ลบเมนูเฉพาะผู้ดูแลระบบ |
| Order | ตรวจสอบการเปิดโต๊ะ เพิ่มรายการอาหาร ยืนยันออเดอร์ และยกเลิกออเดอร์ รวมถึงป้องกันการเปิดโต๊ะซ้ำ |
| Payment | ตรวจสอบการรับชำระเงิน การคำนวณเงินทอน และการเปลี่ยนสถานะออเดอร์/โต๊ะหลังชำระเงิน |
| Report | ตรวจสอบความถูกต้องของรายงานสรุปยอดขายและประวัติออเดอร์ |
| Security | ตรวจสอบการป้องกันการเข้าถึง API โดยไม่มี Token, การจำกัดสิทธิ์ตาม Role (RBAC) และการป้องกัน SQL Injection |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| Third-party Payment Gateway (ตัดบัตรเครดิต/QR ธนาคารจริง) | ระบบใช้การจำลองสถานะการชำระเงิน (`cash`, `card`, `qr`) ภายในฐานข้อมูล ไม่ได้เชื่อมต่อธนาคารภายนอก |
| Load / Stress Testing | ขอบเขตการสอบมุ่งเน้น Functional, Security และ E2E Deployment บน Free Tier Cloud |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ทดสอบฟังก์ชันคำนวณเงินทอนและการตรวจสอบยอดชำระเงินใน Backend (`backend/tests/`) |
| API Testing (E2E) | Postman / Newman | ทดสอบ REST API ทั้ง 21 กรณีทดสอบ (Positive, Negative, Security, Edge) อัตโนมัติ |
| Security Testing | npm audit + Postman | ตรวจสอบช่องโหว่ของ Dependencies และทดสอบ SQL Injection / Broken Access Control |
| Smoke Testing | Manual + Script | ทดสอบ 4 ฟีเจอร์หลักบน Production (Health Check, Login, Open Order, Payment) |
| Staging Test | Docker Compose | ทดสอบการรัน Container ของ Backend และ Frontend ร่วมกันผ่าน Docker Compose |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | Windows 11 (x64) |
| Node.js | v24.21.0 (Runtime) / v22 LTS (Docker & CI) |
| npm | 10.x |
| Docker | Docker Engine v27+ / Compose v2+ |
| PostgreSQL | PostgreSQL 17 (Supabase `eu-central-1`) |
| Browser | Google Chrome (Latest) |
| Newman | 6.x |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
- [x] Repository ถูก Clone และรัน Backend + Frontend ได้
- [x] Database เชื่อมต่อ Supabase สำเร็จ
- [x] `/api/health` ตอบกลับ `{"status":"ok"}`
- [x] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 80% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | รายงานครบถ้วนใน Bug Reports (≤ 0 รายการที่ไม่ได้รายงาน) |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment (การรับชำระเงินและคำนวณเงินทอน) | หากระบบยอมให้ชำระเงินน้อยกว่ายอดรวม (Underpayment) จะทำให้ร้านอาหารขาดทุนและยอดเงินในลิ้นชักติดลบ | `Critical` |
| 2 | Menu & Security (สิทธิ์การแก้ไขราคาและ SQL Injection) | พนักงานที่ไม่มีสิทธิ์สามารถแก้ราคาอาหารเป็น 1 บาทได้ หรือผู้โจมตีดึงข้อมูลผ่าน SQL Injection | `High` |
| 3 | Order Management (การเปิดโต๊ะรับออเดอร์) | หากเปิดโต๊ะซ้ำซ้อน (Double Booking) จะทำให้ออเดอร์ของลูกค้าปนกันและคิดเงินผิดโต๊ะ | `High` |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | System | ตรวจสอบสถานะระบบ Health Check | `GET /api/health` | HTTP 200 + `{"status":"ok"}` | HTTP 200 + `{"status":"ok","version":"2.0.0"}` | ✅ Pass |
| TC-002 | Positive | Auth | Login ด้วย credential ถูกต้อง (Admin) | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | HTTP 200 + JWT Token | ✅ Pass |
| TC-003 | Positive | Menu | ดึงรายการเมนูอาหารทั้งหมด | `GET /api/menu` (พร้อม Bearer Token) | HTTP 200 + Array เมนู 10 รายการ | HTTP 200 + Array เมนู 10 รายการ | ✅ Pass |
| TC-004 | Positive | Order | เปิดโต๊ะสร้างออเดอร์ใหม่และเพิ่มรายการอาหาร | `POST /api/orders` `{tableId: 10}` + `POST /items` | HTTP 201 + คำนวณ `totalAmount` ถูกต้อง | HTTP 201 + `totalAmount: 160` | ✅ Pass |
| TC-005 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | HTTP 401 `{"error":"Invalid credentials"}` | ✅ Pass |
| TC-006 | Negative | Auth | Login โดยไม่ส่ง username/password | `{}` | HTTP 400 Bad Request | HTTP 400 `{"error":"Username and password required"}` | ✅ Pass |
| TC-007 | Negative | Order | เปิดออเดอร์โดยไม่ระบุ `tableId` | `POST /api/orders` `{}` | HTTP 400 Bad Request | HTTP 400 `{"error":"tableId required"}` | ✅ Pass |
| TC-008 | Negative |Order | เปิดออเดอร์ซ้ำบนโต๊ะที่มีออเดอร์เปิดอยู่ (Double Booking) | `POST /api/orders` `{tableId: 2}` ซ้ำ 2 ครั้ง | HTTP 409 Conflict | HTTP 201 Created (ยอมให้เปิดซ้ำ — BUG-002) | ❌ Fail |
| TC-009 | Security | Auth | เรียก API โดยไม่มี JWT Token | `GET /api/orders` (ไม่มี Authorization header) | HTTP 401 Unauthorized | HTTP 401 `{"error":"Access token required"}` | ✅ Pass |
| TC-010 | Security | Menu | ทดสอบ SQL Injection ในช่องค้นหาเมนู | `GET /api/menu?search=' OR '1'='1` | HTTP 400 หรือคืนค่าว่าง `[]` | HTTP 200 คืนเมนูทั้งหมด 10 รายการ (BUG-003) | ❌ Fail |
| TC-011 | Security | Menu | พนักงานเสิร์ฟ (`waiter`) แก้ไขราคาเมนูอาหาร | `PUT /api/menu/1` `{price: 1}` ด้วย Waiter Token | HTTP 403 Forbidden | HTTP 200 OK แก้ไขราคาสำเร็จ (BUG-004) | ❌ Fail |
| TC-012 | Edge | Payment | ชำระเงินพอดียอดรวม (`change = 0`) | `{orderId: 1, amountPaid: 160, method: "cash"}` | HTTP 201 + `change = 0` | HTTP 201 + `change = 0` | ✅ Pass |
| TC-013 | Edge | Payment | ชำระเงินน้อยกว่ายอดรวม (Underpayment) | `{orderId: 1, amountPaid: 1, method: "cash"}` | HTTP 400 Bad Request | HTTP 201 + เงินทอนติดลบ `change < 0` (BUG-001) | ❌ Fail |

**✏️ สรุปผล:** ผ่าน 9 / 13 กรณีในตารางหลัก (และผ่าน 17 / 21 กรณีในชุดทดสอบ Newman คิดเป็น 81.0%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-TestSuite-v2` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-TestSuite-v2.json` |
| ไฟล์ Environment | `tests/postman/env.json` |

#### Environment Variables ที่ต้องตั้งค่าใน Postman

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | `https://rms-backend-52xr.onrender.com/api` | Base URL ของ Backend API บน Render |
| `{{token}}` | (ตั้งค่าอัตโนมัติผ่าน Script หลัง Login) | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | (ตั้งค่าอัตโนมัติจาก TC-002 Login Admin) | Request ที่ต้องการสิทธิ์ Admin |

**✏️ ยืนยันว่าทุก Request มี pm.test แล้ว:** ☑ ใช่

#### สรุปผลการรัน Postman (กรอกหลังรัน Collection Run)

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| TC-001 GET /api/health | GET | `/api/health` | 200 OK (`status: "ok"`) | ✅ Pass |
| TC-002 Login Admin | POST | `/api/auth/login` | 200 OK + JWT Token | ✅ Pass |
| TC-003 Login Cashier | POST | `/api/auth/login` | 200 OK + JWT Token | ✅ Pass |
| TC-004 Login Waiter | POST | `/api/auth/login` | 200 OK + JWT Token | ✅ Pass |
| TC-005 Login Wrong Password | POST | `/api/auth/login` | 401 Unauthorized | ✅ Pass |
| TC-006 Login Missing Credentials | POST | `/api/auth/login` | 400 Bad Request | ✅ Pass |
| TC-007 No Token → 401 | GET | `/api/menu` | 401 Unauthorized | ✅ Pass |
| TC-008 GET /menu | GET | `/api/menu` | 200 OK (10 items) | ✅ Pass |
| TC-009 Search Menu | GET | `/api/menu?search=Pad+Thai` | 200 OK (1 item) | ✅ Pass |
| TC-010 SQL Injection in Search | GET | `/api/menu?search=' OR '1'='1` | 200 OK (รั่วไหล 10 รายการ — BUG-003) | ❌ Fail |
| TC-011 Waiter Updates Menu Price | PUT | `/api/menu/1` | 200 OK (Waiter แก้ราคาได้ — BUG-004) | ❌ Fail |
| TC-012 Admin Adds Menu Item | POST | `/api/menu` | 201 Created | ✅ Pass |
| TC-013 Waiter Cannot Add Menu Item | POST | `/api/menu` | 403 Forbidden | ✅ Pass |
| TC-014 Create Order | POST | `/api/orders` | 201 Created | ✅ Pass |
| TC-015 Double Booking Same Table | POST | `/api/orders` | 201 Created (เปิดโต๊ะซ้ำได้ — BUG-002) | ❌ Fail |
| TC-016 Add Item to Order | POST | `/api/orders/:id/items` | 201 Created | ✅ Pass |
| TC-017 Confirm Order | PUT | `/api/orders/:id/confirm` | 200 OK (`confirmed`) | ✅ Pass |
| TC-018 Create Order Without TableId | POST | `/api/orders` | 400 Bad Request | ✅ Pass |
| TC-019 Exact Payment | POST | `/api/payments` | 201 Created (`change >= 0`) | ✅ Pass |
| TC-020 Underpayment | POST | `/api/payments` | 404/201 (ไม่ดัก Underpayment — BUG-001) | ❌ Fail |
| TC-021 Payment Without Auth | POST | `/api/payments` | 401 Unauthorized | ✅ Pass |

**✏️ สรุป:** ผ่าน 17 / 21 Request (81.0%)

#### หลักฐานภาพหน้าจอ Postman

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

`![Postman Collection + Env Vars](./tests/reports/postman-collection-env.png)`

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

`![Postman Run Result](./tests/reports/postman-run-result.png)`

---

### Newman E2E Test Summary

#### คำสั่งรัน Newman

```bash
# ติดตั้ง Newman (ถ้ายังไม่ได้ติดตั้ง)
npm install -g newman newman-reporter-htmlextra

# รัน Collection
newman run tests/postman/RMS-TestSuite-v2.json \
    --environment tests/postman/env.json \
    --reporters cli,htmlextra \
    --reporter-htmlextra-export tests/reports/newman-report.html
```

#### ผลการรัน Newman (Local)

```
newman

RMS-TestSuite-v2

→ Health & System
  GET https://rms-backend-52xr.onrender.com/api/health [200 OK]
  ✓  TC-001: health returns 200
  ✓  TC-001: status is ok
  ✓  TC-001: version 2.0.0

→ Authentication
  POST https://rms-backend-52xr.onrender.com/api/auth/login [200 OK]
  ✓  TC-002: admin login 200
  ✓  TC-002: returns JWT token
  ✓  TC-003: cashier login 200
  ✓  TC-004: waiter login 200
  ✓  TC-005: wrong password → 401
  ✓  TC-006: missing creds → 400
  ✓  TC-007: no token → 401

→ Menu
  ✓  TC-008: get menu 200
  ✓  TC-009: search returns results
  ✗  TC-010 [BUG-003]: SQL Injection should NOT leak all records
  ✗  TC-011 [BUG-004]: Waiter cannot update menu price (expect 403)
  ✓  TC-012: admin adds menu item → 201
  ✓  TC-013: waiter cannot add menu → 403

→ Orders
  ✓  TC-014: create order → 201
  ✗  TC-015 [BUG-002]: Double booking → 409 Conflict
  ✓  TC-016: add item → 201
  ✓  TC-017: confirm order → 200
  ✓  TC-018: missing tableId → 400

→ Payment
  ✓  TC-019: payment → 201
  ✗  TC-020 [BUG-001]: Underpayment should → 400
  ✓  TC-021: no auth → 401
```

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests | 21 |
| Tests Passed | 17 |
| Tests Failed | 4 |
| Pass Rate | 81.0% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

`![Newman Run Result](./tests/reports/newman-cli-result.png)`

---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
| `.github/workflows/ci.yml` / `cicd-2.yml` มี step ติดตั้งและรัน Test | ✅ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ✅ |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ✅ |

**✏️ Newman Pass Rate จาก CI/CD:** 17 / 21 (81.0%)

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

`![CI Pipeline Newman](./tests/reports/ci-pipeline-newman.png)`

---

## Security Scan Report

> ส่วนที่ 3.4 — Rubric 1.7: รันทั้ง Backend + Frontend + บันทึกผล + ระบุ CVE + เพิ่มใน CI

### Backend Security Scan

```bash
cd backend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| **รวม** | **0** |

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
| ไม่พบช่องโหว่ระดับ High ขึ้นไป | — | — | — | — | ปลอดภัย |

**รูปที่ 5 — ผล npm audit Backend**

`![Backend npm audit](./tests/reports/npm-audit-backend.png)`

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |
| **รวม** | **0** |

**รูปที่ 6 — ผล npm audit Frontend**

`![Frontend npm audit](./tests/reports/npm-audit-frontend.png)`

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ☑ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

`![CI Security Scan](./tests/reports/ci-security-scan.png)`

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: ระบบรับชำระเงินอนุญาตให้จ่ายเงินน้อยกว่ายอดรวมและคิดเงินทอนติดลบ (Underpayment)

| รายการ | ค่า |
|--------|-----|
| **Severity** | Critical |
| **Priority** | P1 |
| **Feature** | Payment (`POST /api/payments`) |
| **Status** | Open |

#### Steps to Reproduce
1. เข้าสู่ระบบด้วย `waiter1` เปิดโต๊ะ เพิ่มรายการอาหาร (เช่น ยอดรวม 160 บาท) และกดยืนยันออเดอร์ (`PUT /api/orders/:id/confirm`)
2. เข้าสู่ระบบด้วย `cashier1` แล้วส่งคำขอ `POST /api/payments` ด้วยข้อมูล `{"orderId": 1, "amountPaid": 100, "method": "cash"}`
3. สังเกตผลลัพธ์จาก API

#### Expected Result
> ระบบต้องตรวจสอบว่า `amountPaid >= totalAmount` หากน้อยกว่าต้องปฏิเสธด้วย HTTP `400 Bad Request` (`{"error": "Insufficient payment amount"}`)

#### Actual Result
> ระบบบันทึกการชำระเงินสำเร็จและตอบกลับ HTTP `201 Created` พร้อมคำนวณเงินทอนติดลบ (`"change": -60`) และเปลี่ยนสถานะออเดอร์เป็น `paid`

#### Evidence

`![BUG-001](./tests/reports/bug-001.png)`

#### Business Impact
> ส่งผลกระทบโดยตรงต่อรายได้ของร้านอาหาร เนื่องจากแคชเชียร์อาจคีย์จำนวนเงินผิดหรือรับเงินไม่ครบแต่ระบบปิดบิลให้ผ่าน ทำให้เกิดยอดขาดทุนและยอดเงินในลิ้นชักไม่ตรงกับรายงานยอดขาย

---

### BUG-002: ช่องโหว่ SQL Injection ในการค้นหาเมนู (`GET /api/menu`) และการไม่จำกัดสิทธิ์แก้ไขราคาเมนู (`PUT /api/menu/:id`)

| รายการ | ค่า |
|--------|-----|
| **Severity** | Critical |
| **Priority** | P1 |
| **Feature** | Menu & Security (`GET /api/menu`, `PUT /api/menu/:id`) |
| **Status** | Open |

#### Steps to Reproduce
1. **SQL Injection (BUG-003):** ส่งคำขอ `GET /api/menu?search=' OR '1'='1` พร้อม Token ใดก็ได้ ระบบใช้ `prisma.$queryRawUnsafe` ต่อ String โดยตรง
2. **Broken Access Control (BUG-004):** เข้าสู่ระบบด้วยบัญชี `waiter1` (`role: waiter`) แล้วส่งคำขอ `PUT /api/menu/1` พร้อม Body `{"price": 1}`

#### Expected Result
> 1. การค้นหาด้วยอักขระพิเศษต้องใช้ Parameterized Query และไม่คืนข้อมูลทั้งหมดออกมา
> 2. Endpoint `PUT /api/menu/:id` ต้องมี Middleware `requireRole('admin')` และปฏิเสธ `waiter` ด้วย HTTP `403 Forbidden`

#### Actual Result
> 1. คำสั่ง SQL Injection ทำงานสำเร็จและดึงรายการเมนูทั้งหมดออกมา (`200 OK`)
> 2. พนักงานเสิร์ฟ (`waiter1`) สามารถแก้ไขราคาอาหารเป็น `1` บาทได้สำเร็จ (`200 OK`)

#### Evidence

`![BUG-002](./tests/reports/bug-002.png)`

#### Business Impact
> ผู้ไม่หวังดีสามารถเจาะฐานข้อมูลผ่านช่องโหว่ SQL Injection ได้ และพนักงานระดับปฏิบัติการสามารถทุจริตแก้ไขราคาอาหารให้ถูกลงก่อนคิดเงินลูกค้า ทำให้ร้านอาหารสูญเสียรายได้และเกิดความเสียหายด้านความปลอดภัยของข้อมูล

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
git clone https://github.com/rarekk/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025

# 2. ตั้งค่า Environment Variables (Backend)
cp backend/.env.example backend/.env
# เปิดไฟล์ backend/.env แล้วกรอกค่า:
#   DATABASE_URL="postgresql://postgres.dtuzbmsbcsdkaeibtpeq:***@aws-1-eu-central-1.pooler.supabase.com:5432/postgres"
#   JWT_SECRET=rms-dev-secret-key-change-in-production
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
| Frontend | `5173` | — | `/api` |

#### ผล Smoke Test — On-Premises

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ ผ่าน |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ ผ่าน |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

`![On-Premises Backend Health](./tests/reports/onprem-backend-health.png)`

**รูปที่ 9 — Frontend Login สำเร็จ**

`![On-Premises Frontend Login](./tests/reports/onprem-frontend-login.png)`

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

- [x] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [x] กำหนด Port Mapping: backend → 3001, frontend → 80
- [x] เพิ่ม Health Check สำหรับ backend service
- [x] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | `postgresql://postgres.dtuzbmsbcsdkaeibtpeq:***@aws-1-eu-central-1.pooler.supabase.com:5432/postgres` |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | `http://localhost` |
| `NODE_ENV` | backend | `production` |
| `VITE_API_URL` | frontend | `/api` |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ☑ มี | `builder` → `runner` |
| Frontend | ☑ มี | `builder` → `runner` (nginx:alpine) |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

`![Multi-stage Dockerfile](./tests/reports/dockerfile-multistage.png)`

#### Volume Mapping (Rubric 2.5 ข้อ 4)

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| ไม่มี Volume mapping (ใช้ Cloud Database Supabase) | — | — | เก็บข้อมูลบน Supabase PostgreSQL |

#### Network Configuration (Rubric 2.5 ข้อ 5)

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| `default` (Docker Compose network) | `bridge` | `backend`, `frontend` |

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

`![Docker Compose PS](./tests/reports/staging-docker-ps.png)`

---

### Supabase Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://supabase.com/dashboard → Create Project (`rms-database`, Region: `eu-central-1`)
2. คัดลอก Session Pooler Connection String (Port `5432`)
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend บน Render

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

`postgresql://postgres.dtuzbmsbcsdkaeibtpeq:***@aws-1-eu-central-1.pooler.supabase.com:5432/postgres`

---

### Render + Vercel Deployment Steps
> ส่วนที่ 5.2 & 5.3

#### Backend บน Render.com

```
Root Directory: backend
Dockerfile:     ./Dockerfile
PORT:           10000  ← Render กำหนดให้ใช้ port นี้สำหรับ Docker service
```

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
| `DATABASE_URL` | Backend (Render) | `postgresql://postgres.dtuzbmsbcsdkaeibtpeq:***@aws-1-eu-central-1.pooler.supabase.com:5432/postgres` |
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `*` (หรือ `https://restaurant-management-system-exam-2025.vercel.app`) |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://rms-backend-52xr.onrender.com/api` |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

**✏️ ทดสอบบน Production URL จริง แล้วกรอกผลและแนบภาพหลักฐาน**

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `https://rms-backend-52xr.onrender.com/api/health` | `{"status":"ok","version":"2.0.0"}` | ✅ ผ่าน |
| 2 | Login | Login ด้วย `admin` / `Admin@123` | เข้าระบบสำเร็จ ได้รับ JWT Token | ✅ ผ่าน |
| 3 | Open Order & Add Item | เปิดโต๊ะ 10 → เพิ่ม Pad Thai x2 → Confirm | ออเดอร์ถูกบันทึก (`status: "confirmed"`, `totalAmount: 160`) | ✅ ผ่าน |
| 4 | Payment | ชำระเงินสด 200 บาท → ตรวจสอบ `change` | คำนวณเงินทอนถูกต้อง (`change: 40`) | ✅ ผ่าน |

**✏️ Production Smoke Test ผ่าน:** 4 / 4 รายการ

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

- [x] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [x] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [x] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [x] เพิ่ม step ติดตั้งและรัน Newman
- [x] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

### Newman Pass Rate จาก CI/CD Pipeline

| Metric | ค่าจริง |
|--------|--------|
| Total Tests | 21 |
| Tests Passed | 17 |
| Tests Failed | 4 |
| **Pass Rate** | **81.0%** |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

`![CI/CD Pipeline](./tests/reports/cicd-pipeline-success.png)`

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
