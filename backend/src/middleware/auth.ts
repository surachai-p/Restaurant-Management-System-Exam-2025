import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';

// ตั้งค่ารหัสลับให้ตรงกับฝั่ง authController เปี๊ยะๆ เพื่อให้ไขกุญแจผ่าน
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JwtPayload {
  sub: number;       // ปรับให้เป็น sub ตามที่เจนมาจากหน้า login
  username: string;
  role: 'admin' | 'cashier' | 'waiter';
  iat?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// 👮 ยามสเต็ปที่ 1: ตรวจบัตรผ่านประตูดิจิทัล (Authentication)
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    // ถอดรหัสลับเพื่อดูว่าใครเป็นคนส่งคำขอมา
    const decoded = jwt.decode(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next(); // บัตรผ่านฉลุย! ไปทำขั้นตอนต่อไปได้
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// 👮 ยามสเต็ปที่ 2: ตรวจสิทธิ์พนักงาน (Authorization)
export const requireRole = (...roles: Array<'admin' | 'cashier' | 'waiter'>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // เช็กว่าพนักงานคนนี้มีตำแหน่ง (Role) ตรงตามที่เมนูนี้กำหนดไว้ไหม
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    
    next(); // สิทธิ์ผ่าน! ยอมให้กดสั่งงานระบบได้
  };
