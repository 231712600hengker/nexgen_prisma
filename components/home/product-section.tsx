"use client"

import Link from 'next/link'
import { Star, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/store'

interface ProductSectionProps {
  title: string
  products: Product[]
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <section className="py-16 bg-custom-base">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-custom-title">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-custom-sub-base rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border border-custom-title/20">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-custom-base opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <Link href={`/shop/${product.id}`}>
                  <Button 
                    className="absolute bottom-4 right-4 bg-custom-base/90 hover:bg-custom-base text-custom-title"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-custom-title">{product.name}</h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {Array.from({ length: Math.floor(product.rating || 0) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-custom-title text-custom-title" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-custom-subtitle">({product.rating})</span>
                </div>
                <p className="mt-2 font-bold text-custom-title">Rp {product.price.toLocaleString('id-ID')}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/shop">
            <Button variant="outline" size="lg" className="rounded-full border-custom-title text-custom-title hover:bg-custom-sub-base transition-all duration-300">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}