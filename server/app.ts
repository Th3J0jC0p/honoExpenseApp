import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expoensesRoute';

const app = new Hono();

// Middleware to log requests
app.use('*', logger());

app.get('/', (c) => c.text('Hello Hono!'));

app.get('/json', (c) => {
    const data = { message: 'Hello Hono!' };
    return c.json(data);
});

app.route('/api/expenses', expensesRoute);

export default app;