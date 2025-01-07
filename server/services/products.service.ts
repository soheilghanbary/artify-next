import { and, desc, eq, ilike, ne, or, sql } from "drizzle-orm"
import { db } from "../db"
import { productsTable } from "../db/schema"

export class ProductsService {
  async getAll() {
    return await db.query.productsTable.findMany({
      orderBy: desc(productsTable.createdAt),
      with: {
        user: {
          columns: { id: true, name: true, image: true, username: true }
        }
      }
    })
  }

  async getById(id: string) {
    return await db.query.productsTable.findFirst({
      where: eq(productsTable.id, id),
      with: {
        user: {
          columns: { id: true, name: true, image: true, username: true }
        }
      }
    })
  }

  async create(values: any) {
    return await db.insert(productsTable).values(values)
  }

  async update(values: any) {
    return await db.update(productsTable).set(values).where(eq(productsTable.id, values.id))
  }

  async delete(id: string) {
    return await db.delete(productsTable).where(eq(productsTable.id, id))
  }

  async incrementView(id: string) {
    return await db.update(productsTable).set({ view: sql`${productsTable.view} + 1` }).where(eq(productsTable.id, id))
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
      where: or(ilike(productsTable.title, `%${query}%`), ilike(productsTable.description, `%${query}%`)),
      with: {
        user: {
          columns: { id: true, name: true, image: true, username: true }
        }
      }
    })
  }
}