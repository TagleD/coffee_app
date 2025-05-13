import type React from "react"
import type { ReactNode } from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"

interface CardProps {
  children: ReactNode
  style?: ViewStyle
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(30, 58, 138, 0.2)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1e40af",
    overflow: "hidden",
    marginVertical: 8,
  },
})

export default Card
