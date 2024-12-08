import { pgTable, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";
import { subAccount } from "./agency";
import { relations } from "drizzle-orm";
import { ticket } from "./notification&ticket";
import { action } from "./pipeline";

export const media = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type"),
  name: text("name"),
  link: text("link").unique(),
  subAccountId: uuid("subAccountId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const Trigger = pgTable("triggers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  subAccountId: uuid("subAccountId"),
});

export const Automation = pgTable("automatons", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  subAccountId: uuid("subAccountId"),
  triggerId: uuid("triggerId"),
  published: boolean("published").default(false),
});

export const automationInstance = pgTable("automation_instance", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  automationId: uuid("automationId"),
  active: boolean("active").default(false),
});
export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  subAccountId: uuid("subAccountId"),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  subAccountId: uuid("subAccountId"),
});
export const mediaRelation = relations(media, ({ one }) => ({
  subAccount: one(subAccount, {
    fields: [media.subAccountId],
    references: [subAccount.id],
  }),
}));
export const triggerRelations = relations(Trigger, ({ one, many }) => ({
  subAccount: one(subAccount, {
    fields: [Trigger.subAccountId],
    references: [subAccount.id],
  }),
  automatons: many(Automation),
}));

export const autoMationRelations = relations(Automation, ({ one, many }) => ({
  subAccount: one(subAccount, {
    fields: [Automation.subAccountId],
    references: [subAccount.id],
  }),
  trigger: one(Trigger, {
    fields: [Automation.triggerId],
    references: [Trigger.id],
  }),
  instances: many(automationInstance),
  actions: many(action),
}));
export const automationInstanceRelation = relations(
  automationInstance,
  ({ one }) => ({
    automation: one(Automation, {
      fields: [automationInstance.automationId],
      references: [Automation.id],
    }),
  })
);
export const tagsRelation = relations(tags, ({ one }) => ({
  subAccount: one(subAccount, {
    fields: [tags.subAccountId],
    references: [subAccount.id],
  }),
}));
export const contactsRelation = relations(contacts, ({ one, many }) => ({
  subAccount: one(subAccount, {
    fields: [contacts.subAccountId],
    references: [subAccount.id],
  }),
  ticket: many(ticket),
}));
