import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import app from "./src/api/index";

const server = new Hono();

server.use(cors({ origin: (origin) => origin ?? "*", credentials: true }));

// Mount API
server.route("/", app);

// Serve static files from dist/
server.use("/*", serveStatic({ root: "./dist" }));

// SPA fallback
server.get("/*", serveStatic({ path: "./dist/index.html" }));

const port = Number(process.env.PORT) || 3000;
console.log(`Server running on port ${port}`);

export default {
  port,
  fetch: server.fetch,
};
