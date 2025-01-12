import { AllProducts } from '@/components/features/ProductList'
import { Hero } from '@/components/features/hero'
import { CategoryList } from '@/components/features/product-form/category-list'
import { ProductFilter } from '@/components/features/product-list'
import { SearchField } from '@/components/features/search-field'
import { Suspense } from 'react'

export default async () => {
  return (
    <>
      <Hero />
      <Suspense>
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b bg-background py-4">
          <div className="flex flex-1 items-center gap-2">
            <SearchField />
            <ProductFilter />
          </div>
          <CategoryList />
        </div>
      </Suspense>
      <Suspense>
        <AllProducts />
      </Suspense>
    </>
  )
}
