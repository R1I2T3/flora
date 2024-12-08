import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env";
export default defineConfig({
  out: "./drizzle",
  schema: ["./src/lib/db/schema/enum.ts", "./src/lib/db/schema/*.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
});
