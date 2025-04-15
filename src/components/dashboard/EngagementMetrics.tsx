import { auth } from '@/lib/auth/auth'
import { getUserSocialAccounts } from '@/lib/social/connection'
import { socialAPIClient, SocialMetrics } from '@/lib/social/api-client'
import { getCachedMetrics, cacheMetrics } from '@/lib/cache/redis'
import { useState, useEffect } from 'react'
import { DateRangePicker } from '@/components/ui/DateRangePicker'

interface EngagementData {
  platform: string
  likes: number
  comments: number
  shares: number
  totalEngagement: number
}

async function getEngagementData(startDate?: Date, endDate?: Date): Promise<EngagementData[]> {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const accounts = await getUserSocialAccounts(session.user.id)
  
  const data = await Promise.all(
    accounts.map(async (account) => {
      try {
        // Try to get cached data first
        const cached = await getCachedMetrics(session.user.id!, account.platform)
        if (cached && !startDate && !endDate) {
          return {
            platform: account.platform,
            likes: cached.likes,
            comments: cached.comments,
            shares: cached.shares,
            totalEngagement: cached.likes + cached.comments + cached.shares
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
          likes: metrics.likes,
          comments: metrics.comments,
          shares: metrics.shares,
          totalEngagement: metrics.likes + metrics.comments + metrics.shares
        }
      } catch (error) {
        console.error(`Error fetching metrics for ${account.platform}:`, error)
        return {
          platform: account.platform,
          likes: 0,
          comments: 0,
          shares: 0,
          totalEngagement: 0
        }
      }
    })
  )

  return data
}

export function EngagementMetrics() {
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({})
  const [data, setData] = useState<EngagementData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const engagementData = await getEngagementData(dateRange.start, dateRange.end)
        setData(engagementData)
      } catch (error) {
        setError('Failed to load engagement metrics')
        console.error('Error loading engagement metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [dateRange])

  if (loading) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Engagement Metrics</h2>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Engagement Metrics</h2>
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Engagement Metrics</h2>
        <p className="text-gray-500">
          Connect your social media accounts to view engagement metrics.
        </p>
      </div>
    )
  }

  const totalEngagement = data.reduce((sum, item) => sum + item.totalEngagement, 0)

  return (
    <div className="rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Engagement Metrics</h2>
        <DateRangePicker
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={({ start, end }) => setDateRange({ start, end })}
        />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Likes</p>
            <p className="text-2xl font-semibold">
              {data.reduce((sum, item) => sum + item.likes, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Comments</p>
            <p className="text-2xl font-semibold">
              {data.reduce((sum, item) => sum + item.comments, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Shares</p>
            <p className="text-2xl font-semibold">
              {data.reduce((sum, item) => sum + item.shares, 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {data.map((item) => (
            <div key={item.platform} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium capitalize">{item.platform}</h3>
                <p className="text-sm text-gray-500">
                  {((item.totalEngagement / totalEngagement) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <p>👍 {item.likes.toLocaleString()}</p>
                <p>💬 {item.comments.toLocaleString()}</p>
                <p>🔄 {item.shares.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 