import { client } from '@/lib/api'

export const toggleLike = async (productId: string, userId: string) => {
  const res = await client.post('/likes/toggle', {
    productId,
    userId,
  })
  return res.data
}

export const checkLike = async (productId: string, userId: string) => {
  const res = await client.post('/api/likes/check', {
    productId,
    userId,
  })
  return res.data
}
