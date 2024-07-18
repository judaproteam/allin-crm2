"use server"

import { revalidatePath } from "next/cache"
import { db } from "../db"

export async function insertSale(sale) {
  let res

  let agnt2, agnt2Share, agntShare
  if (sale.details.agnt2Id) {
    agnt2 = { connect: { id: parseInt(sale.details.agnt2Id) } }
    agnt2Share = parseInt(sale.details.agnt2Share)
    agntShare = parseInt(sale.details.agntShare)
  }

  for (let i = 0; i < sale.prdcts.length; i++) {
    const prdct = sale.prdcts[i]

    res = await db.sale.create({
      data: {
        offrDt: sale.details.offrDt ? new Date(sale.details.offrDt) : new Date(Date.now()),

        client: {
          connectOrCreate: {
            where: {
              idNum: parseInt(sale.details.idNum),
            },
            create: {
              firstName: sale.details.clientFirstName,
              lastName: sale.details.clientLastName,
              idNum: parseInt(sale.details.idNum),
            },
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
        prdctType: prdct.prdctType,
        pay: parseFloat(prdct.pay),
        status: prdct.status,
      },
    })
  }

  console.log(res)

  revalidatePath("/sales")
  return res
}

// agntShare: "50",
// agnt2Id: "21",
// agnt2Share: "50",

//   const sale = {
//     details: {
//       agntId: "21",
//       offrDt: "2024-07-02",
//       clientFirstName: "dss",
//       clientLastName: "dsdfdsfds",
//       idNum: "121324424",
//     },

//     prdcts: [
//       {
//         company: "כלל",
//         branch: "פנסיוני",
//         prdct: "קרן פנסיה מקיפה",
//         prdctType: "ניוד",
//         pay: "33",
//         status: "נגנז",
//       },
//     ],
//   }
