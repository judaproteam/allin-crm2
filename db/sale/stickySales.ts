'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../db'
import { Sale } from '@prisma/client'

export async function addStickySale(saleId: number, agntId: number) {
  await db.stickySales.create({
    data: {
      saleId,
      agntId,
    },
  })
}

export async function checkStickySale(saleId: number, agntId: number) {
  const sale = await db.stickySales.findUnique({
    where: {
      saleId_agntId: {
        saleId,
        agntId,
      },
    },
  })

  if (sale) deleteStickySale(saleId, agntId)
  else addStickySale(saleId, agntId)

  revalidatePath('/')
}

export async function getStickySales(agntId: number) {
  const res = await db.stickySales.findMany({
    where: {
      agntId,
    },
    include: {
      sale: {
        select: {
          id: true,
          action: true,
          offrDt: true,
          prdct: true,
          prdctType: true,
          pay: true,
          status: true,
          branch: true,
          company: true,
          client: {
            select: { id: true, details: true, firstName: true, lastName: true, idNum: true },
          },
          agnt: { select: { id: true, name: true } },
          agnt2: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formated = res.map((item) => {
    const clientData = item.sale.client.details
    const agntName = item.sale.agnt2
      ? `${item.sale.agnt.name} & ${item.sale.agnt2.name}`
      : item.sale.agnt.name

    item.sale = { ...item.sale, clientData, agntName } as any
    return item
  })

  return formated
}

export async function deleteStickySale(saleId: number, agntId: number) {
  await db.stickySales.delete({
    where: {
      saleId_agntId: {
        saleId,
        agntId,
      },
    },
  })
}
