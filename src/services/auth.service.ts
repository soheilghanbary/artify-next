import { getToken } from '@/helpers/token'
import { client } from '@/lib/api'

export const getUserProfile = async () => {
  const token = await getToken()
  try {
    const res = await client.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data as User
  } catch (err) {
    return null
  }
}