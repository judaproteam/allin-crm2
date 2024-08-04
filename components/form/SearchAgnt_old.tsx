'use client'

import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Search({ agnts }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const popRef = useRef(null)
  const searchRef = useRef(null)
  const [agntsState, setAgntsState] = useState(agnts)

  useEffect(() => {
    const right = window.innerWidth - searchRef.current.offsetLeft - 160
    const top = searchRef.current.offsetTop + 25

    popRef.current.style.right = `${right}px`
    popRef.current.style.top = `${top}px`
  }, [])

  function onFocus(e) {
    popRef.current.showPopover()
  }

  function onSelect(agtn) {
    searchRef.current.value = agtn.firstName + ' ' + agtn.lastName
    popRef.current.hidePopover()

    let qParams = Object.fromEntries(new URLSearchParams(searchParams)) as any
    qParams = { ...qParams, agntId: agtn.id }

    const url = new URLSearchParams(qParams).toString()
    router.replace('?' + url, { scroll: false })
  }

  function onTermChange(e) {
    const term = e.target.value
    const filtered = agnts.filter((item) =>
      ['firstName', 'lastName'].some((header) => item[header].includes(term))
    )
    setAgntsState(filtered)
  }

  return (
    <main>
      <label className="input-s">
        <input type="text" onClick={onFocus} className="" ref={searchRef} readOnly />
      </label>
      <div
        popover="auto"
        id="popSearch"
        className="m-0 inset-0 absolute shadow rounded"
        ref={popRef}>
        <div className="w-40 max-h-52">
          <label className="input-icon">
            <Icon name="magnifying-glass" type="sol" className="size-4 rtl:scale-x-100" />
            <input type="text" onChange={onTermChange} className="" autoFocus />
          </label>
          {agntsState.map((agtn) => (
            <p
              key={agtn.id}
              onClick={() => onSelect(agtn)}
              className="hover:bg-slate-100 active:bg-slate-200 py-1 px-2 cursor-pointer">
              {agtn.firstName} {agtn.lastName}
            </p>
          ))}
        </div>
      </div>
    </main>
  )
}
