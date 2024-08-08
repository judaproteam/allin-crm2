import Input from '@/ui/forms/Input'
import Select from '@/ui/forms/Select'
import { insertPromo } from '@/db/promo/insertPromo'
import { extendedBranchList } from '@/db/lists'
import Textarea from '@/ui/forms/Textarea'
import Upload from '@/ui/cloudinary/Upload'
import DateRangeForm from './DateRangeForm'
import Icon from '@/ui/Icon'

export default function PromoForm({ agntsGroups }) {
  // {
  //   id: 2,
  //   name: 'קבוצת המחץ',
  //   agnts: [
  //     { id: 10, name: 'אביעד איתח' },
  //     { id: 11, name: 'אולי קונסטנטיני' },
  //     { id: 17, name: 'מושיקו מויאל' },
  //     { id: 18, name: 'רון לוי' },
  //     { id: 20, name: 'ברק שץ' }
  //   ]
  // }

  return (
    <div className="p-8 overflow-x-hidden">
      <h2 className="flex gap-4 border-b pb-3 mb-4">
        <Icon name="trophy-star" type="sol" className="size-7" />
        <span className="text-xl font-semibold">יצירת מבצע חדש</span>
      </h2>
      <form action={insertPromo} className="bg-white w-fit grid grid-cols-2 items-end gap-6">
        <Input field="title" lbl="שם מבצע" />
        <Input field="target" lbl="יעד המבצע" type="number" />
        <Textarea field="desc" lbl="תיאור המבצע" className="col-span-2 w-full" />
        <Select field="branch" list={extendedBranchList} lbl="בחירת ענף" />
        <DateRangeForm className="w-60" />
        {/* <Select field="group" list={agntsGroups.map((g) => g.name)} lbl="קבוצת סוכנים" /> */}
        <SelectGroup agntsGroups={agntsGroups} />

        <Upload className="col-span-2" />
        <button className="btn col-span-2 mt-4">
          <Icon name="floppy-disk" type="sol" />
          <p>שמור מבצע</p>
        </button>
      </form>
    </div>
  )
}

function SelectGroup({ agntsGroups }) {
  return (
    <label className="slct">
      {/* <p>בחר קבוצת סוכנים</p> */}

      <select name="group">
        <option value="" key="0">
          בחר קבוצת סוכנים
        </option>
        {agntsGroups.map((g) => (
          <option value={g.id} key={g.id}>
            {g.name}
          </option>
        ))}
      </select>
    </label>
  )
}
