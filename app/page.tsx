"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/lib/store'
import HeroSection from '@/components/home/hero-section'
import BrandsSection from '@/components/home/brands-section'
import ProductSection from '@/components/home/product-section'
import FeaturesSection from '@/components/home/features-section'
import TestimonialsSection from '@/components/home/testimonials-section'
import NewsletterSection from '@/components/home/newsletter-section'

interface Product {
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

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, userRole } = useAdminStore()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else if (userRole === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, userRole, router])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts([])
      }
    }

    if (isAuthenticated && userRole === 'user') {
      fetchProducts()
    }
  }, [isAuthenticated, userRole])

  if (!isAuthenticated || userRole === 'admin') {
    return null
  }

  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4)
  const topSelling = products.filter(p => p.isTopSelling).slice(0, 4)

  return (
    <div className="min-h-screen bg-custom-base">
      <HeroSection />
      <BrandsSection />
      <ProductSection title="NEW ARRIVALS" products={newArrivals} />
      <FeaturesSection />
      <ProductSection title="TOP SELLING" products={topSelling} />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}