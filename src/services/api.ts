import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RootNavigation from './RootNavigation' // создадим ниже

const api = axios.create({
  baseURL: 'http://192.168.1.84:8456/api/', // ← твой IP
  headers: {
    'Content-Type': 'application/json',
  },
})

// Автоматический logout при ошибке авторизации
api.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status
    if (status === 401 || status === 403) {
      console.log('Токен истёк, выполняется выход...')
      await AsyncStorage.clear()
      RootNavigation.resetToLogin()
    }
    return Promise.reject(error)
  }
)

export default api