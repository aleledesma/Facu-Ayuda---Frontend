export interface UserPayload {
  id: string
  email: string
  username: string
  major?: string
  roles: { admin: boolean; student: boolean }
}

export interface UserResponseInterface {
  ok: boolean
  message: string
  data?: UserPayload
}
