import { CategoryProducts } from '@/components/features/ProductList'
import { ProductFilter } from '@/components/features/product-list'
import { SearchField } from '@/components/features/search-field'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  getAllCategories,
  getCategoryBySlug,
} from '@/services/categories.service'
import Link from 'next/link'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

export default async ({ params }: Props) => {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  return (
    <>
      <Suspense>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <SearchField />
            <ProductFilter />
          </div>
          <Categories activeCategory={category.slug} />
        </div>
      </Suspense>
      <CategoryProducts slug={category.id} />
    </>
  )
}

const Categories = async ({ activeCategory }: { activeCategory: string }) => {
  const categories = await getAllCategories()
  return (
    <ScrollArea>
      <div className="flex items-center gap-2 overflow-x-auto">
        {categories.map((c) => (
          <Link
            key={c.id}
            className={cn(
              'whitespace-nowrap rounded-full px-3 py-2 font-medium text-foreground/85 text-sm transition-all hover:bg-muted hover:text-foreground',
              activeCategory === c.slug && 'bg-muted text-foreground'
            )}
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
