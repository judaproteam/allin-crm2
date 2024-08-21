'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'

export async function updateSale({ updatedData, sale }) {
  const { total, agntTotal, agnt2Total } = getSaleCalc(sale)
  const data = { ...updatedData, pay: Number(updatedData.pay), total, agntTotal, agnt2Total }

  const res = await db.sale.update({
    where: { id: sale.id },
    data,
  })

  revalidatePath('/')
  return res
}

function getSaleCalc(sale) {
  const saleCalc = { total: 0, agntTotal: 0, agnt2Total: 0 }

  let sumTotal = 0

  // משוקלל
  if (sale.branch === 'פנסיוני' && sale.prdctType === 'הפקדה חודשית') {
    sumTotal = sale.pay * 12 * 0.15
  }

  if (sale.branch === 'פיננסי') {
    sale.prdctType === 'הפקדה חודשית'
      ? (sumTotal += sale.pay * 12 * 0.01)
      : (sumTotal += sale.pay * 0.01)
  }
  if (sale.branch === 'פנסיוני' && sale.prdctType === 'ניוד') {
    sumTotal += sale.pay * 0.01
  }
  if (sale.branch === 'סיכונים') {
    sumTotal += sale.pay
  }

  if (sale.agnt2Share) {
    saleCalc.agntTotal = sumTotal * (sale.agntShare / 100)
    saleCalc.agnt2Total = sumTotal * (sale.agnt2Share / 100)
  } else {
    saleCalc.agntTotal = sumTotal
  }

  saleCalc.total = sumTotal
  return saleCalc
}

// ORIGINAL
// {
//   "id": 31,
//   "action": "מכירה",
//   "offrDt": "2024-08-08T19:56:17.587Z",
//   "prdct": "קרן פנסיה מקיפה",
//   "prdctType": "הפקדה חודשית",
//   "pay": 4334534,
//   "status": "בוצע הפקדה ראשונה",
//   "branch": "פנסיוני",
//   "company": "הראל",
//   "client": {
//       "id": 17,
//       "details": "sdfds sdfsd (234234)",
//       "firstName": "sdfds",
//       "lastName": "sdfsd",
//       "idNum": 234234
//   },
//   "agnt": {
//       "id": 85,
//       "name": "יהודה צבי"
//   },
//   "agnt2": null,
//   "clientData": "sdfds sdfsd (234234)",
//   "agntName": "יהודה צבי"
// }
