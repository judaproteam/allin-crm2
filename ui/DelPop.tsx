'use client'

import { useEffect } from 'react'
import Icon from './Icon'

type DeletePopProps = {
  txt: string
  onDel: () => void
}

let delPop

export default function DelPop({ txt = '', onDel }: DeletePopProps) {
  useEffect(() => {
    delPop = document.getElementById('delPop')
  }, [])

  function onClick() {
    delPop?.hidePopover()
    onDel()
  }

  return (
    <div id="delPop" popover="auto" className="pop p-4 rounded-md">
      <div className="flex gap-3 border-b pb-1 mb-4">
        <Icon name="triangle-exclamation" />
        <p className="">פעולת מחיקה</p>
      </div>
      <p className="text-lg">{txt}</p>
      <button className="softBtn-s-r w-full mt-6" onClick={onClick}>
        <p>כן מחק</p>
        <Icon name="trash" />
      </button>
    </div>
  )
}
