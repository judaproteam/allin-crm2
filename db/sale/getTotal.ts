import { db } from '../db'
import { getCrntUser } from '@/auth/authFuncs'
import { formatTotalSales } from './format'

export async function getTotal({ filter }) {
  filter = await formatFilter(filter)

  const res = await db.sale.aggregate({
    where: filter,
    _sum: {
      total: true,
    },
  })

  return res
}

db.sale.findMany({
  where: {},
})

export async function getPayBranch({ filter }) {
  filter = await formatFilter(filter)

  const res = await db.sale.groupBy({
    where: filter,
    by: ['branch', 'prdctType'],
    _sum: {
      pay: true,
    },
  })

  return formatTotalSales(res)
}

export async function getTableData({ filter }) {
  filter = await formatFilter(filter)

  const res = await db.sale.findMany({
    where: filter,
    include: {
      client: true,
      agnt: true,
      agnt2: true,
    },
  })

  const formated = res.map((item) => {
    const clientData = `${item.client.firstName} ${item.client.lastName} (${item.client.idNum})`
    let agntName = `${item.agnt.firstName} ${item.agnt.lastName}`
    if (item.agnt2) {
      agntName = `${item.agnt.firstName} ${item.agnt.lastName} & ${item.agnt2.firstName} ${item.agnt2.lastName}`
    }

    return { ...item, clientData, agntName }
  })

  return formated
}

async function formatFilter(filter) {
  if (filter.gte && filter.lte) {
    filter.offrDt = {
      gte: new Date(filter.gte).toISOString(),
      lte: new Date(filter.lte).toISOString(),
    }
  }
  delete filter.gte
  delete filter.lte
  const user = await getCrntUser()

  if (user.role === 'AGNT') filter.agntId = user.id
  if (filter.agntId) {
    const agntId = Number(filter.agntId)
    filter.OR = [{ agntId }, { agnt2Id: agntId }]

    delete filter.agntId
  }

  return filter
}
