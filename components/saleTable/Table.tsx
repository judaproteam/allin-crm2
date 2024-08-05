'use client'

import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { headers } from './saleHeaders'
import Icon from '../Icon'

export default function Table({ data }) {
  const [tblData, setTblData] = useState(data)

  function onTermChange(term: string) {
    const filtered = data.filter((item) =>
      headers.some((header) => item[header.key]?.toString().includes(term))
    )
    setTblData(filtered)
  }

  useEffect(() => {
    const tblOrderCulomns = JSON.parse(localStorage.getItem('columnOrder'))
    if (tblOrderCulomns) setColumnOrder(tblOrderCulomns)
  }, [])

  const [columnOrder, setColumnOrder] = useState(headers)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' })

  function onSort(key: string) {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'

    const { sortedArray, sortConfigData } = sortData({ direction, key, data: tblData })

    setTblData(sortedArray)
    setSortConfig(sortConfigData)
  }

  return (
    <>
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
    </>
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
  setTblData: React.Dispatch<React.SetStateAction<Array<Record<string, any>>>>
}

interface SortConfig {
  key: string | null
  direction: 'asc' | 'desc'
}
