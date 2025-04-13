import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expoensesRoute';
import { serveStatic } from 'hono/bun';

const app = new Hono();

// Middleware to log requests
app.use('*', logger());

app.route('/api/expenses', expensesRoute);

// Serve static files from the 'public' directory
app.get('*', serveStatic({ root: './expenseFrontend/dist' }));
app.get('*', serveStatic({ root: './expenseFrontend/dist/index.html' }));

export default app;