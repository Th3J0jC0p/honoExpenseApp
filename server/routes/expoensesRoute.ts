import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

// Define the schema for the expenses in database
const expensesSchema = z.object({
    id: z.string().regex(/^[0-9]+$/, 'ID must be a number'),
    name: z.string().min(1, 'Name is required'),
    amount: z.number().positive('Amount must be a positive number'),
    date: z.string().optional(),
});

// Define the schema for the expense object
type Expense = z.infer<typeof expensesSchema>;

// Define the schema for the request body when creating a new expense
const postExpenseSchema = expensesSchema.omit({ id: true })

// Set fake database for demonstration purposes
const fakeDataBase: Expense[] = [
    {
        id: '1',
        name: 'Groceries',
        amount: 50.25,
        date: '2023-01-15',
    },
    {
        id: '2',
        name: 'Electricity Bill',
        amount: 75.00,
        date: '2023-01-10',
    },
    {
        id: '3',
        name: 'Internet Subscription',
        amount: 40.00,
        date: '2023-01-05',
    },
    {
        id: '4',
        name: 'Gas',
        amount: 30.50,
        date: '2023-01-12',
    },
    {
        id: '5',
        name: 'Dining Out',
        amount: 60.00,
        date: '2023-01-20',
    }
]

// Define the expenses route
// This route handles GET, POST, GET by ID, and DELETE requests for expenses
export const expensesRoute = new Hono()

.get('/', (c) => {
    return c.json({ expenses: fakeDataBase });
})

.get('/total', async (c) => {
    const total = await fakeDataBase.reduce((acc, expense) => acc + expense.amount, 0);
    return c.json({ total });
})

.post('/', zValidator("json", postExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeDataBase.push({
        ...expense,
        id: (fakeDataBase.length + 1).toString(),
        date: new Date().toISOString(),
    });
    c.status(201);
    return c.json(expense);
})

.get('/:id{[0-9]+}', (c) => {
    const id = c.req.param('id');
    const expense = fakeDataBase.find((exp) => exp.id === id);
    if (!expense) {
        return c.notFound();
    }
    return c.json({expense});
})

.delete('/:id{[0-9]+}', (c) => {
    const id = c.req.param('id');
    const index = fakeDataBase.findIndex((exp) => exp.id === id);
    if (index === -1) {
        return c.notFound();
    }
    fakeDataBase.splice(index, 1);
    return c.json(fakeDataBase);
})