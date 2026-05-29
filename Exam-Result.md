# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | เมจิยานันท์ กันยะ |
| รหัสนักศึกษา | 68030238 |
| วันที่สอบ | 28/05/2569 |

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
| Auth | ทดสอบการเข้าสู่ระบบของผู้ใช้ทั้ง 3 account ได้แก่ Admin, Cashier และ Waiter เพื่อให้มั่นใจว่าสามารถเข้าสู่ระบบและใช้งานตามสิทธิ์ได้ถูกต้อง |
| Menu | ใช้จัดการข้อมูลเมนูอาหาร ราคา และสต็อก |
| Order | ใช้สำหรับเปิดโต๊ะ เพิ่มสินค้า และยืนยันออเดอร์ เป็นกระบวนการหลักของร้านอาหาร |
| Payment | ใช้คำนวณยอดชำระ เงินทอน และออกใบเสร็จ |
| Report | ใช้ตรวจสอบยอดขาย |
| Security | ทดสอบการจำกัดสิทธิ์ของผู้ใช้งานแต่ละ Role เพื่อป้องกันการเข้าถึงฟังก์ชันที่ไม่ได้รับอนุญาต |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| Performance / Load Testing | ไม่มีเวลาหรือทรัพยากรเพียงพอสำหรับทดสอบผู้ใช้งานจำนวนมากพร้อมกัน |
| | |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ทดสอบการทำงานของ Backend Function |
| API Testing (E2E) | Postman / Newman | ทดสอบ API ทุก Endpoint และตรวจสอบ Response |
| Security Testing | npm audit | ตรวจสอบช่องโหว่ของ Dependencies |
| Smoke Testing | Manual |ทดสอบฟังก์ชันหลักหลัง Deployment |
| Staging Test | Docker Compose |ทดสอบระบบในสภาพแวดล้อมจำลองก่อน Deploy จริง |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | Windows 10 |
| Node.js | v22.20.0 |
| npm | 10.9.3 |
| Docker | Docker version 29.4.3, build 055a478 |
| PostgreSQL | 16 (Neon.tech) |
| Browser | Google Chrome |
| Newman | 6.2.2 |

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
| 1 | Payment | หากคำนวณเงินผิดหรือชำระเงินไม่ได้ ร้านอาจสูญเสียรายได้ | Critical |
| 2 | Auth | หากเข้าสู่ระบบไม่ได้ พนักงานจะไม่สามารถใช้งานระบบได้ | High |
| 3 | Order | หากออเดอร์ผิดพลาด อาจทำให้อาหารผิดรายการและลูกค้าไม่พอใจ |Medium  |
| 4 | Report | หากรายงานยอดขายผิด อาจส่งผลต่อการวิเคราะห์รายได้ของร้าน | High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token | HTTP 200 OK + JWT token returned successfully | ✅ |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized | HTTP 401 Unauthorized | ✅ |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET /api/orders (no Authorization header) | HTTP 401 Unauthorized | HTTP 401 Unauthorized | ✅ |
| TC-004 | Edge | Menu | ราคาอาหาร = 0 | `{name:"Pizza", price:0}` |HTTP 400 Validation Error | HTTP 201 Created — system allowed menu creation with price = 0 | Fail |
| TC-005 | Positive | Auth | Login ด้วย cashier | {username: "cashier", password: "Cashier@123} |HTTP 200 + JWT + role = cashier | HTTP 200 OK + token returned successfully | ✅ |
| TC-006 | Positive | Menu | เพิ่มเมนูสำเร็จ (admin) | {name:"Pizza", price:120} | HTTP 201 + menu created | HTTP 201 Created + menu added successfully | ✅ |
| TC-007 | Negative | Menu | เพิ่มเมนูโดยไม่มีชื่อ | {name:"", price:100} | HTTP 400 Validation Error | HTTP 400 Bad Request + name required | ✅ |
| TC-008 | Negative | Auth | username ไม่พบในระบบ | {username:"xxx", password:"123"} | HTTP 401 | HTTP 401 Unauthorized returned for invalid username | ✅ |
| TC-009 | Security | Menu API | ใช้ token ปลอม | Authorization: "Bearer fake.token" | HTTP 401 Unauthorized | HTTP 401 Unauthorized + invalid token error | ✅ |
| TC-010 | Security | Role Access | waiter พยายาม delete menu | DELETE /api/menu/1 (role=waiter) | HTTP 403 Forbidden | HTTP 403 Forbidden returned for waiter role | ✅ |
| TC-011 | Edge | Order | สั่งจำนวนสินค้า = 0 | {itemId:1, qty:0} |                         HTTP 400 หรือ reject order | HTTP 201 Created — system allowed order creation with qty = 0 | Fail |

**✏️ สรุปผล:** ผ่าน 9 / 11 กรณี (81.8%)

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

**✏️ ยืนยันว่าทุก Request มี pm.test แล้ว:** ✅ ใช่

#### สรุปผลการรัน Postman (กรอกหลังรัน Collection Run)

**✏️ กรอกผลจริงจาก Postman Collection Runner**

| Request Name | Method | Endpoint | Actual Result | Pass/Fail |
|-------------|--------|----------|--------------|-----------|
| TC-001 Login Success | POST | /api/auth/login | Status code is 200,Response has JWT token | Pass |
| TC-003 NO token | GET | /api/orders | Status code is 401,Response has JWT token | Pass/Fail |
| TC-004 Create menu with price = 0 | POST | /api/menu | HTTP 201 Created | Fail |

**✏️ สรุป:** ผ่าน 6 / 12 Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

`![Postman Collection + Env Vars](./tests/reports/postman-collection-env.png)`
![alt text](image-2.png)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

`![Postman Run Result](./tests/reports/postman-run-result.png)`
![alt text](image.png)
![alt text](image-1.png)

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

RMS-68030238-TestSuite

→ TC-001 Login Success
  ┌
  │ 'runtime~jwt.auth: could not sign the request: Invalid secret key. Enter a valid key.'
  └
  POST http://localhost:3001/api/auth/login [200 OK, 594B, 4.6s]
  √  Status code is 200
  √  Response has JWT token

→ TC-002 Invalid Password
  POST http://localhost:3001/api/auth/login [401 Unauthorized, 342B, 440ms]
  √  Status code is 401
  1. Response has JWT token

→ TC-003 No Token
  ┌
  │ 'runtime~jwt.auth: could not sign the request: Invalid secret key. Enter a valid key.'
  └
  GET http://localhost:3001/api/orders [401 Unauthorized, 344B, 37ms]
  √  Status code is 401
  2. Response has JWT token

→ TC-004 Create menu with price = 0
  POST http://localhost:3001/api/menu [401 Unauthorized, 347B, 22ms]
  3. Status code is 400
  4. Response has JWT token

→ TC-005 Cashier Login
  ┌
  │ 'runtime~jwt.auth: could not sign the request: Invalid secret key. Enter a valid key.'
  └
  POST http://localhost:3001/api/auth/login [200 OK, 608B, 481ms]
  √  Status code is 200
  √  Response has JWT token

→ TC-006 Create Menu
  POST http://localhost:3001/api/menu [401 Unauthorized, 347B, 11ms]
  5. Status code is 201
  6. Response has JWT token

→ TC-007 Empty Menu Name
  POST http://localhost:3001/api/menu [errored]
     Invalid character in header content ["Authorization"]
  8. Status code is 400
  9. Response has JWT token

→ TC-008 Invalid Username
  ┌
  │ 'runtime~jwt.auth: could not sign the request: Invalid secret key. Enter a valid key.'
  └
  POST http://localhost:3001/api/auth/login [401 Unauthorized, 342B, 323ms]
  √  Status code is 401
 10. Response has JWT token

→ TC-009 Fake Token
  POST http://localhost:3001/api/menu [401 Unauthorized, 347B, 46ms]
  √  Status code is 401
 11. Response has JWT token

→ TC-010 Waiter Delete Menu
  DELETE http://localhost:3001/api/menu/1 [401 Unauthorized, 347B, 46ms]
 12. Status code is 403
 13. Response has JWT token

→ TC-011 Qty = 0
  POST http://localhost:3001/api/orders [401 Unauthorized, 347B, 9ms]
 14. Status code is 400
 15. Response has JWT token

┌─────────────────────────┬────────────────────┬───────────────────┐
│                         │           executed │            failed │
├─────────────────────────┼────────────────────┼───────────────────┤
│              iterations │                  1 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│                requests │                 11 │                 1 │
├─────────────────────────┼────────────────────┼───────────────────┤
│            test-scripts │                 22 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│      prerequest-scripts │                 11 │                 0 │
├─────────────────────────┼────────────────────┼───────────────────┤
│              assertions │                 22 │                14 │
├─────────────────────────┴────────────────────┴───────────────────┤
│ total run duration: 9.6s                                         │
├──────────────────────────────────────────────────────────────────┤
│ total data received: 871B (approx)                               │
├──────────────────────────────────────────────────────────────────┤
│ average response time: 636ms [min: 9ms, max: 4.6s, s.d.: 1393ms] │
└──────────────────────────────────────────────────────────────────┘

   #  failure              detail                                                                            
                                                                                                             
 01.  AssertionError       Response has JWT token                                                            
                           expected { error: 'Invalid credentials' } to have property 'token'                
                           at assertion:1 in test-script                                                     
                           inside "TC-002 Invalid Password"                                                  
                                                                                                             
 02.  AssertionError       Response has JWT token                                                            
                           expected { error: 'Access token required' } to have property 'token'              
                           at assertion:1 in test-script                                                     
                           inside "TC-003 No Token"                                                          
                                                                                                             
 03.  AssertionError       Status code is 400                                                                
                           expected response to have status code 400 but got 401                             
                           at assertion:0 in test-script                                                     
                           inside "TC-004 Create menu with price = 0"                                        
                                                                                                             
 04.  AssertionError       Response has JWT token                                                            
                           expected { error: 'Invalid or expired token' } to have property 'token'           
                           at assertion:1 in test-script                                                     
                           inside "TC-004 Create menu with price = 0"                                        
                                                                                                             
 05.  AssertionError       Status code is 201                                                                
                           expected response to have status code 201 but got 401                             
                           at assertion:0 in test-script                                                     
                           inside "TC-006 Create Menu"                                                       
                                                                                                             
 06.  AssertionError       Response has JWT token                                                            
                           expected { error: 'Invalid or expired token' } to have property 'token'           
                           at assertion:1 in test-script                                                     
                           inside "TC-006 Create Menu"                                                       
                                                                                                             
 07.  TypeError            Invalid character in header content ["Authorization"]                             
                           at request                                                                        
                           inside ""                                                                         
                                                                                                             
 08.  AssertionError       Status code is 400                                                                
                           expected PostmanResponse{ …(5) } to have property 'code'                          
                           at assertion:0 in test-script                                                     
                           inside "TC-007 Empty Menu Name"                                                   
                                                                                                             
 09.  JSONError            Response has JWT token                                                            
                           "undefined" is not valid JSON                                                     
                           at assertion:1 in test-script                                                     
                           inside "TC-007 Empty Menu Name"                                                   
                                                                                                             
 10.  AssertionError       Response has JWT token                                                            
                           expected { error: 'Invalid credentials' } to have property 'token'                
                           at assertion:1 in test-script                                                     
                           inside "TC-008 Invalid Username"                                                  
                                                                                                             
 11.  AssertionError       Response has JWT token                                                            
                           expected { error: 'Invalid or expired token' } to have property 'token'           
                           at assertion:1 in test-script                                                     
                           inside "TC-009 Fake Token"                                                        
                                                                                                             
 12.  AssertionError       Status code is 403                                                                
                           expected response to have status code 403 but got 401                             
                           at assertion:0 in test-script                                                     
                           inside "TC-010 Waiter Delete Menu"                                                
                                                                                                             
 13.  AssertionError       Response has JWT token                                                            
                           expected { error: 'Invalid or expired token' } to have property 'token'           
                           at assertion:1 in test-script                                                     
                           inside "TC-010 Waiter Delete Menu"                                                
                                                                                                             
 14.  AssertionError       Status code is 400                                                                
                           expected response to have status code 400 but got 401                             
                           at assertion:0 in test-script                                                     
                           inside "TC-011 Qty = 0"                                                           
                                                                                                             
 15.  AssertionError       Response has JWT token                                                            
                           expected { error: 'Invalid or expired token' } to have property 'token'           
                           at assertion:1 in test-script                                                     
                           inside "TC-011 Qty = 0"                                                           

```

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests | 11 |
| Tests Passed | 8 |
| Tests Failed | 14 |
| Pass Rate | 36.36% |

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

`![Backend npm audit](./tests/reports/npm-audit-backend.png)`

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

`![Frontend npm audit](./tests/reports/npm-audit-frontend.png)`

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

`![BUG-002](./tests/reports/bug-002.png)`

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร

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
| Backend API | | | — |
| Frontend | | — | |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:[port]/api/health` | `{"status":"ok"}` | ☐ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ☐ |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

`![On-Premises Backend Health](./tests/reports/onprem-backend-health.png)`

**รูปที่ 9 — Frontend Login สำเร็จ**

`![On-Premises Frontend Login](./tests/reports/onprem-frontend-login.png)`

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
| `DATABASE_URL` | backend | |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | |
| `NODE_ENV` | backend | |
| `VITE_API_URL` | frontend | |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ☐ มี / ☐ ไม่มี | |
| Frontend | ☐ มี / ☐ ไม่มี | |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

`![Multi-stage Dockerfile](./tests/reports/dockerfile-multistage.png)`

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| | | | |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| | | |

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
