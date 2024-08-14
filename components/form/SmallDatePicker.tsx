import { useRef, useState } from 'react'

export default function SmallDatePicker({ field = '', val }) {
  const [date, setDate] = useState(val)
  const ref = useRef<HTMLInputElement>(null)
  const tmpDt = new Date(date).toLocaleDateString('he-IL')

  return (
    <label className="smallDateBtn">
      <button type="button" onClick={() => ref.current?.showPicker()}>
        <p className="tracking-wide font-medium">{tmpDt}</p>
      </button>

      <input
        type="date"
        ref={ref}
        name={field}
        onChange={(e) => setDate(e.target.value)}
        value={val}
      />
    </label>
  )
}
