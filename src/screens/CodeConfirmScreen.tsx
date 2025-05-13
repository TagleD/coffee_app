import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native"; // добавили это
import authStore from "../stores/AuthStore";

const CodeConfirmScreen = observer(() => {
  const [code, setCode] = useState("");
  const navigation = useNavigation(); // и это

  const onConfirm = () => {
    if (code.length === 4) {
      authStore.confirmCode(code);
      navigation.navigate("Tabs" as never); // переход
    }
  };

  if (authStore.isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.success}>Вы вошли как {authStore.phone}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите код из SMS</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="1234"
        maxLength={4}
        value={code}
        onChangeText={setCode}
      />
      <Button title="Подтвердить" onPress={onConfirm} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 22, marginBottom: 12, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: "center",
    fontSize: 20,
  },
  success: {
    fontSize: 22,
    color: "green",
    textAlign: "center",
  },
});

export default CodeConfirmScreen;