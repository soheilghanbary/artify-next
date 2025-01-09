import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

interface Props {
  image: string
  name: string
  userId: string
  title?: string
}

export const ProductAuthor = ({ image, name, userId }: Props) => {
  return (
    <Link href={`/users/${userId}`} className="flex items-center gap-2.5">
      <img
        src={image}
        alt={name}
        className="size-10 rounded-full object-cover"
      />
      <span className="font-medium text-sm/6">{name}</span>
    </Link>
  )
}

export const ProductAuthorCenter = ({ image, name, userId, title }: Props) => {
  return (
    <div className="mt-8 text-center">
      <div className="relative flex items-center justify-center">
        <Separator className="absolute w-full" />
        <Link
          href={`/users/${userId}`}
          className="z-10 mb-1 flex items-center justify-center rounded-full bg-background px-6"
        >
          <img
            draggable={false}
            src={image}
            alt={name}
            className="size-16 rounded-full object-cover"
          />
        </Link>
      </div>
      <Link
        href={`/users/${userId}`}
        className="text-center font-semibold text-base/normal"
      >
        {name}
      </Link>
      <p className="text-center text-foreground/85 text-xs/6 md:text-sm/5">
        {title}
      </p>
      <Button asChild className="mt-4 mb-6" fullRounded>
        <Link href={`/users/${userId}`}>View Profile</Link>
      </Button>
    </div>
  )
}
