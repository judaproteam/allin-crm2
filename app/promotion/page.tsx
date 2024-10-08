import { getUser } from '@/auth/authFuncs'
import GroupForm from '@/components/form/forms/GroupForm'
import PromoForm from '@/components/form/forms/PromoForm'
import PromoTable from '@/components/promoTable/Table'
import SelectPromo from '@/components/selects/SelectPromo'
import { getAgntsTotal, getAllAgnts } from '@/db/agnt/getTotal'
import { getAgntsGroups } from '@/db/agntsGroup'
import { db } from '@/db/db'
import PromoCard from '@/ui/cards/PromoCard'
import { AgntList } from '@/utils/types'
import { Role } from '@prisma/client'

export default async function PromotionPage({ searchParams }) {
  const promoId = searchParams.promoId

  const agntsTotal = (await getAgntsTotal()) as any[]

  const promos = await db.promo.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const promo = promoId ? promos.find((p) => p.id == promoId) : promos[0]

  agntsTotal.forEach((agnt) => {
    const promoBranch = promo.branch
    agnt.agntBranchSum = promoBranch === 'משוקלל' ? agnt.agntTotal : agnt[promoBranch]

    if (!agnt.agntBranchSum) agnt['goal'] = 0 // return
    agnt['goal'] = Math.round((agnt.agntBranchSum / promo.target) * 100)
  })

  const agnts = (await getAllAgnts()) as AgntList

  const user = await getUser()
  const crntAgnt = agntsTotal.find((agnt) => agnt.agntId === user.id)

  const agntsGroups = await getAgntsGroups()

  return (
    <>
      <section className="my-8">
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
    </>
  )
}
