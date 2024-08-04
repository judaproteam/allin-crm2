'use server'

import { groupByAgntSales } from '@/utils/func'
import { db } from '../db'

export async function getSumByAgnt() {
  const res = await db.sale.groupBy({
    by: ['branch', 'prdctType', 'agntId'],
    _sum: {
      pay: true,
    },
  })

  const pRisk = await db.sale.groupBy({
    where: { prdct: 'תאונות אישיות' },
    by: ['prdct', 'agntId'],
    _sum: {
      pay: true,
    },
  })

  return groupByAgntSales(res)
}

// pRisk [ { _sum: { pay: 323 }, prdct: 'תאונות אישיות', agntId: 62 } ]
