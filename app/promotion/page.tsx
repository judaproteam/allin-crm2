import DateRange from '@/components/form/forms/DateRange'
import FilterForm from '@/components/form/forms/FilterForm'
import Search from '@/components/form/SearchAgnt_old'
import { Numbox, Numboxs } from '@/components/Numbox'
import { getAgntsTotal, getAllAgnts } from '@/db/agnt'
import { getPayBranch, getTotal } from '@/db/sale/getTotal'
import Promotion from '@/ui/Promotion'
// import fs from 'fs'

export default async function PromotionPage({ searchParams }) {
  const agntsTotal = await getAgntsTotal()
  const agnts = await getAllAgnts()

  const total = await getTotal({ filter: searchParams })
  const payBranch = await getPayBranch({ filter: searchParams })
  const salesSum = { total: total._sum.total, sales: payBranch }

  // fs.writeFileSync('./db/agntsTotal.json', JSON.stringify(agntsTotal, null, 2))

  return (
    <div>
      <section className="bg-white">
        <div className="container py-8 space-y-8">
          <h1 className="title">סיכום מכירות סוכנים</h1>
          <Search agnts={agnts} />
          <DateRange />
          <FilterForm />
        </div>
      </section>

      <section className="container my-12">
        <Numbox title="משוקלל" num={salesSum.total} className="w-52 mb-4" />
        <div className="flex gap-4 ">
          <Numboxs sales={salesSum.sales} />
        </div>
      </section>

      <Promotion agtnsSum={agntsTotal} />
    </div>
  )
}
