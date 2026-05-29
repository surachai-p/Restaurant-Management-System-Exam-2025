# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | นายจักรกฤษณ์  บางต่าย |
| รหัสนักศึกษา | 68030033 |
| วันที่สอบ | 05/28/2026 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/68030033/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) | https://restaurant-management-system-exam-2-sable.vercel.app | ✅ |
| Backend (Render) | https://restaurant-management-system-exam-2025-1-xces.onrender.com | ✅ |
| API Health Check (`/api/health`) | https://restaurant-management-system-exam-2025-1-xces.onrender.com/api/health | ✅ |
| Database (Neon.tech connection string) | postgresql://neondb_owner:npg_3cQySeOUdzh6@ep-divine-water-aox7h6hc-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require | ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | ตรวจสอบการเข้าสู่ระบบและการจัดการสิทธิ์ผู้ใช้งาน เพื่อป้องกันการเข้าถึงข้อมูลและ API โดยไม่ได้รับอนุญาต |
| Menu | ตรวจสอบความถูกต้องของการจัดการข้อมูลอาหาร (เพิ่ม/ลบ/แก้ไข) ซึ่งเป็นข้อมูลหลักที่ต้องใช้ในการเปิดออเดอร์ |
| Order | ตรวจสอบความถูกต้องของการเปิดโต๊ะและรับออเดอร์ เพื่อให้แน่ใจว่ารายการอาหารและสถานะถูกบันทึกอย่างครบถ้วน |
| Payment | ป้องกันข้อผิดพลาดในการคำนวณยอดรวม ยอดชำระ และเงินทอน ซึ่งเป็นจุดวิกฤตที่ส่งผลกระทบโดยตรงต่อรายได้ของร้าน |
| Report | ยืนยันว่าระบบสามารถดึงข้อมูลและสรุปยอดขายได้อย่างถูกต้อง เพื่อให้ผู้ดูแลระบบนำไปใช้ประเมินผลประกอบการได้ |
| Security | ตรวจสอบช่องโหว่พื้นฐาน (เช่น การเข้าถึง Endpoint โดยไม่มี Token หรือรัน npm audit) เพื่อรักษาความปลอดภัยของระบบ |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
|การเชื่อมต่อฮาร์ดแวร์จริง (เช่น เครื่องพิมพ์ใบเสร็จ, ลิ้นชักเก็บเงิน)| เป็นการทดสอบซอฟต์แวร์และ API เป็นหลัก ไม่มีอุปกรณ์ฮาร์ดแวร์จริงให้ทดสอบในสภาพแวดล้อมการสอบนี้ |
| ทดสอบประสิทธิภาพการรับผู้ใช้งานจำนวนมาก | อยู่นอกเหนือขอบเขตข้อสอบ ซึ่งเน้นไปที่ความถูกต้องของการทำงานและ E2E Testing พื้นฐาน |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ทดสอบความถูกต้องของฟังก์ชันและ Logic ย่อยในระดับโค้ด (เช่น ฟังก์ชันคำนวณเงินทอน) เพื่อให้มั่นใจว่าแต่ละโมดูลทำงานได้ตามที่ออกแบบไว้ |
| API Testing (E2E) | Postman / Newman | ทดสอบการทำงานของ API ตาม Flow การใช้งานจริงตั้งแต่ต้นจนจบ (End-to-End) และใช้ Newman เพื่อรันสคริปต์ทดสอบอัตโนมัติ (Automated) |
| Security Testing | npm audit | สแกนและตรวจสอบช่องโหว่ด้านความปลอดภัยของ Dependency หรือ Package ต่าง ๆ ที่นำมาใช้งาน ทั้งในฝั่ง Frontend และ Backend |
| Smoke Testing | Manual | ทดสอบระบบด้วยตนเองบนสภาพแวดล้อมจริง (Production) โดยเน้นเฉพาะฟีเจอร์หลักที่สำคัญ (เช่น Health Check, Login, Order, Payment) เพื่อยืนยันว่าระบบพร้อมใช้งาน |
| Staging Test | Docker Compose | จำลองสภาพแวดล้อมการทำงานให้ใกล้เคียงกับ Production บนเครื่อง Local เพื่อทดสอบการเชื่อมต่อและการทำงานร่วมกันของทุก Service ก่อนนำขึ้นระบบจริง |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | window11 |
| Node.js | v24.14.0 |
| npm | 11.9.0 |
| Docker | Docker version 29.4.2, build 055a478 |
| PostgreSQL | 16 (Neon.tech) |
| Browser | Google Chrome |
| Newman | 6.2.2 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
- [✅] Repository ถูก Clone และรัน Backend + Frontend ได้
- [✅ ] Database เชื่อมต่อ Neon.tech สำเร็จ
- [✅ ] `/api/health` ตอบกลับ `{"status":"ok"}`
- [✅] Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 100 % |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | ระบบชำระเงิน (Payment) | หากระบบคำนวณยอดเงินทอนผิดพลาด หรือยอมรับการชำระเงินที่น้อยกว่ายอดรวมของบิล จะทำให้ร้านอาหารขาดทุนโดยตรงและบัญชีรายรับผิดพลาด | Critical |
| 2 | ระบบรับออเดอร์ (Order) | หากระบบบันทึกจำนวนอาหารผิดพลาด (เช่น บังคับปัดเศษจำนวนอาหาร) หรือออเดอร์ตกหล่น จะทำให้เสียต้นทุนวัตถุดิบฟรี ลูกค้าได้อาหารไม่ตรงตามสั่งและเกิดการร้องเรียน | High |
| 3 | ระบบจัดการสิทธิ์ (Auth / Security) | หากพนักงานทั่วไป (Waiter) สามารถเข้าถึงสิทธิ์ผู้ดูแลระบบเพื่อลบ/แก้ไขเมนูอาหาร หรือแก้ไขยอดบิลได้ จะทำให้ข้อมูลหลักของร้านเสียหายและเปิดช่องให้เกิดการทุจริต | High |

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
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 1, amount: exactTotal}` | HTTP 200 + change = 0 | HTTP 400 Bad Request | ❌ |
| TC-005 | Positive | Menu | เพิ่มเมนูอาหารใหม่สำเร็จ | {name: "Pad Thai", price: 60} (สิทธิ์ Admin) | HTTP 201 Created | HTTP 201 Created | ✅ |
| TC-006 | Positive | Order | เปิดโต๊ะและสั่งอาหารสำเร็จ | {tableId: 5, items: [{menuId: 1, quantity: 2}]} | HTTP 201 Created | HTTP 201 Created | ✅ |
| TC-007 | Negative | Order | สั่งอาหารด้วย menuId ที่ไม่มีในระบบ | {tableId: 5, items: [{menuId: 999, quantity: 1}]} | HTTP 404 Not Found (หรือ 400) | HTTP 400 Bad Request | ✅ |
| TC-008 | Negative | Payment | ชำระเงินด้วยยอดที่น้อยกว่าค่าอาหาร | {orderId: 1, amount: 10} (ยอดจริง 100) | HTTP 400 Bad Request | HTTP 201 Created (change = -90) | ❌ |
| TC-009 | Security | Menu | ลบเมนูอาหารโดยใช้สิทธิ์ Waiter (ไม่มีสิทธิ์) | DELETE /api/menus/1 (ใช้ Token ของ Waiter) | HTTP 403 Forbidden | HTTP 403 Forbidden | ✅ |
| TC-010 | Security | Auth | เรียก API ด้วย Token ที่หมดอายุหรือปลอม | GET /api/orders (ใช้ Token มั่ว) | HTTP 401 Unauthorized |  HTTP 401 Unauthorized | ✅ |
| TC-011 | Edge | Order | สั่งอาหารโดยระบุจำนวน (quantity) เป็น 0 | {tableId: 5, items: [{menuId: 1, qty: 0}]} | HTTP 400 Bad Request | HTTP 201 Created (qty ถูกเปลี่ยนเป็น 1) | ❌ |

**✏️ สรุปผล:** ผ่าน 8 / 11 กรณี (72.7%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `68030033` ด้วยรหัสจริง**

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-68030033-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030033-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env.json` |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | http://localhost:3001 | Base URL ของ Backend API |
| `{{token}}` | (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ3YWl0ZXIxIiwicm9sZSI6IndhaXRlciIsIm5hbWUiOiJXYWl0ZXIgT25lIiwiaWF0IjoxNzc5OTY5ODE5LCJleHAiOjE3Nzk5OTg2MTl9.teBdLY0rlXbqa7hgl99IQ1r314ZTCS5SSI9Fer6deCQ) | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiBVc2VyIiwiaWF0IjoxNzc5OTY5ODE5LCJleHAiOjE3Nzk5OTg2MTl9.cwiYdENrXng6i5ku4vIWp1_wAzPpQIm4NNixLiTnuvI) | Request ที่ต้องการสิทธิ์ Admin |

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
| TC-001: Login ด้วย credential ถูกต้อง | POST | /api/auth/login | HTTP 200 OK | ✅ |
| TC-002: Login ด้วย password ผิด | POST | /api/auth/login | HTTP 401 Unauthorized | ✅ |
| TC-003: เรียก API โดยไม่มี JWT Token | GET | /api/orders | HTTP 401 Unauthorized | ✅ |
| TC-004: ชำระเงินพอดียอด | POST | /api/payments | HTTP 200 OK | ✅ |
| TC-005: เพิ่มเมนูอาหารใหม่สำเร็จ | POST | /api/menu | HTTP 201 Created | ✅ |
| TC-006: เปิดโต๊ะและสั่งอาหารสำเร็จ | POST | /api/orders | HTTP 201 Created | ✅ |
| TC-006.2: เพิ่มรายการ | POST | /api/orders/:id/items | HTTP 201 Created | ✅ |
| TC-006.5: ยืนยันออเดอร์ | PUT | /api/orders/:id/confirm | HTTP 200 OK | ✅ |
| TC-007: สั่งอาหารด้วย menuId ที่ไม่มีในระบบ | POST | /api/orders/:id/items | HTTP 404 Not Found | ✅ |
| TC-008: ชำระเงินด้วยยอดที่น้อยกว่าค่าอาหาร | POST | /api/payments | HTTP 201 Created | ❌ |
| TC-009: ลบเมนูอาหารโดยไม่มีสิทธิ์ | DELETE | /api/menu/1 | HTTP 403 Forbidden | ✅ |
| TC-010: เรียก API ด้วย Token ที่หมดอายุหรือปลอม | GET | /api/orders | HTTP 401 Unauthorized | ✅ |
| TC-011: สั่งอาหารโดยระบุจำนวน (qty) เป็น 0 | POST | /api/orders/:id/items | HTTP 201 Created | ❌ |

**✏️ สรุป:** ผ่าน 11 / 13 Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

![Postman Collection + Env Vars](./tests/reports/postman-collection-env.png)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

![Postman Run Result](./tests/reports/postman-run-result1.png)
![Postman Run Result](./tests/reports/postman-run-result2.png)

---

### Newman E2E Test Summary


#### คำสั่งรัน Newman

```bash
# ติดตั้ง Newman (ถ้ายังไม่ได้ติดตั้ง)
npm install -g newman newman-reporter-htmlextra

# รัน Collection
newman run tests/postman/RMS-68030033-TestSuite.json \
    --environment tests/postman/env.json \
    --reporters cli,htmlextra \
    --reporter-htmlextra-export tests/reports/newman-report.html
```

#### ผลการรัน Newman (Local)

**✏️ วาง output จาก Terminal ที่ได้หลังรัน Newman แทนที่ข้อความ template ด้านล่างทั้งหมด**

```
(node:8312) [DEP0176] DeprecationWarning: fs.F_OK is deprecated, use fs.constants.F_OK instead
(Use `node --trace-deprecation ...` to show where the warning was created)
newman


RMS-68030033-TestSuite

→ TC-001: Login ด้วย credential ถูกต้อง
  POST http://localhost:3001/api/auth/login [500 Internal Server Error, 889B, 5s]
  1. Status code is 200
  2. Response has JWT token

→ Login: Waiter
  POST http://localhost:3001/api/auth/login [200 OK, 601B, 1090ms]
  √  Status code is 200
  √  Response has JWT token

→ TC-002: Login ด้วย password ผิด
  POST http://localhost:3001/api/auth/login [401 Unauthorized, 342B, 96ms]
  √  Status code is 401

→ TC-003: เรียก API โดยไม่มี JWT Token
  GET http://localhost:3001/api/orders [401 Unauthorized, 344B, 1ms]
  √  Status code is 401 Unauthorized

→ TC-004: ชำระเงินพอดียอด
  POST http://localhost:3001/api/payments [400 Bad Request, 360B, 166ms]
  3. Status code is 200 OK
  4. Change is 0

→ TC-005: เพิ่มเมนูอาหารใหม่สำเร็จ
  POST http://localhost:3001/api/menu [201 Created, 497B, 104ms]
  √  Status code is 201 Created

→ TC-006: เปิดโต๊ะและสั่งอาหารสำเร็จ
  POST http://localhost:3001/api/orders [201 Created, 464B, 302ms]
  √  Status code is 201 Created

→ TC-006.5: ยืนยันออเดอร์
  PUT http://localhost:3001/api/orders/1/confirm [400 Bad Request, 339B, 68ms]

→ TC-006.2: เพิ่มรายการ
  POST http://localhost:3001/api/orders/1/items [400 Bad Request, 339B, 309ms]

→ TC-007: สั่งอาหารด้วย menuId ที่ไม่มีในระบบ
  POST http://localhost:3001/api/orders/2/items [400 Bad Request, 339B, 68ms]
  5. Status code is 404

→ TC-008: ชำระเงินด้วยยอดที่น้อยกว่าค่าอาหาร
  POST http://localhost:3001/api/payments [400 Bad Request, 360B, 69ms]
  √  Status code is 400

→ TC-009: ลบเมนูอาหารโดยไม่มีสิทธิ์
  DELETE http://localhost:3001/api/menu/1 [403 Forbidden, 344B, 1ms]
  √  Status code is 401 or 403

→ TC-010: เรียก API ด้วย Token ที่หมดอายุหรือปลอม
  GET http://localhost:3001/api/orders [401 Unauthorized, 347B, 2ms]
  √  Status code is 401

→ TC-011: สั่งอาหารโดยระบุจำนวน (qty) เป็น 0
  POST http://localhost:3001/api/orders/6/items [201 Created, 646B, 446ms]
  6. Status code is 400

┌─────────────────────────┬───────────────────┬──────────────────┐
│                         │          executed │           failed │
├─────────────────────────┼───────────────────┼──────────────────┤
│              iterations │                 1 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│                requests │                14 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│            test-scripts │                12 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│      prerequest-scripts │                 0 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│              assertions │                15 │                6 │
├─────────────────────────┴───────────────────┴──────────────────┤
│ total run duration: 8.9s                                       │
├────────────────────────────────────────────────────────────────┤
│ total data received: 1.87kB (approx)                           │
├────────────────────────────────────────────────────────────────┤
│ average response time: 554ms [min: 1ms, max: 5s, s.d.: 1275ms] │
└────────────────────────────────────────────────────────────────┘

  #  failure                                detail                                                                                                                                                   
                                                                                                                                                                                                     
 1.  AssertionError                         Status code is 200                                                                                                                                       
                                            expected response to have status code 200 but got 500                                                                                                    
                                            at assertion:0 in test-script                                                                                                                            
                                            inside "TC-001: Login ด้วย credential ถูกต้อง"                                                                                                           
                                                                                                                                                                                                     
 2.  AssertionError                         Response has JWT token                                                                                                                                   
                                            expected { Object (error) } to have property 'token'                                                                                                     
                                            at assertion:1 in test-script                                                                                                                            
                                            inside "TC-001: Login ด้วย credential ถูกต้อง"                                                                                                           
                                                                                                                                                                                                     
 3.  AssertionError                         Status code is 200 OK                                                                                                                                    
                                            expected response to have status code 200 but got 400                                                                                                    
                                            at assertion:0 in test-script                                                                                                                            
                                            inside "TC-004: ชำระเงินพอดียอด"                                                                                                                         
                                                                                                                                                                                                     
 4.  AssertionError                         Change is 0                                                                                                                                              
                                            expected undefined to deeply equal +0                                                                                                                    
                                            at assertion:1 in test-script                                                                                                                            
                                            inside "TC-004: ชำระเงินพอดียอด"                                                                                                                         
                                                                                                                                                                                                     
 5.  AssertionError                         Status code is 404                                                                                                                                       
                                            expected response to have status code 404 but got 400                                                                                                    
                                            at assertion:0 in test-script                                                                                                                            
                                            inside "TC-007: สั่งอาหารด้วย menuId ที่ไม่มีในระบบ"                                                                                                     
                                                                                                                                                                                                     
 6.  AssertionError                         Status code is 400                                                                                                                                       
                                            expected response to have status code 400 but got 201                                                                                                    
                                            at assertion:0 in test-script                                                                                                                            
                                            inside "TC-011: สั่งอาหารโดยระบุจำนวน (qty) เป็น 0"   

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests | 14 |
| Tests Passed | 9 |
| Tests Failed | 6 |
| Pass Rate | 60% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

![newman](./tests/reports/newman-cli-result.png)

---


### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ✅ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ✅ |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ✅ |

**✏️ Newman Pass Rate จาก CI/CD:** 3 / 15 (20%)

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

![CI Pipeline Newman](./tests/reports/ci-pipeline-newman.png)

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

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
| ไม่พบช่องโหว่ | | | | | |

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
| Critical | 0 |
| High | 1 |
| Medium | 2 |
| Low | 0 |
| **รวม** | 3 |

**รูปที่ 6 — ผล npm audit Frontend**

![Frontend npm audit](./tests/reports/npm-audit-frontend.png)

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ✅ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

[CI Security Scan](./tests/reports/ci-security-scan1.png)
[CI Security Scan](./tests/reports/ci-security-scan2.png)

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: ระบบอนุญาตให้ชำระเงินด้วยยอดที่น้อยกว่าค่าอาหารจริง (เงินทอนติดลบ)

| รายการ | ค่า |
|--------|-----|
| **Severity** | ( Critical ) |
| **Priority** | ( P1 ) |
| **Feature** | ระบบชำระเงิน |
| **Status** | ( Open ) |

### BUG-002: ระบบเปลี่ยนจำนวนอาหาร (quantity) จาก 0 เป็น 1 อัตโนมัติแทนที่จะบล็อก

| รายการ | ค่า |
|--------|-----|
| **Severity** | ( high ) |
| **Priority** | ( P2 ) |
| **Feature** | ระบบจัดการออเดอร์ |
| **Status** | ( Open ) |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. เปิดโปรแกรม Postman และเลือก Request "ชำระเงิน" (Payment)
2. กำหนด orderId ของออเดอร์ที่มียอดรวม 80 บาท
3. ใส่ค่า amountPaid เท่ากับ 50 บาท (น้อยกว่าค่าอาหาร) แล้วกด Send

#### Expected Result
> ✏️ ระบบควรปฏิเสธการชำระเงินและแจ้ง Error รหัส 400 (Bad Request) พร้อมข้อความแจ้งเตือนว่า "ยอดเงินไม่เพียงพอ"

#### Actual Result
> ✏️ ระบบตอบกลับด้วยรหัส 201 (Created) และแสดงผล change (เงินทอน) เป็น -30 ซึ่งเป็นการบันทึกข้อมูลการเงินที่ผิดพลาด

#### Evidence

![BUG-001](./tests/reports/bug-001.png)

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
เป็นปัญหาที่กระทบต่อ "ความถูกต้องของข้อมูลทางการเงิน" โดยตรง ซึ่งถือเป็นความเสี่ยงสูงสุดในระบบร้านอาหาร หากลูกค้าจ่ายไม่ครบแต่ระบบบันทึกว่า "ชำระสำเร็จ" จะนำไปสู่ปัญหาการทุจริต การทำบัญชีผิดพลาด และร้านอาหารขาดทุนได้ทันที
---

### BUG-002: การปัดเศษจำนวนอาหารจาก 0 เป็น 1

| รายการ | ค่า |
|--------|-----|
| **Severity** | ( High ) |
| **Priority** | ( P2 ) |
| **Feature** | ระบบจัดการออเดอร์ |
| **Status** | ( Open ) |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. เปิดโปรแกรม Postman และเลือก Request "เพิ่มรายการอาหาร" (Add Item)
2. ระบุ menuId ที่ต้องการสั่ง
3. ใส่ค่า qty (จำนวน) เท่ากับ 0 แล้วกด Send

#### Expected Result
> ✏️ ระบบควรปฏิเสธและแจ้ง Error รหัส 400 (Bad Request) ว่า "ไม่สามารถสั่งอาหารจำนวน 0 จานได้"

#### Actual Result
> ✏️ ระบบตอบกลับด้วยรหัส 201 (Created) โดย backend ทำการเปลี่ยนค่า qty จาก 0 เป็น 1 ให้โดยอัตโนมัติ ทำให้ลูกค้าได้รับอาหารและต้องเสียเงินโดยไม่ได้ตั้งใจ

#### Evidence

![BUG-002](./tests/reports/bug-002.png)

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
แม้จะไม่กระทบต่อกระแสเงินสดของร้านโดยตรงเหมือน Bug แรก แต่เป็นปัญหาที่กระทบต่อ "ประสบการณ์ผู้ใช้งาน" (User Experience - UX) อย่างรุนแรง เพราะลูกค้าจะได้รับสิ่งที่ไม่ได้สั่ง และต้องเสียค่าใช้จ่ายโดยไม่ตั้งใจ ซึ่งนำไปสู่การร้องเรียน (Complaint) และความไม่เชื่อมั่นในระบบ
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
git clone https://github.com/68030033/Restaurant-Management-System-Exam-2025.git
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
| Backend API | port 3001 | http://localhost:5173 | — |
| Frontend | http://localhost:5173/ | — | https://rms-api-YOURNAME.onrender.com/api |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{"status":"ok"}` | ✅ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ |

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

- [✅] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [✅] กำหนด Port Mapping: backend → 3001, frontend → 80
- [✅] เพิ่ม Health Check สำหรับ backend service
- [✅] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | postgresql://neondb_owner:npg_3cQySeOUdzh6@ep-divine-water-aox7h6hc.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | http://localhost:5173 |
| `NODE_ENV` | backend | production |
| `VITE_API_URL` | frontend | /api |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ✅ มี / ☐ ไม่มี | deps → builder → runner |
| Frontend | ✅ มี / ☐ ไม่มี | builder → nginx |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

![Multi-stage Dockerfile](./tests/reports/dockerfile-multistage1.png)
![Multi-stage Dockerfile](./tests/reports/dockerfile-multistage2.png)

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| postgres_data | (Docker Managed) | /var/lib/postgresql/data | จัดเตรียมพื้นที่สำหรับ Persistent Data |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| rms_default (auto-generated) | bridge | db, backend, frontend |

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

![Docker Compose PS](./tests/reports/staging-docker-ps.png)

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

`postgresql://neondb_owner:****************@ep-divine-water-aox7h6hc-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

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
| `DATABASE_URL` | Backend (Render) | postgresql://neondb_owner:npg_3cQySeOUdzh6@ep-divine-water-aox7h6hc-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require |
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `https://restaurant-management-system-exam-2-sable.vercel.app` |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://restaurant-management-system-exam-2025-1-xces.onrender.com/api` |

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

**✏️ Production Smoke Test ผ่าน:** 4 / 4 รายการ

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
| Total Tests | 15 |
| Tests Passed | 11 |
| Tests Failed | 4 |
| **Pass Rate** | **73.3%** |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

![CI/CD Pipeline](./tests/reports/cicd-pipeline-success.png)

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
