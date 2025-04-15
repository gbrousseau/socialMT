import { decrypt } from '@/lib/utils/encryption'
import { SUPPORTED_PLATFORMS } from './connection'
import { SocialAccount } from '@prisma/client'

export class APIError extends Error {
  constructor(
    message: string,
    public platform: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export interface SocialMetrics {
  followers: number
  engagement: number
  posts: number
  likes: number
  comments: number
  shares: number
}

export interface PostMetrics {
  likes: number
  comments: number
  shares: number
}

export interface Post {
  id: string
  content: string
  timestamp: string
  metrics: PostMetrics
}

class SocialAPIClient {
  private async fetchWithAuth(
    platform: string,
    endpoint: string,
    accessToken: string
  ) {
    const baseUrls: Record<string, string> = {
      [SUPPORTED_PLATFORMS.TWITTER]: 'https://api.twitter.com/2',
      [SUPPORTED_PLATFORMS.INSTAGRAM]: 'https://graph.instagram.com/v18.0',
      [SUPPORTED_PLATFORMS.FACEBOOK]: 'https://graph.facebook.com/v18.0',
      [SUPPORTED_PLATFORMS.LINKEDIN]: 'https://api.linkedin.com/v2'
    }

    try {
      const response = await fetch(`${baseUrls[platform]}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new APIError(
          `API request failed: ${response.statusText}`,
          platform,
          response.status
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError(
        `Failed to fetch from ${platform}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        platform
      )
    }
  }

  async getMetrics(account: SocialAccount, startDate?: Date, endDate?: Date): Promise<SocialMetrics> {
    const accessToken = decrypt(account.accessToken)
    const dateRange = startDate && endDate ? `&start_time=${startDate.toISOString()}&end_time=${endDate.toISOString()}` : ''

    switch (account.platform) {
      case SUPPORTED_PLATFORMS.TWITTER: {
        const [followers, tweets] = await Promise.all([
          this.fetchWithAuth(account.platform, `/users/${account.accountId}/followers`, accessToken),
          this.fetchWithAuth(account.platform, `/users/${account.accountId}/tweets?max_results=100${dateRange}`, accessToken)
        ])

        const engagement = tweets.data.reduce((sum: number, tweet: any) => 
          sum + (tweet.public_metrics?.like_count || 0) + 
          (tweet.public_metrics?.reply_count || 0) + 
          (tweet.public_metrics?.retweet_count || 0), 0
        )

        return {
          followers: followers.meta.result_count,
          posts: tweets.meta.result_count,
          engagement: tweets.meta.result_count > 0 ? engagement / tweets.meta.result_count : 0,
          likes: tweets.data.reduce((sum: number, tweet: any) => sum + (tweet.public_metrics?.like_count || 0), 0),
          comments: tweets.data.reduce((sum: number, tweet: any) => sum + (tweet.public_metrics?.reply_count || 0), 0),
          shares: tweets.data.reduce((sum: number, tweet: any) => sum + (tweet.public_metrics?.retweet_count || 0), 0)
        }
      }

      case SUPPORTED_PLATFORMS.INSTAGRAM: {
        const [profile, media] = await Promise.all([
          this.fetchWithAuth(account.platform, `/me?fields=followers_count,media_count`, accessToken),
          this.fetchWithAuth(account.platform, `/me/media?fields=like_count,comments_count${dateRange}`, accessToken)
        ])

        const engagement = media.data.reduce((sum: number, post: any) => 
          sum + (post.like_count || 0) + (post.comments_count || 0), 0
        )

        return {
          followers: profile.followers_count,
          posts: profile.media_count,
          engagement: profile.media_count > 0 ? engagement / profile.media_count : 0,
          likes: media.data.reduce((sum: number, post: any) => sum + (post.like_count || 0), 0),
          comments: media.data.reduce((sum: number, post: any) => sum + (post.comments_count || 0), 0),
          shares: 0 // Instagram API doesn't provide share metrics
        }
      }

      // Add other platforms here...

      default:
        throw new APIError(`Unsupported platform: ${account.platform}`, account.platform)
    }
  }

  async getPosts(account: SocialAccount, limit: number = 10): Promise<Post[]> {
    const accessToken = decrypt(account.accessToken)

    switch (account.platform) {
      case SUPPORTED_PLATFORMS.TWITTER: {
        const response = await this.fetchWithAuth(
          account.platform,
          `/users/${account.accountId}/tweets?max_results=${limit}&tweet.fields=created_at,public_metrics`,
          accessToken
        )

        return response.data.map((tweet: any) => ({
          id: tweet.id,
          content: tweet.text,
          timestamp: tweet.created_at,
          metrics: {
            likes: tweet.public_metrics?.like_count || 0,
            comments: tweet.public_metrics?.reply_count || 0,
            shares: tweet.public_metrics?.retweet_count || 0
          }
        }))
      }

      case SUPPORTED_PLATFORMS.INSTAGRAM: {
        const response = await this.fetchWithAuth(
          account.platform,
          `/me/media?fields=id,caption,timestamp,like_count,comments_count&limit=${limit}`,
          accessToken
        )

        return response.data.map((post: any) => ({
          id: post.id,
          content: post.caption || '',
          timestamp: post.timestamp,
          metrics: {
            likes: post.like_count || 0,
            comments: post.comments_count || 0,
            shares: 0
          }
        }))
      }

      // Add other platforms here...

      default:
        throw new APIError(`Unsupported platform: ${account.platform}`, account.platform)
    }
  }
}

export const socialAPIClient = new SocialAPIClient() 