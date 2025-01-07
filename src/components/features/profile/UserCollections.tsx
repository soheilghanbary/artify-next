import { fromNow } from '@/lib/utils'
import { getUserCollections } from '@/services/collections.service'
import { BoxIcon } from 'lucide-react'
import Link from 'next/link'
import { AddCollectionModal } from '../AddCollection/AddCollectionModal'

type Props = {
  id: string
}

const CollectionCard = ({ collection }: { collection: Collection }) => (
  <Link
    className="flex h-40 flex-col justify-between rounded-lg border p-4 shadow-sm"
    href={`/collections/${collection.id}`}
  >
    <h2 className="font-semibold text-base/8">{collection.name}</h2>
    <p className="mb-auto line-clamp-2 text-foreground/75 text-sm/6">
      {collection.description}
    </p>
    <div className="mt-4 flex items-center justify-between gap-2">
      <p className="flex items-center gap-1.5 text-foreground/75 text-xs/6">
        {fromNow(collection.createdAt)}
      </p>
      <p className="flex items-center gap-1.5 text-foreground/75 text-xs/6">
        <BoxIcon className="size-3.5" /> {collection.products.length} Products
      </p>
    </div>
  </Link>
)

export const UserCollections = async ({ id }: Props) => {
  const collections = await getUserCollections(id)
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
      <AddCollectionModal userId={id} />
    </div>
  )
}
