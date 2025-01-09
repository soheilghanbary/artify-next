import { ProductsLoader } from '@/components/features/ProductList/ProductListLoader'
import { Hero } from '@/components/features/hero'
import { ProductList } from '@/components/features/product-list'
import { getAllProducts } from '@/services/products.service'
import { Suspense } from 'react'

export default async () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<ProductsLoader />}>
        <AllProducts />
      </Suspense>
    </>
  )
}

const AllProducts = async () => {
  const products = await getAllProducts()
  return <ProductList items={products} />
}
