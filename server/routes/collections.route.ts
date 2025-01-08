import { Hono } from "hono";
import { CollectionsService } from "../services/collections.service";

const collectionsService = new CollectionsService()

export const collectionsRoutes = new Hono()
  .get('/', async (c) => {
    const userId = c.req.query('userId')!
    const collections = await collectionsService.getAll(userId)
    return c.json(collections)
  })
  .get('/:id', async (c) => {
    const { id } = c.req.param()
    const collection = await collectionsService.getById(id)
    return c.json(collection)
  })
  .post('/', async (c) => {
    const values = await c.req.json()
    await collectionsService.create(values)
    return c.json({ message: 'Collection created successfully' })
  })
  .put('/:id', async (c) => {
    const id = c.req.param('id')
    const values = await c.req.json()
    const collection = await collectionsService.update(id, values)
    return c.json({ message: 'Collection updated! successfully' })
  })
  .delete('/:id', async (c) => {
    const id = c.req.param('id')
    await collectionsService.delete(id)
    return c.json({ message: 'Collection deleted successfully' })
  })