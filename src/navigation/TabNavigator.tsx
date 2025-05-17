import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CoffeeScreen from "../screens/CoffeeListScreen";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#60a5fa",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: { backgroundColor: "#0f172a", borderTopWidth: 0 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Feather.glyphMap = "home";
          if (route.name === "Домой") iconName = "home";
          if (route.name === "Кофе") iconName = "coffee";
          if (route.name === "Профиль") iconName = "user";
          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Домой" component={HomeScreen} />
      <Tab.Screen name="Кофе" component={CoffeeScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
}