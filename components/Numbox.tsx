'use client'

import { toCurrency } from '@/utils/func'
import { ShowMore } from 'jude_ui/showMore'
import { useRouter, useSearchParams } from 'next/navigation'

export function Numbox({ title, num, info = false, className = '', term }) {
  const router = useRouter()
  const param = useSearchParams().get('branchBox') || 'משוקלל'

  function filter() {
    if (term === 'משוקלל') {
      console.log('term', term)

      return router.replace('?', { scroll: false })
    }

    const query = new URLSearchParams({ branchBox: term }).toString()
    router.replace('?' + query, { scroll: false })
  }

  return (
    <button
      className={`num-box ${className} ${param === term ? 'bg-softy border border-solid' : ''}`}
      onClick={filter}>
      <span>{title}</span>
      {info && (
        <>
          <span className="mx-2">−</span>
          <span>{info}</span>
        </>
      )}
      <h2>{toCurrency(num | 0)}</h2>
    </button>
  )
}

export function Numboxs({ sales }) {
  return (
    <>
      <div className="flex gap-4">
        <Numbox title="סיכונים" num={sales['סיכונים']} term={'סיכונים'} className="min-w-52" />
        <Numbox
          title="פיננסי - שוטף משונת"
          num={sales['פיננסי']['הפקדה חודשית']}
          className="min-w-52"
          term={'פיננסי-הפקדה חודשית'}
        />
        <Numbox
          title="פיננסי - ניודים"
          num={sales['פיננסי']['ניוד']}
          className="min-w-52"
          term={'פיננסי-ניוד'}
        />
        <Numbox
          title="פיננסי - הפקדה חד פעמית"
          num={sales['פיננסי']['הפקדה חד פעמית']}
          className="min-w-52"
          term={'פיננסי-הפקדה חד פעמית'}
        />
        <Numbox
          title="פנסיוני - שוטף משונת"
          num={sales['פנסיוני']['הפקדה חודשית']}
          className="min-w-52"
          term={'פנסיוני-הפקדה חודשית'}
        />
        <Numbox
          title="פנסיוני - ניודים"
          num={sales['פנסיוני']['ניוד']}
          className="min-w-52"
          term={'פנסיוני-ניוד'}
        />
      </div>

      <ShowMore lbl="ענפים נוספים" prntCls="mt-4 inline-block">
        <div className="flex gap-4">
          <Numbox title="אלמנטרי" num={sales['אלמנטרי']} term={'אלמנטרי'} />
          <Numbox
            title="כתב שירות חיצוני"
            num={sales['כתב שירות חיצוני']}
            term={'כתב שירות חיצוני'}
          />
          <Numbox title="נסיעות לחול" num={sales['נסיעות לחול']} term={'נסיעות לחול'} />
          <Numbox title="קצבה מיידית" num={sales['קצבה מיידית']} term={'קצבה מיידית'} />
          <Numbox title="תאונות אישיות" num={sales['תאונות אישיות']} term={'תאונות אישיות'} />
          <Numbox title='אכ"ע' num={sales['אכ"ע']} term={'אכ"ע'} />
        </div>
      </ShowMore>
    </>
  )
}
