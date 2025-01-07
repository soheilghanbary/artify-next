import { ScrollTop } from '@/components/common/scroll-top'
import { LoadingIcon } from '@/components/icons'

export default function Loading() {
  return (
    <>
      <LoadingIcon className="mx-auto my-12 size-6 fill-primary" />
      <ScrollTop />
    </>
  )
}
