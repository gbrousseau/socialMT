import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { createUser, getUserByEmail } from '@/lib/auth/user'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

describe('User Registration', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create a new user successfully', async () => {
    const userData = {
      email: faker.internet.email(),
      password: 'Test123!@#',
      name: faker.person.fullName()
    }

    const user = await createUser(userData)

    expect(user).toBeDefined()
    expect(user.email).toBe(userData.email)
    expect(user.name).toBe(userData.name)
    expect(user.password).not.toBe(userData.password) // Password should be hashed
  })

  it('should not allow duplicate emails', async () => {
    const email = faker.internet.email()
    const userData = {
      email,
      password: 'Test123!@#',
      name: faker.person.fullName()
    }

    await createUser(userData)

    await expect(createUser(userData)).rejects.toThrow()
  })

  it('should retrieve user by email', async () => {
    const userData = {
      email: faker.internet.email(),
      password: 'Test123!@#',
      name: faker.person.fullName()
    }

    await createUser(userData)
    const user = await getUserByEmail(userData.email)

    expect(user).toBeDefined()
    expect(user?.email).toBe(userData.email)
  })
}) 