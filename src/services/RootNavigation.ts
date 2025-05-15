import { createNavigationContainerRef } from "@react-navigation/native"
import { Alert } from "react-native"

export const navigationRef = createNavigationContainerRef()

export function resetToLogin() {
  if (navigationRef.isReady()) {
    Alert.alert(
      "Сессия истекла",
      "Пожалуйста, войдите в аккаунт заново.",
      [{ text: "OK", onPress: () => goToLogin() }]
    )
  }
}

function goToLogin() {
  navigationRef.reset({
    index: 0,
    routes: [{ name: "Login" }],
  })
}