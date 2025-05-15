"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore, type Product } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ProductDetail({ productId }: { productId: string }) {
  const router = useRouter()
  const { products, isAuthenticated, userRole } = useAdminStore()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    } else if (userRole === 'admin') {
      router.push('/admin/dashboard')
    } else {
      const foundProduct = products.find(p => p.id === productId)
      setProduct(foundProduct || null)
    }
  }, [isAuthenticated, userRole, router, products, productId])

  if (!isAuthenticated || userRole === 'admin' || !product) {
    return null
  }

  return (
    <div className="min-h-screen bg-custom-base py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/shop" className="inline-flex items-center text-custom-subtitle hover:text-custom-title mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-custom-sub-base/50 backdrop-blur-sm border border-custom-title/20">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-custom-title mb-2">{product.name}</h1>
              <p className="text-custom-subtitle">{product.category}</p>
            </div>

            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.floor(product.rating || 0) }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-custom-title text-custom-title" />
              ))}
              <span className="text-custom-subtitle">({product.rating})</span>
            </div>

            <div>
              <p className="text-3xl font-bold text-custom-title">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
              <p className="text-custom-subtitle mt-2">
                Stock: {product.stock} units available
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-custom-title mb-2">Description</h2>
              <p className="text-custom-subtitle">{product.description}</p>
            </div>

            {product.brand && (
              <div>
                <h2 className="text-xl font-semibold text-custom-title mb-2">Brand</h2>
                <p className="text-custom-subtitle">{product.brand}</p>
              </div>
            )}

            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-custom-sub-base/50 rounded-2xl backdrop-blur-sm border border-custom-title/20">
            <h3 className="text-lg font-semibold text-custom-title mb-3">Free Shipping</h3>
            <p className="text-custom-subtitle">Free shipping on orders over Rp 1.000.000</p>
          </div>
          <div className="p-6 bg-custom-sub-base/50 rounded-2xl backdrop-blur-sm border border-custom-title/20">
            <h3 className="text-lg font-semibold text-custom-title mb-3">Warranty</h3>
            <p className="text-custom-subtitle">2 years manufacturer warranty included</p>
          </div>
          <div className="p-6 bg-custom-sub-base/50 rounded-2xl backdrop-blur-sm border border-custom-title/20">
            <h3 className="text-lg font-semibold text-custom-title mb-3">Secure Payment</h3>
            <p className="text-custom-subtitle">Multiple payment methods available</p>
          </div>
        </div>
      </div>
    </div>
  )
}