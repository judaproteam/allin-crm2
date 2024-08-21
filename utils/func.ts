export const rng = (x: number, min: number, max: number) => {
  return x >= min && x <= max
}

export const genId = () => {
  return Math.floor(Math.random() * 9999999)
}

export const clone = (el: any) => {
  return JSON.parse(JSON.stringify(el))
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

export function sortTable(key, direction, tblData) {
  const sortedArray = [...tblData].sort((a, b) => {
    let val1 = a[key] || '0'
    let val2 = b[key] || '0'

    if (val1 < val2) return direction === 'asc' ? -1 : 1
    if (val1 > val2) return direction === 'asc' ? 1 : -1
  })

  return sortedArray
}
