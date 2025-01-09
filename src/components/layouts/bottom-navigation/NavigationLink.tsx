'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  icon: any
  label: string
  href: string
}

export const NavigationLink = ({ icon: Icon, label, href }: Props) => {
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center gap-0.5 p-2 text-xs/5',
        isActive && 'text-primary'
      )}
    >
      <Icon className="size-5 text-current" />
      {label}
    </Link>
  )
}
