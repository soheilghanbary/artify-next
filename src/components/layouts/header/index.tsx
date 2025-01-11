import { Home01Icon, PuzzleIcon, Search01Icon } from '@/components/icons'
import { Suspense } from 'react'
import { CheckAuth, CheckAuthSkeleton } from './check-auth'
import { Logo } from './logo'
import { NavLink } from './nav-link'

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <nav className="container flex items-center justify-between gap-4 px-4 py-2 md:py-4">
        <Logo />
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          <NavLink href="/" label="Home" icon={Home01Icon} />
          <NavLink href="/search" label="Search" icon={Search01Icon} />
          <NavLink href="/about" label="About" icon={PuzzleIcon} />
        </nav>
        <Suspense fallback={<CheckAuthSkeleton />}>
          <CheckAuth />
        </Suspense>
      </nav>
    </header>
  )
}
