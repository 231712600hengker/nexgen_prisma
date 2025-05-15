import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AdminState {
  isAuthenticated: boolean
  userRole: 'admin' | 'user' | null
  
  // Auth
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userRole: null,
      
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