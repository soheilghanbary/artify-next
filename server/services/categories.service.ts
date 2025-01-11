import { eq } from 'drizzle-orm'
import { db } from '../db'
import { categoriesTable } from '../db/schema'

export class CategoriesService {
  async getAll() {
    return await db.query.categoriesTable.findMany()
  }

  async getBySlug(slug: string) {
    return await db.query.categoriesTable.findFirst({
      where: eq(categoriesTable.slug, slug),
    })
  }
}
