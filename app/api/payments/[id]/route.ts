import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const payment = await prisma.payment.update({
      where: { id: params.id },
      data: {
        ...data,
        date: new Date(data.date)
      }
    })
    return NextResponse.json(payment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.payment.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Payment deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete payment' }, { status: 500 })
  }
}