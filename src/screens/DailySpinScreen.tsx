import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useUser } from "../context/UserContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"


export default function DailySpinScreen() {
  const { fetchAndSetUser } = useUser()
  const [spinning, setSpinning] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const spinAnim = useState(new Animated.Value(0))[0]

  const spin = async () => {
    setSpinning(true)

    try {
      const token = await AsyncStorage.getItem("token")
      const res = await api.post("/daily_spin/", {}, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const won = res.data.beans_won

      // Рандомная позиция, приближенная к выигранному сектору
      const rewardSectors = [
        { value: 500, start: 337.5, end: 22.5 },
        { value: 100, start: 22.6, end: 67.5 },
        { value: 50, start: 67.6, end: 112.5 },
        { value: 200, start: 112.6, end: 157.5 },
        { value: 300, start: 157.6, end: 202.5 },
        { value: 300, start: 202.6, end: 247.5 },
        { value: 1000, start: 247.6, end: 292.5 },
        { value: 200, start: 292.6, end: 337.5 },
      ]

      const matchingSector = rewardSectors.find(
        s => s.value === won
      )
      
      // Вращаем в центр нужного сектора
      const rounds = 5
      const { start, end } = matchingSector!
        const centerAngle = (start > end)
        ? ((start + (360 + end)) / 2) % 360
        : (start + end) / 2

        const normalizedAngle = (90 - centerAngle + 360) % 360
        const targetAngle = 360 * rounds + normalizedAngle

      Animated.timing(spinAnim, {
        toValue: targetAngle,
        duration: 3000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(async () => {
        Alert.alert("Поздравляем!", `Вы получили ${won} beans!`)
        await fetchAndSetUser()
        setDisabled(true)
        setSpinning(false)
      })
    } catch (err: any) {
      Alert.alert("Ошибка", err?.response?.data?.detail || "Ошибка прокрутки")
      setSpinning(false)
    }
  }

  const rotation = spinAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ежедневное колесо удачи</Text>
      <View style={styles.wheelWrapper}>
        {/* Стрелка — НЕ вращается */}
        <View style={styles.pointer} />

            {/* Само вращающееся колесо */}
            <Animated.View style={[styles.wheel, { transform: [{ rotate: rotation }] }]}>
                <Image source={require("../../assets/spin.png")} style={styles.image} />
            </Animated.View>
        </View>

      <TouchableOpacity
        style={[styles.button, disabled && styles.disabled]}
        onPress={spin}
        disabled={spinning || disabled}
      >
        <Text style={styles.buttonText}>{spinning ? "Крутим..." : "Крутить"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  title: { fontSize: 22, color: "#fff", marginBottom: 24 },
  wheel: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 4,
    borderColor: "#1e3a8a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "#1e40af",
  },
  wheelWrapper: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  
  pointer: {
    position: "absolute",
    top: 0, // теперь внизу
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#60a5fa", // светло-синий
    zIndex: 10,
  },
  sector: {
    position: "absolute",
  },
  sectorText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  button: {
    backgroundColor: "#1d4ed8",
    padding: 16,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})