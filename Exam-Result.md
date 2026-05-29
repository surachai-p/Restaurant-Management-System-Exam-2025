# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล | นางสาววณิชชา จับปรั่ง |
| รหัสนักศึกษา | 68030251  |
| วันที่สอบ | 28/05/2569 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/wanitcha-jabprang/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) |https://restaurant-management-s-git-26e209-wanitcha-jabprang-s-projects.vercel.app/orders | ✅ |
| Backend (Render) |https://rms-backend-um90.onrender.com | ✅ |
| API Health Check (`/api/health`) | https://rms-backend-um90.onrender.com/api/health| ✅ |
| Database (Neon.tech connection string)/(Render) |postgresql://rms_db_ten0_user:9jaLH9RIPnauUcLvJdvo4rC2RlQQPZZk@dpg-d8cnmmp9rddc73dei8rg-a/rms_db_ten0| ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth |เพื่อตรวจสอบความถูกต้องของการเข้าสู่ระบบ และการแบ่งสิทธิ์ เช่น พนักงาน, เชฟ, ผู้จัดการร้านให้เข้าถึงฟังก์ชันตรงตามหน้าที่|
| Menu |เพื่อตรวจสอบความถูกต้องของการจัดการเมนูอาหาร (เพิ่ม/ลด/แก้ไขราคา/ซ่อนเมนูที่หมด) แสดงผลถูกต้อง เรียลไทม์ และรองรับเงื่อนไขตัวเลือกเสริม|
| Order |เป็นฟังก์ชันวิกฤต (Critical Flow) ต้องทดสอบความถูกต้องตั้งแต่การสร้างออเดอร์ การส่งออเดอร์เข้าครัว จนถึงการเสิร์ฟอาหาร|
| Payment |เพื่อตรวจสอบความถูกต้องในการคำนวณเงิน (ยอดรวม, VAT, Service Charge, ส่วนลด) และความเสถียรในการตัดเงินผ่านช่องทางต่าง ๆ|
| Report |เพื่อตรวจสอบความแม่นยำของรายงานยอดขาย ข้อมูลสต็อก และสถิติต่าง ๆ ที่เจ้าของร้านต้องนำไปใช้ในการวิเคราะห์และดำเนินธุรกิจ|
| Security |เพื่อป้องกันช่องโหว่พื้นฐาน (เช่น SQL Injection, XSS) และตรวจสอบว่าข้อมูลสำคัญของลูกค้า (เช่น เบอร์โทรศัพท์, ข้อมูลบัตรเครดิต) มีการเข้ารหัสและจัดเก็บอย่างปลอดภัย|

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
|การทดสอบความเสถียรของ Hardware และอุปกรณ์ POS (เช่น เครื่องพิมพ์ใบเสร็จ)|เนื่องจากเป็นการทดสอบในระดับ Software ภายในระบบร้านอาหารเท่านั้น ปัญหาที่เกิดจากความบกพร่องของอุปกรณ์ฮาร์ดแวร์ภายนอกจะอยู่นอกเหนือความรับผิดชอบ|
|ความเสถียรของสัญญาณอินเทอร์เน็ต|ไม่ทดสอบกรณีร้านอาหารอินเทอร์เน็ตล่มหรือสัญญาณช้า เนื่องจากเป็นปัจจัยภายนอก ระบบจะทดสอบบนสมมติฐานว่าเครือข่ายทำงานปกติ|

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
| --- | --- | --- |
| **Unit Testing** | Vitest | ทดสอบการทำงานของฟังก์ชัน, Components และ Logic ย่อยในระดับ Code Level แบบแยกส่วน (Isolation) โดยเน้นเขียน Test Case ให้ครอบคลุมทั้งแบบ Success Case, Edge Case และ Error Handling พร้อมตั้งเป้าหมาย Code Coverage ไม่ต่ำกว่า 80% ก่อนผสานโค้ด (Merge) |
| **API Testing (E2E)** | Postman / Newman | ทดสอบการทำงานของ RESTful API ตั้งแต่ต้นจนจบกระบวนการ (End-to-End) เพื่อตรวจสอบความถูกต้องของ Response Code, Data Structure และ Business Logic โดยจะรันชุดทดสอบอัตโนมัติ (Collection Run) ผ่าน Newman ใน Pipeline ของ CI/CD เมื่อมีการ Deploy |
| **Security Testing** | npm audit | ตรวจสอบช่องโหว่ทางด้านความปลอดภัย (Vulnerability Assessment) ของ Open-source Dependencies และ Third-party Libraries ที่ใช้งานในโปรเจกต์ โดยจะกำหนดให้ระบบแจ้งเตือนหรือบล็อกการ Build หากพบช่องโหว่ระดับ High หรือ Critical |
| **Smoke Testing** | Manual | ทำการทดสอบฟังก์ชันการทำงานหลักที่สำคัญของระบบ (Critical Paths) ด้วยมือทันทีหลังจากมีการ Deploy โค้ดเวอร์ชันใหม่ขึ้นสู่ระบบ เพื่อตรวจสอบอย่างรวดเร็วว่าระบบเบื้องต้นยังทำงานได้ปกติและไม่มีการพังทลายรุนแรง (Major Breakdown) |
| **Staging Test** | Docker Compose | จำลองสภาพแวดล้อมจำลอง (Staging Environment) ที่ใกล้เคียงกับ Production มากที่สุดโดยใช้ Containerization เพื่อทดสอบการทำงานร่วมกันของทุก Service (เช่น Frontend, Backend, Database) ก่อนจะปล่อยระบบให้ผู้ใช้จริงใช้งาน |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS |Windows 11 Home Single Language (Version 25H2)|
| Node.js |v24.1.0|
| npm |11.3.0|
| Docker |v29.2.1|
| PostgreSQL | 16 (Neon.tech) |
| Browser|Microsoft Edge Version 148.0.3967.83|
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
| Newman Pass Rate ขั้นต่ำ | ≥ 85 % |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | 4 / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

# | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | **ระบบรับชำระเงินและออกใบเสร็จ (POS / Payment Integration)** | หากระบบล่ม คำนวณยอดผิดพลาด หรือไม่สามารถรับชำระเงินผ่านบัตร/QR Code ได้ จะทำให้ร้านค้าสูญเสียรายได้ทันที เกิดปัญหาคิวสะสม ลูกค้าขอยกเลิกออเดอร์ และส่งผลเสียต่อความน่าเชื่อถือของแบรนด์อย่างรุนแรง | **Critical** |
| 2 | **ระบบส่งออเดอร์ไปยังห้องครัว (Kitchen Order Ticket - KOT)** | หากออเดอร์ตกหล่น ส่งข้อมูลผิดโต๊ะ หรือระบบดีเลย์ จะทำให้ห้องครัวทำอาหารผิดพลาด ส่งอาหารล่าช้า หรือไม่ได้ทำอาหารตามคิว ลูกค้าปฏิเสธการรับสินค้า เกิด Food Waste สูงขึ้น และกระทบต่อดัชนีความพึงพอใจของลูกค้า (CSAT) | **High** |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**


| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| **TC-001** | Positive | Health & System | ตรวจสอบสถานะความพร้อมของระบบ | GET `{{base_url}}/api/health` | HTTP 200, status: "ok", version: "2.0.0" | HTTP 200, status: "ok", version: "2.0.0"| **Pass** |
| **TC-002** | Positive | Authentication | Admin ล็อกอินด้วยข้อมูลที่ถูกต้อง | POST `{{base_url}}/api/auth/login`<br>`{"username":"admin", "password":"Admin@123"}` | HTTP 200 + ได้รับ JWT Token | HTTP 200 + ได้รับ JWT Token |**Pass**|
| **TC-003** | Positive | Authentication | Cashier ล็อกอินด้วยข้อมูลที่ถูกต้อง | POST `{{base_url}}/api/auth/login`<br>`{"username":"cashier1", "password":"Cashier@123"}` | HTTP 200 + ได้รับ JWT Token |HTTP 200 + ได้รับ JWT Token|**Pass**|
| **TC-004** | Positive | Authentication | Waiter ล็อกอินด้วยข้อมูลที่ถูกต้อง | POST `{{base_url}}/api/auth/login`<br>`{"username":"waiter1", "password":"Waiter@123"}` | HTTP 200 + ได้รับ JWT Token |HTTP 200 + ได้รับ JWT Token|**Pass**|
| **TC-005** | Negative | Authentication | ล็อกอินด้วยรหัสผ่านที่ผิด | POST `{{base_url}}/api/auth/login`<br>`{"username":"admin", "password":"wrong"}` | HTTP 401 Unauthorized |HTTP 401 Unauthorized|**Pass**|
| **TC-006** | Negative | Authentication | ล็อกอินโดยไม่ส่งข้อมูล Credentials | POST `{{base_url}}/api/auth/login`<br>`{}` | HTTP 400 Bad Request |HTTP 400 Bad Request|**Pass**|
| **TC-007** | Security | Authentication | เรียกใช้งาน API เมนูโดยไม่มี Token | GET `{{base_url}}/api/menu` (ไม่มี Auth Header) | HTTP 401 Unauthorized |HTTP 401 Unauthorized|**Pass**|
| **TC-008** | Positive | Menu | ดึงข้อมูลรายการอาหารทั้งหมดในเมนู | GET `{{base_url}}/api/menu`<br>(Header: Bearer admin_Token) | HTTP 200 + ข้อมูลรายการอาหาร |HTTP 200 + ข้อมูลรายการอาหาร|**Pass**|
| **TC-009** | Positive | Menu | ค้นหาข้อมูลรายการอาหารตามคำค้นหา | GET `{{base_url}}/api/menu?search=Pad Thai`<br>(Header: Bearer admin_Token) | HTTP 200 + ข้อมูลเมนูPad Thai | HTTP 200 + ข้อมูลเมนูPad Thai |**Pass**|
| **TC-010** | Security | Menu | ทดสอบ SQL Injection ในช่องค้นหาเมนู | GET `{{base_url}}/api/menu?search=%27+OR+%271%27%3D%271`<br>(Header: Bearer admin_Token) | ไม่แสดงข้อมูลทั้งหมดหรือตอบกลับ HTTP 400 |แสดงข้อมูลทั้งหมดและตอบกลับ HTTP 200|**Fail**|
| **TC-011** | Security | Menu | พนักงานเสิร์ฟพยายามแก้ไขราคาเมนู | PUT `{{base_url}}/api/menu/{id}`<br>`{"price": 1}` (Header: Bearer Token) | HTTP 403 Forbidden |HTTP 200 + สามารถแก้ไขราคาได้ |**Fail**|
| **TC-012** | Positive | Menu | ผู้ดูแลระบบ (Admin) เพิ่มรายการอาหารใหม่ | POST `{{base_url}}/api/menu`<br>`{"name":"Test Dish","price":99,"category":"food"}` (Bearer admin_Token) | HTTP 201 Created |HTTP 201 Created เพิ่มรายการอาหารได้|**Pass**|
| **TC-013** | Negative | Menu | พนักงานเสิร์ฟพยายามเพิ่มรายการอาหารใหม่ (Role Check) | POST `{{base_url}}/api/menu`<br>`{"name":"Waiter Dish","price":50,"category":"food"}` (Bearer Token) | HTTP 403 Forbidden |HTTP 403 Forbidden|**Pass**|
| **TC-014** | Positive | Orders | พนักงานเสิร์ฟเปิดออเดอร์ใหม่ให้กับโต๊ะ | POST `{{base_url}}/api/orders`<br>`{"tableId": 2}` (Header: Bearer Token) | HTTP 201 Created + ส่ง Order ID กลับมา |HTTP 201 Created + ส่ง Order ID กลับมา |**Pass**|
| **TC-015** | Edge | Orders | เปิดออเดอร์ซ้ำซ้อนในโต๊ะเดียวกันที่เปิดอยู่ | POST `{{base_url}}/api/orders`<br>`{"tableId": 2}` (Header: Bearer Token) | HTTP 409 Conflict |HTTP 201 Created + ส่ง Order ID กลับมา|**Fail**|
| **TC-016** | Positive | Orders | เพิ่มรายการอาหารเข้าไปในออเดอร์ | POST `{{base_url}}/api/orders/{order_id}/items`<br>`{"menuItemId": X, "quantity": 2}` (Bearer Token) | HTTP 201 Created |HTTP 201 Created |**Pass**|
| **TC-017** | Positive | Orders | ยืนยันคำสั่งซื้อ (Confirm Order) | PUT `{{base_url}}/api/orders/{order_id}/confirm`<br>(Header: Bearer Token) | HTTP 200 OK |HTTP 200 OK|**Pass**|
| **TC-018** | Negative | Orders | สร้างออเดอร์โดยไม่ระบุหมายเลขโต๊ะ | POST `{{base_url}}/api/orders`<br>`{}` (Header: Bearer Token) | HTTP 400 Bad Request | HTTP 400 Bad Request |**Pass**|
| **TC-019** | Positive | Payment | ชำระเงินจำนวนที่ถูกต้อง (มีเงินทอน ≥ 0) | POST `{{base_url}}/api/payments`<br>`{"orderId": X, "amountPaid": 9999, "method": "cash"}` (Bearer Token) | HTTP 201 Created + ค่า change ไม่ติดลบ |HTTP 201 Created + ค่า change ไม่ติดลบ|**Pass**|
| **TC-020** | Edge | Payment | จ่ายเงินน้อยกว่ายอดรวมที่ต้องชำระจริง | POST `{{base_url}}/api/payments`<br>`{"orderId": 9999, "amountPaid": 1, "method": "cash"}` (Bearer Token) | HTTP 400 Bad Request |HTTP 201 + ค่า change ติดลบ |**Fail**|
| **TC-021** | Security | Payment | ชำระเงินโดยไม่มีการพิสูจน์ตัวตน (No Auth) | POST `{{base_url}}/api/payments`<br>`{"orderId": 1, "amountPaid": 100}` (ไม่มี Auth Header) | HTTP 401 Unauthorized |HTTP 401 Unauthorized |**Pass**|

**✏️ สรุปผล:** ผ่าน 17 / 21 กรณี (81%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `[รหัสนักศึกษา]` ด้วยรหัสจริง**

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-[68030251]-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-[68030251]-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env.json` |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` |http://localhost:3001 | Base URL ของ Backend API |
| `{{token}}` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiBVc2VyIiwiaWF0IjoxNzgwMDMxNDY0LCJleHAiOjE3ODAwNjAyNjR9.BlzAvl7tkZaacB9fcypKp-NAE98RKh_nI2vX6SOC2BU | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiBVc2VyIiwiaWF0IjoxNzgwMDMxNDY0LCJleHAiOjE3ODAwNjAyNjR9.BlzAvl7tkZaacB9fcypKp-NAE98RKh_nI2vX6SOC2BU | Request ที่ต้องการสิทธิ์ Admin |

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
|--------------|--------|----------|--------------|-----------|
| **GET /api/health** | `GET` | `/health` | HTTP 200, status: "ok", version: "2.0.0" | ☑ Pass |
| **Login Admin** | `POST` | `/auth/login` | HTTP 200 + ได้รับ JWT Token | ☑ Pass |
| **Login Cashier** | `POST` | `/auth/login` | HTTP 200 + ได้รับ JWT Token | ☑ Pass |
| **Login Waiter** | `POST` | `/auth/login` | HTTP 200 + ได้รับ JWT Token | ☑ Pass |
| **Login Wrong Password** | `POST` | `/auth/login` | HTTP 401 Unauthorized | ☑ Pass |
| **Login Missing Credentials** | `POST` | `/auth/login` | HTTP 400 Bad Request | ☑ Pass |
| **No Token → 401** | `GET` | `/menu` | HTTP 401 Unauthorized | ☑ Pass |
| **GET /menu** | `GET` | `/menu` | HTTP 200 + ข้อมูลรายการอาหาร | ☑ Pass |
| **Search Menu** | `GET` | `/menu?search=Pad+Thai` | HTTP 200 + ข้อมูลเมนู Pad Thai | ☑ Pass |
| **SQL Injection in Search** | `GET` | `/menu?search=%27+OR+%271%27%3D%271` | แสดงข้อมูลทั้งหมดและตอบกลับ HTTP 200 | ☐ Fail |
| **Waiter Updates Menu Price** | `PUT` | `/menu/{{menu_item_id}}` | HTTP 200 + สามารถแก้ไขราคาได้ (สิทธิ์ไม่ล็อกจริง) | ☐ Fail |
| **Admin Adds Menu Item** | `POST` | `/menu` | HTTP 201 Created เพิ่มรายการอาหารได้ | ☑ Pass |
| **Waiter Cannot Add Menu Item** | `POST` | `/menu` | HTTP 403 Forbidden | ☑ Pass |
| **Create Order** | `POST` | `/orders` | HTTP 201 Created + ส่ง Order ID กลับมา | ☑ Pass |
| **Double Booking Same Table** | `POST` | `/orders` | HTTP 201 Created + ส่ง Order ID กลับมา (จองซ้ำได้) | ☐ Fail |
| **Add Item to Order** | `POST` | `/orders/{{order_id}}/items` | HTTP 201 Created | ☑ Pass |
| **Confirm Order** | `PUT` | `/orders/{{order_id}}/confirm` | HTTP 200 OK | ☑ Pass |
| **Create Order Without TableId** | `POST` | `/orders` | HTTP 400 Bad Request | ☑ Pass |
| **Exact Payment** | `POST` | `/payments` | HTTP 201 Created + ค่า change ไม่ติดลบ | ☑ Pass |
| **Underpayment** | `POST` | `/payments` | HTTP 201 + ค่า change ติดลบ (ยอมให้จ่ายต่ำกว่าจริง) | ☐ Fail |
| **Payment Without Auth** | `POST` | `/payments` | HTTP 401 Unauthorized | ☑ Pass |

**✏️ สรุป:** ผ่าน **17** / **21** Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**
![Postman Collection + Env Vars](./tests/reports/postman-collection-env.png)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**

![TC-001 ตรวจสอบสถานะความพร้อมของระบบ](./tests/reports/image1.png)
![TC-002 Admin ล็อกอินด้วยข้อมูลที่ถูกต้อง](./tests/reports/image2.png)
![TC-003 Cashier ล็อกอินด้วยข้อมูลที่ถูกต้อง](./tests/reports/image3.png)
![TC-004 Waiter ล็อกอินด้วยข้อมูลที่ถูกต้อง](./tests/reports/image4.png)
![TC-005 ล็อกอินด้วยรหัสผ่านที่ผิด](./tests/reports/image5.png)
![TC-006 ล็อกอินโดยไม่ส่งข้อมูล Credentials](./tests/reports/image6.png)
![TC-007 เรียกใช้งาน API เมนูโดยไม่มี Token](./tests/reports/image7.png)
![TC-008 ดึงข้อมูลรายการอาหารทั้งหมดในเมนู](./tests/reports/image8.png)
![TC-009 ค้นหาข้อมูลรายการอาหารตามคำค้นหา](./tests/reports/image9.png)
![TC-010 ทดสอบ SQL Injection ในช่องค้นหาเมนู](./tests/reports/image10.png)
![TC-011 พนักงานเสิร์ฟพยายามแก้ไขราคาเมนู](./tests/reports/image11.png)
![TC-012 ผู้ดูแลระบบ (Admin) เพิ่มรายการอาหารใหม่](./tests/reports/image12.png)
![TC-013 พนักงานเสิร์ฟพยายามเพิ่มรายการอาหารใหม่ (Role Check)](./tests/reports/image13.png)
![TC-014 พนักงานเสิร์ฟเปิดออเดอร์ใหม่ให้กับโต๊ะ](./tests/reports/image14.png)
![TC-015 เปิดออเดอร์ซ้ำซ้อนในโต๊ะเดียวกันที่เปิดอยู่](./tests/reports/image15.png)
![TC-016 เพิ่มรายการอาหารเข้าไปในออเดอร์](./tests/reports/image16.png)
![TC-017 ยืนยันคำสั่งซื้อ (Confirm Order)](./tests/reports/image17.png)
![TC-018 สร้างออเดอร์โดยไม่ระบุหมายเลขโต๊ะ](./tests/reports/image18.png)
![TC-019 ชำระเงินจำนวนที่ถูกต้อง (มีเงินทอน ≥ 0)](./tests/reports/image19.png)
![TC-020 จ่ายเงินน้อยกว่ายอดรวมที่ต้องชำระจริง](./tests/reports/image20.png)
![TC-021 ชำระเงินโดยไม่มีการพิสูจน์ตัวตน (No Auth)](./tests/reports/image21.png)
---

### Newman E2E Test Summary

#### คำสั่งรัน Newman

```bash
# ติดตั้ง Newman (ถ้ายังไม่ได้ติดตั้ง)
npm install -g newman newman-reporter-htmlextra

# รัน Collection
newman run tests/postman/RMS-[68030251]-TestSuite.json \
    --environment tests/postman/env.json \
    --reporters cli,htmlextra \
    --reporter-htmlextra-export tests/reports/newman-report.html
```

#### ผลการรัน Newman (Local)

**✏️ วาง output จาก Terminal ที่ได้หลังรัน Newman แทนที่ข้อความ template ด้านล่างทั้งหมด**

```
[RMS-TestSuite-v2-Cleaned

□ Health & System
└ GET /api/health
  GET http://localhost:3001/api/health [200 OK, 373B, 24ms]
  √  TC-001: health returns 200
  √  TC-001: status is ok
  √  TC-001: version 2.0.0

□ Authentication
└ Login Admin
  POST http://localhost:3001/api/auth/login [200 OK, 594B, 65ms]
  √  TC-002: admin login 200
  √  TC-002: returns JWT token

└ Login Cashier
  POST http://localhost:3001/api/auth/login [200 OK, 608B, 59ms]
  √  TC-003: cashier login 200

└ Login Waiter
  POST http://localhost:3001/api/auth/login [200 OK, 601B, 59ms]
  √  TC-004: waiter login 200

└ Login Wrong Password
  POST http://localhost:3001/api/auth/login [401 Unauthorized, 342B, 59ms]
  √  TC-005: wrong password → 401

└ Login Missing Credentials
  POST http://localhost:3001/api/auth/login [400 Bad Request, 352B, 4ms]
  √  TC-006: missing creds → 400

└ No Token → 401
  GET http://localhost:3001/api/menu [401 Unauthorized, 344B, 2ms]
  √  TC-007: no token → 401

□ Menu
└ GET /menu
  GET http://localhost:3001/api/menu [200 OK, 4.26kB, 4ms]
  √  TC-008: get menu 200
  √  TC-008: returns array

└ Search Menu
  GET http://localhost:3001/api/menu?search=Pad Thai [200 OK, 522B, 5ms]
  √  TC-009: search returns results

└ SQL Injection in Search
  GET http://localhost:3001/api/menu?search=' OR '1'='1 [200 OK, 4.26kB, 4ms]
  1. TC-010: SQL Injection should NOT leak all records

└ Waiter Updates Menu Price
  PUT http://localhost:3001/api/menu/4 [200 OK, 520B, 7ms]
  2. TC-011: Waiter cannot update menu price (expect 403)

└ Admin Adds Menu Item
  POST http://localhost:3001/api/menu [201 Created, 498B, 9ms]
  √  TC-012: admin adds menu item → 201

└ Waiter Cannot Add Menu Item
  POST http://localhost:3001/api/menu [403 Forbidden, 344B, 2ms]
  √  TC-013: waiter cannot add menu → 403

□ Orders
└ Create Order
  POST http://localhost:3001/api/orders [201 Created, 465B, 9ms]
  √  TC-014: create order → 201

└ Double Booking Same Table
  POST http://localhost:3001/api/orders [201 Created, 465B, 36ms]
  3. TC-015: Double booking → 409 Conflict

└ Add Item to Order
  POST http://localhost:3001/api/orders/23/items [201 Created, 644B, 21ms]
  √  TC-016: add item → 201

└ Confirm Order
  PUT http://localhost:3001/api/orders/23/confirm [200 OK, 465B, 11ms]
  √  TC-017: confirm order → 200

└ Create Order Without TableId
  POST http://localhost:3001/api/orders [400 Bad Request, 338B, 3ms]
  √  TC-018: missing tableId → 400

□ Payment
└ Exact Payment
  POST http://localhost:3001/api/payments [201 Created, 560B, 9ms]
  √  TC-019: payment → 201
  √  TC-019: change is non-negative

└ Underpayment
  POST http://localhost:3001/api/payments [400 Bad Request, 360B, 4ms]
  √  TC-020: Underpayment should → 400

└ Payment Without Auth
  POST http://localhost:3001/api/payments [401 Unauthorized, 344B, 3ms]
  √  TC-021: no auth → 401]
```

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests |21|
| Tests Passed |23|
| Tests Failed |3|
| Pass Rate | 88.46% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

![Newman Run Result](./tests/reports/newman-cli-result.png)

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

**✏️ Newman Pass Rate จาก CI/CD:** 20 / 20 (100%)

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
| Critical |0|
| High |0|
| Medium |0|
| Low |0|
| **รวม** |0|

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
|**"ไม่พบช่องโหว่"**| | | | | |

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
| Critical |0|
| High |1|
| Medium |2|
| Low |0|
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

### BUG-001: ระบบยอมรับการชำระเงินที่ยอดเงินไม่ครบและบันทึกเงินทอนติดลบ

| รายการ | ค่า |
|--------|-----|
| **Severity** | **Critical** (เนื่องจากกระทบต่อรายได้และการบัญชีของร้านโดยตรง) |
| **Priority** | **P1** (ต้องแก้ไขทันทีก่อนขึ้นระบบจริง) |
| **Feature** | Payment Processing (ระบบจัดการชำระเงิน) |
| **Status** | **fix** |

#### Steps to Reproduce
1. พนักงานแคชเชียร์ทำการเรียกออเดอร์ที่มีสถานะ `confirmed` เพื่อชำระเงิน (สมมติยอดรวม `totalAmount = 150` บาท)
2. พนักงานส่งคำขอชำระเงินผ่าน `POST /api/payments` โดยระบุจำนวนเงินที่จ่ายน้อยกว่ายอดจริงในฐานข้อมูล (เช่น ส่งค่า `amountPaid = 100` บาท)
3. ตรวจสอบผลลัพธ์ที่ระบบตอบกลับมาและการบันทึกข้อมูลในระบบฐานข้อมูล

#### Expected Result
> ระบบต้องปฏิเสธการชำระเงินทันที โดยส่งตอบกลับเป็น `HTTP 400 Bad Request` พร้อมข้อความแจ้งเตือนว่าจำนวนเงินไม่เพียงพอ (`Insufficient payment amount`) และต้องไม่มีการบันทึกธุรกรรมใด ๆ ลงฐานข้อมูล รวมถึงไม่มีการเปลี่ยนสถานะของออเดอร์และโต๊ะอาหาร

#### Actual Result
> แจ้งเตือนว่าจำนวนเงินไม่เพียงพอ (`Insufficient payment amount`) และต้องไม่มีการบันทึกธุรกรรมใด ๆ ลงฐานข้อมูลจนกว่าจะกรอกจำนวนเงินที่เพียงพอ
#### Evidence

![BUG-001](./tests/reports/bug-001.png)

#### Business Impact
> 1. **สูญเสียรายได้โดยตรง:** ร้านอาหารจะขาดทุนเนื่องจากระบบยอมเปิดโต๊ะใหม่และปิดออเดอร์เก่า ทั้งที่ลูกค้ายังจ่ายเงินไม่ครบตามยอดบิลจริง
> 2. **ระบบบัญชีผิดพลาดร้ายแรง:** การบันทึกค่าเงินทอนเป็นตัวเลขติดลบในฐานข้อมูล ทำให้รายงานยอดขายประจำวัน รายงานภาษี และระบบบัญชีภายในของร้านคลาดเคลื่อน ไม่สามารถนำไปใช้งานต่อได้
> 3. **ช่องโหว่การทุจริต:** พนักงานหรือผู้ใช้งานระบบสามารถจงใจระบุยอดเงินที่จ่ายต่ำกว่าความเป็นจริงเพื่อขโมยเงินหรือปิดออเดอร์ให้คนรู้จักได้โดยไม่มีระบบคอยตรวจสอบ

---

### BUG-002: ระบบยอมรับการเปิดออเดอร์ซ้ำซ้อนบนโต๊ะอาหารเดียวกัน (Double Booking)

| รายการ | ค่า |
|--------|-----|
| **Severity** | **High** (ส่งผลกระทบต่อความถูกต้องของข้อมูลและกระบวนการทำงานในร้าน) |
| **Priority** | **P1** (ต้องเร่งแก้ไขเพื่อป้องกันความสับสนของพนักงานหน้างาน) |
| **Feature** | Order Management (ระบบจัดการคำสั่งซื้อ) |
| **Status** | **Open** |

#### Steps to Reproduce
1. พนักงานทำการเปิดออเดอร์ใหม่ผ่าน `POST /api/orders` ให้กับโต๊ะหมายเลขหนึ่ง (เช่น `tableId: 2`) โดยสถานะของออเดอร์นั้นจะถูกบันทึกเป็น `open`
2. พนักงานอีกคน (หรือพนักงานคนเดิม) ส่งคำขอเปิดออเดอร์ใหม่ไปที่ `POST /api/orders` ซ้ำอีกครั้ง โดยระบุเป็นโต๊ะเดิม (`tableId: 2`) ในขณะที่ออเดอร์แรกยังคงค้างอยู่ที่สถานะ `open` (ยังไม่ได้ปิดบิลชำระเงินหรือยกเลิก)
3. ตรวจสอบผลลัพธ์การตอบกลับจาก API และจำนวนออเดอร์ที่ผูกอยู่กับโต๊ะนั้นในฐานข้อมูล

#### Expected Result
> ระบบต้องตรวจสอบสถานะออเดอร์ค้างเก่าบนโต๊ะนั้นก่อน หากพบว่าโต๊ะดังกล่าวมีออเดอร์ที่สถานะยังเป็น `open` ค้างอยู่ ระบบต้องปฏิเสธการสร้างออเดอร์ใหม่ทันที โดยส่งตอบกลับเป็น `HTTP 409 Conflict` พร้อมข้อความแจ้งเตือน เช่น `Table already has an open order` เพื่อบังคับให้จัดการออเดอร์เดิมให้เสร็จสิ้นก่อน

#### Actual Result
> ระบบอนุญาตให้สร้างออเดอร์ใหม่ซ้ำซ้อนบนโต๊ะเดียวกันได้สำเร็จ โดยส่งตอบกลับเป็น `HTTP 201 Created` ทำให้ในระบบฐานข้อมูลมีออเดอร์ที่มีสถานะ `open` พร้อมกันมากกว่า 1 ออเดอร์ในโต๊ะเดียวกัน ซึ่งขัดกับหลักความเป็นจริงในร้านอาหาร

#### Evidence
![BUG-002](./tests/reports/bug-002.png)

#### Business Impact
> 1. **ความสับสนในการให้บริการของพนักงาน:** พนักงานเสิร์ฟและพนักงานในครัวจะไม่สามารถแยกแยะได้ว่ารายการอาหารใหม่ที่ถูกสั่งเข้ามา ควรจะเข้าไปรวมอยู่ในบิลใบไหน ทำให้เกิดความผิดพลาดในการเสิร์ฟและจัดเตรียมอาหาร
> 2. **บิลค่าอาหารคลาดเคลื่อนและเกิดการโต้เถียงกับลูกค้า:** เมื่อถึงขั้นตอนชำระเงิน ระบบจะดึงยอดเงินมาไม่ครบ หรือพนักงานอาจจะเลือกปิดบิลผิดใบ ส่งผลให้เรียกเก็บเงินลูกค้าผิดพลาด นำไปสู่การร้องเรียนและทำลายภาพลักษณ์ของร้าน
> 3. **ข้อมูลรายงานสถิติของร้านพัง:** ยอดการเปิดโต๊ะและจำนวนบิลสะสมจะเพิ่มขึ้นเกินจริงในระบบรายงานผู้บริหาร ทำให้ข้อมูลบัญชีและสถิติยอดขายรายวันคลาดเคลื่อนไปจากความเป็นจริงอย่างมาก

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
git clone https://github.com/wanitcha-jabprang/Restaurant-Management-System-Exam-2025.git
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
| Backend API |3001|http://localhost:5173| — |
| Frontend |5173| — |http://localhost:3001|

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:[port]/api/health` | `{"status":"ok"}` | ✅ |
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
| `DATABASE_URL` | backend |postgresql://rms_db_ten0_user:9jaLH9RIPnauUcLvJdvo4rC2RlQQPZZk@dpg-d8cnmmp9rddc73dei8rg-a/rms_db_ten0|
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend |https://restaurant-management-s-git-26e209-wanitcha-jabprang-s-projects.vercel.app/|
| `NODE_ENV` | backend |production|
| `VITE_API_URL` | frontend |https://rms-backend-um90.onrender.com|

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| **Backend** | ☑ มี / ☐ ไม่มี | `deps` ➔ `builder` ➔ `runner` |
| **Frontend** | ☑ มี / ☐ ไม่มี | `builder` ➔ `runner` (`nginx:alpine`) |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

`![Multi-stage Dockerfile](./tests/reports/dockerfile-multistage.png)`

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| `postgres_data` | บริหารจัดการโดย Docker Engine  | `/var/lib/postgresql/data` | ใช้สำหรับเก็บข้อมูลของฐานข้อมูล PostgreSQL แบบถาวร (Data Persistence) เพื่อไม่ให้ข้อมูลเมนูอาหาร ออเดอร์ และบัญชีผู้ใช้งานสูญหายเมื่อตู้คอนเทนเนอร์ถูกปิดหรือลบออก |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| `default` (ระบบสร้างให้อัตโนมัติ) | `bridge` | `db`, `backend`, `frontend` |

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

postgresql://neondb_owner:***@ep-fragrant-wind-ao048dp8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

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
| `DATABASE_URL` | Backend (Render) |postgresql://rms_db_ten0_user:9jaLH9RIPnauUcLvJdvo4rC2RlQQPZZk@dpg-d8cnmmp9rddc73dei8rg-a/rms_db_ten0|
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `https://restaurant-management-system-exam-2-theta.vercel.app` |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://rms-backend-47sv.onrender.com` |

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
