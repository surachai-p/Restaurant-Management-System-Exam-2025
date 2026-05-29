# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล |นางสาว สุธีมนต์ วงศ์พระราม|
| รหัสนักศึกษา |68030300|
| วันที่สอบ |28/5/2569|

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/[68030300]/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) |https://restaurant-management-system-exam-2-weld.vercel.app| ✅ |
| Backend (Render) |https://rms-backend-api-57p0.onrender.com| ✅ |
| API Health Check (`/api/health`) |https://rms-backend-api-57p0.onrender.com/api/health| ✅ |
| Database (Neon.tech connection string) |postgresql://neondb_owner:npg_jPTDq8L3xhAr@ep-weathered-math-apqq3d4x-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require| ✅|

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth |เพื่อควบคุมการเข้าถึงระบบและตรวจสอบว่าผู้ใช้งานแต่ละบทบาท (Admin, Cashier, Waiter) เข้าถึงฟังก์ชันได้ตรงตามสิทธิ์ (Role-based Access Control) เพื่อป้องกันการเข้าถึงข้อมูลภายในโดยไม่ได้รับอนุญาต|
| Menu |เป็นฟังก์ชันหลักในการบริหารจัดการรายการอาหาร (เพิ่ม/แก้ไข/ลบ/ดึงข้อมูล) ซึ่งส่งผลโดยตรงต่อการแสดงผลหน้าบ้าน และเป็นตัวกำหนดโครงสร้างข้อมูลสินค้าที่จะถูกนำไปคำนวณในออเดอร์|
| Order |เป็นกระบวนการสำคัญ (Core Business Workflow) ในการบันทึกการสั่งอาหารของลูกค้า การตัดยอดวัตถุดิบในคลัง และการส่งต่อสถานะออเดอร์ไปยังห้องครัว หากทำงานผิดพลาดจะส่งผลกระทบต่อการบริการทันที|
| Payment |เป็นจุดวิกฤตสูงสุดของระบบเชิงธุรกิจ (Critical Financial Point) ที่ต้องตรวจสอบความถูกต้องแม่นยำในการคำนวณยอดสุทธิ ยอดเงินที่รับมา และเงินทอน เพื่อป้องกันความสูญเสียทางรายได้และปัญหาบัญชีคลาดเคลื่อน|
| Report |เพื่อตรวจสอบความถูกต้องในการดึงข้อมูลจากฐานข้อมูลมาประมวลผลสรุปยอดขาย รายได้ และสถิติเมนูยอดนิยม ซึ่งผู้บริหารต้องใช้ข้อมูลรายงานเหล่านี้ในการวางแผนเชิงกลยุทธ์และการตัดสินใจทางธุรกิจ|
| Security |เพื่อปิดกั้นช่องโหว่ความปลอดภัยพื้นฐาน เช่น การตรวจสอบความถูกต้องของ JWT Token ในทุก ๆ API Endpoint และการป้องกันช่องโหว่ประเภท SQL Injection เพื่อรักษาความปลอดภัยของข้อมูลธุรกรรมร้านอาหาร|

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
|Physical Hardware Integration|เนื่องจากข้อจำกัดด้านอุปกรณ์ในสภาพแวดล้อมทดสอบ (Test Environment) เช่น เครื่องพิมพ์ใบเสร็จความร้อน (Thermal Ticket Printer) หรือเครื่องรูดบัตรเครดิต (EDC) เฟสนี้จึงใช้การจำลองผลลัพธ์ (Mock Output) บนหน้าจอของระบบทดสอบแทน|
|Third-party Payment Gateway|เนื่องจากฟังก์ชันการจ่ายเงินในเฟสนี้มุ่งเน้นทดสอบตรรกะภายใน (Internal Logic) เช่น การคำนวณยอดสุทธิ ยอดรับเงิน และเงินทอน จึงจำลองเฉพาะการรับเงินสดหรือการบันทึกสถานะโอนเงินภายในระบบเอง โดยไม่เชื่อมต่อระบบตัดบัตรเครดิตหรือ API ของธนาคารภายนอกจริง เพื่อความปลอดภัยและความรวดเร็วในกระบวนการทดสอบ|

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest |ใช้เขียนและรันชุดทดสอบระดับหน่วย (Unit) เพื่อตรวจสอบความถูกต้องของตรรกะทางธุรกิจ (Business Logic) ตัวคำนวณราคา ยอดรวมออเดอร์ และฟังก์ชันการตัดสต็อกสินค้าในฝั่ง Backend ให้ทำงานถูกต้องแม่นยำในทุกเงื่อนไข|
| API Testing (E2E) | Postman / Newman |ใช้สร้างและรันเทสคอลเลกชันดักจับการทำงานแบบไหลลื่นตั้งแต่ต้นจนจบ (End-to-End API Workflow) เช่น จำลองสถานการณ์พนักงานเปิดโต๊ะ -> สั่งอาหารหลายรายการ -> บันทึกการชำระเงิน และตรวจสอบความถูกต้องของรหัสตอบกลับ (HTTP Status Code) และโครงสร้างข้อมูล JSON|
| Security Testing | npm audit |ใช้เครื่องมือรันคำสั่งตรวจสอบและสแกนหาช่องโหว่ความปลอดภัย (Vulnerability Assessment) ของไลบรารีและโค้ดโอเพนซอร์ส (Dependencies) ต่าง ๆ ทั้งในโปรเจกต์ฝั่งหน้าบ้านและหลังบ้าน โดยมุ่งเน้นตรวจจับและอุดช่องโหว่ระดับ High และ Critical|
| Smoke Testing | Manual |ทำการทดสอบควัน (Smoke Test) ด้วยตนเองผ่านเว็บเบราว์เซอร์หลังจากติดตั้งบนสภาพแวดล้อมผลิตจริง (Production) บนระบบคลาวด์ เพื่อยืนยันว่าฟังก์ชันหลัก (Health Check, Login, Add Item, Payment) สามารถใช้งานได้อย่างน้อย 4 ฟีเจอร์ โดยระบบต้องเปิดขึ้นมาและไม่เกิดอาการระบบล่ม (Crash)|
| Staging Test | Docker Compose |ใช้สำหรับจำลองและรันสภาพแวดล้อมเสมือนก่อนการขึ้นระบบจริง (Staging Environment) บนเครื่อง Local โดยทำการรวมบริการ Backend, Frontend และฐานข้อมูล PostgreSQL เข้ามารันอยู่บนเครือข่าย Docker Network เดียวกันเพื่อทดสอบระบบภาพรวมร่วมกัน|

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS |Windows 11|
| Node.js |v24.14.0|
| npm |11.9.0|
| Docker |Docker version 29.4.2, build 055a478|
| PostgreSQL | 16 (Neon.tech) |
| Browser |Google Chrome (Latest Version)|
| Newman |6.2.2|

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
| Newman Pass Rate ขั้นต่ำ | ≥ 85% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 |Payment Processing|หากระบบคำนวณเงินผิดพลาด ยอมให้บันทึกบิลที่รับเงินมาไม่ครบ หรือคำนวณเงินทอนติดลบได้ จะทำให้ร้านค้าสูญเสียรายได้โดยตรง ตัวเลขบัญชีและรายงานยอดขายคลาดเคลื่อนรุนแรง ส่งผลกระทบต่อสภาพคล่องทางการเงินของธุรกิจ|Critical|
| 2 |Order Management|หากระบบรับออเดอร์เกิดการหน่วง ล่ม หรือไม่รองรับการทำงานพร้อมกันจำนวนมาก (Concurrency) ในช่วงเวลาเร่งด่วน (Peak Hours) จะทำให้พนักงานไม่สามารถคีย์ออเดอร์ได้ ลูกค้าได้รับอาหารล่าช้า เสียโอกาสในการขาย และทำลายชื่อเสียงของร้าน|High|
| 3 |Menu & Stock Integration|หากระบบสต็อกไม่ตัดยอดตามจริง หรือไม่ยอมคืนยอดวัตถุดิบเมื่อมีการยกเลิกออเดอร์ จะทำให้ข้อมูลวัตถุดิบในครัวกับระบบไม่ตรงกัน ส่งผลให้เกิดปัญหาวัตถุดิบหมดระหว่างวันจนไม่สามารถขายได้ หรือสั่งวัตถุดิบมาเกินจนเน่าเสีย|High|

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
| TC-005 | Positive | Menu| เพิ่มรายการอาหารใหม่เข้าสู่ระบบด้วยสิทธิ์ผู้ดูแลระบบ| {name: "Salmon Salad", price: 250, stock: 20}| HTTP 201 Created + ข้อมูลเมนูใหม่|HTTP 201 Created บันทึกเมนูลงฐานข้อมูลสำเร็จ| ✅ |
| TC-006 | Positive | Order| เปิดโต๊ะและบันทึกการสั่งออเดอร์ปกติ| {tableId: 5, items: [{menuId: 1, quantity: 2}]}| HTTP 201 Created + สถานะออเดอร์เปิดสำเร็จ|HTTP 201 Created สร้างออเดอร์และตัดสต็อกปกติ| ✅ |
| TC-007 | Negative | Menu| เพิ่มรายการอาหารโดยส่งข้อมูลไม่ครบถ้วน (ขาดราคา)| {name: "Fried Rice", stock: 10}| HTTP 400 Bad Request| HTTP 400 Bad Request ระบบปฏิเสธการบันทึก| ✅ |
| TC-008 | Negative | Order| พยายามอัปเดตสถานะออเดอร์ที่ไม่มีอยู่จริง (Invalid ID)| PUT /api/orders/99999สถานะใหม่| HTTP 404 Not Found| HTTP 404 Not Found ตามคาดหมาย| ✅ |
| TC-009 | Security | Auth / Role| พนักงานทั่วไป (Waiter) พยายามเข้าถึง Endpoint ลบเมนูอาหาร| DELETE /api/menu/1 (ใช้ Token พนักงาน)| HTTP 403 Forbidden| HTTP 403 Forbidden ระบบบล็อกสิทธิ์สำเร็จ| ✅ |
| TC-010 | Security |Menu|ทดสอบความปลอดภัยโดยส่ง SQL Injection ผ่านฟิลด์ค้นหาเมนู| GET /api/menu?search=' OR 1=1--| ระบบประมวลผลปลอดภัย ไม่เกิด Data Leak / SQL Error| ระบบกรองค่าผ่าน Prisma ปลอดภัย ไม่เกิด SQL Error| ✅ |
| TC-011 | Edge | Payment| ชำระเงินด้วยยอดเงินที่น้อยกว่าราคาสุทธิ (ทดสอบ BUG!)| {orderId: 2, amount: 400} (ยอดเต็ม 500)| HTTP 400 Bad Request และปฏิเสธการปิดบิล| HTTP 200 OK ระบบยอมรับบิลและคำนวณเงินทอนติดลบ -100| ❌ |

**✏️ สรุปผล:** ผ่าน 10 / 11 กรณี (90.91%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `[รหัสนักศึกษา]` ด้วยรหัสจริง**

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-68030300-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-[68030300]-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env.json` |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` | http://localhost:3001| Base URL ของ Backend API |
| `{{token}}` | "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjYXNoaWVyMSIsInJvbGUiOiJjYXNoaWVyIiwibmFtZSI6IkNhc2hpZXIgT25lIiwiaWF0IjoxNzc5OTQzNDU1LCJleHAiOjE3Nzk5NzIyNTV9.vAgfWfrL-P-gkzGlYMOGwVIw7rWK5xUEAvfRVACwHpI" | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiBVc2VyIiwiaWF0IjoxNzc5OTQzNDUyLCJleHAiOjE3Nzk5NzIyNTJ9.nRjrDE9aLJod3NLXBOCEjsPHqFGw5o50tg7d4XgnUfc" | Request ที่ต้องการสิทธิ์ Admin |

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
| Admin Login| POST| /api/auth/login| 200 OK| ✅ |
| Cashier Login| POST| /api/auth/login| 200 OK| ✅ |
| Open Table & Order| POST| /api/orders| 201 Created| ✅ |
| Payment Underpaid Amount| POST| /api/payments| 400 Bad Request| ✅ |
| Add Items to Order| POST| /api/orders/{{current_order_id}}/items| 201 Created| ✅ |
|Confirm Order to Kitchen| PUT| /api/orders/{{current_order_id}}/confirm| 200 OK| ✅ |

**✏️ สรุป:** ผ่าน 4 / 4 Request **หมายเหตุ อีก 2 Request เพิ่มเข้ามาเพื่อให้ระบบสมบูรณ์

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

![Postman Collection + Env Vars](tests/reports/postman-collection-env.png)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

![Postman Run Result](tests/reports/postman-run-result.png)

---

### Newman E2E Test Summary

#### คำสั่งรัน Newman

```bash
# ติดตั้ง Newman (ถ้ายังไม่ได้ติดตั้ง)
npm install -g newman newman-reporter-htmlextra

# รัน Collection
newman run RMS-[68030300]-TestSuite.postman_collection.json \
    --environment tests/postman/env.json \
    --reporters cli,htmlextra \
    --reporter-htmlextra-export tests/reports/newman-report.html
```

#### ผลการรัน Newman (Local)

**✏️ วาง output จาก Terminal ที่ได้หลังรัน Newman แทนที่ข้อความ template ด้านล่างทั้งหมด**

```
[RMS-[68030300]-TestSuite

→ Admin Login
  POST http://localhost:3001/api/auth/login [200 OK, 594B, 99ms]
  √  Status code is 200

→ Cashier Login
  POST http://localhost:3001/api/auth/login [200 OK, 608B, 87ms]
  √  Status code is 200

→ Open Table & Order
  POST http://localhost:3001/api/orders [201 Created, 465B, 26ms]

→ Payment Underpaid Amount
  POST http://localhost:3001/api/payments [400 Bad Request, 360B, 14ms]
  √  Should return 400 Bad Request due to underpayment
  √  Error message should be clear

→ Add Items to Order
  POST http://localhost:3001/api/orders/11/items [201 Created, 648B, 42ms]

→ Confirm Order to Kitchen
  PUT http://localhost:3001/api/orders/11/confirm [200 OK, 467B, 22ms]

┌─────────────────────────┬───────────────────┬──────────────────┐
│                         │          executed │           failed │
├─────────────────────────┼───────────────────┼──────────────────┤
│              iterations │                 1 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│                requests │                 6 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│            test-scripts │                 4 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│      prerequest-scripts │                 1 │                0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│              assertions │                 4 │                0 │
├─────────────────────────┴───────────────────┴──────────────────┤
│ total run duration: 704ms                                      │
├────────────────────────────────────────────────────────────────┤
│ total data received: 1.31kB (approx)                           │
├────────────────────────────────────────────────────────────────┤
│ average response time: 48ms [min: 14ms, max: 99ms, s.d.: 32ms] │
└────────────────────────────────────────────────────────────────┘]
```

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests |6|
| Tests Passed |4|
| Tests Failed |0|
| Pass Rate | 100% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

![Newman Run Result](tests/reports/newman-cli-result.png)

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

**✏️ Newman Pass Rate จาก CI/CD:** 20/20 (100%)

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

![CI Pipeline Newman](tests/reports/ci-pipeline-newman.png)

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
| Critical |0|
| High |0|
| Medium |3|
| Low |0|
| **รวม** |3|

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
|ไม่พบช่องโหว่|-|-|-|-|-|

**รูปที่ 5 — ผล npm audit Backend**

![Backend npm audit](tests/reports/npm-audit-backend.png)

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

**✏️ กรอกจำนวนช่องโหว่จริงที่พบ**

| Severity | จำนวน |
|----------|-------|
| Critical |0|
| High |1|
| Medium |2|
| Low |0|
| **รวม** |3|

**รูปที่ 6 — ผล npm audit Frontend**

![Frontend npm audit](tests/reports/npm-audit-frontend.png)

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ✅ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

![CI Security Scan](tests/reports/ci-security-scan.png)

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: [ระบบชำระเงินทอนเงินติดลบเมื่อยอดรับเงินน้อยกว่ายอดรวม (Underpayment)]

| รายการ | ค่า |
|--------|-----|
| **Severity** | High |
| **Priority** | P1 |
| **Feature** |Payment / Checkout (ระบบชำระเงิน)|
| **Status** | Open |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. เปิดใช้งานหน้าต่างส่งคำสั่งซื้อและชำระเงิน (Checkout)
2. สั่งซื้ออาหารยอดรวมเป็นจำนวนเงิน $100$ บาท
3. ใส่จำนวนเงินที่รับจากลูกค้าในช่องชำระเงินต่ำกว่ายอดจริง เช่น ใส่เงินมา $50$ บาท แล้วกดกดยืนยันชำระเงิน (คำสั่งซื้อไม่ถูกปฏิเสธ)

#### Expected Result
> ✏️ ระบบต้องปฏิเสธการชำระเงิน (Reject) หรือแจ้งเตือนว่า "จำนวนเงินไม่ครบ" และไม่อนุญาตให้ทำรายการสำเร็จจนกว่าจะได้รับเงินครบถ้วน

#### Actual Result
> ✏️ ระบบยอมให้ทำรายการชำระเงินผ่าน และทำการคำนวณเงินทอนออกมาติดลบเป็นค่า -50 บาท (AssertionError: expected -50 to be greater than or equal to 0)

#### Evidence

![BUG-001](tests/reports/bug-001.png)

#### Business Impact
> ✏️ ส่งผลกระทบอย่างรุนแรงต่อรายได้และบัญชีของร้านอาหาร เนื่องจากระบบยอมปล่อยให้คำสั่งซื้อสำเร็จทั้งที่รับเงินมาไม่ครบ ทำให้ร้านค้าสูญเสียรายได้ (ขาดทุน) และทำให้รายงานสรุปยอดบัญชีประจำวันคลาดเคลื่อนติดลบ ระบบขาดความน่าเชื่อถือในการใช้งานจริง

---

### BUG-002: [ช่องโหว่ความปลอดภัยระดับ High ใน Axios Package (Prototype Pollution & Request Hijacking)]

| รายการ | ค่า |
|--------|-----|
| **Severity** | (High) |
| **Priority** | (P2) |
| **Feature** | Frontend Security / API Integration (ระบบความปลอดภัยหน้าบ้าน) |
| **Status** | Open |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. ใช้เครื่องมือสแกนความปลอดภัยด้วยการเปิด Terminal ไปที่โฟลเดอร์ frontend
2. รันคำสั่งตรวจสอบช่องโหว่ซอฟต์แวร์ด้วย npm audit --audit-level=moderate
3. ระบบจะตรวจพบช่องโหว่ร้ายแรงในชุดแพ็กเกจ axios ช่วงเวอร์ชัน 1.0.0 - 1.15.1

#### Expected Result
> ✏️ แพ็กเกจหรือไลบรารีภายนอกทั้งหมดที่นำมาพัฒนาหน้าบ้านต้องมีความปลอดภัย ไม่มีช่องโหว่สาธารณะ (CVE) ที่เปิดโอกาสให้ผู้ไม่หวังดีโจมตีระบบหรือเจาะข้อมูลได้

#### Actual Result
> ✏️ ตรวจพบช่องโหว่ความปลอดภัยระดับ High จำนวน 2 จุดใน Axios (GHSA-3w6x-2g7m-8v23 และ GHSA-q8qp-cvcw-x6jj) ซึ่งทำให้ระบบเสี่ยงต่อการถูกแทรกแซงโครงสร้างข้อมูล (Prototype Pollution) และส่งผลให้แฮกเกอร์สามารถขโมยสิทธิ์ (Credential Injection) หรือจู่โจมยึดคำขอ HTTP ได้

#### Evidence

![BUG-002](tests/reports/bug-002.png)

#### Business Impact
> ✏️ ส่งผลกระทบต่อความน่าเชื่อถือและความปลอดภัยของร้านอาหารอย่างมาก หากแฮกเกอร์ฉวยโอกาสใช้ช่องโหว่นี้ทำการดักจับหรือเปลี่ยนเส้นทางข้อมูลคำขอชำระเงิน (Request Hijacking) อาจส่งผลให้ข้อมูลบัตรเครดิต หรือข้อมูลส่วนตัวของลูกค้าที่สั่งอาหารรั่วไหล ซึ่งอาจทำให้ร้านอาหารถูกฟ้องร้องดำเนินคดีตามกฎหมาย PDPA และสูญเสียฐานลูกค้าในระยะยาว

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
git clone https://github.com/[68030300]/Restaurant-Management-System-Exam-2025.git
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
| Backend API |3001| |http://localhost:5173||-|
| Frontend |5173| — |http://localhost:3001|

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `[http://localhost:[port]/api/health](http://localhost:3001/api/health)` | `{"status":"ok"}` | ✅ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅ |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

![On-Premises Backend Health](tests/reports/onprem-backend-health.png)

**รูปที่ 9 — Frontend Login สำเร็จ**

![On-Premises Frontend Login](tests/reports/onprem-frontend-login.png)
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
| `DATABASE_URL` | backend |postgresql://postgres:postgres@db:5432/rms_db|
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend |http://localhost|
| `NODE_ENV` | backend |production|
| `VITE_API_URL` | frontend |http://localhost:3001|

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ✅ มี / ☐ ไม่มี | |
| Frontend | ✅ มี / ☐ ไม่มี | |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

![Multi-stage Dockerfile](tests/reports/dockerfile-multistage.png)

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
|postgres_data|(Named Volume)|/var/lib/postgresql/data|ใช้เก็บข้อมูลของฐานข้อมูล PostgreSQL ให้คงอยู่ถาวร (Data Persistence) ป้องกันข้อมูลหายเมื่อปิด/ลบ Container|

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
|default|bridge|db, backend, frontend|

#### คำสั่งรัน Staging

```bash
docker compose up --build
```

#### ผล Smoke Test — Staging

**✏️ ทดสอบหลัง `docker compose up` สำเร็จ**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:3002/api/health` | `{"status":"ok"}` | ✅ |
| Frontend | `http://localhost:80` | หน้า Login แสดงผลสำเร็จ | ✅ |

#### หลักฐาน Staging

**รูปที่ 11 — `docker compose ps` แสดงทุก Container สถานะ `running`**

![Docker Compose PS](tests/reports/staging-docker-ps.png)

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

`[postgresql://[user]:***@[host].neon.tech/[db]?sslmode=require](postgresql://rms-database_owner:***@ep-still-silence-05292634.ap-southeast-1.neon.tech/neondb?sslmode=require)`

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
| `DATABASE_URL` | Backend (Render) |`[postgresql://[user]:***@[host].neon.tech/[db]?sslmode=require](postgresql://rms-database_owner:***@ep-still-silence-05292634.ap-southeast-1.neon.tech/neondb?sslmode=require)`|
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `https://restaurant-management-system-exam-2-weld.vercel.app` |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://rms-backend-api-57p0.onrender.com` |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

**✏️ ทดสอบบน Production URL จริง แล้วกรอกผลและแนบภาพหลักฐาน**

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ✅ |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ❌ |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | ❌ |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ❌ |

**✏️ Production Smoke Test ผ่าน:** 1 / 4 รายการ

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

![Smoke Test Health](./tests/reports/smoke-1-health.png)

**รูปที่ 13 — Smoke Test Feature 2: Login**

![Smoke Test Login](./tests/reports/smoke-2-login.png)`

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

`![Smoke Test Order](./tests/reports/smoke-3-order.png)

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
| Total Tests |12|
| Tests Passed |12|
| Tests Failed |0|
| **Pass Rate** | **100%** |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

![CI/CD Pipeline](./tests/reports/cicd-pipeline-success.png)

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
