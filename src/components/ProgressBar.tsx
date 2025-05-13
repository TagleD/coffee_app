import type React from "react"
import { View, StyleSheet } from "react-native"

interface ProgressBarProps {
  value: number // 0-100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${value}%` }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: "#172554",
    borderRadius: 4,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#60a5fa",
  },
})

export default ProgressBar
