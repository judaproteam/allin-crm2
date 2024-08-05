import { getMapAgnts } from '../agnt/getTotal'

export async function formatTotalAgnts(sales) {
  const agntsName = await getMapAgnts()

  const mapSales = {}

  sales.forEach((obj) => {
    const {
      agntId,
      branch,
      prdctType,
      _sum: { agntPay, agnt2Pay, agntTotal },
    } = obj

    let keyBranch

    branch === 'פנסיוני' || branch === 'פיננסי'
      ? (keyBranch = `${branch}-${prdctType}`)
      : (keyBranch = branch)

    console.log('keyBranch', keyBranch)

    if (!mapSales[agntId]) mapSales[agntId] = { agntId }

    if (!mapSales[agntId][keyBranch]) mapSales[agntId][keyBranch] = 0

    prdctType === 'הפקדה חודשית'
      ? (mapSales[agntId][keyBranch] += (agntPay + agnt2Pay) * 12)
      : (mapSales[agntId][keyBranch] += agntPay + agnt2Pay)

    mapSales[agntId].agntTotal
      ? (mapSales[agntId].agntTotal += agntTotal)
      : (mapSales[agntId].agntTotal = agntTotal)

    mapSales[agntId].name = agntsName[agntId].name
  })

  console.log('mapSales', Object.values(mapSales))

  return Object.values(mapSales)
}

export function formatTotalSales(arr) {
  const obj = {
    פנסיוני: {
      'הפקדה חודשית': 0,
      ניוד: 0,
    },
    פיננסי: {
      'הפקדה חודשית': 0,
      'הפקדה חד פעמית': 0,
      ניוד: 0,
    },
  }
  for (const item of arr) {
    if (item.branch === 'פנסיוני' || item.branch === 'פיננסי') {
      obj[item.branch][item.prdctType] =
        item.prdctType === 'הפקדה חודשית' ? item._sum.pay * 12 : item._sum.pay
    } else {
      obj[item.branch] = item._sum.pay
    }
  }
  return obj
}
