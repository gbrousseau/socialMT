import { Suspense } from 'react'
import { EngagementMetrics } from '@/components/dashboard/EngagementMetrics'
import { FollowerGrowth } from '@/components/dashboard/FollowerGrowth'
import { RecentPosts } from '@/components/dashboard/RecentPosts'
import { PlatformOverview } from '@/components/dashboard/PlatformOverview'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Suspense fallback={<LoadingSpinner />}>
          <PlatformOverview />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <EngagementMetrics />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<LoadingSpinner />}>
          <FollowerGrowth />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <RecentPosts />
        </Suspense>
      </div>
    </div>
  )
} 