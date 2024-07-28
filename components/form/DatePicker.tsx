import { toDate } from '@/utils/func'
import { useState } from 'react'
import Icon from '../Icon'

export default function DatePicker({ lbl = '', field = '' }) {
  function onDateChange(e) {
    const dt = e.target.value
    setDate(toDate(dt))
  }

  function dateClick() {
    return (document.querySelector(`[name=${field}]`) as HTMLInputElement).showPicker()
  }

  const [date, setDate] = useState(toDate(new Date()))

  return (
    <label className="dateBtn">
      <p>{lbl}</p>
      <div className="">
        <button type="button" onClick={dateClick}>
          <Icon name="calendar" type="lit" />
          <p>{date}</p>
        </button>
        <input type="date" name={field} onChange={onDateChange} />
      </div>
    </label>
  )
}
