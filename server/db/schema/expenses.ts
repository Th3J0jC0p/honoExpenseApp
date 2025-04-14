import { index, serial, pgTable, text, numeric, timestamp } from "drizzle-orm/pg-core";

export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey().notNull(),
    userId: text('user_id').notNull(),
    name: text('name').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (expenses) => {
    return {
        userIdIndex: index('user_idx').on(expenses.userId),
    }
})