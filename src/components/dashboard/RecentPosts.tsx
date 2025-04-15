import { auth } from '@/lib/auth/auth'
import { getUserSocialAccounts } from '@/lib/social/connection'
import { socialAPIClient, Post } from '@/lib/social/api-client'
import { getCachedPosts, cachePosts } from '@/lib/cache/redis'
import { useState, useEffect } from 'react'

async function getRecentPosts(): Promise<Post[]> {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  const accounts = await getUserSocialAccounts(session.user.id)
  
  const allPosts = await Promise.all(
    accounts.map(async (account) => {
      try {
        // Try to get cached posts first
        const cached = await getCachedPosts(session.user.id!, account.platform)
        if (cached) {
          return cached
        }

        // If no cache, fetch fresh data
        const posts = await socialAPIClient.getPosts(account)
        
        // Cache the results
        await cachePosts(session.user.id!, account.platform, posts)
        
        return posts
      } catch (error) {
        console.error(`Error fetching posts for ${account.platform}:`, error)
        return []
      }
    })
  )

  // Flatten and sort by timestamp
  return allPosts
    .flat()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        setError(null)
        const data = await getRecentPosts()
        setPosts(data)
      } catch (error) {
        setError('Failed to load recent posts')
        console.error('Error loading recent posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()

    // Set up real-time updates
    const eventSource = new EventSource('/api/posts/stream')
    eventSource.onmessage = (event) => {
      const newPost = JSON.parse(event.data)
      setPosts((currentPosts) => [newPost, ...currentPosts].slice(0, 10))
    }

    return () => {
      eventSource.close()
    }
  }, [])

  if (loading) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        <p className="text-gray-500">
          Connect your social media accounts to view recent posts.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium capitalize">{post.platform}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.timestamp).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
            
            <div className="flex space-x-4 text-sm text-gray-500">
              <span>👍 {post.metrics.likes.toLocaleString()}</span>
              <span>💬 {post.metrics.comments.toLocaleString()}</span>
              <span>🔄 {post.metrics.shares.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 