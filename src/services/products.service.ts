import { client } from '@/lib/api'

export const getAllProducts = async () => {
  const res = await client.get('/products')
  return res.data as ProductProps[]
}

export const getProductById = async (id: string) => {
  const res = await client.get(`/products/${id}`)
  return res.data as ProductProps
}

export const getUserProducts = async (userId: string) => {
  const res = await client.get(`/products?userId=${userId}`)
  return res.data
}

export const getCollectionProducts = async (collectionId: string) => {
  const res = await client.get(`/products?collectionId=${collectionId}`)
  return res.data
}

export const getMoreProducts = async (productId: string, userId: string) => {
  const res = await client.get(`/products/${productId}/more?userId=${userId}`)
  return res.data
}

export const addToCollection = async (
  productId: string,
  collectionId: string
) => {
  const res = await client.post(`/products/${productId}/save`, {
    productId,
    collectionId,
  })
  return res.data
}

export const incrementViewProduct = async (productId: string) => {
  const res = await client.get(`/products/${productId}/increment-view`)
  return res.data
}
