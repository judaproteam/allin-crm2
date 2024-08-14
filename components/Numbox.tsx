import { toCurrency } from '@/utils/func'
import { ShowMore } from 'jude_ui/showMore'

export function Numbox({ title, num, info = false, className = '' }) {
  return (
    <main className={`num-box ${className}`}>
      <span>{title}</span>
      {info && (
        <>
          <span className="mx-2">−</span>
          <span>{info}</span>
        </>
      )}
      <h2>{toCurrency(num | 0)}</h2>
    </main>
  )
}

export function Numboxs({ sales }) {
  return (
    <>
      <div className="flex gap-4">
        <Numbox title="סיכונים" num={sales['סיכונים']} className="min-w-52" />
        <Numbox
          title="פיננסי - שוטף משונת"
          num={sales['פיננסי']['הפקדה חודשית']}
          className="min-w-52"
        />
        <Numbox title="פיננסי - ניודים" num={sales['פיננסי']['ניוד']} className="min-w-52" />
        <Numbox
          title="פיננסי - הפקדה חד פעמית"
          num={sales['פיננסי']['הפקדה חד פעמית']}
          className="min-w-52"
        />
        <Numbox
          title="פנסיוני - שוטף משונת"
          num={sales['פנסיוני']['הפקדה חודשית']}
          className="min-w-52"
        />
        <Numbox title="פנסיוני - ניודים" num={sales['פנסיוני']['ניוד']} className="min-w-52" />
      </div>

      <ShowMore lbl="ענפים נוספים" prntCls="mt-4 inline-block">
        <div className="flex gap-4">
          <Numbox title="אלמנטרי" num={sales['אלמנטרי']} />
          <Numbox title="כתב שירות חיצוני" num={sales['כתב שירות חיצוני']} />
          <Numbox title="נסיעות לחול" num={sales['נסיעות לחול']} />
          <Numbox title="קצבה מיידית" num={sales['קצבה מיידית']} />
          <Numbox title="תאונות אישיות" num={sales['תאונות אישיות']} />
          <Numbox title='אכ"ע' num={sales['אכ"ע']} />
        </div>
      </ShowMore>
    </>
  )
}
