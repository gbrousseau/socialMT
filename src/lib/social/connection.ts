import { PrismaClient } from '@prisma/client'
import { encrypt, decrypt } from '@/lib/utils/encryption'

const prisma = new PrismaClient()

export interface SocialConnectionConfig {
  platform: string
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
}

export const SUPPORTED_PLATFORMS = {
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin'
} as const

export const PLATFORM_CONFIGS: Record<string, SocialConnectionConfig> = {
  [SUPPORTED_PLATFORMS.TWITTER]: {
    platform: SUPPORTED_PLATFORMS.TWITTER,
    clientId: process.env.TWITTER_CLIENT_ID!,
    clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/twitter`,
    scopes: ['tweet.read', 'users.read', 'follows.read']
  },
  [SUPPORTED_PLATFORMS.INSTAGRAM]: {
    platform: SUPPORTED_PLATFORMS.INSTAGRAM,
    clientId: process.env.INSTAGRAM_CLIENT_ID!,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/instagram`,
    scopes: ['user_profile', 'user_media']
  }
  // Add other platforms as needed
}

export async function connectSocialAccount(
  userId: string,
  platform: string,
  accountId: string,
  accountName: string,
  accessToken: string,
  refreshToken?: string
) {
  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const encryptedAccessToken = encrypt(accessToken)
  const encryptedRefreshToken = refreshToken ? encrypt(refreshToken) : null

  return prisma.socialAccount.create({
    data: {
      userId,
      platform,
      accountId,
      accountName,
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken
    }
  })
}

export async function disconnectSocialAccount(userId: string, platform: string) {
  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  return prisma.socialAccount.deleteMany({
    where: {
      userId,
      platform
    }
  })
}

export async function getUserSocialAccounts(userId: string) {
  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  return prisma.socialAccount.findMany({
    where: { userId }
  })
}

export async function refreshSocialToken(
  userId: string,
  platform: string,
  newAccessToken: string,
  newRefreshToken?: string
) {
  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const encryptedAccessToken = encrypt(newAccessToken)
  const encryptedRefreshToken = newRefreshToken ? encrypt(newRefreshToken) : null

  return prisma.socialAccount.updateMany({
    where: {
      userId,
      platform
    },
    data: {
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      updatedAt: new Date()
    }
  })
} 