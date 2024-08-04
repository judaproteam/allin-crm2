'use client'

import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { headers } from './saleHeaders'

export default function Table({ tblData, setTableData }: TableProps) {
  useEffect(() => {
    const tblOrderCulomns = JSON.parse(localStorage.getItem('columnOrder'))
    if (tblOrderCulomns) setColumnOrder(tblOrderCulomns)
  }, [])

  const [columnOrder, setColumnOrder] = useState(headers)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' })

  function onSort(key: string) {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'

    const { sortedArray, sortConfigData } = sortData({ direction, key, data: tblData })

    setTableData(sortedArray)
    setSortConfig(sortConfigData)
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

function sortData({ direction, key, data }) {
  function getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
  }

  const sortedArray = [...data].sort((a, b) => {
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

  return { sortedArray, sortConfigData: { key, direction } }
}

interface TableProps {
  tblData: Array<Record<string, any>>
  setTableData: React.Dispatch<React.SetStateAction<Array<Record<string, any>>>>
}

interface SortConfig {
  key: string | null
  direction: 'asc' | 'desc'
}
