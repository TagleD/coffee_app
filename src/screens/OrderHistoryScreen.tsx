import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"

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

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const token = await AsyncStorage.getItem("token")
      const res = await api.get("order_history/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrders(res.data)
      setLoading(false)
    }
    fetchOrders()
  }, [])

  if (loading) return <ActivityIndicator color="#fff" style={{ marginTop: 50 }} />

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>История заказов</Text>
        {orders.length === 0 ? (
          <Text style={styles.empty}>Нет заказов</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.card}>
              <Text style={styles.date}>Заказ #{order.id} — {new Date(order.created_at).toLocaleDateString()}</Text>
              <Text style={styles.beans}>+{order.beans_earned} beans</Text>
              {order.items.map((item, idx) => (
                <Text key={idx} style={styles.item}>
                  {item.quantity}× {item.product?.name} — {item.price_per_item}₸
                </Text>
              ))}
              <Text style={styles.total}>Итого: {order.total_price}₸</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    title: { fontSize: 22, color: "#fff", fontWeight: "bold", marginBottom: 16 },
    empty: { color: "#60a5fa", fontSize: 16 },
    card: {
      backgroundColor: "#1e3a8a",
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    date: { color: "#fff", fontWeight: "bold" },
    beans: { color: "#fbbf24", marginTop: 4 },
    item: { color: "#fff", marginTop: 4 },
    total: { color: "#93c5fd", fontWeight: "bold", marginTop: 8 },
  })
  