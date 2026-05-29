# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**✏️ กรอกข้อมูลของตนเอง:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล |น.ส.สุณัฐชา แก้วลา|
| รหัสนักศึกษา |68030298|
| วันที่สอบ |28/5/2569|

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/[68030298]/Restaurant-Management-System-Exam-2025.git`

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
| Frontend (Vercel) |https://restaurant-management-system-exam-2-sigma.vercel.app | ✅ |
| Backend (Render) |https://restaurant-management-system-exam-2025-ka3q.onrender.com | ✅ |
| API Health Check (`/api/health`) |https://restaurant-management-system-exam-2025-ka3q.onrender.com/api/health | ✅ |
| Database (Neon.tech connection string) |postgresql://neondb_owner:*********@ep-super-silence-aoyslbat-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require | ✅ |

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth |เพื่อตรวจสอบการเข้าสู่ระบบตามระดับสิทธิ์ (Role-based Access Control) ของ Admin, Cashier และ Waiter ให้ถูกต้อง |
| Menu |เพื่อให้มั่นใจว่าการ เพิ่ม/แก้ไข/ลบ เมนูอาหาร พร้อมราคาและสต็อกทำงานได้อย่างถูกต้อง |
| Order |เพื่อตรวจสอบกระบวนการเปิดโต๊ะ รับออเดอร์ และยืนยันออเดอร์ ซึ่งเป็นฟังก์ชันหลักของร้านอาหาร |
| Payment |เพื่อตรวจสอบความถูกต้องในการคำนวณเงินทอนและการพิมพ์ใบเสร็จ เพื่อป้องกันความผิดพลาดในด้านการเงิน |
| Report |เพื่อตรวจสอบความถูกต้องของรายงานยอดขายรายวัน/รายเดือน และเมนูขายดีสำหรับการบริหารจัดการ |
| Security |เพื่อตรวจสอบความปลอดภัยของ JWT Authentication และป้องกันช่องโหว่พื้นฐานตามมาตรฐานระบบธุรกิจ |

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
|Hardware Compatibility |ไม่ครอบคลุมการทดสอบการเชื่อมต่อกับอุปกรณ์ฮาร์ดแวร์ภายนอก เช่น เครื่องลิ้นชักเก็บเงิน หรือเครื่องพิมพ์ความร้อนโดยตรง |
|Performance |เนื่องจากการทดสอบในครั้งนี้เน้นความถูกต้องของฟังก์ชันการทำงาน (Functional) และการติดตั้งระบบเบื้องต้น |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest |ทดสอบการทำงานระดับฟังก์ชันและ Business Logic ในส่วนของ Backend |
| API Testing (E2E) | Postman / Newman |ทดสอบกระบวนการทำงานของ API ตั้งแต่ต้นจนจบ (End-to-End) เช่น การ Login จนถึงการออกใบเสร็จ |
| Security Testing | npm audit |ตรวจสอบช่องโหว่ความปลอดภัยของ Dependencies ทั้งใน Backend และ Frontend |
| Smoke Testing | Manual |ทดสอบฟังก์ชันหลักบนสภาพแวดล้อมจริง (Production) เพื่อยืนยันว่าระบบพร้อมใช้งาน |
| Staging Test | Docker Compose |ทดสอบการทำงานร่วมกันของทุก Service ในรูปแบบ Multi-container ก่อนนำขึ้นระบบจริง |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS |Window 11 |
| Node.js |22.12.0 |
| npm |10.9.0 |
| Docker |N/A (Cloud Native) |
| PostgreSQL | 16 (Neon.tech) |
| Browser |Google Chrome |
| Newman |6.2.1 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
- ✅  Repository ถูก Clone และรัน Backend + Frontend ได้
- ✅  Database เชื่อมต่อ Neon.tech สำเร็จ
- ✅  `/api/health` ตอบกลับ `{"status":"ok"}`
- ✅ Postman Collection พร้อมสำหรับ Newman

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ _80__% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ | ≤ __0_ รายการ |
| Smoke Test บน Production ผ่าน | _4__ / 4 Feature |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 |Payment |หากคำนวณเงินทอนผิดพลาด ร้านค้าจะสูญเสียรายได้ หรือหากระบบชำระเงินล่มจะทำให้ปิดยอดขายไม่ได้ |critical |
| 2 |Order |หากระบบไม่บันทึกออเดอร์หรือข้อมูลตกหล่น จะทำให้การบริการล่าช้า ลูกค้าไม่ได้รับอาหาร และเสียโอกาสในการขาย |Critical |
| 3 |Auth & Security |หากระบบถูกเข้าถึงโดยผู้ไม่มีสิทธิ์ ข้อมูลยอดขายหรือราคาอาหารอาจถูกแก้ไข ซึ่งส่งผลต่อความน่าเชื่อถือของข้อมูลธุรกิจ |High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**✏️ กรอกข้อมูลทุกคอลัมน์ให้ครบ รวมถึง Actual Result และ Pass/Fail หลังทดสอบจริง**

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ด้วย credential ถูกต้อง | `{username: "admin", password: "Admin@123"}` | HTTP 200 + JWT Token |ได้รับ HTTP 200 และ JWT Token ถูกต้อง | pass |
| TC-002 | Negative | Auth | Login ด้วย password ผิด | `{username: "admin", password: "wrong"}` | HTTP 401 Unauthorized |ได้รับ HTTP 401 Unauthorized | pass |
| TC-003 | Security | Auth | เรียก API โดยไม่มี JWT Token | GET /api/orders (no Authorization header) | HTTP 401 Unauthorized |ได้รับ HTTP 401 และข้อความ Access token required | pass |
| TC-004 | Edge | Payment | ชำระเงินพอดียอด (change = 0) | `{orderId: 1, amount: exactTotal}` | HTTP 200 + change = 0 |ได้รับ HTTP 200 และ Change = 0 | pass |
| TC-005 | Positive |Menu |ดึงข้อมูลเมนูอาหารทั้งหมด |GET /api/menu |HTTP 200 + รายการเมนูครบถ้วน |ได้รับ HTTP 200 และรายการเมนูอาหาร | pass |
| TC-006 | Positive |Order |สร้างออเดอร์ใหม่สำเร็จ |{tableId: 5, items: [...]} |HTTP 201 Created |ได้รับ HTTP 201 Created และข้อมูลออเดอร์ใหม่ (id: 1) | pass |
| TC-007 | Negative |Menu |เพิ่มเมนูใหม่โดยไม่ใส่ชื่ออาหาร |{price: 100} (ขาด name) |HTTP 400 Bad Request |ได้รับ HTTP 401 และข้อความ Access token required | pass |
| TC-008 | Negative |Payment |ชำระเงินน้อยกว่ายอดรวมออเดอร์|{orderId: 1, amount: 10} (ยอดจริง 100) |HTTP 400 หรือ Error message |ได้รับ HTTP 400 Bad Request ถูกต้อง| pass |
| TC-009 | Security |Menu |userทั่วไปพยายามบเมนูอาหาร |DELETE /api/menu/1 (ด้วย token staff) |HTTP 403 Forbidden |HTTP 403 Forbidden หรือ 404 (ไม่มีสิทธิ์เข้าถึง) | pass |
| TC-010 | Security |Order |พยายามแก้ไขออเดอร์โต๊ะอื่น |PUT /api/orders/999 |HTTP 401 หรือ 404 |ได้รับ HTTP 404 ไม่สามารถแก้ไขข้อมูลของโต๊ะอื่นได้ตามที่คาดหวัง | pass |
| TC-011 | Edge |Order |สั่งอาหารจำนวนมากเกินไป |{items: [{id:1, quantity: 9999}]} |HTTP 400 หรือระบบรองรับได้ถูกต้อง |HTTP 400 Bad Request | pass |

**✏️ สรุปผล:** ผ่าน 11 / 11 กรณี (100%)

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `[68030298]` ด้วยรหัสจริง**

| รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-[68030298]-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-[68030298]-TestSuite.json` |
| ไฟล์ Environment | `tests/postman/env.json` |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**✏️ ค่าในคอลัมน์ "ค่าที่ตั้งจริง" ให้กรอกหลังจาก Login สำเร็จและได้ Token มาแล้ว**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|--------------|-----------|
| `{{base_url}}` |http://localhost:3001 | Base URL ของ Backend API |
| `{{token}}` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiBVc2VyIiwiaWF0IjoxNzc5OTYwNTk2LCJleHAiOjE3Nzk5ODkzOTZ9.Q2itCx1Vn_oTHLGqvxITbgqR_vVyF8Mg-ZhbCitYNG8 | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJBZG1pbiBVc2VyIiwiaWF0IjoxNzc5OTYwNTk2LCJleHAiOjE3Nzk5ODkzOTZ9.Q2itCx1Vn_oTHLGqvxITbgqR_vVyF8Mg-ZhbCitYNG8 | Request ที่ต้องการสิทธิ์ Admin |

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
|TC-001 Health Check |GET |/api/health |Status 200 OK และคืนค่า version | pass |
|TC-002 Login Admin |POST |/api/auth/login |Status 200 และได้รับ JWT Token | pass |
|TC-003 Login Cashier |POST |/api/auth/login |Status 200 OK เข้าสู่ระบบสำเร็จ | pass |

**✏️ สรุป:** ผ่าน ___ / ___ Request

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**

![alt text](p1.png)

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**
![alt text](p2.1.png) ![alt text](p2.2.png)

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

┌─────────────────────────┬──────────────────┬──────────────────┐
│                         │     executed     │      failed      │
├─────────────────────────┼──────────────────┼──────────────────┤
│              iterations │        1         │        0         │
├─────────────────────────┼──────────────────┼──────────────────┤
│                requests │       21         │        2         │
├─────────────────────────┼──────────────────┼──────────────────┤
│            test-scripts │       21         │        0         │
├─────────────────────────┼──────────────────┼──────────────────┤
│      prerequest-scripts │        0         │        0         │
├─────────────────────────┼──────────────────┼──────────────────┤
│              assertions │       26         │       15         │
├─────────────────────────┴──────────────────┴──────────────────┤
│ Total run duration: 9.6s                                      │
└───────────────────────────────────────────────────────────────┘            

**✏️ กรอกตัวเลขจริงจาก Newman output:**

| Metric | ค่าจริง |
|--------|--------|
| Total Requests |21 |
| Tests Passed |19 |
| Tests Failed |2 |
| Pass Rate | 90.47% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)
![alt text](<ืnewman cli.png>)

---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | pass |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | pass |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | pass |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | pass |

**✏️ Newman Pass Rate จาก CI/CD:** 19/21 (90.47%)

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

![newmanpass 1.png newmanpass2.png](<newmanpass 1.png>) ![newmanpass 1.png newmanpass2.png](newmanpass2.png)

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
| High |0 |
| Medium |3 |
| Low |0 |
| **รวม** |3 |

**✏️ กรอกรายละเอียด Dependency ที่มีช่องโหว่ระดับ High ขึ้นไป (ถ้าไม่มีให้ระบุ "ไม่พบช่องโหว่")**

| Package | CVE ID | Severity | เวอร์ชันที่มีปัญหา | เวอร์ชันที่ปลอดภัย | สถานะการแก้ไข |
|---------|--------|----------|--------------------|--------------------|--------------| 
| |ไม่พบช่องโหว่


**รูปที่ 5 — ผล npm audit Backend**
![alt text](<ผล npm audit Backend.png>)

---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

**✏️ กรอกจำนวนช่องโหว่จริงที่พบ**

| Severity | จำนวน |
|----------|-------|
| Critical |0 |
| High |1 |
| Medium |2 |
| Low |0 |
| **รวม** |3 |

**รูปที่ 6 — ผล npm audit Frontend**

![alt text](<ผล npm audit Frontend.png>)

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ✅ ใช่

**รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ**

![alt text](p7.png)

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: [✏️ ชื่อ Bug สั้น ๆ อธิบายปัญหา]

| รายการ | ค่า |
|--------|-----|
| **Severity** | Critical |
| **Priority** | P1 |
| **Feature** |Payment System |
| **Status** | Fixed |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. เลือกโต๊ะที่ต้องการเช็คบิล (เช่น มียอดรวม 500 บาท)
2. ใส่จำนวนเงินที่รับมาน้อยกว่ายอดรวม (เช่น ใส่ 400 บาท)
3. กดปุ่มบันทึกการชำระเงิน

#### Expected Result
> ✏️ ระบบต้องไม่อนุญาตให้บันทึกรายการ และแสดงข้อความแจ้งเตือนว่า "ยอดเงินไม่เพียงพอ" เพื่อป้องกันการขาดทุน

#### Actual Result
> ✏️ (ก่อนแก้ไข) ระบบบันทึกรายการสำเร็จ และคำนวณเงินทอนออกมาเป็นค่าติดลบในฐานข้อมูล

#### Evidence
บรรทัด15 
![alt text](bug-001.png)

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
ผลกระทบสูง: ข้อมูลความลับทางธุรกิจและยอดเงินหมุนเวียนของร้านรั่วไหลสู่บุคคลภายนอกหรือพนักงานที่ไม่มีส่วนเกี่ยวข้อง
---

### BUG-002: [✏️ ชื่อ Bug สั้น ๆ อธิบายปัญหา]

| รายการ | ค่า |
|--------|-----|
| **Severity** | High |
| **Priority** | P1 |
| **Feature** |Security / Admin Reports |
| **Status** | Fixed |

#### Steps to Reproduce
**✏️ ระบุขั้นตอนที่ทำให้เกิด Bug ซ้ำได้ชัดเจน**
1. พยายามเรียกใช้ API Endpoint ตรงไปที่ /api/reports/sales (เช่น ผ่าน Postman หรือ Browser)
2. โดยที่ผู้ใช้ ไม่ได้ทำการ Login หรือไม่มีการส่ง Authorization Header (Token) ไปด้วย

#### Expected Result
> ✏️ ระบบต้องปฏิเสธการเข้าถึงและตอบกลับด้วย HTTP Status 401 Unauthorized เพื่อป้องกันข้อมูลรั่วไหล

#### Actual Result
> ✏️ (ก่อนแก้ไข) ระบบอนุญาตให้ดึงข้อมูลยอดขายออกมาได้โดยไม่ต้องตรวจสอบสิทธิ์ ทำให้พนักงานทั่วไปหรือบุคคลภายนอกเข้าถึงข้อมูลความลับได้

#### Evidence
บรรทัด30
![alt text](bug-002.png)

#### Business Impact
> ✏️ ระบุผลกระทบต่อการดำเนินธุรกิจของร้านอาหาร
ข้อมูลสรุปยอดขาย กำไร และสถิติการสั่งซื้อถือเป็นความลับสูงสุดของร้านอาหาร หากรั่วไหลอาจส่งผลเสียต่อแผนธุรกิจ การถูกคู่แข่งนำข้อมูลไปใช้ หรือพนักงานนำข้อมูลไปเปิดเผยภายนอกได้
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
| Backend API |3000|http://localhost:5173| — |
| Frontend |5173 | — |http://localhost:3000 |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|-------|-----|-----------------|-------------|
| Backend Health Check | `http://localhost:[port]/api/health` | `{"status":"ok"}` | ✅  |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ✅  |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**

![alt text](p8.png)

**รูปที่ 9 — Frontend Login สำเร็จ**
![alt text](p9.png)

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- [ ✅] เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- [✅ ] กำหนด Port Mapping: backend → 3001, frontend → 80
- [ ✅] เพิ่ม Health Check สำหรับ backend service
- [✅ ] กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend |postgresql://neondb_owner:npg_bPSfOtJWzp58@ep-sparkling-star-ap9x2p7b.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend |http://localhost:5173 |
| `NODE_ENV` | backend |production |
| `VITE_API_URL` | frontend |http://localhost:3001 |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ✅ มี / ☐ ไม่มี |builder → runner |
| Frontend | ✅ มี / ☐ ไม่มี |build-stage → production-stage |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

![alt text](p10.png)

#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| ไม่มี Volume mapping| | | |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
|default |bridge |backend, frontend |

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

![alt text](p11.png)

---

### Neon.tech Database Setup
> ส่วนที่ 5.1

**ขั้นตอน:**
1. ไปที่ https://console.neon.tech → Create Project → PostgreSQL 16
2. คัดลอก Connection String รูปแบบ: `postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require`
3. นำไปใช้เป็นค่า `DATABASE_URL` ใน Backend

**✏️ Connection String ที่ใช้จริง (เบลอ password ก่อนบันทึก):**

postgresql://neondb_owner:*********@ep-super-silence-aoyslbat-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

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
| `DATABASE_URL` | Backend (Render) |postgresql://neondb_owner:npg_CzWtnMXo17vG@ep-super-silence-aoyslbat-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require |
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | https://restaurant-management-system-exam-2-sigma.vercel.app |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | https://restaurant-management-system-exam-2025-ka3q.onrender.com/api |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

**✏️ ทดสอบบน Production URL จริง แล้วกรอกผลและแนบภาพหลักฐาน**

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ✅ |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ✅ |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก |✅  |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ✅ |

**✏️ Production Smoke Test ผ่าน:** 4 / 4 รายการ

**รูปที่ 12 — Smoke Test Feature 1: Health Check**

![alt text](p12.png)

**รูปที่ 13 — Smoke Test Feature 2: Login**

![alt text](p13.png)

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

![alt text](p14.png)

**รูปที่ 15 — Smoke Test Feature 4: Payment**

![alt text](p15.png)
---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขและทดสอบ Pipeline สำเร็จแล้ว**

- ✅ เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- ✅ เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- ✅ เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- ✅ เพิ่ม step ติดตั้งและรัน Newman
- ✅ เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend

### Newman Pass Rate จาก CI/CD Pipeline

**✏️ กรอกตัวเลขจาก GitHub Actions log หลัง Pipeline รันสำเร็จ**

| Metric | ค่าจริง |
|--------|--------|
| Total Tests |20 |
| Tests Passed |20 |
| Tests Failed |0 |
| **Pass Rate** | **100%** |

**รูปที่ 16 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate ใน log)**

![alt text](p16.png)
---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
