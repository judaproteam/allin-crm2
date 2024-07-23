import { columns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { db } from "@/utils/db"

export async function generateStaticParams() {
  const agnts = await db.agnt.findMany({
    select: { id: true },
  })

  return agnts.map((item) => ({
    id: item.id.toString(),
  }))
}

export default async function AgntSalesPage({ params }: { params: { id: string } }) {
  const data = await db.sale.findMany({
    where: { OR: [{ agntId: parseInt(params.id) }, { agnt2Id: parseInt(params.id) }] },
    include: {
      client: true,
      agnt: true,
    },
  })

  const agnt = await db.agnt.findUnique({
    where: { id: parseInt(params.id) },
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{agnt.firstName + " " + agnt.lastName}</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
