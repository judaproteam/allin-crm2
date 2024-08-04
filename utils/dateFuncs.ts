export function daysFromNow(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

export function getDatePeriods(period: string) {
  const dt = new Date()
  switch (period) {
    case 'thisMonth':
      return {
        gte: new Date(dt.getFullYear(), dt.getMonth(), 1).toISOString().split('T')[0],
        lte: new Date(dt.getFullYear(), dt.getMonth() + 1, 1).toISOString().split('T')[0],
      }

    case 'lastMonth':
      return {
        gte: new Date(dt.getFullYear(), dt.getMonth() - 1, 1).toISOString().split('T')[0],
        lte: new Date(dt.getFullYear(), dt.getMonth(), 1).toISOString().split('T')[0],
      }

    case 'week':
      return {
        gte: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() - 7)
          .toISOString()
          .split('T')[0],
        lte: new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 7)
          .toISOString()
          .split('T')[0],
      }

    case 'year':
      return {
        gte: new Date(dt.getFullYear(), 0, 1).toISOString().split('T')[0],
        lte: new Date(dt.getFullYear() + 1, 0, 1).toISOString().split('T')[0],
      }
  }
}
