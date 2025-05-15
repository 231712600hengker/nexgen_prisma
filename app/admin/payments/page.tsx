"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore, type Payment } from '@/lib/store'
import AdminLayout from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Pencil, Trash, Search } from 'lucide-react'
import { useEffect } from 'react'

export default function AdminPayments() {
  const { isAuthenticated, userRole, payments, addPayment, updatePayment, deletePayment } = useAdminStore()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    amount: '',
    status: 'Pending' as const,
    method: '',
    date: '',
    saleId: ''
  })

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, userRole, router])

  if (!isAuthenticated || userRole !== 'admin') {
    return null
  }

  const filteredPayments = payments.filter(payment =>
    payment.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.saleId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const paymentData = {
      amount: Number(formData.amount),
      status: formData.status,
      method: formData.method,
      date: formData.date,
      saleId: formData.saleId
    }

    if (editingPayment) {
      updatePayment({ ...paymentData, id: editingPayment.id })
    } else {
      addPayment(paymentData)
    }

    setFormData({
      amount: '',
      status: 'Pending',
      method: '',
      date: '',
      saleId: ''
    })
    setEditingPayment(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment)
    setFormData({
      amount: payment.amount.toString(),
      status: payment.status,
      method: payment.method,
      date: payment.date,
      saleId: payment.saleId
    })
    setIsDialogOpen(true)
  }

  return (
    <AdminLayout>
      <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment Management</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-custom-subtitle" />
              <Input
                placeholder="Search payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-custom-title/20"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-navy-800 text-white">
                <DialogHeader>
                  <DialogTitle>{editingPayment ? 'Edit Payment' : 'Add New Payment'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="bg-white/5"
                  />
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'Pending' | 'Completed' | 'Failed') => 
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="bg-white/5">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Payment Method"
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-white/5"
                  />
                  <Input
                    placeholder="Sale ID"
                    value={formData.saleId}
                    onChange={(e) => setFormData({ ...formData, saleId: e.target.value })}
                    className="bg-white/5"
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    {editingPayment ? 'Update Payment' : 'Add Payment'}
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
                <TableHead className="text-white">Payment ID</TableHead>
                <TableHead className="text-white">Amount</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Method</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Sale ID</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="text-white">{payment.id}</TableCell>
                  <TableCell className="text-white">${payment.amount}</TableCell>
                  <TableCell className="text-white">{payment.status}</TableCell>
                  <TableCell className="text-white">{payment.method}</TableCell>
                  <TableCell className="text-white">{payment.date}</TableCell>
                  <TableCell className="text-white">{payment.saleId}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(payment)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletePayment(payment.id)}
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