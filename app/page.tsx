import TablePage from '@/ui/TablePage'
import { getAllAgnts } from '@/db/agnt'

import { getTotal, getPayBranch, getTableData } from '@/db/sale/getTotal'

export default async function SimpleTablePage({ searchParams }) {
  const data = await getTableData({ filter: searchParams })
  const total = await getTotal({ filter: searchParams })
  const payBranch = await getPayBranch({ filter: searchParams })

  const agnts = await getAllAgnts()
  const salesSum = { total: total._sum.total, sales: payBranch }

  return <TablePage data={data} agnts={agnts} salesSum={salesSum} key={Math.random()} />
}
