import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, timestamp, varchar } from 'drizzle-orm/pg-core'
import { productsTable } from './products'
import { usersTable } from './users'

export const likesTable = pgTable(
  'likes',
  {
    userId: varchar('userId')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    productId: varchar('productId')
      .notNull()
      .references(() => productsTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.productId] }),
    }
  }
)

export const likesRelations = relations(likesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [likesTable.userId],
    references: [usersTable.id],
  }),
  product: one(productsTable, {
    fields: [likesTable.productId],
    references: [productsTable.id],
  }),
}))
