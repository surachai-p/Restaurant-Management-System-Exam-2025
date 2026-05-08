# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล: นายวีระภัทร อ่วมเกษม  
> รหัสนักศึกษา: 68030271  
> วันที่สอบ: 2026-05-08

---

## Project Overview

> ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย พัฒนาด้วย Node.js (Express) Backend, React Frontend และ PostgreSQL Database

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**Student Fork / Repo:** `https://github.com/weerapat-s/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel)  | `https://restaurantmanagementsystem-rouge.vercel.app` | ✅ Live |
| Backend (Render)   | `https://restaurant-management-system-exam-2025.onrender.com` | ✅ Live |
| API Health Check   | `https://restaurant-management-system-exam-2025.onrender.com/api/health` | ✅ `{"status":"ok","version":"2.0.0"}` |
| Database (Neon)    | `postgresql://neondb_owner:***@ep-late-leaf-ao04tomy-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb` | ✅ Connected |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
| Feature   | เหตุผลที่ทดสอบ |
|-----------|----------------|
| Auth      | ระบบ Login/Logout และ JWT Token เป็น Gateway ของทุก Feature หากพังจะทำให้ระบบทั้งหมดใช้งานไม่ได้ |
| Menu      | การจัดการเมนู (CRUD) และ Role-based access เป็น Feature หลักที่ผู้ใช้ทุก role ต้องใช้งาน |
| Order     | เปิดโต๊ะ รับออเดอร์ แก้ไข ยืนยันออเดอร์ — เป็น Core Business Flow ของร้านอาหาร |
| Payment   | ชำระเงิน คำนวณทอน — กระทบรายได้โดยตรง ต้องแม่นยำ 100% |
| Report    | ยอดขายรายวัน/รายเดือน เมนูขายดี — ใช้สำหรับตัดสินใจทางธุรกิจ |
| Security  | JWT Authentication, RBAC, SQL Injection — ระบบมีข้อมูลการชำระเงิน ต้องป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต |

#### Out of Scope
| Feature       | เหตุผลที่ไม่ทดสอบ |
|---------------|--------------------|
| Performance / Load Testing (JMeter) | ไม่อยู่ในขอบเขตของข้อสอบนี้ และต้องใช้สภาพแวดล้อมพิเศษ |
| UI End-to-End Testing (Playwright/Cypress) | ไม่ได้กำหนดในข้อสอบ ใช้ Postman/Newman แทน |
| Mobile Responsiveness | ไม่อยู่ในขอบเขตของระบบ RMS รุ่นนี้ |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

| ประเภทการทดสอบ           | เครื่องมือ           | รายละเอียด |
|--------------------------|---------------------|------------|
| Unit Testing             | Vitest              | ทดสอบ Business Logic เช่น การคำนวณเงินทอน (Payment Calculation) |
| API Testing (E2E)        | Postman / Newman    | ทดสอบ REST API endpoint ทั้งหมด ครอบคลุม Auth, Menu, Order, Payment, Report |
| Security Testing         | Manual + Postman    | ทดสอบ SQL Injection, การเข้าถึงโดยไม่มี Token, Role ที่ไม่มีสิทธิ์ |
| Dependency Security Scan | npm audit           | ตรวจสอบช่องโหว่ใน Dependencies ทั้ง Backend และ Frontend |
| Smoke Testing            | Manual / Newman     | ทดสอบ 4 Feature หลักบน Production หลัง Deploy |
| Staging Deployment Test  | Docker Compose      | ทดสอบ Multi-container ก่อน Deploy บน Cloud |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

| รายการ         | เวอร์ชัน / ค่า                     |
|----------------|------------------------------------|
| OS             | Windows 11 Home Single Language    |
| Node.js        | 22 LTS                             |
| npm            | 10.x                               |
| Docker         | Docker Desktop (latest)            |
| PostgreSQL     | 16 (Neon.tech Serverless)          |
| Browser        | Chrome (latest)                    |
| Newman         | 6.x                                |
| Vitest         | 4.x                                |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria (เงื่อนไขเริ่มทดสอบ)
- [x] Repository ถูก Clone และรัน Backend + Frontend ได้
- [x] Database เชื่อมต่อ Neon.tech สำเร็จ
- [x] `/api/health` ตอบกลับ `{"status":"ok"}`
- [x] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
- Newman Pass Rate ≥ **80%** ถือว่าพร้อมติดตั้ง
- ไม่มี Bug ระดับ **Critical** ที่ยังไม่ได้รายงานและประเมินผลกระทบ
- Smoke Test ผ่านทุก 4 Feature หลักบน Production
- `npm audit` ไม่พบ vulnerability ระดับ **High** ที่ยังไม่ได้แก้ไข

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment (ชำระเงิน) — BUG-001 | ระบบยอมรับการชำระเงินน้อยกว่ายอดจริงได้ และคืนเงินทอนเป็นค่าลบ ทำให้ร้านสูญเสียรายได้โดยตรงทุกครั้งที่มีการชำระเงิน | Critical |
| 2 | Order (รับออเดอร์) — BUG-002 | ระบบอนุญาตให้เปิดออเดอร์ซ้ำบนโต๊ะเดิมได้ (Double Booking) ทำให้เกิดออเดอร์ซ้ำ ครัวสับสน อาหารออกผิด ลูกค้าไม่พอใจ | High |
| 3 | Menu Security — BUG-003 & BUG-004 | ช่องโหว่ SQL Injection ในการค้นหาเมนู และ Waiter สามารถแก้ไขราคาเมนูได้ ทำให้ข้อมูลเมนูและราคาไม่น่าเชื่อถือ | High |
| 4 | Report (รายงานยอดขาย) — BUG-005 | ตัวกรองวันที่ใช้ `gt` แทน `gte` ทำให้ยอดขายรายวันหายไปบางส่วน ผู้บริหารตัดสินใจจากข้อมูลผิดพลาด | Medium |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (11 กรณี)

| TC-ID  | Type     | Feature  | Scenario                                      | Input                                                        | Expected Result                        | Actual Result | Pass/Fail |
|--------|----------|----------|-----------------------------------------------|--------------------------------------------------------------|----------------------------------------|---------------|-----------|
| TC-001 | Positive | Auth     | Login ด้วย credential ถูกต้อง (Admin)         | `{username: "admin", password: "Admin@123"}`                 | HTTP 200 + JWT Token                   | HTTP 200 + JWT Token | ✅ PASS |
| TC-002 | Positive | Order    | เปิดโต๊ะและเพิ่มรายการอาหารสำเร็จ             | tableId: 1, menuItemId: 1, quantity: 2                       | HTTP 201 + order object                | HTTP 201 + order object | ✅ PASS |
| TC-003 | Positive | Payment  | ชำระเงินเกินยอดและรับเงินทอนถูกต้อง           | `{orderId: X, amountPaid: 500, method: "cash"}`              | HTTP 201 + change = (500 - total)      | HTTP 201 + change = 498 | ✅ PASS |
| TC-004 | Negative | Auth     | Login ด้วย password ผิด                       | `{username: "admin", password: "wrongpassword"}`             | HTTP 401 Invalid credentials           | HTTP 401 `{"error":"Invalid credentials"}` | ✅ PASS |
| TC-005 | Negative | Auth     | Login โดยไม่ส่ง username                      | `{password: "Admin@123"}`                                    | HTTP 400 Username and password required| HTTP 400 `{"error":"Username and password required"}` | ✅ PASS |
| TC-006 | Negative | Payment  | ชำระเงินน้อยกว่ายอดรวม **(BUG-001)**          | `{orderId: X, amountPaid: 10, method: "cash"}`               | HTTP 400 Insufficient payment          | HTTP 201 + negative change (BUG!) | ❌ FAIL |
| TC-007 | Security | Auth     | เรียก API โดยไม่มี JWT Token                  | GET /api/orders (ไม่มี Authorization header)                  | HTTP 401 Access token required         | HTTP 401 `{"error":"Access token required"}` | ✅ PASS |
| TC-008 | Security | Menu     | Waiter พยายามแก้ไขราคาเมนู **(BUG-004)**      | PUT /api/menu/1 ด้วย Waiter token                            | HTTP 403 Insufficient permissions      | HTTP 200 (BUG!) | ❌ FAIL |
| TC-009 | Security | Menu     | SQL Injection ในช่องค้นหาเมนู **(BUG-003)**   | GET /api/menu?search=' OR '1'='1                             | HTTP 200 empty / 400 error (ไม่ Inject) | HTTP 200 + ข้อมูลทั้งหมด (BUG!) | ❌ FAIL |
| TC-010 | Edge     | Order    | ยืนยันออเดอร์ที่ไม่มีรายการอาหาร (0 ชิ้น)    | PUT /api/orders/:id/confirm (order ที่ items ว่างเปล่า)      | HTTP 400 Cannot confirm empty order    | HTTP 400 `{"error":"Order has no items"}` | ✅ PASS |
| TC-011 | Edge     | Payment  | ชำระเงินพอดียอด (change = 0)                  | `{orderId: X, amountPaid: exactTotal, method: "cash"}`       | HTTP 201 + change = 0                  | HTTP 201 + `{"change":0}` | ✅ PASS |

**สรุปผล:** ผ่าน 8 / 11 กรณี (72.7%)

> **หมายเหตุ:** TC-006, TC-008, TC-009 พบ Bug จริงในระบบ (FAIL = ระบบมีช่องโหว่ ไม่ใช่ test case ผิด) — ทุก Bug ได้รับการแก้ไขแล้ว ดูรายละเอียดใน Bug Reports

---

## Test Reports

> **ส่วนที่ 3 (ต่อ) — ผลการรัน Newman**

### Vitest Unit Test Summary

```
 RUN  v4.1.5

 ✓ tests/unit/payment.test.ts > Payment Calculation Logic > returns correct positive change when overpaid
 ✓ tests/unit/payment.test.ts > Payment Calculation Logic > returns zero change when exact amount is paid
 × tests/unit/payment.test.ts > Payment Calculation Logic > [BUG-001] should NOT produce negative change
   → expected -50 to be greater than or equal to 0  ← confirms BUG-001
 ✓ tests/unit/payment.test.ts > Payment Validation > accepts payment when amountPaid equals totalAmount
 ✓ tests/unit/payment.test.ts > Payment Validation > accepts payment when amountPaid exceeds totalAmount
 ✓ tests/unit/payment.test.ts > Payment Validation > rejects payment when amountPaid is less than totalAmount
 ✓ tests/unit/payment.test.ts > Payment Validation > rejects payment of zero
 ✓ tests/unit/payment.test.ts > Business Risk: Order Total Integrity > order total equals sum of all item subtotals
 ✓ tests/api/auth.test.ts > GET /api/health > returns 200 with status ok
 ✓ tests/api/auth.test.ts > POST /api/auth/login > returns 400 when body is empty
 ✓ tests/api/auth.test.ts > POST /api/auth/login > returns 400 when username is missing
 ✓ tests/api/auth.test.ts > POST /api/auth/login > returns 400 when password is missing
 ✓ tests/api/auth.test.ts > POST /api/auth/login > returns 401 when user does not exist
 ✓ tests/api/auth.test.ts > Protected routes > Menu list: GET /api/menu → 401
 ✓ tests/api/auth.test.ts > Protected routes > Order list: GET /api/orders → 401
 ✓ tests/api/auth.test.ts > Protected routes > Create order: POST /api/orders → 401
 ✓ tests/api/auth.test.ts > Protected routes > Create payment: POST /api/payments → 401
 ✓ tests/api/auth.test.ts > Protected routes > Sales report: GET /api/reports/sales → 401
 ✓ tests/api/auth.test.ts > Protected routes > Me endpoint: GET /api/auth/me → 401
 ✓ tests/api/auth.test.ts > GET /api/auth/me > returns 401 for malformed JWT

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 19 passed (20)
   Duration  1.22s
```

**Vitest Pass Rate: 19 / 20 (95%)** — 1 failed test ยืนยัน BUG-001 (underpayment validation missing)

> **หลังแก้ไข BUG-001:** unit test อัปเดตให้ทดสอบ route-level validation → **20 / 20 (100%)** ✅

### Newman E2E Test Summary

```
Collection: RMS-TestSuite-v2
Run Date:   2026-05-08
Environment: env-ci.json (http://localhost:3001/api)

┌─────────────────────────┬────────────────────┬───────────────────┐
│                         │           executed │            failed │
├─────────────────────────┼────────────────────┼───────────────────┤
│              iterations │                  1 │                 0 │
│                requests │                 24 │                 0 │
│            test-scripts │                 21 │                 0 │
│      prerequest-scripts │                  1 │                 0 │
│              assertions │                 26 │                 0 │
├─────────────────────────┴────────────────────┴───────────────────┤
│ total run duration: 5.4s                                         │
│ total data received: 6.45kB (approx)                             │
│ average response time: 155ms                                     │
└──────────────────────────────────────────────────────────────────┘
```

**Newman Pass Rate: 26 / 26 assertions (100%)** ✅  
**Requests: 24 / 24 (100%)** — รวม 3 setup requests ใน TC-020 pre-request script  
**Newman Report (HTML):** `./tests/reports/newman-report.html`

> **หมายเหตุ TC-020 Fix:** แก้ไข Newman collection ให้ TC-020 ใช้ pre-request script สร้าง Order ใหม่ (table 3) → Add Item → Confirm ก่อนทดสอบ underpayment (`amountPaid: 0`) แทนการใช้ `orderId: 9999` hardcoded ที่ไม่มีอยู่จริงใน CI fresh DB

---

## Security Scan Report

> **ส่วนที่ 3.4 — npm audit Security Scan**

### Backend Security Scan

```bash
cd backend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|--------|
| Critical | 0      |
| High     | 0      |
| Medium   | 0      |
| Low      | 0      |
| **รวม**  | **0**  |

**ผล:** ไม่พบช่องโหว่ใน Backend dependencies

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

| Severity | จำนวน |
|----------|--------|
| Critical | 0      |
| High     | 1      |
| Medium   | 2      |
| Low      | 0      |
| **รวม**  | **3**  |

#### รายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะ |
|---------|--------|----------|--------------------|---------------------|-------|
| axios   | GHSA-3w6x-2g7m-8v23 | High | 1.0.0 - 1.7.8 | ≥ 1.8.2 | Fixed via `npm audit fix` |
| axios   | GHSA-q8qp-cvcw-x6jj | High | 1.0.0 - 1.15.1 | ≥ 1.8.2 | Fixed via `npm audit fix` |
| esbuild | GHSA-67mh-4wv8-2f99 | Moderate | ≤ 0.24.2 | ≥ 0.25.0 | Requires `npm audit fix --force` (breaking change) |

**แก้ไขที่ทำได้:**
```bash
cd frontend && npm audit fix
```

**ช่องโหว่ที่เหลือ (esbuild/vite):** 2 moderate — ต้องการ `--force` ซึ่งเป็น breaking change (อัปเกรด Vite major version)

---

## Bug Reports

> **ส่วนที่ 3 — รายงานข้อบกพร่อง (≥ 2 Bug)**

---

### BUG-001: Underpayment Accepted — Negative Change Stored

**Severity:** Critical  
**Priority:** P1  
**Feature:** Payment (`POST /api/payments`)  
**Status:** ✅ Fixed

#### Steps to Reproduce
1. Login เป็น Admin หรือ Cashier เพื่อรับ JWT Token
2. เปิดโต๊ะและเพิ่มรายการอาหาร (เช่น ราคารวม 200 บาท)
3. ยืนยันออเดอร์ด้วย `PUT /api/orders/:id/confirm`
4. ส่ง POST `/api/payments` ด้วย `amountPaid: 10` (น้อยกว่ายอดรวม)

```json
{
  "orderId": 1,
  "amountPaid": 10,
  "method": "cash"
}
```

#### Expected Result
> HTTP 400 Bad Request พร้อม error message: `"Insufficient payment amount"`

#### Actual Result (Before Fix)
> HTTP 201 Created — ระบบบันทึกการชำระเงินสำเร็จ และคืน `change: -190` (ค่าลบ)  
> สถานะออเดอร์เปลี่ยนเป็น `paid` และโต๊ะกลับเป็น `available`

#### Root Cause
ใน `backend/src/routes/payments.ts` — ขาดการตรวจสอบ `amountPaid >= totalAmount`:
```typescript
// ⚠️ BUG-001: Missing underpayment validation
const change = paid - totalAmount  // ไม่มี if (paid < totalAmount) ก่อน
```

#### Fix Applied
```typescript
// backend/src/routes/payments.ts
if (paid < totalAmount) {
  res.status(400).json({ error: 'Insufficient payment amount' }); return
}
```
**Verified:** `POST /api/payments {"amountPaid":1}` → HTTP 400 `{"error":"Insufficient payment amount"}` ✅

#### Business Impact
> ร้านอาหารสูญเสียรายได้ทุกครั้งที่แคชเชียร์รับชำระเงินผิดพลาด ระบบไม่แจ้งเตือนและบันทึกยอดติดลบ ทำให้รายงานยอดขายผิดพลาด ไม่สามารถตรวจสอบได้จากระบบว่าโต๊ะไหนชำระไม่ครบ

---

### BUG-002: Double Booking — Same Table Can Have Multiple Open Orders

**Severity:** High  
**Priority:** P1  
**Feature:** Order (`POST /api/orders`)  
**Status:** ✅ Fixed

#### Steps to Reproduce
1. Login เป็น Waiter เพื่อรับ JWT Token
2. ส่ง `POST /api/orders` ด้วย `tableId: 1` → สำเร็จ (Order #1)
3. ส่ง `POST /api/orders` ด้วย `tableId: 1` อีกครั้ง → สำเร็จ (Order #2) — **ไม่ควรทำได้**

#### Expected Result
> HTTP 409 Conflict พร้อม error: `"Table already has an open order"`

#### Actual Result (Before Fix)
> HTTP 201 Created ทั้งสองครั้ง — มีออเดอร์ 2 รายการเปิดอยู่บนโต๊ะเดียวกัน

#### Root Cause
ใน `backend/src/routes/orders.ts` — ขาดการตรวจสอบออเดอร์ที่เปิดอยู่:
```typescript
// ⚠️ BUG-002: Missing duplicate check
```

#### Fix Applied
```typescript
// backend/src/routes/orders.ts
const existing = await prisma.order.findFirst({ where: { tableId, status: 'open' } })
if (existing) { res.status(409).json({ error: 'Table already has an open order' }); return }
```
**Verified:** Newman TC-015 `POST /api/orders` (same tableId twice) → HTTP 409 ✅

#### Business Impact
> ออเดอร์ซ้ำทำให้ครัวได้รับใบสั่งอาหารผิดพลาด อาหารออกซ้ำ สูญเสียวัตถุดิบ และลูกค้าอาจถูกเรียกเก็บเงินซ้ำซ้อน กระทบความน่าเชื่อถือของร้าน

---

### BUG-003: SQL Injection in Menu Search Endpoint

**Severity:** Critical  
**Priority:** P1  
**Feature:** Menu (`GET /api/menu?search=`)  
**Status:** ✅ Fixed

#### Steps to Reproduce
1. Login รับ JWT Token
2. ส่ง `GET /api/menu?search=' OR '1'='1`
3. สังเกตผลลัพธ์

#### Expected Result
> ระบบใช้ Parameterized Query — ผลลัพธ์ควรเป็น array ว่าง หรือ error

#### Actual Result (Before Fix)
> ระบบคืนข้อมูลเมนูทั้งหมด เนื่องจาก SQL Injection ทำให้ WHERE clause เป็น `TRUE` เสมอ

#### Root Cause
ใน `backend/src/routes/menu.ts` — ใช้ `$queryRawUnsafe()` พร้อม string interpolation:
```typescript
const results = await prisma.$queryRawUnsafe(
  `SELECT * FROM menu_items WHERE (name ILIKE '%${search}%' ...) AND "isAvailable" = true`
)
```

#### Fix Applied
```typescript
// backend/src/routes/menu.ts — เปลี่ยนเป็น $queryRaw (parameterized)
const pattern = `%${search}%`
const results = await prisma.$queryRaw`
  SELECT * FROM "MenuItem"
  WHERE ("name" ILIKE ${pattern} OR "description" ILIKE ${pattern})
  AND "isAvailable" = true`
```
**Verified:** Newman TC-010 `GET /api/menu?search=' OR '1'='1` → `[]` empty array ✅

#### Business Impact
> ผู้ไม่หวังดีสามารถดึงข้อมูลจาก Database ได้ทั้งหมด รวมถึงข้อมูลที่ไม่ควรแสดง และอาจนำไปสู่การโจมตีขั้นสูงต่อไป (Data Breach)

---

### BUG-004: Waiter Can Update Menu Prices (Missing Role Check)

**Severity:** High  
**Priority:** P2  
**Feature:** Menu (`PUT /api/menu/:id`)  
**Status:** ✅ Fixed

#### Steps to Reproduce
1. Login เป็น Waiter รับ Token
2. ส่ง `PUT /api/menu/1` ด้วย Waiter Token พร้อม body `{"price": 1}`

#### Expected Result
> HTTP 403 Forbidden — เฉพาะ Admin เท่านั้นที่แก้ไขราคาได้

#### Actual Result (Before Fix)
> HTTP 200 OK — ราคาเมนูถูกเปลี่ยนเป็น 1 บาทสำเร็จ

#### Root Cause
ใน `backend/src/routes/menu.ts` — `requireRole('admin')` หายไปจาก PUT route:
```typescript
// ⚠️ BUG-004: requireRole('admin') is MISSING
router.put('/:id', authenticate, async (req, res) => { ... })
```

#### Fix Applied
```typescript
// backend/src/routes/menu.ts
router.put('/:id', authenticate, requireRole('admin'), async (req, res) => { ... })
```
**Verified:** Newman TC-011 `PUT /api/menu/4` (Waiter token) → HTTP 403 ✅

#### Business Impact
> พนักงาน Waiter สามารถเปลี่ยนราคาเมนูได้ อาจเกิดการทุจริตหรือข้อผิดพลาดที่ทำให้ร้านเสียรายได้โดยไม่รู้ตัว

---

### BUG-005: Sales Report Date Filter Uses `gt` Instead of `gte`

**Severity:** Medium  
**Priority:** P2  
**Feature:** Reports (`GET /api/reports/sales?startDate=`)  
**Status:** ✅ Fixed

#### Steps to Reproduce
1. Login เป็น Admin หรือ Cashier เพื่อรับ JWT Token
2. มีข้อมูล Payment ในวันที่ 2026-05-08
3. ส่ง `GET /api/reports/sales?startDate=2026-05-08&endDate=2026-05-08`

#### Expected Result
> รายงานรวม payment ทุกรายการของวันที่ 2026-05-08 ตั้งแต่ 00:00:00 เป็นต้นไป

#### Actual Result (Before Fix)
> รายงานขาด payment บางส่วน เนื่องจาก `gt` (strictly greater than) ไม่รวม startDate  
> ทำให้ยอดขายรายวันน้อยกว่าความเป็นจริง

#### Root Cause
ใน `backend/src/routes/reports.ts` — ใช้ `gt` (>) แทน `gte` (≥):
```typescript
// ⚠️ BUG-005
const dateFilter: { gt?: Date; lte?: Date } = {}
if (startDate) dateFilter.gt = new Date(startDate)  // ← ผิด
```

#### Fix Applied
```typescript
// backend/src/routes/reports.ts
const dateFilter: { gte?: Date; lte?: Date } = {}
if (startDate) dateFilter.gte = new Date(startDate)  // ✅
```
**Verified:** `GET /api/reports/sales?startDate=2026-05-08&endDate=2026-05-08` → `{"totalOrders":5,"totalRevenue":3087}` ✅

#### Business Impact
> ตัวกรองวันที่ผิดทำให้ยอดขายรายวันขาดหาย ผู้บริหารใช้ข้อมูลผิดในการตัดสินใจวางแผนธุรกิจ

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
git clone https://github.com/weerapat-s/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025

# 2. ตั้งค่า Environment Variables (Backend)
cd backend
cat > .env << EOF
DATABASE_URL=postgresql://neondb_owner:***@ep-late-leaf-ao04tomy-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=rms-exam-secret-key-weerapat-2026-kmitl
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
PORT=3001
EOF

# 3. ติดตั้ง Dependencies และ Seed Database
npm install
npx prisma db push
npx tsx prisma/seed.ts

# 4. รัน Backend (Port 3001)
npm run dev

# 5. รัน Frontend (Port 5173) — เปิด terminal ใหม่
cd ../frontend
echo "VITE_API_URL=http://localhost:3001/api" > .env.local
npm install
npm run dev
```

#### ผลการทดสอบ (Smoke Test — On-Premises)

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-------------------|--------------|
| Backend Health | `http://localhost:3001/api/health` | `{"status":"ok","version":"2.0.0"}` | ✅ PASS |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ PASS |

---

### Staging Environment (Docker Compose)

> **ส่วนที่ 4.2 — การติดตั้งด้วย Docker Compose (8 คะแนน)**

#### สิ่งที่แก้ไขใน `docker-compose.yml`

- [x] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [x] กำหนด Port Mapping: backend → 3001, frontend → 80
- [x] เพิ่ม Health Check สำหรับ backend service (wget + `start_period: 30s`)
- [x] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน (`condition: service_healthy`)

**สิ่งที่เพิ่ม/แก้ไขเมื่อเทียบกับ `dc.yxx` (ต้นฉบับที่ไม่สมบูรณ์):**

| รายการ | ต้นฉบับ (`dc.yxx`) | ที่แก้ไขแล้ว |
|--------|-------------------|-------------|
| `CORS_ORIGIN` default | `http://localhost:5173` | `http://localhost` (nginx port 80) |
| Health Check `start_period` | ขาดหาย | เพิ่ม `start_period: 30s` |
| `VITE_API_URL` | `/api` (build arg) | `/api` — nginx proxy → backend:3001 |

#### คำสั่งรัน Staging

```bash
# สร้างไฟล์ .env ที่ root
cat > .env << EOF
DATABASE_URL=postgresql://neondb_owner:***@ep-late-leaf-ao04tomy-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=rms-exam-secret-key-weerapat-2026-kmitl
CORS_ORIGIN=http://localhost
EOF

# Build และรัน Multi-container
docker compose up --build
```

#### ผลลัพธ์ `docker compose ps`

```
NAME           IMAGE                                             COMMAND                 SERVICE    CREATED         STATUS                    PORTS
rms-backend    restaurant-management-system-exam-2025-backend    "docker-entrypoint.s…"  backend    49 seconds ago  Up 49 seconds (healthy)   127.0.0.1:3001->3001/tcp
rms-frontend   restaurant-management-system-exam-2025-frontend   "/docker-entrypoint.…"  frontend   ~1 minute ago   Up 33 seconds             0.0.0.0:80->80/tcp, [::]:80->80/tcp
```

**ทุก Container สถานะ: running ✅ | backend: healthy ✅**

#### ผลการทดสอบ (Smoke Test — Staging)

| # | ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | Actual Result | ผ่าน/ไม่ผ่าน |
|---|-------|-----|-------------------|---------------|--------------|
| 1 | Backend Health | `GET http://localhost:3001/api/health` | `{"status":"ok","version":"2.0.0"}` | `{"status":"ok","timestamp":"2026-05-08T08:43:50.301Z","version":"2.0.0"}` | ✅ PASS |
| 2 | Login (Admin) | `POST http://localhost:3001/api/auth/login` | HTTP 200 + JWT token | HTTP 200 + JWT token | ✅ PASS |
| 3 | Frontend | `GET http://localhost:80` | HTTP 200 — หน้า Login แสดงผล | HTTP 200 | ✅ PASS |
| 4 | API via Nginx Proxy | `GET http://localhost/api/health` | ผ่าน nginx proxy → backend | `{"status":"ok"}` | ✅ PASS |

**Staging Smoke Test ผ่าน: 4 / 4 รายการ** ✅

---

### Neon.tech Database Setup

> **ส่วนที่ 5.1**

#### ขั้นตอน
1. ไปที่ https://console.neon.tech → Create Project → เลือก PostgreSQL 16
2. คัดลอก Connection String (format: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`)
3. ใช้เป็นค่า `DATABASE_URL` ใน Backend deployment บน Render

**Connection String:** `postgresql://neondb_owner:[pass]@ep-late-leaf-ao04tomy-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

---

### Render + Vercel Deployment Steps

> **ส่วนที่ 5.2 & 5.3**

#### Backend บน Render.com

```
Service URL:    https://restaurant-management-system-exam-2025.onrender.com
Environment:    Docker
Dockerfile:     ./Dockerfile  (root-level, build context = repo root)
Health Check:   /api/health
Region:         Singapore
Status:         ✅ Live (deployed 2026-05-08)
```

**Environment Variables บน Render:**
| Variable | ค่า |
|----------|-----|
| `DATABASE_URL` | Connection String จาก Neon.tech |
| `JWT_SECRET` | Random string ≥ 32 ตัวอักษร |
| `CORS_ORIGIN` | `https://restaurantmanagementsystem-rouge.vercel.app` |
| `NODE_ENV` | `production` |

#### Frontend บน Vercel

```
Project URL:    https://restaurantmanagementsystem-rouge.vercel.app
Root Directory: frontend
Framework:      Vite
Build Command:  npm run build
Status:         ✅ Live (auto-deploy จาก GitHub main branch)
```

**Environment Variables บน Vercel:**
| Variable | ค่า |
|----------|-----|
| `VITE_API_URL` | `https://restaurant-management-system-exam-2025.onrender.com/api` |

---

### Environment Variables Table

| Variable      | Service   | ค่าตัวอย่าง / คำอธิบาย                         |
|---------------|-----------|------------------------------------------------|
| `DATABASE_URL` | Backend  | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `JWT_SECRET`   | Backend  | random string ที่ปลอดภัย (≥ 32 ตัวอักษร)       |
| `CORS_ORIGIN`  | Backend  | URL ของ Frontend เช่น `https://[app].vercel.app` |
| `NODE_ENV`     | Backend  | `production`                                    |
| `VITE_API_URL` | Frontend | URL ของ Backend เช่น `https://[api].onrender.com/api` |

---

### Smoke Test Results

> **ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production**

| # | Feature          | คำสั่ง / ขั้นตอน                                                                      | Expected               | Actual Result | ผ่าน/ไม่ผ่าน |
|---|------------------|--------------------------------------------------------------------------------------|------------------------|---------------|--------------|
| 1 | Health Check     | `GET https://restaurant-management-system-exam-2025.onrender.com/api/health`         | `{"status":"ok","version":"2.0.0"}` | `{"status":"ok","timestamp":"2026-05-08T09:02:22.591Z","version":"2.0.0"}` | ✅ PASS |
| 2 | Login (Admin)    | `POST /api/auth/login` `{"username":"admin","password":"Admin@123"}`                 | HTTP 200 + JWT token   | HTTP 200 + JWT token | ✅ PASS |
| 3 | Open Order & Add | POST /orders (tableId:1) → POST /orders/:id/items → PUT /orders/:id/confirm          | order status: confirmed | `{"status":"confirmed","totalAmount":"2"}` | ✅ PASS |
| 4 | Payment          | POST /payments `{"amountPaid":9999,"method":"cash"}`                                  | HTTP 201 + change ≥ 0  | HTTP 201 + `{"change":9997}` | ✅ PASS |

**Production Smoke Test ผ่าน: 4 / 4 รายการ** ✅

> **หมายเหตุ BUG-001 บน Production (ก่อน fix):** Feature 4 ใช้ overpayment (9999 > total) เพื่อยืนยันว่า endpoint ทำงานได้ Bug ถูกแก้ไขแล้ว — ทดสอบหลัง fix: `{"amountPaid":1}` → HTTP 400 ✅

---

## CI/CD Pipeline + Newman Pass Rate

> **ส่วนที่ 5.5**

### สิ่งที่แก้ไขใน `.github/workflows/ci.yml`

- [x] trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`) — มีอยู่แล้ว
- [x] `actions/setup-node` สำหรับ Node.js version 22 — มีอยู่แล้ว
- [x] step รัน Unit Test ของ Backend (`npm test`) — มีอยู่แล้ว
- [x] เพิ่ม step ติดตั้งและรัน Newman — **เพิ่มใหม่**
- [x] เพิ่ม step `npm audit --audit-level=high` — **เพิ่มใหม่**

### CI/CD Workflow Structure

`.github/workflows/ci.yml` มี 2 jobs ทำงานต่อเนื่องกัน:

| Job | Steps |
|-----|-------|
| `test` | checkout → setup-node → install backend deps → prisma generate → **vitest run** → **npm audit backend** → install frontend deps → **npm audit frontend** → **frontend build** |
| `e2e` (needs: test) | checkout → setup-node → install backend deps → prisma db push → seed → **start backend** → wait ready → **newman run** → upload HTML report artifact |

**Triggers:** push/PR ไปที่ `main` หรือ `master`

### Newman Pass Rate (หลังแก้ไขทุก Bug + TC-020 pre-request fix)

| Metric              | ค่า         |
|---------------------|-------------|
| Total Requests      | 24 (21 + 3 setup) |
| Total Assertions    | 26          |
| Assertions Passed   | **26**      |
| Assertions Failed   | **0**       |
| **Pass Rate**       | **100%** ✅ |
| Run Duration        | 5.4s        |
| Avg Response Time   | 155ms       |

> Newman Pass Rate 100% — ทุก Bug (BUG-001 ถึง BUG-005) ได้รับการแก้ไขและยืนยันแล้ว ✅

---

## Automated Testing System

> **ระบบทดสอบอัตโนมัติ**

### คำสั่งรัน Test ทั้งหมดด้วยคำสั่งเดียว

```bash
# รัน Unit Tests (Vitest) + E2E Tests (Newman) ต่อเนื่องกัน
npm run test:all
```

### โครงสร้าง root `package.json`

```json
{
  "scripts": {
    "test:unit": "npm --prefix backend test",
    "test:e2e": "newman run tests/postman/RMS-TestSuite-v2.json --environment tests/postman/env-ci.json --reporters cli,htmlextra --reporter-htmlextra-export tests/reports/newman-report.html",
    "test:all": "npm run test:unit && npm run test:e2e"
  }
}
```

### ผลการรัน `npm run test:all` (Local)

| Test Suite | Tool    | Passed | Failed | Pass Rate |
|------------|---------|--------|--------|-----------|
| Unit Tests | Vitest  | 20     | 0      | **100%**  |
| E2E Tests  | Newman  | 26     | 0      | **100%**  |

### Newman Collection Fix (TC-020)

**ปัญหาเดิม:** TC-020 ใช้ `"orderId": 9999` hardcoded → ใน CI fresh DB, order นี้ไม่มีอยู่ → 404 ไม่ใช่ 400 → fail

**การแก้ไข:** เพิ่ม pre-request script ใน TC-020 ที่ใช้ `pm.sendRequest()` สร้าง Order ใหม่:
1. `POST /orders` (tableId: 3) → ได้ `underpay_order_id`
2. `POST /orders/:id/items` → เพิ่มรายการอาหาร
3. `PUT /orders/:id/confirm` → ยืนยันออเดอร์
4. ส่ง payment ด้วย `amountPaid: 0` → BUG-001 fix คืน HTTP 400 ✅

**ผลลัพธ์:** TC-020 ทำงานถูกต้องทั้งใน local และ CI (fresh DB)
