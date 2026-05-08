// src/services/publicApi.ts — no auth required
import axios from 'axios'

const publicApi = axios.create({
  baseURL: (import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api') + '/public',
})

export default publicApi

export interface PublicMenuItem {
  id: number
  name: string
  description?: string
  price: string | number
  category: 'food' | 'drink' | 'dessert'
  isAvailable: boolean
}

export interface PublicTable {
  id: number
  tableNumber: number
  capacity: number
  status: 'available' | 'occupied' | 'reserved'
}

export interface CartItem {
  menuItem: PublicMenuItem
  quantity: number
}

export interface Reservation {
  id: number
  token: string
  customerName: string
  phone: string
  partySize: number
  reservedAt: string
  note?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'seated'
  createdAt: string
}

export interface CustomerOrder {
  id: number
  tableId: number
  customerName?: string
  status: string
  totalAmount: string | number
  note?: string
  createdAt: string
  table?: PublicTable
  items?: {
    id: number
    quantity: number
    unitPrice: string | number
    subtotal: string | number
    menuItem?: PublicMenuItem
  }[]
  payment?: { totalAmount: number; amountPaid: number; change: number; method: string }
}
