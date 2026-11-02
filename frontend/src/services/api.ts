/// <reference types="vite/client" />
// src/services/api.ts
import axios from 'axios'

const envUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim().replace(/\/+$/, '')
const isValidProdUrl = envUrl && envUrl.startsWith('https://rms-backend-52xr.onrender.com')

const BASE = import.meta.env.PROD
  ? (isValidProdUrl ? (envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`) : 'https://rms-backend-52xr.onrender.com/api')
  : (envUrl || '/api')

const api = axios.create({ baseURL: BASE })

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
