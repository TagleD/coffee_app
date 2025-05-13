import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { BasketProvider } from "./src/context/BasketContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <BasketProvider>
        <RootNavigator />
      </BasketProvider>
    </SafeAreaProvider>
  );
}