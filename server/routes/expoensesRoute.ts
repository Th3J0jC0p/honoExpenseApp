import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { getUser } from '../kinde';

import { db } from '../db'; // Import your database connection
import { expenses as expensesTable } from '../db/schema/expenses'; // Import your expenses schema
import { eq, desc, sum, and } from 'drizzle-orm'; // Import the eq function for equality checks

// Define the schema for the expenses in database
const expensesSchema = z.object({
    id: z.string().regex(/^[0-9]+$/, 'ID must be a number'),
    name: z.string().min(1, 'Name is required'),
    amount: z.string(),
    date: z.string().optional(),
});

// Define the schema for the expense object
type Expense = z.infer<typeof expensesSchema>;

// Define the schema for the request body when creating a new expense
const postExpenseSchema = expensesSchema.omit({ id: true })

// Define the expenses route
// This route handles GET, POST, GET by ID, and DELETE requests for expenses
export const expensesRoute = new Hono()

.get('/', getUser, async (c) => { // this api will only work with authenticated user
    const user = c.var.user; // Thats hot to access user using getUser middleware

    const expenses = await db
        .select()
        .from(expensesTable)
        .where(eq(expensesTable.userId, user.id))
        .orderBy(desc(expensesTable.createdAt))
        .limit(100); // Fetch expenses for the authenticated user

    return c.json({ expenses: expenses });
})

.post('/', getUser, zValidator("json", postExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user; // Access the authenticated user

    const result = await db.insert(expensesTable).values({
        ...expense,
        userId: user.id, // Add the user ID to the expense
    }).returning();

    c.status(201);
    return c.json(result);
})

.get('/total', getUser, async (c) => {
    const user = c.var.user; // Access the authenticated user
    const result = await db
        .select({ total: sum(expensesTable.amount) })
        .from(expensesTable)
        .where(eq(expensesTable.userId, user.id))
        .then(res => res[0]!)
    return c.json(result);
})

.get('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const user = c.var.user; // Access the authenticated user

    const item = await db
        .select()
        .from(expensesTable)
        .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
        .then(res => res[0]!)

    if (!item) {
        return c.notFound();
    }
    return c.json({ item });
})

.delete('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const user = c.var.user; // Access the authenticated user

    const item = await db
        .delete(expensesTable)
        .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
        .returning()
        .then(res => res[0]!)

    if (!item) {
        return c.notFound();
    }
    return c.json({ expense: item });
})