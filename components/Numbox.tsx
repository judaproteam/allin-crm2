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
      <Numbox title="סיכונים" num={sales['סיכונים'] | 0} />
      <Numbox title="פיננסי - שוטף משונת" num={sales['פיננסי']['הפקדה חודשית'] | 0} />
      <Numbox title="פיננסי - ניודים" num={sales['פיננסי']['ניוד'] | 0} />
      <Numbox title="פיננסי - הפקדה חד פעמית" num={sales['פיננסי']['הפקדה חד פעמית'] | 0} />

      <Numbox title="פנסיוני - שוטף משונת" num={sales['פנסיוני']['הפקדה חודשית'] | 0} />
      <Numbox title="פנסיוני - ניודים" num={sales['פנסיוני']['ניוד'] | 0} />

      <Numbox title="אלמנטרי" num={sales['אלמנטרי'] | 0} />
      <Numbox title="כתב שירות חיצוני" num={sales['כתב שירות חיצוני'] | 0} />
      <Numbox title="נסיעות לחול" num={sales['נסיעות לחול'] | 0} />
      <Numbox title="קצבה מיידית" num={sales['קצבה מיידית'] | 0} />
      <Numbox title="תאונות אישיות" num={sales['תאונות אישיות'] | 0} />
      <Numbox title='אכ"ע' num={sales['אכ"ע'] | 0} />
    </>
  )
}
