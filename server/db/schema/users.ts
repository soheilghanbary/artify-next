import { relations, sql } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'
import { likesTable } from './likes'
import { productsTable } from './products'

export const usersTable = pgTable(
  'users',
  {
    id: varchar('id', { length: 36 })
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    name: text('name').default(''),
    email: text('email').notNull().unique(),
    image: text('image').default('/images/placeholder.png'),
    cover: text('cover').default('/images/cover.png'),
    username: text('username').default(''),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    title: text('title').default('a artify person'),
    bio: text('bio').default('Hello, I am also a member of the Artify family.'),
    portfolio: text('portfolio').default(''),
    instagram: text('instagram').default(''),
    twitter: text('twitter').default(''),
    github: text('github').default(''),
    linkedin: text('linkedin').default(''),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
  },
  (users) => {
    return {
      emailIdx: uniqueIndex('email_idx').on(users.email),
    }
  }
)

export const usersRelations = relations(usersTable, ({ many }) => ({
  products: many(productsTable),
  likes: many(likesTable),
}))
