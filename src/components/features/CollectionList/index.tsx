'use client'
import { LoadingIcon } from '@/components/icons'
import { useUserCollections } from '@/hooks/useCollections'
import { CollectionList } from './CollectionList'

export const UserCollections = () => {
  const { data, isPending } = useUserCollections()
  if (isPending) return <LoadingIcon className="mx-auto my-12 fill-primary" />
  if (!data) return <div>No products found</div>

  return <CollectionList items={data} />
}
