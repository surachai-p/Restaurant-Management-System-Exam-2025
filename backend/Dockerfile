FROM node:22-slim AS deps
WORKDIR /app

# Install netcat and openssl for database readiness check and Prisma
RUN apt-get update && apt-get install -y --no-install-recommends netcat-openbsd openssl wget && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npx prisma generate

FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
RUN npm install
COPY src ./src
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

# Runtime OpenSSL, wget, and netcat required for database readiness checks
RUN apt-get update && apt-get install -y --no-install-recommends openssl wget netcat-openbsd && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["sh", "-c", "until nc -z db 5432; do echo 'Waiting for database...'; sleep 1; done; npx prisma db push && npx tsx prisma/seed.ts && node dist/app.js"]

# 1. ใช้ Node.js เป็นฐานในการ Build
FROM node:22-slim AS builder
WORKDIR /app

# 2. คัดลอกไฟล์ที่จำเป็นสำหรับการลง Library
COPY package*.json ./
COPY tsconfig.json ./
# เพิ่มบรรทัดนี้เพื่อให้ Docker เห็นโครงสร้างฐานข้อมูลของคุณ
COPY prisma ./prisma/ 

# 3. ติดตั้ง Library (ใช้ npm install ตามที่แก้คราวก่อน)
RUN npm install

# 4. Generate Prisma Client (สำคัญมาก! ถ้าไม่มีบรรทัดนี้ build จะหา db client ไม่เจอ)
RUN npx prisma generate

# 5. คัดลอกโค้ดทั้งหมดและเริ่มการ Build
COPY . .
RUN npm run build