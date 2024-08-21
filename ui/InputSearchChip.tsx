'use client'

import { useState } from 'react'
import Icon from './Icon'
import { AgntList } from '@/utils/types'
import { Input } from 'jude_ui/form'
import { clone, removeItem } from 'jude_ui/funcs'

type Props = {
  agntsList: AgntList
  chips: AgntList
  setChips: React.Dispatch<React.SetStateAction<AgntList>>
}

export default function InputSearchChip({ agntsList = [], chips, setChips }: Props) {
  const [agnts, setAgnts] = useState<AgntList>(agntsList)

  function onAgntClick(id: number) {
    const index = agnts.findIndex((a) => a.id === id)
    setChips([...chips, agnts[index]])

    setAgnts(removeItem(agnts, id))
  }

  function removeChip(i) {
    const tmpChips = [...chips]
    const agnt = tmpChips.splice(i, 1)
    setChips(tmpChips)

    const tmpAgnts = [...agnts, ...agnt]
    setAgnts(tmpAgnts)
  }

  function onFilter(e) {
    const name = e.target.value
    const filtered = agnts.filter((item) => item.name.includes(name))

    name ? setAgnts(filtered) : setAgnts(agntsList)
  }

  return (
    <section className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <Input
          lbl="חיפוש סוכנים"
          placeholder="חיפוש סוכנים..."
          className="w-72"
          noLable
          required={false}
          onChange={onFilter}
        />
      </div>
      <div className="h-80 overflow-y-auto border rounded scroll-bar mb-8">
        {agnts.map((agnt) => {
          return (
            <span
              key={agnt.id}
              className="block border-b py-2 px-4 hover:bg-slate-100 w-full text-start cursor-pointer"
              onClick={() => onAgntClick(agnt.id)}>
              {agnt.name}
            </span>
          )
        })}
      </div>

      <div className="">
        {chips.map((chip, i) => {
          return (
            <div
              className="inline-flex items-center gap-3 text-sm bg-white border rounded-full py-1 pl-1.5 pr-3 me-2 mb-2"
              key={chip.id}>
              <p className="whitespace-nowrap font-medium">{chip.name}</p>
              <button onClick={() => removeChip(i)} className="pe-1" title="הסר סוכן מהקבוצה">
                <Icon name="xmark" className="size-3.5 hover:bg-red-700" type="lit" />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
