'use client'
import { TextField } from '@/components/common/text-field'
import { Tiptap } from '@/components/common/tiptap'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { EditUserImage } from './EditUserImage'
import { updateUser } from '@/services/user.service'
import { EditUserCover } from './EditUserCover'

const schema = z.object({
  image: z.string(),
  name: z.string().min(2),
  title: z.string().min(2),
  cover: z.string(),
  bio: z.string().min(2),
  portfolio: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
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
        <Tiptap value={watch('bio')} onChange={(e) => setValue('bio', e)} />
      </div>
      <TextField
        label="Portfolio URL"
        className="col-span-2"
        {...register('portfolio')}
      />
      <TextField
        label="Instagram URL"
        className="col-span-2"
        {...register('instagram')}
      />
      <TextField
        label="X (Twitter) URL"
        className="col-span-2"
        {...register('twitter')}
      />
      <TextField
        label="GitHub URL"
        className="col-span-2"
        {...register('github')}
      />
      <TextField
        label="LinkedIn URL"
        className="col-span-2"
        {...register('linkedin')}
      />
      <Button disabled={pending} className="w-fit">
        {pending ? <LoadingIcon className="fill-current" /> : null}
        Save Profile
      </Button>
    </form>
  )
}
