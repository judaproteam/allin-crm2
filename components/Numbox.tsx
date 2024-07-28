import { toCurrency } from '@/utils/func'

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
      <h2>{toCurrency(num)}</h2>
    </main>
  )
}

export function Numboxs({ sales }) {
  return (
    <>
      <Numbox title="אלמנטרי" num={sales['אלמנטרי']} />
      <Numbox title="סיכונים" num={sales['סיכונים']} />
      <Numbox title="פיננסי - שוטף משונת" num={sales['פיננסי']['הפקדה חודשית']} />
      <Numbox title="פיננסי - ניודים" num={sales['פיננסי']['ניוד']} />
      <Numbox title="פיננסי - הפקדה חד פעמית" num={sales['פיננסי']['הפקדה חד פעמית']} />

      <Numbox title="פנסיוני - שוטף משונת" num={sales['פנסיוני']['הפקדה חודשית']} />
      <Numbox title="פנסיוני - ניודים" num={sales['פנסיוני']['ניוד']} />

      <Numbox title="כתב שירות חיצוני" num={sales['כתב שירות חיצוני']} />
      <Numbox title="נסיעות לחול" num={sales['נסיעות לחול']} />
      <Numbox title="קצבה מיידית" num={sales['קצבה מיידית']} />
      <Numbox title="תאונות אישיות" num={sales['תאונות אישיות']} />
      <Numbox title='אכ"ע' num={sales['אכ"ע']} />
    </>
  )
}
