import { EditProductForm } from '@/components/features/product-form/edit-product-form'
import { getProductById } from '@/services/products.service'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProduct({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-center font-bold text-2xl">
        Edit Product Product
      </h1>
      <EditProductForm
        id={id}
        defaultValues={{
          tags: product.tags,
          title: product.title,
          image: product.image,
          categoryId: product.categoryId!,
          description: product.description,
        }}
      />
    </div>
  )
}
