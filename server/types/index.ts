type Role = 'TEMPORARY' | 'USER' | 'ADMIN'

export type User = {
  uid: string
  role: Role
  userName: string | null
  email: string
  atcoderId: string | null
}

export type AuthHeader = {
  idtoken: string
}
