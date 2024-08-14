'use client'

import { useContext, useState, createContext } from 'react'
import { User } from './types'

const UserCtx = createContext(null)

export default function UserProvider({ children, data }) {
  const [user, setUser] = useState(data)

  return <UserCtx.Provider value={{ user, setUser }}>{children}</UserCtx.Provider>
}

export function useUser() {
  const ctx = useContext(UserCtx)
  if (!ctx) throw new Error('useUser must be used within a UserProvider')

  return ctx as {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<any>>
  }
}
