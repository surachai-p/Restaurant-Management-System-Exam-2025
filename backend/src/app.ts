// src/app.ts
import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'

import authRoutes     from './routes/auth'
import menuRoutes     from './routes/menu'
import orderRoutes    from './routes/orders'   // มี authenticate ในตัว router แล้ว
import paymentRoutes  from './routes/payments'
import reportRoutes   from './routes/reports'

const app = express()

// ✅ ตั้งค่า CORS
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }))
app.use(express.json())

// ✅ Root Route (แก้ปัญหา Cannot GET /)
app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to Restaurant Management System API v2.0.0')
})

// ✅ Mount routes
app.use('/api/auth',     authRoutes)
app.use('/api/menu',     menuRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/reports',  reportRoutes)

// ✅ health check route
app.get('/api/health', (_req: Request, res: Response) =>
  res.json({ status: 'ok', timestamp: new Date(), version: '2.0.0' })
)

// ✅ กำหนด PORT
const PORT: number = Number(process.env.PORT) || 3001

// ✅ ป้องกันไม่ให้ listen ตอนรัน test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`RMS API v2 running on port ${PORT}`)
  })
}

export default app