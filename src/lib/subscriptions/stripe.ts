import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'
import { SUBSCRIPTION_PLANS } from './plans'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const prisma = new PrismaClient()

export async function createStripeCustomer(userId: string, email: string) {
  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId
    }
  })

  // Create free subscription
  await prisma.subscription.create({
    data: {
      userId,
      planId: SUBSCRIPTION_PLANS.FREE.id,
      status: 'active',
      stripeCustomerId: customer.id,
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now for free plan
    }
  })

  return customer
}

export async function createSubscription(userId: string, priceId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true }
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (!user.subscription?.stripeCustomerId) {
    throw new Error('No Stripe customer ID found')
  }

  const subscription = await stripe.subscriptions.create({
    customer: user.subscription.stripeCustomerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent']
  })

  await prisma.subscription.update({
    where: { userId },
    data: {
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    }
  })

  return subscription
}

export async function cancelSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true }
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (!user.subscription?.stripeSubscriptionId) {
    throw new Error('No active subscription found')
  }

  const subscription = await stripe.subscriptions.cancel(
    user.subscription.stripeSubscriptionId
  )

  await prisma.subscription.update({
    where: { userId },
    data: {
      status: 'canceled',
      currentPeriodEnd: new Date(subscription.current_period_end * 1000)
    }
  })

  return subscription
} 