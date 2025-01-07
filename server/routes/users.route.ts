import { Hono } from "hono";
import { UsersService } from "../services/users.service";

const usersService = new UsersService();

export const usersRoutes = new Hono().get('/:id', async (c) => {
  const id = c.req.param('id')
  const user = await usersService.getById(id)
  return c.json(user)
})
  .put('/:id', async c => {
    const id = c.req.param('id')
    const values = await c.req.json()
    const updated = await usersService.update(id, values)
    return c.json({ message: 'User updated successfully' })
  })