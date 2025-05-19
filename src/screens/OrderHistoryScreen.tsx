import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"
import OrderHistoryItem from "../components/OrderHistoryItem"

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
          orders.map((order) => <OrderHistoryItem key={order.id} order={order} />)
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    title: {
      fontSize: 20,
      color: "#93c5fd",
      fontWeight: "600",
      marginBottom: 12,
    },
    empty: {
      color: "#60a5fa",
      fontSize: 16,
      textAlign: "center",
      marginTop: 32,
    },
  })
  

