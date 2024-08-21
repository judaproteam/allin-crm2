'use client'

import { createAgntsGroup } from '@/db/agntsGroup'
import { Input } from 'jude_ui/form'
import { showPop } from 'jude_ui/pop'
import Icon from 'jude_ui/icon'
import { useState } from 'react'
import { AgntList } from '@/utils/types'
import InputSearchChip from '@/ui/InputSearchChip'
import { Btn } from 'jude_ui/btns'

export default function GroupForm({ agnts }) {
  const [chips, setChips] = useState<AgntList>([])

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
    <div className="w-[600px] max-h-[75vh]">
      <div className="flex justify-between border-b pb-3 mb-6 items-end">
        <h2 className="flex gap-4 ">
          <Icon name="users" type="reg" className="size-7" />
          <span className="text-xl font-semibold">יצירת קבוצה חדשה</span>
        </h2>

        <Btn onClick={onSubmit} icon="floppy-disk" clr="solid" lbl="שמור קבוצה" />
      </div>

      <div className="">
        <Input id="groupName" lbl="שם הקבוצה" className="mb-4" />
        <InputSearchChip agntsList={agnts} chips={chips} setChips={setChips} />
      </div>
    </div>
  )
}
