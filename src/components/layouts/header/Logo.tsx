import { LogoBrand } from '@/components/icons/logo'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href={'/'} className="flex cursor-pointer items-center text-primary">
      <LogoBrand className="fill-primary" />
    </Link>
  )
}
