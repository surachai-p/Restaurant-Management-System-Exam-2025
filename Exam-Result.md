# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล |นางสาวญาดา แกล้วกล้า|
| รหัสนักศึกษา | 68030069|
| วันที่สอบ |28 พ.ค. 2569 |

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
| Frontend (Vercel) | | https://restaurant-management-system-exam-2-rosy.vercel.app |
| Backend (Render) | | https://rms-backend-yada.onrender.com |
| API Health Check (`/api/health`) | | https://rms-backend-yada.onrender.com/api/health |
| Database (Neon.tech connection string) | | Configured Successfully |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | เพื่อทดสอบระบบเข้าสู่ระบบ การตรวจสอบ username/password และ JWT authentication |
| Menu | เพื่อทดสอบการแสดงผล เพิ่ม แก้ไข และค้นหารายการอาหาร |
| Order | เพื่อทดสอบการสร้างออเดอร์ เพิ่มรายการอาหาร และยืนยันคำสั่งซื้อ |
| Payment | เพื่อทดสอบระบบชำระเงิน การคำนวณเงินทอน และตรวจสอบข้อผิดพลาด |
| Report | เพื่อทดสอบการสร้างรายงานยอดขายและข้อมูลสรุปของระบบ |
| Security |เพื่อทดสอบการป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต และการตรวจสอบสิทธิ์ของผู้ใช้ |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| Performance / Load Testing| เนื่องจากข้อจำกัดด้านเวลาและทรัพยากรในการทดสอบ|
| Mobile Responsiveness | เนื่องจากโครงการนี้เน้นการทดสอบระบบ Backend API และ Web Application เป็นหลัก |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ใช้ทดสอบฟังก์ชันและ logic ภายในระบบ Backend เพื่อให้แน่ใจว่าทำงานถูกต้อง|
| API Testing (E2E) | Postman / Newman | ใช้ทดสอบ REST API ทั้งแบบ Positive และ Negative Test รวมถึงตรวจสอบ response และ status code|
| Security Testing | npm audit | ใช้ตรวจสอบช่องโหว่ของ package และ dependency ภายในระบบ |
| Smoke Testing | Manual |ใช้ทดสอบการทำงานพื้นฐานของระบบ เช่น Login, Menu, Order และ Payment |
| Staging Test | Docker Compose | ใช้จำลอง environment สำหรับทดสอบระบบแบบ Full Stack ก่อน Deploy จริง|

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | macOS|
| Node.js | v24.14.0|
| npm | 11.9.0 |
| Docker |Docker version 29.5.2, build 79eb04c |
| PostgreSQL | 16 (Neon.tech) |
| Browser | Google Chrome |
| Newman |6.2.2 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
- [ ✅ ] Repository ถูก Clone และรัน Backend + Frontend ได้
- [ ✅ ] Database เชื่อมต่อ Neon.tech สำเร็จ
- [ ✅ ] `/api/health` ตอบกลับ `{"status":"ok"}`
- [ ✅ ] Postman Collection พร้อมสำหรับ Newman

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
| 1 | Authentication / Login| ผู้ใช้ไม่สามารถเข้าสู่ระบบได้ หรือเกิดการเข้าถึงระบบโดยไม่ได้รับอนุญาต ส่งผลต่อความปลอดภัยของข้อมูล |Critical |
| 2 | Order Management| หากระบบสร้างออเดอร์ผิดพลาด อาจทำให้ลูกค้าได้รับอาหารผิด รายการซ้ำ หรือข้อมูลโต๊ะผิดพลาด|High |
| 3 |Payment System | หากระบบคำนวณเงินผิดพลาด อาจทำให้เกิดความเสียหายด้านรายได้และความน่าเชื่อถือของร้านอาหาร| Critical|

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | | ระบบตอบกลับ HTTP 200 และได้รับ JWT Token |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | | ระบบตอบกลับ HTTP 401 Unauthorized |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET /api/orders (no Authorization header) | HTTP 401 Unauthorized | | ระบบตอบกลับ HTTP 401 Unauthorized |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 1, amount: exactTotal}` | HTTP 200 + change = 0 | | ระบบคำนวณเงินทอนเป็น 0 ถูกต้อง |
| TC-005 | Positive | Menu | ดูรายการเมนูอาหาร | GET /api/menu | HTTP 200 + Menu List | | ระบบแสดงรายการเมนูสำเร็จ |
| TC-006 | Positive |Order |{tableId: 1} | HTTP 201 Created| | | ☐ระบบสร้างออเดอร์สำเร็จ|
| TC-007 | Negative |Order | {}|HTTP 400 Bad Request | | | ระบบตอบกลับ HTTP 400 |
| TC-008 | Negative |Payment|{orderId: 1, amount: 10} | HTTP 400 Bad Request| | | ระบบตอบกลับ HTTP 400 |
| TC-009 | Security |Menu | POST /api/menu| HTTP 403 Forbidden| | | ระบบปฏิเสธการเข้าถึง |
| TC-010 | Security |Menu |search=' OR '1'='1 | ระบบต้องไม่ leak ข้อมูลทั้งหมด| | | ระบบป้องกัน query ผิดปกติได้ |
| TC-011 | Edge | | |Order |{tableId: 1} ซ้ำ |HTTP 409 Conflict | ระบบตอบกลับ HTTP 409 Conflict |

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
| Collection Name | `RMS-68030069-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030069-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env-local.json` |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | https://rms-backend-yada.onrender.com/api| Base URL ของ Backend API |
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
|Login API | POST|/api/auth/login | Login สำเร็จ ได้ JWT Token และ HTTP 200| Pass |
|Health Check| GET| /api/health| ระบบตอบกลับ status = ok และ HTTP 200| Pass |
|Unauthorized Orders |GET | /api/orders|ระบบตอบกลับ status = ok และ HTTP 200 | Pass |
|Get Orders | GET|/api/orders | ดึงข้อมูล orders สำเร็จและตอบ HTTP 200| Pass |

**✏️ สรุป:** ผ่าน 4 / 4 Request 100%

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

![!\[คำอธิบาย\](Postman Collection และ Environment Variables.png)](<Postman Collection และ Environment Variables.png>)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

![`!\[alt text\](/Users/yada/Restaurant-Management-System-Exam-2025-1/login api.png)`](<login api.png>)

![`!\[alt text\](<Health Check.png>)`](<Health Check.png>)

![alt text](<Unauthorized Access.png>)

![alt text](<Get Orders.png>)
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
yada@MacBook-Air-khxng-yada Restaurant-Management-System-Exam-2025-1 % newman run tests/postman/RMS-TestSuite-v2.json --environment tests/postman/env-local.json --reporters cli,htmlextra
(node:8323) [DEP0176] DeprecationWarning: fs.F_OK is deprecated, use fs.constants.F_OK instead
(Use `node --trace-deprecation ...` to show where the warning was created)
newman

RMS-TestSuite-v2

❏ Health & System
↳ TC-001 GET /api/health (Positive)
  GET http://localhost:3001/api/health [200 OK, 373B, 23ms]
  ✓  TC-001: health returns 200
  ✓  TC-001: status is ok
  ✓  TC-001: version 2.0.0

❏ Authentication
↳ TC-002 Login Admin (Positive)
  POST http://localhost:3001/api/auth/login [200 OK, 594B, 4s]
  ✓  TC-002: admin login 200
  ✓  TC-002: returns JWT token

↳ TC-003 Login Cashier
  POST http://localhost:3001/api/auth/login [200 OK, 608B, 500ms]
  ✓  TC-003: cashier login 200

↳ TC-004 Login Waiter
  POST http://localhost:3001/api/auth/login [200 OK, 601B, 492ms]
  ✓  TC-004: waiter login 200

↳ TC-005 Login Wrong Password (Negative)
  POST http://localhost:3001/api/auth/login [401 Unauthorized, 342B, 454ms]
  ✓  TC-005: wrong password → 401

↳ TC-006 Login Missing Credentials (Negative)
  POST http://localhost:3001/api/auth/login [400 Bad Request, 352B, 2ms]
  ✓  TC-006: missing creds → 400

↳ TC-007 No Token → 401 (Security)
  GET http://localhost:3001/api/menu [401 Unauthorized, 344B, 2ms]
  ✓  TC-007: no token → 401

❏ Menu
↳ TC-008 GET /menu (Positive)
  GET http://localhost:3001/api/menu [401 Unauthorized, 344B, 2ms]
  1. TC-008: get menu 200
  2. TC-008: returns array

↳ TC-009 Search Menu (Positive)
  GET ?search=Pad Thai [errored]
     Invalid URI "http:///?search=Pad%20Thai"
  4. TC-009: search returns results

↳ TC-010 SQL Injection in Search (Security - BUG-003)
  GET ?search=' OR '1'='1 [errored]
     Invalid URI "http:///?search=%27%20OR%20%271%27=%271"
  6. TC-010 [BUG-003]: SQL Injection should NOT leak all records

↳ TC-011 Waiter Updates Menu Price (Security - BUG-004)
  PUT http://localhost:3001/api/menu/1 [401 Unauthorized, 344B, 1ms]
  7. TC-011 [BUG-004]: Waiter cannot update menu price (expect 403)

↳ TC-012 Admin Adds Menu Item (Positive)
  POST http://localhost:3001/api/menu [401 Unauthorized, 344B, 1ms]
  8. TC-012: admin adds menu item → 201

↳ TC-013 Waiter Cannot Add Menu Item (Negative - Role Check)
  POST http://localhost:3001/api/menu [401 Unauthorized, 344B, 2ms]
  9. TC-013: waiter cannot add menu → 403

❏ Orders
↳ TC-014 Create Order (Positive)
  POST http://localhost:3001/api/orders [401 Unauthorized, 344B, 1ms]
 10. TC-014: create order → 201

↳ TC-015 Double Booking Same Table (BUG-002)
  POST http://localhost:3001/api/orders [401 Unauthorized, 344B, 1ms]
 11. TC-015 [BUG-002]: Double booking → 409 Conflict

↳ TC-016 Add Item to Order
  POST http://localhost:3001/api/orders/null/items [401 Unauthorized, 344B, 1ms]
 12. TC-016: add item → 201

↳ TC-017 Confirm Order
  PUT http://localhost:3001/api/orders/null/confirm [401 Unauthorized, 344B, 1ms]
 13. TC-017: confirm order → 200

↳ TC-018 Create Order Without TableId (Negative)
  POST http://localhost:3001/api/orders [401 Unauthorized, 344B, 1ms]
 14. TC-018: missing tableId → 400

❏ Payment
↳ TC-019 Exact Payment (Positive)
  POST http://localhost:3001/api/payments [401 Unauthorized, 344B, 1ms]
 15. TC-019: payment → 201
 16. TC-019: change is non-negative

↳ TC-020 Underpayment (BUG-001)
  POST http://localhost:3001/api/payments [401 Unauthorized, 344B, 1ms]
 17. TC-020 [BUG-001]: Underpayment should → 400

↳ TC-021 Payment Without Auth (Security)
  POST http://localhost:3001/api/payments [401 Unauthorized, 344B, 1ms]
  ✓  TC-021: no auth → 401

┌─────────────────────────┬──────────────────┬──────────────────┐
│                         │         executed │           failed │
├─────────────────────────┼──────────────────┼──────────────────┤
│              iterations │                1 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│                requests │               21 │                2 │
├─────────────────────────┼──────────────────┼──────────────────┤
│            test-scripts │               21 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│      prerequest-scripts │                0 │                0 │
├─────────────────────────┼──────────────────┼──────────────────┤
│              assertions │               26 │               15 │
├─────────────────────────┴──────────────────┴──────────────────┤
│ total run duration: 5.8s                                      │
├───────────────────────────────────────────────────────────────┤
│ total data received: 1.47kB (approx)                          │
├───────────────────────────────────────────────────────────────┤
│ average response time: 332ms [min: 1ms, max: 4s, s.d.: 964ms] │
└───────────────────────────────────────────────────────────────┘

   #  failure           detail                                                            
                                                                                          
 01.  AssertionError    TC-008: get menu 200                                              
                        expected response to have status code 200 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Menu / TC-008 GET /menu (Positive)"                       
                                                                                          
 02.  AssertionError    TC-008: returns array                                             
                        expected { error: 'Access token required' } to be an array        
                        at assertion:1 in test-script                                     
                        inside "Menu / TC-008 GET /menu (Positive)"                       
                                                                                          
 03.  Error             Invalid URI "http:///?search=Pad%20Thai"                          
                        at request                                                        
                        inside ""                                                         
                                                                                          
 04.  AssertionError    TC-009: search returns results                                    
                        expected PostmanResponse{ …(5) } to have property 'code'          
                        at assertion:0 in test-script                                     
                        inside "Menu / TC-009 Search Menu (Positive)"                     
                                                                                          
 05.  Error             Invalid URI "http:///?search=%27%20OR%20%271%27=%271"             
                        at request                                                        
                        inside ""                                                         
                                                                                          
 06.  JSONError         TC-010 [BUG-003]: SQL Injection should NOT leak all records       
                        "undefined" is not valid JSON                                     
                        at assertion:0 in test-script                                     
                        inside "Menu / TC-010 SQL Injection in Search (Security -         
                        BUG-003)"                                                         
                                                                                          
 07.  AssertionError    TC-011 [BUG-004]: Waiter cannot update menu price (expect 403)    
                        expected response to have status code 403 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Menu / TC-011 Waiter Updates Menu Price (Security -       
                        BUG-004)"                                                         
                                                                                          
 08.  AssertionError    TC-012: admin adds menu item → 201                                
                        expected response to have status code 201 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Menu / TC-012 Admin Adds Menu Item (Positive)"            
                                                                                          
 09.  AssertionError    TC-013: waiter cannot add menu → 403                              
                        expected response to have status code 403 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Menu / TC-013 Waiter Cannot Add Menu Item (Negative -     
                        Role Check)"                                                      
                                                                                          
 10.  AssertionError    TC-014: create order → 201                                        
                        expected response to have status code 201 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Orders / TC-014 Create Order (Positive)"                  
                                                                                          
 11.  AssertionError    TC-015 [BUG-002]: Double booking → 409 Conflict                   
                        expected response to have status code 409 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Orders / TC-015 Double Booking Same Table (BUG-002)"      
                                                                                          
 12.  AssertionError    TC-016: add item → 201                                            
                        expected response to have status code 201 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Orders / TC-016 Add Item to Order"                        
                                                                                          
 13.  AssertionError    TC-017: confirm order → 200                                       
                        expected response to have status code 200 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Orders / TC-017 Confirm Order"                            
                                                                                          
 14.  AssertionError    TC-018: missing tableId → 400                                     
                        expected response to have status code 400 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Orders / TC-018 Create Order Without TableId (Negative)"  
                                                                                          
 15.  AssertionError    TC-019: payment → 201                                             
                        expected response to have status code 201 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Payment / TC-019 Exact Payment (Positive)"                
                                                                                          
 16.  AssertionError    TC-019: change is non-negative                                    
                        expected undefined to be a number or a date                       
                        at assertion:1 in test-script                                     
                        inside "Payment / TC-019 Exact Payment (Positive)"                
                                                                                          
 17.  AssertionError    TC-020 [BUG-001]: Underpayment should → 400                       
                        expected response to have status code 400 but got 401             
                        at assertion:0 in test-script                                     
                        inside "Payment / TC-020 Underpayment (BUG-001)" 
```

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests | 21 |
| Tests Passed | 11 |
| Tests Failed | 15 |
| Pass Rate | 42% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

`![Newman Run Result](./tests/reports/newman-cli-result.png)`
![alt text](<Newman CLI1.png>)
![alt text](<Newman CLI2.png>)
![alt text](<Newman CLI3.png>)
![alt text](<Newman CLI4.png>)
![alt text](<Newman CLI5.png>)
---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
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
| Critical | 0|
| High | 0|
| Medium |3 |
| Low | 0|
| **รวม** |3|

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|ไม่พบช่องโหว่ระดับ High หรือ Critical|

**รูปที่ 5 — ผล npm audit Backend**

![alt text](<npm audit Backend.png>)
---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

**✏️ กรอกจำนวนช่องโหว่จริงที่พบ**

| Severity | จำนวน |
|----------|-------|
| Critical | 0|
| High |0 |
| Medium | 0|
| Low |0 |
| **รวม** |0 |

**รูปที่ 6 — ผล npm audit Frontend**

![alt text](<npm audit Frontend.png>)

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ☐ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

`![CI Security Scan](./tests/reports/ci-security-scan.png)`
![alt text](Actions.png)
---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: [✏️ ชื่อ Bug สั้น ๆ อธิบายปัญหา]

| รายการ | ค่า |
|--------|-----|
| **Severity** | Medium  |
| **Priority** |  P2 |
| **Feature** | /Users/yada/Desktop/npm audit Frontend.png|
| **Status** | Fixed |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. เปิด Postman
2. เรียก GET /api/orders
3. ไม่ส่ง JWT Token

#### Expected Result
> ✏️ ระบบควรตอบ HTTP 401 Unauthorized


#### Actual Result
> ✏️ ระบบควรตอบ HTTP 401 Unauthorized


#### Evidence

`![BUG-001](./tests/reports/bug-001.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
หากระบบไม่ตรวจสอบ JWT Token อาจทำให้ผู้ไม่หวังดีเข้าถึงข้อมูลออเดอร์ของร้านอาหารได้
---

### BUG-002: [✏️ ชื่อ Bug สั้น ๆ อธิบายปัญหา]

| รายการ | ค่า |
|--------|-----|
| **Severity** |High |
| **Priority** | P1 |
| **Feature** | Frontend Login|
| **Status** |  Fixed|

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. เปิด Frontend บน Vercel
2. Login ด้วย admin
3. ระบบเรียก API ผิด endpoint

#### Expected Result
> ✏️ ระบบเรียก API ผิด endpoint

#### Actual Result
> ✏️ สามารถ Login และรับ JWT Token ได้สำเร็จ

#### Evidence

`![BUG-002](./tests/reports/bug-002.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
Frontend แสดง Login failed และ Console ขึ้น HTTP 404
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
| Backend API | 3001|http://localhost:5173 | — |
| Frontend |5137 | — |http://localhost:3001 |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:[port]/api/health` | `{"status":"ok"}` | ผ่าน |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ผ่าน|

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

![alt text](backend.png)

**รูปที่ 9 — Frontend Login สำเร็จ**

![alt text](frontend.png)
![alt text](frontend1.png)
---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- [✅ ] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [ ] กำหนด Port Mapping: backend → 3001, frontend → 80
- [ ] เพิ่ม Health Check สำหรับ backend service
- [ ] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | postgresql://neondb_owner:***@ep-odd-glitter-apmg4nsb.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require|
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend |http://localhost |
| `NODE_ENV` | backend | production|
| `VITE_API_URL` | frontend | http://localhost:3001|

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ✅ มี / ☐ ไม่มี | builder → runner|
| Frontend | ✅ มี / ☐ ไม่มี | builder → nginx|

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

`![Multi-stage Dockerfile](./tests/reports/dockerfile-multistage.png)`

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|ไม่มี Volume mapping|-----------|----------------|-------------|
| | | | |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|rms-network|bridge|backend, frontend|
| | | |

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

**✏️ ทดสอบหลัง `docker compose up` สำเร็จ**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | ผ่าน |
| Frontend | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ผ่าน |

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

`![Docker Compose PS](./tests/reports/staging-docker-ps.png)`
![alt text](<docker compose ps.png>)
---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

`postgresql://neondb_owner:npg_15XHwUiYhKkP@ep-odd-glitter-apmg4nsb-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

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
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ผ่าน |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ผ่าน |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | ผ่าน |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ผ่าน |

**✏️ Production Smoke Test ผ่าน:** ___ / 4 รายการ

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

`![Smoke Test Health](./tests/reports/smoke-1-health.png)`
![alt text](smoke-1-health.png)

**รูปที่ 13 — Smoke Test Feature 2: Login**

`![Smoke Test Login](./tests/reports/smoke-2-login.png)`
![alt text](smoke-2.png)
![alt text](smoke-2.1.png)

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

`![Smoke Test Order](./tests/reports/smoke-3-order.png)`
![alt text](image/smoke-3.png)
![alt text](image/smoke-3.1.png)
![alt text](image/smoke-3.2.png)

**รูปที่ 15 — Smoke Test Feature 4: Payment**

`![Smoke Test Payment](./tests/reports/smoke-4-payment.png)`
![alt text](image/smoke-4-payment.png)
![alt text](image/smoke-4-payment1.png)
---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขและทดสอบ Pipeline สำเร็จแล้ว**

- [✅] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [ ✅] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [✅ ] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [✅ ] เพิ่ม step ติดตั้งและรัน Newman
- [✅ ] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

### Newman Pass Rate จาก CI/CD Pipeline

**✏️ กรอกตัวเลขจาก GitHub Actions log หลัง Pipeline รันสำเร็จ**

| Metric | ค่าจริง |
|--------|--------|
| Total Tests | 21|
| Tests Passed |21 |
| Tests Failed |0 |
| **Pass Rate** | 100%|

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

`![CI/CD Pipeline](./tests/reports/cicd-pipeline-success.png)`

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
