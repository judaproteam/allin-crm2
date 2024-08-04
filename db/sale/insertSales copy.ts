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

  console.log('sale.prdcts: ', sale.prdcts)

  try {
    for (const mainPrdct of sale.prdcts) {
      const prdctsArr = []

      if (!mainPrdct.pay) {
        for (const prdctType of prdctTypeList) {
          if (mainPrdct[prdctType]) {
            prdctsArr.push({ ...mainPrdct, pay: mainPrdct[prdctType], prdctType })
          }
        }
      } else {
        prdctsArr.push(mainPrdct)
      }

      for (const prdct of prdctsArr) {
        res = await db.sale.create({
          data: {
            company: prdct.company,
            branch: prdct.branch,
            prdct: prdct.prdct,
            status: prdct.status,
            prdctType: prdct.prdctType,
            pay: parseFloat(prdct.pay),

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
          },
        })
      }
      // end of transaction
    }
  } catch (error: any) {
    return { err: error.message }
  }

  revalidatePath('/')
  return res
}

const Tmpprdcts = [
  {
    company: 'הראל',
    branch: 'פנסיוני',
    prdct: 'קרן פנסיה מקיפה',
    ניוד: '7888',
    'הפקדה חודשית': '338',
    status: 'נגנז',
  },
  {
    company: 'הראל',
    branch: 'פיננסי',
    prdct: 'קופת גמל',
    ניוד: '4409',
    'הפקדה חודשית': '387',
    'הפקדה חד פעמית': '1000',
    status: 'נגנז',
  },
  {
    company: 'הראל',
    branch: 'סיכונים',
    prdct: 'תאונות אישיות',
    prdctType: 'פרמיה חודשית',
    pay: '2400',
    status: 'נגנז',
  },
]
