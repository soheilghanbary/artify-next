import { ProductsLoader } from '@/components/features/ProductList/ProductListLoader'
import { Hero } from '@/components/features/hero'
import { ProductFilter, ProductList } from '@/components/features/product-list'
import { getAllCategories } from '@/services/categories.service'
import { getAllProducts } from '@/services/products.service'
import Link from 'next/link'
import { Suspense } from 'react'

export default async () => {
  return (
    <>
      <Hero />
      <Suspense>
        <div className="flex items-center justify-between gap-4">
          <ProductFilter />
          <Categories />
        </div>
      </Suspense>
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

const Categories = async () => {
  const categories = await getAllCategories()
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      {categories.map((c) => (
        <Link
          key={c.id}
          className="whitespace-nowrap rounded-full px-3 py-2 font-medium text-foreground/85 text-sm transition-all hover:bg-muted hover:text-foreground"
          href={`/categories/${c.slug}`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  )
}
