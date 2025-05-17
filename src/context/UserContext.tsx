// src/context/UserContext.tsx

import React, { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

type User = {
    first_name: string
    last_name: string
    avatar: string | null
    beans: number               // текущее количество (можно тратить)
    beans_total: number        // накопленные за всё время
    level: number              // текущий уровень
    next_level_beans: number | null // сколько нужно до следующего уровня
  }

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)