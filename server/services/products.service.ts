import { and, arrayContains, desc, eq, ilike, ne, or, sql } from 'drizzle-orm'
import { db } from '../db'
import { productsTable } from '../db/schema'

type GetAllOptions = {
  userId?: string | null
  filter?: string | null
  query?: string | null
}

export class ProductsService {
  async getAll({ userId, filter, query }: GetAllOptions) {
    const conditions = []
    if (query) {
      conditions.push(
        or(
          ilike(productsTable.title, `%${query}%`),
          arrayContains(productsTable.tags, [query])
        )
      )
    }

    if (userId) {
      conditions.push(eq(productsTable.userId, userId))
    }

    const orderByCondition =
      filter === 'viewest'
        ? desc(productsTable.view)
        : desc(productsTable.createdAt)

    return await db.query.productsTable.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: orderByCondition,
      with: {
        user: {
          columns: { id: true, name: true, image: true, username: true },
        },
      },
    })
  }

  async getById(id: string) {
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

  async create(values: any) {
    return await db
      .insert(productsTable)
      .values(values)
      .returning({ id: productsTable.id })
  }

  async update(id: string, values: any) {
    return await db
      .update(productsTable)
      .set(values)
      .where(eq(productsTable.id, id))
  }

  async delete(id: string) {
    return await db.delete(productsTable).where(eq(productsTable.id, id))
  }

  async incrementView(id: string) {
    return await db
      .update(productsTable)
      .set({ view: sql`${productsTable.view} + 1` })
      .where(eq(productsTable.id, id))
  }

  async getMoreById(id: string, userId: string) {
    return await db
      .select()
      .from(productsTable)
      .where(and(ne(productsTable.id, id), eq(productsTable.userId, userId)))
      .orderBy(desc(productsTable.createdAt))
      .limit(4)
  }

  async search(query: string) {
    return await db.query.productsTable.findMany({
      where: or(
        ilike(productsTable.title, `%${query}%`),
        arrayContains(productsTable.tags, [query])
      ),
      with: {
        user: {
          columns: { id: true, name: true, image: true, username: true },
        },
      },
    })
  }

  async getAllByCategory(slug: string) {
    return await db.query.productsTable.findMany({
      where: eq(productsTable.categoryId, slug),
      orderBy: desc(productsTable.createdAt),
      with: {
        user: {
          columns: { id: true, name: true, image: true, username: true },
        },
      },
    })
  }
}
