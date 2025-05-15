"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Eye } from 'lucide-react'
import Link from 'next/link'

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
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

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

    fetchProducts()
  }, [])

  const categories = ['all', ...new Set(products.map(product => product.category))]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                         product.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-custom-base py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-custom-title mb-8">Our Products</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-1/3 bg-custom-sub-base/50 border-custom-title/20 text-custom-subtitle placeholder:text-custom-subtitle/60"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-1/4 bg-custom-sub-base/50 border-custom-title/20 text-custom-subtitle">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-custom-sub-base border-custom-title/20">
              {categories.map(category => (
                <SelectItem key={category} value={category} className="text-custom-subtitle hover:text-custom-title hover:bg-custom-base">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group bg-custom-sub-base/50 backdrop-blur-lg border-custom-title/20 transform hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-custom-title">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <Link href={`/shop/${product.id}`}>
                    <Button 
                      className="absolute bottom-6 right-2 bg-custom-base/90 hover:bg-custom-base text-custom-title"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
                <p className="text-custom-subtitle mb-2">{product.description}</p>
                <p className="text-xl font-bold text-custom-title">Rp {product.price.toLocaleString('id-ID')}</p>
                <p className="text-sm text-custom-subtitle">Stock: {product.stock}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}