import { pgTable, text, uuid, timestamp, integer } from "drizzle-orm/pg-core";
import { subAccount } from "./agency";
import { relations } from "drizzle-orm";
import { ticket } from "./notification&ticket";
import { Automation } from "./sub_account_extras";
import { action_enum } from "./auth";
export const pipeline = pgTable("pipeline", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  subAccountId: uuid("subAccountId"),
});

export const Lane = pgTable("lane", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  pipelineId: uuid("pipelineId"),
});
export const action = pgTable("action", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: action_enum("type").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
  automationId: uuid("automationId"),
  laneId: uuid("laneId"),
  order: integer("order").default(0),
});
export const pipelineRelations = relations(pipeline, ({ one, many }) => ({
  subAccount: one(subAccount, {
    fields: [pipeline.subAccountId],
    references: [subAccount.id],
  }),
  lanes: many(Lane),
}));

export const laneRelations = relations(Lane, ({ one, many }) => ({
  pipeline: one(pipeline, {
    fields: [Lane.pipelineId],
    references: [pipeline.id],
  }),
  tickets: many(ticket),
}));
export const actionRelation = relations(action, ({ one }) => ({
  automation: one(Automation, {
    fields: [action.automationId],
    references: [Automation.id],
  }),
  lane: one(Lane, {
    fields: [action.laneId],
    references: [Lane.id],
  }),
}));
