'use server'

import { db } from '../db'

const sales = db.sale

export async function getSales({ filter }) {
  const orderBy = { [filter.orderBy]: filter.direction }
  delete filter.orderBy
  delete filter.direction

  // offrDt: {
  //   gte: startDate,
  //   lte: endDate,
  // },

  if (filter.gte && filter.lte) {
    filter.offrDt = {
      gte: new Date(filter.gte).toISOString(),
      lte: new Date(filter.lte).toISOString(),
    }
  }
  delete filter.gte
  delete filter.lte

  const res = await sales.findMany({
    where: filter,
    include: {
      client: true,
      agnt: true,
      agnt2: true,
    },
    orderBy,
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

// select: {
//   id: true,
//   offrDt: true,
//   status: true,
//   action: true,
//   company: true,
//   branch: true,
//   prdct: true,
//   saleDt: true,
//   prdctType: true,
//   pay: true,
//   client: {
//     select: {
//       id: true,
//       firstName: true,
//       lastName: true,
//       idNum: true,
//     },
//   },
//   agnt: {
//     select: {
//       id: true,
//       firstName: true,
//       lastName: true,
//     },
//   },
//   agnt2: {
//     select: {
//       id: true,
//       firstName: true,
//       lastName: true,
//     },
//   },
// },
