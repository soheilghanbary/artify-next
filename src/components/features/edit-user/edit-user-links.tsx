'use client'
import { TextField } from '@/components/common/text-field'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { updateUser } from '@/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const schema = z.object({
  portfolio: z.string(),
  twitter: z.string(),
  linkedin: z.string(),
  github: z.string(),
  instagram: z.string(),
})

type Schema = z.infer<typeof schema>

export const EditUserLinks = (defaultValues: Schema & { id: string }) => {
  const [pending, mutate] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <form onSubmit={onSubmit} className="grid gap-4">
      <TextField
        label="Portfolio"
        error={errors.portfolio?.message}
        {...register('portfolio')}
      />
      <TextField
        label="X (twitter)"
        error={errors.twitter?.message}
        {...register('twitter')}
      />
      <TextField
        label="LinkedIn"
        error={errors.linkedin?.message}
        {...register('linkedin')}
      />
      <TextField
        label="GitHub"
        error={errors.github?.message}
        {...register('github')}
      />
      <TextField
        label="Instagram"
        error={errors.instagram?.message}
        {...register('instagram')}
      />
      <Button disabled={pending} className="w-fit">
        {pending ? <LoadingIcon className="fill-current" /> : null}
        Save
      </Button>
    </form>
  )
}
