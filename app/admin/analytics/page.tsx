"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/lib/store'
import AdminLayout from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface SalesTrendData {
  name: string
  value: number
}

interface CategoryData {
  name: string
  value: number
}

interface AnalyticsData {
  salesTrend: SalesTrendData[]
  categoryData: CategoryData[]
}

export default function AdminAnalytics() {
  const { isAuthenticated, userRole } = useAdminStore()
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    salesTrend: [],
    categoryData: []
  })

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, userRole, router])

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [salesRes, productsRes] = await Promise.all([
          fetch('/api/sales'),
          fetch('/api/products')
        ])

        if (!salesRes.ok || !productsRes.ok) {
          throw new Error('Failed to fetch analytics data')
        }

        const [sales, products] = await Promise.all([
          salesRes.json(),
          productsRes.json()
        ])

        // Process sales trend data
        const salesByMonth = sales.reduce((acc: Record<string, number>, sale: any) => {
          const date = new Date(sale.date)
          const month = date.toLocaleString('default', { month: 'short' })
          acc[month] = (acc[month] || 0) + sale.amount
          return acc
        }, {})

        const salesTrend: SalesTrendData[] = Object.entries(salesByMonth).map(([name, value]) => ({
          name,
          value: Number(value)
        }))

        // Process category data
        const categoryCount = products.reduce((acc: Record<string, number>, product: any) => {
          acc[product.category] = (acc[product.category] || 0) + 1
          return acc
        }, {})

        const categoryData: CategoryData[] = Object.entries(categoryCount).map(([name, value]) => ({
          name,
          value: Number(value)
        }))

        setAnalyticsData({
          salesTrend,
          categoryData
        })
      } catch (error) {
        console.error('Failed to fetch analytics data:', error)
      }
    }

    if (isAuthenticated && userRole === 'admin') {
      fetchAnalyticsData()
    }
  }, [isAuthenticated, userRole])

  if (!isAuthenticated || userRole !== 'admin') {
    return null
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
          <CardHeader>
            <CardTitle>Monthly Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.salesTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}