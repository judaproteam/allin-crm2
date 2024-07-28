import { formatDateToInput, toDate, toFormatDate } from '@/utils/func'
import { useState } from 'react'

export default function SmallDatePicker({
  field = '',
  defaultValue = new Date().toISOString().split('T')[0],
}) {
  const [date, setDate] = useState(defaultValue)

  function onDateChange(e) {
    const dt = e.target.value

    setDate(dt)
    // setDate(toDate(dt))
  }

  function dateClick() {
    return (document.querySelector(`[name=${field}]`) as HTMLInputElement).showPicker()
  }

  return (
    <label className="smallDateBtn">
      <button type="button" onClick={dateClick}>
        <p className="tracking-wide">{toDate(date)}</p>
      </button>

      <input type="date" name={field} onChange={onDateChange} value={date} />
    </label>
  )
}
