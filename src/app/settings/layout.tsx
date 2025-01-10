import { SidebarSettings } from '@/components/layouts/settings-sidebar'
import type { PropsWithChildren } from 'react'

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-4 md:flex-row">
      <SidebarSettings />
      <main className="flex-1">{children}</main>
    </div>
  )
}
