export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
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
