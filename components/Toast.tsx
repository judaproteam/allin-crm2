'use client'

import { useState } from 'react'
import Icon from './Icon'

type toastType = {
  msg?: string
  icon?: string
  className?: string
  show?: boolean
}

export let showToast

export default function ToastComp() {
  const [toast, setToast] = useState<toastType>({ show: false })

  showToast = (props: toastType) => {
    setToast({ ...props, show: true })

    setTimeout(() => {
      setToast({ ...toast, show: false })
    }, 6000)
  }

  return (
    <>
      {toast.show && (
        <div className={`toast ${toast.className}`}>
          <Icon name={toast.icon || 'ban'} type="reg" />
          <p>{toast.msg}</p>
        </div>
      )}
    </>
  )
}
