'use client'
import { ArrowBigLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export const BackButton: React.FC<{ label?: string; href?: string }> = ({
  label,
  href,
}) => {
  const router = useRouter()
  const handleRouter = () => (href ? router.push(href) : router.back())

  return (
    <Button
      type="button"
      onClick={handleRouter}
      variant={'ghost'}
      className="w-fit"
    >
      <ArrowBigLeft />
      {label || 'Back'}
    </Button>
  )
}
