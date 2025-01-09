'use client'
import { AuthModal } from '@/components/features/AuthModal'
import {
  AddCircleHalfDotIcon,
  Home01Icon,
  Login03Icon,
  Search01Icon,
  User01Icon,
} from '@/components/icons'
import { cn } from '@/lib/utils'
import { NavigationLink } from './NavigationLink'

type Props = {
  isSigned: boolean
}

export const NavigationBar = ({ isSigned }: Props) => {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 z-20 grid w-full items-center border-t bg-background text-foreground/75 md:hidden',
        isSigned ? 'grid-cols-4' : 'grid-cols-3'
      )}
    >
      <NavigationLink icon={Home01Icon} label="Home" href="/" />
      <NavigationLink icon={Search01Icon} label="Search" href="/search" />
      {isSigned ? (
        <>
          <NavigationLink icon={AddCircleHalfDotIcon} label="New" href="/new" />
          <NavigationLink icon={User01Icon} label="Profile" href="/profile" />
        </>
      ) : (
        <AuthModal
          initialTrigger={
            <button
              type="button"
              className="flex flex-col items-center justify-center gap-1 p-2 text-xs/5"
            >
              <Login03Icon className="size-4 text-current" />
              Sign In
            </button>
          }
        />
      )}
    </nav>
  )
}
