import { getUser } from '@/auth/authFuncs'
import AgntTable from '@/components/agntsTable/AgntTable'
import DateRange from '@/components/form/forms/DateRange'
import FilterForm from '@/components/form/forms/FilterForm'
import Search from '@/components/old/SearchAgnt_old'
import SearchAnchor from '@/components/old/SearchAnchor'
import { Numbox, Numboxs } from '@/components/Numbox'

import { getAgntsTotal, getAllAgnts } from '@/db/agnt/getTotal'
import { getPayBranch, getTotal } from '@/db/sale/getTotal'
import { Role } from '@prisma/client'
import { ShowMore } from 'jude_ui/showMore'
import Filter from '@/components/filter'
import { getAgntsGroups } from '@/db/agntsGroup'
import { Btn } from 'jude_ui/btns'

export default async function PromotionPage({ searchParams }) {
  const user = await getUser()
  if (user.role != Role.MNGR) return null

  const total = await getTotal({ filter: searchParams })
  const payBranch = await getPayBranch({ filter: searchParams })
  const salesSum = { total: total._sum.total, sales: payBranch }
  const agnts = await getAllAgnts()
  const agntsGroups = await getAgntsGroups()

  const agntsTotal = await getAgntsTotal()

  return (
    <>
      <section className="flex justify-between  mt-8">
        <h1 className="title">סיכום מכירות</h1>
        <Btn clr="text" lbl="סינון" popoverTarget="filterPop" icon="filter" className="bg-white" />
      </section>

      <section className="my-12">
        <Numbox title="משוקלל" num={salesSum.total} className="w-52 mb-4" term={'משוקלל'} />
        <div className="flex gap-4 ">
          <Numboxs sales={salesSum.sales} />
        </div>
      </section>

      <AgntTable agntsTotal={agntsTotal} />

      <Filter agnts={agnts} agntsGroups={agntsGroups} />
    </>
  )
}
