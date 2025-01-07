import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { collectionsRoutes } from './routes/collections.route'
import { productsRoutes } from './routes/products.route'
import { usersRoutes } from './routes/users.route'

// initialize hono app
export const app = new Hono()
export type ApiRoutes = typeof apiRoutes

// middlewares
app.use('*', logger())
app.use(
  '*',
  cors({
    credentials: true,
    origin: (origin) => origin,
    allowHeaders: ['Content-Type'],
  })
)

// routes
const apiRoutes = app.basePath('/api')
  .route('/collections', collectionsRoutes)
  .route('/products', productsRoutes)
  .route('/users', usersRoutes)