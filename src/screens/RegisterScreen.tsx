import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { MaskedTextInput } from "react-native-mask-text"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { registerUser } from "../services/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from "../context/UserContext"

export default function RegisterScreen() {
  const navigation = useNavigation()
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const { fetchAndSetUser } = useUser()

  const validatePhone = () => {
    const digitsOnly = phone.replace(/\D/g, "")
    if (digitsOnly.length < 10) {
      setError("Введите корректный номер телефона")
      return false
    }
    return true
  }

  const handleRegister = async () => {
    if (!validatePhone()) return
    try {
      const { access, refresh } = await registerUser(phone)
      await AsyncStorage.setItem("token", access)
      await AsyncStorage.setItem("refresh_token", refresh)
      await fetchAndSetUser()
      navigation.navigate("ConfirmCode", { phone })
    } catch (err) {
      console.error("Ошибка регистрации:", err)
      setError("Ошибка на сервере")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Регистрация</Text>
        <MaskedTextInput
          mask="+7 (999) 999-99-99"
          keyboardType="phone-pad"
          onChangeText={(text, rawText) => setPhone(text)}
          value={phone}
          placeholder="+7 (___) ___-__-__"
          placeholderTextColor="#4d7c0f"
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Продолжить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#166534",
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1fae5",
    backgroundColor: "#ecfdf5",
    borderRadius: 8,
    padding: 12,
    color: "#166534",
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: "#dc2626",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  linkText: {
    color: "#16a34a",
    fontSize: 14,
  },
})
