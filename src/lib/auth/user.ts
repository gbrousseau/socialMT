import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

interface CreateUserData {
  email: string
  password: string
  name?: string
}

export async function createUser(data: CreateUserData) {
  const existingUser = await getUserByEmail(data.email)
  if (existingUser) {
    throw new Error('Email already exists')
  }

  const hashedPassword = await hash(data.password, 12)
  
  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name
    }
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  })
} 