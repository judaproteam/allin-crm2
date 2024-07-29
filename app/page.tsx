import { getSales } from '@/db/sale/getSales'
import TablePage from '@/ui/TablePage'
import { getAllAgnts } from '@/db/agnt'
import { salesByBranch } from '@/db/general/sumOf'

export default async function SimpleTablePage({ searchParams }) {
  const data = await getSales({ filter: searchParams })
  const agnts = await getAllAgnts()

  const salesSum = await salesByBranch({ filter: searchParams })

  return <TablePage data={data} agnts={agnts} salesSum={salesSum} key={Math.random()} />
}
