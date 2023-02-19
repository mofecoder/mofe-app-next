import type { AuthHeader, User } from '$/types'

type PostType = {
  uid: string
  userName: string
  email: string
}

export type Methods = {
  post: {
    reqHeaders: AuthHeader
    reqBody: PostType
    resBody: User
  }
}
