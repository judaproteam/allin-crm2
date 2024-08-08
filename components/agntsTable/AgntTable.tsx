'use client'

import React, { useEffect, useState } from 'react'

import { agntHeaders } from './agntHeaders'
import AgntHeader from './AgntHeader'
import AgntRow from './AgntRow'
import { sortTable } from '@/utils/func'

export default function AgntTable({ agntsTotal }) {
  const [tblData, setTblData] = useState(agntsTotal)

  useEffect(() => {
    const tblOrderCulomns = JSON.parse(localStorage.getItem('agntsColumnOrder'))
    if (tblOrderCulomns) setColumnOrder(tblOrderCulomns)
  }, [])

  const [columnOrder, setColumnOrder] = useState(agntHeaders)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' })

  function onSort(key) {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'
    setTblData(sortTable(key, direction, tblData))
    setSortConfig({ key, direction })
  }

  return (
    <div className="tbl">
      <table>
        <thead>
          <AgntHeader
            headers={columnOrder}
            setColumnOrder={setColumnOrder}
            onSort={onSort}
            sortConfig={sortConfig}
          />
        </thead>
        <tbody>
          {tblData.map((item, index) => (
            <AgntRow key={index} item={item} headers={columnOrder} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

type SortConfig = {
  key: string | null
  direction: 'asc' | 'desc'
}
