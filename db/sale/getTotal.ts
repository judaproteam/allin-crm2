import { db } from '../db'
import { getUser } from '@/auth/authFuncs'
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

export async function getSaleTableData({ filter }) {
  filter = await formatFilter(filter)

  const res = await db.sale.findMany({
    where: filter,
    select: {
      id: true,
      action: true,
      offrDt: true,
      prdct: true,
      prdctType: true,
      pay: true,
      status: true,
      branch: true,
      company: true,
      client: { select: { id: true, details: true, firstName: true, lastName: true, idNum: true } },
      agnt: { select: { id: true, name: true } },
      agnt2: { select: { id: true, name: true } },
    },
  })

  const formated = res.map((item) => {
    const clientData = item.client.details
    const agntName = item.agnt2 ? `${item.agnt.name} & ${item.agnt2.name}` : item.agnt.name

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
  const user = await getUser()

  if (user.role === 'AGNT') filter.agntId = user.id
  if (filter.agntId) {
    const agntId = Number(filter.agntId)
    filter.OR = [{ agntId }, { agnt2Id: agntId }]

    delete filter.agntId
  }

  if (filter.branchBox) {
    filter.branch = filter.branchBox.split('-')[0]
    filter.prdctType = filter.branchBox.split('-')[1]
    delete filter.branchBox
  }

  return filter
}
