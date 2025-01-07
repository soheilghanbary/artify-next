'use client'
import { Button } from '@/components/ui/button'
import { CopyIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

export const CopyCollection = () => {
  const pathname = usePathname()

  const copy = () => {
    navigator.clipboard.writeText(window.location.origin + pathname)
    toast.success('Collection Link Copied!')
  }

  return (
    <Button onClick={copy} variant={'outline'} size={'sm'} className="w-fit">
      <CopyIcon />
      Copy Link
    </Button>
  )
}
