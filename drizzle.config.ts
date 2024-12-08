import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env";
export default defineConfig({
  out: "./drizzle",
  schema: [],
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
});
