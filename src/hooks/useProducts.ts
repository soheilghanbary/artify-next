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

type Options = {
  filters?: Record<string, string | null> // چندین فیلتر را به‌صورت داینامیک پشتیبانی می‌کند
  query?: string | null // جستجو
}

export const useAllProducts = ({ filters = {}, query }: Options) => {
  // تبدیل فیلترها به یک رشته کوئری
  const buildQueryString = (params: Record<string, string | null>): string => {
    const queryEntries = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== '') // فقط فیلترهای معتبر
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`
      ) // escape کردن ورودی‌ها برای امنیت
    return queryEntries.join('&')
  }

  return useQuery<ProductProps[], Error>({
    queryKey: ['products', filters, query], // با توجه به تغییر در فیلترها، کش به‌درستی مدیریت می‌شود
    queryFn: () => {
      const queryString = buildQueryString({ ...filters, q: query! }) // ترکیب فیلترها و کوئری
      const endpoint = queryString
        ? `/api/products?${queryString}`
        : '/api/products'
      return fetch(endpoint).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products')
        return res.json()
      })
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
