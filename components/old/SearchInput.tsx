'use client'

import { useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Role } from '@prisma/client'
import Icon from '@/ui/Icon'
import { useUser } from '@/utils/userCtx'

export default function SearchInput({ agnts }) {
  const { user } = useUser()
  if (user?.role != Role.MNGR) return null

  const router = useRouter()
  const searchParams = useSearchParams()

  const agntId = searchParams.get('agntId')
  const agntName = agnts.find((agnt) => agnt.id == agntId)?.name || ''
  const [searchValue, setSearchValue] = useState(agntName || 'הכל...')

  const popRef = useRef(null)

  const [agntsState, setAgntsState] = useState(agnts)

  function onFocus(e) {
    popRef.current.showPopover()
  }

  function onSelect(agtn) {
    popRef.current.hidePopover()
    agtn ? setSearchValue(agtn.name) : setSearchValue('הכל...')

    agtn
      ? setParam({ router, searchParams, field: 'agntId', value: agtn.id })
      : deleteParam({ router, searchParams, field: 'agntId' })
  }

  function onTermChange(e) {
    const term = e.target.value
    const filtered = agnts.filter((item) => ['name'].some((header) => item[header].includes(term)))
    setAgntsState(filtered)
  }

  return (
    <main className="mb-4">
      <label className="input-s w-44 ">
        <p>פלטר לפי סוכן</p>
        <div className="relative ">
          <input
            type="text"
            onClick={onFocus}
            className="inputAnchor cursor-pointer"
            value={searchValue}
            readOnly
          />
          <Icon
            name="chevron-down"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-500 size-3"
            type="reg"
          />
        </div>
      </label>
      <div popover="auto" id="popSearch" className="anchored-pop shadow-4 rounded" ref={popRef}>
        <div className="w-[168px] max-h-80">
          <label className="input-icon">
            <input
              type="text"
              onChange={onTermChange}
              className=""
              autoFocus
              placeholder="🔎︎  חפש סוכנים..."
            />
          </label>
          <p
            onClick={() => onSelect(false)}
            className="hover:bg-slate-100 active:bg-slate-200 py-1 px-2 mt-1 text-slate-500 cursor-pointer">
            הכל...
          </p>
          {agntsState.map((agtn) => (
            <p
              key={agtn.id}
              onClick={() => onSelect(agtn)}
              className="hover:bg-slate-100 active:bg-slate-200 py-1 px-2 cursor-pointer">
              {agtn.name}
            </p>
          ))}
        </div>
      </div>
    </main>
  )
}

function setParam({ router, searchParams, field, value }) {
  let params = Object.fromEntries(new URLSearchParams(searchParams)) as any
  params[field] = value

  const url = new URLSearchParams(params).toString()
  router.replace('?' + url, { scroll: false })
}

function deleteParam({ router, searchParams, field }) {
  let params = Object.fromEntries(new URLSearchParams(searchParams)) as any
  delete params[field]

  const url = new URLSearchParams(params).toString()
  router.replace('?' + url, { scroll: false })
}
