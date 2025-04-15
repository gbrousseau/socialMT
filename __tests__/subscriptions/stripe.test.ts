import { PrismaClient } from '@prisma/client'
import { createStripeCustomer, createSubscription, cancelSubscription } from '../../src/lib/subscriptions/stripe'
import { createUser } from '../../src/lib/auth/user'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    customers: {
      create: jest.fn().mockResolvedValue({
        id: 'cus_mock',
        email: 'test@example.com'
      })
    },
    subscriptions: {
      create: jest.fn().mockResolvedValue({
        id: 'sub_mock',
        status: 'active',
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
      }),
      cancel: jest.fn().mockResolvedValue({
        status: 'canceled',
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
      })
    }
  }))
})

describe('Stripe Integration', () => {
  let userId: string

  beforeEach(async () => {
    await prisma.socialAccount.deleteMany()
    await prisma.subscription.deleteMany()
    await prisma.user.deleteMany()

    const user = await createUser({
      email: faker.internet.email(),
      password: 'Test123!@#',
      name: faker.person.fullName()
    })
    userId = user.id
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create a Stripe customer and free subscription for new user', async () => {
    const customer = await createStripeCustomer(userId, faker.internet.email())

    const subscription = await prisma.subscription.findUnique({
      where: { userId }
    })

    expect(customer).toBeDefined()
    expect(customer.id).toBe('cus_mock')
    expect(subscription).toBeDefined()
    expect(subscription?.status).toBe('active')
    expect(subscription?.planId).toBe('free')
  })

  it('should create and cancel a paid subscription', async () => {
    // First create a customer with free subscription
    await createStripeCustomer(userId, faker.internet.email())
    
    // Then upgrade to paid subscription
    const subscription = await createSubscription(userId, 'price_pro')
    expect(subscription.status).toBe('active')

    // Finally cancel the subscription
    const canceledSubscription = await cancelSubscription(userId)
    expect(canceledSubscription.status).toBe('canceled')

    const dbSubscription = await prisma.subscription.findUnique({
      where: { userId }
    })
    expect(dbSubscription?.status).toBe('canceled')
  })
}) 