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

export const createProduct = async (data: any) => {
  const res = await client.post('/products', data)
  return res.data
}

export const updateProduct = async (id: string, data: any) => {
  const res = await client.put(`/products/${id}`, data)
  return res.data
}

export const deleteProduct = async (id: string) => {
  const res = await client.delete(`/products/${id}`)
  return res.data
}

export const incrementViewProduct = async (productId: string) => {
  const res = await client.get(`/products/${productId}/increment-view`)
  return res.data
}
