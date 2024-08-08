'use client'

import { useRouter } from 'next/navigation'

export default function SelectPromo({ promos }) {
  const router = useRouter()

  function onSelect(e) {
    const promoId = e.target.value
    router.push(`?promoId=${promoId}`, { scroll: false })
    // router.replace('' , { scroll: false })
  }

  return (
    <label className="slct">
      <p>בחר מבצע</p>

      <select name="promo" onChange={onSelect}>
        <option value="" key="0">
          בחר מבצע
        </option>
        {promos.map((p) => (
          <option value={p.id} key={p.id}>
            {p.title}
          </option>
        ))}
      </select>
    </label>
  )
}
