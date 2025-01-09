'use client'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addComment } from '@/services/comments.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

type Props = {
  productId: string
  userId: string
}

type Schema = z.infer<typeof schema>

const schema = z.object({
  productId: z.string().min(10),
  userId: z.string().min(10),
  text: z.string().min(3),
})

export const AddComment = ({ productId, userId }: Props) => {
  const qc = useQueryClient()
  const [pending, mutate] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { productId, userId },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(async () => {
      const res = await addComment(data)
      qc.invalidateQueries({ queryKey: ['comments', data.productId] })
      toast.success(res.message)
      reset()
    })
  })

  return (
    <>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <Input
          className="flex-1"
          placeholder="share your thoughts"
          {...register('text')}
        />
        <Button>
          {pending && <LoadingIcon className="fill-current" />}
          Post
        </Button>
      </form>
      {errors.text && (
        <span className="font-medium text-destructive text-xs">
          {errors.text.message}
        </span>
      )}
    </>
  )
}
