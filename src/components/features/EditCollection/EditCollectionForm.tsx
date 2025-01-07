import { TextField } from '@/components/common/text-field'
import { TextFieldArea } from '@/components/common/text-field-area'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { DeleteCollection } from './DeleteCollection'

// Form Schema
const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
})

type Schema = z.infer<typeof schema>

type Props = {
  id: string
  defaultValues: Schema
  userId: string
  onClose: () => void
}

const updateCollection = async (id: string, data: any) => {
  const res = await fetch(`/api/collections/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const EditCollectionForm = ({
  id,
  defaultValues,
  userId,
  onClose,
}: Props) => {
  const [pending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const res = await updateCollection(id, { ...data, userId })
      toast.success(res.message)
      onClose()
    })
  })

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <TextField
        label="Name"
        {...register('name')}
        error={errors.name?.message}
      />
      <TextFieldArea
        label="Description"
        {...register('description')}
        error={errors.description?.message}
      />
      <div className="flex items-center gap-2">
        <Button disabled={pending} type="submit" className="w-fit">
          {pending && <LoadingIcon className="mr-2 fill-primary-foreground" />}
          Update
        </Button>
        <DeleteCollection id={id} />
      </div>
    </form>
  )
}
