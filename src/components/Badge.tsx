import type React from "react"
import { Text, View, StyleSheet } from "react-native"

interface BadgeProps {
  label: string
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#f0fdf4", // чуть светлее и мягче
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#bbf7d0", // светлая граница
    marginRight: 6,
    marginBottom: 6,
  },
  text: {
    color: "#166534", // основной зелёный
    fontSize: 11,
    fontWeight: "500",
  },
})

export default Badge
