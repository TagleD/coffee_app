// src/context/UserContext.tsx
import React, { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import api from "../services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

type User = {
  first_name: string
  last_name: string
  avatar: string | null
  beans: number
  beans_total: number
  level: number
  next_level_beans: number | null
}

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
  fetchAndSetUser: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  fetchAndSetUser: async () => {}, // по умолчанию пустая
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const fetchAndSetUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const res = await api.get("profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(res.data)
    } catch (err) {
      console.error("⚠️ Ошибка при обновлении профиля:", err)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchAndSetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)