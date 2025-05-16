import React, { useEffect, useState } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { BasketProvider } from "./src/context/BasketContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./src/services/api";
import { ActivityIndicator, View } from "react-native";
import { UserProvider } from "./src/context/UserContext"; 

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<"Login" | "Tabs">("Login");

  useEffect(() => {
    const checkToken = async () => {
      const refresh = await AsyncStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const res = await api.post("token/refresh/", { refresh });
          await AsyncStorage.setItem("token", res.data.access);
          setInitialRoute("Tabs");
        } catch (err) {
          console.log("Refresh token недействителен, авторизация заново");
          await AsyncStorage.clear();
          setInitialRoute("Login");
        }
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  return (
    <SafeAreaProvider>
      <UserProvider> 
        <BasketProvider>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
              }}
            >
              <ActivityIndicator size="large" color="#60a5fa" />
            </View>
          ) : (
            <RootNavigator initialRoute={initialRoute} />
          )}
        </BasketProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}