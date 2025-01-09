import { desc, eq } from 'drizzle-orm'
import { db } from '../db'
import { commentsTable } from '../db/schema'

export class CommentsService {
  async create(userId: string, productId: string, text: string) {
    const [newComment] = await db
      .insert(commentsTable)
      .values({ userId, productId, text })
      .returning()

    return { message: 'Comment created successfully!' }
  }

  async getByProductId(productId: string) {
    return await db.query.commentsTable.findMany({
      where: eq(commentsTable.productId, productId),
      orderBy: desc(commentsTable.createdAt),
      with: {
        user: {
          columns: { name: true, image: true, username: true },
        },
      },
    })
  }

  async getById(commentId: string) {
    const [comment] = await db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.id, commentId))
    return comment
  }

  async update(commentId: string, text: string) {
    const [updatedComment] = await db
      .update(commentsTable)
      .set({ text })
      .where(eq(commentsTable.id, commentId))
      .returning()

    return { message: 'Comment Updated successfully!' }
  }

  // Delete a comment
  async delete(commentId: string) {
    const [deletedComment] = await db
      .delete(commentsTable)
      .where(eq(commentsTable.id, commentId))
      .returning()

    return { message: 'Comment deleted successfully!' }
  }
}
