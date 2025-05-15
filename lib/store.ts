import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Tipe Produk
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

// Tipe Penjualan
export interface Sale {
  id: string
  customer: string
  product: string
  amount: number
  date: string
  status: 'Pending' | 'Completed' | 'Cancelled'
}

// Tipe Pembayaran
export interface Payment {
  id: string
  amount: number
  status: 'Pending' | 'Completed' | 'Failed'
  method: string
  date: string
  saleId: string
}

// State Admin lengkap
interface AdminState {
  isAuthenticated: boolean
  userRole: 'admin' | 'user' | null

  // Products
  products: Product[]
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  removeProduct: (id: string) => void

  // Auth
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Store Zustand
export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userRole: null,

      // Products
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: (product) => set({ products: [...get().products, product] }),
      removeProduct: (id) =>
        set({ products: get().products.filter((p) => p.id !== id) }),

      // Auth
      login: (username: string, password: string) => {
        if (username === 'admin123' && password === '12345') {
          set({ isAuthenticated: true, userRole: 'admin' })
          return true
        } else if (username === 'user123' && password === '12345') {
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
