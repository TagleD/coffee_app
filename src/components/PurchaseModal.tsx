"use client"

import React, { useState } from "react"
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import Badge from "./Badge"
import { useBasket, Coffee } from "../context/BasketContext"
import { getFullImageUrl } from "../services/GetfullImageUri"

type Props = {
  visible: boolean
  onClose: () => void
  coffee: Coffee | null
  userBeans: number
}

const PurchaseModal = ({ visible, onClose, coffee, userBeans }: Props) => {
  const [quantity, setQuantity] = useState(1)
  const { items, addToBasket } = useBasket()

  if (!coffee) return null

  const beansUsed = items.reduce(
    (acc, item) => acc + (item.bean_price || 0) * item.quantity,
    0
  )

  const totalBeansNeeded = (coffee.bean_price || 0) * quantity
  const enoughBeans = userBeans - beansUsed >= totalBeansNeeded

  const handleAddToBasketMoney = () => {
    if (!coffee) return
    addToBasket(coffee, quantity)
    onClose()
  }

  const handleAddToBasketBeans = () => {
    if (!coffee || !enoughBeans) return
    const freeCoffee = { ...coffee, price: 0 }
    addToBasket(freeCoffee, quantity)
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>{coffee.name}</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={20} color="#166534" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Выберите количество и способ оплаты</Text>

          <Image source={{ uri: getFullImageUrl(coffee.image) }} style={styles.image} />
          <Text style={styles.description}>{coffee.description}</Text>

          <View style={styles.badgeRow}>
            {coffee.tags.map((tag, idx) => (
              <Badge key={idx} label={tag.name} />
            ))}
          </View>

          <Text style={styles.price}>
            {coffee.price}тг. | {coffee.bean_price} beans
          </Text>

          <View style={styles.quantityRow}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.control}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.control}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.moneyButton} onPress={handleAddToBasketMoney}>
              <Text style={styles.buttonText}>Оплатить за тенге</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.beanButton, !enoughBeans && styles.disabledButton]}
              onPress={handleAddToBasketBeans}
              disabled={!enoughBeans}
            >
              <Text style={styles.buttonText}>Оплатить beans</Text>
            </TouchableOpacity>
          </View>

          {!enoughBeans && (
            <Text style={styles.warning}>
              Недостаточно beans. Нужно {totalBeansNeeded}, у вас осталось {userBeans - beansUsed}.
            </Text>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 12,
    borderColor: "#d1fae5",
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#166534",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#4d7c0f",
    marginBottom: 10,
    marginTop: 4,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#f0fdf4",
  },
  description: {
    color: "#166534",
    fontSize: 14,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  price: {
    color: "#4d7c0f",
    fontWeight: "bold",
    marginBottom: 10,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 16,
  },
  control: {
    fontSize: 20,
    color: "#166534",
    width: 32,
    height: 32,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#d1fae5",
    borderRadius: 8,
    lineHeight: 32,
  },
  quantity: {
    fontSize: 18,
    color: "#166534",
    fontWeight: "bold",
  },
  buttonRow: {
    gap: 10,
  },
  moneyButton: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  beanButton: {
    backgroundColor: "#4d7c0f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  disabledButton: {
    opacity: 0.5,
  },
  warning: {
    color: "#f87171",
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },
})

export default PurchaseModal