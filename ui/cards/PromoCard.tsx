import { toCurrency, toDate } from '@/utils/func'
import { Promo, Role } from '@prisma/client'
import Icon from '../Icon'

type Props = {
  promo: Promo
  crntAgnt: any
  user: any
}

export default function PromoCard({ promo, crntAgnt, user }: Props) {
  console.log('crntAgnt?.goal ', crntAgnt)

  return (
    <section className="bg-white rounded-lg shadow-md p-6 max-w-5xl">
      <div className="flex justify-between">
        <h2 className="title">מבצע: {promo.title}</h2>

        {user.role === Role.MNGR && (
          <div className="flex gap-2">
            <button
              className="bg-blue-50 size-10 rounded-md grid place-items-center"
              title="מחיקת מבצע">
              <Icon name="pen" type="reg" className="bg-blue-900 rtl:scale-x-100" />
            </button>
            <button
              className="bg-red-50 size-10 rounded-md grid place-items-center"
              title="מחיקת מבצע">
              <Icon name="trash" type="reg" className="bg-red-900" />
            </button>
          </div>
        )}
      </div>

      <div className="progress mt-4 items-center">
        <img src={promo.img} alt="card" className="size-28 rounded-md" />
        <pre>{promo.desc}</pre>

        <section>
          <div className="flex justify-between">
            <span>
              <p className="title">{toCurrency(crntAgnt?.agntBranchSum | 0)}</p>
              <p>סכום מ{promo.branch}</p>
              <p>מתאריך {toDate(promo.start)}</p>
            </span>
            <span className="text-left">
              <p className="title">{toCurrency(promo.target)}</p>
              <p>עד תאריך {toDate(promo.end)}</p>
            </span>
          </div>
          <div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs font-bold text-white text-center whitespace-nowrap transition duration-500"
              style={{ width: `${crntAgnt?.goal | 0}%` }}>
              {`${crntAgnt?.goal | 0}%`}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
