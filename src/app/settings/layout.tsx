import { SidebarSettings } from '@/components/layouts/settings-sidebar'
import type { PropsWithChildren } from 'react'

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <SidebarSettings />
      <main className="flex-1">{children}</main>
    </div>
  )
}
