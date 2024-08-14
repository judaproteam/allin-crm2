'use server'

import { DeletedSale } from '@/utils/types'
import { db } from '@/db/db'
import { getUser } from '@/auth/authFuncs'
import { revalidatePath } from 'next/cache'

export async function deleteSale(id: number) {
  const sale = await db.sale.findUnique({
    where: { id },
    select: selectData,
  })
  if (!sale) return 'מכירה לא נמצאה'

  const deletedSale = getDeletedData(sale)
  const deletedById = (await getUser())?.id

  await db.deletedSale.create({
    data: { ...deletedSale, deletedById },
  })

  await db.sale.delete({
    where: { id },
  })

  revalidatePath('/')
}

export async function deleteSales(ids: number[]) {
  const sales = await db.sale.findMany({
    where: { id: { in: ids } },
    select: selectData,
  })
  if (!sales) return 'מכירה לא נמצאה'

  const deletedById = (await getUser())?.id
  const deletedSales = sales.map((sale) => {
    return { ...getDeletedData(sale), deletedById }
  })

  await db.deletedSale.createMany({
    data: deletedSales,
  })

  await db.sale.deleteMany({
    where: { id: { in: ids } },
  })

  revalidatePath('/')
}

function getDeletedData(sale: DeletedSale) {
  const deleteSale = {
    agntId: sale.agntId,
    agnt2Id: sale.agnt2Id,
    agntName: sale.agnt.name,
    agnt2Name: sale.agnt2?.name,
    agntShare: sale.agntShare,
    agnt2Share: sale.agnt2Share,
    offrDt: sale.offrDt,
    company: sale.company,
    branch: sale.branch,
    prdct: sale.prdct,
    prdctType: sale.prdctType,
    pay: sale.pay,
    status: sale.status,
    saleDt: sale.saleDt,
    action: sale.action,
    clientId: sale.clientId,
    clientDetails: sale.client.details,
    saleCreatedAt: sale.createdAt,
  }

  return deleteSale
}

const selectData = {
  id: true,
  agntId: true,
  agnt2Id: true,
  agntShare: true,
  agnt2Share: true,
  offrDt: true,
  company: true,
  branch: true,
  prdct: true,
  prdctType: true,
  pay: true,
  status: true,
  saleDt: true,
  action: true,
  clientId: true,
  createdAt: true,
  client: {
    select: {
      id: true,
      details: true,
    },
  },
  agnt: {
    select: {
      id: true,
      name: true,
    },
  },
  agnt2: {
    select: {
      id: true,
      name: true,
    },
  },
}
