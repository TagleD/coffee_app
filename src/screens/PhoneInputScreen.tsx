import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import authStore from "../stores/AuthStore";

export default function PhoneInputScreen() {
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const onNext = () => {
    if (phone.length < 10) {
      alert("Введите корректный номер телефона");
      return;
    }
    authStore.setPhone(phone);
    navigation.navigate("CodeConfirm" as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите номер телефона</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="+7 777 123 45 67"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Далее" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 22, marginBottom: 12, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});