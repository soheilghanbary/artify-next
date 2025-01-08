import { and, desc, eq } from 'drizzle-orm'
import { db } from '../db'
import { likesTable, productsTable } from '../db/schema'

export class LikesService {
  getByUserId = async (userId: string) => {
    return await db
      .select({
        id: productsTable.id,
        title: productsTable.title,
        image: productsTable.image,
        description: productsTable.description,
      })
      .from(likesTable)
      .innerJoin(productsTable, eq(likesTable.productId, productsTable.id))
      .orderBy(desc(likesTable.createdAt))
      .where(eq(likesTable.userId, userId))
  }

  async add(userId: string, productId: string) {
    await db.insert(likesTable).values({ userId, productId })
  }

  async remove(userId: string, productId: string) {
    await db
      .delete(likesTable)
      .where(
        and(eq(likesTable.userId, userId), eq(likesTable.productId, productId))
      )
  }

  async check(userId: string, productId: string) {
    const [existingLike] = await db
      .select()
      .from(likesTable)
      .where(
        and(eq(likesTable.userId, userId), eq(likesTable.productId, productId))
      )
      .limit(1)

    return existingLike
  }
}
