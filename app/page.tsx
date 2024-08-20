import { getUser } from '@/auth/authFuncs'
import DateRange from '@/components/form/forms/DateRange'
import FilterForm from '@/components/form/forms/FilterForm'
import SaleFormPop from '@/components/form/forms/SaleForm'
import SearchAnchor from '@/components/form/SearchAnchor'
import { Numbox, Numboxs } from '@/components/Numbox'
import Table from '@/components/saleTable/Table'

import { getAllAgnts } from '@/db/agnt/getTotal'

import { getTotal, getPayBranch, getSaleTableData } from '@/db/sale/getTotal'
import { getStickySales } from '@/db/sale/stickySales'
import { ShowMore } from 'jude_ui/showMore'
import { Fragment } from 'react'

export default async function SimpleTablePage({ searchParams }) {
  const data = await getSaleTableData({ filter: searchParams })

  const user = await getUser()
  const stickySales = await getStickySales(user.id)

  const total = await getTotal({ filter: searchParams })
  const payBranch = await getPayBranch({ filter: searchParams })

  const agnts = await getAllAgnts()
  const salesSum = { total: total._sum.total, sales: payBranch }

  return (
    <Fragment key={Math.random()}>
      <section className="bg-white">
        <div className="py-8 space-y-8">
          <h1 className="title">נתוני מכירות</h1>

          <DateRange />

          <ShowMore lbl="פלטרים נוספים" prntCls="inline-block">
            <>
              <SearchAnchor agnts={agnts} />
              <FilterForm />
            </>
          </ShowMore>
        </div>
      </section>

      <section className="my-12">
        <Numbox title="משוקלל" num={salesSum.total} className="w-52 mb-4" term={'משוקלל'} />

        <Numboxs sales={salesSum.sales} />
      </section>

      <Table data={data} stickySales={stickySales} />

      <SaleFormPop agnts={agnts} />
    </Fragment>
  )
}
