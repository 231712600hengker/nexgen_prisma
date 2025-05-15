"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Package, Home, LogOut, ShoppingCart, CreditCard, BarChart2 } from 'lucide-react'
import { useAdminStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const logout = useAdminStore(state => state.logout)

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Sales', href: '/admin/sales', icon: ShoppingCart },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  ]

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-custom-base to-custom-sub-base">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-custom-sub-base/90 backdrop-blur-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Package className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-2">Admin Panel</span>}
          </Button>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    pathname === item.href ? 'bg-custom-base/50' : ''
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {isSidebarOpen && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            )
          })}
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}