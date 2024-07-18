import { db } from "@/utils/db"
import { columns } from "@/components/table/columns"
import { Sale } from "@prisma/client"
import { DataTable } from "@/components/table/data-table"

async function getData(): Promise<Sale[]> {
  return await db.sale.findMany({
    include: {
      client: true,
      agnt: true,
    },
  })
}

export default async function AgentSalesPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
