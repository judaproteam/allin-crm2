'use server'

import { db } from '@/db/db'

export async function updateSaleStatus(saleIds: number[], status: string) {
  const res = await db.sale.updateMany({
    where: { id: { in: saleIds } },
    data: { status },
  })

  return res
}
