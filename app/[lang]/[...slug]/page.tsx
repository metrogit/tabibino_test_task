import { notFound } from 'next/navigation'
import { Locale } from '@/lib/types'

export default function CatchAllPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string[] }>
}) {
  // This catch-all route will trigger the not-found page
  // You can add logic here to handle specific routes if needed
  notFound()
} 