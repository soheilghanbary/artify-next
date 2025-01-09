import { AuthModal } from '@/components/features/AuthModal'
import { AddCircleHalfDotIcon, User01Icon } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { auth } from '@/server/lib/auth'
import Link from 'next/link'

export const CheckAuthSkeleton = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="h-10 w-28 rounded-full" />
    <Skeleton className="size-10 rounded-full" />
  </div>
)

const NewProductButton = () => (
  <Button asChild variant={'default'} fullRounded>
    <Link href={'/new'}>
      <AddCircleHalfDotIcon />
      Share Work
    </Link>
  </Button>
)

export const CheckAuth = async () => {
  const session = await auth()
  return session ? (
    <div className="flex items-center gap-4">
      <NewProductButton />
      <Link
        href={'/profile'}
        className={cn(
          buttonVariants({
            size: 'icon',
            variant: 'outline',
            fullRounded: true,
          }),
          '[&_svg]:size-5'
        )}
      >
        <User01Icon />
      </Link>
    </div>
  ) : (
    <AuthModal />
  )
}
