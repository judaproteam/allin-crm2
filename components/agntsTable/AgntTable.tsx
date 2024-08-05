'use client'

import React, { useEffect, useState } from 'react'

import { agntHeaders } from './agntHeaders'
import AgntHeader from './AgntHeader'
import AgntRow from './AgntRow'

export default function AgntTable({ agntsTotal }) {
  const [tblData, setTblData] = useState(agntsTotal)

  useEffect(() => {
    const tblOrderCulomns = JSON.parse(localStorage.getItem('agntsColumnOrder'))
    if (tblOrderCulomns) setColumnOrder(tblOrderCulomns)
  }, [])

  const [columnOrder, setColumnOrder] = useState(agntHeaders)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' })

  function getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
  }
  function onSort(key: string) {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'

    const sortedArray = [...tblData].sort((a, b) => {
      const aValue = getNestedValue(a, key)
      const bValue = getNestedValue(b, key)

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1
      }
      return 0
    })

    setTblData(sortedArray)
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
