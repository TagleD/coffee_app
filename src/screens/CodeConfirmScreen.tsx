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
        <Text style={styles.title}>Подтверждение</Text>
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
          placeholderTextColor="#4d7c0f"
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#4d7c0f",
    marginBottom: 24,
  },
  phoneNumber: {
    fontWeight: "bold",
    color: "#166534",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1fae5",
    backgroundColor: "#ecfdf5",
    borderRadius: 8,
    padding: 12,
    color: "#166534",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 12,
    marginBottom: 16,
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
})
