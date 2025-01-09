'use server'
import { db } from '@/server/db'
import { productsTable } from '@/server/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function getAllProducts(userId?: string) {
  if (userId) {
    return await db.query.productsTable.findMany({
      where: eq(productsTable.userId, userId),
      orderBy: desc(productsTable.createdAt),
      with: {
        user: {
          columns: { id: true, name: true, image: true, username: true },
        },
      },
    })
  }

  return await db.query.productsTable.findMany({
    orderBy: desc(productsTable.createdAt),
    with: {
      user: {
        columns: { id: true, name: true, image: true, username: true },
      },
    },
  })
}

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
