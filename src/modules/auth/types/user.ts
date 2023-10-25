export interface User {
  id: number
  email: string
  verified: boolean
  firstname: string
  lastname: string
  userTypeId: number
  socialAuth: string | null
  admin?: boolean | null
}
