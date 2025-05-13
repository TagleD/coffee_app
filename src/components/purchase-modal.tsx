"use client"

import { useState } from "react"
import { Bean, DollarSign, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface PurchaseModalProps {
  coffee: {
    id: number
    name: string
    description: string
    price: number
    beanPoints: number
    image: string
    tags: string[]
  }
  isOpen: boolean
  onClose: () => void
  onAddToBasket: () => void
}

export default function PurchaseModal({ coffee, isOpen, onClose, onAddToBasket }: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToBasket = () => {
    onAddToBasket()
    onClose()
  }

  const canPayWithBeans = true // This would be determined by user's bean balance

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-blue-900 text-white max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl text-white">{coffee.name}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-blue-400 h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-blue-400">Select quantity and payment method</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 my-4">
          <img
            src={coffee.image || "/placeholder.svg"}
            alt={coffee.name}
            className="w-24 h-24 rounded-md object-cover bg-blue-900/30"
          />
          <div>
            <div className="flex gap-1 mb-2">
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
            <p className="text-sm text-blue-300">{coffee.description}</p>
            <div className="flex items-center mt-2 text-white">
              <DollarSign className="h-4 w-4 text-blue-400 mr-1" />
              <span className="font-bold">${coffee.price.toFixed(2)}</span>
              <span className="mx-2 text-blue-500">|</span>
              <Bean className="h-4 w-4 text-blue-400 mr-1" />
              <span>{coffee.beanPoints} beans</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-950/20 rounded-md p-3 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-blue-300">Quantity</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                className="h-8 w-8 rounded-full border-blue-800 text-blue-300"
                disabled={quantity <= 1}
              >
                <span>-</span>
              </Button>
              <span className="text-white font-medium w-6 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                className="h-8 w-8 rounded-full border-blue-800 text-blue-300"
              >
                <span>+</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-blue-300">Total:</span>
            <div className="text-right">
              <div className="text-white font-bold">${(coffee.price * quantity).toFixed(2)}</div>
              <div className="text-blue-400 text-xs">Earn {coffee.beanPoints * quantity} beans</div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-3 sm:gap-3">
          <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white" onClick={handleAddToBasket}>
            <DollarSign className="h-4 w-4 mr-2" />
            Pay with Money
          </Button>

          <Button
            className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            disabled={!canPayWithBeans}
            onClick={handleAddToBasket}
          >
            <Bean className="h-4 w-4 mr-2" />
            Pay with Beans
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
