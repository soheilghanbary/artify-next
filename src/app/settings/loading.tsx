import { ScrollTop } from '@/components/common/scroll-top'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <div className="mx-auto max-w-2xl rounded-lg border">
        <div className="grid gap-3 border-b p-4">
          <Skeleton className="h-8 w-2/3 rounded-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="grid gap-4 p-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
      <ScrollTop />
    </>
  )
}
