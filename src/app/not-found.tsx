'use client'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const Lottie = dynamic(() => import('@/components/common/404'), { ssr: false })

export default function NotFoundPage() {
  const router = useRouter()
  return (
    <div className="space-y-4 text-center">
      <Lottie />
      <h1>The Page You're Looking For Doesn't Exist</h1>
      <Button variant={'outline'} onClick={() => router.back()}>
        Back
      </Button>
    </div>
  )
}
