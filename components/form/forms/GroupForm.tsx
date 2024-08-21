'use client'

import { createAgntsGroup } from '@/db/agntsGroup'
import Input from '@/ui/forms/Input'
import { showPop } from 'jude_ui/pop'
import Icon from '@/ui/Icon'
import SelectChip from '@/ui/SelectChip'
import { useState } from 'react'

export default function GroupForm({ agnts }) {
  const [chips, setChips] = useState([])

  async function onSubmit() {
    showPop({ msg: 'שומר קבוצה...', icon: 'loading' })
    const agntIds = chips.map((chip) => {
      return { id: Number(chip.id) }
    })
    const groupName = document.getElementById('groupName') as HTMLInputElement

    await createAgntsGroup({ agntIds, name: groupName.value })
    showPop({ msg: 'הקבוצה נוצרה בהצלחה', icon: 'success' })
  }

  return (
    <div className="p-6 w-[600px]">
      <div className="flex justify-between border-b pb-3 mb-6 items-end">
        <h2 className="flex gap-4 ">
          <Icon name="users" type="reg" className="size-7" />
          <span className="text-xl font-semibold">יצירת קבוצה חדשה</span>
        </h2>
        <button className="btn h-10" type="button" onClick={onSubmit}>
          <Icon name="floppy-disk" type="sol" className="size-4" />
          <p>שמור קבוצה</p>
        </button>
      </div>

      <div className="grid grid-cols-2 items-end">
        <Input id="groupName" lbl="שם הקבוצה" className="mb-4" />
        <SelectChip agntsList={agnts} chips={chips} setChips={setChips} />
      </div>
    </div>
  )
}
