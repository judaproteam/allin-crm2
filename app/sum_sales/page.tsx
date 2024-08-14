import { getUser } from '@/auth/authFuncs'
import AgntTable from '@/components/agntsTable/AgntTable'
import DateRange from '@/components/form/forms/DateRange'
import FilterForm from '@/components/form/forms/FilterForm'
import Search from '@/components/form/SearchAgnt_old'
import SearchAnchor from '@/components/form/SearchAnchor'
import { Numbox, Numboxs } from '@/components/Numbox'

import { getAgntsTotal, getAllAgnts } from '@/db/agnt/getTotal'
import { getPayBranch, getTotal } from '@/db/sale/getTotal'
import { Role } from '@prisma/client'

export default async function PromotionPage({ searchParams }) {
  const user = await getUser()
  if (user.role != Role.MNGR) return null

  const total = await getTotal({ filter: searchParams })
  const payBranch = await getPayBranch({ filter: searchParams })
  const salesSum = { total: total._sum.total, sales: payBranch }
  const agnts = await getAllAgnts()

  const agntsTotal = await getAgntsTotal()

  return (
    <>
      <section className="bg-white">
        <div className="container py-8 space-y-8">
          <h1 className="title">סיכום מכירות סוכנים</h1>
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

      <AgntTable agntsTotal={agntsTotal} />
    </>
  )
}
