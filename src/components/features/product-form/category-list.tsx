import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getAllCategories } from '@/services/categories.service'
import Link from 'next/link'

export const CategoryList = async () => {
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
