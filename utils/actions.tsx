"use server"

import { db } from "./db"

export async function getAllAgnts() {
  return await db.agnt.findMany({
    select: { id: true, firstName: true, lastName: true },
    orderBy: { firstName: "asc" },
  })
}

export async function insertSale(sale) {
  return await db.sale.create({
    data: sale,
  })
}

export async function getAllSales() {
  return await db.sale.findMany({
    select: { id: true, clientId: true, agntId: true, status: true, action: true },
    orderBy: { id: "desc" },
  })
}
