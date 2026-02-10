import { relations } from "drizzle-orm";
import { timestamp, pgEnum, pgTable, uuid, integer, varchar, date } from "drizzle-orm/pg-core";

export const pgGenderEnum = pgEnum("gender", ["male", "female"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  birthDate: date("birth_date").notNull(),
  gender: pgGenderEnum("gender").notNull(),
  height: integer("height").notNull(),
  weight: integer("weight").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.id).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  updatedBy: uuid("updated_by").references(() => users.id),
});

export const usersRelations = relations(users, ({ one }) => ({
  createdBy: one(users, {
    fields: [users.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [users.updatedBy],
    references: [users.id],
  }),
}));