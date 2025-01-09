import { relations, sql } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { productsTable } from './products'
import { usersTable } from './users'

export const commentsTable = pgTable('comments', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: varchar('userId', { length: 36 }).notNull(),
  productId: varchar('productId', { length: 36 }).notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [commentsTable.userId],
    references: [usersTable.id],
  }),
  product: one(productsTable, {
    fields: [commentsTable.productId],
    references: [productsTable.id],
  }),
}))
