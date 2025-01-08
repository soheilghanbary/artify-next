import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';
import { productsTable } from './products';

export const categoriesTable = pgTable('categories', {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description').default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
});

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable)
}));
