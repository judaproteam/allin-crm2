'use server'

import { db } from './db'

export async function getAllAgnts() {
  return await db.agnt.findMany({
    select: { id: true, firstName: true, lastName: true },
    orderBy: { firstName: 'asc' },
  })
}
