import Link from 'next/link'

const SidebarLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="whitespace-nowrap rounded-md px-4 py-2 font-medium text-muted-foreground text-sm transition-all hover:bg-muted/40 hover:text-foreground"
    >
      {title}
    </Link>
  )
}

export const SidebarSettings = () => {
  return (
    <aside className="max-w-full md:w-64">
      <div className="flex flex-row gap-1 overflow-x-scroll md:flex-col md:overflow-x-hidden">
        <SidebarLink href="/settings" title="Profile" />
        <SidebarLink href="/settings/links" title="Social Links" />
        <SidebarLink href="/settings/account" title="Account Settings" />
      </div>
    </aside>
  )
}
