'use server'

import { db } from '../db'

export async function getPrdctByBranch(branch: string) {
  const sales = await db.sale.findMany({
    where: { branch },
  })
  // const sales = mockSalesData; // Replace with actual DB call when ready

  let result: { [key: string]: number | boolean } = {}

  switch (branch) {
    case 'פנסיוני':
      // סה"כ for ניוד
      const pensionMobility = sales
        .filter((sale) => sale.prdctType === 'ניוד' && sale.branch === 'פנסיוני')
        .reduce((sum, sale) => sum + sale.pay, 0)

      // סה"כ for הפקדה חודשית and multiply by 12
      const pensionMonthlyDeposit =
        sales
          .filter((sale) => sale.prdctType === 'הפקדה חודשית' && sale.branch === 'פנסיוני')
          .reduce((sum, sale) => sum + sale.pay, 0) * 12

      result = {
        ניוד: pensionMobility,
        'הפקדה חודשית': pensionMonthlyDeposit,
      }
      break

    case 'פיננסי':
      // סה"כ for ניוד
      const financeMobility = sales
        .filter((sale) => sale.prdctType === 'ניוד' && sale.branch === 'פיננסי')
        .reduce((sum, sale) => sum + sale.pay, 0)

      // סה"כ for הפקדה חודשית and multiply by 12
      const financeMonthlyDeposit =
        sales
          .filter((sale) => sale.prdctType === 'הפקדה חודשית' && sale.branch === 'פיננסי')
          .reduce((sum, sale) => sum + sale.pay, 0) * 12

      const oneTimeDeposit = sales
        .filter((sale) => sale.prdctType === 'הפקדה חד פעמית' && sale.branch === 'פיננסי')
        .reduce((sum, sale) => sum + sale.pay, 0)

      result = {
        ניוד: financeMobility,
        'הפקדה חודשית': financeMonthlyDeposit,
        'הפקדה חד פעמית': oneTimeDeposit,
      }
      break

    case 'סיכונים':
      // סה"כ for פרמיה חודשית
      const risks = sales
        .filter((sale) => sale.prdctType === 'פרמיה חודשית' && sale.branch === 'סיכונים')
        .reduce((sum, sale) => sum + sale.pay, 0)

      const personalAccidents = sales
        .filter((sale) => sale.prdctType === 'תאונות אישיות' && sale.branch === 'סיכונים')
        .reduce((sum, sale) => sum + sale.pay, 0)

      result = {
        'פרמיה חודשית': risks,
        'תאונות אישיות': personalAccidents,
      }
      break

    case 'נסיעות לחול':
      // סה"כ for פרמיה חד פעמית
      const travel = sales
        .filter((sale) => sale.prdctType === 'פרמיה חד פעמית' && sale.branch === 'נסיעות לחול')
        .reduce((sum, sale) => sum + sale.pay, 0)

      result = {
        'פרמיה חד פעמית': travel,
      }
      break

    case 'אלמנטרי':
      // סה"כ for פרמיה חד פעמית
      const elementry = sales
        .filter((sale) => sale.prdctType === 'פרמיה חד פעמית' && sale.branch === 'אלמנטרי')
        .reduce((sum, sale) => sum + sale.pay, 0)

      result = {
        'פרמיה חד פעמית': elementry,
      }
      break

    case 'כתב שירות חיצוני':
      // סה"כ for פרמיה חודשית
      const externalService = sales
        .filter((sale) => sale.prdctType === 'פרמיה חודשית' && sale.branch === 'כתב שירות חיצוני')
        .reduce((sum, sale) => sum + sale.pay, 0)

      result = {
        'פרמיה חודשית': externalService,
      }
      break

    case 'אכ"ע':
      // סה"כ for פרמיה חודשית
      const work = sales
        .filter((sale) => sale.prdctType === 'פרמיה חודשית' && sale.branch === 'אכ"ע')
        .reduce((sum, sale) => sum + sale.pay, 0)

      result = {
        'פרמיה חודשית': work,
      }
      break

    case 'קצבה מיידית':
      // סה"כ for ניוד
      const immediatePension = sales
        .filter((sale) => sale.prdctType === 'ניוד' && sale.branch === 'קצבה מיידית')
        .reduce((sum, sale) => sum + sale.pay, 0)

      result = {
        ניוד: immediatePension,
      }
      break

    default:
      result = { error: true }
      break
  }

  console.log(`Results for branch ${branch}:`, result)
  return result
}
