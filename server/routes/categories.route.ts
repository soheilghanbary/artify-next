import { Hono } from "hono";
import { CategoriesService } from "../services/categories.service";

const categoriesService = new CategoriesService()

export const categoriesRoutes = new Hono()
  .get('/', async (c) => {
    const categories = await categoriesService.getAll()
    return c.json(categories)
  })