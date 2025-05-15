import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  rating?: number
  brand?: string
  isNewArrival?: boolean
  isTopSelling?: boolean
}

export interface Sale {
  id: string
  customer: string
  product: string
  amount: number
  date: string
  status: 'Pending' | 'Completed' | 'Cancelled'
}

export interface Payment {
  id: string
  amount: number
  status: 'Pending' | 'Completed' | 'Failed'
  method: string
  date: string
  saleId: string
}

interface AdminState {
  isAuthenticated: boolean
  userRole: 'admin' | 'user' | null
  products: Product[]
  sales: Sale[]
  payments: Payment[]
  
  // Auth
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Meta Quest 3',
    description: 'Standalone VR headset with high-resolution display and precise motion tracking.',
    price: 7500000,
    category: 'Virtual Reality',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 50,
    rating: 4.8,
    brand: 'Meta',
    isNewArrival: true,
    isTopSelling: false
  },
  {
    id: '2',
    name: 'PlayStation VR2',
    description: 'VR headset for PlayStation 5 with haptic feedback and adaptive triggers.',
    price: 8500000,
    category: 'Virtual Reality',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    stock: 40,
    rating: 4.7,
    brand: 'Sony',
    isNewArrival: true,
    isTopSelling: false
  }
]

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userRole: null,
      products: sampleProducts,
      sales: [],
      payments: [],
      
      // Auth
      login: (username: string, password: string) => {
        if (username === 'admin123' && password === '12345') {
          set({ isAuthenticated: true, userRole: 'admin' })
          return true
        }
        else if (username === 'user123' && password === '12345') {
          set({ isAuthenticated: true, userRole: 'user' })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false, userRole: null }),
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)