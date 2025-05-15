"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore, type Sale } from '@/lib/store'
import AdminLayout from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Pencil, Trash, Search } from 'lucide-react'
import { useEffect } from 'react'

export default function AdminSales() {
  const { isAuthenticated, userRole, sales, addSale, updateSale, deleteSale } = useAdminStore()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSale, setEditingSale] = useState<Sale | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    customer: '',
    product: '',
    amount: '',
    date: '',
    status: 'Pending' as const
  })

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole !== 'admin') {
    return null
  }

  const filteredSales = sales.filter(sale =>
    sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const saleData = {
      customer: formData.customer,
      product: formData.product,
      amount: Number(formData.amount),
      date: formData.date,
      status: formData.status
    }

    if (editingSale) {
      updateSale({ ...saleData, id: editingSale.id })
    } else {
      addSale(saleData)
    }

    setFormData({
      customer: '',
      product: '',
      amount: '',
      date: '',
      status: 'Pending'
    })
    setEditingSale(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (sale: Sale) => {
    setEditingSale(sale)
    setFormData({
      customer: sale.customer,
      product: sale.product,
      amount: sale.amount.toString(),
      date: sale.date,
      status: sale.status
    })
    setIsDialogOpen(true)
  }

  return (
    <AdminLayout>
      <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Management</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-custom-subtitle" />
              <Input
                placeholder="Search sales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-custom-title/20"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sale
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-navy-800 text-white">
                <DialogHeader>
                  <DialogTitle>{editingSale ? 'Edit Sale' : 'Add New Sale'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Customer Name"
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    placeholder="Product Name"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-white/5"
                  />
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'Pending' | 'Completed' | 'Cancelled') => 
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="bg-white/5">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    {editingSale ? 'Update Sale' : 'Add Sale'}
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
                <TableHead className="text-white">Order ID</TableHead>
                <TableHead className="text-white">Customer</TableHead>
                <TableHead className="text-white">Product</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="text-white">#{sale.id}</TableCell>
                  <TableCell className="text-white">{sale.customer}</TableCell>
                  <TableCell className="text-white">{sale.product}</TableCell>
                  <TableCell className="text-white">${sale.amount}</TableCell>
                  <TableCell className="text-white">{sale.date}</TableCell>
                  <TableCell className="text-white">{sale.status}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(sale)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSale(sale.id)}
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
    </AdminLayout>
  )
}