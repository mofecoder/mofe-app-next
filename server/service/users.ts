import { PrismaClient } from '@prisma/client'
import { User } from '$/types'

const prisma = new PrismaClient()

export async function getUserByUid(uid: string) {
  return await prisma.user.findUnique({
    where: { uid }
  })
}

export async function getUserByUserName(userName: string) {
  return await prisma.user.findUnique({
    where: { userName }
  })
}

export async function createUserFromProvider(uid: string, email: string) {
  return await prisma.user.create({
    data: {
      uid,
      role: 'TEMPORARY',
      email
    }
  })
}

export async function createUserFromEmailAndPassword(
  uid: string,
  email: string
) {
  return await prisma.user.create({
    data: {
      uid,
      role: 'USER',
      email
    }
  })
}

export async function updateUser(
  uid: string,
  data: Partial<Pick<User, 'email' | 'userName' | 'role'>>
) {
  return await prisma.user.update({
    where: { uid },
    data
  })
}
