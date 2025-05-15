"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/lib/store'
import AdminLayout from '@/components/admin-layout'
import ProductManagement from '@/components/product-management'

export default function AdminProducts() {
  const { isAuthenticated, userRole } = useAdminStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole !== 'admin') {
    return null
  }

  return (
    <AdminLayout>
      <ProductManagement />
    </AdminLayout>
  )
}