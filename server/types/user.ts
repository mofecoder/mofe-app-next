import { WithoutInternalColumn } from '$/types/index'

import type { User as PrismaUser } from '@prisma/client'
export type User = WithoutInternalColumn<PrismaUser>

export type AuthHeader = {
  idtoken: string
}
