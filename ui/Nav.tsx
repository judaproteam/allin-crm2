'use client'

import Link from 'next/link'
import Icon from './Icon'
import { usePathname } from 'next/navigation'
import { logout } from '@/auth/authFuncs'

import { Role } from '@prisma/client'

export default function Nav({ user }: any) {
  const pathname = usePathname()

  function onLogout() {
    logout()
  }

  const active = 'bg-white'

  return (
    <nav className="bg-blue-950 w-[50px] h-screen fixed top-0 right-0 z-10">
      <div className="flex flex-col items-center justify-between h-full gap-6">
        <div>
          {navLinks.map((link, i) => {
            if (user.role != Role.MNGR && link.href == '/sum_sales') return null
            return (
              <Link
                key={i}
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
                title={link.title}>
                <Icon name={link.icon} className="bg-white size-5 rtl:scale-x-100" type="sol" />
              </Link>
            )
          })}
        </div>

        <button
          className="mx-auto size-8 grid place-items-center mb-4"
          title="התנתק"
          onClick={onLogout}>
          <Icon
            name="arrow-right-from-bracket"
            className="bg-white size-5 rtl:scale-x-100"
            type="sol"
          />
        </button>
      </div>
    </nav>
  )
}

const navLinks = [
  { icon: 'dollar-sign', href: '/', title: 'נתוני מכירות' },
  { icon: 'chart-pie', href: '/sum_sales', title: 'סיכום מכירות' },
  { icon: 'trophy-star', href: '/promotion', title: 'מבצעים' },
]
