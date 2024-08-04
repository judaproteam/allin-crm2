import { formatAgntsTotal, mapAgnts } from '@/utils/formatFuncs'
import { db } from './db'

export async function getAllAgnts() {
  const res = await db.agnt.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  mapAgnts(res)
  return res
}

export async function getMapAgnts() {
  const res = await getAllAgnts()

  return mapAgnts(res)
}

export async function getAgntsTotal() {
  const res = await db.sale.groupBy({
    by: ['branch', 'prdctType', 'agntId'],
    _sum: {
      agntPay: true,
      agnt2Pay: true,
      agntTotal: true,
    },
  })

  // return res
  return formatAgntsTotal(res)
}
