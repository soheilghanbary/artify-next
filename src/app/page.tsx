import { Hero } from '@/components/features/Hero'
import { ProductList } from '@/components/features/ProductList/ProductList'
import { ProductsLoader } from '@/components/features/ProductList/ProductListLoader'
import { SetTokenCookie } from '@/components/features/SetTokenCookie'
import { getAllProducts } from '@/services/products.service'
import { Suspense } from 'react'

type Props = {
  searchParams: Promise<{ token: string }> & { token: string }
}

export default async ({ searchParams }: Props) => {
  const { token } = await searchParams
  return (
    <>
      <Hero />
      <Suspense fallback={<ProductsLoader />}>
        <AllProducts />
      </Suspense>
      {token && <SetTokenCookie />}
    </>
  )
}

const AllProducts = async () => {
  const products = await getAllProducts()
  return <ProductList items={products} />
}
