import type { Contest as PrismaContest } from '@prisma/client'
import { WithoutInternalColumn } from '$/types/index'
export type Contest = WithoutInternalColumn<
  Omit<PrismaContest, 'kind'> & {
    kind: 'admin' | 'community' | 'user'
  }
>
