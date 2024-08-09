import DateRange from '@/components/form/forms/DateRange'
import FilterForm from '@/components/form/forms/FilterForm'
import SaleFormPop from '@/components/form/forms/SaleForm'
import SearchAnchor from '@/components/form/SearchAnchor'
import { Numbox, Numboxs } from '@/components/Numbox'
import Table from '@/components/saleTable/Table'
import { getAllAgnts } from '@/db/agnt/getTotal'

import { getTotal, getPayBranch, getTableData } from '@/db/sale/getTotal'

export default async function SimpleTablePage({ searchParams }) {
  const data = await getTableData({ filter: searchParams })
  const total = await getTotal({ filter: searchParams })
  const payBranch = await getPayBranch({ filter: searchParams })

  const agnts = await getAllAgnts()
  const salesSum = { total: total._sum.total, sales: payBranch }

  return (
    <main key={Math.random()} className="overflow-x-hidden">
      <section className="bg-white">
        <div className="container py-8 space-y-8">
          <h1 className="title">נתוני מכירות</h1>
          <div className="flex items-end justify-between">
            <DateRange />
            <SearchAnchor agnts={agnts} />
          </div>
          <FilterForm />
        </div>
      </section>

      <section className="container my-12">
        <Numbox title="משוקלל" num={salesSum.total} className="w-52 mb-4" />
        <div className="flex gap-4 ">
          <Numboxs sales={salesSum.sales} />
        </div>
      </section>

      <Table data={data} />

      <SaleFormPop agnts={agnts} />
    </main>
  )
}
