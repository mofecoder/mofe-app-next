import { Contest, User, WithInternalColumn } from '$/types'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createContest = async (
  contest: Contest,
  owner: WithInternalColumn<User>
) =>
  await prisma.contest.create({
    data: {
      ...contest,
      managers: {
        create: {
          type: 'OWNER',
          user: { connect: { id: owner.id } }
        }
      }
    }
  })

export const getContests = async (
  limit = 20,
  includePrivate = false,
  userId?: number
) => {
  const where: Prisma.ContestWhereInput[] = [
    {
      managers: {
        some: { userId }
      }
    },
    { publishAt: { lte: new Date() } }
  ]

  return await prisma.contest.findMany({
    where: includePrivate ? undefined : { OR: where },
    orderBy: { startAt: 'desc' },
    take: limit
  })
}
