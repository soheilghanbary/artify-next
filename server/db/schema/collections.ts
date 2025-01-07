import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';
import { productsTable } from './products';
import { usersTable } from './users';

export const collectionsTable = pgTable('collections', {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  userId: varchar('userId').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const collectionsRelations = relations(collectionsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [collectionsTable.userId],
    references: [usersTable.id],
  }),
  products: many(productsTable),
}));

