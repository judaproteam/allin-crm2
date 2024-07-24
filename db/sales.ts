'use server'

import { db } from '../utils/db'

const sales = db.sale

export async function getSales() {
  const res = await sales.findMany({
    select: {
      id: true,
      offrDt: true,
      status: true,
      action: true,
      company: true,
      branch: true,
      prdct: true,
      saleDt: true,
      prdctType: true,
      pay: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          idNum: true,
        },
      },
      agnt: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  const formated = res.map((item) => {
    const clientData = `${item.client.firstName} ${item.client.lastName} (${item.client.idNum})`
    const agntName = `${item.agnt.firstName} ${item.agnt.lastName}`

    return { ...item, clientData, agntName }
  })

  return formated
}

// export const salesByClient = async (clientId: number) => {
//   return await sales.findMany({
//     where: {
//       clientId: clientId,
//     },
//     include: {
//       client: true,
//       agnt: true,
//     },
//   })
// }

// export const salesByAgnt = async (agntId: number) => {
//   return await sales.findMany({
//     where: {
//       agntId: agntId,
//     },
//     include: {
//       client: true,
//       agnt: true,
//     },
//   })
// }

// export const salesByClientAndAgnt = async (clientId: number, agntId: number) => {
//   return await sales.findMany({
//     where: { clientId, agntId },
//     include: {
//       client: true,
//       agnt: true,
//     },
//   })
// }

// export const salesByClientAndAgntAndBranch = async (
//   clientId: number,
//   agntId: number,
//   branch: string
// ) => {
//   return await sales.findMany({
//     where: {
//       clientId: clientId,
//       agntId: agntId,
//       branch: branch,
//     },
//     include: {
//       client: true,
//       agnt: true,
//     },
//   })
// }
