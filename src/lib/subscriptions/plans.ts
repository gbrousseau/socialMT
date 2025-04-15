export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    description: 'Basic social media tracking',
    price: 0,
    features: [
      'Track up to 2 social accounts',
      'Basic metrics',
      'Daily updates'
    ],
    limits: {
      socialAccounts: 2,
      metricsHistory: 30, // days
      updateFrequency: 24 // hours
    }
  },
  PRO: {
    id: 'pro',
    name: 'Professional',
    description: 'Advanced tracking and analytics',
    price: 29.99,
    stripePriceId: 'price_pro', // You'll need to replace this with your actual Stripe price ID
    features: [
      'Track up to 10 social accounts',
      'Advanced metrics and insights',
      'Hourly updates',
      'Export data',
      'Email reports'
    ],
    limits: {
      socialAccounts: 10,
      metricsHistory: 90,
      updateFrequency: 1
    }
  },
  BUSINESS: {
    id: 'business',
    name: 'Business',
    description: 'Enterprise-level social media management',
    price: 99.99,
    stripePriceId: 'price_business', // You'll need to replace this with your actual Stripe price ID
    features: [
      'Unlimited social accounts',
      'Real-time updates',
      'Advanced analytics',
      'API access',
      'Priority support',
      'Custom reports'
    ],
    limits: {
      socialAccounts: -1, // unlimited
      metricsHistory: 365,
      updateFrequency: 0.25 // 15 minutes
    }
  }
} 