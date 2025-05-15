"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/lib/store'
import ProductDetail from '@/components/product-detail'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isAuthenticated, userRole } = useAdminStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else if (userRole === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole === 'admin') {
    return null
  }

  return <ProductDetail productId={params.id} />
}