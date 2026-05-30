/// <reference types="vite/client" />
// src/services/api.ts
import axios from 'axios';

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';

const api = axios.create({ 
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request Interceptor: แนบ Token ไปกับ Headers อัตโนมัติทุกครั้งที่มีการยิง API
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rms_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: จัดการ Error แบบ Global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // เช็คว่า Error เกิดจาก Axios และมี Status 401 (Unauthorized - Token หมดอายุ/ไม่ถูกต้อง)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // ลบข้อมูลเก่าทิ้ง
      localStorage.removeItem('rms_token');
      localStorage.removeItem('rms_user');
      
      // ป้องกันการ Redirect วนลูปหากผู้ใช้อยู่หน้า Login อยู่แล้ว
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
