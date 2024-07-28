import { getFormData, startOfMonth } from '@/utils/func'
import SmallDatePicker from '../SmallDatePicker'
import { useRouter, useSearchParams } from 'next/navigation'

export default function DateRange() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e) {
    const data = getFormData(e) as {
      start: string
      end: string
    }

    const qParams = Object.fromEntries(new URLSearchParams(searchParams))
    qParams.gte = data.start
    qParams.lte = data.end

    const url = new URLSearchParams(qParams).toString()
    router.replace('?' + url, { scroll: false })
  }

  return (
    <form onSubmit={onSubmit} className="flex">
      <section className="inline-flex gap-3 items-center border rounded-md h-10 px-4">
        <SmallDatePicker field={'start'} defaultValue={startOfMonth()} />
        <span className="text-xl">−</span>
        <SmallDatePicker field={'end'} />
      </section>
      <button className="btn-soft-s">
        <p>פלטר לתקופה</p>
      </button>
    </form>
  )
}
