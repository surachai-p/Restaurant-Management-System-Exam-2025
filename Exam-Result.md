# รายงานผลการทดสอบระบบ Restaurant Management System (RMS)

## 1. Project Overview

Restaurant Management System (RMS) เป็นระบบจัดการร้านอาหารแบบ Full-stack Web Application ใช้สำหรับจัดการงานหลักของร้านอาหาร เช่น การเข้าสู่ระบบ การจัดการเมนู การเปิดออเดอร์โต๊ะ การเพิ่มรายการอาหาร การยืนยันออเดอร์ การชำระเงิน และการดูรายงานยอดขาย

ระบบมีการแบ่งสิทธิ์ผู้ใช้งานตามบทบาท ได้แก่ `admin`, `cashier` และ `waiter`

| บทบาท | สิทธิ์การใช้งานหลัก |
|---|---|
| admin | จัดการเมนู ดูรายงาน จัดการออเดอร์ และชำระเงิน |
| cashier | ชำระเงิน และดูรายงานยอดขาย |
| waiter | เปิดออเดอร์ เพิ่มรายการอาหาร และยืนยันออเดอร์ |

### ฟีเจอร์หลักของระบบ

| Feature | รายละเอียด |
|---|---|
| Authentication | เข้าสู่ระบบด้วย username/password และใช้ JWT |
| Menu Management | ดู ค้นหา เพิ่ม แก้ไข และปิดใช้งานเมนู |
| Order Management | เปิดออเดอร์ เพิ่ม/ลบรายการ ยืนยัน และยกเลิกออเดอร์ |
| Payment Processing | ชำระเงิน คำนวณเงินทอน และพิมพ์ใบเสร็จ |
| Reports | ดูรายงานยอดขายรายวันและรายงานตามช่วงวันที่ |
| Security | ตรวจสอบ JWT, Role-based access และ SQL Injection |

### รูปหลักฐานระบบที่ทำเสร็จ

> ใส่รูปหน้าเว็บหลักหลังจากรันระบบสำเร็จ

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Backend | Node.js 22, Express, TypeScript |
| Authentication | JWT, bcryptjs |
| Database | PostgreSQL 16 |
| ORM | Prisma |
| Testing | Vitest, Supertest, Postman, Newman |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Deployment | Vercel, Render, Neon.tech |

## 3. Production URLs

> หลัง Deploy เสร็จ ให้เปลี่ยน URL ด้านล่างเป็น URL จริง และใส่รูปหลักฐานหน้า Deploy

| Service | URL | Status |
|---|---|---|
| Frontend | http://localhost:5173 | Pending |
| Backend API | http://localhost:3001 | Pending |
| Health Check | http://localhost:3001/api/health | Pending |
| GitHub Repository |https://github.com/phubodin-090649/Restaurant-Management-System-Exam-2025.git | Pending |

### รูปหลักฐานการ Deploy

```md
![Vercel Deployment](./tests/reports/deploy-vercel.png)
![Render Deployment](./tests/reports/deploy-render.png)
![Neon Database](./tests/reports/deploy-neon.png)
```

## 4. Test Plan

### 4.1 Test Objective

วัตถุประสงค์ของการทดสอบคือเพื่อตรวจสอบว่าระบบ RMS สามารถทำงานได้ถูกต้องในส่วนสำคัญ ได้แก่ การเข้าสู่ระบบ การจัดการเมนู การจัดการออเดอร์ การชำระเงิน การดูรายงาน และการควบคุมสิทธิ์ความปลอดภัย

### 4.2 Test Scope

| In Scope | Out of Scope |
|---|---|
| Login และ JWT validation | ระบบชำระเงินผ่าน payment gateway จริง |
| Role-based access control | ระบบแสดงผลในครัวแบบ real-time |
| Menu CRUD | ระบบตัด stock วัตถุดิบ |
| Order creation และ confirmation | ระบบพิมพ์ใบเสร็จผ่านเครื่องพิมพ์จริง |
| Payment และการคำนวณเงินทอน | Mobile application |
| Sales report | ระบบหลายสาขา |
| SQL Injection และ Security test | Offline mode |

### 4.3 Test Approach

| Test Type | Tool | แนวทางการทดสอบ |
|---|---|---|
| Unit Testing | Vitest | ทดสอบ logic ย่อย เช่น การคำนวณเงินทอน |
| API Testing | Postman / Newman | ทดสอบ REST API endpoint |
| Integration Testing | Supertest | ทดสอบ Express route และ response |
| Security Testing | Postman / Manual | ทดสอบ JWT, role และ SQL Injection |
| Smoke Testing | Browser / curl | ตรวจสอบว่าระบบรันและใช้งาน flow หลักได้ |

### 4.4 Test Environment

| Component | Version / Configuration |
|---|---|
| Operating System | Windows 10/11 |
| Runtime | Node.js 22 LTS |
| Frontend | React 18, Vite 5, TypeScript |
| Backend | Express 4, TypeScript |
| Database | PostgreSQL 16 |
| ORM | Prisma 5 |
| Browser | Google Chrome / Microsoft Edge |
| API Testing | Postman, Newman |
| Unit Testing | Vitest |
| Local Frontend URL | `http://localhost:5173` |
| Local Backend URL | `http://localhost:3001` |
| Docker | Docker Desktop + Docker Compose |

### 4.5 Entry Criteria

- Backend สามารถ start ได้สำเร็จ
- Frontend สามารถ start ได้สำเร็จ
- Database เชื่อมต่อได้
- Prisma schema ถูก apply แล้ว
- Seed data ถูกเพิ่มเข้า database แล้ว
- Health check endpoint `/api/health` ตอบกลับ `200 OK`

### 4.6 Exit Criteria

- ทดสอบ user flow หลักครบถ้วน
- บันทึก bug ที่พบครบถ้วน
- Smoke test หลังรันระบบเสร็จสมบูรณ์
- CI/CD pipeline ทำงานได้ หรือมีการบันทึกสาเหตุหากไม่ผ่าน
- บันทึกผล Newman pass rate แล้ว

### 4.7 Business Risks

| Risk ID | ความเสี่ยงเชิงธุรกิจ | ผลกระทบ | Priority |
|---|---|---|---|
| BR-001 | ระบบยอมรับการชำระเงินที่จ่ายไม่ครบ | ร้านอาจสูญเสียรายได้ และรายงานยอดขายผิดพลาด | High |
| BR-002 | โต๊ะเดียวสามารถเปิดออเดอร์ซ้ำได้ | พนักงานสับสน เตรียมอาหารผิด และคิดเงินผิด | High |
| BR-003 | ผู้ใช้ที่ไม่มีสิทธิ์สามารถแก้ไขราคาเมนูได้ | ราคาอาหารผิด และเกิดความเสียหายทางการเงิน | High |
| BR-004 | มีความเสี่ยง SQL Injection ในการค้นหาเมนู | ข้อมูลรั่วไหลหรือฐานข้อมูลถูกโจมตี | Critical |

## 5. Test Cases & Results

| TC-ID | Feature | Scenario | Input | Expected | Actual | Pass/Fail |
|---|---|---|---|---|---|---|
| TC-001 | Auth | Login ด้วย admin ถูกต้อง | `admin / Admin@123` | ได้ `200` และ JWT token | ได้ JWT และ user data | Pass |
| TC-002 | Auth | Login ด้วย cashier ถูกต้อง | `cashier1 / Cashier@123` | ได้ `200` และ JWT token | ได้ JWT และ user data | Pass |
| TC-003 | Auth | Login ด้วย password ผิด | `admin / wrongpass` | ได้ `401` | ได้ error | Pass |
| TC-004 | Auth | Login โดยไม่ใส่ username | `{ "password": "Admin@123" }` | ได้ `400` | ได้ validation error | Pass |
| TC-005 | JWT Security | เข้า protected route โดยไม่มี token | `GET /api/menu` | ได้ `401` | ได้ token required error | Pass |
| TC-006 | JWT Security | ใช้ token ไม่ถูกต้อง | `Bearer invalid.token` | ได้ `401` | ได้ invalid token error | Pass |
| TC-007 | Menu | ดูรายการเมนู | `GET /api/menu` | ได้รายการเมนู | แสดงข้อมูลเมนู | Pass |
| TC-008 | Menu | Admin เพิ่มเมนู | menu payload | ได้ `201` | สร้างเมนูสำเร็จ | Pass |
| TC-009 | Menu | เพิ่มเมนูโดยไม่ใส่ราคา | missing `price` | ได้ `400` | ได้ validation error | Pass |
| TC-010 | Menu | SQL Injection ในช่องค้นหา | `search=' OR '1'='1` | ต้องถูกป้องกัน | พบช่องโหว่ | Fail |
| TC-011 | Menu | Waiter แก้ไขราคาเมนู | waiter token | ต้องได้ `403` | ระบบยอมให้แก้ไข | Fail |
| TC-012 | Order | เปิดออเดอร์โต๊ะว่าง | `{ "tableId": 1 }` | ได้ `201` | สร้างออเดอร์สำเร็จ | Pass |
| TC-013 | Order | เปิดออเดอร์โดยไม่ใส่ tableId | `{}` | ได้ `400` | ได้ validation error | Pass |
| TC-014 | Order | เปิดออเดอร์ด้วย tableId ที่ไม่มีอยู่ | `{ "tableId": 9999 }` | ได้ `404` | ได้ table not found | Pass |
| TC-015 | Order | เปิดออเดอร์ซ้ำโต๊ะเดิม | same table | ต้องได้ `409` | เปิดซ้ำได้ | Fail |
| TC-016 | Order | เพิ่มรายการอาหารในออเดอร์ | valid order/item | ได้ `201` | เพิ่มรายการสำเร็จ | Pass |
| TC-017 | Order | Confirm ออเดอร์เปล่า | no items | ได้ `400` | ได้ validation error | Pass |
| TC-018 | Order | Confirm ออเดอร์ที่มีรายการอาหาร | order with items | ได้ `200` | confirmed สำเร็จ | Pass |
| TC-019 | Payment | ชำระเงินพอดี | amount = total | ได้ `201`, change = 0 | สำเร็จ | Pass |
| TC-020 | Payment | ชำระเงินเกิน | amount > total | ได้เงินทอนถูกต้อง | สำเร็จ | Pass |
| TC-021 | Payment | ชำระเงินไม่ครบ | amount < total | ต้องได้ `400` | ระบบรับเงินและ change ติดลบ | Fail |
| TC-022 | Payment | Waiter พยายามชำระเงิน | waiter token | ได้ `403` | access denied | Pass |
| TC-023 | Report | Cashier ดู daily report | cashier token | ได้ report | แสดง report | Pass |
| TC-024 | Report | Waiter ดู report | waiter token | ได้ `403` | access denied | Pass |
| TC-025 | Report | ทดสอบ start date เวลาเที่ยงคืน | payment at midnight | ต้องรวมใน report | อาจถูก exclude | Fail |

### รูปหลักฐาน Test Cases

> ใส่รูปหลักฐานการทดสอบที่สำคัญ เช่น Postman, หน้าเว็บ, หรือ terminal

```md
![Login Test](./tests/reports/tc-login.png)
![Menu Test](./tests/reports/tc-menu.png)
![Order Test](./tests/reports/tc-order.png)
![Payment Test](./tests/reports/tc-payment.png)
![Report Test](./tests/reports/tc-report.png)
```

## 6. Bug Reports

### BUG-001: ระบบยอมรับการชำระเงินที่จ่ายไม่ครบ

| Field | Details |
|---|---|
| Severity | Critical |
| Priority | P1 |
| Feature | Payment |
| Endpoint | `POST /api/payments` |

#### Steps to Reproduce

1. Login ด้วย cashier หรือ admin
2. สร้างออเดอร์
3. เพิ่มรายการอาหาร
4. Confirm ออเดอร์
5. ชำระเงินโดยใส่ `amountPaid` น้อยกว่ายอดรวม

#### Expected Result

ระบบควรคืนค่า `400 Bad Request` และไม่ควรสร้าง payment record

#### Actual Result

ระบบยอมรับ payment และบันทึกเงินทอนเป็นค่าติดลบ

#### Business Impact

ออเดอร์อาจถูกบันทึกว่า paid ทั้งที่ลูกค้าจ่ายเงินไม่ครบ ทำให้ร้านสูญเสียรายได้และรายงานยอดขายผิดพลาด

#### Screenshot

```md
![BUG-001 Underpayment](./tests/reports/bug-001-underpayment.png)
```

### BUG-002: โต๊ะเดียวสามารถเปิดออเดอร์ซ้ำได้

| Field | Details |
|---|---|
| Severity | High |
| Priority | P1 |
| Feature | Order |
| Endpoint | `POST /api/orders` |

#### Steps to Reproduce

1. Login ด้วย waiter
2. เปิดออเดอร์สำหรับโต๊ะที่ว่าง
3. เปิดออเดอร์อีกครั้งด้วยโต๊ะเดิมก่อนที่ออเดอร์แรกจะ paid หรือ cancelled

#### Expected Result

ระบบควรคืนค่า `409 Conflict`

#### Actual Result

ระบบยอมให้เปิดออเดอร์ซ้ำในโต๊ะเดียวกัน

#### Business Impact

พนักงานอาจสับสน เตรียมอาหารผิด และคิดเงินผิดโต๊ะ

#### Screenshot

```md
![BUG-002 Double Booking](./tests/reports/bug-002-double-booking.png)
```

### BUG-003: Menu Search มีความเสี่ยง SQL Injection

| Field | Details |
|---|---|
| Severity | Critical |
| Priority | P1 |
| Feature | Menu |
| Endpoint | `GET /api/menu?search=` |

#### Steps to Reproduce

1. Login ด้วย user ใดก็ได้
2. ค้นหาเมนูด้วย payload เช่น `' OR '1'='1`

#### Expected Result

ระบบควรใช้ parameterized query และคืนเฉพาะข้อมูลที่ค้นหาอย่างปลอดภัย

#### Actual Result

ระบบใช้ raw SQL string interpolation ที่ไม่ปลอดภัย

#### Business Impact

มีความเสี่ยงข้อมูลรั่วไหลหรือฐานข้อมูลถูกโจมตี

#### Screenshot

```md
![BUG-003 SQL Injection](./tests/reports/bug-003-sql-injection.png)
```

### BUG-004: Waiter สามารถแก้ไขราคาเมนูได้

| Field | Details |
|---|---|
| Severity | High |
| Priority | P1 |
| Feature | Menu Authorization |
| Endpoint | `PUT /api/menu/:id` |

#### Steps to Reproduce

1. Login ด้วย waiter
2. ส่ง request แก้ไขราคาเมนู

#### Expected Result

ระบบควรคืนค่า `403 Forbidden`

#### Actual Result

ระบบอนุญาตให้ user ที่ login แล้วแก้ไขเมนูได้

#### Business Impact

ราคาอาหารอาจถูกแก้ไขโดยผู้ไม่มีสิทธิ์ ทำให้เกิดความเสียหายทางการเงิน

#### Screenshot

```md
![BUG-004 Unauthorized Menu Update](./tests/reports/bug-004-menu-role.png)
```

### BUG-005: Sales Report ไม่รวมข้อมูลเวลาเที่ยงคืนของ startDate

| Field | Details |
|---|---|
| Severity | Medium |
| Priority | P2 |
| Feature | Report |
| Endpoint | `GET /api/reports/sales` |

#### Steps to Reproduce

1. สร้าง payment ที่เวลา `YYYY-MM-DD 00:00:00`
2. เรียก sales report ด้วย `startDate=YYYY-MM-DD`

#### Expected Result

ข้อมูล payment ที่เริ่มตั้งแต่เวลา `00:00:00` ควรถูกนับรวม

#### Actual Result

ข้อมูลอาจถูกตัดออก เพราะ filter ใช้ `gt` แทน `gte`

#### Business Impact

รายงานยอดขายรายวันอาจไม่ถูกต้อง

#### Screenshot

```md
![BUG-005 Report Date Filter](./tests/reports/bug-005-report-date.png)
```

## 7. Deployment Guide

### Prerequisites

- Node.js 22 หรือใหม่กว่า
- Docker Desktop
- Git
- GitHub account
- Neon.tech สำหรับ PostgreSQL 16
- Render สำหรับ Backend
- Vercel สำหรับ Frontend

### Local Development Setup

```bash
git clone https://github.com/phubodin-090649/Restaurant-Management-System-Exam-2025.git
cd YOUR_REPOSITORY
```

Backend:

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Frontend:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

| Service | Local URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend Health | `http://localhost:3001/api/health` |

### Docker Compose Setup

```bash
docker compose up --build
```

| Service | Docker URL |
|---|---|
| Frontend | `http://localhost` |
| Backend | `http://localhost:3001` |
| Health Check | `http://localhost:3001/api/health` |
| PostgreSQL | `localhost:5432` |

### Production Deployment Steps

1. สร้าง PostgreSQL 16 database บน Neon.tech
2. Copy `DATABASE_URL` จาก Neon
3. Deploy backend ไปที่ Render
4. ตั้งค่า environment variables ของ backend บน Render
5. Deploy frontend ไปที่ Vercel
6. ตั้งค่า `VITE_API_URL` บน Vercel ให้ชี้ไปที่ backend API
7. ตั้งค่า `CORS_ORIGIN` บน Render ให้ตรงกับ frontend URL
8. ทดสอบระบบด้วย smoke test
9. บันทึก URL และผลการทดสอบในรายงานนี้

### รูปหลักฐาน Deployment

```md
![Render Backend](./tests/reports/render-backend.png)
![Vercel Frontend](./tests/reports/vercel-frontend.png)
![Neon PostgreSQL](./tests/reports/neon-postgresql.png)
```

## 8. Environment Variables Table

### Backend

| Variable | Required | Example | คำอธิบาย |
|---|---|---|---|
| `DATABASE_URL` | Yes | `postgresql://postgres:postgres@localhost:5432/rms_db` | URL สำหรับเชื่อมต่อ PostgreSQL |
| `JWT_SECRET` | Yes | `change-this-secret` | secret สำหรับ sign JWT |
| `CORS_ORIGIN` | Yes | `http://localhost:5173` | frontend origin ที่อนุญาต |
| `PORT` | Yes | `3001` | port ของ backend |
| `NODE_ENV` | Yes | `development` | environment ของระบบ |

### Frontend

| Variable | Required | Example | คำอธิบาย |
|---|---|---|---|
| `VITE_API_URL` | Yes | `/api` | base URL สำหรับเรียก backend API |

### Database

| Variable | Required | Example | คำอธิบาย |
|---|---|---|---|
| `POSTGRES_DB` | Yes | `rms_db` | ชื่อ database |
| `POSTGRES_USER` | Yes | `postgres` | username ของ database |
| `POSTGRES_PASSWORD` | Yes | `postgres` | password ของ database |

## 9. Smoke Test Results

| Test | URL / Action | Expected Result | Actual Result | Pass/Fail | Screenshot |
|---|---|---|---|---|---|
| Backend health check | `GET /api/health` | `200 OK` | Pending | Pending | `./tests/reports/smoke-health.png` |
| Frontend loads | เปิด frontend URL | แสดงหน้า Login | Pending | Pending | `./tests/reports/smoke-login.png` |
| Admin login | Login ด้วย `admin` | เข้า Dashboard ได้ | Pending | Pending | `./tests/reports/smoke-dashboard.png` |
| Menu list | เปิดหน้า Menu | แสดงรายการเมนู | Pending | Pending | `./tests/reports/smoke-menu.png` |
| Create order | เปิดออเดอร์โต๊ะว่าง | สร้างออเดอร์สำเร็จ | Pending | Pending | `./tests/reports/smoke-create-order.png` |
| Confirm order | Confirm ออเดอร์ | status เป็น confirmed | Pending | Pending | `./tests/reports/smoke-confirm-order.png` |
| Process payment | ชำระเงิน | payment สำเร็จ | Pending | Pending | `./tests/reports/smoke-payment.png` |
| Daily report | เปิด reports | แสดงรายงานยอดขาย | Pending | Pending | `./tests/reports/smoke-report.png` |

## 10. CI/CD Pipeline

ระบบใช้ GitHub Actions สำหรับตรวจสอบคุณภาพของโค้ดและการ build

### Pipeline Trigger

| Trigger | Branch |
|---|---|
| Push | `main` |

### Pipeline Steps

| Step | รายละเอียด |
|---|---|
| Checkout repository | ดึง source code ล่าสุด |
| Setup Node.js | ใช้ Node.js 22 |
| Install dependencies | ติดตั้ง dependencies ของ backend และ frontend |
| Dependency audit | รัน `npm audit --audit-level=high` |
| Database setup | เปิด PostgreSQL test service |
| Prisma setup | Generate Prisma client และ apply schema |
| Seed database | เพิ่มข้อมูลทดสอบ |
| Backend tests | รัน Vitest |
| Backend build | Compile TypeScript backend |
| Frontend build | Build Vite frontend |
| Newman install | ติดตั้ง Newman |
| API startup | Start backend สำหรับ API test |
| Newman tests | รัน Postman collection |

### CI/CD Status

| Check | Status | Notes |
|---|---|---|
| Backend install | Pending | รันใน GitHub Actions |
| Frontend install | Pending | รันใน GitHub Actions |
| Backend tests | Pending | มีบาง test ที่ fail เพราะ bug ที่ตั้งใจให้ตรวจพบ |
| Backend build | Pending | ตรวจ TypeScript backend |
| Frontend build | Pending | ตรวจ Vite production build |
| Newman tests | Pending | ต้องใช้ database ที่ seed แล้ว |
| Audit | Pending | fail เมื่อพบ high/critical vulnerabilities |

### รูปหลักฐาน CI/CD

![alt text](image-6.png)
```

## 11. Newman Pass Rate

| Metric | Result |
|---|---|
| Collection | `tests/postman/RMS-TestSuite-v2.json` |
| Environment | `tests/postman/env-ci.json` |
| Total Requests | Pending |
| Passed Tests | Pending |
| Failed Tests | Pending |
| Pass Rate | Pending |

### Newman Command

```bash
newman run tests/postman/RMS-TestSuite-v2.json \
  --environment tests/postman/env-ci.json \
  --env-var baseUrl=http://localhost:3001/api \
  --reporters cli
```

### รูปหลักฐาน Newman

![alt text](image-7.png)

## 12. Test Evidence Screenshots

> รวมรูปหลักฐานหน้าจอที่ทำเสร็จแล้ว

```md
![Login Page]![alt text](image-16.png)
![Dashboard Page]![alt text](image-15.png)
![Menu Page]![alt text](image-14.png)
![Orders Page]![alt text](image-13.png)
![Order Detail Page]![alt text](image-11.png)
![Payment Page]![alt text](image-12.png)
![Receipt Print]![alt text](image-9.png)
![Reports Page]![alt text](image-8.png)
```

## 13. Final Notes

ระบบ RMS มีโครงสร้างครบทั้ง frontend, backend, database schema, seed data, Docker configuration, API tests และ CI/CD workflow

จากการทดสอบพบว่าระบบสามารถใช้งาน flow หลักได้ แต่ยังมี bug สำคัญด้าน business logic และ security ที่ต้องบันทึกและแก้ไขก่อนนำไปใช้งานจริง เช่น การรับเงินไม่ครบ การเปิดออเดอร์ซ้ำ และ SQL Injection
