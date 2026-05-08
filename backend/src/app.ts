// src/app.ts
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import prisma from './lib/prisma'

import authRoutes     from './routes/auth'
import menuRoutes     from './routes/menu'
import orderRoutes    from './routes/orders'
import paymentRoutes  from './routes/payments'
import reportRoutes   from './routes/reports'

const app = express()

// ปรับปรุงการตั้งค่า CORS เพื่อรองรับ GitHub Codespaces โดยเฉพาะ
app.use(cors({
  origin: true,       // สะท้อน origin กลับไปอัตโนมัติ (แก้ปัญหา URL เปลี่ยนบ่อย)
  credentials: true,  // อนุญาตให้ส่ง Cookie/Auth Header
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// ตรวจสอบว่าใน Frontend เรียก URL ที่มี /api นำหน้าหรือไม่
app.use('/api/auth',     authRoutes)
app.use('/api/menu',     menuRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/reports',  reportRoutes)

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', timestamp: new Date(), version: '2.0.0' })
)

const PORT = Number(process.env.PORT) || 3001

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`RMS API v2 running on port ${PORT}`))
}

export default app