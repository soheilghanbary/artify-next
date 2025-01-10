import { EditUserForm } from '@/components/features/edit-user/edit-user-form'
import { auth } from '@/server/lib/auth'
import { getUserById } from '@/services/user.service'

export default async function SettingsPage() {
  const session = await auth()
  const user = await getUserById(session?.user?.id!)
  return (
    <div className="mx-auto max-w-2xl rounded-lg border">
      <div className="border-b p-4">
        <h1 className="font-bold text-2xl/normal">User Settings</h1>
        <p className="text-foreground/75 text-xs/6 md:text-sm/6">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="p-4">
        <EditUserForm
          title={user?.title!}
          bio={user?.bio!}
          cover={user?.cover!}
          id={user?.id!}
          image={user?.image!}
          name={user?.name!}
        />
      </div>
    </div>
  )
}
