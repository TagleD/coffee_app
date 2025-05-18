import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import ConfirmCodeScreen from "../screens/CodeConfirmScreen"
import EditProfileScreen from "../screens/EditProfileScreen"
import HomeScreen from "../screens/HomeScreen"
import TabNavigator from "./TabNavigator"
import { navigationRef } from "../services/RootNavigation" 
import PaymentScreen from "../screens/PaymentScreen"
import DailySpinScreen from "../screens/DailySpinScreen"

const Stack = createNativeStackNavigator()

export default function RootNavigator({ initialRoute = "Login" }) {
  return (
    <NavigationContainer ref={navigationRef}>  
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Главная" }} />
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="DailySpin" component={DailySpinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}