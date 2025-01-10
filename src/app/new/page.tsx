import { AddProductForm } from '@/components/features/product-form/add-product-form'
import { auth } from '@/server/lib/auth'

export default async function NewProduct() {
  const session = await auth()
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-center font-bold text-2xl">Add New Product</h1>
      <AddProductForm userId={session?.user?.id!} />
    </div>
  )
}
