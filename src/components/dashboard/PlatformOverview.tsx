import { auth } from '@/lib/auth/auth'
import { getUserSocialAccounts } from '@/lib/social/connection'
import { socialAPIClient } from '@/lib/social/api-client'
import { getCachedMetrics, cacheMetrics } from '@/lib/cache/redis'
import { useState, useEffect } from 'react'
import { DateRangePicker } from '@/components/ui/DateRangePicker'

interface PlatformStats {
  platform: string
  followers: number
  engagement: number
  posts: number
}

async function getPlatformStats(startDate?: Date, endDate?: Date): Promise<PlatformStats[]> {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const accounts = await getUserSocialAccounts(session.user.id)
  
  const stats = await Promise.all(
    accounts.map(async (account) => {
      try {
        // Try to get cached data first
        const cached = await getCachedMetrics(session.user.id!, account.platform)
        if (cached && !startDate && !endDate) {
          return {
            platform: account.platform,
            followers: cached.followers,
            engagement: cached.engagement,
            posts: cached.posts
          }
        }

        // If no cache or date range specified, fetch fresh data
        const metrics = await socialAPIClient.getMetrics(account, startDate, endDate)
        
        // Cache the results if no date range specified
        if (!startDate && !endDate) {
          await cacheMetrics(session.user.id!, account.platform, metrics)
        }

        return {
          platform: account.platform,
          followers: metrics.followers,
          engagement: metrics.engagement,
          posts: metrics.posts
        }
      } catch (error) {
        console.error(`Error fetching metrics for ${account.platform}:`, error)
        return {
          platform: account.platform,
          followers: 0,
          engagement: 0,
          posts: 0
        }
      }
    })
  )

  return stats
}

export function PlatformOverview() {
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({})
  const [stats, setStats] = useState<PlatformStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true)
        setError(null)
        const data = await getPlatformStats(dateRange.start, dateRange.end)
        setStats(data)
      } catch (error) {
        setError('Failed to load platform statistics')
        console.error('Error loading platform stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [dateRange])

  if (loading) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  if (stats.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
        <p className="text-gray-500">
          No social media accounts connected. Connect your accounts to see analytics.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Platform Overview</h2>
        <DateRangePicker
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={({ start, end }) => setDateRange({ start, end })}
        />
      </div>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
            <div>
              <h3 className="font-medium capitalize">{stat.platform}</h3>
              <p className="text-sm text-gray-500">Connected</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-right">
              <div>
                <p className="text-sm text-gray-500">Followers</p>
                <p className="font-medium">{stat.followers.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement</p>
                <p className="font-medium">{stat.engagement.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Posts</p>
                <p className="font-medium">{stat.posts}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 