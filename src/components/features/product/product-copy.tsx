'use client'
import { Copy01Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

export const ProductCopy = () => {
  const pathname = usePathname()

  const copy = () => {
    navigator.clipboard.writeText(window.location.origin + pathname)
    toast.success('Product Link Copied!')
  }

  return (
    <Button onClick={copy} variant={'outline'} size={'icon'}>
      <Copy01Icon className="text-teal-500 dark:text-teal-400" />
    </Button>
  )
}
