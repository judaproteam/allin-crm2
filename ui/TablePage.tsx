'use client'

import DateRange from '@/components/form/forms/DateRange'
import FilterForm from '@/components/form/forms/FilterForm'
import SaleFormPop from '@/components/form/forms/SaleForm'
import SearchAnchor from '@/components/form/SearchAnchor'
import Icon from '@/components/Icon'
import { Numbox, Numboxs } from '@/components/Numbox'
import { headers } from '@/components/simpleTable/saleHeaders'
import Table from '@/components/simpleTable/Table'
import { useUser } from '@/context/UserProvider'
import { Role } from '@prisma/client'
import { useState } from 'react'

export default function TablePage({ data, agnts, salesSum }) {
  const [tblData, setTblData] = useState(data)

  function onTermChange(term: string) {
    const filtered = data.filter((item) =>
      headers.some((header) => item[header.key]?.toString().includes(term))
    )
    setTblData(filtered)
  }

  const user = useUser()
  console.log('user in tablePage: ', user)

  return (
    <>
      <main>
        <section className="bg-white">
          <div className="container py-8 space-y-8">
            <h1 className="title">נתוני מכירות</h1>

            {user.role == Role.MNGR && <SearchAnchor agnts={agnts} />}
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

        <div className="bg-white pt-4">
          <div className="container flex justify-between">
            <label className="input-icon max-w-52" aria-label="חיפוש">
              <Icon name="magnifying-glass" type="sol" className="rtl:scale-x-100" />
              <input
                type="text"
                placeholder="חיפוש חופשי..."
                onChange={(e) => onTermChange(e.target.value)}
              />
            </label>
            <button className="btn-s" popoverTarget="popSaleForm">
              <Icon name="plus" type="sol" />
              <p>הוסף מכירה</p>
            </button>
          </div>
        </div>

        <Table tblData={tblData} setTableData={setTblData} />
      </main>
      <SaleFormPop agnts={agnts} />
    </>
  )
}
