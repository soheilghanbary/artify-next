import { client } from "@/lib/api"
import Cookies from 'js-cookie'
export const checkLike = async (productId: string) => {
  const token = Cookies.get('token')
  const res = await client.get(`/likes/${productId}/check`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

export const createLike = async (id: string) => {
  const token = Cookies.get('token')
  const res = await client.post(`/likes/${id}`, undefined, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}