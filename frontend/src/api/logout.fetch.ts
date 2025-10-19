import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { LogoutResponse } from '@/types/auth.types'

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
