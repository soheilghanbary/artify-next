'use client'
import { TextField } from '@/components/common/text-field'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { updateUser } from '@/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { EditUserCover } from './edit-user-cover'
import { EditUserImage } from './edit-user-image'
import { TipTapSkeleton } from '@/components/common/tiptap'
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(
  () => import('@/components/common/tiptap').then((mod) => mod.Tiptap),
  {
    ssr: false,
    loading: () => <TipTapSkeleton />,
  }
)

const schema = z.object({
  image: z.string(),
  name: z.string().min(2),
  title: z.string().min(2),
  cover: z.string(),
  bio: z.string().min(2),
})

type Schema = z.infer<typeof schema>

export const EditUserForm = (defaultValues: Schema & { id: string }) => {
  const [pending, mutate] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = handleSubmit((data) => {
    mutate(async () => {
      const res = await updateUser(defaultValues.id, data)
      toast.success(res.message)
    })
  })

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 items-start gap-4">
      <EditUserImage
        initialImage={defaultValues.image}
        onChange={(e) => setValue('image', e)}
      />
      <TextField
        label="Full name"
        error={errors.name?.message}
        className="col-span-2 sm:col-span-1"
        {...register('name')}
      />
      <TextField
        label="Job Title"
        className="col-span-2 sm:col-span-1"
        error={errors.title?.message}
        {...register('title')}
      />
      <EditUserCover
        initialImage={watch('cover')}
        onChange={(e) => setValue('cover', e)}
      />
      <div className="col-span-2 grid gap-2 [&_label]:text-sm">
        <Label>Biography</Label>
        <RichTextEditor
          value={watch('bio')}
          onChange={(e) => setValue('bio', e)}
        />
      </div>
      <Button disabled={pending} className="w-fit">
        {pending ? <LoadingIcon className="fill-current" /> : null}
        Save Profile
      </Button>
    </form>
  )
}
