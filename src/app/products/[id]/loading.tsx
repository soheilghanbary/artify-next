import { ScrollTop } from '@/components/common/scroll-top'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <ScrollTop />
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        <Skeleton className="h-9 w-2/3 rounded-full bg-secondary/40" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-10 rounded-full bg-secondary/40" />
          <Skeleton className="h-5 w-24 bg-secondary/40" />
        </div>
        <Skeleton className="aspect-[4/3] bg-secondary/40" />
        <Skeleton className="h-8 w-1/5 rounded-full bg-secondary/40" />
        <div className="grid gap-4">
          <Skeleton className="h-4 w-full rounded-full bg-secondary/40" />
          <Skeleton className="h-4 w-full rounded-full bg-secondary/40" />
          <Skeleton className="h-4 w-full rounded-full bg-secondary/40" />
          <Skeleton className="h-4 w-full rounded-full bg-secondary/40" />
        </div>
      </div>
    </>
  )
}
