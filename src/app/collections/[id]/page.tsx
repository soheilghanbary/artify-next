import { BackButton } from '@/components/common/back-button'
import { CopyCollection } from '@/components/features/Collection/CopyCollection'
import { EditCollectionModal } from '@/components/features/EditCollection/EditCollectionModal'
import { ProductList } from '@/components/features/ProductList/ProductList'
import { ProductsLoader } from '@/components/features/ProductList/ProductListLoader'
import { Button } from '@/components/ui/button'
import { auth } from '@/server/lib/auth'
import { getCollectionById } from '@/services/collections.service'
import { getCollectionProducts } from '@/services/products.service'
import { Share2Icon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const CollectionProducts = async ({
  collectionId,
}: { collectionId: string }) => {
  const products = await getCollectionProducts(collectionId)
  return <ProductList items={products} />
}

export default async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const collection = await getCollectionById(params.id)

  if (!collection) return notFound()

  const isCollectionUser = collection?.userId === session?.user?.id

  return (
    <div className="space-y-4">
      <BackButton />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="mb-0.5 whitespace-nowrap font-extrabold text-2xl/normal">
            {collection.name}
          </h1>
          <p className="text-xs/6 md:text-sm/6">{collection.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <CopyCollection />
          <Button disabled variant={'outline'} size={'sm'} className="w-fit">
            <Share2Icon />
            Share
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/users/${collection.userId}`}
          className="flex flex-1 items-center gap-2 font-medium text-xs"
        >
          <img
            alt={collection.user.name}
            src={collection.user.image}
            className="size-8 rounded-full object-cover"
          />
          <p>{collection.user.name}</p>
        </Link>
        {isCollectionUser && (
          <EditCollectionModal userId={session?.user?.id} {...collection} />
        )}
      </div>
      <Suspense fallback={<ProductsLoader />}>
        <CollectionProducts collectionId={params.id} />
      </Suspense>
    </div>
  )
}
