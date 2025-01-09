import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'

type Props = {
  items: ProductProps[]
  hideAuthor?: boolean
  cols?: number
  cardOptions?: {
    showTitle?: boolean
  }
}

export const ProductList = ({
  items,
  cols,
  hideAuthor,
  cardOptions,
}: Props) => {
  return (
    <div
      className={cn(
        'grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        hideAuthor && 'grid-cols-2',
        cols === 3 && 'lg:grid-cols-3',
        cardOptions?.showTitle && 'grid-cols-1 md:grid-cols-2'
      )}
    >
      {items.map((p, i) => (
        <ProductCard
          key={i}
          hideAuthor={hideAuthor}
          options={cardOptions}
          {...p}
        />
      ))}
    </div>
  )
}
