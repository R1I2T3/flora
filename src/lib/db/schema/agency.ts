import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { permissions, user } from "./auth";
import { notifications } from "./notification&ticket";
import { add_ons, invitation, subscription } from "./agency_extras";
import {
  Automation,
  contacts,
  media,
  tags,
  Trigger,
} from "./sub_account_extras";
import { pipeline } from "./pipeline";
import { icons } from "./enum";
export const agency = pgTable("agency", {
  id: uuid("id").primaryKey().defaultRandom(),
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

export const subAccount = pgTable("subAccount", {
  id: uuid("id").primaryKey().defaultRandom(),
  connectAccountId: text("connectAccountId").notNull().default(""),
  name: text("name"),
  subAccountLogo: text("subAccountLogo"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  companyEmail: text("companyEmail"),
  companyPhone: text("companyPhone"),
  userId: text("userId"),
  goal: integer("goal").default(5),
  address: text("address"),
  city: text("city"),
  zipCode: text("zipCode"),
  state: text("state"),
  country: text("country"),
  agencyId: uuid("agencyId").references(() => agency.id),
});

export const agencySideBarOption = pgTable("agencySideBarOption", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  icon: icons("icon").default("info"),
  link: text("link").default("#"),
  agencyId: uuid("agencyId"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const subAccountSideBarOption = pgTable("subAccountSideBarOption", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  icon: icons("icon").default("info"),
  link: text("link").default("#"),
  subAccountId: uuid("subAccountId").references(() => subAccount.id),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const agencySideBarOptionRelation = relations(
  agencySideBarOption,
  ({ one }) => ({
    agency: one(agency, {
      fields: [agencySideBarOption.agencyId],
      references: [agency.id],
    }),
  })
);

export const agencyRelation = relations(agency, ({ many, one }) => ({
  users: many(user),
  sidebarOptions: many(agencySideBarOption),
  subAccounts: many(subAccount),
  notification: many(notifications),
  invitations: many(invitation),
  subscription: one(subscription),
  addOns: many(add_ons),
}));

export const subAccountRelation = relations(subAccount, ({ many, one }) => ({
  user: one(user, {
    fields: [subAccount.userId],
    references: [user.id],
  }),
  agency: one(agency, {
    fields: [subAccount.agencyId],
    references: [agency.id],
  }),
  permissions: many(permissions),
  notifications: many(notifications),
  medias: many(media),
  contacts: many(contacts),
  triggers: many(Trigger),
  automatons: many(Automation),
  pipelines: many(pipeline),
  tags: many(tags),
}));
