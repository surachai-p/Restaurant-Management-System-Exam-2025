import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
    // เพิ่มการตั้งค่าเวลาขยายเวลารอ (Timeout) เป็น 15 วินาที เพื่อให้รองรับการเชื่อมต่อกับฐานข้อมูลตอนรันเทสต์
    testTimeout: 15000,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/app.ts'],
    },
  },
})
