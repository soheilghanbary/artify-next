import { BackButton } from '@/components/common/back-button'
import { EditUserForm } from '@/components/features/edit-user/edit-user-form'
import { auth } from '@/server/lib/auth'
import { getUserById } from '@/services/user.service'

export default async function EditProfilePage() {
  const session = await auth()
  const user = await getUserById(session?.user?.id!)

  return (
    <div className="space-y-6">
      <BackButton label="Back to Profile" />
      <div className="mx-auto max-w-md space-y-4">
        <EditUserForm {...user} />
      </div>
    </div>
  )
}
