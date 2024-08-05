'use client'

import Icon from '../ui/Icon'

export default function PopMsg({
  msg,
  icon,
  id,
}: {
  msg: string
  icon: 'success' | 'error' | 'loading'
  id?: string
}) {
  return (
    <div className="popMsg" popover="auto" id={id}>
      <div className="flex ps-6 pe-9 py-2.5 font-medium text-white">
        {icons[icon]}
        <h3>{msg}</h3>
      </div>
    </div>
  )
}

const icons = {
  success: <Icon name="check" type="reg" className="bg-white rtl:scale-x-100 size-5" />,
  error: <Icon name="triangle-exclamation" type="reg" className="bg-white size-5" />,
  loading: (
    <div className="size-5 border-2 rounded-full border-white animate-spin border-t-transparent" />
  ),
}
