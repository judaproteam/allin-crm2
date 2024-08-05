'use server'

import { Promo } from '@prisma/client'
import { db } from '../db'
import { onlyValObj } from '@/utils/func'

export async function insertPromo(formData: FormData) {
  const promo = onlyValObj(Object.fromEntries(formData.entries())) as Promo

  try {
    await db.promo.create({
      data: { ...promo, target: Number(promo.target) },
    })
  } catch (error) {
    console.error(error)
  }
}
