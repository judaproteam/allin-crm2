'use client'

import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { headers } from './saleHeaders'

interface TableProps {
  tblData: Array<Record<string, any>>
}

export default function Table({ tblData }: TableProps) {
  useEffect(() => {
    const tblOrderCulomns = JSON.parse(localStorage.getItem('columnOrder'))
    if (tblOrderCulomns) setColumnOrder(tblOrderCulomns)
  }, [])

  const [columnOrder, setColumnOrder] = useState(headers)

  return (
    <div className="tbl">
      <table>
        <thead>
          <TableHeader headers={columnOrder} setColumnOrder={setColumnOrder} />
        </thead>
        <tbody>
          {tblData.map((item, index) => (
            <TableRow key={index} item={item} headers={columnOrder} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
