import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import { getFullImageUrl } from "../services/GetfullImageUri"

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

export default function OrderHistoryItem({ order }: { order: Order }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Feather name="shopping-bag" size={16} color="#60a5fa" />
        <Text style={styles.title}>
          Заказ #{order.id} • {new Date(order.created_at).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.beans}>+{order.beans_earned} beans</Text>

      <View style={styles.imageRow}>
        {order.items.map((item, idx) => (
          <Image
            key={idx}
            source={{ uri: getFullImageUrl(item.product?.image || "") }}
            style={styles.productImage}
          />
        ))}
      </View>

      {order.items.map((item, idx) => (
        <Text key={idx} style={styles.item}>
          {item.quantity}× {item.product?.name} — {item.price_per_item}₸
        </Text>
      ))}

      <Text style={styles.total}>
        Итого: {parseFloat(order.total_price).toFixed(2)}₸
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(30, 58, 138, 0.2)",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#1e40af",
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
    fontWeight: "600",
    marginBottom: 8,
  },
  imageRow: {
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
    gap: 8,
  },
  productImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "rgba(30,58,138,0.4)",
  },
  item: {
    color: "#fff",
    fontSize: 13,
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

