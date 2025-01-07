import { TextField } from '@/components/common/text-field'
import { TextFieldArea } from '@/components/common/text-field-area'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  type CreateCollectionSchema,
  createCollectionSchema,
} from '@/schemas/collection.schema'
import { createCollection } from '@/services/collections.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Props = {
  userId: string
  onClose: () => void
}

// Reusable Form Buttons Component
const FormButtons = ({
  isPending,
  onClose,
}: { isPending: boolean; onClose: () => void }) => (
  <div className="flex items-center gap-2">
    <Button disabled={isPending} type="submit" className="w-fit">
      {isPending && <LoadingIcon className="mr-2 fill-primary-foreground" />}
      Save
    </Button>
    <Button
      disabled={isPending}
      variant="outline"
      type="button"
      onClick={onClose}
    >
      Cancel
    </Button>
  </div>
)

export const AddCollectionForm = ({ userId, onClose }: Props) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCollectionSchema>({
    resolver: zodResolver(createCollectionSchema),
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const res = await createCollection({
        ...data,
        userId,
      })
      toast.success(res.message)
      onClose()
      router.refresh()
    })
  })

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <TextField
        label="Name"
        error={errors.name?.message}
        {...register('name')}
      />
      <TextFieldArea
        label="Description"
        error={errors.description?.message}
        {...register('description')}
      />
      <FormButtons isPending={pending} onClose={onClose} />
    </form>
  )
}
