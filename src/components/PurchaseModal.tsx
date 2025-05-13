"use client"

import type React from "react"
import { useState } from "react"
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { Feather } from "@expo/vector-icons"
import Badge from "./Badge"
import { useBasket, type Coffee } from "../context/BasketContext"

interface PurchaseModalProps {
  coffee: Coffee | null
  visible: boolean
  onClose: () => void
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ coffee, visible, onClose }) => {
  const [quantity, setQuantity] = useState(1)
  const { addToBasket } = useBasket()

  if (!coffee) return null

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToBasket = () => {
    addToBasket(coffee, quantity)
    onClose()
    setQuantity(1) // Reset quantity when modal closes
  }

  const canPayWithBeans = true // This would be determined by user's bean balance

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>{coffee.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color="#60a5fa" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Select quantity and payment method</Text>

          <View style={styles.coffeeDetails}>
            <Image source={{ uri: coffee.image || "https://via.placeholder.com/80" }} style={styles.image} />
            <View style={styles.detailsContent}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
                {coffee.tags.map((tag, index) => (
                  <Badge key={index} label={tag} />
                ))}
              </ScrollView>
              <Text style={styles.description}>{coffee.description}</Text>
              <View style={styles.priceContainer}>
                <Feather name="dollar-sign" size={16} color="#60a5fa" />
                <Text style={styles.price}>${coffee.price.toFixed(2)}</Text>
                <Text style={styles.separator}>|</Text>
                <Feather name="coffee" size={16} color="#60a5fa" />
                <Text style={styles.beans}>{coffee.beanPoints} beans</Text>
              </View>
            </View>
          </View>

          <View style={styles.quantitySection}>
            <View style={styles.quantityRow}>
              <Text style={styles.quantityLabel}>Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                  onPress={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <View>
                <Text style={styles.totalPrice}>${(coffee.price * quantity).toFixed(2)}</Text>
                <Text style={styles.earnBeans}>Earn {coffee.beanPoints * quantity} beans</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.moneyButton} onPress={handleAddToBasket}>
              <Feather name="dollar-sign" size={16} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Pay with Money</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.beansButton, !canPayWithBeans && styles.disabledButton]}
              onPress={handleAddToBasket}
              disabled={!canPayWithBeans}
            >
              <Feather name="coffee" size={16} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Pay with Beans</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1e3a8a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#60a5fa",
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  coffeeDetails: {
    flexDirection: "row",
    marginVertical: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "rgba(30, 58, 138, 0.3)",
  },
  detailsContent: {
    flex: 1,
    marginLeft: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#93c5fd",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 4,
  },
  separator: {
    color: "#2563eb",
    marginHorizontal: 8,
  },
  beans: {
    color: "#fff",
    marginLeft: 4,
  },
  quantitySection: {
    backgroundColor: "rgba(23, 37, 84, 0.2)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  quantityLabel: {
    color: "#93c5fd",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e40af",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityButtonText: {
    color: "#93c5fd",
    fontSize: 16,
  },
  quantityValue: {
    color: "#fff",
    fontWeight: "500",
    width: 24,
    textAlign: "center",
    marginHorizontal: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    color: "#93c5fd",
    fontSize: 14,
  },
  totalPrice: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "right",
  },
  earnBeans: {
    color: "#60a5fa",
    fontSize: 12,
    textAlign: "right",
  },
  buttonContainer: {
    marginTop: 8,
  },
  moneyButton: {
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  beansButton: {
    backgroundColor: "#1e3a8a",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  buttonIcon: {
    marginRight: 8,
  },
})

export default PurchaseModal
