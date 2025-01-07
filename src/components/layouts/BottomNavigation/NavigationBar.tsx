'use client'
import { AuthModal } from '@/components/features/AuthModal'
import {
  Home01Icon,
  Login03Icon,
  PuzzleIcon,
  Search01Icon,
  User01Icon,
} from '@/components/icons'
import { NavigationLink } from './NavigationLink'

type Props = {
  isSigned: boolean
}

export const NavigationBar = ({ isSigned }: Props) => {
  return (
    <nav className="fixed bottom-0 left-0 z-20 grid w-full grid-cols-4 items-center border-t bg-background text-foreground/75 md:hidden">
      <NavigationLink icon={Home01Icon} label="Home" href="/" />
      <NavigationLink icon={Search01Icon} label="Search" href="/search" />
      {isSigned ? (
        <NavigationLink icon={User01Icon} label="Profile" href="/profile" />
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
      <NavigationLink icon={PuzzleIcon} label="About" href="/about" />
    </nav>
  )
}
