import { getMapAgnts } from '@/db/agnt'

export function mapAgnts(agnts) {
  const agntMap = {}

  agnts.forEach((agnt) => {
    agntMap[agnt.id] = agnt
  })

  return agntMap
}

export async function formatAgntsTotal(agntsTotal: any[]) {
  const mapAgnts = await getMapAgnts()

  const agntSales = {}

  console.log('agntsTotal.length: ', agntsTotal.length)

  agntsTotal.forEach((obj) => {
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

    if (!agntSales[agntId]) agntSales[agntId] = { agntId }
    if (!agntSales[agntId][keyBranch]) agntSales[agntId][keyBranch] = 0

    agntSales[agntId].name = mapAgnts[agntId].name

    prdctType === 'הפקדה חודשית'
      ? (agntSales[agntId][keyBranch] += (agntPay + agnt2Pay) * 12)
      : (agntSales[agntId][keyBranch] += agntPay + agnt2Pay)

    agntSales[agntId].agntTotal
      ? (agntSales[agntId].agntTotal += agntTotal)
      : (agntSales[agntId].agntTotal = agntTotal)
  })

  console.log('Object.values(agntSales)', Object.values(agntSales))

  return Object.values(agntSales)
}
