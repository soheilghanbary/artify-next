'use client'
import { AuthModal } from '@/components/features/AuthModal'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserProfile } from '@/hooks/useUsers'
import { BadgePlus } from 'lucide-react'
import Link from 'next/link'
import { UserProfile } from './UserProfile'

const ProfileLoader = () => (
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

export const CheckAuth = () => {
  const { data: user, isPending } = useUserProfile()

  if (isPending) return <ProfileLoader />

  return user ? (
    <div className="flex items-center gap-4">
      <NewProductButton />
      <UserProfile name={user?.name!} image={user?.image!} />
    </div>
  ) : (
    <AuthModal />
  )
}
