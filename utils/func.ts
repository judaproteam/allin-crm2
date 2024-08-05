export const rng = (x: number, min: number, max: number) => {
  return x >= min && x <= max
}

export const genId = () => {
  return Math.floor(Math.random() * 9999999)
}

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const toCurrency = (num: number) => {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num)
}

export const toDate = (date: Date | string) => {
  if (!(date instanceof Date)) date = new Date(date?.toString())

  return new Intl.DateTimeFormat('he-IL', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export const toFormatDate = (date: Date | string) => {
  if (!(date instanceof Date)) date = new Date(date.toString())

  return new Intl.DateTimeFormat('en-US', {
    dayPeriod: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export function formatDateToInput(date: string) {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()

  // "yyyy-MM-dd"
  // "2024/1/7"

  return `${year}-0${day}-0${month}`
}

export const getFormData = (e) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const data = Object.fromEntries(new FormData(form))

  return onlyValObj(data)
}

export function onlyValObj(obj: any) {
  const filter = {}
  for (const key in obj) {
    if (obj[key]) filter[key] = obj[key]
  }
  return filter
}

export function startOfMonth() {
  const dt = new Date()
  return new Date(dt.getFullYear(), dt.getMonth(), 2).toISOString().split('T')[0]
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
    default:
      return {
        gte: new Date(dt.getFullYear(), dt.getMonth(), 1).toISOString().split('T')[0],
        lte: new Date(dt.getFullYear(), dt.getMonth() + 1, 1).toISOString().split('T')[0],
      }
  }
}

const prdctTypeList = ['ניוד', 'הפקדה חודשית', 'הפקדה חד פעמית']
export function checkPayExist(data) {
  if (!data.pay) {
    let err = true
    for (const key of prdctTypeList) {
      if (data[key]) err = false
    }
    return err
  }
  return false
}

// agtnsSum [
//   { agentId: 16, 'כתב שירות חיצוני': 547, 'נסיעות לחול': 43 },
//   {
//     agentId: 21,
//     'פנסיוני - ניוד': 19211,
//     'אלמנטרי': 8910,
//     'פנסיוני - הפקדה חודשית': 1077,
//     'אכ"ע': 2205
//   },
//   { agentId: 29, 'פנסיוני - הפקדה חודשית': 912 },
//   { agentId: 30, 'פיננסי - הפקדה חודשית': 444, 'פנסיוני - ניוד': 9322 },
//   { agentId: 39, 'קצבה מיידית': 904, 'נסיעות לחול': 240 },
//   { agentId: 62, 'סיכונים': 323 },
//   { agentId: 69, 'פנסיוני - הפקדה חודשית': 2000 },
//   { agentId: 70, 'אכ"ע': 77777, 'סיכונים': 88888 },
//   { agentId: 72, 'אכ"ע': 424, 'סיכונים': 151 },
//   { agentId: 74, 'פנסיוני - ניוד': 676 }
// ]
