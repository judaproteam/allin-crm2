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

export const toDate = (date: Date) => {
  return new Intl.DateTimeFormat('he-IL', { dateStyle: 'short' }).format(date)
}

export function formatDate(date: string) {
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()

  return year + ' / ' + month + ' / ' + day
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
