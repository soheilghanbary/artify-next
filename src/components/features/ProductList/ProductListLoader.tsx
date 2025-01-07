import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type Props = {
  hideAuthor?: boolean
  cols?: number
}

export const ProductsLoader = ({ hideAuthor, cols }: Props) => {
  return (
    <div
      className={cn(
        'grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        hideAuthor && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        cols === 3 && 'lg:grid-cols-3'
      )}
    >
      {Array.from({ length: hideAuthor ? 4 : 12 }).map((_, i) => (
        <div key={i} className="grid gap-2">
          <Skeleton className="aspect-[4/3] rounded-xl" />
          {!hideAuthor ? (
            <div className="flex flex-1 items-center gap-2 font-medium text-xs">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 w-1/3 rounded-full" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
