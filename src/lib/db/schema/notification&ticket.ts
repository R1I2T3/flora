import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  timestamp,
  integer,
  real,
} from "drizzle-orm/pg-core";
import { subAccount } from "./agency";
import { agency } from "./agency";
import { user } from "./auth";
import { contacts } from "./sub_account_extras";
import { Lane } from "./pipeline";
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  notification: text("notification").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
  subAccountId: uuid("subAccountId").notNull(),
  agencyId: uuid("agencyId").notNull(),
  userId: text("id").notNull(),
});

export const ticket = pgTable("ticket", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
  laneId: text("laneId").notNull(),
  order: integer("order").default(0),
  value: real("value").default(0),
  description: text("description"),
  assignUserId: text("assignUserId"),
  customerId: uuid("customerId"),
});
export const notificationRelation = relations(notifications, ({ one }) => ({
  subAccount: one(subAccount, {
    fields: [notifications.subAccountId],
    references: [subAccount.id],
  }),
  agency: one(agency, {
    fields: [notifications.agencyId],
    references: [agency.id],
  }),
  user: one(user, { fields: [notifications.userId], references: [user.id] }),
}));

export const ticketRelation = relations(ticket, ({ one }) => ({
  assignUser: one(user, {
    fields: [ticket.assignUserId],
    references: [user.id],
  }),
  customer: one(contacts, {
    fields: [ticket.customerId],
    references: [contacts.id],
  }),
  lane: one(Lane, {
    fields: [ticket.laneId],
    references: [Lane.id],
  }),
}));
