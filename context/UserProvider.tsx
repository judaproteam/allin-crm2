'use client'

import { createContext, useContext, useState } from 'react'

export const UserContext = createContext(null)

export default function UserProvider({ children, crntUser }) {
  const [user, setUser] = useState(crntUser)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')

  return context?.user
}
