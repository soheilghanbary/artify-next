import { db } from "../db";

export class CategoriesService {
  async getAll() {
    return await db.query.categoriesTable.findMany();
  }
}