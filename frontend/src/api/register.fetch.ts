import axios from 'axios'
import type { RegisterData, RegisterResponse } from '@/types/register.type.ts'

export const registerFetch = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(
    `${import.meta.env.VITE_BASE_URL}/api/users/register`,
    data
  )
  return response.data
}
