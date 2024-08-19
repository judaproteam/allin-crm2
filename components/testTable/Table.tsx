'use client'

import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { headers } from './saleHeaders'
import Icon from '../../ui/Icon'
import { sortTable } from '@/utils/func'
import EditSaleForm from '../form/forms/EditSaleForm'
import DelPop from '@/ui/DelPop'
import { store } from '@/utils/store'
import { Input, SelectGrp } from 'jude_ui/form'
import { deleteSales, deleteSale } from '@/db/sale/deleteNbackup'
import { statusList } from '@/db/lists'
import { updateSaleStatus } from '@/db/sale/update'

export default function TestTable({ data }) {
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

  function onGroupAction(e) {
    const val = e.target.value
    const checkItems = document.querySelectorAll(
      "[name='checkSale']"
    ) as NodeListOf<HTMLInputElement>

    const ids = []
    checkItems.forEach((sale) => {
      if (sale.checked) ids.push(Number(sale.id))
    })

    return console.log(val)

    if (val === 'מחיקת המכירות שנבחרו') {
      if (!confirm('בטוח למחוק את המכירות?')) return
      return deleteSales(ids)
    }

    if (!confirm('לשנות את סטטוס המכירות ל' + val + '?')) return
    return updateSaleStatus(ids, val)
  }

  const selectGrp = [
    { head: 'עדכון סטטוס', list: statusList },
    { head: 'מחיקה', list: ['מחיקת המכירות שנבחרו'] },
  ]

  return (
    <>
      <div className="bg-white pt-4">
        <div className="px-8 flex justify-between">
          <div className="flex">
            <Input
              lbl="חיפוש"
              noLable
              placeholder="🔎︎  חיפוש חופשי..."
              onChange={(e) => onTermChange(e.target.value)}
              className="w-52"
            />

            <SelectGrp
              className="w-52"
              lists={selectGrp}
              onChange={onGroupAction}
              noLable
              lbl="פעולות"
            />
          </div>
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
