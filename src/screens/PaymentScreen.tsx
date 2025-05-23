import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBasket } from "../context/BasketContext";
import { useUser } from "../context/UserContext";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";

const FakePaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);

  const { items, clearBasket, subtotal } = useBasket();
  const { fetchAndSetUser } = useUser();
  const route = useRoute();
  const navigation = useNavigation();
  const skipPayment = route.params?.skipPayment;

  useEffect(() => {
    if (skipPayment) {
      handlePayWithoutCard();
    }
  }, [skipPayment]);

  const formatCardNumber = (value: string) => {
    return value.replace(/[^\d]/g, "").replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, "");
    if (cleaned.length < 3) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  };

  const validateInputs = () => {
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    const cvcRegex = /^\d{3}$/;

    if (!cardRegex.test(cardNumber.replace(/\s/g, "")))
      return "Введите корректный номер карты (16 цифр)";
    if (!cardHolder) return "Введите имя на карте";
    if (!expiryRegex.test(expiry)) return "Введите срок действия в формате MM/YY";
    if (!cvcRegex.test(cvc)) return "Введите корректный CVC (3 цифры)";

    return null;
  };

  const handlePayWithoutCard = async () => {
    setLoading(true);

    try {
      const payload = {
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price_per_item: item.price,
        })),
      };

      const token = await AsyncStorage.getItem("token");
      const res = await api.post("create_order/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearBasket();
      await fetchAndSetUser();

      Alert.alert("Успех", `Заказ #${res.data.order_id} оформлен. Начислено ${res.data.beans_earned} beans`);
      navigation.navigate("Tabs");
    } catch (err) {
      console.error("Ошибка оформления заказа", err);
      Alert.alert("Ошибка", "Не удалось оформить заказ");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    const error = validateInputs();
    if (error) return Alert.alert("Ошибка", error);

    setLoading(true);

    try {
      const payload = {
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price_per_item: item.price,
        })),
      };

      const token = await AsyncStorage.getItem("token");
      const res = await api.post("create_order/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearBasket();
      await fetchAndSetUser();

      Alert.alert("Успех", `Заказ #${res.data.order_id} оформлен. Начислено ${res.data.beans_earned} beans`);
      navigation.navigate("Tabs");
    } catch (err) {
      console.error("Ошибка оформления заказа", err);
      Alert.alert("Ошибка", "Не удалось оформить заказ");
    } finally {
      setLoading(false);
    }
  };

  if (skipPayment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Оформляем заказ...</Text>
        {loading && <ActivityIndicator color="#16a34a" size="large" />}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Оплата заказа</Text>

      <TextInput
        style={styles.input}
        placeholder="Номер карты"
        keyboardType="numeric"
        value={formatCardNumber(cardNumber)}
        onChangeText={setCardNumber}
        placeholderTextColor="#4d7c0f"
        maxLength={19}
      />
      <TextInput
        style={styles.input}
        placeholder="Имя на карте"
        value={cardHolder}
        onChangeText={setCardHolder}
        placeholderTextColor="#4d7c0f"
      />

      <View style={styles.rowInputs}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="MM/YY"
          value={expiry}
          onChangeText={(val) => setExpiry(formatExpiry(val))}
          placeholderTextColor="#4d7c0f"
          keyboardType="numeric"
          maxLength={5}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CVC"
          value={cvc}
          onChangeText={setCvc}
          keyboardType="numeric"
          placeholderTextColor="#4d7c0f"
          maxLength={3}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePay} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Оплатить</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: "#166534",
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    color: "#166534",
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 0.48,
  },
  button: {
    backgroundColor: "#16a34a",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FakePaymentScreen;
