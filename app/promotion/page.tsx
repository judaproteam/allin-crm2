import { getCrntUser } from '@/auth/authFuncs'
import GroupForm from '@/components/form/forms/GroupForm'
import PromoForm from '@/components/form/forms/PromoForm'
import PromoTable from '@/components/promoTable/Table'
import SelectPromo from '@/components/selects/SelectPromo'
import { getAgntsTotal, getMapAgnts } from '@/db/agnt/getTotal'
import { getAgntsGroups } from '@/db/agntsGroup'
import { db } from '@/db/db'
import PromoCard from '@/ui/cards/PromoCard'
import { Role } from '@prisma/client'

type AgntList = {
  id: number
  name: string
}[]

export default async function PromotionPage({ searchParams }) {
  const promoId = searchParams.promoId

  const agntsTotal = (await getAgntsTotal()) as any[]

  const promos = await db.promo.findMany({
    orderBy: { createdAt: 'desc' },
  })

  // promo {
  //   id: 1,
  //   title: 'טיסה לחו"ל',
  //   desc: 'לראא משנה',
  //   target: 100000,
  //   branch: 'סיכונים',
  //   start: 2024-08-07T17:31:43.618Z,
  //   end: 2024-08-07T17:31:43.618Z,
  //   img: '/promo.jpg',
  //   createdAt: 2024-08-07T15:36:29.151Z,
  //   updatedAt: 2024-08-07T15:36:29.151Z
  // }

  const promo = promoId ? promos.find((p) => p.id == promoId) : promos[0]

  console.log('promo', promo)

  agntsTotal.forEach((agnt) => {
    const promoBranch = promo.branch
    agnt.agntBranchSum = promoBranch === 'משוקלל' ? agnt.agntTotal : agnt[promoBranch]

    if (!agnt.agntBranchSum) agnt['goal'] = 0 // return
    agnt['goal'] = Math.round((agnt.agntBranchSum / promo.target) * 100)
  })

  const agnts = (await getMapAgnts()) as AgntList

  const user = await getCrntUser()
  const crntAgnt = agntsTotal.find((agnt) => agnt.agntId === user.id)

  const agntsGroups = await getAgntsGroups()

  return (
    <main className="overflow-x-hidden">
      <section className="m-8">
        <div className="flex gap-4 mb-8 items-end">
          <SelectPromo promos={promos} />

          {user.role === Role.MNGR && (
            <>
              <button className="btn-soft h-10" popoverTarget="createGroup">
                הוסף קבוצה
              </button>
              <button className="btn h-10" popoverTarget="createPromo">
                הוסף מבצע
              </button>
            </>
          )}
        </div>

        <div popover="auto" id="createGroup" className="pop max-h-5/6 rounded-md">
          <GroupForm agnts={agnts} />
        </div>

        <div popover="auto" id="createPromo" className="pop h-5/6 rounded-md">
          <PromoForm agntsGroups={agntsGroups} />
        </div>
        <PromoCard promo={promo} crntAgnt={crntAgnt} user={user} />
      </section>

      <PromoTable agntsTotal={agntsTotal} key={Math.random()} />
    </main>
  )
}
