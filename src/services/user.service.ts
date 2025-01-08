import { client } from '@/lib/api'

const getUserById = async (id: string) => {
  try {
    const res = await client.get(`/users/${id}`)
    return res.data as User
  } catch (error) {
    return null
  }
}

const updateUser = async (id: string, data: any) => {
  const res = await client.put(`/users/${id}`, data)
  return res.data
}

export { getUserById, updateUser }
