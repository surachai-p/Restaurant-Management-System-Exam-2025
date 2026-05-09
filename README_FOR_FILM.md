# คู่มือการรันระบบและทดสอบ (Restaurant Management System - RMS)

ไฟล์นี้จัดทำขึ้นเพื่อให้คุณ (Film) สามารถรันระบบ ทดสอบ และใช้งานโปรเจคนี้ได้อย่างครบถ้วนทุกขั้นตอน

---

## 🛠️ ความต้องการของระบบ (Prerequisites)
ก่อนเริ่มงาน ตรวจสอบว่าเครื่องของคุณมีการติดตั้งสิ่งเหล่านี้แล้ว:
- **Node.js**: เวอร์ชัน 22 LTS (แนะนำ)
- **Docker Desktop**: สำหรับการรัน Database และ Staging Environment
- **Postman / Newman**: สำหรับการรัน API Automation Test
- **Git**: สำหรับการจัดการเวอร์ชันของโค้ด

---

## 🚀 1. การติดตั้งและรันระบบแบบแมนนวล (Manual Setup)

### ขั้นตอนที่ 1: ตั้งค่าฐานข้อมูล (Database)
หากไม่มี PostgreSQL ในเครื่อง ให้ใช้ Docker รันฐานข้อมูลขึ้นมาง่ายๆ:
```bash
docker compose up -d db
```

### ขั้นตอนที่ 2: รัน Backend
1. เข้าไปที่โฟลเดอร์ `backend`: `cd backend`
2. สร้างไฟล์ `.env`: `cp .env.example .env` (ตรวจสอบว่า DATABASE_URL เชื่อมต่อกับ localhost:5432)
3. ติดตั้ง Library: `npm install`
4. สร้าง Schema และ Seed ข้อมูล: `npx prisma db push && npx tsx prisma/seed.ts`
5. รันเซิร์ฟเวอร์: `npm run dev` (จะทำงานอยู่ที่ http://localhost:3001)

### ขั้นตอนที่ 3: รัน Frontend
1. เข้าไปที่โฟลเดอร์ `frontend`: `cd frontend`
2. สร้างไฟล์ `.env`: `cp .env.example .env`
3. ติดตั้ง Library: `npm install`
4. รันระบบ: `npm run dev` (จะทำงานอยู่ที่ http://localhost:5173)

---

## 🐳 2. การรันระบบด้วย Docker Compose (Staging)
วิธีนี้จะรันทั้ง Backend, Frontend และ DB พร้อมกันในที่เดียว:
```bash
docker compose up --build
```
- **Frontend**: เข้าใช้งานที่ http://localhost
- **Backend Health**: เช็คได้ที่ http://localhost:3001/api/health

---

## 🧪 3. การทดสอบระบบ (Testing)

### 3.1 การทดสอบ Unit Test (Backend)
ใช้เพื่อเช็ค Logic การทำงานภายใน:
```bash
cd backend
npm test
```

### 3.2 การทดสอบ API Automation (Newman)
ใช้เพื่อเช็คความถูกต้องของ API ทั้งหมดตาม Flow:
```bash
# ติดตั้ง newman ก่อน (ถ้ายังไม่มี)
npm install -g newman

# รันการทดสอบ
newman run tests/postman/RMS-68030135-TestSuite.json \
  --environment tests/postman/env-local.json \
  --reporters cli
```

### 3.3 การตรวจสอบความปลอดภัย (Security Scan)
ตรวจสอบช่องโหว่ของ Library ที่ใช้:
```bash
cd backend && npm audit
cd ../frontend && npm audit
```

---

## ☁️ 4. การตั้งค่าฐานข้อมูลบน Cloud (Neon.tech)
หากต้องการใช้ฐานข้อมูลบน Cloud แทนเครื่องตัวเอง:
1. นำ Connection String จาก Neon มาใส่ใน `backend/.env` ที่ตัวแปร `DATABASE_URL`
2. รันคำสั่ง Sync โครงสร้างตาราง:
   ```bash
   cd backend
   npx prisma db push
   ```
3. รันคำสั่งเพิ่มข้อมูลเริ่มต้น:
   ```bash
   npx tsx prisma/seed.ts
   ```
*หมายเหตุ: ไม่ต้องใช้ `prisma migrate` สำหรับการสอบครั้งนี้ ให้ใช้ `db push` ตามคำแนะนำของอาจารย์ครับ*

---

## 🔑 ข้อมูลการเข้าสู่ระบบ (Default Credentials)
| Role | Username | Password |
|------|----------|----------|
| **Admin** | `admin` | `Admin@123` |
| **Cashier** | `cashier1` | `Cashier@123` |
| **Waiter** | `waiter1` | `Waiter@123` |

---

## 📝 บันทึกเพิ่มเติมสำหรับ Film
- **API URL**: เมื่อรันในเครื่องตัวเอง ให้ใช้ `http://localhost:3001/api`
- **Prisma Studio**: หากต้องการดูข้อมูลในฐานข้อมูลแบบหน้าเว็บ ให้รัน `npx prisma studio` ในโฟลเดอร์ `backend`
- **Bug ที่ต้องระวัง**: หน้า Payment มีบั๊กเรื่องข้อความแจ้งเตือนไม่หายไป (UI Validation Persistence) และก่อนหน้านี้มีเรื่องยอดชำระติดลบแต่ได้รับการแก้ไขในโค้ดแล้ว

---
*ขอให้โชคดีกับการทำโปรเจคและการสอบครับ!*
