'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'

export async function insertSale(sale) {
  let res

  let agnt2, agnt2Share, agntShare
  if (sale.details.agnt2Id) {
    agnt2 = { connect: { id: parseInt(sale.details.agnt2Id) } }
    agnt2Share = parseInt(sale.details.agnt2Share)
    agntShare = parseInt(sale.details.agntShare)
  }

  const clientData = {
    firstName: sale.details.clientFirstName,
    lastName: sale.details.clientLastName,
    idNum: parseInt(sale.details.idNum),
  }

  const prdctTypeList = ['ניוד', 'הפקדה חודשית', 'הפקדה חד פעמית']

  for (const mainPrdct of sale.prdcts) {
    const prdctsArr = []

    if (!mainPrdct.pay) {
      for (const prdctType of prdctTypeList) {
        if (mainPrdct[prdctType]) {
          prdctsArr.push({ ...mainPrdct, pay: mainPrdct[prdctType], prdctType: prdctType })
        }
      }
    } else {
      prdctsArr.push(mainPrdct)
    }

    for (const prdct of prdctsArr) {
      res = await db.sale.create({
        data: {
          offrDt: sale.details.offrDt ? new Date(sale.details.offrDt) : new Date(Date.now()),

          client: {
            connectOrCreate: {
              where: {
                idNum: clientData.idNum,
              },
              create: clientData,
            },
          },

          agnt: {
            connect: {
              id: parseInt(sale.details.agntId),
            },
          },

          agntShare,
          agnt2,
          agnt2Share,

          company: prdct.company,
          branch: prdct.branch,
          prdct: prdct.prdct,
          status: prdct.status,

          prdctType: prdct.prdctType,
          pay: parseFloat(prdct.pay),
        },
      })
    }
    // end of transaction
  }

  console.log(res)

  revalidatePath('/sales')
  return res
}
