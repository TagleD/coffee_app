import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import api from "../services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from "../context/UserContext"

export default function DailyQuizScreen() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const { fetchAndSetUser } = useUser()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const res = await api.get("/daily_quiz/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setQuestions(res.data)
      } catch (err) {
        Alert.alert("Ошибка", err.response?.data?.detail || "Не удалось загрузить квиз")
      }
    }
  
    fetchQuestions()
  }, [])

  const submitQuiz = async () => {
    try {
        const token = await AsyncStorage.getItem("token")
        const res = await api.post("/daily_quiz/", { answers }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      const reward = res.data.reward
      await fetchAndSetUser()
      Alert.alert("Результат", `Вы получили ${reward} beans!`)
    } catch (err: any) {
      Alert.alert("Ошибка", err?.response?.data?.detail || "Не удалось отправить ответы")
    }
  }

  const handleSelect = (qid: number, option: string) => {
    setAnswers({ ...answers, [qid]: option })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {questions.map((q: any, index: number) => (
          <View key={q.id} style={styles.questionBlock}>
            <Text style={styles.questionText}>{index + 1}. {q.question}</Text>
            {["A", "B", "C", "D"].map(opt => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.option,
                  answers[q.id] === opt && styles.selected,
                ]}
                onPress={() => handleSelect(q.id, opt)}
              >
                <Text style={styles.optionText}>{opt}. {q.options[opt]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={submitQuiz}>
          <Text style={styles.buttonText}>Отправить</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", padding: 16 },
  questionBlock: { marginBottom: 24 },
  questionText: { color: "#fff", fontSize: 16, marginBottom: 8 },
  option: {
    padding: 12,
    backgroundColor: "#1e3a8a",
    borderRadius: 8,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: "#2563eb",
  },
  optionText: { color: "#fff" },
  button: {
    backgroundColor: "#1d4ed8",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
})
