import { Hono } from "hono";
import { subscriber } from "./routes/subscribers";
import { newsletter } from "./routes/newsletter";

import * as os from "os";

// load env and deps for node environment
import { serve } from "@hono/node-server";
import * as dotenv from "dotenv";
dotenv.config();

const app = new Hono();
const PORT = 8080;

// connect routes
app.route("/subscriber", subscriber);
app.route("/newsletter", newsletter);

app.get("/", (c) => {
  return c.text(`Hello from ${os.hostname()}`);
});

// to run with node
if (!process.versions.bun) {
  // check if not running on bun
  console.log(`Server running on ${PORT}`);
  serve({
    fetch: app.fetch,
    port: PORT,
  });
}

export default {
  fetch: app.fetch,
  port: PORT,
};
