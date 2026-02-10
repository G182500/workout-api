import { boolean, timestamp, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const pgGoalEnum = pgEnum("goal", ["hypertrophy", "strength", "endurance"]);

export const programs = pgTable("programs", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  goal: pgGoalEnum("goal").notNull(),
  notes: text("notes"),
  userId: uuid("user_id").references(() => users.id).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.id).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  updatedBy: uuid("updated_by").references(() => users.id),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const programsRelations = relations(programs, ({ one }) => ({
  createdBy: one(users, {
    fields: [programs.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [programs.updatedBy],
    references: [users.id],
  }),
}));