'use client'

import SaleFormComp from '@/components/form/forms/SaleForm'
import Icon from '@/components/Icon'
import Table from '@/components/simpleTable/Table'
import { useState } from 'react'

export default function TablePage({ headers, data, agnts }) {
  const [tblData, setTblData] = useState(data)

  function onTermChange(term: string) {
    const filtered = data.filter((item) =>
      headers.some((header) => item[header.key]?.toString().includes(term))
    )
    setTblData(filtered)
  }

  return (
    <main>
      <section className="flex justify-between m-6 items-end">
        <label className="input">
          <p>חיפוש</p>
          <input
            type="text"
            placeholder="חיפוש חופשי בכל השדות..."
            onChange={(e) => onTermChange(e.target.value)}
          />
        </label>
        <button className="btn" popoverTarget="popSaleForm">
          <Icon name="plus" type="sol" />
          <p>הוסף מכירה</p>
        </button>
      </section>
      <Table headers={headers} tblData={tblData} setTblData={setTblData} />

      <SaleFormComp agnts={agnts} />
    </main>
  )
}
