import { DEFAULT_LOCALE } from '@/lib/types';
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        Page Not Found
      </h2>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Link 
        href={`/${DEFAULT_LOCALE}`} 
        className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go to Home
      </Link>
    </div>
  )
} 