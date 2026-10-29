# Restaurant Management System (RMS)

> **ข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ**  
> รายวิชา: การออกแบบและพัฒนาซอฟต์แวร์ 1  
> ชื่อ-นามสกุล: นายวัฒนพงศ์ พรหมภิราม 
> รหัสนักศึกษา: 68030265  
> วันที่สอบ: 08/05/2569

---

## Project Overview

> ระบบจัดการร้านอาหาร (Restaurant Management System: RMS) เป็นระบบสำหรับจัดการเมนู การรับออเดอร์ การชำระเงิน และรายงานยอดขาย

**Source Repository:** `https://github.com/surachai-p/Restaurant-Management-System-Exam-2025.git`  
**Student Fork / Repo:** https://github.com/68030265/Restaurant-Management-System-Exam-2025

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18 + Vite + TypeScript + Tailwind CSS     |
| Backend    | Node.js 22 LTS + Express + TypeScript           |
| Database   | PostgreSQL 16 (Neon.tech)                       |
| ORM        | Prisma                                          |
| Testing    | Vitest (Unit) + Newman (E2E)                    |
| Container  | Docker / Docker Compose                         |
| CI/CD      | GitHub Actions                                  |

---

## Production URLs

Production URLs are not configured in this workspace.

| Service | URL / status |
|---------|--------------|
| Frontend | Not configured |
| Backend | Not configured |
| Health check | Local only: http://localhost:3001/api/health returns 200 |
| Database | Local loopback; no verified Neon URL |

**Student repository:** https://github.com/68030265/Restaurant-Management-System-Exam-2025

---
## Test Plan

> **ส่วนที่ 1 — แผนการทดสอบ (4 คะแนน)**

### 1.1 ขอบเขตการทดสอบ (Test Scope)

#### In Scope
| Feature   | เหตุผลที่ทดสอบ |
|-----------|----------------|
| Auth      | ระบบ Login/Logout และ Role-based Access |
| Menu      | CRUD เมนูและการจัดการสต็อก |
| Order     | เปิดโต๊ะ รับออเดอร์ แก้ไข ยืนยัน |
| Payment   | ชำระเงิน คำนวณทอน พิมพ์ใบเสร็จ |
| Report    | ยอดขายรายวัน/รายเดือน เมนูขายดี |
| Security  | JWT, RBAC, SQL Injection, XSS |

#### Out of Scope
| Feature       | เหตุผลที่ไม่ทดสอบ |
|---------------|--------------------|
| Performance & Load Test (JMeter / k6) | ไม่อยู่ในขอบเขตของข้อสอบปฏิบัติรอบนี้ เน้น Functional, Security และ E2E |
| Payment Gateway Integration (Omise / Stripe Webhook) | ใช้ระบบจำลองการชำระเงินภายในระบบ (Cash, Card, QR) ไม่ต่อยอดไปยัง Gateway ภายนอก |
| Real hardware thermal POS receipt printer | ระบบทดสอบผ่านการคืนค่า JSON และแสดงผลบนหน้าเว็บแทนการสั่งพิมพ์ฮาร์ดแวร์จริง |

---

### 1.2 แนวทางการทดสอบ (Test Approach)

| ประเภทการทดสอบ           | เครื่องมือ       | รายละเอียด |
|--------------------------|-----------------|------------|
| Unit Testing             | Vitest          | ทดสอบฟังก์ชันตรรกะการคำนวณเงินและตรวจสอบความถูกต้องใน Backend |
| API Testing (E2E)        | Postman / Newman | ทดสอบ REST API endpoint ทั้งหมดตาม Test Suite |
| Security Testing         | npm audit, Manual | ตรวจสอบช่องโหว่ Dependency, SQL Injection และ Broken Access Control |
| Smoke Testing            | Manual / Newman | ทดสอบ Feature หลัก 4 รายการบน Production |
| Staging Deployment Test  | Docker Compose  | ทดสอบการทำงานของ Multi-container ก่อน Deploy บน Cloud |

---

### 1.3 Test Environment

| Item | Value |
|------|-------|
| OS | Windows 11 |
| Node.js | v24.22.0 |
| npm | 11.19.1 |
| Docker | Client 29.6.1; Engine API returned permission denied |
| PostgreSQL | Local loopback database; version not verified |
| Browser | Google Chrome; existing screenshots in repository |
| Newman | 6.2.3 |

---
### 1.4 Entry / Exit Criteria

#### Entry Criteria
- [x] Backend and frontend production builds pass.
- [x] Local test database is available and seeded.
- [x] GET /api/health returns HTTP 200 with status ok.
- [x] Postman collection runs successfully with Newman.

#### Exit Criteria
- [x] Newman local pass rate is 100% (26/26 assertions; threshold 80%).
- [x] No unresolved Critical bug or Critical dependency vulnerability was found.
- [ ] Production smoke test passes all 4 features; production URLs are not configured, so this remains unverified.

---
### 1.5 ความเสี่ยงเชิงธุรกิจ (Business Risk)

| # | Feature ที่มีความเสี่ยง | ผลกระทบหากเกิดความผิดพลาด | ระดับความเสี่ยง |
|---|------------------------|--------------------------|----------------|
| 1 | Payment (ชำระเงิน)      | ร้านไม่สามารถรับเงินได้ ลูกค้ารอนาน หรือเงินทอนติดลบทำให้ร้านเสียรายได้โดยตรง | Critical |
| 2 | Order (รับออเดอร์)      | ออเดอร์ไม่ถึงครัว เปิดโต๊ะซ้ำซ้อน อาหารไม่ถูกจัดเตรียม ลูกค้าไม่พอใจ | High |
| 3 | Menu Management        | ข้อมูลราคาผิดพลาดหรือสินค้าหมดแต่ยังสั่งได้ ทำให้ขาดทุนหรือบริการสะดุด | High |
| 4 | Sales Reports          | รายงานยอดขายไม่ตรงกับความเป็นจริง ส่งผลต่อการวางแผนสต็อกและบัญชีผิดพลาด | Medium |
---

## Test Cases & Results

> Newman was run against the local test database on 20 October 2026. The 21-request suite completed with 26/26 assertions passing.

| TC-ID | Type | Feature | Scenario | Input | Expected | Actual | Result |
|-------|------|---------|----------|-------|----------|--------|--------|
| TC-001 | Positive | Health | API health check | GET /api/health | 200, status ok | 200, status ok | Pass |
| TC-002 | Positive | Auth | Admin login | Admin credentials | 200 + JWT | 200 + JWT | Pass |
| TC-003 | Positive | Auth | Cashier login | Cashier credentials | 200 + JWT | 200 + JWT | Pass |
| TC-004 | Positive | Auth | Waiter login | Waiter credentials | 200 + JWT | 200 + JWT | Pass |
| TC-005 | Negative | Auth | Wrong password | Admin + invalid password | 401 | 401 | Pass |
| TC-006 | Edge | Auth | Missing credentials | Empty body | 400 | 400 | Pass |
| TC-007 | Security | Auth | Request without token | GET /api/menu | 401 | 401 | Pass |
| TC-008 | Positive | Menu | List menu | Admin token | 200 + array | 200 + array | Pass |
| TC-009 | Positive | Menu | Search menu | search=Pad Thai | 200 + results | 200 + results | Pass |
| TC-010 | Security | Menu | SQL injection search | search=' OR '1'='1 | No data leak | 200 + empty results | Pass |
| TC-011 | Security | Menu | Waiter changes price | PUT /api/menu/1 | 403 | 403 | Pass |
| TC-012 | Positive | Menu | Admin adds item | Test Dish, price 99 | 201 | 201 | Pass |
| TC-013 | Security | Menu | Waiter adds item | Waiter token | 403 | 403 | Pass |
| TC-014 | Positive | Order | Open order | tableId=2 | 201 | 201 | Pass |
| TC-015 | Negative | Order | Duplicate open order | tableId=2 again | 409 | 409 | Pass |
| TC-016 | Positive | Order | Add two menu items | menu item from TC-012, quantity=2 | 201 | 201 | Pass |
| TC-017 | Positive | Order | Confirm order | Order from TC-014 | 200 | 200 | Pass |
| TC-018 | Edge | Order | Missing table ID | Empty body | 400 | 400 | Pass |
| TC-020 | Negative | Payment | Underpayment | amountPaid=1, below total | 400, insufficient payment | 400, insufficient payment | Pass |
| TC-019 | Positive | Payment | Exact payment | amountPaid equals total | 201, change=0 | 201, change=0 | Pass |
| TC-021 | Security | Payment | Payment without token | No Authorization header | 401 | 401 | Pass |

**Summary:** 21/21 requests completed; 26/26 assertions passed; 0 failed; pass rate 100%.

---
## Test Reports

> Newman E2E run against the local test database

- Collection: RMS-68030265-TestSuite
- Run date: 20 October 2026 (Asia/Bangkok)
- Iterations: 1
- Requests: 21; failed: 0
- Test scripts: 21; failed: 0
- Assertions: 26 passed; 0 failed
- Total duration: 2.4 seconds
- Average response time: 32 ms
- Pass rate: 100%

![Newman local run summary](./tests/reports/newman-summary.png)

[Open detailed Newman HTML report](./tests/reports/newman-report.html)

The JSON summary excludes request bodies and authorization tokens: [newman-run.json](./tests/reports/newman-run.json)

---
## Security Scan Report

ตรวจ npm audit วันที่ 20 ตุลาคม 2569 หลังอัปเดต dependency ที่แก้ได้ภายใน major version

### Backend Security Scan

คำสั่ง: npm audit --audit-level=moderate

| Severity | จำนวน |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Moderate | 0 |
| Low | 0 |
| **รวม** | **0** |

อัปเดต Vitest และ @vitest/coverage-v8 เป็น 4.1.12 และใช้ qs 6.16.1 ผ่าน npm overrides เพื่อแก้รายการเดิม ผล audit ล่าสุดไม่พบช่องโหว่

### Frontend Security Scan

คำสั่ง: npm audit --audit-level=moderate

| Severity | จำนวน package records |
|----------|-----------------------|
| Critical | 0 |
| High | 5 |
| Moderate | 2 |
| Low | 0 |
| **รวม** | **7** |

รายการที่ยังเหลืออยู่ใน dependency tree ของ Tailwind CSS 3.4.19:

| Package / Advisory | Severity | ช่วงที่มีปัญหา | สถานะ |
|--------------------|----------|----------------|-------|
| braces — [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) | High | <= 3.0.3 | อยู่ใน Tailwind 3 dependency tree; npm ระบุทางแก้เป็น Tailwind CSS 4.3.3 ซึ่งเป็น major upgrade |
| chokidar, fast-glob, micromatch, tailwindcss | High | ตาม dependency tree ที่ audit รายงาน | รวมเป็น 5 high package records ใน Tailwind CSS 3.4.19 |
| postcss-selector-parser — [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) | Moderate | < 7.1.6 | อยู่ใน postcss-nested/Tailwind 3 dependency tree |
| postcss-nested | Moderate | ตาม dependency tree ที่ audit รายงาน | npm ต้องอัปเกรด Tailwind ข้าม major เพื่อแก้โดยอัตโนมัติ |

อัปเดต Vite เป็น 8.3.4, @vitejs/plugin-react เป็น 6.1.2 และ React Router เป็น 7.18.4 แล้ว โดย frontend build ผ่าน ยังไม่อัปเกรด Tailwind 4 เพราะเป็นการเปลี่ยน major ที่อาจกระทบ CSS และ configuration

![สรุปผล npm audit](./tests/reports/security-audit-summary.png)

---
## Bug Reports

### BUG-001: ระบบเคยยอมรับการชำระเงินต่ำกว่ายอดรวม

- **Severity:** High
- **Priority:** P1
- **Feature:** Payment
- **Status:** Fixed; verified with Newman TC-020 and Vitest

#### Steps to Reproduce
1. เปิดและยืนยันออเดอร์ที่มียอดมากกว่า 1
2. ส่ง POST /api/payments ด้วย amountPaid ที่ต่ำกว่ายอดรวม

#### Expected Result
ระบบปฏิเสธการชำระเงินและตอบ HTTP 400 พร้อมข้อความ Insufficient payment amount

#### Actual Result
ก่อนแก้ไข ระบบอาจคำนวณเงินทอนติดลบและบันทึกรายการชำระเงินได้

#### Fix and Evidence
ตรวจ amountPaid เทียบกับ totalAmount ก่อนสร้าง payment; Newman TC-020 ได้ HTTP 400 และข้อความตามคาด

![ผลทดสอบ BUG-001 จาก Newman](./tests/reports/bug-001-underpayment.png)

#### Business Impact
ร้านอาจรับเงินไม่ครบและยอดบัญชีคลาดเคลื่อน

---

### BUG-002: โต๊ะเดียวกันเปิดออเดอร์สถานะ open ซ้ำได้

- **Severity:** High
- **Priority:** P1
- **Feature:** Order
- **Status:** Fixed; verified with Newman TC-015

#### Steps to Reproduce
1. เปิดออเดอร์สถานะ open ให้โต๊ะหนึ่ง
2. ส่งคำขอเปิดออเดอร์ใหม่ด้วย tableId เดิม

#### Expected Result
ปฏิเสธคำขอซ้ำด้วย HTTP 409 และแจ้งว่าโต๊ะมีออเดอร์เปิดอยู่แล้ว

#### Actual Result
ก่อนแก้ไข ระบบไม่ได้ตรวจสอบ open order เดิมก่อนสร้างออเดอร์ใหม่

#### Fix and Evidence
เพิ่มการตรวจสอบ open order ของโต๊ะก่อนสร้างรายการ; Newman TC-015 ได้ HTTP 409 และข้อความ Table already has an open order

![ผลทดสอบ BUG-002 จาก Newman](./tests/reports/bug-002-double-booking.png)

#### Business Impact
ออเดอร์ซ้ำอาจทำให้อาหารถูกเตรียมซ้ำและยอดขายหรือสถานะโต๊ะไม่ตรงกัน

---
## Deployment Guide

> **ส่วนที่ 4 & 5 — คู่มือการติดตั้ง**

### Prerequisites

| รายการ       | เวอร์ชันที่ต้องการ | ลิงก์ดาวน์โหลด |
|--------------|-------------------|----------------|
| Node.js      | 22 LTS            | https://nodejs.org |
| Git          | ล่าสุด            | https://git-scm.com |
| Docker       | ล่าสุด            | https://docker.com |
| Docker Compose | v2+             | (รวมกับ Docker Desktop) |

---

### On-Premises Setup

> **ส่วนที่ 4.1 — การติดตั้งบนเครื่องตนเองในรูปแบบ On-Premises Server (8 คะแนน)**

#### Installation Steps

PowerShell commands for Windows:

    git clone https://github.com/68030265/Restaurant-Management-System-Exam-2025.git
    Set-Location Restaurant-Management-System-Exam-2025

    Copy-Item backend/.env.example backend/.env
    Copy-Item frontend/.env.example frontend/.env.local
    docker compose up -d db

    # Terminal 1: backend
    Set-Location backend
    npm ci
    npx prisma db push
    npx tsx prisma/seed.ts
    npm run dev

    # Terminal 2: frontend
    Set-Location frontend
    npm ci
    npm run dev
#### Results (On-Premises)

| Test | URL | Result | Status |
|------|-----|--------|--------|
| Backend Health | http://localhost:3001/api/health | HTTP 200, status ok (verified this run) | Pass |
| Frontend Login | http://localhost:5173 | Existing dashboard screenshot; current build passes, UI not reopened this run | Existing evidence |

![Backend health check](./image.png)

![Dashboard after login](./image-1.png)
### Staging Environment (Docker Compose)

The docker-compose.yml configuration was reviewed, but containers could not be started again because the Docker Engine API returned permission denied.

#### Configuration Review

- [x] Database, backend and frontend services are defined.
- [x] Required environment variables and port mappings are configured.
- [x] Backend health check is configured.
- [x] Frontend waits for the backend health check.

#### Staging Smoke Test

| Test | URL | Result | Status |
|------|-----|--------|--------|
| Backend Health | http://localhost:3001/api/health | Local API returned HTTP 200; this does not verify the container | API only |
| Frontend | http://localhost:80 | Not tested because Docker Engine was unavailable | Unverified |

![Staging Docker Compose status](./tests/reports/staging-status.png)

The existing image-2.png shows an API health response, not docker compose ps, so it is not evidence that containers were running.

---
### Neon.tech Database Setup

The following steps are deployment guidance for a future production database. This run verified only a local loopback database; no Neon connection or production database setup was confirmed.

#### Steps
1. Create a PostgreSQL project in Neon.
2. Set DATABASE_URL in the backend environment using the Neon connection string.
3. Verify connectivity and migrations before deployment.

**Current status:** Neon connection not verified. Connection strings and credentials are not included in this report.

---
### Render + Vercel Deployment Steps

> **ส่วนที่ 5.2 & 5.3**

#### Backend บน Render.com

```
Build Command:  npm install && npx prisma generate && npm run build
Start Command:  npx prisma db push && npx tsx prisma/seed.ts && npm start
```

#### Frontend บน Vercel

```
Root Directory: frontend
Framework:      Vite
Build Command:  npm run build
```

---

### Environment Variables Table

| Variable      | Service   | ค่าตัวอย่าง / คำอธิบาย                         |
|---------------|-----------|------------------------------------------------|
| `DATABASE_URL` | Backend  | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `JWT_SECRET`   | Backend  | random string ที่ปลอดภัย (≥ 32 ตัวอักษร)       |
| `CORS_ORIGIN`  | Backend  | URL ของ Frontend เช่น `https://rms-frontend.example` |
| `NODE_ENV`     | Backend  | `production`                                    |
| `VITE_API_URL` | Frontend | URL ของ Backend เช่น `https://rms-api.example/api` |

---

### Smoke Test Results

Production smoke tests were not run because no working Production URLs are configured in the report.

| # | Feature | Expected | Status |
|---|---------|----------|--------|
| 1 | Health Check | HTTP 200, status ok | Not tested on Production |
| 2 | Login | Admin login succeeds | Not tested on Production |
| 3 | Open Order & Add | Order is saved | Not tested on Production |
| 4 | Payment | Correct change is returned | Not tested on Production |

**Production smoke tests verified: 0 / 4. This means untested, not failed.**

![Production smoke test status](./tests/reports/production-smoke-status.png)

The local Newman run covering health, login, orders and payment is reported separately.

---
## CI/CD Pipeline + Newman Pass Rate

Workflow configuration is present in .github/workflows/ci.yml and .github/workflows/cicd.yml. No verified GitHub Actions run artifact was available during this review.

### Configuration Review

- [x] Push and pull request triggers for main/master are configured.
- [x] Node.js 22 setup is configured.
- [x] Backend unit tests and frontend/backend build steps are configured.
- [x] Newman install and run steps are configured.
- [x] npm audit step is configured.
- [ ] A successful GitHub Actions run and screenshot have not been verified.
- [ ] Frontend audit in ci.yml uses || true, so vulnerabilities do not fail the job.

### Newman Pass Rate (GitHub Actions)

| Metric | Value |
|--------|-------|
| Total Tests | N/A; no confirmed Actions run |
| Tests Passed | N/A |
| Tests Failed | N/A |
| **Pass Rate** | **N/A** |

![GitHub Actions evidence status](./tests/reports/ci-status.png)

Local Newman result is separate: 21 requests, 26/26 assertions, 100% pass rate.
---

*Template สร้างจากข้อสอบปฏิบัติการทดสอบและติดตั้งระบบซอฟต์แวร์เชิงธุรกิจ — PRIME-BSD Model*
