import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { subAccount } from "./agency";

export const funnels = pgTable("funnels", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  published: boolean("published").default(false),
  subDomainName: text("subDomainName").unique(),
  favicon: text("favicon"),
  subAccountId: uuid("subAccountId").references(() => subAccount.id),
  liveProducts: text("liveProducts"),
});

export const ClassName = pgTable("ClassName", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  color: text("color"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
  funnelId: uuid("funnelId").references(() => funnels.id),
  customerData: text("customerData"),
});

export const funnelPage = pgTable("funnelPage", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  pathname: text("pathname").notNull().default(""),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
  visits: integer("visits").default(0),
  content: text("content"),
  order: integer("order").default(0),
  previewImage: text("previewImage"),
  funnelId: uuid("funnelId").references(() => funnels.id),
});
