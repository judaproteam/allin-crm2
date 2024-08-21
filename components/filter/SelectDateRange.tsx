import { RadioBtns } from 'jude_ui/form'
import CustomeDate from './CustomeDate'
import { useState } from 'react'

export default function SelectDateRange() {
  function dateRangeChange(e) {
    const val = e.target.value
    val === 'מותאם אישית' ? setCustomeDate(true) : setCustomeDate(false)
  }

  const [customeDate, setCustomeDate] = useState(false)

  return (
    <div>
      <RadioBtns
        name="dateRange"
        onChange={dateRangeChange}
        options={[
          'החודש הנוכחי',
          'החודש הקודם',
          'השבוע הנוכחי',
          'השבוע הקודם',
          'השנה הנוכחית',
          'השנה הקודמת',
          'מותאם אישית',
        ]}
      />
      {customeDate && (
        <div className="mt-4">
          <CustomeDate />
        </div>
      )}
    </div>
  )
}
