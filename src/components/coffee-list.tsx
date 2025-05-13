"use client"

import { useState } from "react"
import { Bean, Filter, Search, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PurchaseModal from "./purchase-modal"
import BasketModal from "./basket-modal"

interface Coffee {
  id: number
  name: string
  description: string
  price: number
  beanPoints: number
  image: string
  tags: string[]
}

interface BasketItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CoffeeList() {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false)
  const [basketItems, setBasketItems] = useState<BasketItem[]>([])

  const coffees = [
    {
      id: 1,
      name: "Ethiopian Yirgacheffe",
      description: "Floral and citrus notes with a light body",
      price: 18.99,
      beanPoints: 190,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Light Roast", "Floral"],
    },
    {
      id: 2,
      name: "Colombian Supremo",
      description: "Sweet caramel and nutty flavors with medium acidity",
      price: 16.5,
      beanPoints: 165,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Medium Roast", "Nutty"],
    },
    {
      id: 3,
      name: "Sumatra Mandheling",
      description: "Earthy, full-bodied with low acidity and chocolate notes",
      price: 19.99,
      beanPoints: 200,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Dark Roast", "Earthy"],
    },
    {
      id: 4,
      name: "Kenyan AA",
      description: "Bright acidity with berry and citrus notes",
      price: 21.5,
      beanPoints: 215,
      image: "/placeholder.svg?height=80&width=80",
      tags: ["Medium Roast", "Fruity"],
    },
  ]

  const openPurchaseModal = (coffee: Coffee) => {
    setSelectedCoffee(coffee)
    setIsPurchaseModalOpen(true)
  }

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false)
    setSelectedCoffee(null)
  }

  const openBasketModal = () => {
    setIsBasketModalOpen(true)
  }

  const closeBasketModal = () => {
    setIsBasketModalOpen(false)
  }

  const addToBasket = () => {
    if (!selectedCoffee) return

    setBasketItems((prev) => {
      const existingItem = prev.find((item) => item.id === selectedCoffee.id)

      if (existingItem) {
        return prev.map((item) => (item.id === selectedCoffee.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prev,
          {
            id: selectedCoffee.id,
            name: selectedCoffee.name,
            price: selectedCoffee.price,
            quantity: 1,
            image: selectedCoffee.image,
          },
        ]
      }
    })
  }

  const removeFromBasket = (id: number) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearBasket = () => {
    setBasketItems([])
  }

  const handleCheckout = () => {
    // Handle checkout logic
    alert("Proceeding to checkout!")
    closeBasketModal()
  }

  const totalItems = basketItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex flex-col h-full p-4 space-y-4 bg-black">
      <header>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Coffee Beans</h1>
          <Button
            variant="outline"
            size="icon"
            className="border-blue-900 text-blue-400 relative"
            onClick={openBasketModal}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
            <Input
              type="search"
              placeholder="Search coffees..."
              className="pl-8 bg-blue-950/30 border-blue-900 text-white placeholder:text-blue-400"
            />
          </div>
          <Button variant="outline" size="icon" className="border-blue-900 text-blue-400">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-auto space-y-3">
        {coffees.map((coffee) => (
          <Card key={coffee.id} className="bg-blue-950/20 border-blue-900">
            <CardContent className="p-3 flex">
              <img
                src={coffee.image || "/placeholder.svg"}
                alt={coffee.name}
                className="w-20 h-20 rounded-md object-cover mr-3 bg-blue-900/30"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-white">{coffee.name}</h3>
                  <div className="flex items-center text-blue-300 font-bold">
                    <span>${coffee.price}</span>
                  </div>
                </div>
                <p className="text-xs text-blue-400 mt-1 line-clamp-2">{coffee.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-1">
                    {coffee.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-[10px] border-blue-800 text-blue-300 bg-blue-950/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-blue-300">
                    <Bean className="h-3 w-3 mr-1" />
                    <span>{coffee.beanPoints}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-2 bg-blue-700 hover:bg-blue-600 text-xs h-8"
                  onClick={() => openPurchaseModal(coffee)}
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCoffee && (
        <PurchaseModal
          coffee={selectedCoffee}
          isOpen={isPurchaseModalOpen}
          onClose={closePurchaseModal}
          onAddToBasket={addToBasket}
        />
      )}

      <BasketModal
        isOpen={isBasketModalOpen}
        onClose={closeBasketModal}
        items={basketItems}
        onRemoveItem={removeFromBasket}
        onClearBasket={clearBasket}
        onCheckout={handleCheckout}
      />
    </div>
  )
}
