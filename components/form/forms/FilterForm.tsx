import { branchList, companyList, getPrdctByBranch, pensionyList, statusList } from '@/db/lists'
import { useState } from 'react'
import SelectFilter from '../SelectFilter'
import Icon from '@/components/Icon'
import { getFormData } from '@/utils/func'

export default function FilterForm() {
  function onFilter(e) {
    const data = getFormData(e)
    console.log('data: ', data)
  }

  const [prdct, setPrdct] = useState({
    prdctList: pensionyList,
    prdctTypeList: ['ניוד', 'הפקדה חודשית'],
  })

  return (
    <form id="filterForm" className="flex items-end justify-between" onSubmit={onFilter}>
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
