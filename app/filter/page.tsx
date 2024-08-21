import Filter from '@/components/filter'
import { getAllAgnts } from '@/db/agnt/getTotal'
import { getAgntsGroups } from '@/db/agntsGroup'

export default async function FilterPage() {
  const agnts = await getAllAgnts()
  const agntsGroups = await getAgntsGroups()

  return <Filter agnts={agnts} agntsGroups={agntsGroups} />
}
