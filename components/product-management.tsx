"use client"

import { useState } from 'react'
import { useAdminStore, type Product } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Pencil, Trash, Search } from 'lucide-react'

export default function ProductManagement() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdminStore()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  })

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image,
      stock: Number(formData.stock)
    }

    if (editingProduct) {
      updateProduct({ ...productData, id: editingProduct.id })
    } else {
      addProduct(productData)
    }

    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      stock: ''
    })
    setEditingProduct(null)
    setIsAddDialogOpen(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      stock: product.stock.toString()
    })
    setIsAddDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Product Management</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-custom-subtitle" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-custom-title/20"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-navy-800 text-white">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    type="number"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="bg-white/5"
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white">Stock</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-white">{product.name}</TableCell>
                  <TableCell className="text-white">{product.category}</TableCell>
                  <TableCell className="text-white">${product.price}</TableCell>
                  <TableCell className="text-white">{product.stock}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}