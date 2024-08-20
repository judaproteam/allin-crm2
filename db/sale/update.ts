'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function updateManySaleStatus(saleIds: number[], status: string) {
  const res = await db.sale.updateMany({
    where: { id: { in: saleIds } },
    data: { status },
  })

  revalidatePath('/')
  return res
}

export async function updateSaleStatus(saleId: number, status: string) {
  const res = await db.sale.update({
    where: { id: saleId },
    data: { status },
  })

  console.log(res)

  revalidatePath('/')
  return res
}

export async function updateSale(saleId: number, data: any) {
  const res = await db.sale.update({
    where: { id: saleId },
    data,
  })

  console.log(res)

  revalidatePath('/')
  return res
}
