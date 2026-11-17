# Restaurant Management System (RMS) Evaluation Result

## ✏️ ข้อมูลผู้เข้าสอบ
| รายการ | ข้อมูล |
| ------ | ------ |
| **ชื่อ-นามสกุล** | นางสาวสุธาสินี มีอ้น |
| **รหัสนักศึกษา** | 68030434 |
| **วันที่สอบ** | 16-11-2569 |

---

## Project Overview
ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

## Tech Stack
- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS
- **Backend:** Node.js 22 LTS + Express + TypeScript
- **Database:** PostgreSQL 16 (Neon.tech)
- **ORM:** Prisma
- **Testing:** Vitest (Unit) + Postman & Newman (E2E API Test)
- **Deployment:** Docker / Docker Compose, Render, Vercel
- **CI/CD:** GitHub Actions

## Production URLs
- **GitHub Repository:** [suspicious link removed]
- **Production Frontend (Vercel):** [https://restaurant-management-system-exam-2-ruby.vercel.app]
- **Production Backend Health Check (Render):** [suspicious link removed]
## Environment Variables Table

| Component | Key | Value / Description |
| --------- | --- | ------------------- |
| **Backend (Render)** | `DATABASE_URL` | `postgresql://neondb_owner:npg_hvzdXR5DFKx7@ep-spring-firefly-bdbuq6wf-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| **Backend (Render)** | `JWT_SECRET` | `RMS_Super_Secret_Key_2025` |
| **Backend (Render)** | `CORS_ORIGIN` | `*` |
| **Backend (Render)** | `NODE_ENV` | `production` |
| **Frontend (Vercel)** | `VITE_API_URL` | https://restaurant-management-system-exam-2025-1-27ph.onrender.com |
---

## Test Plan

### 1. Scope of Testing
- **In Scope:** ระบบ Auth (JWT/RBAC), Menu Management, Order System, Payment & Change Calculation, Security Audit, Health Check
- **Out of Scope:** การเชื่อมต่อเครื่องรูดบัตรเครดิตจริง, ระบบสมาชิกสะสมแต้มขั้นสูง

### 2. Test Approach
- **Unit Testing:** Vitest สำหรับทดสอบฟังก์ชันคำนวณและ Business Logic
- **API Testing:** Postman & Newman สำหรับทดสอบ REST API แบบ E2E
- **Security Testing:** npm audit สแกนช่องโหว่ Dependencies
- **Smoke Testing:** ตรวจสอบบริการพื้นฐานหลัง Deployment

### 3. Test Environment
- **OS:** Windows 11 / Linux
- **Node.js Version:** 22 LTS
- **Frontend Framework:** React 18 / Vite
- **Database:** PostgreSQL 16 บน Neon.tech
- **Staging Environment:** Docker Compose (Multi-container)

### 4. Entry/Exit Criteria
- **Entry Criteria:** ซอร์สโค้ดผ่านการ Build และติดตั้ง Dependencies เรียบร้อย ระบบ DB เชื่อมต่อได้
- **Exit Criteria:** สคริปต์ Newman API Test ผ่านร้อยละ 95 ขึ้นไป และไม่มีช่องโหว่ Security ระดับ Critical/High

### 5. Business Risks
1. **การคำนวณเงินทอนผิดพลาด:** ส่งผลให้ร้านค้าสูญเสียรายได้หรือเกิดข้อพิพาทกับลูกค้า
2. **ระบบล่มขณะรับออเดอร์:** เกิด Downtime ในช่วงเวลาขายดี ทำให้ไม่สามารถบันทึกยอดขายได้

---

## Test Cases & Results

| TC-ID | Type | Feature | Scenario | Input | Expected Result | Actual Result | Pass/Fail |
|-------|------|---------|----------|-------|-----------------|---------------|-----------|
| TC-001 | Positive | Auth | Login ผู้บริหารถูกต้อง | {username: "admin", password: "Admin@123"} | HTTP 200 + JWT Token | HTTP 200 + Token | Pass |
| TC-002 | Positive | Menu | เพิ่มรายการอาหารใหม่ | {name: "ข้าวผัด", price: 60} | HTTP 201 Created | HTTP 201 Created | Pass |
| TC-003 | Positive | Order | เปิดโต๊ะและสั่งอาหาร | {tableNo: 1, items: [{id: 1, qty: 2}]} | HTTP 200 + Order Created | HTTP 200 | Pass |
| TC-004 | Negative | Auth | Login รหัสผ่านไม่ถูกต้อง | {username: "admin", password: "wrongpass"} | HTTP 401 Unauthorized | HTTP 401 | Pass |
| TC-005 | Negative | Menu | เพิ่มรายการอาหารราคาติดลบ | {name: "ต้มยำ", price: -50} | HTTP 400 Bad Request | HTTP 400 | Pass |
| TC-006 | Negative | Order | แก้ไขออเดอร์ที่ชำระเงินแล้ว | {orderId: 10, status: "CANCEL"} | HTTP 400 Conflict | HTTP 400 | Pass |
| TC-007 | Security | Security | เรียกดูข้อมูลโดยไม่มี JWT Token | Authorization Header: None | HTTP 401 Unauthorized | HTTP 401 | Pass |
| TC-008 | Security | Security | พนักงานทั่วไปเข้าถึงเมนูผู้ดูแลระบบ | Token: Waiter Role -> Access /api/admin | HTTP 403 Forbidden | HTTP 403 | Pass |
| TC-009 | Security | Security | ยิง SQL Injection ที่ช่อง Login | {username: "' OR '1'='1"} | HTTP 400 / 401 | HTTP 401 | Pass |
| TC-010 | Edge | Edge Case | สั่งซื้อสินค้าจำนวน 0 ชิ้น | {tableNo: 2, items: [{id: 1, qty: 0}]} | HTTP 400 Validation Error | HTTP 400 | Pass |
| TC-011 | Edge | Edge Case | ชำระเงินน้อยกว่ายอดรวมออเดอร์ | {orderTotal: 500, amountPaid: 300} | HTTP 400 Insufficient Amount | HTTP 400 | Pass |

---

## Test Reports

### Postman & Newman API Test Evidence
- **Collection Name:** RMS-68030434-TestSuite
- **Collection File:** `tests/postman/RMS-68030434-TestSuite.json`
- **Environment File:** `tests/postman/env.json`

![Postman Collection + Env Vars](./tests/reports/postman-collection-env.png)
*รูปที่ 1 — Postman Collection และ Environment Variables*

![Postman Run Result](./tests/reports/postman-run-result.png)
*รูปที่ 2 — ผล Postman Collection Run*

![Newman CLI Result](./tests/reports/newman-cli-result.png)
*รูปที่ 3 — ผลการรัน Newman CLI Summary*

![CI Pipeline Newman](./tests/reports/ci-pipeline-newman.png)
*รูปที่ 4 — GitHub Actions Pipeline รัน Newman สำเร็จ*

---

## Security Scan Report
- **Backend Vulnerabilities:** Critical: 0, High: 1 (CVE-2024-XXXXX in jsonwebtoken < 9.0.0), Medium: 2, Low: 3
- **Frontend Vulnerabilities:** Critical: 0, High: 0, Medium: 1, Low: 2
- **Action Taken:** ดำเนินการรัน `npm audit fix` เพื่ออัปเดตเวอร์ชันปลอดภัยเรียบร้อยแล้ว

![Backend npm audit](./tests/reports/npm-audit-backend.png)
*รูปที่ 5 — ผล npm audit Backend*

![Frontend npm audit](./tests/reports/npm-audit-frontend.png)
*รูปที่ 6 — ผล npm audit Frontend*

![CI Security Scan](./tests/reports/ci-security-scan.png)
*รูปที่ 7 — GitHub Actions แสดง npm audit step รันสำเร็จ*

---

## Bug Reports

### BUG-001: ระบบคำนวณเงินทอนผิดพลาดเมื่อรับเงินเกิน
- **Severity:** High
- **Priority:** P1
- **Feature:** Payment & Checkout
- **Steps to Reproduce:**
  1. เปิดโต๊ะ สั่งอาหารยอดรวม 250 บาท
  2. ไปที่หน้าชำระเงิน กรอกเงินที่รับมา 500 บาท
  3. กดปุ่มยืนยันชำระเงิน
- **Expected Result:** ระบบต้องแสดงเงินทอน 250 บาท
- **Actual Result:** ระบบบันทึกยอดเงินทอนเป็น 0 บาท
- **Evidence:**
![BUG-001](./tests/reports/bug-001.png)
- **Business Impact:** เกิดข้อพิพาทกับลูกค้า ร้านค้าเสียภาพลักษณ์และความน่าเชื่อถือ

### BUG-002: การเข้าถึง API เมนูอาหารได้โดยไม่ต้องผ่านการล็อกอิน
- **Severity:** High
- **Priority:** P2
- **Feature:** Auth & Security
- **Steps to Reproduce:**
  1. ใช้ Postman ยิง `POST /api/menu`
  2. ไม่ใส่ `Authorization: Bearer <token>` ใน Header
- **Expected Result:** ระบบปฏิเสธคำขอด้วย HTTP Status 401 Unauthorized
- **Actual Result:** ระบบอนุญาตให้สร้างเมนูสำเร็จ (HTTP 201)
- **Evidence:**
![BUG-002](./tests/reports/bug-002.png)
- **Business Impact:** บุคคลภายนอกสามารถเข้ามาแก้ไขราคาอาหารหรือลบเมนูของร้านได้

---

## Deployment Guide

### Local Setup (On-Premises)
1. โคลนรีโพสิทอรี่: `git clone [suspicious link removed]`
2. ตั้งค่าไฟล์ `backend/.env`
3. รัน Backend: `cd backend && npm install && npm run dev` (Port 3001)
4. รัน Frontend: `cd frontend && npm install && npm run dev` (Port 5173)

![On-Premises Backend Health](./tests/reports/onprem-backend-health.png)
*รูปที่ 8 — Backend Health Check (/api/health) ตอบ {"status":"ok"}*

![On-Premises Frontend Login](./tests/reports/onprem-frontend-login.png)
*รูปที่ 9 — Frontend Login สำเร็จ*

### Staging Setup (Docker Compose)
1. รันคำสั่ง: `docker compose up --build`
2. ตรวจสอบสถานะ: `docker compose ps`

![Docker Compose PS](./tests/reports/staging-docker-ps.png)
*รูปที่ 10 — docker compose ps แสดงคอนเทนเนอร์สถานะ running*

### Cloud Deployment (Render + Vercel + Neon.tech)
1. **Neon.tech:** PostgreSQL 16 Connection String
2. **Render:** Backend Deployment
3. **Vercel:** Frontend Deployment

#### Production Smoke Test Results
| # | Feature | Test | Result |
|---|---------|------|--------|
| 1 | Health Check | GET /api/health -> {"status":"ok"} | Pass |
| 2 | Login | Login ด้วย admin | Pass |
| 3 | Open Order & Add Item | เปิดโต๊ะ -> เพิ่มสินค้า | Pass |
| 4 | Payment | ชำระเงิน | Pass |

![Smoke Test Health](./tests/reports/smoke-1-health.png)
*รูปที่ 11 — Production Health Check*

![Smoke Test Login](./tests/reports/smoke-2-login.png)
*รูปที่ 12 — Production Login*

![Smoke Test Order](./tests/reports/smoke-3-order.png)
*รูปที่ 13 — Production Open Order*

![Smoke Test Payment](./tests/reports/smoke-4-payment.png)
*รูปที่ 14 — Production Payment*

---

## CI/CD Pipeline + Newman Pass Rate
- **CI/CD Configuration:** แก้ไข `.github/workflows/cicd.yml` ครบถ้วน
- **Newman Pass Rate:** 100% Passed

![CI/CD Pipeline Success](./tests/reports/cicd-pipeline-success.png)
*รูปที่ 15 — GitHub Actions Pipeline สำเร็จ (แสดง Newman Pass Rate)*
