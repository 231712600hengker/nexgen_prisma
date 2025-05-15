"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/lib/store'
import AdminLayout from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DashboardData {
  totalSales: number
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  salesData: Array<{ name: string; sales: number }>
}

export default function AdminDashboard() {
  const { isAuthenticated, userRole } = useAdminStore()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalSales: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    salesData: []
  })

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, userRole, router])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [salesRes, productsRes, paymentsRes] = await Promise.all([
          fetch('/api/sales'),
          fetch('/api/products'),
          fetch('/api/payments')
        ])

        if (!salesRes.ok || !productsRes.ok || !paymentsRes.ok) {
          throw new Error('Failed to fetch dashboard data')
        }

        const [sales, products, payments] = await Promise.all([
          salesRes.json(),
          productsRes.json(),
          paymentsRes.json()
        ])

        // Calculate total sales amount
        const totalSalesAmount = payments.reduce((sum: number, payment: any) => 
          sum + (payment.status === 'Completed' ? payment.amount : 0), 0)

        // Get unique customers
        const uniqueCustomers = new Set(sales.map((sale: any) => sale.customer))

        // Group sales by month for chart
        const salesByMonth = sales.reduce((acc: Record<string, number>, sale: any) => {
          const date = new Date(sale.date)
          const month = date.toLocaleString('default', { month: 'short' })
          acc[month] = (acc[month] || 0) + sale.amount
          return acc
        }, {})

        const chartData = Object.entries(salesByMonth).map(([name, sales]) => ({
          name,
          sales: Number(sales)
        }))

        setDashboardData({
          totalSales: totalSalesAmount,
          totalProducts: products.length,
          totalOrders: sales.length,
          totalCustomers: uniqueCustomers.size,
          salesData: chartData
        })
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }

    if (isAuthenticated && userRole === 'admin') {
      fetchDashboardData()
    }
  }, [isAuthenticated, userRole])

  if (!isAuthenticated || userRole !== 'admin') {
    return null
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Rp {dashboardData.totalSales.toLocaleString('id-ID')}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.totalProducts}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}