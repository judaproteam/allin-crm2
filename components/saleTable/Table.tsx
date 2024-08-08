'use client'

import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { headers } from './saleHeaders'
import Icon from '../../ui/Icon'
import { sortTable } from '@/utils/func'
import EditSaleForm from '../form/forms/EditSaleForm'
import DelPop from '@/ui/DelPop'
import { deleteSale } from '@/db/sale/deleteSale'
import { store } from '@/utils/store'

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

  function onSort(key) {
    const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'
    setTblData(sortTable(key, direction, tblData))
    setSortConfig({ key, direction })
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

      <EditSaleForm key={Math.random()} />
      <DelPop txt="האם אתה בטוח שברצונך למחוק מכירה?" onDel={() => deleteSale(store.deleteId)} />
    </>
  )
}

interface SortConfig {
  key: string | null
  direction: 'asc' | 'desc'
}
