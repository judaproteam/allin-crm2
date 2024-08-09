import { z } from 'zod'

export const saleFormSchema = z.object({
  email: z.string({ message: 'שדה חובה' }).email('מייל לא חוקי'),
  clientFirstName: z.string().min(1, 'שדה חובה'),
  clientLastName: z.string().min(1, 'שדה חובה'),
  idNum: z.string().min(1, 'שדה חובה'),
  pay: z.number({ message: 'שדה חובה' }).min(1, 'מינימום 1'),
  saleDt: z.string().min(1, 'שדה חובה'),
  offrDt: z.string().min(1, 'שדה חובה'),
  status: z.string().min(1, 'שדה חובה'),
  action: z.string().min(1, 'שדה חובה'),
  company: z.string().min(1, 'שדה חובה'),
  branch: z.string().min(1, 'שדה חובה'),
  prdct: z.string().min(1, 'שדה חובה'),
  prdctType: z.string().min(1, 'שדה חובה'),
  agntFirstName: z.string().min(1, 'שדה חובה'),
})

export type SaleForm = {
  status: string
  action: string
  company: string
  branch: string
  prdct: string
  prdctType: string
  saleDt: Date
  offrDt: Date
  clientId?: number
  agntId?: number
  agntFirstName?: string
  clientFirstName?: string
  clientLastName?: string
  idNum?: number
  pay: number
}

export type TypePrdct = {
  company: string
  branch: string
  prdct: string
  prdctType: string
  pay: number
  status: string
}

export type saleObj = {
  details: {
    agntId: string
    agntShare?: string
    agnt2Id?: string
    agnt2Share?: string
    offrDt: string
    clientFirstName: string
    clientLastName: string
    idNum: string
  }
  prdcts: {
    company: string
    branch: string
    prdct: string
    prdctType: string
    pay: string
    status: string
  }[]
}

export type singleSaleObj = {
  details: {
    agntId: string
    agntShare?: string
    agnt2Id?: string
    agnt2Share?: string
    offrDt: string
    clientFirstName: string
    clientLastName: string
    idNum: string
  }
  prdcts: {
    company: string
    branch: string
    prdct: string
    prdctType: string
    pay: string
    status: string
  }
}

export type agntType = {
  id: number
  name: string
}

export type DeletedSale = {
  id: number
  agntId: number
  agnt2Id: number
  agntShare: number
  agnt2Share: number
  offrDt: Date
  clientId: number
  company: string
  branch: string
  prdct: string
  prdctType: string
  pay: number
  status: string
  saleDt: Date
  action: string
  createdAt: Date
  client: {
    id: number
    details: string
  }
  agnt: {
    id: number
    name: string
  }
  agnt2: {
    id: number
    name: string
  }
}

// id: 85,
//   email: 'yuda.stl@gmail.com',
//   name: 'יהודה צבי',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocKdHzMaEojrwOhAkhOm4ZeoApPbFwlw9KPu_gNOjdi67zK5EA=s96-c',
//   role: 'AGNT',
//   expires: '2025-08-09T03:58:22.490Z',
//   iat: 1723175902,
//   exp: 1754711902

export type User = {
  id: number
  email: string
  role: string
  name: string
  picture?: string
  expires?: string
  iat?: number
  exp?: number
}
