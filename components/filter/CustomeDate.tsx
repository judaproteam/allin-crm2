'use client'

import SmallDatePicker from '@/components/form/SmallDatePicker'

// yyyy-MM-dd

export default function CustomeDate({ className = '' }) {
  return (
    <section className="grid grid-cols-2 gap-4">
      <span>
        <p>מתאריך</p>
        <SmallDatePicker name="start" val={'2024-01-01'} key={Math.random()} />
      </span>

      <span>
        <p>עד מתאריך</p>
        <SmallDatePicker name="end" val={'2024-08-01'} key={Math.random()} />
      </span>
    </section>
  )
}

type DateRangeProps = {
  start: string
  end: string
}
