import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from "../context/UserContext"
import { useNavigation } from "@react-navigation/native"

export default function DailyQuizScreen() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const { fetchAndSetUser } = useUser()
  const navigation = useNavigation()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const res = await api.get("/daily_quiz/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setQuestions(res.data)
      } catch (err) {
        Alert.alert("Ошибка", err.response?.data?.detail || "Не удалось загрузить квиз")
      }
    }
    fetchQuestions()
  }, [])

  const handleSelect = async (qid: number, option: string) => {
    const newAnswers = { ...answers, [qid]: option }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      try {
        const token = await AsyncStorage.getItem("token")
        const res = await api.post("/daily_quiz/", { answers: newAnswers }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        await fetchAndSetUser()
        Alert.alert("Готово!", `Вы получили ${res.data.reward} beans`, [
          { text: "Ок", onPress: () => navigation.navigate("Home") },
        ])
      } catch (err: any) {
        Alert.alert("Ошибка", err?.response?.data?.detail || "Не удалось отправить ответы")
      }
    }
  }

  if (questions.length === 0) return null
  const current = questions[currentIndex]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionBlock}>
        <Text style={styles.progressText}>Вопрос {currentIndex + 1} из {questions.length}</Text>
        <Text style={styles.questionText}>{current.question}</Text>
        {["A", "B", "C", "D"].map(opt => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.option,
              answers[current.id] === opt && styles.selected,
            ]}
            onPress={() => handleSelect(current.id, opt)}
          >
            <Text style={styles.optionText}>{opt}. {current.options[opt]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  questionBlock: {
    marginTop: 64,
  },
  progressText: {
    color: "#4d7c0f",
    fontSize: 14,
    marginBottom: 12,
  },
  questionText: {
    color: "#166534",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  option: {
    padding: 14,
    backgroundColor: "#ecfdf5",
    borderColor: "#d1fae5",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  selected: {
    backgroundColor: "#bbf7d0",
    borderColor: "#22c55e",
  },
  optionText: {
    color: "#166534",
    fontSize: 16,
  },
})
