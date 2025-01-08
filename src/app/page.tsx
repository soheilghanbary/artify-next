import { Hero } from '@/components/features/Hero'
import { ProductList } from '@/components/features/ProductList/ProductList'
import { ProductsLoader } from '@/components/features/ProductList/ProductListLoader'
import { getAllCategories } from '@/services/categories.service'
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
