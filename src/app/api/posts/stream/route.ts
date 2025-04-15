import { NextResponse } from 'next/server'
import { subscribeToUpdates } from '@/lib/cache/redis'

export async function GET() {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      // Subscribe to Redis updates
      subscribeToUpdates('posts-update', (data) => {
        const message = `data: ${JSON.stringify(data)}\n\n`
        controller.enqueue(encoder.encode(message))
      })
    },
    cancel() {
      // Clean up subscription
    }
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
} 