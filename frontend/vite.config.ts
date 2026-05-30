import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // กำหนด Port สำหรับการรันโหมด Development
    port: 5173,
    
    // ตั้งค่า Proxy เพื่อส่งต่อ Request ที่ขึ้นต้นด้วย /api ไปยัง Backend ของเรา
    // ช่วยป้องกันปัญหา CORS ระหว่างการพัฒนา
    proxy: { 
      '/api': { 
        target: 'http://localhost:3001', 
        changeOrigin: true 
      } 
    },
  },
});
