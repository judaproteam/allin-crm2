'use client'

import { useEffect, useState } from 'react'
import Icon from './Icon'
import { createAgntsGroup } from '@/db/agntsGroup'

type AgntList = {
  id: number
  name: string
}[]

export default function SelectChip({ agntsList = [], chips, setChips }) {
  const [agnts, setAgnts] = useState<AgntList>(agntsList)

  useEffect(() => {
    htmlOptions()
  }, [agnts])

  function htmlOptions() {
    const options = [
      <option value="" key={0}>
        בחר סוכנים...
      </option>,
    ]
    for (const id in agnts) {
      options.push(
        <option value={id} key={id}>
          {agnts[id].name}
        </option>
      )
    }
    return options
  }

  function onSelect(e) {
    const id = e.target.value

    setChips([...chips, { id, name: agnts[id].name }])
    const tmpAgnts = { ...agnts }
    delete tmpAgnts[id]
    setAgnts(tmpAgnts)
  }

  function removeItem(i) {
    const tmpChips = [...chips]
    tmpChips.splice(i, 1)
    setChips(tmpChips)
  }

  async function onSubmit() {
    // connect: agnts.map((agnt) => ({ id: agnt.id })),
    const agntIds = chips.map((chip) => {
      return { id: Number(chip.id) }
    })

    await createAgntsGroup({ agntIds, name: 'cool group' })
  }

  return (
    <>
      <label className="slct mb-4">
        <select onChange={onSelect}>{htmlOptions()}</select>
      </label>

      <div className="col-span-2">
        {chips.map((chip, i) => {
          return (
            <div
              className="inline-flex items-center gap-3 text-sm bg-white border rounded-full py-1 pl-1.5 pr-3 me-2 mb-2"
              key={chip.id}>
              <p className="whitespace-nowrap font-medium">{chip.name}</p>
              <button onClick={() => removeItem(i)} className="pe-1" title="הסר סוכן מהקבוצה">
                <Icon name="xmark" className="size-3.5 hover:bg-red-700" type="lit" />
              </button>
            </div>
          )
        })}
      </div>

      {/* <button onClick={onSubmit} className="btn">
        שמור לקבוצה
      </button> */}
    </>
  )
}
