export function formatAgntsTotal(originalObjects: any[]) {
  const agentMap = { agntTotal: 0 }

  originalObjects.forEach((obj) => {
    const {
      agntId,
      branch,
      prdctType,
      _sum: { agntPay, agnt2Pay, agntTotal },
    } = obj

    let key
    branch === 'פנסיוני' || branch === 'פיננסי' ? (key = `${branch}-${prdctType}`) : (key = branch)

    if (!agentMap[agntId]) {
      agentMap[agntId] = { agntId }
    }

    if (!agentMap[agntId][key]) {
      agentMap[agntId][key] = 0
    }
    prdctType === 'הפקדה חודשית'
      ? (agentMap[agntId][key] += (agntPay + agnt2Pay) * 12)
      : (agentMap[agntId][key] += agntPay + agnt2Pay)

    agentMap[agntId].agntTotal
      ? (agentMap[agntId].agntTotal += agntTotal)
      : (agentMap[agntId].agntTotal = agntTotal)
  })

  console.log('formatAgntsTotal', agentMap)

  return Object.values(agentMap)
}
