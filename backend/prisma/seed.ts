import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, name, role } = req.body;

    if (!username || !password || !name) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    // แฮชรหัสผ่านให้ปลอดภัยก่อนบันทึกเข้าตู้เย็น (Database)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role: role || 'waiter',
      },
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Missing username or password' });
      return;
    }

    // ค้นหาผู้ใช้จากชื่อที่กรอกเข้ามา
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // ถ้าไม่เจอชื่อผู้ใช้ หรือ บัญชีโดนปิดใช้งาน (isActive === false)
    if (!user || !user.isActive) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // ตรวจสอบความถูกต้องของรหัสผ่านที่ลูกค้ากรอก เปรียบเทียบกับรหัสที่ผ่านการแฮชในระบบ
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // สร้างกุญแจดิจิทัล (JWT Token) ให้หน้าบ้านใช้สำหรับล็อกอินค้างไว้
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = jwt.encode(payload, JWT_SECRET);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
}

main().catch(console.error).finally(() => prisma.$disconnect())
