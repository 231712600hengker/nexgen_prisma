import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const sale = await prisma.sale.update({
      where: { id: params.id },
      data: {
        ...data,
        date: new Date(data.date)
      }
    })
    return NextResponse.json(sale)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update sale' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.sale.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Sale deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete sale' }, { status: 500 })
  }
}