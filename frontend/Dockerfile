# ==========================================
# Stage 1: Build the React/Vite application
# ==========================================
FROM node:22-alpine AS builder

# กำหนด Directory หลักสำหรับการทำงาน
WORKDIR /app

# คัดลอกไฟล์จัดการ package และติดตั้ง Dependencies (ใช้ ci เพื่อความชัวร์และเร็ว)
COPY package*.json ./
RUN npm ci

# คัดลอก Source Code ทั้งหมด
COPY . .

# รับค่าตัวแปรสำหรับเชื่อม Backend (Default = /api) และส่งเข้า Vite
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Build โปรเจกต์ให้ออกมาเป็น Static Files (โฟลเดอร์ dist)
RUN npm run build

# ==========================================
# Stage 2: Serve the application with Nginx
# ==========================================
FROM nginx:alpine

# คัดลอกเฉพาะ Static Files ที่ Build เสร็จแล้วจาก Stage 1 มาไว้ใน Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# คัดลอกไฟล์ตั้งค่า Nginx (สำหรับจัดการ React Router ให้รองรับ Client-side Routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# เปิด Port 80 สำหรับให้บริการ
EXPOSE 80

# สั่งรัน Nginx ทันทีเมื่อ Container เริ่มทำงาน
CMD ["nginx", "-g", "daemon off;"]
