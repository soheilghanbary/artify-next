import { client } from '@/lib/api'

export const getUserProfile = async () => {
  try {
    const res = await client.get('/users/profile')
    return res.data as User
  } catch (err) {
    return null
  }
}
