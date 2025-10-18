import axios from 'axios'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
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

export const loginFetch = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    'http://localhost:3000/api/users/login',
    credentials
  )
  return response.data
}
