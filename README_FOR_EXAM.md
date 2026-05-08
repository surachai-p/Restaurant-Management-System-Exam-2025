# ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ

## รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 — ระยะเวลา 4 ชั่วโมง

---

## ข้อกำหนดสำคัญ

1. ข้อสอบนี้เป็นการสอบรายบุคคล ห้ามแชร์รีโพสิทอรี่หรือยูอาร์แอลโปรดัคชันกับผู้อื่น
2. นักศึกษาต้องโคลนรีโพสิทอรี่ที่ผู้สอนกำหนดมา และติดตั้งบนแอคเคาต์ของตนเอง
3. ส่งงานยูอาร์แอลรีโพสิทอรี่และยูอาร์แอลโปรดัคชันในงานที่มอบหมายของไมโครซอฟต์ทีม
4. นักศึกษาสามารถอ่านเอกสารคู่มือ ค้นหาข้อมูลจากอินเทอร์เน็ต และใช้เอไอช่วยได้ แต่ห้ามคัดลอกรีโพสิทอรี่หรือโค้ดของผู้อื่นโดยตรง ผู้สอนจะตรวจสอบประวัติการคอมมิตและโค้ดที่เหมือนๆ กันทุกรีโพสิทอรี่
5. การพบว่ารีโพสิทอรี่มี Code เหมือนกันมากกว่าร้อยละ 80 โดยไม่มีหลักฐานการปรับแต่ง จะถือว่าทุจริต และได้คะแนน 0

---

## 1. บทนำและบริบทของระบบ

ระบบที่ใช้ในการสอบครั้งนี้คือ **"ระบบจัดการร้านอาหาร"** (Restaurant Management System: RMS) ซึ่งเป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย พัฒนาด้วย Node.js (Express) Backend, React Frontend และ PostgreSQL Database

ระบบนี้เป็นตัวอย่างของซอฟต์แวร์เชิงธุรกิจที่มีข้อกำหนดด้านความปลอดภัย (ข้อมูลการชำระเงิน), ความต่อเนื่อง (ไม่ควรล่มขณะที่ร้านเปิดบริการ) และประสิทธิภาพ (ต้องรับออเดอร์ได้พร้อมกันหลายโต๊ะ) ซึ่งเป็นบริบทเดียวกับที่เรียนในหน่วยการเรียนรู้นี้

### Repository ที่ผู้สอนกำหนด

**GitHub URL:** https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git

### Tech Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS
- **Backend:** Node.js 22 LTS + Express + TypeScript
- **Database:** PostgreSQL 16 ติดตั้งบน Neon.tech
- **ORM:** Prisma
- **Testing:** Vitest (Unit) + Newman (E2E)

### โครงสร้างไดเรคทอรี่

```
|---- backend/               (Express API + Prisma)
|---- frontend/              (React + TypeScript + Tailwind)
|---- tests/postman/         (Newman Collection 21 test cases)
|---- docker-compose.yml     (ไฟล์ไม่สมบูรณ์)
|---- .github/workflows/cicd.yml  (ไฟล์ไม่สมบูรณ์)
|---- README.md              (เทมเพลตเอกสาร ให้นักศึกษาเพิ่มเติมเนื้อหาตามที่กำหนด)
```

---

## 2. งานที่ต้องทำ (5 ส่วน รวม 64 คะแนน)

| ส่วน | หัวข้อ | คะแนน |
|------|--------|--------|
| ส่วนที่ 1 | แผนการทดสอบ (Test Plan) | 4 |
| ส่วนที่ 2 | กรณีทดสอบ (Test Case) จำนวนมากกว่า 10 กรณี | 8 |
| ส่วนที่ 3 | การทดสอบและรายงานข้อบกพร่อง (Bug Report) | 20 |
| ส่วนที่ 4 | การติดตั้งภายในองค์กรและสภาพแวดล้อมทดสอบ (On-Premises & Staging) | 16 |
| ส่วนที่ 5 | การติดตั้งบนคลาวด์และ CI/CD Pipeline | 16 |

---

## ส่วนที่ 1 — แผนการทดสอบ (Test Plan) (4 คะแนน)

จัดทำแผนการทดสอบใน `Exam-Result.md` ภายใต้หัวข้อ `## Test Plan` ให้ครอบคลุมรายละเอียดดังนี้

1. **ขอบเขตการทดสอบ (In Scope / Out of Scope)** พร้อมเหตุผล
2. **แนวทางการทดสอบ (Test Approach)** ระบุว่าจะใช้วิธีใดบ้าง เช่น การทดสอบแบบหน่วย ทดสอบ API ทดสอบความปลอดภัย
3. **สภาพแวดล้อมทดสอบ (Test Environment)** ระบุเวอร์ชั่นต่างๆ ของสภาพแวดล้อมการทดสอบให้ครบถ้วน
4. **เงื่อนไขการผ่านและไม่ผ่านการทดสอบ (Entry/Exit Criteria)** ระบุว่าต้องผ่านกี่ % ถึงจะถือว่าพร้อมติดตั้ง
5. **ความเสี่ยงเชิงธุรกิจ (Business Risk)** อย่างน้อย 2 รายการ (ฟีเจอร์ที่หากเกิดความผิดพลาดแล้วจะกระทบการดำเนินธุรกิจ)

### Feature หลักของระบบ RMS ที่ต้องพิจารณาในการทดสอบ

1. **Auth:** เข้าสู่ระบบด้วย username/password (Admin, Cashier, Waiter)
2. **Menu:** เพิ่ม/แก้ไข/ลบเมนู พร้อมราคาและสต็อกวัตถุดิบ
3. **Order:** เปิดโต๊ะ รับออเดอร์ แก้ไขออเดอร์ ยืนยันออเดอร์
4. **Payment:** ชำระเงิน คำนวณทอน พิมพ์ใบเสร็จ
5. **Report:** ยอดขายรายวัน/รายเดือน เมนูขายดี
6. **Security:** JWT Authentication, Role-based Access Control

---

## ส่วนที่ 2 — กรณีทดสอบ (Test Case) (8 คะแนน)

ออกแบบและดำเนินการทดสอบตามข้อกำหนดด้านล่าง แล้วบันทึกผลใน `Exam-Result.md` ภายใต้หัวข้อ `## Test Cases & Results`

### 2.1 ออกแบบกรณีทดสอบอย่างน้อย 10 กรณี

- **ด้านบวก (Positive)** 3 กรณี — ระบบทำงานถูกต้องตามที่คาดหวัง
- **ด้านลบ (Negative)** 3 กรณี — input ไม่ถูกต้อง หรือ Flow ผิดพลาด
- **ด้านความปลอดภัย (Security)** 3 กรณี — เช่น เข้าถึงโดยไม่มีโทเคน ใช้ Role ที่ไม่มีสิทธิ์ SQL Injection, XSS, การยืนยันตัวตน เป็นต้น
- **กรณีขอบ (Edge)** 2 กรณี — เช่น ออเดอร์ที่มีสินค้า 0 ชิ้น, ชำระเงินเกินยอด

### รูปแบบกรณีทดสอบ (Markdown Table)

| TC-ID | Feature | Scenario | Input | Expected | Actual | Pass/Fail |
|-------|---------|----------|-------|----------|--------|-----------|
| TC-001 | Auth | Login ถูกต้อง | `{username: admin, password: Admin@123}` | HTTP 200 + JWT Token | ... | ... |

---

## ส่วนที่ 3 — การทดสอบและรายงานข้อบกพร่อง (20 คะแนน)

### 2.2 ทดสอบด้วย Postman และ Export Collection

1. สร้าง Postman Collection ชื่อ `"RMS-[รหัสนักศึกษา]-TestSuite"` ครอบคลุมกรณีทดสอบทั้งหมด
2. ตั้งค่า Environment Variables: `{{base_url}}`, `{{token}}`, `{{admin_token}}`
3. ใส่ Test Scripts (`pm.test`) เพื่อตรวจสอบ Response อัตโนมัติ
4. Export Collection เป็นไฟล์ JSON และวางใน folder `/tests/postman/` ใน Repository

### 2.3 รัน Newman และบันทึกอัตราการผ่านการทดสอบ (Pass Rate)

บันทึกผลการสอบ (Pass Rate, จำนวน Test ที่ผ่าน/ไม่ผ่าน) ไว้ในไฟล์ `Exam-Result.md` ภายใต้ `## Test Reports`

```bash
# ติดตั้ง Newman
npm install -g newman newman-reporter-htmlextra

# รัน Collection
newman run tests/postman/RMS-[รหัส]-TestSuite.json \
  --environment tests/postman/env.json \
  --reporters cli,htmlextra
```

### 2.4 การสแกนความปลอดภัยของโค้ดและ Dependencies ด้วย npm audit

ให้นักศึกษาใช้เครื่องมือ `npm audit` ตรวจสอบช่องโหว่ด้านความปลอดภัยในระดับ Dependency ของโปรเจคทั้ง Backend และ Frontend และบันทึกผลในไฟล์ `Exam-Result.md` ภายใต้ `## Security Scan Report`

**ขั้นตอน:**

1. รัน `npm audit --audit-level=moderate` ใน `backend/` และ `frontend/`
2. บันทึกสรุปจำนวนช่องโหว่ (Critical / High / Medium / Low) ใน `Exam-Result.md`
3. ระบุ dependency ที่มีช่องโหว่ระดับ High ขึ้นไป พร้อม CVE ID และเวอร์ชันที่ปลอดภัย
4. แก้ไขช่องโหว่ด้วย `npm audit fix` และคอมมิตผลลัพธ์ในรีโพสิทอรี่
5. เพิ่ม step `npm audit --audit-level=high` ใน `.github/workflows/cicd.yml` ให้รันอัตโนมัติทุกครั้งที่มีการพุช

### รูปแบบ Bug Report

บันทึกข้อบกพร่อง (Bug) ที่พบไว้ในไฟล์ `Exam-Result.md` ภายใต้ `## Bug Reports` อย่างน้อย 2 รายการ รูปแบบดังตัวอย่าง:

```markdown
## BUG-001: [ชื่อ Bug สั้นๆ]

**Severity:** Critical / High / Medium / Low  
**Priority:** P1 / P2 / P3  
**Feature:** [Feature ที่มีปัญหา]

### Steps to Reproduce
1. ...
2. ...
3. ...

### Expected Result
[สิ่งที่ควรเกิดขึ้น]

### Actual Result
[สิ่งที่เกิดขึ้นจริง]

### Evidence
![Screenshot](./tests/reports/bug-001.png)

### Business Impact
[ผลกระทบต่อธุรกิจ — เช่น ลูกค้าชำระเงินไม่ได้ ทำให้ร้านเสียรายได้]
```

> **ข้อกำหนด:** ต้องพบและรายงานอย่างน้อย 2 Bug และต้องระบุ Business Impact ได้ชัดเจน

---

## ส่วนที่ 4 — การติดตั้งภายในองค์กรและสภาพแวดล้อมทดสอบ (On-Premises & Staging) (16 คะแนน)

### 4.1 การติดตั้งบนเครื่องตนเองในรูปแบบ Server ภายในองค์กร (On-Premises) (8 คะแนน)

ให้นักศึกษาติดตั้งและรันระบบ RMS บนเครื่องของตนเองในฐานะเครื่องเซอร์เวอร์ภายในองค์กร โดยใช้แนวทางเดียวกับ CI-CD-SelfHost-Runner-LabSheet (การติดตั้ง GitHub Actions Self-Hosted Runner ทำให้เครื่องนักศึกษาทำหน้าที่เป็น On-Premises Server)

**ขั้นตอน:**

1. ติดตั้ง Node.js 22 LTS และ Git บนเครื่องของตนเอง
2. โคลนรีโพสิทอรี่ `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`
3. ตั้งค่า `backend/.env`: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN=http://localhost:5173`, `NODE_ENV=development`
4. รัน Backend (Port 3001)
5. รัน Frontend (Port 5173)
6. ทดสอบควันไฟและบันทึกหน้าจอผลลัพธ์ใน `Exam-Result.md` ภายใต้ `### On-Premises Setup`

**หลักฐานที่ต้องส่ง (On-Premises):**

1. หน้าจอผลลัพธ์การรัน Backend ที่ URL `http://localhost:3000/api/health` และมี `{"status":"ok"}`
2. หน้าจอผลลัพธ์การรัน Frontend ที่ URL `http://localhost:5173` หน้าที่มีการ Login สำเร็จ

### 4.2 การติดตั้งบนสภาพแวดล้อมทดสอบด้วย Docker Compose (Staging Environment) (8 คะแนน)

ให้นักศึกษาแก้ไข `docker-compose.yml` ที่ไม่สมบูรณ์ให้รัน Multi-container ได้ครบถ้วน เพื่อจำลองสภาพแวดล้อมทดสอบ (Staging) ก่อนติดตั้งบนคลาวด์

**สิ่งที่ต้องแก้ไขใน `docker-compose.yml`:**

1. เพิ่ม Environment Variables ครบถ้วน (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`)
2. กำหนด Port Mapping: backend `3001`, frontend `80`
3. เพิ่ม Health Check สำหรับ backend service
4. กำหนด `depends_on` ให้ frontend รอ backend พร้อมก่อน

รัน Staging ด้วยคำสั่ง:

```bash
docker compose up --build
```

**หลักฐานที่ต้องส่ง (Staging):**

1. ไฟล์ `docker-compose.yml` ที่แก้ไขแล้วคอมมิตในรีโพสิทอรี่
2. ภาพหน้าจอ `docker compose ps` ทุกคอนเทนเนอร์ต้องมีสถานะ `running`
3. บันทึกผลทดสอบควันไฟ (Smoke Test) บน Staging ใน `Exam-Result.md` ภายใต้ `### Staging Environment`

---

## ส่วนที่ 5 — การติดตั้งบนคลาวด์และ CI/CD Pipeline (16 คะแนน)

### 5.1 ติดตั้งฐานข้อมูล PostgreSQL 16 บน Neon.tech

1. ไปที่ https://console.neon.tech → เลือก **Create Project** → เลือก **PostgreSQL 16**
2. คัดลอก Connection String (format: `postgresql://user:pass@epxxx.neon.tech/db?sslmode=require`)
3. ใช้เป็นค่า `DATABASE_URL` ใน Backend deployment

### 5.2 Backend ติดตั้งบน Render.com

```
Build Command:  npm install && npx prisma generate && npm run build
Start Command:  npx prisma db push && npx tsx prisma/seed.ts && npm start
```

**Environment Variables ที่ต้องตั้งค่า:**

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | (Connection String จาก Neon.tech) |
| `JWT_SECRET` | (ค่าที่กำหนด) |
| `CORS_ORIGIN` | (URL ของ Frontend บน Vercel) |
| `NODE_ENV` | `production` |

### 5.3 Frontend ติดตั้งบน Vercel

```
Root Directory:   frontend
Framework:        Vite
Build Command:    npm run build
```

**Environment Variable:**

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | (URL ของ Backend บน Render.com) |

### 5.4 Smoke Test 4 ฟีเจอร์หลักบน Production

| # | Feature | ทดสอบ | หลักฐาน |
|---|---------|--------|---------|
| 1 | Health Check | `GET /api/health` → `{"status":"ok"}` | Screenshot |
| 2 | Login | Login ด้วย admin บน Frontend URL | Screenshot |
| 3 | Open Order & Add Item | เปิดโต๊ะ → เพิ่มสินค้า → Confirm | Screenshot |
| 4 | Payment | ชำระเงิน → สังเกต change (ทดสอบ BUG!) | Screenshot |

### 5.5 CI/CD Pipeline

#### 5.5.1 แก้ไข `.github/workflows/cicd.yml` ให้ครบ 4 จุด

1. เพิ่มส่วนที่ทำให้ระบบทำงานอัตโนมัติเมื่อมีการพุชไปที่สาขาหลัก
2. เพิ่มการติดตั้งสำหรับ Node.js version 22
3. เพิ่มส่วนสำหรับทดสอบ unit test ของ backend
4. เพิ่มการติดตั้งและรัน Newman

#### 5.5.2 โครงสร้างของไฟล์ `Exam-Result.md`

```markdown
# Restaurant Management System

## Project Overview
## Tech Stack
## Production URLs
## Test Plan                    ← ส่วนที่ 1
## Test Cases & Results         ← ส่วนที่ 2
## Bug Reports                  ← ส่วนที่ 3
## Deployment Guide             ← ส่วนที่ 5
   ### Prerequisites (Node.js 22+, Docker)
   ### Local Setup (Docker Compose + Manual)
   ### Neon.tech Database Setup
   ### Render + Vercel Deployment Steps
   ### Environment Variables Table
   ### Smoke Test Results
## CI/CD Pipeline + Newman Pass Rate
```

---

## การส่งงาน

ส่งผ่าน MS Teams ก่อนหมดเวลา ระบุข้อมูล 3 รายการ ดังนี้

1. **GitHub Repository URL** (Public)
2. **Production Frontend URL** (`https://...vercel.app`)
3. **Production Backend URL** (`https://...onrender.com/api/health`)