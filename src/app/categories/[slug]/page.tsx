import { CategoryProducts } from '@/components/features/ProductList'
import { cn } from '@/lib/utils'
import {
  getAllCategories,
  getCategoryBySlug,
} from '@/services/categories.service'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

export default async ({ params }: Props) => {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  return (
    <>
      <Categories activeCategory={category.slug} />
      <CategoryProducts slug={category.id} />
    </>
  )
}

const Categories = async ({ activeCategory }: { activeCategory: string }) => {
  const categories = await getAllCategories()
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      {categories.map((c) => (
        <Link
          key={c.id}
          className={cn(
            'whitespace-nowrap rounded-full px-4 py-2 font-medium text-foreground/85 text-sm transition-all hover:bg-muted hover:text-foreground',
            activeCategory === c.slug && 'bg-muted text-foreground'
          )}
          href={`/categories/${c.slug}`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  )
}
