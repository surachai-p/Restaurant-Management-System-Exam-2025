FROM node:22-slim AS builder
WORKDIR /app

# Install OpenSSL required by Prisma
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
RUN npm ci && npx prisma generate
COPY src ./src
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

# Runtime OpenSSL and wget required by Prisma and health check
RUN apt-get update && apt-get install -y --no-install-recommends openssl wget && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
EXPOSE 3001
EXPOSE 10000
CMD ["sh", "-c", "(npx prisma db push --skip-generate && npx tsx prisma/seed.ts || echo 'DB schema/seed already applied') && node dist/app.js"]
