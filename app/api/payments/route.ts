import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const payments = await prisma.payment.findMany()
    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const payment = await prisma.payment.create({
      data: {
        ...data,
        date: new Date(data.date)
      }
    })
    return NextResponse.json(payment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}