import type { ReactNode } from "react"
import type { ViewStyle } from "react-native"
import { View, StyleSheet } from "react-native"

interface CardProps {
  children: ReactNode
  style?: ViewStyle
}

const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff", // светлая карточка
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb", // светло-серый бордер
    marginVertical: 8,
    padding: 12, // добавим немного паддинга для внутреннего контента
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
})

export default Card
