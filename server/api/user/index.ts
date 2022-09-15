import type { AuthHeader, User } from '$/types'
import type { ReadStream } from 'fs'

export type Methods = {
  get: {
    reqHeaders: AuthHeader
    resBody: User
  }

  post: {
    reqHeaders: AuthHeader
    resBody: User
  }
}
