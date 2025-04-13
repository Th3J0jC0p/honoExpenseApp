import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expoensesRoute';
import { serveStatic } from 'hono/bun';
import { authRoute } from './routes/auth';

const app = new Hono();

// Middleware to log requests
app.use('*', logger());

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute).route("/", authRoute);

// Serve static files from the 'public' directory
app.get('*', serveStatic({ root: './expenseFrontend/dist' }));
app.get('*', serveStatic({ root: './expenseFrontend/dist/index.html' }));

export default app;
export type ApiRoutes = typeof apiRoutes