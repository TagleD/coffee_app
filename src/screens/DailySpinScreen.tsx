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

      const rewardSectors = [
        { value: 500, start: 337.5, end: 22.5 },
        { value: 100, start: 22.6, end: 67.5 },
        { value: 50,  start: 67.6, end: 112.5 },
        { value: 200, start: 112.6, end: 157.5 },
        { value: 300, start: 157.6, end: 202.5 },
        { value: 300, start: 202.6, end: 247.5 },
        { value: 1000,start: 247.6, end: 292.5 },
        { value: 200, start: 292.6, end: 337.5 },
      ]

      const sectors = rewardSectors.filter(s => s.value === won)
      const selectedSector = sectors.length > 1
        ? sectors[Math.floor(Math.random() * sectors.length)]
        : sectors[0]

      const start = selectedSector.start
      const end = selectedSector.end
      const baseAngle = start > end
        ? ((start + (360 + end)) / 2) % 360
        : (start + end) / 2

      const corrected = (baseAngle - 90 + 360) % 360
      const rounds = 5
      const targetAngle = 360 * rounds + corrected

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

  const rotateStyle = {
    transform: [
      {
        rotate: spinAnim.interpolate({
          inputRange: [0, 360 * 10],
          outputRange: ['0deg', `${360 * 10}deg`],
          extrapolate: 'clamp',
        }),
      },
    ],
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Выиграй до 1000 beans!</Text>
      <Text style={styles.title}>Ежедневное колесо удачи</Text>
      <View style={styles.wheelWrapper}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.wheel, rotateStyle]}>
          <Image source={require("../../assets/wheel_asset.jpg")} style={styles.image} />
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#93c5fd",
    fontWeight: "600",
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  wheel: {
    width: 250,
    height: 250,
    borderRadius: 125,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e3a8a",
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
    top: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#60a5fa",
    zIndex: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    position: "absolute",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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