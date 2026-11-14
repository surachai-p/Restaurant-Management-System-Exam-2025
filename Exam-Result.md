# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | ณภัทร สิงห์ตุ้ย|
| รหัสนักศึกษา |68030080 |
| วันที่สอบ |14/11/2026 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/[แทนที่ด้วยรหัสนักศึกษาของตนเอง]/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) |https://restaurant-management-system-exam-2-psi.vercel.app | ✅ | ✅
| Backend (Render) |https://rms-backend-68030080.onrender.com | ✅ | ✅
| API Health Check (`/api/health`) |https://rms-backend-68030080.onrender.com/api/health| ✅ | ✅
| Database (Neon.tech connection string) | postgresql://neondb_owner:npg_gb2CsG7TQMYV@ep-shiny-wind-bbuqdgl4-pooler.c-15.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=requir | ✅| ✅

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth |ตรวจสอบการเข้าสู่ระบบด้วย Username/Password (admin, cashier1, waiter1) และการออก JWT Token |
| Menu |ตรวจสอบการเพิ่ม แก้ไข ลบรายการอาหาร ราคา และการจัดการสต็อกวัตถุดิบ |
| Order |ตรวจสอบการเปิดโต๊ะ การรับออเดอร์ การแก้ไขออเดอร์ และการยืนยันส่งออเดอร์ |
| Payment |ตรวจสอบการชำระเงิน การคำนวณเงินทอน (change) และการออกใบเสร็จ |
| Report | ตรวจสอบความถูกต้องของรายงานยอดขายรายวัน/รายเดือน และเมนูขายดี |
| Security |ตรวจสอบการยืนยันตัวตนผ่าน JWT Authentication และการจำกัดสิทธิ์ตามตำแหน่ง (Role-based Access Control) |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| |Payment Gateway จริง (เช่น PromptPay / บัตรเครดิตออนไลน์): ระบบจำลองการชำระเงินสดหน้าร้านเท่านั้น |ไม่มีการเชื่อมต่อ API ของธนาคารภายนอก |
| Load / Stress Testing ปริมาณผู้ใช้หลักหมื่นคนพร้อมกัน | ขอบเขตการสอบเน้นการทดสอบการทำงาน (Functional), E2E API และความปลอดภัยเบื้องต้นบน Cloud แผนฟรี (Free Tier)| 

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ทดสอบฟังก์ชันและ Logic ย่อยในฝั่ง Backend API|
| API Testing (E2E) | Postman / Newman |ทดสอบการส่ง Request และตรวจสอบ Response Status/JSON Schema ของทุก Endpoint อัตโนมัติ |
| Security Testing | npm audit |สแกนตรวจสอบช่องโหว่ของ Dependencies (แพ็กเกจภายนอก) ในฝั่ง Backend และ Frontend |
| Smoke Testing | Manual |ทดสอบฟีเจอร์หลัก 4 ส่วน (Health Check, Login, Open Order, Payment) บนหน้าเว็บจริงทั้ง Local, Staging และ Production |
| Staging Test | Docker Compose |จำลองการรันระบบแบบ Multi-container บนเครื่องก่อนนำขึ้น Production |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | Windows 11 |
| Node.js |v24.14.0 |
| npm |11.9.0 |
| Docker |29.2.1 (build a5c7197) |
| PostgreSQL | 16 (Neon.tech) |
| Browser |Google Chrome |
| Newman | 6.2.3 |

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
| Newman Pass Rate ขั้นต่ำ | ≥ 80% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment (การชำระเงินและคำนวณเงินทอน)|หากระบบคำนวณเงินทอนผิดพลาดหรือบันทึกยอดชำระไม่สำเร็จ จะทำให้เกิดความเสียหายทางการเงินของร้านโดยตรง และกระทบความน่าเชื่อถือกับลูกค้า|cite: 6, 11 |Critical|
| 2 | Auth & Order (เข้าสู่ระบบและรับออเดอร์)|cite: 6 |High|
| 3 | Menu & Stock (จัดการเมนูและสต็อกวัตถุดิบ) |cite: 6 |Medium|

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
| TC-005 | Positive | Menu | ดึงรายการเมนูอาหารทั้งหมด | `GET /api/menus` (with valid Token) | HTTP 200 + รายการเมนู JSON Array | | ✅ |
| TC-006 | Positive | Order | เปิดโต๊ะและสร้างรายการออเดอร์ใหม่ | `POST /api/orders` `{tableId: 1, items: [{menuId: 1, quantity: 2}]}` | HTTP 201 Created + Order ID | | ✅ |
| TC-007 | Negative | Menu | เพิ่มเมนูใหม่โดยไม่ระบุราคาหรือชื่อเมนู | `POST /api/menus` `{name: "", price: -50}` (Admin Token) | HTTP 400 Bad Request | | ✅ |
| TC-008 | Negative | Payment | ชำระเงินด้วยจำนวนเงินน้อยกว่ายอดรวมของบิล | `POST /api/payments` `{orderId: 1, amount: 1}` | HTTP 400 Bad Request (Insufficient amount) | | ❌ |
| TC-009 | Security | Menu | ใช้สิทธิ์ Cashier/Waiter ลบรายการเมนู (Unauthorized Role) | `DELETE /api/menus/1` (ใช้ `{{token}}` ของ Cashier) | HTTP 403 Forbidden | | ✅ |
| TC-010 | Security | Auth | ทดสอบ SQL Injection ในช่อง Username ตอน Login | `{username: "admin' OR '1'='1", password: "123"}` | HTTP 401 Unauthorized (ระบบป้องกันได้ ไม่หลุดเข้าสู่ระบบ) | | ✅ |
| TC-011 | Edge | Order | สร้างออเดอร์โดยระบุจำนวนสินค้าเป็น 0 ชิ้น | `POST /api/orders` `{tableId: 1, items: [{menuId: 1, quantity: 0}]}` | HTTP 400 Bad Request (Quantity must be > 0) | | ❌ |

**✏️ สรุปผล:** ผ่าน 9 / 11 กรณี (81.82%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `[รหัสนักศึกษา]` ด้วยรหัสจริง**

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-[รหัสนักศึกษา]-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-[รหัสนักศึกษา]-TestSuite.json` |
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

**✏️ ยืนยันว่าทุก Request มี pm.test แล้ว:** ☐ ใช่

#### สรุปผลการรัน Postman (กรอกหลังรัน Collection Run)

**✏️ กรอกผลจริงจาก Postman Collection Runner**

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| TC-001: Login Valid Admin | `POST` | `/api/auth/login` | HTTP 200 OK + ได้รับ JWT Token | ✅ |
| TC-002: Login Invalid Password | `POST` | `/api/auth/login` | HTTP 401 Unauthorized | ✅ |
| TC-003: Access Orders Without Token | `GET` | `/api/orders` | HTTP 401 Unauthorized | ✅ |
| TC-004: Payment Exact Amount | `POST` | `/api/payments` | HTTP 200 OK + `change: 0` | ✅ |
| TC-005: Get All Menus | `GET` | `/api/menus` | HTTP 200 OK + รายการเมนู JSON Array | ✅ |
| TC-006: Create Valid Order | `POST` | `/api/orders` | HTTP 201 Created + Order ID | ✅ |
| TC-007: Create Invalid Menu | `POST` | `/api/menus` | HTTP 400 Bad Request | ✅ |
| TC-008: Payment Insufficient Amount | `POST` | `/api/payments` | HTTP 200 OK (`change` ติดลบ — พบ Bug) | ❌ |
| TC-009: Delete Menu as Cashier | `DELETE` | `/api/menus/1` | HTTP 403 Forbidden | ✅ |
| TC-010: Login SQL Injection | `POST` | `/api/auth/login` | HTTP 401 Unauthorized | ✅ |
| TC-011: Create Order Zero Quantity | `POST` | `/api/orders` | HTTP 201 Created (ยอมรับค่า 0 — พบ Bug) | ❌ |
**✏️ สรุป:** ผ่าน 9 / 11 Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

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
newman run tests/postman/RMS-[รหัสนักศึกษา]-TestSuite.json \
    --environment tests/postman/env.json \
    --reporters cli,htmlextra \
    --reporter-htmlextra-export tests/reports/newman-report.html
```

#### ผลการรัน Newman (Local)

**✏️ วาง output จาก Terminal ที่ได้หลังรัน Newman แทนที่ข้อความ template ด้านล่างทั้งหมด**

```
newman

newman

RMS-TestSuite-v2

□ Health & System
└ TC-001 GET /api/health (Positive)
  GET [https://rms-backend-68030080.onrender.com/health](https://rms-backend-68030080.onrender.com/health) [404 Not Found, 709B, 21.4s]
  1. TC-001: health returns 200
  2. TC-001: status is ok
  3. TC-001: version 2.0.0

□ Authentication
└ TC-002 Login Admin (Positive)
  POST [https://rms-backend-68030080.onrender.com/auth/login](https://rms-backend-68030080.onrender.com/auth/login) [404 Not Found, 714B, 249ms]
  4. TC-002: admin login 200
  5. TC-002: returns JWT token

└ TC-003 Login Cashier
  POST [https://rms-backend-68030080.onrender.com/auth/login](https://rms-backend-68030080.onrender.com/auth/login) [404 Not Found, 714B, 239ms]
  6. TC-003: cashier login 200
  7⠄ JSONError in test-script

└ TC-004 Login Waiter
  POST [https://rms-backend-68030080.onrender.com/auth/login](https://rms-backend-68030080.onrender.com/auth/login) [404 Not Found, 714B, 238ms]
  8. TC-004: waiter login 200
  9⠄ JSONError in test-script

└ TC-005 Login Wrong Password (Negative)
  POST [https://rms-backend-68030080.onrender.com/auth/login](https://rms-backend-68030080.onrender.com/auth/login) [404 Not Found, 714B, 238ms]
 10. TC-005: wrong password → 401

└ TC-006 Login Missing Credentials (Negative)
  POST [https://rms-backend-68030080.onrender.com/auth/login](https://rms-backend-68030080.onrender.com/auth/login) [404 Not Found, 714B, 231ms]
 11. TC-006: missing creds → 400

└ TC-007 No Token → 401 (Security)
  GET [https://rms-backend-68030080.onrender.com/menu](https://rms-backend-68030080.onrender.com/menu) [404 Not Found, 707B, 610ms]
 12. TC-007: no token → 401

□ Menu
└ TC-008 GET /menu (Positive)
  GET [https://rms-backend-68030080.onrender.com/menu](https://rms-backend-68030080.onrender.com/menu) [404 Not Found, 707B, 222ms]
 13. TC-008: get menu 200
 14. TC-008: returns array
 15⠄ JSONError in test-script

└ TC-009 Search Menu (Positive)
  GET ?search=Pad Thai [errored]
     Invalid URI "http:///?search=Pad%20Thai"
 17. TC-009: search returns results

└ TC-010 SQL Injection in Search (Security - BUG-003)
  GET ?search=' OR '1'='1 [errored]
     Invalid URI "http:///?search=%27%20OR%20%271%27=%271"
 19. TC-010 [BUG-003]: SQL Injection should NOT leak all records

└ TC-011 Waiter Updates Menu Price (Security - BUG-004)
  PUT [https://rms-backend-68030080.onrender.com/menu/1](https://rms-backend-68030080.onrender.com/menu/1) [404 Not Found, 709B, 220ms]
 20. TC-011 [BUG-004]: Waiter cannot update menu price (expect 403)

└ TC-012 Admin Adds Menu Item (Positive)
  POST [https://rms-backend-68030080.onrender.com/menu](https://rms-backend-68030080.onrender.com/menu) [404 Not Found, 708B, 210ms]
 21. TC-012: admin adds menu item → 201

└ TC-013 Waiter Cannot Add Menu Item (Negative - Role Check)
  POST [https://rms-backend-68030080.onrender.com/menu](https://rms-backend-68030080.onrender.com/menu) [404 Not Found, 708B, 221ms]
 22. TC-013: waiter cannot add menu → 403

□ Orders
└ TC-014 Create Order (Positive)
  POST [https://rms-backend-68030080.onrender.com/orders](https://rms-backend-68030080.onrender.com/orders) [404 Not Found, 710B, 212ms]
 23. TC-014: create order → 201
 24⠄ JSONError in test-script

└ TC-015 Double Booking Same Table (BUG-002)
  POST [https://rms-backend-68030080.onrender.com/orders](https://rms-backend-68030080.onrender.com/orders) [404 Not Found, 710B, 215ms]
 25. TC-015 [BUG-002]: Double booking → 409 Conflict

└ TC-016 Add Item to Order
  POST [https://rms-backend-68030080.onrender.com/orders//items](https://rms-backend-68030080.onrender.com/orders//items) [404 Not Found, 717B, 222ms]
 26. TC-016: add item → 201

└ TC-017 Confirm Order
  PUT [https://rms-backend-68030080.onrender.com/orders//confirm](https://rms-backend-68030080.onrender.com/orders//confirm) [404 Not Found, 718B, 225ms]
 27. TC-017: confirm order → 200

└ TC-018 Create Order Without TableId (Negative)
  POST [https://rms-backend-68030080.onrender.com/orders](https://rms-backend-68030080.onrender.com/orders) [404 Not Found, 710B, 244ms]
 28. TC-018: missing tableId → 400

□ Payment
└ TC-019 Exact Payment (Positive)
  POST [https://rms-backend-68030080.onrender.com/payments](https://rms-backend-68030080.onrender.com/payments) [400 Bad Request, 703B, 237ms]
 29. TC-019: payment → 201
 30. TC-019: change is non-negative

└ TC-020 Underpayment (BUG-001)
  POST [https://rms-backend-68030080.onrender.com/payments](https://rms-backend-68030080.onrender.com/payments) [404 Not Found, 712B, 230ms]
 31. TC-020 [BUG-001]: Underpayment should → 400

└ TC-021 Payment Without Auth (Security)
  POST [https://rms-backend-68030080.onrender.com/payments](https://rms-backend-68030080.onrender.com/payments) [404 Not Found, 712B, 240ms]
 32. TC-021: no auth → 401

┌─────────────────────────┬────────────────────┬───────────────────┐
│                         │           executed │            failed │
├─────────────────────────┼────────────────────┼───────────────────┤
│              iterations │                  1 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│                requests │                 21 │                 2 │
├─────────────────────────┼────────────────────┼───────────────────┤
│            test-scripts │                 21 │                 4 │
├─────────────────────────┼────────────────────┼───────────────────┤
│      prerequest-scripts │                  0 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│              assertions │                 26 │                26 │
├─────────────────────────┴────────────────────┴───────────────────┤
│ total run duration: 27.4s                                        │
├──────────────────────────────────────────────────────────────────┤
│ total data received: 2.79kB (approx)                             │
├──────────────────────────────────────────────────────────────────┤
│ average response time: 1512ms [min: 210ms, max: 21.4s, s.d.: 5s] │
└──────────────────────────────────────────────────────────────────┘

   #  failure             detail                                                                     
                                                                                                     
 01.  AssertionError      TC-001: health returns 200                                                 
                          expected response to have status code 200 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Health & System / TC-001 GET /api/health (Positive)"                
                                                                                                     
 02.  JSONError           TC-001: status is ok                                                       
                          Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at assertion:1 in test-script                                               
                          inside "Health & System / TC-001 GET /api/health (Positive)"                
                                                                                                     
 03.  JSONError           TC-001: version 2.0.0                                                      
                          Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at assertion:2 in test-script                                               
                          inside "Health & System / TC-001 GET /api/health (Positive)"                
                                                                                                     
 04.  AssertionError      TC-002: admin login 200                                                    
                          expected response to have status code 200 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Authentication / TC-002 Login Admin (Positive)"                     
                                                                                                     
 05.  JSONError           TC-002: returns JWT token                                                  
                          Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at assertion:1 in test-script                                               
                          inside "Authentication / TC-002 Login Admin (Positive)"                     
                                                                                                     
 06.  AssertionError      TC-003: cashier login 200                                                  
                          expected response to have status code 200 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Authentication / TC-003 Login Cashier"                              
                                                                                                     
 07.  JSONError           Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at test-script                                                              
                          inside "Authentication / TC-003 Login Cashier"                              
                                                                                                     
 08.  AssertionError      TC-004: waiter login 200                                                   
                          expected response to have status code 200 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Authentication / TC-004 Login Waiter"                               
                                                                                                     
 09.  JSONError           Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at test-script                                                              
                          inside "Authentication / TC-004 Login Waiter"                               
                                                                                                     
 10.  AssertionError      TC-005: wrong password → 401                                               
                          expected response to have status code 401 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Authentication / TC-005 Login Wrong Password (Negative)"            
                                                                                                     
 11.  AssertionError      TC-006: missing creds → 400                                                
                          expected response to have status code 400 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Authentication / TC-006 Login Missing Credentials (Negative)"       
                                                                                                     
 12.  AssertionError      TC-007: no token → 401                                                     
                          expected response to have status code 401 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Authentication / TC-007 No Token → 401 (Security)"                  
                                                                                                     
 13.  AssertionError      TC-008: get menu 200                                                       
                          expected response to have status code 200 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Menu / TC-008 GET /menu (Positive)"                                 
                                                                                                     
 14.  JSONError           TC-008: returns array                                                      
                          Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at assertion:1 in test-script                                               
                          inside "Menu / TC-008 GET /menu (Positive)"                                 
                                                                                                     
 15.  JSONError           Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at test-script                                                              
                          inside "Menu / TC-008 GET /menu (Positive)"                                 
                                                                                                     
 16.  Error               Invalid URI "http:///?search=Pad%20Thai"                                    
                          at request                                                                  
                          inside ""                                                                   
                                                                                                     
 17.  AssertionError      TC-009: search returns results                                             
                          expected PostmanResponse{ …(5) } to have property 'code'                    
                          at assertion:0 in test-script                                               
                          inside "Menu / TC-009 Search Menu (Positive)"                               
                                                                                                     
 18.  Error               Invalid URI "http:///?search=%27%20OR%20%271%27=%271"                       
                          at request                                                                  
                          inside ""                                                                   
                                                                                                     
 19.  JSONError           TC-010 [BUG-003]: SQL Injection should NOT leak all records                 
                          "undefined" is not valid JSON                                               
                          at assertion:0 in test-script                                               
                          inside "Menu / TC-010 SQL Injection in Search (Security - BUG-003)"         
                                                                                                     
 20.  AssertionError      TC-011 [BUG-004]: Waiter cannot update menu price (expect 403)             
                          expected response to have status code 403 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Menu / TC-011 Waiter Updates Menu Price (Security - BUG-004)"       
                                                                                                     
 21.  AssertionError      TC-012: admin adds menu item → 201                                         
                          expected response to have status code 201 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Menu / TC-012 Admin Adds Menu Item (Positive)"                      
                                                                                                     
 22.  AssertionError      TC-013: waiter cannot add menu → 403                                       
                          expected response to have status code 403 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Menu / TC-013 Waiter Cannot Add Menu Item (Negative - Role Check)" 
                                                                                                     
 23.  AssertionError      TC-014: create order → 201                                                 
                          expected response to have status code 201 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Orders / TC-014 Create Order (Positive)"                            
                                                                                                     
 24.  JSONError           Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at test-script                                                              
                          inside "Orders / TC-014 Create Order (Positive)"                            
                                                                                                     
 25.  AssertionError      TC-015 [BUG-002]: Double booking → 409 Conflict                            
                          expected response to have status code 409 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Orders / TC-015 Double Booking Same Table (BUG-002)"                
                                                                                                     
 26.  AssertionError      TC-016: add item → 201                                                     
                          expected response to have status code 201 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Orders / TC-016 Add Item to Order"                                  
                                                                                                     
 27.  AssertionError      TC-017: confirm order → 200                                                
                          expected response to have status code 200 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Orders / TC-017 Confirm Order"                                      
                                                                                                     
 28.  AssertionError      TC-018: missing tableId → 400                                              
                          expected response to have status code 400 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Orders / TC-018 Create Order Without TableId (Negative)"            
                                                                                                     
 29.  AssertionError      TC-019: payment → 201                                                      
                          expected response to have status code 201 but got 400                        
                          at assertion:0 in test-script                                               
                          inside "Payment / TC-019 Exact Payment (Positive)"                          
                                                                                                     
 30.  JSONError           TC-019: change is non-negative                                             
                          Unexpected token '<' at 1:1                                                 
                          <!DOCTYPE html>                                                             
                          ^                                                                           
                          at assertion:1 in test-script                                               
                          inside "Payment / TC-019 Exact Payment (Positive)"                          
                                                                                                     
 31.  AssertionError      TC-020 [BUG-001]: Underpayment should → 400                                
                          expected response to have status code 400 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Payment / TC-020 Underpayment (BUG-001)"                            
                                                                                                     
 32.  AssertionError      TC-021: no auth → 401                                                      
                          expected response to have status code 401 but got 404                        
                          at assertion:0 in test-script                                               
                          inside "Payment / TC-021 Payment Without Auth (Security)"
```
![alt text](Newman.png)
**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests |21 |
| Tests Passed |0 |
| Tests Failed |26|
| Pass Rate |0% |



### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ✅ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ✅ |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ✅ |

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
| Critical |0 |
| High |1 |
| Medium |2 |
| Low |0 |
| **รวม** |3 |

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
| | | | | | |

**รูปที่ 5 — ผล npm audit Backend**

![Backend npm audit](./tests/reports/npm-audit-backend.png)

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

![Frontend npm audit](./tests/reports/npm-audit-frontend.png)

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
![BUG-002](./tests/reports/bug-002.png)
| รายการ | ค่า |
|--------|-----|
| **Severity** | (เลือก: Critical / High / Medium / Low) |
| **Priority** | (เลือก: P1 / P2 / P3) |
| **Feature** | |
| **Status** | (เลือก: Open / Fixed) |

#### Steps to Reproduce
1. เข้าสู่ระบบ (Login) เพื่อรับ JWT Token สำหรับสิทธิ์การใช้งานแคชเชียร์หรือผู้ดูแลระบบ (`POST /api/auth/login`)
2. สร้างรายการสั่งอาหาร (Order) ใหม่ผ่าน Endpoint `POST /api/orders` ให้มียอดรวมสุทธิ (`totalAmount`) เท่ากับ `150` บาท (หรือยอดใดๆ ที่มากกว่า `0`)
3. ส่งคำขอชำระเงินผ่าน Endpoint `POST /api/payments` โดยระบุ `orderId` ของรายการดังกล่าว พร้อมส่งค่าจำนวนเงินที่ลูกค้าจ่าย (`amountPaid`) น้อยกว่ายอดรวมจริง เช่น `amountPaid: 100` (น้อยกว่า `totalAmount: 150`)
4. ตรวจสอบ HTTP Status Code และข้อมูล `change` (เงินทอน) ที่ระบบตอบกลับและบันทึกลงฐานข้อมูล

#### Expected Result
> ระบบควรปฏิเสธการทำรายการชำระเงินเนื่องจากยอดเงินที่ชำระไม่ครบตามจำนวน (`amountPaid < totalAmount`) โดยตอบกลับด้วย HTTP Status Code **`400 Bad Request`** พร้อมข้อความแจ้งเตือนข้อผิดพลาด (เช่น `"Insufficient payment amount"`) และต้องไม่บันทึกข้อมูลการชำระเงินหรือคำนวณเงินทอนที่ติดลบ (`change >= 0`)

#### Actual Result
> ระบบยอมรับการทำรายการชำระเงินและตอบกลับด้วยสถานะสำเร็จ (`201 Created` / `200 OK`) โดยคำนวณค่าเงินทอนเป็นค่าติดลบ (`change = -50`) และบันทึกลงในฐานข้อมูลโดยไม่มีการตรวจสอบเงื่อนไขยอดเงินชำระขั้นต่ำ[cite: 8]

#### Evidence

#### Evidence

`![BUG-002](./tests/reports/bug-002.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
- **สูญเสียรายได้โดยตรง (Direct Revenue Loss):** หากระบบอนุญาตให้บันทึกการชำระเงินที่มียอดจ่ายน้อยกว่ายอดรวมจริง (`amountPaid < totalAmount`) และคำนวณเงินทอนติดลบได้ ร้านอาหารจะได้รับเงินไม่ครบตามมูลค่าสินค้าที่จำหน่ายออกไป ส่งผลให้ขาดทุนในรายการนั้นทันที
- **ข้อมูลทางบัญชีและการปิดยอดประจำวันคลาดเคลื่อน (Financial & Accounting Discrepancy):** ยอดเงินสดรับจริงในลิ้นชัก (Cash Drawer) จะไม่ตรงกับยอดขายสุทธิในรายงานสรุปยอดขายประจำวัน (Daily Sales Report) ทำให้พนักงานแคชเชียร์และฝ่ายบัญชีไม่สามารถกระทบยอด (Reconcile) ได้ถูกต้อง
- **ช่องโหว่ด้านการทุจริตและการควบคุมภายใน (Internal Control & Fraud Risk):** พนักงานหรือผู้ใช้งานอาจอาศัยช่องโหว่นี้ในการปิดบิลด้วยยอดเงินที่ต่ำกว่าความเป็นจริงโดยไม่เกิดการแจ้งเตือนจากระบบ ทำให้ตรวจสอบความผิดปกติย้อนหลังได้ยาก
- **ความล่าช้าในการให้บริการหน้าเคาน์เตอร์ (Operational Delay):** เมื่อเกิดข้อผิดพลาดในการคำนวณเงินทอน แคชเชียร์ต้องคำนวณส่วนต่างด้วยตนเองหรือยกเลิกบิลเพื่อทำรายการใหม่ ส่งผลให้เกิดความล่าช้าและลดความประทับใจของลูกค้าในช่วงเวลาเร่งด่วน (Peak Hours)
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
| Backend API | `3001` | `http://localhost:5173` *(หรือ `http://localhost` หากรันผ่าน Docker port 80)* | — |
| Frontend | `5173` *(Dev)* / `80` *(Docker)* | — | `http://localhost:3001/api` |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:[port]/api/health` | `{"status":"ok"}` | ☑ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ☑ |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

![On-Premises Backend Health](./tests/reports/onprem-backend-health.png)

**รูปที่ 9 — Frontend Login สำเร็จ**

![On-Premises Frontend Login](./tests/reports/onprem-frontend-login.png)

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- [ ] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [ ] กำหนด Port Mapping: backend → 3001, frontend → 80
- [ ] เพิ่ม Health Check สำหรับ backend service
- [ ] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | `postgresql://postgres:postgres@db:5432/rms` |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว) |
| `CORS_ORIGIN` | backend | `http://localhost:5173` |
| `NODE_ENV` | backend | `development` |
| `VITE_API_URL` | frontend | `http://localhost:3001/api` |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ☑ มี / ☐ ไม่มี | |
| Frontend | ☑ มี / ☐ ไม่มี | |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

![Docker Compose PS](./tests/reports/staging-docker-ps.png)

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| | | | |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| `restaurant-management-system-exam-2025_default` (Default Network) | `bridge` | `db` (`rms-db`), `backend` (`rms-backend`), `frontend` (`rms-frontend`) |

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

**✏️ ทดสอบหลัง `docker compose up` สำเร็จ**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | ☐ |
| Frontend | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ☐ |

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

`![Docker Compose PS](./tests/reports/staging-docker-ps.png)`

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
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ✅ |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ✅ |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | ✅ |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ✅ |

**✏️ Production Smoke Test ผ่าน:** ___ / 4 รายการ

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

![alt text](<tests/reports/Health Check.png>)

**รูปที่ 13 — Smoke Test Feature 2: Login**

`![Smoke Test Login](./tests/reports/prod-vercel-render.png)

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

![Smoke Test Order](./tests/reports/order.png)

**รูปที่ 15 — Smoke Test Feature 4: Payment**

![Smoke Test Payment](./tests/reports/payment.png)
![Smoke Test Payment 2](./tests/reports/payment2.png)
---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขและทดสอบ Pipeline สำเร็จแล้ว**

- [✅] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [✅] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [✅] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [✅] เพิ่ม step ติดตั้งและรัน Newman
- [✅] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend
### Newman Pass Rate จาก CI/CD Pipeline

**✏️ กรอกตัวเลขจาก GitHub Actions log หลัง Pipeline รันสำเร็จ**

| Metric | ค่าจริง |
|--------|--------|
| Total Tests | |
| Tests Passed | |
| Tests Failed | |
| **Pass Rate** | **%** |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**



---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
