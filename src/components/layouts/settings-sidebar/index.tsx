'use client'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MotionLink = motion(Link)

const SidebarLink = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <MotionLink
      layout
      animate
      href={href}
      className="relative whitespace-nowrap rounded-md px-4 py-2 font-semibold text-foreground/85 text-sm transition-all hover:text-foreground"
    >
      {title}
      {isActive && (
        <motion.div
          layoutId="underline"
          className="-z-20 absolute top-0 left-0 h-full w-full rounded-[inherit] bg-muted/40"
        />
      )}
    </MotionLink>
  )
}

export const SidebarSettings = () => {
  return (
    <aside className="max-w-full md:w-64">
      <AnimatePresence>
        <ul className="flex flex-row gap-1 overflow-x-scroll md:flex-col md:overflow-x-hidden">
          <SidebarLink href="/settings" title="Profile" />
          <SidebarLink href="/settings/links" title="Social Links" />
          <SidebarLink href="/settings/account" title="Account Settings" />
        </ul>
      </AnimatePresence>
    </aside>
  )
}
