'use server'

import { Promo } from '@prisma/client'
import { db } from '../db'
import { onlyValObj } from '@/utils/func'
import { revalidatePath } from 'next/cache'

export async function insertPromo(formData: FormData) {
  const promo = onlyValObj(Object.fromEntries(formData.entries())) as Promo

  console.log('insertPromo', promo)
  delete promo['file']
  promo.start = new Date(promo.start)
  promo.end = new Date(promo.end)

  try {
    await db.promo.create({
      data: { ...promo, target: Number(promo.target) },
    })
  } catch (error) {
    console.error(error)
  }

  revalidatePath('/promotion')
}
