export interface Credentials {
  email: string
  password: string
}

export interface RegistrationRequest {
  email: string
  password: string
  firstname: string
  lastname: string
  userTypeId: number
}

export interface ResendEmail {
  email: string
}

export interface LoginResponse {
  token: string
}

export interface GoogleAuthRequest {
  idToken: string
}

export interface ResetPasswordRequest {
  email: string
  password: string
  resetToken: string
}
