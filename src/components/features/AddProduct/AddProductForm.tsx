'use client'
import { TextField } from '@/components/common/text-field'
import { Tiptap } from '@/components/common/tiptap'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { useEffect, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { AddProductImage } from './AddProductImage'

type Props = {
  userId: string
}

type Schema = z.infer<typeof schema>

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  image: z.string().min(1, 'Image is required'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  userId: z.string().min(10, 'User ID is required'),
})

const createProduct = async (data: any) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return res.json()
}

export const AddProductForm = ({ userId }: Props) => {
  const [pending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      image: '',
      description: '',
      userId,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const res = await createProduct(data)
      toast.success(res.message)
    })
  })

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <TextField
        label="Title"
        error={errors.title?.message}
        {...register('title')}
      />
      <div className="grid gap-2">
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <AddProductImage
              onUploaded={(image) => {
                field.onChange(image) // Update the form state
                setValue('image', image) // Optional: Directly set the value
              }}
            />
          )}
        />
        {errors.image && (
          <span className="font-medium text-destructive text-xs">
            {errors.image.message}
          </span>
        )}
      </div>
      <div className="grid gap-2 [&_label]:text-sm">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Tiptap value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.description && (
          <span className="font-medium text-destructive text-xs">
            {errors.description.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        variant={'default'}
        disabled={pending}
        className="w-fit"
      >
        {pending && <LoadingIcon className="fill-current" />}
        Save Product
      </Button>
    </form>
  )
}
