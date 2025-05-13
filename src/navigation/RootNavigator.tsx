import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneInputScreen from "../screens/PhoneInputScreen";
import CodeConfirmScreen from "../screens/CodeConfirmScreen";
import HomeScreen from "../screens/HomeScreen";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PhoneInput" component={PhoneInputScreen} options={{ title: "Вход" }} />
        <Stack.Screen name="CodeConfirm" component={CodeConfirmScreen} options={{ title: "Код" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Главная" }} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}