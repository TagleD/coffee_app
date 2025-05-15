import api from './api'

export const registerUser = async (phone: string) => {
  const response = await api.post('register/', { phone })
  return response.data
}

export const loginUser = async (phone: string) => {
  const response = await api.post('login/', { phone })
  return response.data
}