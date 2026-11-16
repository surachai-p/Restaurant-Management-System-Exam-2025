# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1

**ข้อมูลนักศึกษา:**

| รายการ | ข้อมูล |
|--------|--------|
| ชื่อ-นามสกุล |สรวิชญ์ สมตน |
| รหัสนักศึกษา | 68030287 |
| วันที่สอบ |16 พ.ย 2569 |

---

## Project Overview

ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**✏️ Student Repository:** `https://github.com/SorrawichSomton/Restaurant-Management-System-Exam-2025.git`

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

**Production URLs ที่ Deploy สำเร็จ (ตรวจสอบ ณ 16 พฤศจิกายน 2569)**

| Service | URL (กรอก URL จริง) | สถานะ |
|---------|---------------------|-------|
| Frontend (Vercel) | https://restaurant-management-system-exam-2-mu.vercel.app | ✅ เปิดหน้า Login และ Dashboard ได้ |
| Backend (Render) | https://rms-backend-6yo1.onrender.com/api | ✅ Live |
| API Health Check (`/api/health`) | https://rms-backend-6yo1.onrender.com/api/health | ✅ `status: ok` |
| Database (Neon.tech connection string) | Neon: `rms-database` / `production` / `neondb` (PostgreSQL 16, Singapore; ไม่เปิดเผย Connection String) | ✅ เชื่อมต่อแล้ว |

> บัญชี Admin เข้าสู่ระบบบน Production และ Dashboard แสดงข้อมูลจาก Neon ได้แล้ว โดยมีข้อมูลเริ่มต้น 4 users, 10 menu items และ 10 tables

---

## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
**✏️ ระบุ Feature ที่จะทดสอบและเหตุผล (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น แก้ไข/เพิ่มเติมได้)**

| Feature | เหตุผลที่ทดสอบ |
|---------|----------------|
| Auth | เป็นฟีเจอร์หลักสำหรับเข้าสู่ระบบและกำหนดสิทธิ์ผู้ใช้งาน เช่น Admin, Cashier และ Waiter หากผิดพลาดอาจทำให้ผู้ไม่ได้รับอนุญาตเข้าถึงระบบได้ | 
| Menu | ใช้จัดการข้อมูลเมนู ราคา และสต็อกวัตถุดิบ ซึ่งมีผลต่อการขายและความถูกต้องของรายการอาหาร | 
| Order | เป็นกระบวนการหลักของร้านอาหาร ใช้สำหรับเปิดโต๊ะ รับออเดอร์ และยืนยันรายการอาหาร | 
| Payment | ใช้คำนวณยอดชำระ เงินทอน และบันทึกการชำระเงิน หากผิดพลาดจะกระทบรายได้ของร้าน | 
| Report | ใช้สรุปรายงานยอดขายและข้อมูลทางธุรกิจ เพื่อช่วยในการวิเคราะห์และบริหารร้านอาหาร |
| Security | ทดสอบ JWT Authentication และ Role-based Access Control เพื่อป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต | 

#### Out of Scope
**✏️ ระบุสิ่งที่ไม่ทดสอบและเหตุผล อย่างน้อย 1 รายการ**

| Feature / ขอบเขตที่ไม่ทดสอบ | เหตุผล |
|-----------------------------|--------|
| Performance Testing | ไม่ได้ทดสอบโหลดผู้ใช้งานจำนวนมาก เนื่องจากข้อสอบเน้น Functional Testing และ Deployment |
| Mobile Responsive Testing| ไม่ได้ทดสอบทุกขนาดหน้าจอ เพราะสภาพแวดล้อมที่ใช้สอบเป็น Desktop Browser |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

**✏️ ระบุประเภทการทดสอบ เครื่องมือ และรายละเอียดที่จะใช้จริง (ตารางด้านล่างเป็นตัวอย่างเริ่มต้น)**

| ประเภทการทดสอบ | เครื่องมือ | รายละเอียด |
|----------------|-----------|------------|
| Unit Testing | Vitest | ใช้ทดสอบฟังก์ชันและ Business Logic ของ Backend เพื่อให้มั่นใจว่าการทำงานของระบบถูก |
| API Testing (E2E) | Postman / Newman | ใช้ทดสอบ REST API เช่น Login, Menu, Order และ Payment พร้อมตรวจสอบ HTTP Status และ Response |
| Security Testing | npm audit | ใช้ตรวจสอบช่องโหว่ของ dependencies และ library ที่ใช้งานในระบบ |
| Smoke Testing | Manual | ใช้ตรวจสอบการทำงานพื้นฐานหลัง Deploy เช่น Login, Health Check และการเปิดหน้าเว็บ |
| Staging Test | Docker Compose | ใช้จำลองสภาพแวดล้อมจริงแบบ Multi-container ก่อน Deploy ขึ้น Cloud |

---

### 1.3 สภาพแวดล้อมทดสอบ (Test Environment)

**✏️ กรอกเวอร์ชันจริงของเครื่องที่ใช้สอบ (รันคำสั่ง `node -v`, `npm -v`, `docker -v`, `newman -v` เพื่อตรวจสอบ)**

| รายการ | เวอร์ชัน / ค่า |
|--------|---------------|
| OS | Windows 11 |
| Node.js | v22.17.1 |
| npm | 10.9.2 |
| Docker | 29.2.1 |
| PostgreSQL | 16 (Neon.tech) |
| Browser | Google Chrome |
| Newman | 6.2.2 |

---

### 1.4 เงื่อนไขการผ่าน/ไม่ผ่านการทดสอบ (Entry / Exit Criteria)

#### Entry Criteria — ✏️ ทำเครื่องหมาย ✅ เมื่อทำสำเร็จแล้ว
[✅] Repository ถูก Clone และรัน Backend + Frontend ได้
[✅] Database เชื่อมต่อ Neon.tech สำเร็จ
[✅] /api/health ตอบกลับ {"status":"ok"}
[✅] Postman Collection พร้อมสำหรับ Newman
<img width="1919" height="553" alt="image" src="https://github.com/user-attachments/assets/21af1856-e5d9-4d6a-80ca-ea483b6027e2" />

#### Exit Criteria (เงื่อนไขผ่านการทดสอบ)
**✏️ ระบุเงื่อนไขที่ถือว่าผ่านการทดสอบและพร้อม Deploy**

| เงื่อนไข | ค่าที่กำหนด |
|---------|------------|
| Newman Pass Rate ขั้นต่ำ | ≥ 80% |
| Bug ระดับ Critical ที่ยังเปิดอยู่ |≤ 0 รายการ |
| Smoke Test บน Production ผ่าน | ยืนยันแล้ว 2 / 4 Feature (Health Check และ Login); Order/Payment ยังไม่มีหลักฐาน Production ในข้อมูลที่ส่งมา |

---

### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

> **✏️ ระบุ Feature ของระบบ RMS ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ อย่างน้อย 2 รายการ**  
> ระดับความเสี่ยง: `Critical` / `High` / `Medium` / `Low`

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Authentication / Login | หากผู้ใช้เข้าสู่ระบบไม่ได้ พนักงานจะไม่สามารถใช้งานระบบรับออเดอร์และจัดการร้านอาหารได้ ส่งผลให้การให้บริการหยุดชะงัก | Critical |
| 2 | Payment | หากระบบคำนวณยอดเงินผิดหรือบันทึกการชำระเงินไม่ถูกต้อง อาจทำให้เกิดความเสียหายทางการเงินและข้อมูลรายรับคลาดเคลื่อน | Critical |
| 3 | Order Management | หากระบบบันทึกออเดอร์ผิดพลาด อาจทำให้อาหารตกหล่น ส่งผิดโต๊ะ หรือเกิดความล่าช้าในการให้บริการลูกค้า | High |

---

## Test Cases & Results

> **ส่วนที่ 2 — กรณีทดสอบ (8 คะแนน)**

### กรณีทดสอบทั้งหมด (≥ 10 กรณี — sub-category: Positive ≥ 3 | Negative ≥ 3 | Security ≥ 3 | Edge ≥ 2)

**ตารางปรับให้ตรงกับ TC-ID ของ Newman `RMS-TestSuite-final.json` ที่รันจริง** (21 Requests / 26 Assertions) โดยแสดงกรณีสำคัญ 21 รายการ และไม่ใส่ JWT หรือรหัสผ่านในรายงาน

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|----------------|---------------|-----------|
| TC-001 | Positive | Health | GET Health Check | `GET /api/health` | HTTP 200 | HTTP 200 | ✅ |
| TC-002 | Positive | Auth | Login Admin | Admin credentials ใน Collection | HTTP 200 + JWT | HTTP 200 + JWT | ✅ |
| TC-003 | Positive | Auth | Login Cashier | Cashier credentials | HTTP 200 | HTTP 200 | ✅ |
| TC-004 | Positive | Auth | Login Waiter | Waiter credentials | HTTP 200 | HTTP 200 | ✅ |
| TC-005 | Negative | Auth | Login ด้วยรหัสผ่านผิด | Invalid password | HTTP 401 | HTTP 401 | ✅ |
| TC-006 | Negative | Auth | Login ข้อมูลไม่ครบ | Missing credentials | HTTP 400 | HTTP 400 | ✅ |
| TC-007 | Security | Auth | เรียก Menu โดยไม่มี JWT | No token | HTTP 401 | HTTP 401 | ✅ |
| TC-008 | Positive | Menu | ดึงรายการอาหาร | `GET /api/menu` | HTTP 200 | HTTP 200 | ✅ |
| TC-009 | Positive | Menu | Search Menu | `search=Pad Thai` | HTTP 200 | HTTP 200 | ✅ |
| TC-010 | Security | Menu | SQL Injection Search | `' OR '1'='1` | ไม่คืนข้อมูลผิดเงื่อนไข | HTTP 200 และไม่คืนรายการทั้งหมด | ✅ |
| TC-011 | Security | Menu | Waiter พยายามแก้ราคา | `PUT /api/menu/:id` | HTTP 403 | HTTP 403 | ✅ |
| TC-012 | Positive | Menu | Admin เพิ่มรายการอาหาร | `POST /api/menu` | HTTP 201 | HTTP 201 | ✅ |
| TC-013 | Security | Menu | Waiter พยายามเพิ่มรายการอาหาร | `POST /api/menu` | HTTP 403 | HTTP 403 | ✅ |
| TC-014 | Positive | Order | สร้างออเดอร์ใหม่ | โต๊ะว่างในชุดทดสอบ | HTTP 201 | HTTP 201 | ✅ |
| TC-015 | Edge | Order | เปิดออเดอร์ซ้ำโต๊ะเดิม | Same table | HTTP 409 | HTTP 409 | ✅ |
| TC-016 | Positive | Order | เพิ่มสินค้าในออเดอร์ | Order + menu item | HTTP 201 | HTTP 201 | ✅ |
| TC-017 | Positive | Order | ยืนยันออเดอร์ | `PUT /orders/:id/confirm` | HTTP 200 | HTTP 200 | ✅ |
| TC-018 | Negative | Order | ไม่ระบุ Table ID | Missing `tableId` | HTTP 400 | HTTP 400 | ✅ |
| TC-020 | Edge | Payment | จ่ายเงินต่ำกว่ายอดจริง | Underpayment ก่อนจ่ายเต็ม | HTTP 400 | HTTP 400 | ✅ |
| TC-019 | Positive | Payment | ชำระยอดเต็ม | Exact amount หลัง TC-020 | HTTP 201 | HTTP 201 | ✅ |
| TC-021 | Security | Payment | ส่งชำระเงินโดยไม่มี JWT | No token | HTTP 401 | HTTP 401 | ✅ |

**สรุปผลล่าสุด:** Newman 21 / 21 Requests สำเร็จ, 26 / 26 Assertions ผ่าน (100%) ทั้ง Local และ CI Run #23

---

## Test Reports

> **ส่วนที่ 3 — การทดสอบและรายงานผล (20 คะแนน)**

### Postman Test Evidence
> Rubric 1.4: สร้าง Collection + ตั้งค่า Environment + รันครบ + บันทึกผล + แนบรูป

#### ชื่อ Collection และไฟล์ที่ Export

**✏️ แทนที่ `68030287` ด้วยรหัสจริง**

    | รายการ | ค่าจริง |
|--------|--------|
| Collection Name | `RMS-68030287-TestSuite` |
| ไฟล์ที่ Export ไปไว้ใน Repository | `tests/postman/RMS-68030287-TestSuite.json` (ชุดของนักศึกษา) และ `tests/postman/RMS-TestSuite-final.json` (ชุด E2E 21 Cases) |
| ไฟล์ Environment | `tests/postman/env-debug.json` (มีเฉพาะ `base_url` เพื่อไม่ทับ Token ที่ Collection เก็บระหว่างทดสอบ) |

> 📌 Repository มี Newman Collection 21 test cases ใน `tests/postman/` อยู่แล้ว  
> นักศึกษาต้องสร้าง Collection ของตนเองที่ครอบคลุมกรณีทดสอบในส่วนที่ 2

#### Environment Variables ที่ต้องตั้งค่าใน Postman

**Newman ใช้ `env-debug.json` สำหรับ Base URL และบันทึก Token ไว้ใน Collection Variables ระหว่างรัน ไม่ใส่ JWT จริงลงไฟล์**

| Variable | ค่าที่ตั้งจริง | ใช้สำหรับ |
|----------|----------------|------------|
| `{{base_url}}` | `http://localhost:3001/api` | Base URL ของ Backend API |
| `{{token}}` | รับจาก Login ระหว่างรัน (ไม่เปิดเผย JWT) | Request ที่ต้องใช้ Token |
| `{{admin_token}}` | รับจาก Login Admin ระหว่างรัน (ไม่เปิดเผย JWT) | Request ที่ต้องใช้สิทธิ์ Admin |

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
| Health Check | GET | /api/health | Status 200 OK และแสดงข้อความ API running | ☑️ Pass |
| Login Admin | POST | /api/auth/login | Login สำเร็จและได้รับ JWT Token | ☑️ Pass |
| Get Orders | GET | /api/orders | ดึงข้อมูล Orders สำเร็จ | ☑️ Pass |

**สรุป Postman Collection Runner รอบที่มีภาพประกอบ:** ผ่าน 3 / 3 Request (คนละชุดกับ Newman E2E 21 Cases)

#### หลักฐานภาพหน้าจอ Postman

**✏️ แทนที่ข้อความด้านล่างด้วยภาพจริง โดยใช้ syntax: `![คำอธิบาย](./tests/reports/ชื่อไฟล์.png)`**

**รูปที่ 1 — Postman Collection และ Environment Variables (แสดง `base_url`, `token`, `admin_token` ครบ)**
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/c16ed735-b3c3-456c-afdb-886cd05c8085" />

`![Postman Collection + Env Vars](./tests/reports/postman-collection-env.png)`

**รูปที่ 2 — ผล Postman Collection Run (แสดง Pass/Fail ทุก Request)**
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/d2cad768-81cd-4ce8-88b4-ae61e40b205f" />


**ผลการทดสอบ:** 21 Requests, 26 Assertions, Failed 0, Pass Rate 100%


`![Postman Run Result](./tests/reports/postman-run-result.png)`

---

### Newman E2E Test Summary

#### คำสั่งรัน Newman

```bash
# ติดตั้ง Newman (ถ้ายังไม่ได้ติดตั้ง)
npm install -g newman newman-reporter-htmlextra

# รันชุด E2E 21 Cases พร้อมเก็บรายงาน JSON และ HTML
newman run tests/postman/RMS-TestSuite-final.json -e tests/postman/env-debug.json --env-var "base_url=http://localhost:3001/api" --reporters cli,json,htmlextra --reporter-json-export tests/reports/newman-result.json --reporter-htmlextra-export tests/reports/newman-report.html
```

#### ผลการรัน Newman (Local)

**ผลการทดสอบจริง (16 พฤศจิกายน 2569):**

```text
RMS-TestSuite-v2 / RMS-TestSuite-final.json
Iterations: 1
Requests: 21 executed, 0 failed
Test scripts: 21 executed, 0 failed
Assertions: 26 executed, 0 failed
Pass Rate: 100%
```

**ผลบน GitHub Actions CI/CD Run #23:** 21 Requests, 26 / 26 Assertions ผ่าน, 0 Failed — Workflow Success

| Metric | ค่าจริง |
|--------|----------|
| Total Requests | 21 |
| Tests Passed (Assertions) | 26 |
| Tests Failed | 0 |
| Pass Rate | 100% |

**รูปที่ 3 — ผล Newman CLI (แสดง Pass/Fail summary)**

`![Newman Run Result](./tests/reports/newman-cli-result.png)`
<img width="1917" height="1077" alt="image" src="https://github.com/user-attachments/assets/17c0c0e1-c5fa-4285-b559-83268c3c689e" />


---

### Automated Testing via CI Pipeline
> Rubric 1.6: สคริปต์อัตโนมัติ + รันผ่าน CI ได้ + บันทึกผล

**✏️ ทำเครื่องหมาย ✅ เมื่อทำเสร็จแล้ว และแนบหลักฐานรูปภาพ**

| รายการ | สถานะ |
|--------|-------|
| Newman Collection JSON อยู่ที่ `tests/postman/` ใน Repository | ✅ |
| `.github/workflows/cicd.yml` มี step ติดตั้งและรัน Newman | ✅ |
| GitHub Actions Pipeline รันสำเร็จ (สีเขียว) | ✅ Run #23 |
| Newman Pass Rate บันทึกอยู่ใน Pipeline log | ✅ 26/26 = 100% |

ผลล่าสุด: หลังแก้ Workflow และข้อมูลทดสอบแล้ว GitHub Actions Run #23 สำเร็จ โดย Newman ผ่าน 26 / 26 Assertions (100%) และสร้างรายงานทดสอบใน Artifacts

**Newman Pass Rate จาก CI/CD:** 26 / 26 (100%) — [GitHub Actions Run #23](https://github.com/SorrawichSomton/Restaurant-Management-System-Exam-2025/actions/runs/43875874613)

**รูปที่ 4 — GitHub Actions Pipeline สำเร็จ (แสดง Newman step และ Pass Rate)**

<img width="1919" height="1078" alt="image" src="https://github.com/user-attachments/assets/05048b74-b7ac-4df3-babf-ddcf54b84033" />

---

## Security Scan Report

> ส่วนที่ 3.4 — Rubric 1.7: รันทั้ง Backend + Frontend + บันทึกผล + ระบุ CVE + เพิ่มใน CI

### Backend Security Scan

```bash
cd backend && npm audit --audit-level=moderate
# ตรวจเฉพาะ Production dependencies
npm audit --omit=dev
```

**ผลการตรวจล่าสุดที่บันทึกไว้ หลังปรับ Dependency (16 พ.ย. 2569):**

| Severity | จำนวน |
|----------|-------|
| Critical | 0 |
| High | 4 |
| Medium | 3 |
| Low | 0 |
| **รวม** | **7** |

ผล `npm audit --omit=dev`: **found 0 vulnerabilities** (สำหรับ Production Dependencies เท่านั้น) ส่วน Full Audit ยังพบ 7 รายการใน Development/Test Dependencies

| Package | CVE ID / Advisory | Severity | เวอร์ชันที่มีปัญหาจาก Audit | แนวทางแก้ไข | สถานะการแก้ไข |
|---------|-------------------|----------|------------------------------|--------------|---------------|
| `form-data` | GHSA-hmw2-7cc7-3qxx | High | 4.0.0–4.0.5 (ตาม Audit ก่อนหน้า) | อัปเดต dependency / lockfile | ยังต้องตรวจสอบใหม่ |
| `nanoid` | GHSA-28wg-ghj8-5hjv | High | ≤3.3.17 (ตาม Audit ก่อนหน้า) | อัปเดต dependency / lockfile | ยังต้องตรวจสอบใหม่ |
| `postcss` | GHSA-fxqj-rqcc-2cmp | High | ≤8.5.22 (ตาม Audit ก่อนหน้า) | อัปเดต dependency / lockfile | ยังต้องตรวจสอบใหม่ |
| `source-map-js` | GHSA-68fv-2mgg-jv7q | High | 1.0.0–1.2.1 (ตาม Audit ก่อนหน้า) | อัปเดต dependency / lockfile | ยังต้องตรวจสอบใหม่ |

> หมายเหตุ: ตัวระบุ GHSA เป็น GitHub Security Advisory ไม่ใช่ CVE ID โดยตรง; ข้อมูลเวอร์ชันเป็นผลจาก Audit ก่อนการแก้ไขชุดล่าสุดทั้งหมด ควรอ้างอิง `tests/reports/backend-audit.json` เพื่อยืนยันแพ็กเกจและเวอร์ชันก่อนส่ง

**รูปที่ 5 — ผล npm audit Backend**

<img width="1915" height="1079" alt="image" src="https://github.com/user-attachments/assets/5817f21e-1ae2-4a91-92df-fabda8ff3dad" />


---

### Frontend Security Scan

```bash
cd frontend && npm audit --audit-level=moderate
```

**ผลการตรวจสอบ:** พบ 7 vulnerabilities
- Critical: 0
- High: 4
- Moderate: 3
- Low: 0

**รูปที่ 6 — ผล npm audit Frontend**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/5c572fcc-9cf2-4bef-937b-56acae297925" />

**ผลการตรวจสอบ:** พบ 15 vulnerabilities
- Critical: 0
- High: 8
- Moderate: 6
- Low: 1

**สถานะ:** ยังพบช่องโหว่ใน Dependencies ต้องติดตามแก้ไข

### Security Scan ใน CI Pipeline (Rubric 1.7 ข้อ 4)

**✏️ ยืนยันว่าได้เพิ่ม `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` แล้ว:** ✅ ใช่

**รูปที่ 7 — GitHub Actions แสดงขั้นตอน npm audit (Security Findings ยังมีอยู่)**

<img width="1910" height="1064" alt="image" src="https://github.com/user-attachments/assets/4efa09a0-6b85-46a8-ae5b-e8b1c5353aa4" />

**ผล:** Backend Audit: Failure, Frontend Audit: Failure

**หมายเหตุ:** GitHub Actions Pipeline สำเร็จ แต่ Security Audit พบช่องโหว่ที่ต้องติดตามแก้ไข

---

## Bug Reports

> ส่วนที่ 3 — Rubric 1.5: รายงานข้อบกพร่อง อย่างน้อย 2 รายการ พร้อม Business Impact

---

### BUG-001: Underpayment Accepted — ระบบรับเงินไม่ครบยอด

| รายการ | ค่า |
|--------|-----|
| **Severity** | Critical |
| **Priority** | P1 |
| **Feature** | Payment (`POST /api/payments`) |
| **Status** | Fixed / Retested |

#### Steps to Reproduce

1. สร้างออเดอร์ เพิ่มรายการอาหาร และยืนยันออเดอร์ให้มีสถานะ `confirmed`
2. ส่ง `POST /api/payments` โดยระบุ `amountPaid` น้อยกว่า `totalAmount` (ทดสอบกับออเดอร์จริง)
3. ตรวจสอบ HTTP Status และการบันทึกรายการชำระเงิน

#### Expected Result

> ต้องตอบ HTTP 400 และไม่สร้าง Payment ของยอดชำระไม่ครบ

#### Actual Result

> ก่อนแก้ไข: ไม่มีเงื่อนไขปฏิเสธ Underpayment และอาจคำนวณเงินทอนติดลบ หลังแก้ไข: HTTP 400 ตามที่คาดหวัง; TC-020 ผ่านทั้ง Local และ CI

#### Evidence

![BUG-001](./tests/reports/bug-001.png)

> หลักฐานเพิ่มเติม: `tests/postman/BUG-001-verify.json` และผล Newman 26/26; ตรวจสอบว่ารูป `bug-001.png` เป็นภาพของ Bug นี้จริงก่อนส่ง

#### Business Impact

> อาจทำให้ร้านค้ารับชำระเงินต่ำกว่ายอดจริง สูญเสียรายได้และเกิดความคลาดเคลื่อนในบัญชี

---

### BUG-002: Double Booking — เปิดออเดอร์ซ้ำโต๊ะเดียวกัน

| รายการ | ค่า |
|--------|-----|
| **Severity** | High |
| **Priority** | P1 |
| **Feature** | Order (`POST /api/orders`) |
| **Status** | Fixed / Retested |

#### Steps to Reproduce

1. เปิดออเดอร์ในโต๊ะที่ว่าง
2. ส่ง `POST /api/orders` โดยใช้ `tableId` เดิมซ้ำก่อนออเดอร์แรกเสร็จสิ้น
3. ตรวจสอบว่า Request ซ้ำถูกปฏิเสธหรือไม่

#### Expected Result

> ต้องตอบ HTTP 409 Conflict เมื่อโต๊ะมี Active Order

#### Actual Result

> ก่อนแก้ไข: เปิดออเดอร์ซ้ำบนโต๊ะเดียวกันได้ หลังแก้ไข: ตอบ HTTP 409; TC-015 ผ่านทั้ง Local และ CI

#### Evidence

![BUG-002](./tests/reports/bug-002.png)

> หลักฐานเพิ่มเติม: `tests/postman/BUG-002-verify.json`; ตรวจสอบว่ารูป `bug-002.png` เป็นภาพของ Bug นี้จริงก่อนส่ง

#### Business Impact

> เสี่ยงเกิดอาหารซ้ำ สับสนรายการโต๊ะ และคิดเงินซ้ำหรือผิดโต๊ะ

---

### BUG-003: SQL Injection ในการค้นหาเมนู

| รายการ | ค่า |
|--------|-----|
| **Severity** | Critical |
| **Priority** | P1 |
| **Feature** | Menu Search (`GET /api/menu?search=...`) |
| **Status** | Fixed / Retested |

#### Steps to Reproduce

1. Login และรับ JWT Token
2. ค้นหาเมนูด้วยข้อความลักษณะ `' OR '1'='1`
3. ตรวจสอบ Response ว่าไม่มีการคืนข้อมูลผิดเงื่อนไข

#### Expected Result

> ไม่ควรให้ Input เปลี่ยนโครงสร้าง SQL Query หรือคืนข้อมูลทั้งหมดโดยไม่ตั้งใจ

#### Actual Result

> ก่อนแก้ไข: ใช้ `$queryRawUnsafe` ร่วมกับการแทรกข้อความ Search ลง SQL โดยตรง หลังแก้ไข: TC-010 ผ่าน ไม่คืนรายการทั้งหมดผิดเงื่อนไข

#### Evidence

> `tests/postman/BUG-003-004-verify.json` และผล Newman E2E (ควรแนบรูป Screenshot เพิ่ม)

#### Business Impact

> เสี่ยงต่อการดึงข้อมูลเกินสิทธิ์และการโจมตีฐานข้อมูลจาก Input ผู้ใช้

---

### BUG-004: Waiter แก้ไขราคาเมนูได้โดยไม่ได้รับอนุญาต

| รายการ | ค่า |
|--------|-----|
| **Severity** | High |
| **Priority** | P1 |
| **Feature** | Menu Permission (`PUT /api/menu/:id`) |
| **Status** | Fixed / Retested |

#### Steps to Reproduce

1. Login ด้วย Role `waiter`
2. ส่ง `PUT /api/menu/:id` เพื่อแก้ราคาสินค้า
3. ตรวจสอบ Status Code ของ Response

#### Expected Result

> ต้องปฏิเสธด้วย HTTP 403 Forbidden

#### Actual Result

> ก่อนแก้ไข: ผู้ใช้ที่ Login แล้วสามารถแก้ไขราคาได้ หลังแก้ไข: เพิ่ม Role Check แล้ว TC-011 ได้ HTTP 403 ตามที่คาดหวัง

#### Evidence

> `tests/postman/BUG-003-004-verify.json` และผล Newman E2E (ควรแนบรูป Screenshot เพิ่ม)

#### Business Impact

> อาจถูกปรับราคาสินค้าโดยไม่มีสิทธิ์ ทำให้ร้านสูญเสียรายได้และความน่าเชื่อถือ

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
git clone https://github.com/SorrawichSomton/Restaurant-Management-System-Exam-2025.git
cd Restaurant-Management-System-Exam-2025

# 2. ตั้งค่า Environment Variables (Backend)
cp backend/.env.example backend/.env
# เปิดไฟล์ backend/.env แล้วกรอกค่า:
#   DATABASE_URL=postgresql://...
#   JWT_SECRET=...
#   CORS_ORIGIN=http://localhost:5173
#   NODE_ENV=development

# 3. รัน Backend (Port 3001)
cd backend && npm ci && npx prisma generate && npx prisma db push && npm run dev

# 4. รัน Frontend (Port 5173) — เปิด terminal ใหม่
cd frontend && npm ci && npm run dev
```

> ⚠️ **หมายเหตุเรื่อง Port**:
> - **Local / On-Premises**: ขั้นตอนกำหนด Port 3001 แต่ URL หลักฐานในข้อสอบระบุ `localhost:3000/api/health` ให้ตรวจสอบค่า `PORT` ใน `backend/.env.example` ของ Repository จริง แล้วใช้ port ที่ระบบรันจริง
> - **Render.com**: Backend รันบน **Port 10000** เสมอ (กำหนดใน `render.yaml` และ Render Dashboard) — `VITE_API_URL` ใช้ `https://[api].onrender.com` โดยไม่ต้องระบุ port

#### การตั้งค่า Service / Port จริงที่ใช้ (Rubric 2.1 ข้อ 2)

**✏️ กรอกค่าจริงที่ตั้งบนเครื่องของตนเอง**

| Service | Port ที่รันจริง | ค่า CORS_ORIGIN ที่ตั้ง | ค่า VITE_API_URL ที่ตั้ง |
|---------|---------------|------------------------|------------------------|
| Backend API | 3001 | `http://localhost:5173` (Manual Local) | — |
| Frontend | 80 (Docker), 5173 (Vite dev) | — | `/api` (Docker) |

#### ผล Smoke Test — On-Premises

**✏️ ทดสอบหลังรัน Backend + Frontend สำเร็จ แล้วทำเครื่องหมายผล**

| ทดสอบ | URL | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|--------|-----|------------------|-------------|
| Backend Health Check | `http://localhost:3001/api/health` | `{ "status": "ok" }` | ☑ |
| Frontend Login | `http://localhost:5173` | หน้า Login แสดงผลสำเร็จ | ☑ |

#### หลักฐาน On-Premises

**รูปที่ 8 — Backend Health Check (`/api/health` ตอบ `{"status":"ok"}`)**
<img width="1916" height="1073" alt="image" src="https://github.com/user-attachments/assets/36bcae4c-cbb2-464c-959f-17148a6de6aa" />

**ผลการทดสอบ:** ผ่าน — Backend ตอบ `{"status":"ok"}` ที่ `localhost:3001/api/health`

`![On-Premises Backend Health](./tests/reports/onprem-backend-health.png)`

**รูปที่ 9 — Frontend Login สำเร็จ**
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/abe2ce51-edd7-4ffc-90a0-10c37596ec00" />


`![On-Premises Frontend Login](./tests/reports/onprem-frontend-login.png)`

---

#### Staging Environment (Docker Compose)
> **ส่วนที่ 4.2 — ติดตั้งด้วย Docker Compose (8 คะแนน)**

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขเสร็จแล้ว**

- ✅ เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
- ✅ กำหนด Port Mapping: backend → 3001, frontend → 80
- ✅ เพิ่ม Health Check สำหรับ backend service
- ✅ กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

#### Environment Variables ที่ตั้งค่าจริงใน `docker-compose.yml` (Rubric 2.2 ข้อ 2)

**✏️ กรอกค่าจริงที่ใส่ใน docker-compose.yml (JWT_SECRET ไม่ต้องระบุค่าจริง)**

| Variable | Service | ค่าที่ตั้งจริง |
|----------|---------|--------------|
| `DATABASE_URL` | backend | `postgresql://postgres:postgres@db:5432/booking_app` |
| `JWT_SECRET` | backend | (ตั้งค่าแล้ว — ไม่ระบุค่าจริงเพื่อความปลอดภัย) |
| `CORS_ORIGIN` | backend | Local/Docker configuration; แยกจาก Production ที่ใช้ Vercel URL |
| `NODE_ENV` | backend | `production` |
| `VITE_API_URL` | frontend | `/api` |

#### Multi-stage Build (Rubric 2.5 ข้อ 2)

**✏️ ตรวจสอบ Dockerfile ของแต่ละ service แล้วระบุผล**

| Service | มี Multi-stage Build | Stage ที่ใช้ (เช่น builder → runner) |
|---------|--------------------|------------------------------------|
| Backend | ✅ มี | builder → runner |
| Frontend | ✅ มี | builder → nginx |

**รูปที่ 10 — Dockerfile แสดง Multi-stage build**

Backend:

<img width="1914" height="1079" alt="image" src="https://github.com/user-attachments/assets/eb3d33bc-2096-436d-8baf-b353fc81be7b" />

Frontend:

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/17fbbec9-a0f8-4128-8904-6bf56e3e7ae7" />


#### Volume Mapping (Rubric 2.5 ข้อ 4)

**✏️ ระบุ Volume ที่กำหนดใน docker-compose.yml (ถ้าไม่มีให้ระบุ "ไม่มี Volume mapping")**

| Volume Name / Path | Host Path | Container Path | วัตถุประสงค์ |
|-------------------|-----------|----------------|-------------|
| postgres_data | Docker Volume | /var/lib/postgresql/data | เก็บข้อมูล Database |

#### Network Configuration (Rubric 2.5 ข้อ 5)

**✏️ ระบุ Network ที่กำหนดใน docker-compose.yml**

| Network Name | Driver | Services ที่อยู่ใน Network นี้ |
|-------------|--------|-------------------------------|
| Docker Compose network | bridge | backend, frontend, db (ตรวจชื่อ Network ใน `docker-compose.yml` ก่อนส่ง) |

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

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/94d9c846-5039-4d65-99f6-fd838cee7e1f" />

**ผลการทดสอบ:** ผ่าน — Backend, PostgreSQL และ Frontend ทำงานครบทั้ง 3 Containers โดย Backend และ Database มีสถานะ healthy
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

> Deploy จริงใช้ **Render Web Service (Docker)** ตั้งค่าผ่าน Dashboard แยกจากฐานข้อมูล Neon; หากใช้ Blueprint ให้ตรวจชื่อไฟล์และค่าใน Repository ให้ตรงก่อน

```
Build Command:  Docker build โดย Render
Dockerfile:     backend/Dockerfile
Docker Context: backend
PORT:           10000  (ค่าที่ตั้งจริงบน RMS Render Web Service)
```

> **RMS บน Render ใช้ `PORT=10000` ตามค่าที่ตั้งจริง** (ไม่ใช่ข้อบังคับว่าทุก Render Service ต้องใช้ 10000)

#### Frontend บน Vercel

```
Root Directory: frontend
Framework:      Vite
Build Command:  npm run build
```

---

### Environment Variables Table

**URL และ Environment Variables ที่ใช้จริงบน Cloud (ไม่เปิดเผย Secret)**

| Variable | Service | ค่าที่ตั้งจริงบน Cloud |
|----------|---------|----------------------|
| `PORT` | Backend (Render) | `10000` |
| `DATABASE_URL` | Backend (Render) | Neon `rms-database` / `production` / `neondb` — ตั้งค่าแล้ว ไม่เปิดเผย Connection String |
| `JWT_SECRET` | Backend (Render) | (ตั้งค่าแล้ว — ไม่ระบุ) |
| `CORS_ORIGIN` | Backend (Render) | `https://restaurant-management-system-exam-2-mu.vercel.app` |
| `NODE_ENV` | Backend (Render) | `production` |
| `VITE_API_URL` | Frontend (Vercel) | `https://rms-backend-6yo1.onrender.com/api` (ค่าที่ต้องตรวจให้ตรงกับ Build ของ Vercel) |

---

### Smoke Test Results
> ส่วนที่ 5.4 — ทดสอบ 4 Feature หลักบน Production

**✏️ ทดสอบบน Production URL จริง แล้วกรอกผลและแนบภาพหลักฐาน**

| # | Feature | ขั้นตอนทดสอบ | ผลลัพธ์ที่คาดหวัง | ผ่าน/ไม่ผ่าน |
|---|---------|------------|-----------------|-------------|
| 1 | Health Check | GET `/api/health` | `{"status":"ok"}` | ✅ ผ่านบน Production |
| 2 | Login | Login ด้วย admin บน Frontend URL | เข้าระบบสำเร็จ | ✅ ผ่านบน Production (Dashboard แสดง 10 โต๊ะ) |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | ออเดอร์ถูกบันทึก | ⏳ ยังไม่มีหลักฐานยืนยันจาก Production |
| 4 | Payment | ชำระเงิน → ตรวจสอบ change | คำนวณเงินทอนถูกต้อง | ⏳ ยังไม่มีหลักฐานยืนยันจาก Production |

**Production Smoke Test ยืนยันแล้ว:** 2 / 4 รายการ (Health Check + Login) — ส่วน Order และ Payment ผ่าน Local/CI แต่ยังต้องเก็บหลักฐานบน Production

**รูปที่ 12 — Smoke Test Feature 1: Health Check**
<img width="1917" height="1077" alt="image" src="https://github.com/user-attachments/assets/6747fc5b-8b33-4c78-a98a-53521dd12593" />

**ผลการทดสอบ:** PASS — Render Backend ตอบ `status: ok` และ `version: 2.0.0`

> ยืนยันผ่าน Production แล้ว; ให้ใช้ภาพจาก `https://rms-backend-6yo1.onrender.com/api/health`

`![Smoke Test Health](./tests/reports/smoke-1-health.png)`

**รูปที่ 13 — Smoke Test Feature 2: Login**
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/29f3c6b1-377d-4ae3-a005-ef3b171a5ffe" />


**ผลการทดสอบ:** PASS — Admin Login สำเร็จบน Vercel และแสดง Dashboard ได้

> ยืนยัน Login และ Dashboard บน Vercel แล้ว; ให้ใช้ภาพ Production แทนภาพ Local

`![Smoke Test Login](./tests/reports/smoke-2-login.png)`

**รูปที่ 14 — Smoke Test Feature 3: Open Order**

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/0729818e-b7bd-4ec0-a0b2-fbc45a391224" />

**ผลการทดสอบ:** PASS — เปิดออเดอร์โต๊ะ 1 เพิ่ม Fried Rice จำนวน 1 รายการ และยืนยันออเดอร์สำเร็จ รวม 75 บาท


`![Smoke Test Order](./tests/reports/smoke-3-order.png)`

**รูปที่ 15 — Smoke Test Feature 4: Payment**

<img width="1912" height="1079" alt="image" src="https://github.com/user-attachments/assets/672bb505-d880-47c3-8f00-1fcb7f266de3" />

**ผลการทดสอบ:** PASS — ชำระเงินออเดอร์ยอด 75 บาท ด้วยเงินสด 100 บาท ระบบคำนวณเงินทอนถูกต้อง 25 บาท

`![Smoke Test Payment](./tests/reports/smoke-4-payment.png)`

---

## CI/CD Pipeline + Newman Pass Rate

> ส่วนที่ 5.5

### สิ่งที่แก้ไขใน `.github/workflows/cicd.yml`

**✏️ ทำเครื่องหมาย ✅ เมื่อแก้ไขและทดสอบ Pipeline สำเร็จแล้ว**

- [x] เพิ่ม trigger เมื่อมีการ push ไปที่สาขาหลัก (`main` / `master`)
- [x] เพิ่ม `actions/setup-node` สำหรับ Node.js version 22
- [x] เพิ่ม step รัน Unit Test ของ Backend (`npm test`)
- [x] เพิ่ม step ติดตั้งและรัน Newman
- [x] เพิ่ม step `npm audit --audit-level=high` ทั้ง backend และ frontend (มี Security Findings; Pipeline ยังทำงานต่อได้)

### Newman Pass Rate จาก CI/CD Pipeline

**✏️ กรอกตัวเลขจาก GitHub Actions log หลัง Pipeline รันสำเร็จ**

| Metric | ค่าจริง |
|--------|--------|
| Total Tests (Assertions) | 26 |
| Tests Passed | 26 |
| Tests Failed | 0 |
| **Pass Rate** | **100%** |

**รูปที่ 16 — GitHub Actions CI/CD Pipeline**

✅ GitHub Actions Run #23 สำเร็จ

- Backend Unit Tests: 20/20 Passed
- Newman Requests: 21/21 Passed
- Newman Assertions: 26/26 Passed
- Failed Assertions: 0
- Newman Pass Rate: 100%

**หลักฐาน:** [เปิดดู GitHub Actions](https://github.com/SorrawichSomton/Restaurant-Management-System-Exam-2025/actions)

**ผลการทดสอบ:** GitHub Actions Run #23 สำเร็จ, Newman 21/21 Requests, 26/26 Assertions, Failed 0, Pass Rate 100%

> **หมายเหตุสำคัญ:** CI/CD Success ไม่ได้หมายความว่า Security Audit ผ่าน Backend/Frontend Full Audit ยังพบช่องโหว่ และ Audit step ถูกกำหนด `continue-on-error: true`

---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
