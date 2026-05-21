FROM node:22-slim AS deps
WORKDIR /app

# ติดตั้งสิ่งที่จำเป็นสำหรับ Prisma และการเช็ค Database
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \
    openssl \
    wget \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/
# ติดตั้งทั้งหมดเพื่อให้มี tsx สำหรับการ seed ในภายหลัง
RUN npm ci && npx prisma generate

FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
RUN npm ci
COPY src ./src
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

# Runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    netcat-openbsd \
    openssl \
    wget \
    curl \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

# ก๊อปปี้ไฟล์ที่จำเป็นมาจาก stage ก่อนหน้า
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY --from=deps /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3001

# ปรับ CMD ให้รอ Database (พอร์ต 5432) พร้อมก่อนค่อยรันคำสั่งอื่น
# 'db' คือชื่อ service ใน docker-compose.yml
CMD sh -c "until nc -z db 5432; do echo 'Waiting for database...'; sleep 2; done; \
           npx prisma db push && \
           npx tsx prisma/seed.ts && \
           node dist/app.js"