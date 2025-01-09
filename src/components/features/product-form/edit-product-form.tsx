'use client'
import { TextField } from '@/components/common/text-field'
import { Tiptap } from '@/components/common/tiptap'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TagsInput } from '@/components/ui/tags-input'
import { updateProduct } from '@/services/products.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { array, z } from 'zod'
import { AddProductCategory } from './add-product-category'
import { UploadProductImage } from './upload-product-image'

type Schema = z.infer<typeof schema>

type Props = {
  id: string
  defaultValues: Schema
}

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  image: z.string().min(1, 'Image is required'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  categoryId: z.string().min(3, 'Category required'),
  tags: array(z.string()),
})

export const EditProductForm = ({ id, defaultValues }: Props) => {
  const [pending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const res = await updateProduct(id, data)
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
            <UploadProductImage
              initialImage={field.value}
              onUploaded={(image) => {
                field.onChange(image)
                setValue('image', image)
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
      <div className="grid gap-2">
        <Label>Select Category</Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <AddProductCategory
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        {errors.categoryId && (
          <span className="font-medium text-destructive text-xs">
            {errors.categoryId.message}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        <Label>Tags</Label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagsInput
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Enter your tags"
            />
          )}
        />
      </div>
      <Button
        type="submit"
        variant={'default'}
        disabled={pending}
        className="w-fit"
      >
        {pending && <LoadingIcon className="fill-current" />}
        Update Product
      </Button>
    </form>
  )
}
