import { proxy, useSnapshot } from 'valtio'
import { User } from './types'

export const userStore = proxy({
  user: null as User | null,
})

export function getUser() {
  const snap = useSnapshot(userStore as { user: User | null })

  return snap
}
