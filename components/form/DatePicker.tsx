import { formatDate } from '@/utils/func'
import { useState } from 'react'

export default function DatePicker({ lbl = '', info = '', field = '' }) {
  function onDateChange(e) {
    const date = e.target.value

    setDate(formatDate(date))
  }

  function dateClick() {
    return (document.getElementById('date') as HTMLInputElement).showPicker()
  }

  const [date, setDate] = useState(formatDate(new Date().toISOString()))

  return (
    <label className="dateBtn">
      <p>{lbl}</p>
      <div className="">
        <button type="button" onClick={dateClick}>
          {date}
        </button>
        <input type="date" id="date" onChange={onDateChange} />
      </div>
    </label>
  )
}
