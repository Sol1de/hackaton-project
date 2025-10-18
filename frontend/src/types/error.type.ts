export interface ApiErrorDetail {
  message: string
}

export interface ApiErrorResponse {
  message?: string
  errors?: ApiErrorDetail[]
}

export interface ApiError {
  response?: {
    data?: ApiErrorResponse
  }
}