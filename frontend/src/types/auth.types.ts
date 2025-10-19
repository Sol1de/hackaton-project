import type { User } from './user.types'

export interface AuthConfig {
  login: {
    title: string
    url: string
  }
  signup: {
    title: string
    url: string
  }
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterData {
  email: string
  password: string
  firstname: string
  lastname: string
  avatar?: string
  description?: string
}

export interface RegisterResponse {
  user: User
}

export interface LogoutResponse {
  message: string
}
