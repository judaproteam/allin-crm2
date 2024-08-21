import { useRef, useState } from 'react'

export default function SmallDatePicker({ val, ...props }) {
  const [date, setDate] = useState(val)
  const ref = useRef<HTMLInputElement>(null)
  const tmpDt = new Date(date).toLocaleDateString('he-IL')

  // date input format = yyyy-MM-dd

  return (
    <label className="smallDateBtn">
      <button type="button" onClick={() => ref.current?.showPicker()}>
        <p className="tracking-wide font-medium">{tmpDt}</p>
      </button>

      <input
        type="date"
        ref={ref}
        onChange={(e) => setDate(e.target.value)}
        value={date}
        {...props}
      />
    </label>
  )
}
