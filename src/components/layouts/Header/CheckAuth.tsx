import { AuthModal } from '@/components/features/AuthModal'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { auth } from '@/server/lib/auth'
import { BadgePlus } from 'lucide-react'
import Link from 'next/link'
import { UserProfile } from './UserProfile'

export const CheckAuthSkeleton = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="h-10 w-28 rounded-full" />
    <Skeleton className="size-10 rounded-full" />
  </div>
)

const NewProductButton = () => (
  <Button asChild variant={'default'} fullRounded>
    <Link href={'/new'}>
      <BadgePlus />
      Share Work
    </Link>
  </Button>
)

export const CheckAuth = async () => {
  const session = await auth()
  return session ? (
    <div className="flex items-center gap-4">
      <NewProductButton />
      <UserProfile name={session.user?.name!} image={session.user?.image!} />
    </div>
  ) : (
    <AuthModal />
  )
}
