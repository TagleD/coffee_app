"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"

export interface Coffee {
  id: number
  name: string
  description: string
  price: number
  beanPoints: number
  image: string
  tags: string[]
}

export interface BasketItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface BasketContextType {
  items: BasketItem[]
  addToBasket: (coffee: Coffee, quantity: number) => void
  removeFromBasket: (id: number) => void
  clearBasket: () => void
  totalItems: number
  subtotal: number
}

const BasketContext = createContext<BasketContextType | undefined>(undefined)

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BasketItem[]>([])

  const addToBasket = (coffee: Coffee, quantity = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === coffee.id)

      if (existingItem) {
        return prev.map((item) => (item.id === coffee.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        return [
          ...prev,
          {
            id: coffee.id,
            name: coffee.name,
            price: coffee.price,
            quantity: quantity,
            image: coffee.image,
          },
        ]
      }
    })
  }

  const removeFromBasket = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearBasket = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <BasketContext.Provider
      value={{
        items,
        addToBasket,
        removeFromBasket,
        clearBasket,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}

export const useBasket = () => {
  const context = useContext(BasketContext)
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider")
  }
  return context
}
