# Restaurant Management System (RMS) v2

> **ข้อสอบปฏิบัติ** — รายวิชาการออกแบบและพัฒนาซอฟต์แวร์ 1 | KMITL

[![CI](https://github.com/YOUR_USERNAME/restaurant-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/restaurant-management-system/actions)

---

## 🏠 Project Overview

ระบบจัดการร้านอาหาร (RMS) สำหรับจัดการเมนู รับออเดอร์ ชำระเงิน และดูรายงานยอดขาย

**นักศึกษา:** นางสาววรัทยา รอดเมล์
**รหัสนักศึกษา:** 68030258
**วันที่สอบ:** 8 พฤษภาคม 2569

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18 + Vite + **TypeScript** + **Tailwind CSS** |
| Backend  | Node.js 22 LTS + Express + **TypeScript** |
| Database | PostgreSQL 16 (Neon.tech) |
| ORM      | **Prisma** |
| Testing  | **Vitest** + Supertest + Newman |
| Deploy   | Vercel (FE) + Render (BE + DB) |

---

## 🌐 Production URLs

| Service     | URL |
|-------------|-----|
| Frontend    | http://localhost:5173 |
| Backend API | http://localhost:3001| 
| Health Check| http://localhost:3001/api/health |

---

## 📋 Test Plan

### Test Scope
**In Scope:**
- [X] Authentication (Login/Logout, JWT)
- [X ] Menu Management (CRUD + Role-based access)
- [X ] Order Management (Open/Add Items/Confirm/Cancel)
- [X ] Payment Processing (Cash/Card/QR)
- [X ] Sales Reports


### Test Approach

| ประเภท | เครื่องมือ | ครอบคลุม |
|--------|-----------|----------|
| Unit Testing | Vitest | Business Logic (Payment Calculation) |
| API Testing | Postman / Newman | REST Endpoints ทั้งหมด |
| Security Testing | Manual + Postman | Auth, SQL Injection, Role Check |

### Test Environment

| Component | Specification |
|-----------|--------------|
| Node.js   | 22 LTS |
| PostgreSQL | 16 (Neon.tech) |
| Browser   | chrome 148.0.7778.96 |
| OS        | Windows 11 |

### Entry/Exit Criteria

**Entry:** ระบบ Start ได้, `GET /api/health` คืน `{"status":"ok"}`
**Exit:** ≥ 80% Test Cases ผ่าน, ไม่มี Critical Bug ที่ยังไม่รายงาน

### Business Risk

| ความเสี่ยง | ผลกระทบ | Priority |
|-----------|---------|---------|
| ระบบอนุญาตให้สั่งสินค้าที่ไม่มีในสต็อก | ทำให้ร้านค้าเสียโอกาสในการขาย และข้อมูลสต็อกสินค้าไม่ถูกต้อง ลูกค้าสามารถสั่งของที่ไม่มีอยู่จริงได้โดยไม่ต้องจ่ายเงิน | P1 |
| ระบบการค้นหาไม่รองรับอักขระพิเศษ | ลูกค้าอาจจะเจอหน้าจอ Error ขาวๆ หรือระบบล่มเพียงแค่พิมพ์ตัวอักษรผิด | P2 |

---

## 🧪 Test Cases & Results


### Vitest Results
```
Run: npm test
✓ Payment returns positive change when overpaid
✗ [BUG-001] Should NOT allow negative change  ← reveals bug!
...
```

### Newman Pass Rate
```
Total: 21  |  Passed: 15  |  Failed: 26  |  Pass Rate: 42%
```


## 🐛 Bug Reports

### BUG-001: ระบบอนุญาตให้สั่งสินค้าที่ไม่มีในสต็อก

**Severity:** High 
**Priority:** P1 
**Feature:** Stock Management
**Status:** Open

#### Steps to Reproduce
1. เปิดโปรแกรม Postman
2. ใช้ Method POST ไปที่ URL http://localhost:3001/api/orders
3. ใส่ Body เป็น JSON โดยระบุ menuId ที่ไม่มีอยู่จริง หรือใส่ quantity จำนวนมากๆ
4. กด Send

#### Expected Result
> ระบบต้องตอบกลับด้วย HTTP 400 Bad Request และแจ้งเตือนว่า "สินค้าหมด" หรือ "ไม่พบรหัสสินค้า"

#### Actual Result
> ระบบตอบกลับเป็น HTTP 201 Created และสร้างออเดอร์สำเร็จ โดยมียอด totalAmount เป็น "0"
 

#### Business Impact
> ทำให้ร้านค้าเสียโอกาสในการขาย และข้อมูลสต็อกสินค้าไม่ถูกต้อง ลูกค้าสามารถสั่งของที่ไม่มีอยู่จริงได้โดยไม่ต้องจ่ายเงิน

---

### BUG-002: ระบบการค้นหาไม่รองรับอักขระพิเศษ

**Severity:** Medium 
**Priority:** P2  
**Feature:** Menu / Search  
**Status:** Open

#### Steps to Reproduce
1. เปิด Postman ไปที่เมนูค้นหา (GET /api/menu/search?name=...)
2. ใส่ค่าค้นหาเป็นอักขระพิเศษ เช่น % หรือ ' หรืออักขระพิเศษอื่นๆ
3. กด Send

#### Expected Result
> ระบบควรตอบกลับเป็นรายการว่าง (Empty Array) หรือแจ้งเตือนว่าไม่พบข้อมูล

#### Actual Result
> ระบบตอบกลับเป็น 500 Internal Server Error หรือ JSON Error 

#### Business Impact
> ลูกค้าอาจจะเจอหน้าจอ Error ขาวๆ หรือระบบล่มเพียงแค่พิมพ์ตัวอักษรผิด

---

---

## 🚀 Deployment Guide

<!-- ส่วนที่ 5 -->

### Prerequisites
```
Node.js >= 22.0.0
Docker Desktop (for local)
```

### Local Setup (Docker Compose)
```bash
git clone https://github.com/YOUR_USERNAME/restaurant-management-system.git
cd restaurant-management-system
docker compose up --build
# Frontend: http://localhost
# Backend:  http://localhost:3001/api/health
```

### Local Setup (Manual)
```bash
# Backend
cd backend && cp .env.example .env
# แก้ DATABASE_URL ใน .env
npm install && npx prisma db push && npx tsx prisma/seed.ts && npm run dev

# Frontend (Terminal ใหม่)
cd frontend && cp .env.example .env.local
npm install && npm run dev
# เปิด http://localhost:5173
```

### Environment Variables (Backend)

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Random secret string | *4aa7f1d75a2148aa8c6654b008595b9f4cad9e3454df042a89612d21e8275255* |
| `CORS_ORIGIN` | Frontend URL | ``http://localhost:5173/` |


---

## 🔐 Default Credentials (Testing Only)

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | Admin@123 |
| Cashier | cashier1 | Cashier@123 |
| Waiter | waiter1 | Waiter@123 |
