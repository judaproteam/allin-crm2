import { db } from '../db'
import { formatTotalAgnts } from '../sale/format'

export async function getAllAgnts() {
  const res = await db.agnt.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return res
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

  return formatTotalAgnts(res)
}

export async function getAgntsTotalByDate() {
  const res = await db.sale.groupBy({
    // where: {
    //   offrDt: { lte: new Date() },

    // },
    by: ['branch', 'prdctType', 'agntId'],
    _sum: {
      agntPay: true,
      agnt2Pay: true,
      agntTotal: true,
    },
  })

  return formatTotalAgnts(res)
}

export async function getMapAgnts() {
  console.log('getMapAgnts')

  const agnts = await getAllAgnts()
  const agntMap = {}
  agnts.forEach((agnt) => (agntMap[agnt.id] = agnt))

  return agntMap
}
