import { client } from "@/lib/api"

type Schema = {
  name: string
  description: string
  userId: string
}

const createCollection = async (data: Schema) => {
  const res = await client.post('/collections', data)
  return res.data
}

const getCollectionById = async (id: string) => {
  const res = await client.get(`/collections/${id}`)
  return res.data
}

const getUserCollections = async (userId: string) => {
  const res = await client.get(`/collections?userId=${userId}`)
  return res.data as Collection[]
}

export {
  getUserCollections,
  createCollection,
  getCollectionById
}
