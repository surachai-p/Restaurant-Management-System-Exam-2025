FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends openssl wget && rm -rf /var/lib/apt/lists/*

COPY backend/package*.json ./
COPY backend/prisma ./prisma/

RUN npm install

COPY backend/tsconfig.json ./
COPY backend/src ./src/

RUN npm run build

ENV NODE_ENV=production
EXPOSE 10000

CMD ["sh", "-c", "npx prisma db push && npx tsx prisma/seed.ts && node dist/app.js"]
