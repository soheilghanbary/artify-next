import { relations, sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';
import { categoriesTable } from './categories';
import { usersTable } from './users';

export const productsTable = pgTable('products', {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  tags: text('tags').array().default([]).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  view: integer('view').default(0).notNull(),
  userId: varchar('userId').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  categoryId: varchar('categoryId').references(() => categoriesTable.id),
});

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [productsTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),
}));
