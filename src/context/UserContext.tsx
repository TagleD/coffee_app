// src/context/UserContext.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import api from "../services/api"

type User = {
  first_name: string
  last_name: string
  avatar: string | null
  beans: number
}

const UserContext = createContext<{ user: User | null }>({ user: null })

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/profile/")
        setUser(res.data)
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}