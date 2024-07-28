import { branchList, companyList, getPrdctByBranch, pensionyList, statusList } from '@/db/lists'
import { useState } from 'react'
import SelectFilter from '../SelectFilter'
import Icon from '@/components/Icon'
import { getFormData } from '@/utils/func'
import { useRouter, useSearchParams } from 'next/navigation'

export default function FilterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onFilter(e) {
    const data = getFormData(e)

    let qParams = Object.fromEntries(new URLSearchParams(searchParams))
    qParams = { ...qParams, ...data }

    const url = new URLSearchParams(qParams).toString()
    router.replace('?' + url, { scroll: false })
  }

  const [prdct, setPrdct] = useState({
    prdctList: [],
    prdctTypeList: [],
  })

  return (
    <form
      id="filterForm"
      name="filterForm"
      className="flex items-end justify-between"
      onSubmit={onFilter}>
      <SelectFilter lbl="חברה" field="company" list={companyList} />
      <SelectFilter
        lbl="ענף"
        field="branch"
        list={branchList}
        onSelect={(e) => {
          setPrdct(getPrdctByBranch(e.target.value))
        }}
      />
      <SelectFilter lbl="מוצר" field="prdct" list={prdct.prdctList} />
      <SelectFilter lbl="סוג המוצר" field="prdctType" list={prdct.prdctTypeList} />
      <SelectFilter lbl="סטטוס" field="status" list={statusList} />
      <SelectFilter lbl="פעולה" field="action" list={['מכירה', 'מינוי סוכן']} />

      <button className="btn-soft">
        <Icon name="filter" type="sol" />
        <p>פלטר</p>
      </button>
    </form>
  )
}
