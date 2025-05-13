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
    backgroundColor: "rgba(23, 37, 84, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#1e40af",
    marginRight: 4,
    marginBottom: 4,
  },
  text: {
    color: "#93c5fd",
    fontSize: 10,
    fontWeight: "500",
  },
})

export default Badge
