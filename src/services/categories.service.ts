import { client } from "@/lib/api"

export const getAllCategories = async () => {
  const res = await client.get('/categories')
  return res.data as Category[]
} 