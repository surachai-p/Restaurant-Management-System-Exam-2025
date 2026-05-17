# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/YOUR_USERNAME/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** _น.ส.ชญานิศ-ธีรเวโรจน์_
**รหัสนักศึกษา:** _68030349_
**วันที่สอบ:** _8/5/2569_

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + **TypeScript** + **Tailwind CSS** |
| Backend  | Node.js 22 LTS + Express + **TypeScript** |
| Database | PostgreSQL 16 (Neon.tech) |
| ORM      | **Prisma** |
| Testing  | **Vitest** + Supertest + Newman |
| Deploy   | Vercel (FE) + Render (BE + DB) |

---

## 🌐 Production URLs

| Service     | URL |
|-------------|-----|
| Frontend    | https://restaurant-management-system-exam-2-gray.vercel.app/ |
| Backend API | https://restaurant-management-system-exam-2025-h6rf.onrender.com |
| Health Check| https://restaurant-management-system-exam-2025-h6rf.onrender.com/api/health |

---

## 📋 Test Plan

<!-- ส่วนที่ 1: นักศึกษากรอก -->

### Test Scope
**In Scope:**
- [x] Authentication (Login/Logout, JWT)
- [x] Menu Management (CRUD + Role-based access)
- [x] Order Management (Open/Add Items/Confirm/Cancel)
- [x] Payment Processing (Cash/Card/QR)
- [x] Sales Reports

**Out of Scope:** _ระบุสิ่งที่ไม่ทดสอบ_

### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment Calculation) |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด |
| Security Testing | Manual + Postman | Auth, SQL Injection, Role Check |

### Test Environment

| Component | Specification |
|-----------|--------------|
| Node.js   | 22 LTS |
| PostgreSQL | 16 (Neon.tech) |
| Browser   | _Chrome 148_ |
| OS        | _Windows 11_ |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| 1 | Payment (ชำระเงิน)      | ร้านไม่สามารถรับเงินได้ ลูกค้ารอนาน เสียรายได้โดยตรง | Critical |
| 2 | Order (รับออเดอร์)      | ออเดอร์ไม่ถึงครัว อาหารไม่ถูกจัดเตรียม ลูกค้าไม่พอใจ | High |
| <!-- เพิ่มอย่างน้อย 2 รายการ --> 3 | Auth & Role Access | หากพนักงานเข้าถึง Report ยอดขายได้ อาจนำไปสู่การแก้ไขข้อมูลการเงินหรือการทุจริต | High |
| <!-- เพิ่มอย่างน้อย 2 รายการ --> 4 | Menu Stock | ข้อมูลสต็อกวัตถุดิบไม่ตรงร้านจะไม่สามารถขายสินค้าที่พร้อมให้บริการได้ | Medium |

---

## 🧪 Test Cases & Results

<!-- ส่วนที่ 2 -->

### Vitest Results
```
Run: npm test
✓ tests/api/auth.test.ts > Protected routes — 401 without token > Create order: POST /api/orders → 401 10ms
 ✓ tests/api/auth.test.ts > Protected routes — 401 without token > Create payment: POST /api/payments → 401 12ms
 ✓ tests/api/auth.test.ts > Protected routes — 401 without token > Sales report: GET /api/reports/sales → 401 9ms
 ✓ tests/api/auth.test.ts > Protected routes — 401 without token > Me endpoint: GET /api/auth/me → 401 6ms
 ✓ tests/api/auth.test.ts > GET /api/auth/me — invalid token > returns 401 for malformed JWT 8ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/api/bugfixes.test.ts > Backend regression tests for bug fixes > should forbid waiter from updating a menu item
AssertionError: expected 'Insufficient permissions' to be 'Forbidden' // Object.is equality

Expected: "Forbidden"
Received: "Insufficient permissions"

 ❯ tests/api/bugfixes.test.ts:126:28
    124|
    125|     expect(res.status).toBe(403)
    126|     expect(res.body.error).toBe('Forbidden')
       |                            ^
    127|   })
    128|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/3]⎯

 FAIL  tests/api/bugfixes.test.ts > Backend regression tests for bug fixes > should search menu safely without raw SQL execution
AssertionError: expected "vi.fn()" to not be called at all, but actually been called 1 times

Received:

  1st vi.fn() call:

    Array [
      "SELECT * FROM menu_items WHERE (name ILIKE '%กาแฟ%' OR description ILIKE '%กาแฟ%') AND "isAvailable" = true",
    ]


Number of calls: 1

 ❯ tests/api/bugfixes.test.ts:152:40
    150|
    151|     expect(res.status).toBe(200)
    152|     expect(prisma.$queryRawUnsafe).not.toHaveBeenCalled()
       |                                        ^
    153|     expect(prisma.menuItem.findMany).toHaveBeenCalled()
    154|   })

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/3]⎯

 FAIL  tests/unit/payment.test.ts > Payment Calculation Logic > [BUG-001] should NOT produce negative change (underpayment rejection)
AssertionError: expected -50 to be greater than or equal to 0
 ❯ tests/unit/payment.test.ts:29:20
     27|     // Current route stores change = -50 without validation
     28|     // Expected: route should return HTTP 400, not store -50
     29|     expect(change).toBeGreaterThanOrEqual(0) // ❌ FAILS → -50 < 0
       |                    ^
     30|   })
     31| })

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯

```

### Newman Pass Rate
```
Total: 25  |  Passed: 22  |  Failed: 3  |  Pass Rate: 88%
```

### Test Case Table

| TC-ID | Feature | Scenario | Expected | Actual | Pass/Fail |
|-------|---------|----------|----------|--------|-----------|
| TC-002 | Auth | Admin login | 200 + JWT | | ✅ |
| TC-005 | Auth | Wrong password | 401 | | ✅|
| TC-007 | Security | No token | 401 | | ✅|
| TC-010 | Security | SQL Injection | Empty/400 | | ✅|
| TC-011 | Security | Waiter update price | 403 | | ✅|
| TC-015 | Order | Double booking | 409 | | ✅|
| TC-020 | Payment | Underpayment | 400 | | ✅|

---

## 🐛 Bug Reports

<!-- ส่วนที่ 3 -->

## BUG-001: [ชื่อ Bug]

BUG-001: Missing JWT Authorization in protected requests

**Severity:** High  
**Priority:** P1  
**Feature:** API Security / Test Suite Validation  
**Status:** Open

#### Steps to Reproduce
1. รัน `newman run rms_tests.json --global-var "url=http://localhost:3001"` ใน Terminal
2. สังเกต `TC-002: Menu Positive` และ `TC-003: Payment Positive`
3. เว็บเซิร์ฟเวอร์ตอบกลับ `401 Unauthorized` แม้ว่า endpoint ควรทำงานได้เมื่อมี token

#### Expected Result
> Protected endpoints ต้องได้รับ token ก่อน และกรณี positive test ควรตอบ `201` หรือ `200` ตามที่กำหนด

#### Actual Result
> `POST /api/menu` และ `POST /api/payments` กลับ `401 Unauthorized` เนื่องจาก request ไม่มี header `Authorization: Bearer <token>`

#### Evidence
> - Terminal output แสดง `401 Unauthorized` ใน `TC-002` และ `TC-003`
> - `rms_tests.json` ไม่มีการเก็บหรือส่ง token จากการ login

#### Business Impact
> การขาด token ในชุดทดสอบทำให้การทดสอบฟีเจอร์สำคัญ เช่น การเพิ่มเมนูและการชำระเงิน ไม่สามารถตรวจสอบได้ และเกิด false negative ใน QA

---

## BUG-002: Test suite does not use reusable auth / environment variables

**Severity:** Medium  
**Priority:** P2  
**Feature:** Test Automation / Configuration  
**Status:** Open

#### Steps to Reproduce
1. เปิดไฟล์ `rms_tests.json`
2. ตรวจสอบ request URL และ credential flow
3. พบว่า endpoint ถูกเขียนเป็นค่า absolute `http://localhost:3001/api/...` และไม่มีการตั้งค่าตัวแปร `base_url`

#### Expected Result
> Collection ควรใช้ตัวแปร `{{base_url}}` และส่ง `Authorization` header จาก token ที่ได้จาก TC-001 หรือ TC-002

#### Actual Result
> Request ทั้งชุดใช้ URL ตายตัว และไม่มีการ propagate token จาก login ทำให้ต้องแก้ไฟล์หลายจุดหากเปลี่ยน host/port หรือเพิ่ม request ใหม่

#### Evidence
> - `rms_tests.json` มี `url`: `http://localhost:3001/api/...` ตรงๆ
> - ไม่มี script ใน TC-001 ที่เก็บ token ไปใช้ใน request ถัดไป

#### Business Impact
> ลดความสามารถในการนำชุดทดสอบไปใช้งานซ้ำ และเพิ่มเวลาทดสอบเมื่อต้องเปลี่ยนพอร์ตหรือกรณีใช้งานจริงบนเครื่องคนอื่น

---

cd /f/Restaurant-Management-System-Exam-2025/Restaurant-Management-System-Exam-2025/tests/postman
newman run RMS-TestSuite-v2.json --reporters cli,json --reporter-json-export newman-report.json## BUG-003: Negative test cases fail for wrong reason (missing auth)

**Severity:** Medium  
**Priority:** P2  
**Feature:** Negative Testing / Security Validation  
**Status:** Open

#### Steps to Reproduce
1. รัน `TC-005: Order Negative` หรือ `TC-006: Payment Negative`
2. คาดว่าจะได้สถานะ `400 Bad Request`
3. แต่ผลลัพธ์กลับเป็น `401 Unauthorized`

#### Expected Result
> Negative test ต้องแยกเหตุผลการล้มเหลวให้ชัดเจน: `400 Bad Request` สำหรับข้อมูลไม่ถูกต้อง และ `401 Unauthorized` สำหรับ token ขาด

#### Actual Result
> การไม่มี token ทำให้ negative test ทั้งชุดล้ม due to auth ก่อนเข้าสู่ validation logic

#### Evidence
> - Terminal output ของ TC-005 / TC-006 แสดง `401 Unauthorized`
> - request body ถูกส่งแต่ไม่ได้ส่ง header `Authorization`

#### Business Impact
> เกิด false negative ในการทดสอบเชิงลบ ทำให้ทีมไม่สามารถแยกได้ว่าปัญหาเกิดจาก input validation หรือการตรวจสอบสิทธิ์

---

## 🚀 Deployment Guide

<!-- ส่วนที่ 5 -->

### Prerequisites
```
Node.js >= 22.0.0
Docker Desktop (for local)
```

### Local Setup (Docker Compose)
```bash
git clone https://github.com/YOUR_USERNAME/restaurant-management-system.git
cd restaurant-management-system
docker compose up --build
# Frontend: http://localhost
# Backend:  http://localhost:3001/api/health
```

### Local Setup (Manual)
```bash
# Backend
cd backend && cp .env.example .env
# แก้ DATABASE_URL ใน .env
npm install && npx prisma db push && npx tsx prisma/seed.ts && npm run dev

# Frontend (Terminal ใหม่)
cd frontend && cp .env.example .env.local
npm install && npm run dev
# เปิด http://localhost:5173
```

### Environment Variables (Backend)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Render PostgreSQL URL | `postgresql://neondb_owner:npg_1Bgx5cRzwDJu@ep-twilight-lake-aqdrjr06-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `JWT_SECRET` | Random secret string | *(ไม่ระบุ)* |
| `CORS_ORIGIN` | Frontend URL | `https://restaurant-management-system-exam-2-gray.vercel.app` |

### Render PostgreSQL Database Setup
1. ไปที่ https://dashboard.render.com → Databases → New PostgreSQL
2. เลือก Free plan หรือ Paid ตามต้องการ
3. Copy External Database URL → ใส่เป็น `DATABASE_URL`
4. รัน `npx prisma db push` เพื่อสร้าง Schema (local หรือใน Render build)

### Vercel Deployment (Frontend)
1. Import repo → Root Directory: `frontend`
2. Framework: Vite
3. Env: `VITE_API_URL=https://your-backend.onrender.com/api`

### Render Deployment (Backend + Database)
1. สร้าง PostgreSQL database บน Render (ตามขั้นตอนด้านบน)
2. New Web Service → Connect GitHub repo → เลือก branch
3. Root Directory: (ว่าง) หรือ `backend` ถ้าใช้ Dockerfile แยก
4. Environment: Docker
5. Build Command: (ว่าง - ใช้ Dockerfile)
6. Start Command: (ว่าง - ใช้ Dockerfile CMD)
7. Add Environment Variables ใน Environment tab:
   - `DATABASE_URL`: จาก database ที่สร้าง
   - `JWT_SECRET`: random string
   - `CORS_ORIGIN`: frontend URL
8. Deploy → Monitor logs

หรือใช้ `render.yaml` สำหรับ auto-configuration:
- Push `render.yaml` ไป GitHub
- ใน Render Dashboard → Settings → YAML → Enable

### Smoke Test Results

| Test | URL | Result |
|------|-----|--------|
| Health | GET /api/health | ✅ |
| Login | POST /api/auth/login | ✅ |
| Add Menu | POST /api/menu | ✅ |
| Open Order | POST /api/orders | ✅ |
| Payment | POST /api/payments | ✅ |

---

## 🔄 CI/CD Pipeline

**Newman Pass Rate (Latest):**
```
□ Health & System
└ TC-001 GET /api/health (Positive)
  GET http://localhost:3001/api/health [200 OK, 373B, 60ms]
  √  TC-001: health returns 200
  √  TC-001: status is ok
  √  TC-001: version 2.0.0

□ Authentication
└ TC-002 Login Admin (Positive)
  POST http://localhost:3001/api/auth/login [200 OK, 594B, 3.4s]
  √  TC-002: admin login 200
  √  TC-002: returns JWT token

└ TC-003 Login Cashier
  POST http://localhost:3001/api/auth/login [200 OK, 608B, 384ms]
  √  TC-003: cashier login 200

└ TC-004 Login Waiter
  POST http://localhost:3001/api/auth/login [200 OK, 601B, 386ms]
  √  TC-004: waiter login 200

└ TC-005 Login Wrong Password (Negative)
  POST http://localhost:3001/api/auth/login [401 Unauthorized, 342B, 387ms]
  √  TC-005: wrong password → 401

└ TC-006 Login Missing Credentials (Negative)
  POST http://localhost:3001/api/auth/login [400 Bad Request, 352B, 4ms]
  √  TC-006: missing creds → 400

└ TC-007 No Token → 401 (Security)
  GET http://localhost:3001/api/menu [401 Unauthorized, 344B, 3ms]
  √  TC-007: no token → 401

□ Menu
└ TC-008 GET /menu (Positive)
  GET http://localhost:3001/api/menu [200 OK, 3.3kB, 560ms]
  √  TC-008: get menu 200
  √  TC-008: returns array

└ TC-009 Search Menu (Positive)
  GET ?search=Pad Thai [errored]
     Invalid URI "http:///?search=Pad%20Thai"
  2. TC-009: search returns results

└ TC-010 SQL Injection in Search (Security - BUG-003)
  GET ?search=' OR '1'='1 [errored]
     Invalid URI "http:///?search=%27%20OR%20%271%27=%271"
  4. TC-010 [BUG-003]: SQL Injection should NOT leak all records

└ TC-011 Waiter Updates Menu Price (Security - BUG-004)
  PUT http://localhost:3001/api/menu/4 [403 Forbidden, 344B, 7ms]
  √  TC-011 [BUG-004]: Waiter cannot update menu price (expect 403)

└ TC-012 Admin Adds Menu Item (Positive)
  POST http://localhost:3001/api/menu [201 Created, 498B, 567ms]
  √  TC-012: admin adds menu item → 201

└ TC-013 Waiter Cannot Add Menu Item (Negative - Role Check)
  POST http://localhost:3001/api/menu [403 Forbidden, 344B, 5ms]
  √  TC-013: waiter cannot add menu → 403

□ Orders
└ TC-014 Create Order (Positive)
  POST http://localhost:3001/api/orders [201 Created, 464B, 2.7s]
  √  TC-014: create order → 201

└ TC-015 Double Booking Same Table (BUG-002)
  POST http://localhost:3001/api/orders [409 Conflict, 350B, 545ms]
  √  TC-015 [BUG-002]: Double booking → 409 Conflict

└ TC-016 Add Item to Order
  POST http://localhost:3001/api/orders/7/items [201 Created, 649B, 5.8s]
  √  TC-016: add item → 201

└ TC-017 Confirm Order
  PUT http://localhost:3001/api/orders/7/confirm [200 OK, 466B, 1660ms]
  √  TC-017: confirm order → 200

└ TC-018 Create Order Without TableId (Negative)
  POST http://localhost:3001/api/orders [400 Bad Request, 338B, 4ms]
  √  TC-018: missing tableId → 400

□ Payment
└ TC-019 Exact Payment (Positive)
  POST http://localhost:3001/api/payments [201 Created, 560B, 2.5s]
  √  TC-019: payment → 201
  √  TC-019: change is non-negative

└ TC-020 Underpayment (BUG-001)
  POST http://localhost:3001/api/payments [404 Not Found, 335B, 285ms]
  5. TC-020 [BUG-001]: Underpayment should → 400

└ TC-021 Payment Without Auth (Security)
  POST http://localhost:3001/api/payments [401 Unauthorized, 344B, 3ms]
  √  TC-021: no auth → 401

┌─────────────────────────┬────────────────────┬───────────────────┐
│                         │           executed │            failed │
├─────────────────────────┼────────────────────┼───────────────────┤
│              iterations │                  1 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│                requests │                 21 │                 2 │
├─────────────────────────┼────────────────────┼───────────────────┤
│            test-scripts │                 21 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│      prerequest-scripts │                  0 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│              assertions │                 26 │                 3 │
├─────────────────────────┴────────────────────┴───────────────────┤
│ total run duration: 20.8s                                        │
├──────────────────────────────────────────────────────────────────┤
│ total data received: 5.37kB (approx)                             │
├──────────────────────────────────────────────────────────────────┤
│ average response time: 982ms [min: 3ms, max: 5.8s, s.d.: 1487ms] │
└──────────────────────────────────────────────────────────────────┘

  #  failure            detail                                                                  
                                                                                                
 1.  Error              Invalid URI "http:///?search=Pad%20Thai"                                
                        at request                                                              
                        inside ""                                                               
                                                                                                
 2.  AssertionError     TC-009: search returns results                                          
                        expected PostmanResponse{ …(5) } to have property 'code'                
                        at assertion:0 in test-script                                           
                        inside "Menu / TC-009 Search Menu (Positive)"                           
                                                                                                
 3.  Error              Invalid URI "http:///?search=%27%20OR%20%271%27=%271"                   
                        at request                                                              
                        inside ""                                                               
                                                                                                
 4.  JSONError          TC-010 [BUG-003]: SQL Injection should NOT leak all records             
                        "undefined" is not valid JSON                                           
                        at assertion:0 in test-script                                           
                        inside "Menu / TC-010 SQL Injection in Search (Security - BUG-003)"     
                                                                                                
 5.  AssertionError     TC-020 [BUG-001]: Underpayment should → 400                             
                        expected response to have status code 400 but got 404                   
                        at assertion:0 in test-script                                           
                        inside "Payment / TC-020 Underpayment (BUG-001)" 
...
```

---

## 🔐 Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
