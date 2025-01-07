'use client'
import { cn } from '@/lib/utils'
import type { ProductProps } from '@/types/product'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = ProductProps & {
  hideAuthor?: boolean
  options?: {
    showTitle?: boolean
  }
}

const ProductImage = ({
  id,
  title,
  image,
}: { id: string; title: string; image: string }) => {
  return (
    <Link
      prefetch
      shallow
      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/40"
      href={`/products/${id}`}
    >
      <img
        alt={title}
        src={image}
        draggable={false}
        className={cn('size-full rounded-[inherit] bg-muted object-cover')}
      />
    </Link>
  )
}

const AuthorAvatar = ({ name, image }: { name: string; image: string }) => (
  <Image
    draggable={false}
    alt={name}
    src={image}
    width={32}
    height={32}
    quality={100}
    sizes="80px"
    className="rounded-full object-cover"
    priority
  />
)

const AuthorInfo = ({ user }: { user: ProductProps['user'] }) => (
  <Link
    href={`/users/${user.id}`}
    className="flex flex-1 items-center gap-2 font-medium text-xs"
  >
    <AuthorAvatar name={user.name} image={user.image} />
    <p>{user.name}</p>
  </Link>
)

const ViewCount = ({ view }: { view: number }) => (
  <button
    type="button"
    className="flex items-center gap-1 text-foreground/80 text-xs"
  >
    <EyeIcon className="size-3.5" />
    {view}
  </button>
)

export const ProductCard = ({
  id,
  title,
  image,
  user,
  hideAuthor = false,
  view,
  options,
}: Props) => (
  <div className="flex flex-col gap-2">
    <ProductImage id={id} title={title} image={image} />
    {options?.showTitle && (
      <h2 className="line-clamp-2 text-base/6">{title}</h2>
    )}
    {!hideAuthor && (
      <div className="flex items-center gap-2">
        <AuthorInfo user={user} />
        <ViewCount view={view} />
      </div>
    )}
  </div>
)
