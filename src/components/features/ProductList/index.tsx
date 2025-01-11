'use client'
import {
  useAllProducts,
  useCategoryProducts,
  useCollectionProducts,
  useInfinityProducts,
  useLikedProducts,
  useMoreProducts,
  useSearchProducts,
  useUserProducts,
} from '@/hooks/useProducts'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'
import { ProductList } from '../product-list'
import { ProductsLoader } from './ProductListLoader'

export const AllProducts = () => {
  const { data, isPending } = useAllProducts()
  if (isPending) return <ProductsLoader />
  if (!data) return <div>No products found</div>

  return <ProductList items={data} />
}

export const CategoryProducts = ({ slug }: { slug: string }) => {
  const { data, isPending } = useCategoryProducts(slug)
  if (isPending) return <ProductsLoader />
  if (!data) return <div>No products found</div>

  return <ProductList items={data} />
}

export const UserProducts = () => {
  const { data, isPending } = useUserProducts()
  if (isPending) return <ProductsLoader />
  if (!data) return <div>No products found</div>

  return <ProductList items={data} />
}

export const CollectionProducts = () => {
  const params = useParams() as { id: string }
  const { data, isPending } = useCollectionProducts(params.id)
  if (isPending) return <ProductsLoader />
  if (!data) return <div>No products found</div>

  return <ProductList items={data} />
}

export const MoreProducts = ({
  productId,
  userId,
}: { productId: string; userId: string }) => {
  const { data, isPending } = useMoreProducts(productId, userId)
  if (isPending) return <ProductsLoader hideAuthor />
  if (!data) return <div>No more products found</div>

  return <ProductList hideAuthor items={data} />
}

export const SearchProductList = () => {
  const [query] = useQueryState('q')
  const { data, isPending } = useSearchProducts(query || '')
  if (isPending) return <ProductsLoader hideAuthor cols={4} />
  if (!data) return <div>No products found</div>

  if (data.length === 0)
    return (
      <div>
        <p className="text-center">😣 No products found</p>
      </div>
    )

  return (
    <ProductList
      hideAuthor
      cols={4}
      cardOptions={{ showTitle: true }}
      items={data}
    />
  )
}

export const LikedProductList = () => {
  const params = useParams() as { id: string }
  const { data, isPending } = useLikedProducts(params.id)
  if (isPending) return <ProductsLoader />
  if (!data) return <div>No products found</div>

  return <ProductList items={data} />
}

export const CurrentUserProducts = ({ userId }: { userId: string }) => {
  const { data, isPending } = useQuery<ProductProps[], Error>({
    queryKey: ['user-products', userId],
    queryFn: () =>
      fetch(`/api/products/user/${userId}`).then((res) => res.json()),
  })

  if (isPending) return <ProductsLoader />
  if (!data) return <div>No products found</div>

  return <ProductList items={data} />
}

export const InfiniteProductList = () => {
  const { data, fetchNextPage, isFetching, hasNextPage, isPending } =
    useInfinityProducts()

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasNextPage, fetchNextPage])

  return (
    <>
      {data?.pages.map((p, i) => (
        <ProductList key={i} items={p} />
      ))}
      {isFetching && <ProductsLoader />}
      <div ref={observerRef} style={{ height: '10px' }} />
    </>
  )
}
