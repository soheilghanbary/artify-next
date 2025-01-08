import { client } from '@/lib/api'

export const toggleLike = async (productId: string, userId: string) => {
  const res = await client.post('/likes', {
    productId,
    userId,
  })
  return res.data
}

export const getLikedProducts = async (userId: string) => {
  const res = await client.get(`/likes/${userId}`)
  return res.data
}
