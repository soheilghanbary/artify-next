import { getMoreProducts } from '@/services/products.service'
import { Suspense } from 'react'
import { ProductList } from '../ProductList/ProductList'
import { ProductsLoader } from '../ProductList/ProductListLoader'

interface Props {
  name: string
  productId: string
  userId: string
}

const MoreProducts = async ({ productId, userId }: Omit<Props, 'name'>) => {
  const products = await getMoreProducts(productId, userId)
  return <ProductList hideAuthor items={products} />
}

export const ProductMore = ({ name, productId, userId }: Props) => {
  return (
    <div className="grid gap-4">
      <h2 className="font-medium">More by {name}</h2>
      <Suspense fallback={<ProductsLoader hideAuthor />}>
        <MoreProducts productId={productId} userId={userId} />
      </Suspense>
    </div>
  )
}
