import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserByUid = async (uid: string) => {
  return await prisma.user.findUnique({
    where: { uid }
  })
}
