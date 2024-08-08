'use server'

import { revalidatePath } from 'next/cache'
import { db } from './db'

export async function getAgntsGroup(id: number) {
  const agntsGroup = await db.agntsGroup.findUnique({
    where: {
      id,
    },
    include: {
      agnts: true,
    },
  })

  return agntsGroup
}

export async function getAgntsGroupByName(name: string) {
  const agntsGroup = await db.agntsGroup.findUnique({
    where: {
      name,
    },
    include: {
      agnts: true,
    },
  })

  return agntsGroup
}

export async function getAgntsGroups() {
  const agntsGroups = await db.agntsGroup.findMany({
    select: {
      id: true,
      name: true,
      agnts: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return agntsGroups
}

export async function createAgntsGroup(agntsGroup: any) {
  const res = await db.agntsGroup.create({
    data: {
      name: agntsGroup.name,
      agnts: {
        connect: agntsGroup.agntIds,
      },
    },
  })

  revalidatePath('promotion')

  return res
}

export async function updateAgntsGroup(agntsGroup: any) {
  const updatedAgntsGroup = await db.agntsGroup.update({
    data: agntsGroup,
    where: {
      id: agntsGroup.id,
    },
  })

  return updatedAgntsGroup
}

export async function deleteAgntsGroup(id: number) {
  const deletedAgntsGroup = await db.agntsGroup.delete({
    where: {
      id,
    },
  })

  return deletedAgntsGroup
}
