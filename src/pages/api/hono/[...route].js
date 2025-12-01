
import { Hono } from 'hono';

// Initialize Hono with the correct base path relative to where this file lives in 'src/pages'
const app = new Hono().basePath('/api/hono');

app.get('/data', async (c) => {
  // Simulate database processing latency
  await new Promise(resolve => setTimeout(resolve, 800));

  return c.json({
    message: "Data fetched from Hono Router (Vercel Edge/Serverless)",
    timestamp: new Date().toISOString(),
    framework: "Hono",
    status: 200
  });
});

// Catch-all route to handle 404s within the Hono app context gracefully
app.all('*', (c) => {
    return c.json({ error: "Route not found in Hono app", path: c.req.path }, 404);
});

export const ALL = ({ request }) => app.fetch(request);
