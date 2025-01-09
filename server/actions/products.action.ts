'use server'
import { db } from '@/server/db'
import { productsTable } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export async function getProductById(id: string) {
  return await db.query.productsTable.findFirst({
    where: eq(productsTable.id, id),
    with: {
      category: { columns: { id: true, name: true } },
      likes: { columns: { userId: true } },
      user: {
        columns: {
          id: true,
          name: true,
          image: true,
          username: true,
          title: true,
        },
      },
    },
  })
}
