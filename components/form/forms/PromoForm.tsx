import { branchList } from '@/db/lists'
import Input from '@/ui/forms/Input'
import Select from '@/ui/forms/Select'
import { insertPromo } from '@/db/promo/insertPromo'

export default function PromoForm() {
  return (
    <main>
      <form action={insertPromo}>
        <Input field="title" lbl="שם מבצע" />
        <Input field="desc" lbl="תיאור המבצע" />
        <Input field="target" lbl="יעד המבצע" type="number" />

        <Select field="branch" list={['משוקלל', ...branchList]} lbl="בחירת ענף" />
        {/* <Input field='start' lbl='תאריך התחלה' />
            <Input field='end' lbl='תאריך סיום' /> */}

        <button className="btn">הוסף מבצע</button>
      </form>
    </main>
  )
}
