import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { roles } from "./auth";
import { relations } from "drizzle-orm";
import { agency } from "./agency";
import { invitation_status, plans } from "./auth";

export const invitation = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  agencyId: uuid("agencyId").notNull(),
  status: invitation_status("status").default("PENDING"),
  role: roles("role").default("SUBACCOUNT_GUEST"),
});

export const subscription = pgTable("subscription", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  plan: plans("plan").notNull(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  price: text("price"),
  active: boolean("active").default(false),
  priceId: text("priceId").notNull(),
  customerId: text("customerId").notNull(),
  currentPeriodEndDate: timestamp("currentPeriodEndDate").notNull(),
  subscriptionsId: text("subscriptionsId").notNull().unique(),
  agencyId: uuid("agencyId").notNull(),
});

export const add_ons = pgTable("add_ons", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  name: text("name").notNull(),
  active: boolean("active").default(false),
  priceId: text("priceId").notNull(),
  agencyId: uuid("agencyId").notNull(),
});
export const invitationRelation = relations(invitation, ({ one }) => ({
  agency: one(agency, {
    fields: [invitation.agencyId],
    references: [agency.id],
  }),
}));

export const subscriptionRelation = relations(subscription, ({ one }) => ({
  agency: one(agency, {
    fields: [subscription.agencyId],
    references: [agency.id],
  }),
}));

export const addOnsRelation = relations(add_ons, ({ one }) => ({
  agency: one(agency, {
    fields: [add_ons.agencyId],
    references: [agency.id],
  }),
}));
