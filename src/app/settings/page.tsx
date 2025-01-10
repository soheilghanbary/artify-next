import Link from 'next/link'

const SidebarLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="whitespace-nowrap rounded-md p-2 font-medium text-muted-foreground text-sm transition-all hover:bg-muted/40 hover:text-foreground"
    >
      {title}
    </Link>
  )
}

const SidebarSettings = () => {
  return (
    <aside className="max-w-full md:w-64">
      <div className="flex flex-row gap-1 overflow-x-scroll md:flex-col md:overflow-x-hidden">
        <SidebarLink href="/settings/profile" title="Profile" />
        <SidebarLink href="/settings/links" title="Social Links" />
        <SidebarLink href="/settings/account" title="Account Settings" />
        <SidebarLink href="/settings/notifications" title="Notifications" />
      </div>
    </aside>
  )
}

export default function Settings() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <SidebarSettings />
      <main className="flex-1">main settings</main>
    </div>
  )
}
