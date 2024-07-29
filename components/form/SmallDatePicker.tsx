import { toDate } from '@/utils/func'
import { useRef, useState } from 'react'

export default function SmallDatePicker({ field = '', val }) {
  const [date, setDate] = useState(val)
  const ref = useRef<HTMLInputElement>(null)

  return (
    <label className="smallDateBtn">
      <button type="button" onClick={() => ref.current?.showPicker()}>
        <p className="tracking-wide">{toDate(date) || toDate(val)}</p>
      </button>

      <input
        type="date"
        ref={ref}
        name={field}
        onChange={(e) => setDate(e.target.value)}
        value={date || val}
      />
    </label>
  )
}
