import axios from 'axios'
import type { LoginCredentials, LoginResponse } from '@/types/login.type.ts'

export const loginFetch = async (data: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${import.meta.env.VITE_BASE_URL}/api/users/login`,
    data
  )
  return response.data
}
