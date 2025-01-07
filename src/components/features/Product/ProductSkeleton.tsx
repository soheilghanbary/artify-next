import { Skeleton } from '@/components/ui/skeleton'

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-11 w-2/3" />
      <div className="flex items-center gap-2">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="aspect-[4/3]" />
      <Skeleton className="h-8 w-1/3 rounded-full" />
      <div className="grid gap-4">
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
      </div>
    </div>
  )
}
