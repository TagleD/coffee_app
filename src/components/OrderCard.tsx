import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

type Product = {
  id: number
  name: string
  image: string
  price: number
  bean_price: number
}

type OrderItem = {
  product: Product
  quantity: number
  price_per_item: string
}

type Order = {
  id: number
  created_at: string
  total_price: string
  beans_earned: number
  items: OrderItem[]
}

export default function OrderCard({ order }: { order: Order }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather name="shopping-bag" size={16} color="#60a5fa" />
        <Text style={styles.title}>
          Заказ #{order.id} • {new Date(order.created_at).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.beans}>+{order.beans_earned} beans</Text>

      {order.items.map((item, idx) => (
        <Text key={idx} style={styles.item}>
          {item.quantity}× {item.product?.name} — {item.price_per_item}₸
        </Text>
      ))}

      <Text style={styles.total}>Итого: {parseFloat(order.total_price).toFixed(2)}₸</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e3a8a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#60a5fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
  beans: {
    color: "#fbbf24",
    fontSize: 13,
    marginBottom: 8,
  },
  item: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  total: {
    color: "#93c5fd",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 8,
    textAlign: "right",
  },
})
