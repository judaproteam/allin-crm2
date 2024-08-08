'use client'

import SmallDatePicker from '../SmallDatePicker'

export default function DateRangeForm({ className = '' }) {
  return (
    <div>
      <label className="mb-1">תאריך התחלה וסיום</label>
      <section
        className={`inline-flex gap-4 justify-between items-center border rounded-md h-10 px-4 ${className}`}>
        <SmallDatePicker field={'start'} val={new Date().toISOString().split('T')[0]} />
        <span className="text-xl">−</span>
        <SmallDatePicker field={'end'} val={new Date().toISOString().split('T')[0]} />
      </section>
    </div>
  )
}
