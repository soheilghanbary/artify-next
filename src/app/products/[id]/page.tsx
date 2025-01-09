import { BackButton } from '@/components/common/back-button'
import { AddComment, CommentList } from '@/components/features/comment'
import {
  ProductAuthor,
  ProductAuthorCenter,
  ProductContent,
  ProductCopy,
  ProductImage,
  ProductIncrementView,
  ProductLike,
  ProductMore,
} from '@/components/features/product'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/server/lib/auth'
import { getProductById } from '@/services/products.service'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  return {
    title: product.title,
    description: product.description,
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.image],
    },
    openGraph: {
      title: product.title,
      description: product.description,
      publishedTime: new Date(product.createdAt).toISOString(),
      modifiedTime: new Date(product.updatedAt).toISOString(),
      url: `https://artify.co/products/${id}`,
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const session = await auth()
  const userId = session?.user?.id!
  const product = await getProductById(id)

  if (!product) return notFound()

  const hasLiked = product.likes.some((like) => like.userId === userId)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 py-2">
      <BackButton />
      <h1 className="motion-preset-fade-sm font-bold text-xl/snug sm:text-2xl/snug lg:text-4xl/tight">
        {product.title}
      </h1>
      <div className="flex items-center gap-2 py-2">
        <ProductAuthor
          userId={product.user.id}
          image={product.user.image}
          name={product.user.name}
        />
        <div className="flex flex-1 items-center justify-end gap-2">
          {!!session && (
            <ProductLike
              userId={userId}
              hasLiked={hasLiked}
              productId={product.id}
            />
          )}
          <ProductCopy />
        </div>
      </div>
      <ProductImage src={product.image} alt={product.title} />
      <ProductContent
        view={product.view}
        tags={product.tags}
        createdAt={product.createdAt}
        description={product.description}
        category={product.category}
      />
      <ProductAuthorCenter
        userId={product.user.id}
        image={product.user.image}
        name={product.user.name}
      />
      <ProductMore
        userId={userId}
        productId={product.id}
        name={product.user.name}
      />
      <Separator />
      <div className="grid gap-4">
        <h2 className="font-medium">FeedBack</h2>
        {!!session && <AddComment productId={id} userId={session?.user?.id!} />}
        <CommentList id={id} />
      </div>
      <ProductIncrementView />
    </div>
  )
}
