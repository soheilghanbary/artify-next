import { Hono } from 'hono'
import { z } from 'zod'
import { LikesService } from '../services/likes.service'

const likesService = new LikesService()

// Define a schema for request validation
const toggleLikeSchema = z.object({
  userId: z.string().uuid(), // Assuming userId is a UUID
  productId: z.string().uuid(), // Assuming productId is a UUID
})

export const likesRoutes = new Hono()
  .get('/:userId', async (c) => {
    const userId = c.req.param('userId')
    const likes = await likesService.getByUserId(userId)
    return c.json(likes)
  })
  .post('/', async (c) => {
    const result = toggleLikeSchema.safeParse(await c.req.json())
    if (!result.success) {
      return c.json(
        { error: 'Invalid input', details: result.error.flatten() },
        400
      )
    }
    const { userId, productId } = result.data
    const existingLike = await likesService.check(userId, productId)
    if (existingLike) {
      // Unlike the product
      await likesService.remove(userId, productId)
      return c.json(
        { message: 'Product unliked successfully', liked: false },
        200
      )
    }
    await likesService.add(userId, productId)
    return c.json({ message: 'Product liked successfully', liked: true }, 201)
  })
