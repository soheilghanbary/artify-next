import {
  GridViewIcon,
  Home01Icon,
  PuzzleIcon,
  Search01Icon,
} from '@/components/icons'
import { CheckAuth } from './CheckAuth'
import { Logo } from './Logo'
import { NavLink } from './NavLink'

export const Header = () => {
  return (
    <header className="border-b">
      <nav className="container flex items-center justify-between gap-4 px-4 py-2 md:py-4">
        <Logo />
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          <NavLink href="/" label="Home" icon={Home01Icon} />
          <NavLink href="/search" label="Search" icon={Search01Icon} />
          <NavLink href="/about" label="About" icon={PuzzleIcon} />
          {/* <ProductSearch /> */}
        </nav>
        <CheckAuth />
      </nav>
    </header>
  )
}
