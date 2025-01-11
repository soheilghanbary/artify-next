import { Hono } from 'hono'
import { ProductsService } from '../services/products.service'

const productsService = new ProductsService()

export const productsRoutes = new Hono()
  .get('/', async (c) => {
    const userId = c.req.query('userId')
    const products = await productsService.getAll(userId)
    return c.json(products)
  })
  .get('/search', async (c) => {
    const query = c.req.query('q')!
    const products = await productsService.search(query)
    return c.json(products)
  })
  .get('/:id', async (c) => {
    const { id } = c.req.param()
    const product = await productsService.getById(id)
    return c.json(product)
  })
  .post('/', async (c) => {
    const values = await c.req.json()
    const [product] = await productsService.create(values)
    return c.json({ message: 'Product created successfully', data: product })
  })
  .put('/:id', async (c) => {
    const id = c.req.param('id')
    const values = await c.req.json()
    const product = await productsService.update(id, values)
    return c.json({ message: 'Product updated successfully' })
  })
  .delete('/:id', async (c) => {
    const id = c.req.param('id')
    await productsService.delete(id)
    return c.json({ message: 'Product deleted successfully' })
  })
  .get('/:id/increment-view', async (c) => {
    const id = c.req.param('id')
    await productsService.incrementView(id)
    return c.json({ message: 'Product view incremented successfully' })
  })
  .get('/:id/more', async (c) => {
    const id = c.req.param('id')
    const userId = c.req.query('userId')!
    const product = await productsService.getMoreById(id, userId)
    return c.json(product)
  })
  .get('/category/:slug', async (c) => {
    const { slug } = c.req.param()
    const products = await productsService.getAllByCategory(slug)
    return c.json(products)
  })
