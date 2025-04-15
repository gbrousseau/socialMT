import { Redis } from 'ioredis'
import { SocialMetrics, Post } from '../social/api-client'

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

const CACHE_TTL = 5 * 60 // 5 minutes
const METRICS_KEY_PREFIX = 'metrics:'
const POSTS_KEY_PREFIX = 'posts:'

export async function cacheMetrics(userId: string, platform: string, metrics: SocialMetrics): Promise<void> {
  const key = `${METRICS_KEY_PREFIX}${userId}:${platform}`
  await redis.setex(key, CACHE_TTL, JSON.stringify(metrics))
  
  // Publish update for real-time subscribers
  await redis.publish('metrics-update', JSON.stringify({ userId, platform, metrics }))
}

export async function getCachedMetrics(userId: string, platform: string): Promise<SocialMetrics | null> {
  const key = `${METRICS_KEY_PREFIX}${userId}:${platform}`
  const cached = await redis.get(key)
  return cached ? JSON.parse(cached) : null
}

export async function cachePosts(userId: string, platform: string, posts: Post[]): Promise<void> {
  const key = `${POSTS_KEY_PREFIX}${userId}:${platform}`
  await redis.setex(key, CACHE_TTL, JSON.stringify(posts))
  
  // Publish update for real-time subscribers
  await redis.publish('posts-update', JSON.stringify({ userId, platform, posts }))
}

export async function getCachedPosts(userId: string, platform: string): Promise<Post[] | null> {
  const key = `${POSTS_KEY_PREFIX}${userId}:${platform}`
  const cached = await redis.get(key)
  return cached ? JSON.parse(cached) : null
}

export function subscribeToUpdates(channel: string, callback: (data: any) => void): void {
  const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')
  subscriber.subscribe(channel)
  subscriber.on('message', (_, message) => {
    callback(JSON.parse(message))
  })
}

export async function invalidateCache(userId: string, platform?: string): Promise<void> {
  const pattern = platform 
    ? `*:${userId}:${platform}`
    : `*:${userId}:*`
    
  const keys = await redis.keys(pattern)
  if (keys.length > 0) {
    await redis.del(...keys)
  }
} 