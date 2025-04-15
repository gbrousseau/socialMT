import { auth } from '@/lib/auth/auth'
import { getUserSocialAccounts } from '@/lib/social/connection'

interface FollowerData {
  platform: string
  currentFollowers: number
  previousFollowers: number
  growthRate: number
}

async function getFollowerData(): Promise<FollowerData[]> {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const accounts = await getUserSocialAccounts(session.user.id)
  
  // TODO: Implement actual follower data fetching from social media APIs
  return accounts.map(account => ({
    platform: account.platform,
    currentFollowers: 0,
    previousFollowers: 0,
    growthRate: 0
  }))
}

export async function FollowerGrowth() {
  const data = await getFollowerData()
  
  if (data.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Follower Growth</h2>
        <p className="text-gray-500">
          Connect your social media accounts to track follower growth.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Follower Growth</h2>
      <div className="space-y-4">
        {data.map((item) => {
          const growthColor = item.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
          const growthIcon = item.growthRate >= 0 ? '↑' : '↓'
          
          return (
            <div key={item.platform} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium capitalize">{item.platform}</h3>
                <div className={`flex items-center ${growthColor}`}>
                  <span className="text-sm mr-1">{growthIcon}</span>
                  <span className="font-medium">{Math.abs(item.growthRate)}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Followers</p>
                  <p className="font-medium">{item.currentFollowers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previous Period</p>
                  <p className="font-medium">{item.previousFollowers.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 