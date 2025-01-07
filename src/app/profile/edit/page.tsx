import { BackButton } from '@/components/common/back-button'
import { EditUserForm } from '@/components/features/EditUser/EditUserForm'
import { getUserProfile } from '@/services/auth.service'

export default async function EditProfilePage() {
  const user = await getUserProfile()

  return (
    <div className="space-y-6">
      <BackButton label="Back to Profile" />
      <div className="mx-auto max-w-md space-y-4">
        <EditUserForm {...user} />
      </div>
    </div>
  )
}
