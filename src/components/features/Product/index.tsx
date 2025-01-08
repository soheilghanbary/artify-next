import { ProductImage } from '@/components/features/Product/ProductImage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fromNow } from '@/lib/utils'
import Link from 'next/link'
import { ProductCopyButton } from './ProductCopyButton'

type Props = {
  product: ProductProps
  userId: string
  isLoggedIn?: boolean
}

type UserProfileLinkProps = {
  userId: string
  image: string
  name: string
}

const UserProfileLink = ({ userId, image, name }: UserProfileLinkProps) => (
  <Link href={`/users/${userId}`} className="flex items-center gap-2.5">
    <img src={image} alt={name} className="size-10 rounded-full object-cover" />
    <span className="font-medium text-sm/6">{name}</span>
  </Link>
)

export const Product = ({ userId, product, isLoggedIn }: Props) => {
  return (
    <>
      <h1 className="motion-preset-fade-sm font-bold text-xl/snug sm:text-2xl/snug lg:text-4xl/tight">
        {product.title}
      </h1>
      <div className="flex items-center gap-2 py-2">
        <UserProfileLink
          userId={product.user.id}
          image={product.user.image}
          name={product.user.name}
        />
        <div className="flex flex-1 items-center justify-end gap-2">
          <ProductCopyButton />
        </div>
      </div>
      <ProductImage src={product.image} alt={product.title} />
      <h2 className="font-bold text-base md:text-2xl">Description</h2>
      <div
        className="text-foreground/85 text-xs/6 md:text-base/7 [&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_a]:decoration-wavy-offset-4 [&_a]:decoration-wavy [&_a]:underline-offset-4"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
      <p className="text-foreground/85 text-xs/5">
        Published {fromNow(product.createdAt)}
      </p>
      {!!product.tags.length && (
        <div className="inline-flex flex-wrap items-center gap-1">
          {product.tags.map((tag) => (
            <Link key={tag} href={`/search?q=${tag}`}>
              <Badge variant={'secondary'}>{tag}</Badge>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        <div className="relative flex items-center justify-center">
          <Separator className="absolute w-full" />
          <Link
            href={`/users/${product.user.id}`}
            className="z-10 mb-1 flex items-center justify-center rounded-full bg-background px-6"
          >
            <img
              draggable={false}
              src={product.user.image}
              alt={product.user.name}
              className="size-16 rounded-full object-cover"
            />
          </Link>
        </div>
        <Link
          href={`/users/${product.user.id}`}
          className="text-center font-semibold text-base/normal"
        >
          {product.user.name}
        </Link>
        <p className="text-center text-foreground/85 text-sm/5">
          {product.user.title}
        </p>
        <Button asChild className="mt-4 mb-6" fullRounded>
          <Link href={`/users/${product.user.id}`}>View Profile</Link>
        </Button>
      </div>
    </>
  )
}
