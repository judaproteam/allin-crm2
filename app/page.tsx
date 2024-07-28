import { getSales } from '@/db/sale/getSales'
import TablePage from '@/ui/TablePage'
import { getAllAgnts } from '@/db/agnt'
import { salesByBranch } from '@/db/general/sumOf'

export default async function SimpleTablePage({ searchParams }) {
  const data = await getSales({
    filter: searchParams,
  })
  const agnts = await getAllAgnts()

  const salesSum = await salesByBranch()

  return <TablePage data={data} agnts={agnts} salesSum={salesSum} />
}

// searchParams:  { company: 'מוני', branch: 'פנסיוני', prdctType: 'הפקדה חודשית' }
