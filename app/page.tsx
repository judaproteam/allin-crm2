import { headers } from '@/components/simpleTable/saleHeaders'
import { getSales } from '@/db/sale/getSales'
import TablePage from '@/ui/TablePage'
import { getAllAgnts } from '@/db/agnt'
import { salesByBranch, getPersonalRisk, companyByBranch } from '@/db/general/sumOf'

export default async function SimpleTablePage() {
  const data = await getSales()
  const agnts = await getAllAgnts()

  const salesSum = await salesByBranch()

  return <TablePage headers={headers} data={data} agnts={agnts} salesSum={salesSum} />
}
