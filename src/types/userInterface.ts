export interface UserPayload {
  id: string
  email: string
  username: string
  roles: { admin: boolean; student: boolean }
}
