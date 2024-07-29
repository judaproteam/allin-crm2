import { getDatePeriods, getFormData, startOfMonth } from '@/utils/func'
import SmallDatePicker from '../SmallDatePicker'
import { useRouter, useSearchParams } from 'next/navigation'
import Icon from '@/components/Icon'

export default function DateRange() {
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
    const period = getDatePeriods(val)
    console.log('period', period)

    let qParams = Object.fromEntries(new URLSearchParams(searchParams))
    qParams = { ...qParams, ...period }

    const url = new URLSearchParams(qParams).toString()
    router.replace('?' + url, { scroll: false })
  }

  const start = searchParams.get('gte') || startOfMonth()
  const end = searchParams.get('lte') || new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={onSubmit} className="flex">
      <section className="inline-flex gap-4 items-center border rounded-md h-10 pe-4 ps-2">
        <select onChange={onPeriodChange} className="ps-2 pe-6 me-2">
          <option value="thisMonth">חודש נוכחי</option>
          <option value="lastMonth">חודש קודם</option>
          <option value="week">שבוע נוכחי</option>
          <option value="year">שנה</option>
        </select>
        <SmallDatePicker field={'start'} val={start} key={Math.random()} />
        <span className="text-xl">−</span>
        <SmallDatePicker field={'end'} val={end} key={Math.random()} />
      </section>

      <button className="btn-soft-s">
        <Icon name="filter" type="sol" />
        <p>פלטר</p>
      </button>
    </form>
  )
}

type DateRangeProps = {
  start: string
  end: string
}
