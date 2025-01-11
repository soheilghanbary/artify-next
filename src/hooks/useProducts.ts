import { getMoreProducts } from '@/services/products.service'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return res.json()
    },
  })
}

export const useSearchProducts = (query: string) => {
  return useQuery<ProductProps[], Error>({
    queryKey: ['search-products', query],
    queryFn: () =>
      fetch(`/api/products/search?q=${query}`).then((res) => res.json()),
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useAllProducts = ({ filter }: { filter: string | null }) => {
  return useQuery<ProductProps[], Error>({
    queryKey: ['products', filter],
    queryFn: () => {
      if (filter) {
        return fetch(`/api/products?filter=${filter}`).then((res) => res.json())
      }
      return fetch('/api/products').then((res) => res.json())
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
}

export const useCategoryProducts = (slug: string) => {
  return useQuery<ProductProps[], Error>({
    queryKey: ['category-products', slug],
    queryFn: () =>
      fetch(`/api/products/category/${slug}`).then((res) => res.json()),
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useUserProducts = () => {
  return useQuery<ProductProps[], Error>({
    queryKey: ['user-products'],
    queryFn: () => fetch('/api/products/user').then((res) => res.json()),
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useCollectionProducts = (collectionId: string) => {
  return useQuery<ProductProps[], Error>({
    queryKey: ['collection-products', collectionId],
    queryFn: () =>
      fetch(`/api/products/collection/${collectionId}`).then((res) =>
        res.json()
      ),
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useMoreProducts = (productId: string, userId: string) => {
  return useQuery<ProductProps[], Error>({
    queryKey: ['more-products', productId],
    queryFn: () => getMoreProducts(productId, userId),
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useProductById = (id: string) => {
  return useQuery<ProductProps, Error>({
    queryKey: ['product', id],
    queryFn: () => fetch(`/api/products/${id}`).then((res) => res.json()),
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useLikedProduct = (id: string) => {
  return useQuery<ProductProps[], Error>({
    queryKey: ['liked-product', id],
    queryFn: () => fetch(`/api/liked/${id}`).then((res) => res.json()),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useLikedProducts = (id: string) => {
  return useQuery<ProductProps[], Error>({
    queryKey: ['liked-products', id],
    queryFn: () => fetch('/api/likes').then((res) => res.json()),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useInfinityProducts = () => {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['infinity-products'],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`/api/products?page=${pageParam}`).then((res) => res.json()),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 8) {
        return undefined
      }
      return allPages.length
    },
  })
}
