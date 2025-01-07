import { BackButton } from '@/components/common/back-button'
import { Product } from '@/components/features/Product'
import { ProductIncrementView } from '@/components/features/Product/ProductIncrementView'
import { MoreProducts } from '@/components/features/ProductList'
import { getUserProfile } from '@/services/auth.service'
import { getProductById } from '@/services/products.service'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params
//   const product = await getProductById(id)

//   return {
//     title: product.title,
//     description: product.description,
//     twitter: {
//       card: 'summary_large_image',
//       title: product.title,
//       description: product.description,
//       images: [product.image],
//     },
//     openGraph: {
//       title: product.title,
//       description: product.description,
//       publishedTime: new Date(product.createdAt).toISOString(),
//       modifiedTime: new Date(product.updatedAt).toISOString(),
//       url: `https://artify.co/products/${id}`,
//       images: [
//         {
//           url: product.image,
//           alt: product.title,
//         },
//       ],
//     },
//   }
// }

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)
  const user = await getUserProfile()

  if (!product) return notFound()

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 py-2">
      <BackButton />
      <Product product={product} isLoggedIn={!!user} userId={user?.id!} />
      <div className="grid gap-4">
        <h2 className="font-medium">More by {product.user.name}</h2>
        <MoreProducts productId={id} userId={product.user.id} />
      </div>
      <ProductIncrementView />
    </div>
  )
}
