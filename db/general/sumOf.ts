'use server'

import { formatSumSales } from '@/utils/func'
import { db } from '../db'

export async function companyByBranch() {
  const res = await db.sale.groupBy({
    by: ['branch', 'prdctType'],
    where: {
      company: 'מדיהו',
    },
    _sum: {
      pay: true,
    },
  })

  return res
}

export async function getPersonalRisk() {
  const res = await db.sale.aggregate({
    where: { prdct: 'תאונות אישיות' },
    _sum: {
      pay: true,
    },
  })

  return res
}

export async function salesByBranch({ filter }) {
  if (filter.gte && filter.lte) {
    filter.offrDt = {
      gte: new Date(filter.gte).toISOString(),
      lte: new Date(filter.lte).toISOString(),
    }
  }
  delete filter.gte
  delete filter.lte

  if (filter.agntId) filter.agntId = Number(filter.agntId)

  const res = await db.sale.groupBy({
    where: filter,
    by: ['branch', 'prdctType'],
    _sum: {
      pay: true,
    },
  })

  const sales = formatSumSales(res)

  const personalRisk = await getPersonalRisk()
  sales['סיכונים'] = sales['סיכונים'] - personalRisk._sum.pay
  sales['תאונות אישיות'] = personalRisk._sum.pay

  const onePrecent =
    (sales['פיננסי']['הפקדה חודשית'] +
      sales['פיננסי']['הפקדה חד פעמית'] +
      sales['פיננסי']['ניוד'] +
      sales['פנסיוני']['ניוד']) *
    0.01

  const sumAll = sales['סיכונים'] + onePrecent + sales['פנסיוני']['הפקדה חודשית'] * 0.15

  return { sales, sumAll }
}

// const logSalesByBranch = [
//   {
//     _sum: { pay: 8910 },
//     branch: 'אלמנטרי',
//     prdctType: 'פרמיה חד פעמית',
//   },
//   { _sum: { pay: 904 }, branch: 'קצבה מיידית', prdctType: 'ניוד' },
//   { _sum: { pay: 3989 }, branch: 'פנסיוני', prdctType: 'הפקדה חודשית' },
//   { _sum: { pay: 80406 }, branch: 'אכ"ע', prdctType: 'פרמיה חודשית' },
//   {
//     _sum: { pay: 547 },
//     branch: 'כתב שירות חיצוני',
//     prdctType: 'פרמיה חודשית',
//   },
//   {
//     _sum: { pay: 283 },
//     branch: 'נסיעות לחול',
//     prdctType: 'פרמיה חד פעמית',
//   },
//   { _sum: { pay: 29209 }, branch: 'פנסיוני', prdctType: 'ניוד' },
//   { _sum: { pay: 444 }, branch: 'פיננסי', prdctType: 'הפקדה חודשית' },
//   {
//     _sum: { pay: 89362 },
//     branch: 'סיכונים',
//     prdctType: 'פרמיה חודשית',
//   },
// ]

// const sales = clone(res) as {
//   _sum: {
//     pay: number
//   }
//   branch: string
//   prdctType: string
//   info?: string
// }[]

// const personalRisk = await getPersonalRisk()
// const riskBranch = sales.find((sale) => sale.branch === 'סיכונים')
// riskBranch._sum.pay = riskBranch._sum.pay - personalRisk._sum.pay

// sales.push({
//   _sum: { pay: personalRisk._sum.pay },
//   branch: 'תאונות אישיות',
//   prdctType: '',
// })

// const pensionMonthly = sales.find(
//   (sale) => sale.branch === 'פנסיוני' && sale.prdctType === 'הפקדה חודשית'
// )
// pensionMonthly._sum.pay = pensionMonthly._sum.pay * 12
// pensionMonthly.info = 'שוטף משונת'

// const financeMonthly = sales.find(
//   (sale) => sale.branch === 'פיננסי' && sale.prdctType === 'הפקדה חודשית'
// )
// financeMonthly._sum.pay = pensionMonthly._sum.pay * 12
// financeMonthly.info = 'שוטף משונת'

// const finance = sales.filter(
//   (sale) => sale.branch === 'פיננסי' && sale.prdctType !== 'הפקדה חודשית'
// )

// const pensionNud = sales.find((sale) => sale.branch === 'פנסיוני' && sale.prdctType === 'ניוד')
// const onePrecent =
//   (finance[0]?._sum.pay + finance[1]?._sum.pay + financeMonthly._sum.pay + pensionNud._sum.pay) *
//   0.01

// console.log('finance: ', finance)

// const sumAll = riskBranch._sum.pay + pensionMonthly._sum.pay * 0.15 + onePrecent
