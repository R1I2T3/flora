import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const agency = pgTable("agency", {
  id: uuid("id").primaryKey(),
  connectAccountId: text("connectAccountId").notNull().default(""),
  customerId: text("customerId").notNull().default(""),
  name: text("name"),
  agencyLogo: text("agencyLogo"),
  companyEmail: text("companyEmail"),
  companyPhone: text("companyPhone"),
  whiteLabel: boolean("whiteLabel").default(true),
  address: text("address"),
  city: text("city"),
  zipCode: text("zipCode"),
  state: text("state"),
  country: text("country"),
  goal: integer("goal").default(5),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const agencyRelation = relations(agency, ({ many }) => ({
  users: many(user),
}));
