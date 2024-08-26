import { getUser } from '@/auth/authFuncs'
import Filter from '@/components/filter'
import DateRange from '@/components/form/forms/DateRange'
import FilterForm from '@/components/form/forms/FilterForm'
import SaleFormPop from '@/components/form/forms/SaleForm'
import SearchAnchor from '@/components/old/SearchAnchor'
import { Numbox, Numboxs } from '@/components/Numbox'
import Table from '@/components/saleTable/Table'
import { getAllAgnts } from '@/db/agnt/getTotal'
import { getAgntsGroups } from '@/db/agntsGroup' 

import { getTotal, getPayBranch, getSaleTableData } from '@/db/sale/getTotal'
import { getStickySales } from '@/db/sale/stickySales'
import { Btn } from 'jude_ui/btns'
import { Fragment } from 'react'

export default async function SimpleTablePage({ searchParams }) {
  const filter = searchParams.query ? JSON.parse(searchParams.query) : {}

  const data = await getSaleTableData({ filter })

  const user = await getUser()
  const stickySales = await getStickySales(user.id)

  const total = await getTotal({ filter })
  const payBranch = await getPayBranch({ filter })

  const agnts = await getAllAgnts()
  const agntsGroups = await getAgntsGroups()
  const salesSum = { total: total._sum.total, sales: payBranch }

  return (
    <Fragment key={Math.random()}>
      <section className="flex justify-between  mt-8">
        <h1 className="title">נתוני מכירות</h1>
        <Btn clr="text" lbl="סינון" popoverTarget="filterPop" icon="filter" className="bg-white" />
      </section>

      <section className="my-12">
        <Numbox title="משוקלל" num={salesSum.total} className="w-52 mb-4" term={'משוקלל'} />

        <Numboxs sales={salesSum.sales} />
      </section>

      <Table data={data} stickySales={stickySales} />

      <SaleFormPop agnts={agnts} />

      <Filter agnts={agnts} agntsGroups={agntsGroups} />
    </Fragment>
  )
}
