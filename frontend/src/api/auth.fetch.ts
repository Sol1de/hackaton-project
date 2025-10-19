import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import type {
  LoginData,
  LoginResponse,
  LogoutResponse,
  RegisterData,
  RegisterResponse
} from '@/types/auth.types'

export const loginFetch = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${import.meta.env.VITE_BASE_URL}/api/users/login`,
    data
  )
  return response.data
}

export const logoutFetch = async (): Promise<LogoutResponse> => {
  const token = useAuthStore().token
  const response = await axios.post<LogoutResponse>(
    `${import.meta.env.VITE_BASE_URL}/api/users/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
  )
  return response.data
}

export const registerFetch = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(
    `${import.meta.env.VITE_BASE_URL}/api/users/register`,
    data
  )
  return response.data
}

