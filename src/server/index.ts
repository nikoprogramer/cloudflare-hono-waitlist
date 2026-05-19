import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";
import { insertSubscriber } from "./db/queries";
import { D1Database } from "@cloudflare/workers-types";
type Env = {
  DB: D1Database;
  ENVIRONMENT: string;
  POLICY_AUD: string;
  CF_ACCESS_DOMAIN: string;
};
const app = new Hono<{ Bindings: Env }>();

app.use(accessAuth).get("/api/health", (c) => c.json("Healthy!"));

app.use("/api/subscribers", accessAuth).post("/api/subscribers", async (c) => {
  const newSub = await c.req.json();
  const subscriber = await insertSubscriber(c.env.DB, newSub);
  return c.json(subscriber);
});

export default app;
