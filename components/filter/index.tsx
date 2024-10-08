'use client'

import { branchList, companyList, getPrdctByBranch, statusList } from '@/db/lists'
import { Select, SelectObj } from 'jude_ui/form'
import { useState } from 'react'
import { Btn } from 'jude_ui/btns'
import { getFormData } from 'jude_ui/form/funcs'
import SelectDateRange from './SelectDateRange'
import { getDateRange } from 'jude_ui/dates/funcs'
import { useRouter } from 'next/navigation'
import Icon from 'jude_ui/icon'

export default function Filter({ agnts, agntsGroups }) {
  const router = useRouter()

  const [prdct, setPrdct] = useState({
    prdctList: [],
    prdctTypeList: [],
  })

  function onSubmit(e) {
    const data = getFormData(e) as any
    const query = { ...data } as any

    let dateRange
    if (data.dateRange) {
      if (data.dateRange !== 'מותאם אישית') dateRange = getDateRange(data.dateRange) as any
      else dateRange = { start: data.start, end: data.end }

      // query.gte = dateRange.start.toISOString().split('T')[0]
      // query.lte = dateRange.end.toISOString().split('T')[0]

      query.offrDt = {
        gte: dateRange.start.toISOString(),
        lte: dateRange.end.toISOString(),
      }

      delete query.dateRange
    }

    // const url = new URLSearchParams(JSON.stringify(query)).toString()
    const url = new URLSearchParams({ query: JSON.stringify(query) })
    // url.append('query', JSON.stringify(query))
    router.replace('?' + url, { scroll: false })

    // document.getElementById('filterPop').hidePopover()
  }

  function resetFilter() {
    const form = document.getElementById('filterForm') as HTMLFormElement
    form.reset()
    router.replace('?')

    document.getElementById('filterPop').hidePopover()
  }

  return (
    <div
      popover="auto"
      className="pop max-h-[75vh] w-[560px] scroll-bar overflow-y-auto"
      id="filterPop">
      <div className="inline-flex items-center gap-4 border-b pb-2 mb-6 border-slate-400">
        <Icon name="filter" type="reg" />
        <p className="text-xl font-medium">סינונים</p>
      </div>

      <form id="filterForm" onSubmit={onSubmit}>
        <p className="border-b pb-2 mb-4">סינון תאריך</p>
        <SelectDateRange />

        <p className="border-b pb-2 mb-4 mt-8">סינון מוצר</p>
        <section className="grid grid-cols-2 gap-4">
          <Select lbl="חברה" name="company" list={companyList} required={false} />
          <Select
            lbl="ענף"
            name="branch"
            list={branchList}
            onChange={(e) => {
              setPrdct(getPrdctByBranch(e.target.value))
            }}
            required={false}
          />
          <Select lbl="מוצר" name="prdct" list={prdct.prdctList} required={false} />
          <Select lbl="סוג המוצר" name="prdctType" list={prdct.prdctTypeList} required={false} />
          <Select lbl="סטטוס" name="status" list={statusList} required={false} />
          <Select lbl="פעולה" name="action" list={['מכירה', 'מינוי סוכן']} required={false} />
        </section>

        <p className="border-b pb-2 mb-4 mt-8">סינון סוכנים</p>
        <section className="grid grid-cols-2 gap-4">
          <SelectObj list={agnts} lbl="סוכן" show="name" val="id" required={false} name="agntId" />
          <SelectObj
            list={agntsGroups}
            lbl="קבוצת סוכנים"
            show="name"
            val="id"
            required={false}
            name="agntGroupId"
          />
        </section>

        <section className="grid grid-cols-2 gap-4 mt-8">
          <Btn clr="text" lbl="אפס סינונים" type="button" onClick={resetFilter} icon="eraser" />
          <Btn clr="solid" lbl="שמור סינונים" icon="floppy-disk" />
        </section>
      </form>
    </div>
  )
}
