export interface User {
  _id: string
  email: string
  firstname: string
  lastname: string
  avatar?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserData {
  firstname: string
  lastname: string
  avatar?: string
  email: string
}
