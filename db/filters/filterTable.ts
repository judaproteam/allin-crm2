'use server'

import { db } from '../db'

export default async function filterTable(objToFilter) {
  const res = await db.sale.findMany({
    where: objToFilter,
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
