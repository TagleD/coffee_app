
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
import { useNavigation, CommonActions } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ConfirmCodeScreen({ route }) {
  const { phone } = route.params
  const navigation = useNavigation()
  const [code, setCode] = useState("")

  const handleConfirm = () => {
    if (code.length === 4) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        })
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Код подтверждения</Text>
        <Text style={styles.subtitle}>
          Введите код, отправленный на{" "}
          <Text style={styles.phoneNumber}>{phone}</Text>
        </Text>
        <TextInput
          keyboardType="number-pad"
          maxLength={4}
          value={code}
          onChangeText={setCode}
          style={styles.input}
          placeholder="0000"
          placeholderTextColor="#64748b"
        />
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Подтвердить</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#60a5fa",
    marginBottom: 24,
  },
  phoneNumber: {
    fontWeight: "bold",
    color: "#93c5fd",
  },
  input: {
    borderWidth: 1,
    borderColor: "#1e3a8a",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1d4ed8",
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
})
