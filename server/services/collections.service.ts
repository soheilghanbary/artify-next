import { eq } from "drizzle-orm"
import { db } from "../db"
import { collectionsTable } from "../db/schema"

export class CollectionsService {
  async getAll(userId: string) {
    return await db.query.collectionsTable.findMany({
      where: eq(collectionsTable.userId, userId),
      with: {
        products: {
          columns: { id: true }
        }
      }
    })
  }
  async getById(id: string) {
    return await db.query.collectionsTable.findFirst({
      where: eq(collectionsTable.id, id),
    })
  }
  async create(values: any) {
    return await db.insert(collectionsTable).values(values)
  }
  async update(values: any) {
    return await db.update(collectionsTable).set(values).where(eq(collectionsTable.id, values.id))
  }
  async delete(id: string) {
    return await db.delete(collectionsTable).where(eq(collectionsTable.id, id))
  }
}