import axios from 'axios'

interface RegisterCredentials {
  email: string
  password: string
  firstname: string
  lastname: string
  avatar?: string
  description?: string
}

interface RegisterResponse {
  user: {
    _id: string
    email: string
    firstname: string
    lastname: string
    avatar?: string
    description?: string
    createdAt: Date
    updatedAt: Date
  }
}

export const registerFetch = async (data: RegisterCredentials): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(
    `${import.meta.env.VITE_BASE_URL}/api/users/register`,
    data
  )
  return response.data
}
