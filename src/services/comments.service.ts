import { client } from '@/lib/api'

type AddCommentProps = {
  productId: string
  userId: string
  text: string
}

export const addComment = async (data: AddCommentProps) => {
  const res = await client.post('/comments', data)
  return res.data
}

export const getComments = async (productId: string) => {
  const res = await client.get(`/comments/${productId}`)
  return res.data as Comment[]
}
