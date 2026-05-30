/** @type {import('tailwindcss').Config} */
export default {
  // กำหนดไฟล์ที่ Tailwind ต้องเข้าไปสแกนหา Class เพื่อนำมาสร้าง CSS
  content: [
    './index.html', 
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    // ใช้ extend เพื่อ 'เพิ่ม' ค่าใหม่เข้าไปโดยไม่ไปทับค่า Default เดิมของ Tailwind
    extend: {
      colors: {
        brand: { 
          50: '#eff6ff',  // สีอ่อนสุด (เช่น พื้นหลัง, Badge)
          500: '#2980b9', // สีหลัก (เช่น ปุ่ม, Navbar)
          700: '#1a5276', // สีเข้ม (เช่น เวลา Hover ปุ่ม)
          900: '#1a1a2e'  // สีเข้มสุด (เช่น ข้อความที่ต้องการเน้น)
        },
      },
    },
  },
  plugins: [],
};
