'use client'
import { TextField } from '@/components/common/text-field'
import { TipTapSkeleton } from '@/components/common/tiptap'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TagsInput } from '@/components/ui/tags-input'
import { createProduct } from '@/services/products.service'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { array, z } from 'zod'
import { SelectCategory } from './select-category'
import { UploadProductImage } from './upload-product-image'

const RichTextEditor = dynamic(
  () => import('@/components/common/tiptap').then((mod) => mod.Tiptap),
  {
    ssr: false,
    loading: () => <TipTapSkeleton />,
  }
)

type Props = {
  userId: string
  product?: Schema & { id: string }
}

type Schema = z.infer<typeof schema>

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  image: z.string().min(1, 'Image is required'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  categoryId: z.string().min(3, 'Category required'),
  tags: array(z.string()),
  userId: z.string().min(10, 'User ID is required'),
})

export const AddProductForm = ({ userId, product }: Props) => {
  const router = useRouter()
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
      title: product?.title || '',
      image: product?.image || '',
      description: product?.description || '',
      categoryId: product?.categoryId || '',
      tags: product?.tags || [],
      userId,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    startTransition(async () => {
      const res = await createProduct(data)
      toast.success(res.message)
      router.push(`/products/${res.data.id}`)
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
            <RichTextEditor value={field.value} onChange={field.onChange} />
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
            <SelectCategory
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
        Save Product
      </Button>
    </form>
  )
}
