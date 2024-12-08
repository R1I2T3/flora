import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { agency, subAccount } from "./agency";
import { relations } from "drizzle-orm";
import { notifications, ticket } from "./notification&ticket";
import { roles } from "./enum";
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  role: roles("role").default("SUBACCOUNT_USER"),
  agencyId: uuid("agencyId"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});
export const permissions = pgTable("permissions", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  access: boolean("access").notNull(),
  subAccountId: varchar("subAccountId").notNull(),
});
export const usersRelations = relations(user, ({ one, many }) => ({
  agency: one(agency, {
    fields: [user.agencyId],
    references: [agency.id],
  }),
  permissions: many(permissions),
  notifications: many(notifications),
  ticket: many(ticket),
}));

export const permissionsRelations = relations(permissions, ({ one }) => ({
  user: one(user, { fields: [permissions.email], references: [user.email] }),
  subaccount: one(subAccount, {
    fields: [permissions.subAccountId],
    references: [subAccount.id],
  }),
}));
