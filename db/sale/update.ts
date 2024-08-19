'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function updateSaleStatus(saleIds: number[], status: string) {
  const res = await db.sale.updateMany({
    where: { id: { in: saleIds } },
    data: { status },
  })

  revalidatePath('/')
  return res
}
