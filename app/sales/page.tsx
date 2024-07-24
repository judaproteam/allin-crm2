import { db } from '@/db/db'
import { columns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'

export default async function AgentSalesPage() {
  const data = await db.sale.findMany({
    include: {
      client: true,
      agnt: true,
    },
  })

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
