'use client'

import React, { useState } from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

interface TableProps {
  headers: Array<{ key: string; label: string }>
  tblData: Array<Record<string, any>>
  setTblData: React.Dispatch<React.SetStateAction<Array<Record<string, any>>>>
}

interface SortConfig {
  key: string | null
  direction: 'asc' | 'desc'
}

export default function Table(props: TableProps) {
  const { headers, tblData, setTblData } = props
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' })
  const [columnOrder, setColumnOrder] = useState(headers)

  function onSort(key: string) {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'
    const sortedArray = [...tblData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setTblData(sortedArray)
    setSortConfig({ key, direction })
  }

  return (
    <div className="tbl">
      <table>
        <thead>
          <TableHeader
            headers={columnOrder}
            setColumnOrder={setColumnOrder}
            onSort={onSort}
            sortConfig={sortConfig}
          />
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
