import { EditUserLinks } from '@/components/features/edit-user/edit-user-links'
import { auth } from '@/server/lib/auth'
import { getUserById } from '@/services/user.service'

export default async function SettingsLinks() {
  const session = await auth()
  const user = await getUserById(session?.user?.id!)
  return (
    <div className="mx-auto max-w-2xl rounded-lg border">
      <div className="border-b p-4">
        <h1 className="font-bold text-2xl/normal">Social Links</h1>
        <p className="text-foreground/75 text-xs/6 md:text-sm/6">
          Manage your social links and accounts.
        </p>
      </div>
      <div className="p-4">
        <EditUserLinks
          id={user?.id!}
          portfolio={user?.portfolio!}
          twitter={user?.twitter!}
          linkedin={user?.linkedin!}
          github={user?.github!}
          instagram={user?.instagram!}
        />
      </div>
    </div>
  )
}
