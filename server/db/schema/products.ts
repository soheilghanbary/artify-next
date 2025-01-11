import { relations, sql } from 'drizzle-orm'
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { categoriesTable } from './categories'
import { commentsTable } from './comments'
import { likesTable } from './likes'
import { usersTable } from './users'

export const productsTable = pgTable(
  'products',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    image: text('image').notNull(),
    tags: text('tags').array().default([]).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    view: integer('view').default(0).notNull(),
    userId: varchar('userId')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    categoryId: varchar('categoryId').references(() => categoriesTable.id),
  },
  (table) => {
    return {
      titleIndex: index('idx_products_title').on(table.title),
      descriptionIndex: index('idx_products_description').on(table.description),
      fullTextIndex: index('idx_products_fulltext').using(
        'gin',
        sql`to_tsvector('english', ${table.title} || ' ' || ${table.description})`
      ),
    }
  }
)

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [productsTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),
  likes: many(likesTable),
  comments: many(commentsTable),
}))
