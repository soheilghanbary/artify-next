import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../db'
import { likesTable } from '../db/schema'

export const likesRoutes = new Hono().post('/toggle', async (c) => {
  const { userId, productId } = await c.req.json()

  if (!userId || !productId) {
    return c.json({ error: 'userId and productId are required' }, 400)
  }

  try {
    // Check if the user has already liked the product
    const existingLike = await db
      .select()
      .from(likesTable)
      .where(
        and(eq(likesTable.userId, userId), eq(likesTable.productId, productId))
      )

    if (existingLike.length > 0) {
      // If the like exists, remove it (unlike)
      await db
        .delete(likesTable)
        .where(
          and(
            eq(likesTable.userId, userId),
            eq(likesTable.productId, productId)
          )
        )

      return c.json(
        { message: 'Product unliked successfully', liked: false },
        200
      )
    }
    // If the like doesn't exist, add it (like)
    await db.insert(likesTable).values({
      userId: userId,
      productId: productId,
    })
    return c.json({ message: 'Product liked successfully', liked: true }, 201)
  } catch (error) {
    console.error('Error toggling like:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
