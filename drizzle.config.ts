import { defineConfig } from "drizzle-kit";
import { serverENV } from "@/lib/env/server";
export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: serverENV.DB_URL,
  },
});
