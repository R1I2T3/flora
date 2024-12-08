import { pgEnum } from "drizzle-orm/pg-core";

export const invitation_status = pgEnum("invitation_status_enum", [
  "PENDING",
  "ACCEPTED",
  "REVOKED",
]);
export const action_enum = pgEnum("action_enum", ["CREATE_CONTACT"]);
export const plans = pgEnum("plans_enum", [
  "price_1OYxkqFj9oKEERu1NbKUxXxN",
  "price_1OYxkqFj9oKEERu1KfJGWxgN",
]);
export const icons = pgEnum("sidebar_icon_enum", [
  "settings",
  "chart",
  "calendar",
  "check",
  "chip",
  "compass",
  "database",
  "flag",
  "home",
  "info",
  "link",
  "lock",
  "messages",
  "notification",
  "payment",
  "power",
  "receipt",
  "shield",
  "star",
  "tune",
  "videorecorder",
  "wallet",
  "warning",
  "headphone",
  "send",
  "pipelines",
  "person",
  "category",
  "contact",
  "clipboardIcon",
]);
export const roles = pgEnum("roles_enum", [
  "AGENCY_OWNER",
  "AGENCY_ADMIN",
  "SUBACCOUNT_USER",
  "SUBACCOUNT_GUEST",
]);
