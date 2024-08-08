'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'
import { Client, Sale } from '@prisma/client'
import { getCrntUser } from '@/auth/authFuncs'

let agnt2Id, isAgnt2

export async function insertSale(sale) {
  const crntUser = await getCrntUser()

  let res
  isAgnt2 = !!Number(sale.details.agnt2Share)
  agnt2Id = sale.details.agnt2Id

  let agnt2, agnt2Share, agntShare
  if (isAgnt2) {
    agnt2 = { connect: { id: parseInt(agnt2Id) } }
    agnt2Share = parseInt(sale.details.agnt2Share)
    agntShare = parseInt(sale.details.agntShare)
  }

  const clientData = {
    firstName: sale.details.clientFirstName,
    lastName: sale.details.clientLastName,
    idNum: parseInt(sale.details.idNum),
    createdById: crntUser.id,
  } as Client

  const prdctTypeList = ['ניוד', 'הפקדה חודשית', 'הפקדה חד פעמית']

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

      for (const prdct of prdctsArr as Sale[]) {
        prdct.pay = Number(prdct.pay)

        if (isAgnt2) {
          prdct.agntPay = prdct.pay * (agntShare / 100)
          prdct.agnt2Pay = prdct.pay * (agnt2Share / 100)
        } else {
          prdct.agntPay = prdct.pay
        }

        if (prdct.prdct === 'תאונות אישיות') prdct.branch = 'תאונות אישיות'

        // חישוב משוקלל
        const saleCalc = getSaleCalc({
          prdct,
          agntShare,
          agnt2Share,
        })

        res = await db.sale.create({
          data: {
            company: prdct.company,
            branch: prdct.branch,
            prdct: prdct.prdct,
            status: prdct.status,
            prdctType: prdct.prdctType,
            pay: prdct.pay,
            agntPay: prdct.agntPay,
            agnt2Pay: prdct.agnt2Pay,

            createdBy: { connect: { id: crntUser.id } },

            ...saleCalc,

            offrDt: sale.details.offrDt ? new Date(sale.details.offrDt) : new Date(Date.now()),

            client: {
              connectOrCreate: {
                where: {
                  idNum: clientData.idNum,
                },
                create: clientData,
              },
            },

            agnt: { connect: { id: parseInt(sale.details.agntId) } },

            agntShare,
            agnt2,
            agnt2Share,
          },
        })
      }
      // end of transaction
    }
  } catch (error: any) {
    console.error(error.message)

    return { err: error.message }
  }

  // revalidatePath('/')
  return res
}

function getSaleCalc({ prdct, agntShare, agnt2Share }) {
  const saleCalc = { total: 0, agntTotal: 0, agnt2Total: 0 }

  let sumTotal = 0

  // משוקלל
  if (prdct.branch === 'פנסיוני' && prdct.prdctType === 'הפקדה חודשית') {
    sumTotal = prdct.pay * 12 * 0.15
  }

  if (prdct.branch === 'פיננסי') {
    prdct.prdctType === 'הפקדה חודשית'
      ? (sumTotal += prdct.pay * 12 * 0.01)
      : (sumTotal += prdct.pay * 0.01)
  }
  if (prdct.branch === 'פנסיוני' && prdct.prdctType === 'ניוד') {
    sumTotal += prdct.pay * 0.01
  }
  if (prdct.branch === 'סיכונים') {
    sumTotal += prdct.pay
  }

  if (isAgnt2) {
    saleCalc.agntTotal = sumTotal * (agntShare / 100)
    saleCalc.agnt2Total = sumTotal * (agnt2Share / 100)
  } else {
    saleCalc.agntTotal = sumTotal
  }

  saleCalc.total = sumTotal
  return saleCalc
}
