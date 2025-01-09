import { Hono } from 'hono'
import { CommentsService } from '../services/comments.service'

const commentsService = new CommentsService()

export const commentsRoutes = new Hono()
  .get('/:productId', async (c) => {
    const productId = c.req.param('productId')
    const comments = await commentsService.getByProductId(productId)
    return c.json(comments)
  })
  .post('/', async (c) => {
    const values = (await c.req.json()) as {
      productId: string
      userId: string
      text: string
    }
    const comment = await commentsService.create(
      values.userId,
      values.productId,
      values.text
    )
    return c.json(comment)
  })
  .delete('/:id', async (c) => {
    const id = c.req.param('id')
    const comment = await commentsService.delete(id)
    return c.json(comment)
  })
