import { AllProducts } from '@/components/features/ProductList'
import { Hero } from '@/components/features/hero'
import { ProductFilter } from '@/components/features/product-list'
import { SearchField } from '@/components/features/search-field'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getAllCategories } from '@/services/categories.service'
import Link from 'next/link'
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
          <Categories />
        </div>
      </Suspense>
      <Suspense>
        <AllProducts />
      </Suspense>
    </>
  )
}

const Categories = async () => {
  const categories = await getAllCategories()
  return (
    <ScrollArea>
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
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
