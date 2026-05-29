/// <reference types="vite/client" />
// src/services/api.ts
import axios from 'axios'

// เช็กให้ชัวร์ว่าถ้าตัวแปรเป็นค่าว่าง หรือไม่ได้ตั้งไว้ ให้ถอยไปใช้ลิงก์ Render แทน
const getBaseURL = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl;
  }
  // เปลี่ยนเป็น URL หลังบ้านบน Render ของคุณ
  return 'https://rms-backend-um90.onrender.com';
}

const api = axios.create({ 
  baseURL: getBaseURL() 
})

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('rms_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  r => r,
  err => {
    if ((err as { response?: { status?: number } }).response?.status === 401) {
      localStorage.removeItem('rms_token')
      localStorage.removeItem('rms_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api