import { drizzle } from "drizzle-orm/node-postgres";
import { serverENV } from "../env/server";
export const db = drizzle(serverENV.DB_URL);
