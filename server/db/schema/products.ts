import { relations, sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';
import { collectionsTable } from './collections';
import { usersTable } from './users';

export const productsTable = pgTable('products', {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
  view: integer('view').default(0).notNull(),
  collectionId: varchar('collection_id').references(() => collectionsTable.id),
  userId: varchar('userId').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  collection: one(collectionsTable, {
    fields: [productsTable.collectionId],
    references: [collectionsTable.id],
  }),
  user: one(usersTable, {
    fields: [productsTable.userId],
    references: [usersTable.id],
  }),
}));
