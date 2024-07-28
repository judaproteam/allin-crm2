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
    maximumFractionDigits: 0,
  }).format(num)
}

export const toDate = (date: Date | string) => {
  if (!(date instanceof Date)) date = new Date(date.toString())

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

  const obj = new FormData(form)
  const data = Object.fromEntries(obj)
  const filter = {}
  for (const key in data) {
    if (data[key]) filter[key] = data[key]
  }
  return filter
}

export function formatSumSales(arr: any[]) {
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

export function startOfMonth() {
  const dt = new Date()
  return new Date(dt.getFullYear(), dt.getMonth(), 2).toISOString().split('T')[0]
  // return toDate(new Date(dt.getFullYear(), dt.getMonth(), 1))
}
