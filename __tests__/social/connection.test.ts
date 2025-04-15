import { PrismaClient, SocialAccount } from '.prisma/client'
import { faker } from '@faker-js/faker'
import { 
  connectSocialAccount, 
  disconnectSocialAccount,
  getUserSocialAccounts,
  refreshSocialToken,
  SUPPORTED_PLATFORMS
} from '../../src/lib/social/connection'
import { createUser } from '../../src/lib/auth/user'
import { decrypt } from '../../src/lib/utils/encryption'

interface SocialAccountData {
  platform: string;
  accountId: string;
  accountName: string;
  accessToken: string;
  refreshToken?: string;
}

const prisma = new PrismaClient()

describe('Social Account Connection', () => {
  let userId: string

  beforeEach(async () => {
    // Clean up database
    await prisma.socialAccount.deleteMany()
    await prisma.subscription.deleteMany()
    await prisma.user.deleteMany()

    // Create test user
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

  it('should connect a social media account', async () => {
    const socialData: SocialAccountData = {
      platform: SUPPORTED_PLATFORMS.TWITTER,
      accountId: '123456',
      accountName: 'testuser',
      accessToken: 'test-token',
      refreshToken: 'test-refresh-token',
    }

    const account = await connectSocialAccount(
      userId,
      socialData.platform,
      socialData.accountId,
      socialData.accountName,
      socialData.accessToken,
      socialData.refreshToken
    )
    
    expect(account).toBeDefined()
    expect(account.platform).toBe(SUPPORTED_PLATFORMS.TWITTER)
    expect(account.userId).toBe(userId)
    
    // Verify token encryption
    const decryptedToken = await decrypt(account.accessToken)
    expect(decryptedToken).toBe('test-token')
  })

  it('should list user social accounts', async () => {
    // Connect two accounts
    await connectSocialAccount(
      userId,
      SUPPORTED_PLATFORMS.TWITTER,
      '123456',
      'twitteruser',
      'twitter-token',
      'twitter-refresh'
    )

    await connectSocialAccount(
      userId,
      SUPPORTED_PLATFORMS.FACEBOOK,
      '789012',
      'fbuser',
      'facebook-token',
      'facebook-refresh'
    )

    const accounts = await getUserSocialAccounts(userId)
    expect(accounts).toHaveLength(2)
    expect(accounts.map((account: SocialAccount) => account.platform).sort()).toEqual([SUPPORTED_PLATFORMS.FACEBOOK, SUPPORTED_PLATFORMS.TWITTER])
  })

  it('should disconnect a social account', async () => {
    // First connect an account
    await connectSocialAccount(
      userId,
      SUPPORTED_PLATFORMS.TWITTER,
      '123456',
      'testuser',
      'test-token',
      'test-refresh'
    )

    // Then disconnect it
    await disconnectSocialAccount(userId, SUPPORTED_PLATFORMS.TWITTER)

    // Verify it's gone
    const accounts = await getUserSocialAccounts(userId)
    expect(accounts).toHaveLength(0)
  })

  it('should refresh social token', async () => {
    // First connect an account
    await connectSocialAccount(
      userId,
      SUPPORTED_PLATFORMS.TWITTER,
      '123456',
      'testuser',
      'old-token',
      'test-refresh'
    )

    // Refresh the token
    const newToken = 'new-token'
    const newExpiry = new Date(Date.now() + 7200000).toISOString()

    await refreshSocialToken(userId, SUPPORTED_PLATFORMS.TWITTER, newToken, newExpiry)

    // Verify the token was updated
    const accounts = await getUserSocialAccounts(userId)
    expect(accounts).toHaveLength(1)
    
    const decryptedToken = await decrypt(accounts[0].accessToken)
    expect(decryptedToken).toBe(newToken)
    expect(accounts[0].tokenExpiry).toBe(newExpiry)
  })
}) 