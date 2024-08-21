'use client'

import { getFormData, startOfMonth } from '@/utils/func'
import SmallDatePicker from '../SmallDatePicker'
import { useRouter, useSearchParams } from 'next/navigation'
import Icon from '@/ui/Icon'
import { getDateRange } from 'jude_ui/dates/funcs'

export default function DateRange({ className = '' }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e) {
    const data = getFormData(e) as DateRangeProps

    const qParams = Object.fromEntries(new URLSearchParams(searchParams))
    qParams.gte = data.start
    qParams.lte = data.end

    const url = new URLSearchParams(qParams).toString()
    router.replace('?' + url, { scroll: false })
  }

  function onPeriodChange(e) {
    const val = e.target.value
    if (val === '') return

    const { startDate, endDate } = getDateRange(val) as any
    const period = {
      gte: startDate.toISOString().split('T')[0],
      lte: endDate.toISOString().split('T')[0],
    }

    let qParams = Object.fromEntries(new URLSearchParams(searchParams))
    qParams = { ...qParams, ...period }

    const url = new URLSearchParams(qParams).toString()
    router.replace('?' + url, { scroll: false })
  }

  const start = searchParams.get('gte') || startOfMonth()
  const end = searchParams.get('lte') || new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={onSubmit} className={`flex gap-8 items-end ${className}`}>
      <div className="">
        <p className="mb-1">פלטר לפי תקופה</p>
        <select onChange={onPeriodChange} className="ps-2 pe-8 w-40 border rounded-md h-10">
          <option value="">הכל...</option>
          <option value="this month">חודש נוכחי</option>
          <option value="last month">חודש קודם</option>
          <option value="this week">שבוע נוכחי</option>
          <option value="last week">שבוע קודם</option>
          <option value="this year">שנה נוכחית</option>
          <option value="last year">שנה קודמת</option>
        </select>
      </div>

      <div>
        <p className="mb-1">פלטר לפי תאריכים</p>
        <section className="inline-flex gap-4 items-center justify-around border rounded-md h-10 ps-6 pe-px w-80">
          <SmallDatePicker field={'start'} val={start} key={Math.random()} />
          <span className="text-xl">−</span>
          <SmallDatePicker field={'end'} val={end} key={Math.random()} />

          <button className="btn-soft-s h-9 ms-3">
            <Icon name="filter" type="sol" />
            <p>פלטר</p>
          </button>
        </section>
      </div>
    </form>
  )
}

type DateRangeProps = {
  start: string
  end: string
}
