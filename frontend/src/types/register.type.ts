export interface RegisterCredentials {
  email: string
  password: string
  firstname: string
  lastname: string
  avatar?: string
  description?: string
}

export interface RegisterResponse {
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
