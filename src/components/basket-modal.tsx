"use client"

import { ShoppingBag, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface BasketItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface BasketModalProps {
  isOpen: boolean
  onClose: () => void
  items: BasketItem[]
  onRemoveItem: (id: number) => void
  onClearBasket: () => void
  onCheckout: () => void
}

export default function BasketModal({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearBasket,
  onCheckout,
}: BasketModalProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-blue-900 text-white max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl text-white flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-blue-400" />
              Your Basket ({totalItems})
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-blue-400 h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-blue-400">Review your items before checkout</DialogDescription>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="py-8 text-center">
            <ShoppingBag className="h-12 w-12 mx-auto text-blue-900 mb-3" />
            <p className="text-blue-400">Your basket is empty</p>
            <Button variant="outline" className="mt-4 border-blue-800 text-blue-300" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[300px] pr-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover bg-blue-900/30"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-blue-300 text-sm">Qty: {item.quantity}</span>
                        <span className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-blue-400 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-4">
              <Separator className="bg-blue-900 mb-3" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">Shipping</span>
                  <span className="text-white">$3.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">Tax</span>
                  <span className="text-white">${(subtotal * 0.08).toFixed(2)}</span>
                </div>
                <Separator className="bg-blue-900 my-2" />
                <div className="flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">${(subtotal + 3.99 + subtotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col gap-3 sm:gap-3 mt-4">
              <Button className="w-full bg-blue-700 hover:bg-blue-600 text-white" onClick={onCheckout}>
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="w-full border-blue-800 text-blue-300" onClick={onClearBasket}>
                Clear Basket
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
